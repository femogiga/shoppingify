import { WebSocket } from 'ws';

declare module 'ws' {
    interface WebSocket {
        userId?: string;
    }
}

export interface WebSocketMessage {
    type: string;
    [key: string]: any;
}

export interface AuthMessage extends WebSocketMessage {
    type: 'AUTH';
    userId: string;
}

export interface JoinRoomMessage extends WebSocketMessage {
    type: 'JOIN_ROOM';
    roomId: string;
    userId: string;
}

export interface SendMessageData extends WebSocketMessage {
    type: 'SEND_MESSAGE';
    roomId: string;
    userId: string;
    content: string;
}
