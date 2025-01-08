const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: DB_HOST || 'localhost',
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
})

connection.connect((err) => {
    if (err) throw err
    console.log('Connect to MYSQL')
})

module.exports = connection