const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect("mongodb+srv://sitansu:smandal@cluster0.nhfpm6o.mongodb.net/mycal?retryWrites=true&w=majority");
module.exports = {
  connection
};