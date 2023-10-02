const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    const token = cookies.split('=')[1];
    // console.log(cookies);
    const verifyuser = jwt.verify(token, 'Secretkey');
    // console.log(verifyuser);
    next();
  } catch (error) {
    res.status(401).send(error);
  }

  //check jwt exists
};

module.exports = { requireAuth };
