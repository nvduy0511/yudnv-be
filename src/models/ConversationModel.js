const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{ type: String, ref: 'User' }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        groupAdmin: { type: String, ref: 'User' },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Conversation', schema);
