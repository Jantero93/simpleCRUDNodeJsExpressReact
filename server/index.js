// init express, app
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 9000;

//app use cors
app.use(cors());
app.use(express.json());

// init database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeesystem",
});

app.post("/create", (req, res) => {
  console.log(`req.body`, req.body);
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.age;
  const position = req.body.age;
  const wage = req.body.wage;
  // kysymysmerkit slotteina arrayn arvoille // placeholdereita
  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      // callback siitä kuinka kävi
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.put("/update", (req, res) => {
  console.log(`req.body`, req.body)
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("/update success");
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// another function used to tell is server running or not
app.listen(PORT, () => {
  console.log("Server is running on port 9000...");
});
