const mysql = require("mysql2")

const dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

try {
    dbConnection.connect(()=> {
        console.log("Database connected!")
    })
} catch (error) {
    console.log("Error connecting to database")
    return
}

module.exports = dbConnection