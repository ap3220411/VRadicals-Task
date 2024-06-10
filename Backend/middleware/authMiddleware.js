const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token.split(' ')[1], "123456", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { protectRoute }; 
