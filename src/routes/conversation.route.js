const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/ConversationController');

router.get('/create', conversationController.create);

router.get('/get-all', conversationController.getAll);

module.exports = router;
