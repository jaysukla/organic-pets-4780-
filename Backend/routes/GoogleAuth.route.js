const express = require("express");
const GoogleRouter = express.Router()
const passport = require("passport");
const { Usermodel } = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

let HOST = "https://mycal-704.netlify.app"
// let HOST = "http://127.0.0.1:5500"

require("../auth/google.auth")

GoogleRouter.get('/', passport.authenticate('google', { scope: ['email', "profile"] }));

GoogleRouter.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/google/auth/google/success',
        failureRedirect: '/google/auth/google/failure'
    })

);
// !GOOGLE AUTH SUCCESS
GoogleRouter.get('/auth/google/success', async (req, res) => {
    if (!req.user) {
        return res.redirect('/google/auth/google/failure');
    }
    let googledata = {
        name: req.user.displayName,
        email: req.user.email,
        image: req.user.photos[0].value,
        password: req.user.email,
        role: "Explorer"
    }
    console.log(googledata);
    try {
        let user1 = await Usermodel.find({ email: googledata.email });
        if (user1.length) {
            console.log("FoundInDB", user1[0])//!----> User Already Exists in DB  
            res.redirect(`${HOST}/success.html?successId="${user1[0]._id}"`)
        } else {
            bcrypt.hash(googledata.password, 5, async function (err, hash) {
                if (hash) {
                    googledata.password = hash;
                    const instance = new Usermodel(googledata);
                    await instance.save();
                    // console.log("NewCreated", instance)//!----> New User Created in DB by google
                    res.redirect(`${HOST}/success.html?successId="${instance._id}"`)
                } else {
                    console.log(err);
                    res.redirect(`${HOST}/failure.html?failure="${"ErrorInGoogleFound"}"`)
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect(`${HOST}/failure.html?failure="${"ErrorOccured"}"`)
    }

});

// !GOOGLE AUTH FAILURE
GoogleRouter.get('/auth/google/failure', (req, res) => {
    res.redirect(`${HOST}/failure.html`)
})


// ?GOOGLE AUTH LOGIN
GoogleRouter.post('/login', async (req, res) => {
    let userID = req.body.userID
    let user = await Usermodel.findOne({ _id: userID });
    jwt.sign({ user }, process.env.key, (err, token) => {
        if (token) {
            res.json({
                Message: "Google Login Successful",
                Wrong: false, token, user,
            });
        } else {
            res.json({ Message: "JWT error", Wrong: true });
        }
    });
})
// ! GOOGLE AUTH LOGOUT
GoogleRouter.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.json({ Message: "Logged Out Successfully", logout: true });
})
module.exports = { GoogleRouter };