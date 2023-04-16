const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  avatar: String,
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);