const multer = require('multer');
const storage = require('../config/cloudinaryStorage');

const uploadProjectMeida = multer({storage});

module.exports = { uploadProjectMeida: uploadProjectMeida.fields([
    { name: 'images', maxCount: 6 },
    { name: 'video', maxCount: 1 }
]) };
