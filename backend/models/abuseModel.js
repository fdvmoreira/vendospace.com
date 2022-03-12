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
    abuseTye: {
        type: String,
        enum: {
            values: ['Other'], // todo types of abuses here
            message: '{VALUE} is not supported'
        },
        required: true
    },
    message: String

}, { timestamps: true });

module.exports = mongoose.model('Abuse', abuseSchema);