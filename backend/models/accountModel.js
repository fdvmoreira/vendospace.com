const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        enum: {
            values: [''], // todo - types of accounts
            message: '{VALUES} not supported here'
        }
    },
    status: {
        type: String,
        enum: {
            values: [], // todo - status of account here
            message: '{VALUE} not supported here'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);