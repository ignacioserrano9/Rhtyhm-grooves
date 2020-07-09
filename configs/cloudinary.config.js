const cloudinary = require('cloudinary').v2;
const  {CloudinaryStorage}  = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
 
const app = express();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'RhythmAndGrooves',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {cb(null, file.originalname)}
})

const uploadCloud = multer({storage: storage})

module.exports = uploadCloud