const nodemailer = require("nodemailer");

const sendMail = async (subject, body, userMail) => {
  console.log("working");
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "punitjuneja123@gmail.com",
      pass: "qcP20DRzwQyFvBHg",
    },
  });
  let info = await transporter.sendMail({
    from: '"mycal" <mycal@mail.com>',
    to: userMail,
    subject: subject,
    text: body,
    html: body,
  });
  console.log("Message sent: %s", info.messageId);
};

module.exports = { sendMail };
