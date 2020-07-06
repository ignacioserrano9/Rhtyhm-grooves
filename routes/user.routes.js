const express = require('express')
const router = express.Router()
const Disk = require('../models/disk.model')


const Discojs = require('discojs')
const client = new Discojs({
    consumerKey: process.env.USER_KEY,
    consumerSecret:process.env.USER_SECRET

})
 
router.get("/record-search", (req, res) => {
   
client
  .searchRelease(req.query.record)
  .then((data) => {
      console.log(data)
    res.render("disk/search", { data });
    
  })
  .catch((error) => {
    console.warn('Oops, something went wrong!', error)
  })

})
router.get("/record/:id", (req, res) => {
   //console.log(typeof(req.params.id))
   let releaseId = parseInt(req.params.id)
  client
    .getRelease(releaseId)
    .then((data) => {
        console.log(data)
      res.render("disk/record", data );

    })
    .catch((error) => {
      console.warn('Oops, something went wrong!', error)
    })
  
  })

module.exports = router

/* 

*/
