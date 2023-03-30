const mysql = require('mysql')

// connect to mysql
const db = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password : "password",
    database : "mern_mysql", // this is name of database having 'todos' table in it
})
db.query(() => {
    console.log("database connected")
})

module.exports = db