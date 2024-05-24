const nodemailer = require("nodemailer");

const USER = "fiboliotest@gmail.com";
const PASS = "fibolio_22052024";

// only Gmail la gun, edit later
const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: USER,
    pass: PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

module.exports = transporter;

const sendVerificationEmail = (email, token) => {
  console.log("sendVerificationEmail \n USER: ", USER, "\n email: ", email);
  const mailOptions = {
    from: USER,
    to: email,
    subject: "Email Verification",
    html: `<p>Click <a href="http://localhost:3000/verify/${token}">here</a> to verify your email.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email verfication Error: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendVerificationEmail;
