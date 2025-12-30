const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

const ALLOWED_FORMATS = {
  images: ["jpg", "jpeg", "png"],
  video: ["mp4", "mov"],
};

const FOLDERS = {
  images: "projects/images",
  video: "projects/videos",
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname).replace(".", "").toLowerCase();
    const field = file.fieldname;

    if (!ALLOWED_FORMATS[field]) {
      throw new Error("Unexpected upload field");
    }

    if (!ALLOWED_FORMATS[field].includes(ext)) {
      throw new Error(`Invalid ${field} format. Allowed: ${ALLOWED_FORMATS[field].join(", ")}`);
    }

    return {
      folder: FOLDERS[field],
      resource_type: field === "video" ? "video" : "image",
      type: "private",
      format: ext,
    };
  },
});

module.exports = storage;