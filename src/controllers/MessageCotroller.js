const MessageModel = require('../models/MessageModel');

class MessageController {
    async send(req, res) {
        const { idConversation, content, _idSender } = req.body;
        //save do database
        const newMessage = new MessageModel({
            sender: _idSender,
            content: content,
            conversation: idConversation,
            readBy: [_idSender],
        });
        await newMessage.save();
        //update lastest message in Convestation
        //...
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
