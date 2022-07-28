const express = require('express');
const router = express.Router();
const compileCodeController = require('../controllers/CompileCodeController');

router.post('/', compileCodeController.runCode);
router.post('/submit-code', compileCodeController.runCodes);
module.exports = router;
