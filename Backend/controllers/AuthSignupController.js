const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Auth');


const secretKey = "123456";


const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, secretKey);
};

const signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'email already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();


    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({ success: true, message: "Account created successfully", token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { signUp };
