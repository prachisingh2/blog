const express = require('express');
const session = require('express-session');
const axios = require('axios');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const authorRoutes = require('./routes/author');
const bodyParser = require('body-parser');
const upload = multer({
  dest: 'uploads/', 
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

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
app.use('/author', authorRoutes);
app.use('/uploads', express.static('uploads'));

app.post('/translate', async (req, res) => {
  try {
    const response = await axios.post('https://rapidapi.com/oyagev/api/onehourtranslation/', req.body, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-RapidAPI-Host': 'community-onehourtranslation.p.rapidapi.com',
        'X-RapidAPI-Key': 'aa3de6422cmsh8cc276ac29daa6dp153e33jsn01f9126585db'
      }
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});