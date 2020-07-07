const mongoose = require("mongoose")
const Schema = mongoose.Schema

const diskSchema = new mongoose.Schema({
    DiscId: Number,
     
    image: String,
    
    title: String,
    recordOwner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    wishlistOwner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    },{
        timestamps: true
    })

const Disk = mongoose.model("Disk", diskSchema)

module.exports = Disk
