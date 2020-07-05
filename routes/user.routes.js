const express = require('express')
const router = express.Router()
const Disk = require('../models/disk.model')


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

module.exports = router