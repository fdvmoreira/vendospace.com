const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: {
      values: [
        'stunt ',
        'lamp-post',
        'bridge',
        'guerrilla',
        'point-of-sale',
        'transit',
        'outdoor',
        'other',
        'poster',
        'bus',
        'rail',
        'digital',
        'wall',
        'billboard',
        'shelter'],
      message: '{VALUE} not supported here'
    }
  },
  user: {
    type: String,
    required: true,
    ref: 'User',
  },
  otherType: {
    type: String,
  },
  location: {
    type: Object,
  },
  dimension: {
    type: Object,
    required: true
  },
  imagesURL: {
    type: Array,
  },
  address: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Space', spaceSchema);
