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

// app.get('/testTable', (req, res) => {
//     db.query("SELECT * FROM testTable", (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send(result)
//         }
//     });
// });

//                    Test send data
const data = [
                {
                    id : 1,
                    firstname : "Phufa", 
                    lastname : "Boonchuatrong"
                },
                {
                    id : 2,
                    firstname : "Paraphat", 
                    lastname : "likit"
                }

            ]
    

app.get("/api", (req, res) => {
    // res.json({message: "Hello, This is server!"})
    // res.send({message : 'bua'})
    res.json(data)
});

app.listen(PORT, () => {
    console.log('Server is running on port 3001')
})