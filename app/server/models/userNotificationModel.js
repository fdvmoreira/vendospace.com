const mongoose = require('mongoose');

const userNotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Notification'
    }
}, { timestamps: true });

module.exports = mongoose.model('UserNotification', userNotificationSchema);