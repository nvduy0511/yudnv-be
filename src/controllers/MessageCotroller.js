const ConversationModel = require('../models/ConversationModel');
const MessageModel = require('../models/MessageModel');

class MessageController {
    async send(req, res) {
        const { conversation, content, sender } = req.body;
        //save do database
        await ConversationModel.findByIdAndUpdate(conversation, { latestMessage: content, readBy: [sender] });
        const newMessage = new MessageModel({
            sender: sender,
            content: content,
            conversation: conversation,
        });
        await newMessage.save();
        return res.json(newMessage);
    }

    async getAllMessageByIdConversation(req, res) {
        const idConversation = req.query.id;
        const limit = req.query.limit;
        const page = req.query.page;

        try {
            const messages = await MessageModel.find({ conversation: { $eq: idConversation } })
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
            res.json(messages);
        } catch (error) {
            res.json({ status: false });
            return;
        }
    }

    async getAll(req, res) {
        const messages = await MessageModel.find();
        res.json(messages);
    }

    async deleteAll(req, res) {
        await MessageModel.deleteMany();
        res.send('Delete Success!');
    }
}

module.exports = new MessageController();
