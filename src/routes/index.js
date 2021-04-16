const express = require('express');
const router = express.Router();
const userRouter = require('./userRoute');
const productRouter = require('./productRoute');
const orderRouter = require('./orderRoute');
const categoryRouter = require('./categoryRoute');
 
router.use(userRouter);
router.use(productRouter);
router.use(orderRouter);
router.use(categoryRouter);

module.exports = router;