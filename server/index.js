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
    const sql = "SELECT * FROM fra502test.StudentRegister WHERE email = ?";

    db.query(sql, [email], (err, data) => {
        if (err) return res.json({ message: "Connection errors" });
        if (data.length > 0) {
            const user = data[0];
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    return res.json({ message: "Login Successfully", studentID: user.studentID });
                } else {
                    return res.json({ message: "The password you entered is incorrect." });
                }
            });
        } else {
            return res.json({ message: "Email not found" });
        }
    });
});


app.post('/forgot-password', (req, res) => {
    const email = req.body.email;
    db.query('SELECT * FROM fra502test.StudentRegister WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล' });
        }

        if (results.length === 0) {
            // ไม่พบ email ในฐานข้อมูล
            return res.status(404).json({ message: 'Email Address is not Registered' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        return res.status(200).json({ message: 'Email address has been registered. We are taking you through identity verification.', otp: otp , email });
        //return res.status(200).json({ message: 'OTP code has been sent to your Email.', otp: otp , email });
    });
});


app.post('/check-info', (req, res) => {
    const { email, name, surname, studentID } = req.body;

    db.query('SELECT * FROM fra502test.StudentRegister WHERE email = ? AND name = ? AND surname = ? AND studentID = ?', [email, name, surname, studentID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to verify data' });
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'ข้อมูลถูกต้อง', valid: true });
        } else {
            return res.status(200).json({ message: 'ข้อมูลผิดพลาด', valid: false });
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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
