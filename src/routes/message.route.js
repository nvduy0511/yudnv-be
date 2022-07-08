const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageCotroller');

router.get('/create', messageController.create);

router.get('/get-all', messageController.getAll);

module.exports = router;
