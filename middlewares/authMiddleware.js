// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_secret_key';




module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: 'No token provided' });
   
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
   
   if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.userId;
    console.log(req.userId,"userid")
    next();
  });
};