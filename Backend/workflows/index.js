const express = require("express");

const app = express();

const { notifyBeforeRouter } = require("./route/notifyBeforeEvent.route");

app.use(express.json());
app.use(notifyBeforeRouter);

app.listen(5050, () => {
  console.log("server started at 5050");
});
