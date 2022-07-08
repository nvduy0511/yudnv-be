const mongoose = require('mongoose')

const schema = new mongoose.Schema (
    {
        conver_id: String,
        author: String,
        content: String
    }
)

module.exports = mongoose.model('Message',schema)