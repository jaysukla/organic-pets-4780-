const express = require("express");
const cors = require("cors");
const redis = require("redis");
const cookieParser = require("cookie-parser");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.routes.js");
const passport = require("./auth/google.auth.js");
const { Usermodel } = require("./models/user.model.js");
// const { googleRouter } = require("./routes/googleauth.routes.js");
require("dotenv").config();
const app = express();

const client = redis.createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/users", userRouter);
// app.use("/auth/google", googleRouter);
// console.log(__dirname)
// console.log(process.cwd())
app.get("/", (req, res) => {
  try {
    res.send("Welcome to calendly");
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});

app.get("/dash", (req, res) => {
  // res.send("rediect to dash");
  try {
    // res.send({
    //   msg: "Successfull",
    // });
    // res.redirect("/login_signup/hhh.html")
    // window.location.href="product.html"
  } catch (error) {
    res.status(500).send({ msg: error });
  }
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    // Successful authentication, redirect home.
    const name = req.user._json.name;
    const email = req.user._json.email;
    const pro_pic = req.user._json.picture;
    const user_data = {
      name,
      email,
      picture: pro_pic,
    };
    const user = new Usermodel(user_data);
    await user.save();
    // let userEmail = await Usermodel({ email: email });
    // let data = await fetch("https://finalcalender.vercel.app/regis", {
    //   method: POST,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: userEmail.email,
    //   }),
    // });
    // console.log(user_data);
    // console.log(".." + __dirname);
    // dir="C:\Users\User\OneDrive\Desktop\organic-pets-4780-\Frontend\login_index\loginindex.html"

    res.cookie("userEmail", email);

    // client.SET("userEmail", email);
    res.redirect("https://calendly.com/event_types/user/me");
  }
);

app.get("/userEmail", async (req, res) => {
  try {
    // const userEmail = await client.GET("userEmail");
    res.send({
      email: req.cookies.userEmail,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4500, async () => {
  try {
    connection;
    console.log(`connected to db`);
    console.log(`Server Running in port 4500`);
  } catch (error) {
    console.log(error);
  }
});
