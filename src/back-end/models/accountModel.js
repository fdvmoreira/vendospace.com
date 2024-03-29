const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  type: {
    type: String,
    enum: {
      values: ['personal', 'professional', 'business'],
      message: '{VALUES} not supported here'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'disabled', 'pending'],
      message: '{VALUE} not supported here'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);