const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "35.187.247.214",
    password: "fra502test_password",
    database: "fra502test",
})

const sql = `select c.course_class, cs.course_student_grade, c.course_credit from fra502test.Courses as c
join fra502test.CourseStudent as cs on c.course_id = cs.course_id where cs.student_id = ?`
const id = "63340500048"
app.get('/CourseStudent', (req, res) => {
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {

            res.send(result)
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


app.listen('3001', () => {
    console.log('Server is running on port 3001')
})