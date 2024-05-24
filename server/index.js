const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "35.187.247.214",
    password: "fra502test_password",
    database: "fra502test",
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const studentSql = "SELECT * FROM fra502test.StudentRegister WHERE email = ?";
    const teacherSql = "SELECT * FROM fra502test.TeacherRegister WHERE email = ?";

    db.query(studentSql, [email], (studentErr, studentData) => {
        if (studentErr) return res.json({ message: "Connection errors" });
        if (studentData.length > 0) {
            const user = studentData[0];
            bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptResult) {
                    return res.json({ message: "Login Successfully", studentID: user.studentID , role: "Student" });
                } else {
                    return res.json({ message: "The password you entered is incorrect." });
                }
            });
        } else {
            db.query(teacherSql, [email], (teacherErr, teacherData) => {
                if (teacherErr) return res.json({ message: "Connection errors" });
                if (teacherData.length > 0) {
                    const user = teacherData[0];
                    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
                        if (bcryptResult) {
                            return res.json({ message: "Login Successfully", teacherID: user.TeacherID , role: "Teacher" });
                        } else {
                            return res.json({ message: "The password you entered is incorrect." });
                        }
                    });
                } else {
                    return res.json({ message: "Email not found" });
                }
            });
        }
    });
});


app.post('/forgot-password', (req, res) => {
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
            return res.status(200).json({ message: "Email address has been registered. We are proceeding with identity verification.", route: "/check", email });
        } else {
            db.query(teacherSql, [email], (teacherErr, teacherData) => {
                if (teacherErr) {
                    console.error(teacherErr);
                    return res.status(500).json({ message: "Connection errors" });
                }

                if (teacherData.length > 0) {
                    // พบ email ใน TeacherRegister
                    return res.status(200).json({ message: "Email address has been registered. We are proceeding with identity verification.", route: "/check_teacher", email });
                } else {
                    // ไม่พบ email ในทั้ง StudentRegister และ TeacherRegister
                    return res.status(404).json({ message: 'Email Address is not Registered' });
                }
            });
        }
    });
});



app.post('/check-info', (req, res) => {
    const { email, name, surname, studentID } = req.body;

    db.query('SELECT * FROM fra502test.StudentRegister WHERE email = ? AND LOWER(name) = ? AND LOWER(surname) = ? AND studentID = ?', [email, name, surname, studentID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to verify data' });
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'All the Information is correct.', valid: true });
        } else {
            return res.status(200).json({ message: 'invalid information', valid: false });
        }
    });
});

app.post('/check-infoT', (req, res) => {
    const { email, name, surname } = req.body;

    db.query('SELECT * FROM fra502test.TeacherRegister WHERE email = ? AND LOWER(name) = ? AND LOWER(surname) = ?', [email, name, surname ], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to verify data' });
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'All the Information is correct.', valid: true });
        } else {
            return res.status(200).json({ message: 'invalid information', valid: false });
        }
    });
});

app.post('/change-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('UPDATE fra502test.StudentRegister SET password = ? WHERE email = ?', [hashedPassword, email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to update password' });
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({ message: 'Password updated successfully', success: true });
            } else {
                return res.status(404).json({ message: 'Email not found', success: false });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to hash password' });
    }
});

app.post('/change-passwordT', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('UPDATE fra502test.TeacherRegister SET password = ? WHERE email = ?', [hashedPassword, email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to update password' });
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({ message: 'Password updated successfully', success: true });
            } else {
                return res.status(404).json({ message: 'Email not found', success: false });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to hash password' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
