const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});

//Get a single post
router.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    //console.log("Post id:",pid);
    con.query('SELECT * FROM posts WHERE pid = ?', [pid], (err, post) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
        } else {
            res.send(post);
        }
    });
});

// Delete a post
router.delete('/:pid', (req, res) => {
    con.query('DELETE FROM posts WHERE pid = ?', [req.params.pid], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//Update a post
router.put('/:pid', (req, res) => {
    const newData = req.body;
    con.query('UPDATE posts SET title = ?, content = ?, image = ? WHERE pid = ?', [newData.title, newData.content, newData.image, req.params.pid], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//Getting all posts of particular authorid
// router.get('/:authorid', (req, res) => {
//     const authorid = req.params.authorid;
//     console.log('Author ID:', authorid);
//     con.query('SELECT * FROM posts WHERE authorid = ?', [authorid], (err, posts) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send({ message: 'Internal server error' });
//         } else {
//             res.send(posts);
//         }
//     });
// });

// Get all posts
router.get('/', (req, res) => {
    con.query('SELECT * FROM posts', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Create a new post
router.post('/', (req, res) => {
    const postData = req.body;
    con.query('INSERT INTO posts SET ?', postData, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;