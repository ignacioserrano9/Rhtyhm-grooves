const express = require('express')
const router = express.Router()
const Disk = require('../models/disk.model')
const User = require('../models/user.model')
const ensureLogin = require("connect-ensure-login");
const Discojs = require('discojs')
const { populate } = require('../models/disk.model')

const client = new Discojs({
  consumerKey: process.env.USER_KEY,
  consumerSecret: process.env.USER_SECRET
})

router.get("/record-search", (req, res, next) => {
  client
    .searchRelease(req.query.record)
    .then(data => res.render("disk/search", { data }))
    .catch(err => next(new Error(err)))
})

router.get("/record/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let releaseId = parseInt(req.params.id)
  
  client
    .getRelease(releaseId)
    .then((data) => (res.render("disk/record", data)))
    .catch(err => next(new Error(err)))
})

router.post("/record/addcollection", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { discId, image, title } = req.body
  const recordOwner = req.user._id
  Disk
    .create({ discId, image, title, recordOwner })
    .then(() => res.redirect('/user/:_id/collection'))
    .catch(err => next(new Error(err)))
})

router.post("/record/delete", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { id } = req.body
  Disk
    .deleteOne({ _id: id})
    .then(() => res.redirect('/user/:_id/collection'))
    .catch(err => next(new Error(err)))
})

router.post("/record/addwishlist", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const { discId, image, title } = req.body
  const wishlistOwner = req.user._id
  Disk
    .create({ discId, image, title, wishlistOwner })
    .then(() => res.redirect('/user/:_id/wishlist'))
    .catch(err => next(new Error(err)))
})

router.get('/user/:_id/collection', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const userId = User.findById(req.user._id)
  const diskInfo = Disk.find({ recordOwner: req.user._id })

  Promise.all([userId, diskInfo])
    .then(records => res.render('user/collection', { user: records[0], disk: records[1] }))
    .catch(err => next(new Error(err)))
})

router.get('/user/:_id/wishlist', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const userId = User.findById(req.user._id)
  const diskInfo = Disk.find({ wishlistOwner: req.user._id })

  Promise.all([userId, diskInfo])
    .then(records => res.render('user/wishlist', { user: records[0], disk: records[1] }))
    .catch(err => next(new Error(err)))
})

router.get('/profile/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User
    .findOne(req.params.id)
    .then(data => res.render('user/profile', {user: req.user}))
    .catch(err => next(new Error(err)))
})

router.get('/community', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User
    .find()
    .then(users => res.render("user/community", { users }))
    .catch(err => next(new Error(err)))
})

router.get('/community/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const userId = User.findById(req.params.id)
  const diskInfoRec = Disk.find({ recordOwner: req.params.id })
  const diskInfoWis = Disk.find({ wishlistOwner: req.params.id })

  Promise.all([userId, diskInfoRec, diskInfoWis])
    .then(records => res.render('commprofile', { user: records[0], vynil: records[1], wish: records[2] }))
    .catch(err => next(new Error(err)))
  })
  
module.exports = router
