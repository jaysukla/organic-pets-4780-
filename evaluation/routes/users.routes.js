const express = require("express");
const { Usermodel } = require("../models/users.models");
const fs = require("fs");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");
require("dotenv").config();
const redis = require("redis");
const client = redis.createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new Usermodel({
          name,
          email,
          password: secure_pass,
          role,
        });
        await user.save();
        console.log(user);
        res.send(`${user.name} has registered`);
      }
    });
  } catch (error) {}
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hasedpass = user[0].password;
    console.log(hasedpass);
    if (user.length > 0) {
      bcrypt.compare(password, hasedpass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user[0]._id, role: user[0].role },
            "sitansu"
          );
          const Refresh_token = jwt.sign(
            { userID: user[0]._id },
            "sitansu_refresh"
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

userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization;
  const blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"));
  blacklist.push(token);
  // let arr=["blacklist",token];
  fs.writeFileSync("./blacklist.json", JSON.stringify(blacklist));
  // await client.SADD(arr);
  res.send("logout successfull");
});

userRouter.get("/getblacklist", async (req, res) => {
  let data = await client.SMEMBERS("blacklist");
  res.send(data);
});

userRouter.get("/newToken", async (req, res) => {
  const refresh_token = req.headers.authorization;
  if (!refresh_token) {
    res.send("please login again");
  }
  jwt.verify(refresh_token, "sitansu_refresh", (err, decoded) => {
    if (err) {
      res.send({
        msg: err,
      });
    } else {
      // console.log(decoded);
      const token = jwt.sign({ userID: decoded.userID }, "sitansu");
      res.send({
        msg: "login Successfull",
        token: token,
      });
    }
  });
});

userRouter.get(
  "/goldrate",
  authenticate,
  authorize("customer"),
  async (req, res) => {
    try {
      res.send("Users shoul see the gold rate");
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error.message });
    }
  }
);

userRouter.get(
  "/userstats",
  authenticate,
  authorize("manager"),
  async (req, res) => {
    try {
      res.send("Manager is here to see the users.");
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error.message });
    }
  }
);

module.exports = {
  userRouter,
};
