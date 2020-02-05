const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '172.18.0.2',
    user: 'mehdi',
    password: 'mehdi',
    database: 'mydb'
})

connection.connect ()

module.exports = connection