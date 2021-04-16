const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');
const verifyToken = require('../middlewares/verifyToken');
// import verifyToken from "../middlewares/verifyToken";

router.post('/register', users.register);
router.post('/login', users.login);
router.post('/email-verification', users.emailVerification);

router.get('/logout', users.logout);
router.get('/users', users.getUsers);
router.get('/user/:id', verifyToken, users.getUser);

router.put('/forgot-password', users.forgotPassword);
router.put('/reset-password', users.resetPassword);
router.put('/user/:id', users.updateUser);

router.delete('/user/:id', users.deleteUser);


module.exports = router;