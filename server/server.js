const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const authorRoutes = require('./routes/author');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(session({
    secret: 'roothit',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 7200000 }
}));

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/author', authorRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});