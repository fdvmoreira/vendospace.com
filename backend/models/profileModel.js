const mongoose = require('mongoose');

const imagesRootPath = ''; // todo - images root path

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    avatar: {
        type: String,

        // append the file name to the root path
        get: imageName => `${imagesRootPath}/${imageName}`
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);