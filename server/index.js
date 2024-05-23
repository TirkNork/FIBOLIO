const express = require('express');
const app = express();
const mysql = require('mysql');
const cors =require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "35.187.247.214",
    password: "fra502test_password",
    database: "fra502test",
})

app.get('/testTable', (req, res) => {
    db.query("SELECT * FROM testTable", (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    });
});

app.get('/studyBackground/:id', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM StudyBackground WHERE student_id = ?",[id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    });
});

app.get('/personal_Information/:id', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM Personal_Information WHERE student_id = ?",[id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    });
});

app.get('/interests/:id', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM Interests WHERE student_id = ?",[id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    });
});

app.get('/hardSkills/:id', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM hardSkills WHERE student_id = ?",[id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    });
});

app.get('/softSkills/:id', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM SoftSkills WHERE student_id = ?",[id], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    });
});

app.listen('3001', () => {
    console.log('Server is running on port 3001')
})