const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');
const verifyToken = require('../middlewares/verifyToken');
// import verifyToken from "../middlewares/verifyToken";

router.post('/register', users.register);
router.post('/login', users.login);
router.get('/logout', users.logout);

router.get('/user/:id', users.getUser);



module.exports = router;