const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    period: {
      start: { type: Date },
      end: { type: Date },
    },
    images: [
      {
        public_id: String,
        format: String, // e.g. 'jpg'
        resource_type: String, // 'image' or 'video'
        folder: String,
      },
    ],
    video: {
      public_id: String,
      format: String, // e.g. 'jpg'
      resource_type: String, // 'image' or 'video'
      folder: String,
    },
    githubUrl: String,
    projectUrl: String,
    tags: [String],
    locale: { type: String, default: "en" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
