const express = require('express');
const app = express();
// const cookieparser = require('cookie-parser');
// app.use(cookieparser);
//MULTER
const multer = require('multer');
//ROUTE FILES
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const path = require('path');
const cookieparser = require('cookie-parser');

// DOTENV
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '/images')));

//Mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', true); //Only the fields mentioned in  the model will be taken and saved in db
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to MongoDB'))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

//USE
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts',  postRoute);
app.use('/api/category', categoryRoute);
app.use(cookieparser);

//Testing connection
const date = Date();
const port = 3003;
app.listen(port, () => {
  // console.log(date);
  console.log(`Backend is running at port ${port}`);
});

