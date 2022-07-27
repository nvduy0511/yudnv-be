const express = require('express');
const router = express.Router();
const compileCodeController = require('../controllers/CompileCodeController');

router.post('/', compileCodeController.runCode);

module.exports = router;
