const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    space: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Space'
    },
    initialPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: [''], // todo - auction status here
            message: '{VALUE} not supported here'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Auction', auctionSchema);