const session = require("express-session")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const flash = require("connect-flash")

const User = require('../models/user.model')
const { Error } = require("mongoose")

module.exports = app => {

    app.use(session({
        secret: "rng",
        resave: true,
        saveUninitialized: true
    }))

    passport.serializeUser((user, next) => next(null, user._id))
    passport.deserializeUser((id, next) => {
        User.findById(id)
            .then(theUser => next(null, theUser))
            .catch(err => next(err))
    })



    app.use(flash())  // ERROR HANDLING

    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return next(Error)
            }
            if (!user) {
                return next(null, false, { message: "Nombre de usuario incorrecto" })
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return next(null, false, { message: "Contraseña incorrecta" })
            }
                return next(null, user)
            })
            .catch(err => next(err))
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}