// src/routes/auth.js
{/*const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: false, // localhost ke liye false
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;*/}


const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();


// 🔹 SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  try {
    const { firstName, email, password, photoUrl } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      firstName,
      email,
      password: hashedPassword,
      photoUrl,
    });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// 🔹 LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign({ _id: user._id }, "DEV@Tinder@#", {
      expiresIn: "7d",
    });

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: false, // localhost pe false, production me true
    });

    return res.status(200).json({
      message: "Login successful",
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      photoUrl: user.photoUrl,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// 🔹 LOGOUT ROUTE
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: false, // localhost ke liye false
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;

