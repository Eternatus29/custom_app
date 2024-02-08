// backend/controllers/userController.js
const User = require('../models/User');  // Make sure this import is correct
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);

    // Check for duplicate key error (MongoError code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Redirect to Call Record Management page on successful login
    res.status(200).json({ message: 'Login successful.', redirectTo: '/call-record-management' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};