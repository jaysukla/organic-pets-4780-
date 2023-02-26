const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect("mongodb+srv://sitansu:smandal@cluster0.nhfpm6o.mongodb.net/mycal?retryWrites=true&w=majority");
module.exports = {
  connection
};

// db="mongodb+srv://JayShukla:jayshukla@cluster0.9zippbx.mongodb.net/MYCAL?retryWrites=true&w=majority"