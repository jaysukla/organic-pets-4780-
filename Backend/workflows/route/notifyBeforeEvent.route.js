const express = require("express");
const moment = require("moment");
const { sendMail } = require("../controller/mail");

let notifyBeforeRouter = express.Router();

notifyBeforeRouter.post("/workflow/notifyhost/:beforetime", (req, res) => {
  let { subject, body, schduledDateTime, userMail } = req.body;
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
  var CurrentDateTime = moment().format("YYYY-MM-DD hh:mm A");
  let totalSeconds = calculateSeconds(CurrentDateTime, schduledDateTime);
  // decresing the time user wants to get notification from the schduled time/start DateTime
  let sendingNotificationMailSec = totalSeconds * 1000 - beforeSeconds * 1000;

  console.log(sendingNotificationMailSec, totalSeconds, beforeSeconds);
  if (sendingNotificationMailSec >= 0) {
    setTimeout(() => {
      sendMail(subject, body, userMail);
    }, sendingNotificationMailSec);
    res.send("workflow created");
  } else {
    res.status(400);
    res.send("The time you selected is not valid.");
  }
});

module.exports = { notifyBeforeRouter };
