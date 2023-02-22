const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

const conn = mysql.createPool({
host: process.env.HOST,
user: process.env.USER,
password: process.env.PASSWORD,
database: process.env.DATABASE,
port: process.env.PORT,
})

module.exports = conn