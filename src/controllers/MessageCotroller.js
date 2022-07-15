const ConversationModel = require('../models/ConversationModel');
const MessageModel = require('../models/MessageModel');

class MessageController {
    async send(req, res) {
        const { conversation, content, sender } = req.body;
        //save do database
        const newMessage = new MessageModel({
            sender: sender,
            content: content,
            conversation: conversation,
            readBy: [sender],
        });
        await newMessage.save();
        await ConversationModel.findByIdAndUpdate(conversation, { latestMessage: content });
        return res.json(newMessage);
    }

    async getAllMessageByIdConversation(req, res) {
        const idConversation = req.query.id;
        const messages = await MessageModel.find({ conversation: { $eq: idConversation } });
        res.json(messages);
    }

    async getAll(req, res) {
        const messages = await MessageModel.find();
        res.json(messages);
    }
}

module.exports = new MessageController();
