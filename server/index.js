const express = require('express');
const app = express();
const mysql = require('mysql');
const cors =require('cors');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
    user: "root",
    host: "35.187.247.214",
    password: "fra502test_password",
    database: "fra502test",
})

const data = [
    {
        student_id : 1,
        first_name : "Phufa", 
        last_name : "Boonchuatrong",
        score : 90
    },
    {
        student_id : 2,
        first_name : "Paraphat", 
        last_name : "likit",
        score : 60
    },
    {
        student_id : 3,
        first_name : "Yelly", 
        last_name : "something",
        score : 77
    }

]

app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    const sql = `
                SELECT c.student_id, c.course_student_score, c.course_student_grade, p.student_firstname, p.student_surname 
                FROM fra502test.Personal_Information as p
                JOIN fra502test.CourseStudent as c ON c.student_id = p.student_id
                WHERE c.course_id = ?
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
                const { student_firstname, student_lastname, student_id, course_student_score } = score;
                const sql = `
                    UPDATE fra502test.CourseStudent 
                    SET course_student_score = ?
                    WHERE course_id = ? 
                    AND student_id = ?;
                `;

                db.query(sql, [course_student_score, id, student_id], (err, results) => {
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


// app.post("/updateScore/:id", (req, res) => {
//     const id = req.params.id
//     const {student_firstname, student_lastname, student_id, course_student_score} = req.body;

//     res.json({student_firstname, student_lastname, student_id, course_student_score})

//     const sql = `
//                 UPDATE fra502test.CourseStudent as c 
//                 SET course_student_score = ?
//                 WHERE course_id = ? 
//                 AND student_id = ?;
//                 `
                
//     db.query(sql, [course_student_score, id, student_id],
//       (err, results) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.send(results)
//           console.log('Score Updated')
//         }
//       }
//     )
//   })

app.listen(PORT, () => {
    console.log('Server is running on port', {PORT})
})