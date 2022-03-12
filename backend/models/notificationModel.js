const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);