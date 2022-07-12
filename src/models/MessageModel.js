const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        sender: { type: String, ref: 'User' },
        content: { type: String, trim: true },
        conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
        readBy: [{ type: String, ref: 'User' }],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Message', schema);
