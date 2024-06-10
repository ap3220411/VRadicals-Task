const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Auth');

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, "12345");
};

const AdminSignUp = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    // Generate JWT
    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({ success: true, message: "Account Created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { AdminSignUp };
