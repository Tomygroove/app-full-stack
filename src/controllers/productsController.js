const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.createProduct = (req,res)=>{
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        category: req.body.category,
    })
    product
    .save()
    .then(data => {
      Category.findByIdAndUpdate({_id : data.category}, {
        $push: {
          products: data._id
        }
      })
      .then(data => {
        res.send({
          message: data
        })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.getProducts = (req, res) => {
    Product.find()
      .then(products => {
        res.send({
          products: products,
          getProducts: true
        });
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "some error occured when finding products"
        });
    });
};

exports.getProduct = (req, res) => {
    Product.findById(req.params.id)
    .populate('Category')
      .then(product => {
        res.send(product);
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "some error occured when finding product"
        });
    });
};

exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate({_id:req.params.id}, req.body)
  .then(product => {
        res.send(product);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "some error occured when finding product"
        });
      });
};

exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then(product => {
        res.send(product);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "some error occured when finding products"
        });
      });
};