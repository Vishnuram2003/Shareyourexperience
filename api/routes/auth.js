const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
//Bcrypt
const bcrypt = require('bcrypt');

const maxage = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Secretkey', { expiresIn: maxage });
};
//REGISTER

router.post('/register', async (req, res) => {
  console.log('Inside api register');
  try {
    //Hashing the password entered in frontend
    const salt = await bcrypt.genSalt(10);
    console.log(req.body.password.length);
    if (req.body.password.length < 6) {
      res.status(400).send('Password must contain atleast 6 characters');
    } 
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    //Creating object of user modelß
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    //creating new object in users collection
    const user = await newUser.save();
    console.log('User created');
    //if user is created then the user data is sent back as response
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


//LOGIN
router.post('/login', async (req, res) => {
  console.log('Login api Try started');
  try {
    //finding the userdetails using username
    const user = await User.findOne({ username: req.body.username });

    const token = createToken(user.username);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxage * 1000 });
    // Checking whether the user is present or not
    !user && res.status(400).json('Wrong credentials');
    //If the user is present then now we check whether the passwords match
    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json('Wrong pass cred');
    //Seperating password from object and sending the data other than password.
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
  console.log('Login api Try ended');
});
module.exports = router;
