const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const ensureLogin = require("connect-ensure-login");


const bcrypt = require("bcrypt")
const bcryptSalt = 10


// User signup
router.get("/signup", (req, res) => res.render("auth/signup"))
router.post("/signup", (req, res, next) => {

    const {
        username,
        password
    } = req.body

    if (!username || !password) {
        res.render("auth/signup", {
            errorMsg: "Rellena el usuario y la contraseña"
        })
        return
    }

    User.findOne({
            username
        })
        .then(user => {
            if (user) {
                res.render("auth/signup", {
                    errorMsg: "El usuario ya existe en la BBDD"
                })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({
                    username,
                    password: hashPass
                })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/signup", {
                    errorMsg: "No se pudo crear el usuario"
                }))
        })
        .catch(error => next(error))
})


// User login
router.get('/login', (req, res) => res.render('auth/login', {
    "errorMsg": req.flash("error")
}))
router.post('/login', passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
    badRequestMessage: 'Rellena todos los campos'
}))

// User profile

router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res) => {
    User
        .findOne(req.params.id)
        .then((data) => {
            console.log(data)
            res.render('user/profile', {
                user: req.user
            })

        })
        .catch((error) => {
            console.warn('Oops, something went wrong!', error)
        })
})


router.post('/profile', passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
    badRequestMessage: 'Inicia Sesion o Registrate'
}))


// User logout
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router