const ConversationModel = require('../models/ConversationModel');

class ConversationController {
    async accessConversation(req, res) {
        const { uid_receiver, uid_send } = req.body;
        console.log(uid_receiver, uid_send);
        if (!uid_receiver || !uid_send) return res.sendStatus(400);

        const conversation = await ConversationModel.findOne({
            isGroupChat: false,
            $and: [{ users: { $elemMatch: { $eq: uid_receiver } } }, { users: { $elemMatch: { $eq: uid_send } } }],
        })
            .populate('users')
            .populate('latestMessage');
        if (conversation) {
            res.status(200).json(conversation);
        } else {
            var chatData = {
                chatName: '1-1',
                isGroupChat: false,
                users: [uid_receiver, uid_send],
            };
            try {
                const createdChat = await ConversationModel.create(chatData);
                const fullChat = await ConversationModel.findOne({ _id: createdChat._id }).populate('users');
                res.status(200).json(fullChat);
            } catch (error) {
                res.status(400);
                throw new Error(error.message);
            }
        }

        res.status(400);
    }

    async getAll(req, res) {
        const convers = await ConversationModel.find();
        res.json(convers);
    }
}

module.exports = new ConversationController();
