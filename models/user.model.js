
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User


