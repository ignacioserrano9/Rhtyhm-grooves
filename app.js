require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/preformatter.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)
//require('./configs/cloudinary.config')(app)

// Routes index
require('./routes')(app)


let hbs = require('hbs');
hbs.registerPartials(__dirname + "/views/partials")

module.exports = app
