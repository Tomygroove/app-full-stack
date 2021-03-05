const Order = require('../models/orderModel');

exports.createOrder = (req, res) => {
    const order = new Order({
        totalAmount: req.body.totalAmount,
        products: req.body.products,
        user: req.body.user
    })

    order.save()
    .then((data) => {res.send(data) })
    .catch(err => console.log(err));
    
}

exports.getOrders = (req, res) => {
    Order.find()
    .populate('products')
        .then((data) => res.send(data))
        .catch(err => console.log(err))
}