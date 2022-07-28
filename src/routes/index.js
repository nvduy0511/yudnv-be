const express = require('express');
const router = express.Router();
const messageRoute = require('./message.route');
const conversationRoute = require('./conversation.route');
const userRoute = require('./user.route');
const compileCodeRoute = require('./compile-code.route');

router.use('/user', userRoute);
router.use('/conversation', conversationRoute);
router.use('/message', messageRoute);
router.use('/compile-code', compileCodeRoute);

module.exports = router;
