const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const Disk = require('../models/disk.model')
const User = require('../models/user.model')
const passport = require("passport")
const ensureLogin = require("connect-ensure-login");



const Discojs = require('discojs')
const client = new Discojs({
  consumerKey: process.env.USER_KEY,
  consumerSecret: process.env.USER_SECRET

})





//Record search

router.get("/record-search", (req, res) => {

  client
    .searchRelease(req.query.record)
    .then((data) => {
      //console.log(data)
      res.render("disk/search", {
        data
      });

    })
    .catch((error) => {
      console.warn('Oops, something went wrong!', error)
    })

})

//Record view
router.get("/record/:id",ensureLogin.ensureLoggedIn(), (req, res) => {
  //console.log(typeof(req.params.id))
  let releaseId = parseInt(req.params.id)
  client
    .getRelease(releaseId)
    .then((data) => {
      console.log(data)
      res.render("disk/record", data)
      //console.log(user)
    })
    .catch((error) => {
      console.warn('Oops, something went wrong!', error)
    })

})


router.post("/record/addcollection",ensureLogin.ensureLoggedIn(),(req, res) => {
  
  const { DiscId, image, title } = req.body
  const recordOwner = req.user._id
  Disk
  .create({ DiscId, image, title, recordOwner })
  .then(() => res.redirect('/user/:_id/collection'))
  .catch((error) => {
    console.warn('Oops, something went wrong!', error)
  
  })
})

  router.post("/record/addwishlist",ensureLogin.ensureLoggedIn(),(req, res) => {
  
    const { DiscId, image, title } = req.body
    const wishlistOwner = req.user._id
    Disk
    .create({ DiscId, image, title, wishlistOwner })
    .then(() => res.redirect('/user/:_id/wishlist'))
    .catch((error) => {
      console.warn('Oops, something went wrong!', error)
    
    })
  })


// --- COLLECTION ---

router.get('/user/:_id/collection', ensureLogin.ensureLoggedIn(), (req, res) => {
  User
    .findOne(req.params.id)
    .then((data) => {
      //console.log(data)
      res.render('user/collection', data)

    })
    .catch((error) => {
      console.warn('Oops, something went wrong!', error)
    })
})


// --- Wishlist---

router.get('/user/:_id/wishlist', ensureLogin.ensureLoggedIn(), (req, res) => {
User
    .findOne(req.params.id)
    .then((data) => {
      //console.log(data)
      res.render('user/wishlist', data)

    })
    .catch((error) => {
      console.warn('Oops, something went wrong!', error)
    })
})

module.exports = router