const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  image: {
    type: String,
    default: ''
  },
  review: {
    type: String,
    required: [true, 'Review is required'],
    trim: true,
    maxlength: 1000
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
