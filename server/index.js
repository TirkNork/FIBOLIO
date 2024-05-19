const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "35.187.247.214",
  password: "fra502test_password",
  database: "fra502test",
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Google Cloud Storage
const gcs = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE
});

const bucket = gcs.bucket(process.env.GCS_BUCKET);

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
  db.query("SELECT * FROM Projects", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/projects/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Projects WHERE project_id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// app.get('/images/:studentId/:imageName', (req, res) => {
//   const studentId = req.params.studentId
//   const imageName = req.params.imageName;
//   const filePath = `project/${studentId}/${imageName}`
//   const file = bucket.file(filePath);

//   file.download((err, content) => {
//     if (err) {
//       console.error('Error downloading image:', err);
//       return res.status(500).send('Error downloading image.');
//     }
//     res.setHeader('Content-Type', 'image/jpeg');
//     res.send(content);
//     console.log(content)
    
//   });
// });

app.post("/insertProjects", upload.single("file"), (req, res) => {
  const { student_id, project_name, project_year, course_id, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const timestamp = Date.now(); // Use timestamp as a unique identifier
  const uniqueFilename = `${timestamp}_${file.originalname}`; // Append the timestamp to the original filename

  const folderPath = `project/${student_id}/`;
  const filePath = folderPath + uniqueFilename;

  const blob = bucket.file(filePath);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    console.error(err);
    res.status(500).send("Error uploading to GCS");
  });

  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    db.query(
      "INSERT INTO Projects (student_id, project_name, project_year, course_id, description, img_path) VALUES (?, ?, ?, ?, ?, ?)",
      [student_id, project_name, project_year, course_id, description, publicUrl],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error inserting project into database");
        } else {
          res.status(200).send(results);
          console.log("Project Inserted");
        }
      }
    );
  });

  blobStream.end(file.buffer);
});



// Existing endpoints for updating and deleting projects
app.put("/updateProject/:id", (req, res) => {
  const id = req.params.id;
  const { project_name, project_year, course_id, description, img_path } = req.body;
  db.query(
    "UPDATE Projects SET project_name = ?, project_year = ?, course_id = ?, description = ?, img_path = ? WHERE project_id = ?",
    [project_name, project_year, course_id, description, img_path, id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
        console.log("Project Updated");
      }
    }
  );
});

app.delete("/delProject/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Projects WHERE project_id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Project Deleted");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
