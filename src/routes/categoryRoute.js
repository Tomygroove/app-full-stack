const express = require('express');
const router = express.Router();
const categories = require('../controllers/categoriesController');

router.post('/categories', categories.createCategory);

router.get('/categories', categories.getCategories);
router.get('/category/:id', categories.getCategory);

router.put('/categories/:id', categories.updateCategories);

router.delete('/categories/:id', categories.deleteCategories)


module.exports = router;