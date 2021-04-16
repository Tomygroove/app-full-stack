const express = require('express');
const router = express.Router();
const products = require('../controllers/productsController');


router.post('/products', products.createProduct);

router.get('/products', products.getProducts);
router.get('/product/:id', products.getProduct);

router.put('/product/:id', products.updateProduct);

router.delete('/product/:id', products.deleteProduct);


module.exports = router;