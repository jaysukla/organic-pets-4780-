const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["customer", "manager"], default: "customer" },
  },
  {
    versionKey: false,
  }
);

const Usermodel = mongoose.model("user", userSchema);

module.exports = {
  Usermodel,
};
