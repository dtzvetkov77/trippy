const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

// Validate user registration data
const validateUserRegistration = (req, res, next) => {
  const { username, email, password } = req.body;

  const errors = {};

  if (!username || !email || !password) {
    errors.message = "All fields are required";
    return res.status(400).json(errors);
  }

  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
    return res.status(400).json(errors);
  }

  next();
};

router.post("/register", validateUserRegistration, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error saving user", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists in the database
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Compare the entered password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
    //   Generate a JWT token
      const token = jwt.sign({ userId: user._id }, secret , {
        expiresIn: '8h',
      });
  
      res.status(200).json({token});
    } catch (error) {
      console.error("Error logging in", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

router.post("/logout", (req, res) => {
  User.deleteOne({ username });
});

module.exports = router;
