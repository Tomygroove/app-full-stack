const express = require('express');
const router = express.Router();
const userRouter = require('./userRoute');
const orderRouter = require('./orderRoute');
 
router.use(userRouter);
router.use(orderRouter);
 
module.exports = router;