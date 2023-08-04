require("dotenv").config;
const nodemailer = require("nodemailer");
const formData = require("form-data");
// const Mailgun = require("mailgun.js");
// const mailgun = new Mailgun(formData);
// const Mailjet = require("node-mailjet");
// const mailjet = Mailjet.apiConnect(
//   process.env.MJ_APIKEY_PUBLIC,
//   process.env.MJ_APIKEY_PRIVATE
// );

const sendMail = async (subject, body, userMail) => {
  // console.log(subject, userMail);
  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    host: "smtp.office365.com",
    port: 587,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.email,
    to: userMail,
    subject: subject,
    html: body,
  });
  console.log(info);

  // const request = mailjet.post("send", { version: "v3.1" }).request({
  //   Messages: [
  //     {
  //       From: {
  //         Email: "punitjuneja123@gmail.com",
  //         Name: "My Cal",
  //       },
  //       To: [
  //         {
  //           Email: userMail,
  //         },
  //       ],
  //       Subject: subject,
  //       HTMLPart: body,
  //     },
  //   ],
  // });

  // request
  //   .then((result) => {
  //     console.log(result.body);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     console.log(err.statusCode);
  //   });
};

module.exports = { sendMail };

// const mg = mailgun.client({
//     username: "api",
//     key: process.env.mailgunKey,
//   });
//   mg.messages
//     .create("sandbox9614b0bcc1a248bd8164fbb6e20ae0cd.mailgun.org", {
//       from: "Mailgun Sandbox <postmaster@sandbox9614b0bcc1a248bd8164fbb6e20ae0cd.mailgun.org>",
//       to: [`${userMail}`],
//       subject: subject,
//       html: body,
//     })
//     .then((msg) => console.log(msg)) // logs response data
//     .catch((err) => console.log(err)); // logs any error`;
