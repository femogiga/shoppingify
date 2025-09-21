import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { PrismaClient } from '@prisma/client';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Store connected clients
const clients = new Map<string, WebSocket>();
const roomSubscriptions = new Map<string, Set<string>>();

// WebSocket connection handling
wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', async (data: Buffer) => {
        try {
            const message = JSON.parse(data.toString());

            switch (message.type) {
                case 'AUTH':
                    // Store user connection
                    clients.set(message. , ws);
                    ws.userId = message.userId;
                    break;

                case 'JOIN_ROOM':
                    await handleJoinRoom(ws, message.roomId, message.userId);
                    break;

                case 'LEAVE_ROOM':
                    await handleLeaveRoom(ws, message.roomId, message.userId);
                    break;

                case 'SEND_MESSAGE':
                    await handleSendMessage(message, ws);
                    break;

                case 'GET_MESSAGES':
                    await handleGetMessages(message.roomId, ws);
                    break;
            }
        } catch (error) {
            console.error('Error processing message:', error);
            ws.send(JSON.stringify({ type: 'ERROR', error: 'Invalid message format' }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        if (ws.userId) {
            clients.delete(ws.userId);
        }
    });
});

// WebSocket message handlers
async function handleJoinRoom(ws: WebSocket, roomId: string, userId: string) {
    if (!roomSubscriptions.has(roomId)) {
        roomSubscriptions.set(roomId, new Set());
    }
    roomSubscriptions.get(roomId)!.add(userId);

    ws.send(JSON.stringify({
        type: 'ROOM_JOINED',
        roomId,
        message: `Joined room ${roomId}`
    }));
}

async function handleLeaveRoom(ws: WebSocket, roomId: string, userId: string) {
    if (roomSubscriptions.has(roomId)) {
        roomSubscriptions.get(roomId)!.delete(userId);
    }

    ws.send(JSON.stringify({
        type: 'ROOM_LEFT',
        roomId,
        message: `Left room ${roomId}`
    }));
}

async function handleSendMessage(messageData: any, ws: WebSocket) {
    const { roomId, userId, content } = messageData;

    try {
        // Save message to database
        const message = await prisma.message.create({
            data: {
                content,
                userId,
                roomId,
            },
            include: {
                user: {
                    select: {
                        username: true,
                        id: true
                    }
                }
            }
        });

        // Broadcast to all users in the room
        if (roomSubscriptions.has(roomId)) {
            const subscribers = roomSubscriptions.get(roomId)!;
            const broadcastMessage = JSON.stringify({
                type: 'NEW_MESSAGE',
                message: {
                    id: message.id,
                    content: message.content,
                    userId: message.userId,
                    username: message.user.username,
                    roomId: message.roomId,
                    createdAt: message.createdAt
                }
            });

            subscribers.forEach(userId => {
                const client = clients.get(userId);
                if (client && client.readyState === WebSocket.OPEN) {
                    client.send(broadcastMessage);
                }
            });
        }

        ws.send(JSON.stringify({ type: 'MESSAGE_SENT', messageId: message.id }));

    } catch (error) {
        console.error('Error sending message:', error);
        ws.send(JSON.stringify({ type: 'ERROR', error: 'Failed to send message' }));
    }
}

async function handleGetMessages(roomId: string, ws: WebSocket) {
    try {
        const messages = await prisma. .findMany({
            where: { roomId },
            include: {
                user: {
                    select: {
                        username: true,
                        id: true
                    }
                }
            },
            orderBy: { createdAt: 'asc' },
            take: 50 // Last 50 messages
        });

        ws.send(JSON.stringify({
            type: 'MESSAGES',
            messages: messages.map(msg => ({
                id: msg.id,
                content: msg.content,
                userId: msg.userId,
                username: msg.user.username,
                roomId: msg.roomId,
                createdAt: msg.createdAt
            }))
        }));

    } catch (error) {
        console.error('Error fetching messages:', error);
        ws.send(JSON.stringify({ type: 'ERROR', error: 'Failed to fetch messages' }));
    }
}

// REST API endpoints
app.post('/api/rooms', async (req, res) => {
    try {
        const { name } = req.body;
        const room = await prisma.room.create({
            data: { name }
        });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create room' });
    }
});

app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await prisma.room.findMany();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await prisma.user.create({
            data: { username, email }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`WebSocket server ready at ws://localhost:${PORT}`);
});

// Cleanup on shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});
