const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "35.187.247.214",
  password: "fra502test_password",
  database: "fra502test",
});

app.get("/testTable", (req, res) => {
  db.query("SELECT * FROM testTable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/projects/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM projects WHERE project_id = ?", [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.post("/insertProjects", (req, res) => {
    const {student_id, project_name, project_year, course_id, description, img_path} = req.body;
    db.query(
      "INSERT INTO projects (student_id, project_name, project_year, course_id, description, img_path) VALUES (?, ?, ?, ?, ?, ?)",
      [student_id, project_name, project_year, course_id, description, img_path],
      (err, results) => {
        if (err) {
          console.log(err)
        } else {
          res.send(results)
          console.log('Project Inserted')
        }
      }
    )
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
