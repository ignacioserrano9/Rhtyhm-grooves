
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
        type: String,
        default:'/images/avatar.png'
    },
    email: {
        type: String,
        default:'1234@grooves.com'
    },
    genres: {
        type: String,
        default:'death metal'
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


