const ConversationModel = require('../models/ConversationModel');

class ConversationController {
    create(req, res) {
        const conver = new ConversationModel({
            members: [1, 2],
            creator: 1,
        });
        conver.save();
        res.json(conver);
    }

    async getAll(req, res) {
        const convers = await ConversationModel.find();
        res.json(convers);
    }
}

module.exports = new ConversationController();
