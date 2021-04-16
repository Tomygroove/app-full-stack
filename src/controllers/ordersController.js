const Order = require('../models/orderModel');

exports.createOrder = (req, res) => {
    const order = new Order({
        totalAmount: req.body.totalAmount,
        user: req.body.user,
        products: req.body.products
    })

    order.save()
    .then((data) => {
        res.send(data);
        res.send({
            confirmed: true,
            message:"Sucess Update"
            
        }) 
    })
    .catch(err => console.log(err));
    
};

exports.getOrders = (req, res) => {
    Order.find()
    .populate('products')
    .populate('user')
        .then((data) => res.send(data))
        .catch(err => console.log(err))
};

exports.getOrder = (req, res) => {
    Order.
    findById(req.params.id).
    populate('products').
    populate('user')
    .then((data) => {
      if(!data){
          return res.status(404).send({
              message: `No order found with id ${req.params.id}`
          })
      }
      res.send(data);
  
  }).catch((err) => {
          return res.status(404).send({
              message: err.message
          })
  })
};

exports.updateOrder = (req, res) => {
    Order.findOneAndUpdate(req.params.id, req.body)
      .then(order => { 
        // res.send(order);
        res.send({
            confirmed: true,
            message:"Sucess Update"
            
        })
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "some error occured when finding product"
        });
    });
};

exports.deleteOrder = (req, res) => {

    Order.findByIdAndDelete(req.params.id)
    .then(data => {

        res.send({
            confirmed: true,
            message:"Success Delete"
            
        })
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occured"
        })
    });
};