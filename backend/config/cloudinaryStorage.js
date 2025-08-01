const cloudinary = require('./cloudinary').cloudinary;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const FILE_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
};

const FOLDERS = {
  [FILE_TYPES.IMAGE]: 'projects/images',
  [FILE_TYPES.VIDEO]: 'projects/videos',
};

const ALLOWED_FORMATS = {
  [FILE_TYPES.IMAGE]: ['jpg', 'png', 'jpeg'],
  [FILE_TYPES.VIDEO]: ['mp4', 'mov'],
};

const getStorageParams = (file) => {
  if (file.mimetype.startsWith(FILE_TYPES.IMAGE)) {
    return {
      folder: FOLDERS[FILE_TYPES.IMAGE],
      resource_type: FILE_TYPES.IMAGE,
      allowed_formats: ALLOWED_FORMATS[FILE_TYPES.IMAGE],
    };
  }
  if (file.mimetype.startsWith(FILE_TYPES.VIDEO)) {
    return {
      folder: FOLDERS[FILE_TYPES.VIDEO],
      resource_type: FILE_TYPES.VIDEO,
      allowed_formats: ALLOWED_FORMATS[FILE_TYPES.VIDEO],
    };
  }
  throw new Error('Unsupported file type');
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => getStorageParams(file),
});

module.exports = storage;