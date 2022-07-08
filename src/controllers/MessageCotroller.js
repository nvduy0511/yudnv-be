const MessageModel = require('../models/MessageModel');

class MessageController {
    index(req, res) {
        res.send('OK message');
    }
    send(req, res) {
        res.send('Send message');
    }
    create(req, res) {
        const mess = new MessageModel({
            conver_id: 1,
            content: 'aloalo',
            author: 1,
        });
        mess.save();
        res.json(mess);
    }
    async getAll(req, res) {
        const messages = await MessageModel.find();
        res.json(messages);
    }
}

module.exports = new MessageController();
