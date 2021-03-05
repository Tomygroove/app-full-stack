const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const orderSchema = new Schema({
    totalAmount: Number,
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    products: { type: Schema.Types.ObjectId, ref: 'product' },
}, { timestamps: true });
 
module.exports = mongoose.model('Order', orderSchema);