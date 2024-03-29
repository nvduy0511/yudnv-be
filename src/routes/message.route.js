const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageCotroller');

router.post('/send', messageController.send);

router.get('/get-all', messageController.getAll);

router.get('/get-all-by-id', messageController.getAllMessageByIdConversation);

router.get('/delete-all', messageController.deleteAll);

module.exports = router;
