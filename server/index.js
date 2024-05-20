const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 3001;
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "35.187.247.214",
  password: "fra502test_password",
  database: "fra502test",
});

// app.get("/testTable", (req, res) => {
//   db.query("SELECT * FROM testTable", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.post("/Register01", async (req, res) => {
  console.log("Register01");
  const { studentID, name, surname, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 12);
    db.query(
      "INSERT INTO StudentRegister (`studentID`, `name`, `surname`, `email`, `password`) VALUES (?, ?, ?, ?, ?)",
      [studentID, name, surname, email, hash],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
          console.log("Student Register Inserted");
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while hashing the password.");
  }
});

// app.post("/insertProjects", (req, res) => {
//   const {student_id, project_name, project_year, course_id, description, img_path} = req.body;
//   db.query(
//     "INSERT INTO Projects (student_id, project_name, project_year, course_id, description, img_path) VALUES (?, ?, ?, ?, ?, ?)",
//     [student_id, project_name, project_year, course_id, description, img_path],
//     (err, results) => {
//       if (err) {
//         console.log(err)
//       } else {
//         res.send(results)
//         console.log('Project Inserted')
//       }
//     }
//   )
// });

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
