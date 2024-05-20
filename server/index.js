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
    const sub = 'FRA100';
    const sql = `
                SELECT c.student_id, c.course_student_score, p.student_firstname, p.student_surname 
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

// app.get('/students', (req, res) => {
//     res.json(data)
// });

// app.put("/updateScore/:id", (req, res) => {
//     const id = req.params.id
//     const {first_name, last_year, student_id, score} = req.body;
//     res.json({first_name, last_year, student_id, score})
//     // db.query(
//     //   "UPDATE Projects SET project_name = ?, project_year = ?, course_id = ?, description = ?, img_path = ? WHERE project_id = ?",
//     //   [project_name, project_year, course_id, description, img_path, id],
//     //   (err, results) => {
//     //     if (err) {
//     //       console.log(err)
//     //     } else {
//     //       res.send(results)
//     //       console.log('Project Updated')
//     //     }
//     //   }
//     // )
//   })

app.listen(PORT, () => {
    console.log('Server is running on port', {PORT})
})