const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  period: {
    start: { type: Date, required: true },
    end: { type: Date }
  },
  images: [String],
  video: String,
  githubUrl: String,
  projectUrl: String,
  tags: [String],
  locale: { type: String, default: 'en' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);