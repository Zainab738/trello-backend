const { createTransport } = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const transport = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "99a431001@smtp-brevo.com",
    pass: process.env.pass,
  },
});

const sendLoginEmail = (toEmail, username, token) => {
  const emailTemplate = fs.readFileSync(
    path.join(__dirname, "views", "emailTemplate.html"),
    "utf-8"
  );

  const verificationLink = `http://localhost:5173/verification-success?token=${token}`;
  const templateWithLink = emailTemplate.replace("{{link}}", verificationLink);

  const mailOptions = {
    from: "zainababbas07380@gmail.com",
    to: toEmail,
    subject: `Hi ${username}, verify your email`,
    html: templateWithLink,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) console.error("Error:", error);
    else console.log("Verification email sent");
  });
};

const VerifyPassword = (toEmail, username, token) => {
  const updatePasswordTemplate = fs.readFileSync(
    path.join(__dirname, "views", "updatePasswordTemplate.html"),
    "utf-8"
  );

  const verificationLink = `http://localhost:5173/UpdatePassword?token=${token}`;
  const templateWithLink = updatePasswordTemplate.replace(
    "{{link}}",
    verificationLink
  );

  const mailOptions = {
    from: "zainababbas07380@gmail.com",
    to: toEmail,
    subject: `Hi ${username}, verify your email to change your password`,
    html: templateWithLink,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) console.error("Error:", error);
    else console.log("Password verification email sent");
  });
};

module.exports = {
  sendLoginEmail,
  VerifyPassword,
};
