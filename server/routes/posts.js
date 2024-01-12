const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});

// Get a single post
router.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    con.query('SELECT posts.*, categories.name as category FROM posts LEFT JOIN categories ON posts.category_id = categories.id WHERE pid = ?', [pid], (err, post) => {
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

// Get all posts
router.get('/', (req, res) => {
    con.query('SELECT posts.*, categories.name as category FROM posts LEFT JOIN categories ON posts.category_id = categories.id', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Create a new post
router.post('/', (req, res) => {
    if (req.session.userId) {
        const postData = req.body;
        postData.authorid = req.session.userId;
        postData.category_id = req.body.category_id;
        con.query('INSERT INTO posts SET ?', postData, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.status(401).send({ message: 'Not logged in' });
    }
});

//Add a post as bookmarked
router.post('/:postId/bookmark', (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const postId = req.params.postId;
        // console.log(userId, postId);
        con.query('INSERT INTO bookmarks (userId, postId) VALUES (?, ?)', [userId, postId], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.status(401).send({ message: 'Not logged in' });
    }
});

// Remove a bookmark
router.delete('/:postId/bookmarked', (req, res) => {
    const userId = req.session.userId;
    const postId = req.params.postId;
    con.query('DELETE FROM bookmarks WHERE userId = ? AND postId = ?', [userId, postId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//Like increase of a post
router.post('/:postId/like', (req, res) => {
    const postId = req.params.postId;
    con.query('UPDATE posts SET likes = likes + 1 WHERE pid = ?', [postId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//Like decrease
router.post('/:postId/unlike', (req, res) => {
    const postId = req.params.postId;
    con.query('UPDATE posts SET likes = likes - 1 WHERE pid = ?', [postId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//create a new comment
router.post('/:pid/comments', (req, res) => {
    const commentData = req.body;
    commentData.post_id = req.params.pid;
    con.query('INSERT INTO comments SET ?', commentData, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get all comments for a post
router.get('/:pid/comments', (req, res) => {
    con.query('SELECT * FROM comments WHERE post_id = ?', [req.params.pid], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get posts by category name
router.get('/category/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    console.log(categoryName);
    con.query('SELECT posts.*, categories.name as category FROM posts LEFT JOIN categories ON posts.category_id = categories.id WHERE categories.name = ?', [categoryName], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
        } else {
            res.send(result);
        }
    });
});
 
// Get all categories
router.get('/category', (req, res) => {
    con.query('SELECT cname FROM categories', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
        } else {
            res.send(result);
        }
    });
});

module.exports = router;