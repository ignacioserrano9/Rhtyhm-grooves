const express = require('express')
const router = express.Router()
const multer = require('multer')
const User = require('../models/user.model')
const cloudUploader = require('../configs/cloudinary.config')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.post('/editdata/:_id', (req, res, next) => {
    
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(req.body.password, salt)

    console.log(req.user)
    User.findByIdAndUpdate({_id: req.user.id}, {email:req.body.email , genres: req.body.genres ,password: hashPass})
    .then(user => res.redirect('/profile'))
    .catch(err => next(new Error(err)))
    })


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

