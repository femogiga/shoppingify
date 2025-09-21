import WebSocket, { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';


const connections = {}
const users = {}
const wss = new WebSocketServer({ port: 7000 })

wss.on('connection', (ws) => {
    ws.on('error', console.error)
    ws.on('message', (data) => {
        console.log('recieved ' + data)
    })


    const uuid = uuidv4()
    console.log(uuid)
    connections[uuid] = ws
    users[uuid] = {
        uuid: uuid,
        name: '',
        voted: false
    }
    console.log('===========>', connections)
    console.log('===========>', users)

    ws.on('message', (data) => {

        let user = users[uuid]
        const message = JSON.parse(data.toString())
        let { voted } = data;
        users[uuid] = {
            uuid: uuid, name: '', voted: true
        }
        ws.send(JSON.stringify(user))
    })

    ws.on('message', ((data, isBinary, uuid) => {
        wss.clients.forEach(client => {
            client.send(data, { binary: isBinary })
        })
    }))
    const user = users[uuid]
    ws.send('The user has connected ' + JSON.stringify(user))
})
console.log(connections)
