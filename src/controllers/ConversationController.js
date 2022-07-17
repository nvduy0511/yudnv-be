const ConversationModel = require('../models/ConversationModel');

class ConversationController {
    async accessConversation(req, res) {
        const { id_receiver, id_send } = req.body;
        console.log(id_receiver, id_send);
        if (!id_receiver || !id_send) return res.sendStatus(400);

        const conversation = await ConversationModel.findOne({
            isGroupChat: false,
            $and: [{ users: { $elemMatch: { $eq: id_receiver } } }, { users: { $elemMatch: { $eq: id_send } } }],
        })
            .populate('users')
            .populate('latestMessage');
        if (conversation) {
            res.status(200).json(conversation);
        } else {
            var chatData = {
                chatName: '1-1',
                isGroupChat: false,
                users: [id_receiver, id_send],
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

    async readMessage(req, res) {
        const { idConversation, idUser } = req.body;
        const userIsRead = await ConversationModel.findOne({
            $and: [{ readBy: { $elemMatch: { $eq: idUser } } }, { _id: { $eq: idConversation } }],
        });

        if (!userIsRead) {
            await ConversationModel.findByIdAndUpdate(idConversation, { $push: { readBy: idUser } });
            res.status(200).json({ isUpdate: true });
            console.log('READ MESSAGE-UPDATE', idConversation, ' ', idUser);
        }
        res.status(200).json({ isUpdate: false });
    }

    async getAllByIdUser(req, res) {
        console.log(req.query.id);
        const convers = await ConversationModel.find({ users: { $elemMatch: { $eq: req.query.id } } })
            .populate('users')
            .populate('latestMessage');
        res.json(convers);
    }

    async getAll(req, res) {
        const convers = await ConversationModel.find();
        res.json(convers);
    }

    async deleteAll(req, res) {
        await ConversationModel.deleteMany();
        res.send('Delete Success!');
    }
}

module.exports = new ConversationController();
