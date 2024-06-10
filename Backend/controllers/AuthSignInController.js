const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Auth');


const secretKey = "123456";


const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, secretKey);
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

   
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

 
    const token = generateToken(user._id, user.role);


    res.json({ success: true, message: "Login successful", token, user: { id: user._id, role: user.role, username: user.username } });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { signIn };
