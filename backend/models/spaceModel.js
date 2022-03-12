const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: {
            values: [''], // todo - type os OOH adspace here
            message: '{VALUE} not supported here'
        }
    },
    location: {
        type: Object,
        required: true
    },
    dimension: {
        type: Object,
        required: true
    },
    imagesURL: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Space', spaceSchema);