const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    name: {
        type: String,
    },
    path: {
        type: String,
    },
    originalName: {
        type: String,
    }
}, {
    timestamps: true
})

const Picture = mongoose.model("Picture", pictureSchema)
module.exports = Picture