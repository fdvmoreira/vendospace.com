const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    auction: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Auction'
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Bid', bidSchema);