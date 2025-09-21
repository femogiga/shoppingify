import sqlite from 'node:sqlite'
import { DatabaseSync } from 'node:sqlite'



export function DB() {


    const database = new DatabaseSync(':memory:');

    database.exec(`
    CREATE TABLE football(
    id INTEGER PRIMARY KEY ,
    home TEXT,
    away TEXT,
    homeScore INTEGER,
    homeLogo TEXT,
    awayLogo TEXT,
    awayScore INTEGER
    ) STRICT
    `)


    const insert = database.prepare(`INSERT INTO football(Id,home,away,homeLogo,awayLogo ,homeScore,awayScore) values(?,?,?,?,?,?,?)`)
    insert.run(null, 'Arsenal', "Manchester United", 'https://images.seeklogo.com/logo-png/18/1/arsenal-fc-logo-png_seeklogo-182664.png'
        , 'https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg', 3, 2)
    insert.run(null, 'Bolton', "Manchester United", 'https://images.seeklogo.com/logo-png/24/1/bolton-wanderers-logo-png_seeklogo-244895.png', 'https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg', 1, 2)
    insert.run(null, 'Chelsea', "Arsenal", 'https://images.seeklogo.com/logo-png/29/1/chelsea-f-c-logo-png_seeklogo-297357.png', 'https://images.seeklogo.com/logo-png/18/1/arsenal-fc-logo-png_seeklogo-182664.png'
        , 6, 0)
    insert.run(null, 'Luton', "Millwall", 'https://images.seeklogo.com/logo-png/29/1/luton-town-fc-logo-png_seeklogo-295713.png', 'https://images.seeklogo.com/logo-png/25/1/millwall-fc-logo-png_seeklogo-258653.png', 1, 2)
    insert.run(null, 'West ham', 'Arsenal', 'https://images.seeklogo.com/logo-png/49/1/west-ham-united-f-c-logo-png_seeklogo-494093.png', 'https://images.seeklogo.com/logo-png/18/1/arsenal-fc-logo-png_seeklogo-182664.png'
        , 1, 1)






    return database
}
