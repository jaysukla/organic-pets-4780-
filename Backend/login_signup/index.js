const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.routes.js");
const passport = require("./auth/google.auth.js");
const { Usermodel } = require("./models/user.model.js");
// const { googleRouter } = require("./routes/googleauth.routes.js");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
// app.use("/auth/google", googleRouter);

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
    // console.log(user_data);
    // console.log(".." + __dirname);
    // dir="C:\Users\User\OneDrive\Desktop\organic-pets-4780-\Frontend\login_index\loginindex.html"
    res.redirect("/");
  }
);

app.listen(process.env.PORT, async () => {
  try {
    connection;
    console.log(`connected to db`);
    console.log(`Server Running in port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
