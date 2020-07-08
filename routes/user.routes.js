const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const Disk = require('../models/disk.model')
const User = require('../models/user.model')
const passport = require("passport")
const ensureLogin = require("connect-ensure-login");



const Discojs = require('discojs')
const { populate } = require('../models/disk.model')
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
     // console.log(data)
      res.render("disk/record", data)
      //console.log(user)
    })
    .catch((error) => {
      console.warn('Oops, something went wrong!', error)
    })

})
//module.exports = router


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
  
  const userId = User.findById(req.user._id)
  const diskInfo = Disk.find({recordOwner: req.user._id})
  
  Promise.all([userId, diskInfo]) 
  .then(records => {
    //console.log( records)
      res.render('user/collection', { user: records[0], disk: records[1] }) 
  })
  .catch(err => console.log("Error en la BBDD", err))
})

// --- Wishlist---

router.get('/user/:_id/wishlist', ensureLogin.ensureLoggedIn(), (req, res) => {
  const userId = User.findById(req.user._id)
  const diskInfo = Disk.find({wishlistOwner: req.user._id})
  
  Promise.all([userId, diskInfo]) 
  .then(records => {
    //console.log( records)
      res.render('user/wishlist', { user: records[0], disk: records[1] }) 
  })
  .catch(err => console.log("Error en la BBDD", err))
})

//comunity
router.get('/community', ensureLogin.ensureLoggedIn(), (req, res) => {

  User
  .find()
  .then(users => {
    console.log(users)
    res.render("user/community", {users})
  }) 
  .catch(err => console.log("Error en la BBDD", err))
  })

router.get('/community/:id', ensureLogin.ensureLoggedIn(), (req, res) => {
  
  const userId =  User.findById(req.params.id)
  const diskInfo = Disk.find({wishlistOwner:req.params.id })

        Promise.all([userId, diskInfo]) 
        .then(records => {
          //console.log( records)
            res.render('user/wishlist', { user: records[0], disk: records[1] }) 
        })
        .catch(err => console.log("Error en la BBDD", err))
      })
module.exports = router
