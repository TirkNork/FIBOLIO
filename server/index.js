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
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/testTable', (req, res) => {
    db.query("SELECT * FROM testTable", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/studyBackground/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM StudyBackground WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/studyBackground/:id', (req, res) => {
    const id = req.params.id;
    const { highschoolname, highschoolstart, highschoolstop, highschoolprogram, highschoolgpx, universityname, universitymajor, universitystart, universitystop, universitygpax } = req.body;

    const sql = `
        UPDATE StudyBackground
        SET high_school_name = ?, high_school_start = ?, high_school_stop = ?, high_school_program = ?, high_school_gpx = ?, university_name = ?, university_major = ?, university_start = ?, university_stop = ?, university_gpax = ?
        WHERE student_id = ?
    `;
    db.query(sql, [highschoolname, highschoolstart, highschoolstop, highschoolprogram, highschoolgpx, universityname, universitymajor, universitystart, universitystop, universitygpax, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result)
            res.send(result);
        }
    });
});


app.get('/personal_Information/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Personal_Information WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/personal_Information/:id', (req, res) => {
    const id = req.params.id;
    const { firstName, nickname, email, tel, address, lastName, frab } = req.body;

    const sql = `
        UPDATE Personal_Information
        SET student_firstname = ?, student_nickname = ?, student_email = ?, student_tel = ?, student_address = ?, student_surname = ?, student_frab = ?
        WHERE student_id = ?
    `;

    db.query(sql, [firstName, nickname, email, tel, address, lastName, frab, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/interests/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Interests WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/interests/:id', (req, res) => {
    const id = req.params.id;
    const { interests } = req.body;

    const sql = `
        UPDATE Interests
        SET Interest_name = ?
        WHERE student_id = ?
    `;
    console.log(id)
    db.query(sql, [interests, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result)
            res.send(result);
        }
    });
});

app.get('/hardSkills/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM HardSkills WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/hardSkills/:id', (req, res) => {
    const id = req.params.id;
    const { hardSkills } = req.body;

    const sql = `
        UPDATE HardSkills
        SET hard_skill_name = ?
        WHERE student_id = ?
    `;
    console.log(id)
    db.query(sql, [hardSkills, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result)
            res.send(result);
        }
    });
});

app.get('/softSkills/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM SoftSkills WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/softSkills/:id', (req, res) => {
    const id = req.params.id;
    const { softSkills } = req.body;

    const sql = `
        UPDATE SoftSkills
        SET soft_skill_name = ?
        WHERE student_id = ?
    `;
    
    db.query(sql, [softSkills, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Projects WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/projects/:id', (req, res) => {
    const id = req.params.id;
    const { projects } = req.body;

    const sql = `
        UPDATE Projects
        SET project_name = ?
        WHERE student_id = ?
    `;
    
    db.query(sql, [projects, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get('/experiences/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Experiences WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/experiences/:id', (req, res) => {
    const id = req.params.id;
    const { experiences } = req.body;

    const sql = `
        UPDATE Experiences
        SET description = ?
        WHERE student_id = ?
    `;
    
    db.query(sql, [experiences, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get('/awards/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Awards WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/awards/:id', (req, res) => {
    const id = req.params.id;
    const { awards } = req.body;

    const sql = `
        UPDATE Awards
        SET description = ?
        WHERE student_id = ?
    `;
    
    db.query(sql, [awards, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get('/internships/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM Internships WHERE student_id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/internships/:id', (req, res) => {
    const id = req.params.id;
    const { internships } = req.body;
    console.log("eiei",req.body)
    console.log(internships)

    const sql = `
        UPDATE Internships
        SET description = ?
        WHERE student_id = ?
    `;
    
    db.query(sql, [internships, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.listen('3001', () => {
    console.log('Server is running on port 3001');
});