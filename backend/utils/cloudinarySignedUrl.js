const cloudinary = require("../config/cloudinary");

function signedUrl(publicId, format, resourceType = "image") {
  const expires_at = Math.floor(Date.now() / 1000) + 3600;

  return cloudinary.utils.private_download_url(publicId, format, {
    expires_at,
    resource_type: resourceType
  });
}

module.exports = signedUrl;
