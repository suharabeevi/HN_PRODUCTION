const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // e.g. "ph-thin ph-film-slate"
      default: 'ph-thin ph-star',
    },
    imageSmall: {
      type: String, // Cloudinary URL
    },
    imageMedium: {
      type: String, // Cloudinary URL
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
