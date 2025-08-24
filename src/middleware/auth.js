/*const adminAuth=(req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
}
const userAuth=(req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
}
module.exports={
    adminAuth,
    userAuth
}


//no authentication required before login or signup but after this authentication required
//no one acesss  thee user unless the token is valid
//but aall the other api dont have a token so create the middleware
const jwt=require("jsonwebtoken");
const userAuth= async(req,res,next)={
   //Read the token from the req cookies
   const {token}=req.cookies;
   const decodeObj = await jwt.verify(token, "DEV@Tinder@#")
   //validate the token
   //find the username 
}*/


const jwt = require("jsonwebtoken");
const User = require("../models/user"); // apne User model ka path lagao

const userAuth = async (req, res, next) => {
  try {
    // Read the token from cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decodedObj = await jwt.verify(token, "DEV@Tinder@#");

    // Find the user using decoded id
    const user = await User.findById(decodedObj._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach user to request object
    req.user = user;

    // Move to next middleware / controller
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = userAuth;
