const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectCategory',
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    images: [
      {
        url: { type: String, trim: true },
        public_id: { type: String, trim: true },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
