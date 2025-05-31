const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET all students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST new student
app.post('/students', (req, res) => {
  const { firstName, lastName, address, email, contact, gender } = req.body;
  db.query('INSERT INTO students (firstName, lastName, address, email, contact, gender) VALUES (?, ?, ?, ?, ?, ?)', [firstName, lastName, address, email, contact, gender], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, firstName, lastName, address, email, contact, gender });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
