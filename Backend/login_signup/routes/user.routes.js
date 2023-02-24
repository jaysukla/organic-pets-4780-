const express = require("express");
const { Usermodel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const User = await Usermodel.findOne({ email: email });
  if (!User) {
    try {
      bcrypt.hash(password, 5, async (err, secure_pass) => {
        if (err) {
          console.log(err);
        } else {
          const user = new Usermodel({
            name,
            email,
            password: secure_pass,
          });
          await user.save();
          console.log(user);
          res.send(`${user.name} has registered`);
        }
      });
      let userEmail = await Usermodel({ email: email });
      let data = await fetch("https://finalcalender.vercel.app/regis", {
        method: POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail.email,
        }),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error });
    }
  } else {
    res.send(`Email is already exists`);
  }
});

userRouter.post("/login", async (req, res) => {
  // res.send("hello");
  const { email, password } = req.body;
  try {
    const user = await Usermodel.findOne({ email });
    const hasedpass = user.password;
    console.log(user);
    if (user) {
      bcrypt.compare(password, hasedpass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.token);
          const Refresh_token = jwt.sign(
            { userID: user._id },
            process.env.refresh_token
          );
          res.send({
            msg: "Login succesfull",
            token: token,
            refresh_token: Refresh_token,
          });
        } else {
          res.send({ msg: "Login failed" });
        }
      });
    } else {
      res.send("Wrong details");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = {
  userRouter,
};
