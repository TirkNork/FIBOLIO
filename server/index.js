const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const port = 3001;


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const db = mysql.createConnection({
  user: "root",
  host: "35.187.247.214",
  password: "fra502test_password",
  database: "fra502test",
});

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }  // 20MB file size limit
});

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
  const id = req.query.student_id; // Read from query parameters
  db.query("SELECT * FROM Projects WHERE student_id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching projects from the database.");
    }

    res.status(200).send(result); // Return the projects
  });
});



app.get("/projects/:id", (req, res) => {
  const id = req.params.id;
  
  db.query("SELECT * FROM Projects WHERE project_id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching project details from the database.");
    }

    // Check if the project with the given ID exists
    if (result.length === 0) {
      return res.status(404).send("Project not found.");
    }

    res.status(200).send(result); 
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
  const uniqueFilename = `${project_name}_${timestamp}`; // Append the timestamp to the original filename

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


app.put("/updateProject/:id", upload.single("file"), (req, res) => {
  const id = req.params.id;
  const { project_name, project_year, course_id, description } = req.body;
  const file = req.file;
  if (file) {
    // Step 1: Fetch the current image path from the database
    db.query("SELECT student_id, img_path FROM Projects WHERE project_id = ?", [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching project details from the database.");
      }
  
      if (result.length === 0) {
        return res.status(404).send("Project not found.");
      }
  
      const studentId = result[0].student_id;
      const oldImgPath = result[0].img_path;
  
      // Step 2: Delete the old image from GCS
      const oldFile = bucket.file('project/' + oldImgPath.split("/").slice(-2).join("/"))
      oldFile.delete((err) => {
        if (err) {
          console.error("Error deleting old image from GCS:", err);
          return res.status(500).send("Error deleting old image from GCS.");
        }
  
        console.log("Old image deleted successfully.");
  
        // Step 3: Upload the new image to GCS
        const timestamp = Date.now(); // Use timestamp as a unique identifier
        const uniqueFilename = `${project_name}_${timestamp}`; // Append the timestamp to the original filename
        const folderPath = `project/${studentId}/`;
        const newFilePath = folderPath + uniqueFilename;
  
        const blob = bucket.file(newFilePath);
        const blobStream = blob.createWriteStream();
  
        blobStream.on("error", (err) => {
          console.error("Error uploading new image to GCS:", err);
          return res.status(500).send("Error uploading new image to GCS.");
        });
  
        blobStream.on("finish", () => {
          const newImgUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  
          // Step 4: Update the project details in the database
          db.query(
            "UPDATE Projects SET project_name = ?, project_year = ?, course_id = ?, description = ?, img_path = ? WHERE project_id = ?",
            [project_name, project_year, course_id, description, newImgUrl, id],
            (err, results) => {
              if (err) {
                console.error("Error updating project in database:", err);
                return res.status(500).send("Error updating project in database.");
              }
  
              res.status(200).send("Project updated successfully.");
              console.log("Project Updated");
            }
          );
        });
  
        blobStream.end(file.buffer);
      });
    });
  }
  else{
    db.query(
      "UPDATE Projects SET project_name = ?, project_year = ?, course_id = ?, description = ? WHERE project_id = ?",
      [project_name, project_year, course_id, description, id],
      (err, results) => {
        if (err) {
          console.error("Error updating project in database:", err);
          return res.status(500).send("Error updating project in database.");
        }

        res.status(200).send("Project updated successfully.");
        console.log("Project Updated");
      }
    );

  }

});

// // Existing endpoints for updating and deleting projects
// app.put("/updateProject/:id", (req, res) => {
//   const id = req.params.id;
//   const { project_name, project_year, course_id, description, img_path } = req.body;
//   db.query(
//     "UPDATE Projects SET project_name = ?, project_year = ?, course_id = ?, description = ?, img_path = ? WHERE project_id = ?",
//     [project_name, project_year, course_id, description, img_path, id],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(results);
//         console.log("Project Updated");
//       }
//     }
//   );
// });

app.delete("/delProject/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT student_id, img_path FROM Projects WHERE project_id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching project details from the database.");
    }

    if (result.length === 0) {
      return res.status(404).send("Project not found.");
    }

    const studentId = result[0].student_id;
    const originalFilePath = result[0].img_path;

    const parts = originalFilePath.split('/');
    const imageName = parts.pop();
    const filePath = `project/${studentId}/${imageName}`;

    // Delete the file from the bucket
    const file = bucket.file(filePath);
    file.delete((err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
        return res.status(500).send("Error deleting file from bucket.");
      }
      console.log(`File ${filePath} deleted successfully`);
      
      // Delete the project from the database
      db.query("DELETE FROM Projects WHERE project_id = ?", [id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error deleting project from the database.");
        }
        console.log("Project Deleted");
        res.sendStatus(204); // Success, no content
      });
    });
  });
});

app.get("/coursename/:id", (req, res) => {
    const id = req.params.id;
    const sql = `
                SELECT c.course_name, c.course_id
                FROM fra502test.Courses as c
                WHERE c.course_key = ?
                `;
                
    db.query(sql, [id] , (err, result) => {
        if(err){
            console.log(err);

  app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const studentSql = "SELECT * FROM fra502test.StudentRegister WHERE email = ?";
  const teacherSql = "SELECT * FROM fra502test.TeacherRegister WHERE email = ?";
  db.query(studentSql, [email], (studentErr, studentData) => {
    if (studentErr) return res.json({ message: "Connection errors" });
    if (studentData.length > 0) {
      const user = studentData[0];
      bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
        if (bcryptResult) {
          return res.json({
            message: "Login Successfully",
            studentID: user.studentID,
            role: "Student",
          });
        } else {
          return res.json({
            message: "The password you entered is incorrect.",
          });
           }
      });
    } else {
      db.query(teacherSql, [email], (teacherErr, teacherData) => {
        if (teacherErr) return res.json({ message: "Connection errors" });
        if (teacherData.length > 0) {
          const user = teacherData[0];
          bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
            if (bcryptResult) {
              return res.json({
                message: "Login Successfully",
                teacherID: user.TeacherID,
                role: "Teacher",
              });
            } else {
              return res.json({
                message: "The password you entered is incorrect.",
              });
            }
          });
        } else {
          return res.json({ message: "Email not found" });
        }
      });
    }
  });
});
       

app.post("/forgot-password", (req, res) => {
  const email = req.body.email;
  const studentSql = "SELECT * FROM fra502test.StudentRegister WHERE email = ?";
  const teacherSql = "SELECT * FROM fra502test.TeacherRegister WHERE email = ?";

  db.query(studentSql, [email], (studentErr, studentData) => {
    if (studentErr) {
      console.error(studentErr);
      return res.status(500).json({ message: "Connection errors" });
    }

    if (studentData.length > 0) {
      // พบ email ใน StudentRegister
      return res.status(200).json({
        message:
          "Email address has been registered. We are proceeding with identity verification.",
        route: "/check",
        email,
      });
    } else {
      db.query(teacherSql, [email], (teacherErr, teacherData) => {
        if (teacherErr) {
          console.error(teacherErr);
          return res.status(500).json({ message: "Connection errors" });
        }

        if (teacherData.length > 0) {
          // พบ email ใน TeacherRegister
          return res.status(200).json({
            message:
              "Email address has been registered. We are proceeding with identity verification.",
            route: "/check_teacher",
            email,
          });
        } else {
          // ไม่พบ email ในทั้ง StudentRegister และ TeacherRegister
          return res
            .status(404)
            .json({ message: "Email Address is not Registered" });
        }
      });
    }
  });
});

app.post("/check-info", (req, res) => {
  const { email, name, surname, studentID } = req.body;

  db.query(
    "SELECT * FROM fra502test.StudentRegister WHERE email = ? AND LOWER(name) = ? AND LOWER(surname) = ? AND studentID = ?",
    [email, name, surname, studentID],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to verify data" });
      }

      if (results.length > 0) {
        return res
          .status(200)
          .json({ message: "All the Information is correct.", valid: true });
      } else {
        return res
          .status(200)
          .json({ message: "invalid information", valid: false });
      }
    }
  );
});

app.post("/check-infoT", (req, res) => {
  const { email, name, surname } = req.body;

  db.query(
    "SELECT * FROM fra502test.TeacherRegister WHERE email = ? AND LOWER(name) = ? AND LOWER(surname) = ?",
    [email, name, surname],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to verify data" });
      }

      if (results.length > 0) {
        return res
          .status(200)
          .json({ message: "All the Information is correct.", valid: true });
      } else {
        return res
          .status(200)
          .json({ message: "invalid information", valid: false });
      }
    }
  );
});

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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.post("/change-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "UPDATE fra502test.StudentRegister SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to update password" });
        }

        if (results.affectedRows > 0) {
          return res
            .status(200)
            .json({ message: "Password updated successfully", success: true });
        } else {
          return res
            .status(404)
            .json({ message: "Email not found", success: false });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to hash password" });
  }
});

app.post("/change-passwordT", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "UPDATE fra502test.TeacherRegister SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to update password" });
        }

        if (results.affectedRows > 0) {
          return res
            .status(200)
            .json({ message: "Password updated successfully", success: true });
        } else {
          return res
            .status(404)
            .json({ message: "Email not found", success: false });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to hash password" });
  }
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
              SELECT c.student_id, c.course_student_score, c.course_student_grade, p.student_firstname, p.student_surname 
              FROM fra502test.Personal_Information as p
              JOIN fra502test.CourseStudent as c ON c.student_id = p.student_id
              WHERE c.course_key = ?
              ORDER BY c.student_id 
              `;
              
  db.query(sql, [id] , (err, result) => {
      if(err){
          console.log(err);
      }
      else{
          res.send(result)
      }
  });
});

app.get('/CourseStudent', (req, res) => {
  // const id = 63340500048;
  const id = req.query.student_id;
  const query = `
    SELECT c.course_class, cs.course_student_grade, c.course_credit
    FROM fra502test.Courses AS c
    JOIN fra502test.CourseStudent AS cs
    ON c.course_id = cs.course_id
    WHERE cs.student_id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result);
    }
  });
});
      
app.get('/CompetencyDescription', (req, res) => {
    db.query("SELECT * FROM fra502test.CompetencyDescription;", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result)
        }
    });
});

app.post("/updateScore/:id", (req, res) => {
    const id = req.params.id;
    const scores = req.body; // Assuming req.body is an array of score objects

    // Start a transaction
    db.beginTransaction(err => {
        if (err) {
            return res.status(500).send({ error: "An error occurred while starting the transaction." });
        }

        const updatePromises = scores.map(score => {
            return new Promise((resolve, reject) => {
                const { student_firstname, student_lastname, student_id, course_student_score, course_student_grade } = score;
                const sql = `
                    UPDATE fra502test.CourseStudent 
                    SET course_student_score = ?, course_student_grade = ?
                    WHERE course_key = ? 
                    AND student_id = ?;
                `;

                db.query(sql, [course_student_score, course_student_grade, id, student_id], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        });

        Promise.all(updatePromises)
            .then(results => {
                // Commit the transaction if all updates succeed
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).send({ error: "An error occurred while committing the transaction." });
                        });
                    }
                    res.json({
                        message: 'Scores updated successfully',
                        results
                    });
                });
            })
            .catch(error => {
                // Rollback the transaction in case of any failure
                db.rollback(() => {
                    console.error("There was an error updating the project!", error);
                    res.status(500).send({ error: "An error occurred while updating the scores." });
                });
            });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
