const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Email = require("../utils/email");
const catchAsync = require("../utils/catchAsync");

// Function to generate JWT token
const generateToken = (userId) => {
  const secret = "ajfsdnaljgsnlakjsdfnaljkgsb"; // Change this to a strong, unique secret
  const expiresIn = "1h"; // Token expiration time

  return jwt.sign({ userId }, secret, { expiresIn });
};

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

    // Generate a token and send it in the response
    const token = generateToken(newUser._id);
    res.status(201).json({ message: "User registered successfully.", token });
  } catch (error) {
    console.error(error);

    // Check for duplicate key error (MongoError code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Generate a token and send it in the response
    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.contact = catchAsync(async (req, res, next) => {

  const email = req.body.email;

  console.log(req.body);
  
  const userDetails = {
    email: email,
    message: req.body.message,
  };

  console.log("User Details: ", userDetails);

  await new Email(userDetails).sendMailToPerson();
});
