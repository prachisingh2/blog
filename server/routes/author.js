const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});

router.get('/:authorid', (req, res) => {
    const authorid = req.params.authorid;
   // console.log('Author ID:', authorid);
    con.query('SELECT * FROM posts WHERE authorid = ?', [authorid], (err, posts) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
        } else {
            res.send(posts);
        }
    });
});

module.exports = router;