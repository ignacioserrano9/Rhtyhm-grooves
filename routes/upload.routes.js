const express = require('express')
const router = express.Router()
const multer = require('multer')
const User = require('../models/user.model')
const Picture = require('../models/picture.model')



// CDN file upoloads routs

const cloudUploader = require('../configs/cloudinary.config')

router.get('user/:_id/edit', (req, res, next) => res.render('../views/user/avatar-upload.hbs'))

router.post('user/:_id/edit', cloudUploader.single('imageFile'), (req, res, next) => {

    console.log('Multer, en combinación con Cloudinary, crea este req.file:', req.file)

    Picture.create({
            name: req.body.imageName,
            path: req.file.url,
            originalName: req.file.originalname
        })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})


module.exports = router