const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    space: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Space'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['Available', 'Sold', 'Rented', 'Live', 'Disabled'], // todo - listing status here 
            message: '{VALUE} not supported here'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);