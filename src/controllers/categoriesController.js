const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

exports.createCategory = (req, res) => {
    const category = new Category({
        title: req.body.title,
        products: req.body.product
    })
    category
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.getCategories = (req, res) => {
  Category.find()
        .populate('products')
        .then((data) => res.send(data))
        .catch(err => {
          res.status(500).send({
            message: err.message || "No categories found"
          });
      });
    
}

exports.getCategory = (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      res.send(category);
  })
  .catch(err => {
      res.status(500).send({
        message: err.message || "No categories found for this ID"
      });
  });
};

exports.updateCategories = (req, res) => {
  Category.findOneAndUpdate({_id: req.params.id}, req.body)
      .then(category => {
        res.send(category);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "An error occurred while updating the category"
        });
      });
}

exports.deleteCategories = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
      .then(category => {
        res.send(category);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "An error occurred while deleting the category"
        });
      });
}