const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "35.187.247.214",
  password: "fra502test_password",
  database: "fra502test",
});

// Ex. for basic query
app.get("/testTable", (req, res) => {
  db.query("SELECT * FROM testTable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Ex. for query with parameter
app.get("/testTable/:age", (req, res) => {
  const age = req.params.age;
  db.query("SELECT * FROM testTable WHERE age > ?", [age], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
