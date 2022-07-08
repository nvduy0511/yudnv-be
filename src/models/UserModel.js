const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    uid: String,
    displayName: String,
    email: String,
    photoURL: String,
});

module.exports = mongoose.model('User', schema);
