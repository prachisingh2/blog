const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const authorRoutes = require('./routes/author');
const bodyParser = require('body-parser');

app.use(session({
    secret: 'roothit',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(bodyParser.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/author', authorRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});























// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const session = require('express-session');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// app.use(session({
//     secret: 'your secret',
//     resave: false,
//     saveUninitialized: true
// }));

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'test'
// });

// con.connect((err) => {
//     if (err) throw err;
//     console.log("Connected to MySQL!");
// });

// // Existing endpoints...

// app.post('/users', async (req, res) => {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     con.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     con.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
//         if (err) throw err;

//         if (result.length > 0) {
//             const user = result[0];
//             const passwordMatch = await bcrypt.compare(password, user.password);

//             if (passwordMatch) {
//                 req.session.userId = user.id;
//                 res.send({ message: 'Logged in', user });
//             } else {
//                 res.status(401).send({ message: 'Invalid credentials' });
//             }
//         } else {
//             res.status(401).send({ message: 'Invalid credentials' });
//         }
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });