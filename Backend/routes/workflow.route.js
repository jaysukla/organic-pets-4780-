const express = require("express");
const moment = require("moment");
const { Usermodel } = require("../models/user.model");
const { sendMail } = require("../config/mail");
const WorkflowCreatedTemplate = require("../config/workflowstemplate");
const reminderCreatedTemplate = require("../config/reminderTemplate");
const cron = require("node-cron");
const schedule = require("node-schedule");

let WorkFlowRouter = express.Router();

WorkFlowRouter.post("/create", async (req, res) => {
  let workflow = req.body;
  let email = req.body.userEmail;
  try {
    let userName = await Usermodel.findOne({ email });
    const EmailBody = WorkflowCreatedTemplate(workflow, userName.name);
    sendMail("WorkFlow Scheduled", EmailBody, email);
    res.json({ Message: "Workflow Created Successfully", Created: true });
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
});

// WorkFlowRouter.post("/notifyhost/:beforetime", (req, res) => {
//   let details = req.body;
//   let beforeSeconds = req.params.beforetime;
//   let CurrentDateTime = details.CurrentDateTime;
//   let schduledDateTime = details.schduledDateTime;
//   console.log(details);

//   // calculating difference between date and timein sec
//   function calculateSeconds(startDate, endDate) {
//     var start_date = moment(startDate, "YYYY-MM-DD hh:mm A");
//     var end_date = moment(endDate, "YYYY-MM-DD hh:mm A");
//     var duration = moment.duration(end_date.diff(start_date));
//     var seconds = duration.asSeconds();
//     return seconds;
//   }
//   // providing current DateTime and end DateTime
//   let totalSeconds = calculateSeconds(CurrentDateTime, schduledDateTime);

//   // decresing the time user wants to get notification from the schduled time/start DateTime
//   let sendingNotificationMailSec = totalSeconds * 1000 - beforeSeconds * 1000;

//   console.log(CurrentDateTime, sendingNotificationMailSec);
//   if (sendingNotificationMailSec >= 0) {
//     setTimeout(() => {
//       const EmailBody = reminderCreatedTemplate(details);
//       console.log("sending mail");
//       sendMail(details.TwSub, EmailBody, details.userEmail);
//     }, sendingNotificationMailSec);
//     res.send({
//       msg: "Workflow Created",
//       remaining: sendingNotificationMailSec,
//       currenttime: CurrentDateTime,
//     });
//   } else {
//     res.status(400);
//     res.send("The time you selected is not valid.");
//   }
// });

WorkFlowRouter.post("/notifyhost/:beforetime", (req, res) => {
  let details = req.body;
  let beforeMin = req.params.beforetime;
  let CurrentDateTime = details.CurrentDateTime;
  let schduledDateTime = details.schduledDateTime;

  const job = schedule.scheduleJob("reminder", "* * * * *", async () => {
    const currentTime = moment(CurrentDateTime, "YYYY-MM-DD hh:mm A");
    const eventTime = moment(schduledDateTime, "YYYY-MM-DD hh:mm A");
    const remainingMinutes = moment
      .duration(eventTime.diff(currentTime))
      .asMinutes();
    console.log(remainingMinutes);
    // Check if it's within the 5-minute window before the event
    if (remainingMinutes == beforeMin) {
      const subject = "Your Event Reminder";
      const text = `Your event is going to happen at ${eventTime.format(
        "LLLL"
      )}. Don't forget to attend!`;

      // await sendEmail(userEmail, subject, text);
      console.log("Email sent successfully");
      job.cancel(); // Cancel the job after sending the email
      res.send("test");
    }
  });
});

module.exports = { WorkFlowRouter };
