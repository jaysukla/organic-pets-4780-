const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GOOGLE_CLIENT_ID =
  "782261569311-cmpa31fmtbt8f2e3kh8n9nosl5dfgaae.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4500/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile);
      return cb(null, profile);
      // });
    }
  )
);

module.exports = passport;

//http://localhost:4500/auth/google
