const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', (req, res) => {
    res.send('user api');
});

router.post('/', userController.findOrCreate);

router.get('/get-all', userController.getAll);

router.get('/get-all-not-include-me', userController.getAllNotIncludeMe);

module.exports = router;