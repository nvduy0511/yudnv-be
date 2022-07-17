const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/ConversationController');

router.post('/access', conversationController.accessConversation);

router.get('/get-all-by-id-user', conversationController.getAllByIdUser);

router.get('/get-all', conversationController.getAll);

router.post('/read-conversation', conversationController.readMessage);

router.get('/delete-all', conversationController.deleteAll);

module.exports = router;
