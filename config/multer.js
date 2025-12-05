const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Save locally first
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/assets/uploads';
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload to Cloudinary helper
// resourceType: 'image' (default), 'video', or 'auto'
const uploadToCloudinary = async (localFilePath, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: 'tours',
      resource_type: resourceType,
    });
    fs.unlinkSync(localFilePath); // remove local file
    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw err;
  }
};

module.exports = { upload, uploadToCloudinary };
