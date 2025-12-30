const multer = require("multer");

const multerErrorHandler = (err, req, res, next) => {
  // 1️⃣ Multer built-in errors (LIMIT_COUNT, LIMIT_FILE_SIZE, etc.)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
      type: "MULTER_ERROR",
    });
  }

  // 2️⃣ Cloudinary storage errors (invalid format, bad filetype, etc.)
  if (err && err.message && err.message.includes("Invalid")) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
      type: "FILE_VALIDATION_ERROR",
    });
  }

  // 3️⃣ Unexpected upload field (someone sends `video2` instead of `video`)
  if (err && err.message && err.message.includes("Unexpected field")) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Unexpected upload field",
      type: "FIELD_ERROR",
    });
  }

  // 4️⃣ Everything else → pass to global handler
  next(err);
};

module.exports = multerErrorHandler;
