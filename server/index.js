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
        if (err) return res.json({ message: "Error" });
        if (data.length > 0) {
            const user = data[0];
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    user.studentID = "SELECT studentID FROM fra502test.StudentRegister WHERE email = ?";
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

        // สร้างรหัส OTP 6 หลัก
        const otp = Math.floor(100000 + Math.random() * 900000);

        // ส่งรหัส OTP ไปยังอีเมล

        return res.status(200).json({ message: 'OTP code has been sent to your Email.', otp: otp });
    });
});

app.post('/resend-otp', (req, res) => {
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

        // สร้างรหัส OTP 6 หลัก
        const otp = Math.floor(100000 + Math.random() * 900000);

        // ส่งรหัส OTP ไปยังอีเมล

        return res.status(200).json({ message: 'OTP code has been sent to your Email.', otp: otp });
    });
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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
