const express = require('express')
const router = express.Router()
const multer = require('multer')
const User = require('../models/user.model')
const Picture = require('../models/picture.model')



// CDN file upoloads routs

const cloudUploader = require('../configs/cloudinary.config')

router.get('/user/:_id/edit', (req, res, next) => {
    User.findById(req.user.id)
    .then(user => res.render('user/avatar-upload',user))
    .catch(err => next(new Error(err)))
})
router.post('/user/:_id/edit', cloudUploader.single('imageFile'), (req, res, next) => {

    console.log('Multer, en combinación con Cloudinary, crea este req.file:', req.file)

User.findByIdAndUpdate({_id: req.user.id},{avatar: req.file.path})

    .then(user => res.redirect('/profile'))
    .catch(err => next(new Error(err)))

})


module.exports = router