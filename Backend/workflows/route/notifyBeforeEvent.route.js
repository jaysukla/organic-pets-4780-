const express = require("express");
const moment = require("moment");

let notifyBeforeRouter = express.Router();

notifyBeforeRouter.post("/workflow/notifyhost/:beforetime", (req, res) => {
  let beforeSeconds = req.params.beforetime;

  // calculating difference between date and timein sec
  function calculateSeconds(startDate, endDate) {
    var start_date = moment(startDate, "YYYY-MM-DD hh:mm A");
    var end_date = moment(endDate, "YYYY-MM-DD hh:mm A");
    var duration = moment.duration(end_date.diff(start_date));
    var seconds = duration.asSeconds();
    return seconds;
  }
  // providing current DateTime and end DateTime
  let totalSeconds = calculateSeconds(
    "2023-02-23:08:00:am",
    "2023-02-23:08:01:am"
  );
  // decresing the time user wants to get notification from the schduled time/start DateTime
  let sendingNotificationMailSec = totalSeconds * 1000 - beforeSeconds * 1000;
  console.log(sendingNotificationMailSec);

  if (sendingNotificationMailSec >= 0) {
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, sendingNotificationMailSec);
    res.send("yes");
  } else {
    res.status(400);
    res.send("The time you selected is not valid.");
  }
});

module.exports = { notifyBeforeRouter };
