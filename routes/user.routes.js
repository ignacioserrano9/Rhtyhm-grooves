const express = require('express')
const router = express.Router()
const Disk = require('../models/disk.model')
const User = require('../models/user.model')

const Discojs = require('discojs')
const client = new Discojs({
    consumerKey: process.env.USER_KEY,
    consumerSecret:process.env.USER_SECRET

})
 
router.get("/artist-search", (req, res) => {
    
     
client
  .searchRelease(req.query.artist)
  .then((data) => {
      console.log(data)
    res.render("disk/search", { data: data.body });
  })
  .catch((error) => {
    console.warn('Oops, something went wrong!', error)
  })

})



// --- COLLECTION ---

router.get('/user/_id/collection', (req, res) => res.render('../views/user/collection.hbs'))

//router.post('/users/{username}/collection', (req,res) )

// router.get('/collection', (req, res) => {
//   User.find()
//     .then(allRecords => res.render('/user/collection', {
//       records: allRecords
//     }))
//     .catch(err => console.log('error', err))
// })



// --- WISHLIST ---

router.get('/user/_id/wishlist', (req, res) => res.render('../views/user/wishlist.hbs'))





module.exports = router