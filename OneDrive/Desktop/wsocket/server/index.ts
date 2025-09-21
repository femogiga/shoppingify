import http from 'http'
import express from 'express'
import WebSocket, { WebSocketServer } from 'ws'
import sqlite from 'node:sqlite'
import { DatabaseSync } from 'node:sqlite'
import { DB } from './db/sqllite.ts'

// const database = new DatabaseSync(':memory:');

// database.exec(`
//     CREATE TABLE football(
//     id INTEGER PRIMARY KEY ,
//     home TEXT,
//     away TEXT,
//     homeScore INTEGER,
//     awayScore INTEGER
//     ) STRICT
//     `)


// const insert = database.prepare(`INSERT INTO football(Id,home,away,homeScore,awayScore) values(?,?,?,?,?)`)
// insert.run(null, 'Arsenal', "Manchester United", 3, 2)
// insert.run(null, 'Bolton', "Manchester United", 1, 2)
// insert.run(null, 'Chelsea', "Arsenal", 5, 0)
// insert.run(null, 'Bolton', "Manchester United", 1, 2)


const database = DB()

const query = database.prepare('SELECT * FROM football ORDER BY id');
const queryByTeamName = database.prepare('SELECT * FROM football WHERE home=? or away=? ORDER BY id');
// const row = queryByTeamName.all('Arsenal', 'Arsenal')
const row = queryByTeamName.all('Manchester United', 'Manchester United')

// const row = queryByTeamName.get('Arsenal')

// console.log(query.all());
console.log('======>', row)
// console.log(database)

function update(message) {
    console.log(message)
    const msg = message.data
    const { id, home, away, homeLogo, awayLogo, homeScore, awayScore } = msg
    const updateScore = database.prepare(`
  UPDATE football
  SET home = @home,
      away = @away,
      homeLogo = @homeLogo,
      awayLogo = @awayLogo,
      homeScore = @homeScore,
      awayScore = @awayScore
  WHERE id = @id
`);
    const result = updateScore.run({
        home: home,
        away: away,
        homeLogo: homeLogo,
        awayLogo: awayLogo,
        homeScore: homeScore,
        awayScore: awayScore,
        id: id
    });
    if (result.changes === 0) {
        console.log('No rows updated - ID might not exist');
    } else {
        console.log(`Successfully updated ${result.changes} row(s)`);
    }
    return result

}










const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
app.use(express.json());

wss.on('connection', (ws) => {
    console.log('Welcome')
    // ws.send('Welcome')
    ws.on('message', (message) => {
        let msg = JSON.parse(message.toString())
        switch (msg.type) {
            case 'getAll': {
                ws.send(JSON.stringify({
                    type: 'getAll',
                    data: JSON.stringify(query.all())
                })
                )
                return
            }

            case 'getByTeam': ws.send(JSON.stringify(row))
                return
            case 'updateScore': {
                update(msg)
                wss.clients.forEach(client => {
                    return client.send(JSON.stringify({
                        type: 'getAll',
                        data: JSON.stringify(query.all())

                    }))
                })
                // return ws.send(JSON.stringify(query.all()))
            }


        }
    })

    ws.on('error', (err) => {
        ws.send('error')
    })
    ws.on('close',()=> {
        console.log('closed')
    })
})




const port = 7000

server.listen(port, () => {
    console.log(`listening on port ${port}`)
    console.log(`WebSocket server ready at ws://localhost:${port}`);

})
