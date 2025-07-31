const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  about: String,
  email: { type: String, required: true },
  resume: String,
  socialLinks: [{
    platform: String,
    url: String
  }],
  locale: { type: String, default: 'en' }
}, { timestamps: true });

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);