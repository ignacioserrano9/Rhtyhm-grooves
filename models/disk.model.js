const mongoose = require("mongoose")


const diskSchema = new mongoose.Schema({
            id: {
                type: Number,
                unique: Boolean
            },
            main_release: {
                type: Number
            },
            most_recent_release: {
                type: Number
            },
            resource_url: {
                type: String,
            },
            uri: {
                type: String,

            },
            versions_url: {
                type: String,

            },
            main_release_url: {
                type: String,
            },
            most_recent_release_url: {
                type: String,

            },
            num_for_sale: {
                type: String,


            },
            lowest_price: {
                type: String,


            },
            images: [{
                type: String,
                uri: String,
                resource_url: String,
                uri150: String,
                width: Number,
                height: Number
            }],
            genres: [String],
            styles: [String],
            year: {
                 type: Number
            },
            tracklist: [{
                position: String,
                type: String,
                title: String,
                duration: String
             }],
            artist: [{
                name: String,
                anv: String,
                join: String,
                role: String,
                tracks: String,
                id: Number,
                resource_url: String

            }],
            title: String,
            notes: String,
            data_quality: String,
            videos: [{
                uri: String,
                title: String,
                description: String,
                duration: Number,
                embed: Boolean
            }]
        },
    {
        timestamps: true
    })

const Disk = mongoose.model("Disk", diskSchema)

module.exports = Disk
