const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);