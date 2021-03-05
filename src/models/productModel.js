const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });
 
module.exports = mongoose.model('User', userSchema);