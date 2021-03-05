const express = require('express');
const router = express.Router();
const orders = require('../controllers/ordersController');

router.post('/orders', orders.createOrder);
router.get('/orders', orders.getOrders);


module.exports = router;