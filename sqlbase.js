const sqlite3 = require('sqlite3').verbose()

let sql


const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message)
    }
})


//Create table

// sql1 = `CREATE TABLE authusers(
//     user_id serial primary key,
//     email varchar(255) unique not null,
//     password varchar(255) not null,
//     isActivated BOOLEAN DEFAULT FALSE,
//     activationLink varchar(255) STRING,
//     created_at date default current_date
//     phone varchar(255) not null,
//     avatar varchar(255))
//     `
// db.run(sql1)
// sql2 = `CREATE TABLE authtokens(
//     user_id serial primary key,
//     refreshToken string not null
//     created_at date default current_date
//    `
//
// db.run(sql2)