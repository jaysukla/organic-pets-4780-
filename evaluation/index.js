const express = require("express");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/users.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.get("/", async (req, res) => {
  try {
    res.send("Welcome to backend");
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: error.message });
  }
});

app.listen(8000, async (req, res) => {
  try {
    await connection,
    console.log(`Connected to 8080`);
    console.log("Connect to DB");
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in Connection" });
  }
});
