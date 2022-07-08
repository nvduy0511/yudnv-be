const mongoose = require('mongoose')

const schema = new mongoose.Schema (
    {
        members:[],
        creator:String
    }
)

module.exports = mongoose.model('Conversation',schema)