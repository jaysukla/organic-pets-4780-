const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect("mongodb+srv://JayShukla:jayshukla@cluster0.9zippbx.mongodb.net/MYCAL?retryWrites=true&w=majority");
module.exports = {
  connection
};