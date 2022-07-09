const UserModel = require('../models/UserModel');

class UserController {
    async findOrCreate(req, res) {
        const user_req = req.body;
        console.log(user_req);
        const user_exist = await UserModel.findOne({ uid: { $eq: user_req.uid } }).exec();
        if (user_exist === null) {
            const user = new UserModel(user_req);
            await user.save();
            res.json({ isCreate: true, user: user });
        } else {
            res.json({ isCreate: false, user: user_exist });
        }
    }

    async getAll(req, res) {
        const users = await UserModel.find();
        res.json(users);
    }

    async getAllNotIncludeMe(req, res) {
        const uid_req = req.query.uid;
        const users = await UserModel.find({ uid: { $ne: uid_req } });
        res.json(users);
    }
}

module.exports = new UserController();
