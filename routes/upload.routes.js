const express = require('express')
const router = express.Router()
const multer = require('multer')
const User = require('../models/user.model')
const cloudUploader = require('../configs/cloudinary.config')

router.get('/user/:_id/edit', (req, res, next) => {
    User.findById(req.user.id)
    .then(user => res.render('user/avatar-upload',user))
    .catch(err => next(new Error(err)))
})
router.post('/user/:_id/edit', cloudUploader.single('imageFile'), (req, res, next) => {
    User.findByIdAndUpdate({_id: req.user.id},{avatar: req.file.path})
    .then(user => res.redirect('/profile'))
    .catch(err => next(new Error(err)))
})


module.exports = router