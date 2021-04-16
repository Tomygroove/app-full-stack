const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number
    },
    address: {
        type: String,
        required: true,
    },
    resetLink: {
        data: String,
        default: ''
    }
}, { timestamps: true });
 
module.exports = mongoose.model('User', userSchema);