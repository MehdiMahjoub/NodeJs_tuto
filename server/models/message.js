const connection = require('../config/db')
const moment = require('moment')


class Message {
    static create (content, cb) {
        connection.query('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date()], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }
}

module.exports = Message