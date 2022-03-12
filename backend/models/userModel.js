const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    signUpMethod: {
        type: String,
        required: true,
        enum: {
            values: ['Google', 'Facebook', 'LinkedIn', 'Microsoft'], // todo - signup methods here
            message: '{VALUE not supported here}'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);