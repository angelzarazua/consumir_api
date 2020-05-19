const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listUsers);

// router.get('/newUser', userController.newUser);

router.post('/newUser', userController.createUser);

router.put('/:idUser', userController.editUser);

module.exports = router;