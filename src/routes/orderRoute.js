const express = require('express');
const router = express.Router();
const orders = require('../controllers/ordersController');

router.post('/order', orders.createOrder);

router.get('/orders', orders.getOrders);
router.get('/order/:id', orders.getOrder);

router.put('/order/:id', orders.updateOrder);

router.delete('/delete-order/:id', orders.deleteOrder);

module.exports = router;