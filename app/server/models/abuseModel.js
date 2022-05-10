const mongoose = require('mongoose');

const abuseSchema = new mongoose.Schema({
    itemReportedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item' // todo - modify to link to the correct Object
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userReported: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    abuseType: {
        type: String,
        required: true,
        enum: {
            values: ['Other', 'Sexual', 'Hateful', 'Violent', 'Harrasment', 'Harmful', 'Child', 'Terrorism', 'Spam'],
            message: '{VALUE} is not supported'
        }
    },
    message: String

}, { timestamps: true });

module.exports = mongoose.model('Abuse', abuseSchema);