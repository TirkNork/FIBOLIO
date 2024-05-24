const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { google } = require("googleapis");
// const router = express.Router();
// const OAuth2 = google.auth.OAuth2;
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");

// -------- Program Constants --------

const PORT = 3001;
// const USER = "fiboliotest@gmail.com";
// const PASS = "fibolio_22052024";
// const CLIENT_ID =
//   "250639743293-drknj826ss8r98em8hdr0usjhgdo45hg.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URL = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04cz3KOGF9jiTCgYIARAAGAQSNwF-L9Irk2mCFGB6x8dlgZe0a9PqWm5dy3a1Qu0y-MUaC0SvSAwokyTQA3RGpPcVIuHh-YeDD5E";

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "35.187.247.214",
  password: "fra502test_password",
  database: "fra502test",
});

// const oauth2Client = new OAuth2(
//   CLIENT_ID, // ClientID
//   CLIENT_SECRET, // Client Secret
//   REDIRECT_URL // Redirect URL
// );

// oauth2Client.setCredentials({
//   refresh_token: REFRESH_TOKEN,
// });
// const accessToken = oauth2Client.getAccessToken();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: USER,
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     refreshToken: REFRESH_TOKEN,
//     accessToken: accessToken,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// const generateVerificationToken = () => {
//   return crypto.randomBytes(16).toString("hex");
// };

// const sendVerificationEmail = (email, token) => {
//   console.log("sendVerificationEmail \n USER: ", USER, "\n email: ", email);
//   const mailOptions = {
//     from: USER,
//     to: email,
//     subject: "Email Verification",
//     html: `<p>Click <a href="http://localhost:3000/verify/${token}">here</a> to verify your email.</p>`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Email verfication Error: ", error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

app.post("/Register01", async (req, res) => {
  console.log("Register01");
  const { userType, studentID, name, surname, email, password } = req.body;
  // const verifyToken = generateVerificationToken();
  console.log("userType: ", userType, "studentID: ", studentID);

  try {
    const hash = await bcrypt.hash(password, 12);

    let query;
    let values;

    if (userType === "Student") {
      console.log("Student Database");
      query =
        "INSERT INTO StudentRegister (`studentID`, `name`, `surname`, `email`, `password`) VALUES (?, ?, ?, ?, ?)";
      values = [studentID, name, surname, email, hash];
    } else if (userType === "Instructor") {
      query =
        "INSERT INTO TeacherRegister (`name`, `surname`, `email`, `password`) VALUES (?, ?, ?, ?)";
      values = [name, surname, email, hash];
    }

    db.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        if (err.code === "ER_DUP_ENTRY") {
          res.status(400).json({
            message: "Duplicate entry for key 'StudentRegister.PRIMARY'",
          });
        } else {
          res.status(500).json({ message: "Database error", error: err });
        }
      } else {
        res.json({ message: "Registration successful", results });
        console.log("Student Register Inserted");
      }
    });

    // sendVerificationEmail(email, verifyToken);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
