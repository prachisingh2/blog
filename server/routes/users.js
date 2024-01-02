const express = require('express');
//const bcrypt = require('bcrypt');
const mysql = require('mysql');
const router = express.Router();


const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});

// Get all users
router.get('/', (req, res) => {
  con.query('SELECT * FROM users', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 10);
  con.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  con.query('SELECT * FROM users WHERE email = ?', [email], (err, users) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal server error' });
    } else {
      if (users.length > 0) {
        // console.log("Logged in");
        const user = users[0];
        if (password === user.password) {
          req.session.userId = user.id;
          res.send({ message: 'Logged in', user });
        } else {
          res.status(401).send({ message: 'Invalid credentials' });
        }
      } else {
        res.status(401).send({ message: 'Invalid credentials' });
      }
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.send({ message: 'Logged out' });
    }
  });
});

module.exports = router;