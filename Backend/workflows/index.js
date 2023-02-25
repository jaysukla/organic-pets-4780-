const express = require("express");
const cors = require("cors");

const app = express();

const { notifyBeforeRouter } = require("./route/notifyBeforeEvent.route");

app.use(express.json());
app.use(cors());
app.use(notifyBeforeRouter);

app.listen(5050, () => {
  console.log("server started at 5050");
});
