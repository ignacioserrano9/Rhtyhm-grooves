const express = require('express')
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
router.get("/record/:id", (req, res) => {
  //console.log(typeof(req.params.id))
  let releaseId = parseInt(req.params.id)
  client
    .getRelease(releaseId)
    .then((data) => {
      //console.log(data)
      res.render("disk/record", data);

    })
    .catch((error) => {
      console.warn('Oops, something went wrong!', error)
    })

})
router.post("/record/addcollection/:id", (req, res) => {
  let releaseId = parseInt(req.params.id)
  let userdata = User.findById(req.params.id)
  let record = client.getRelease(releaseId)
  //console.log(typeof(req.params.id))
  Promise.all([userdata, record])
  
  .then(data => {
  console.log(data[1])
  Disk.insertOne({record: data[1]})

  .catch((error) => {
    console.warn('Oops, something went wrong!', error)
  })
.then(data=> {
  User.findOneAndUpdate({record: data[1].id}, {record: data[2].id} )

})
res.redirect("/user/collection", data);
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