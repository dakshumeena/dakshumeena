const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = multerStorageCloudinary({
    cloudinary: cloudinary,
    folder: 'YelpCamp',
    allowedFormats: ['jpeg', 'png', 'jpg']
});

module.exports = {
    cloudinary,
    storage
};
