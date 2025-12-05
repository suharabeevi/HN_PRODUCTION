const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },   // e.g. "Session Duration"
    value: { type: String, required: true },   // e.g. "1 hour"
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,              // e.g. "Basic Photography"
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,          // main package price
    },
    currency: {
      type: String,
      default: 'GBP',
    },

    // Flexible features array
    features: [featureSchema],

    // Media
    images: [
      {
        type: String,          // Cloudinary image URL
        trim: true,
      },
    ],
    videos: [
      {
        type: String,          // Cloudinary video URL
        trim: true,
      },
    ],

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);

