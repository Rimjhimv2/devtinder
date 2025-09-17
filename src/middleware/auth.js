


const jwt = require("jsonwebtoken");
const User = require("../models/user"); // apne User model ka path lagao

const userAuth = async (req, res, next) => {
  try {
   
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder@#");

  
    const user = await User.findById(decodedObj._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = userAuth;
