require("dotenv").config();
const express = require("express"); 
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const app = express();
const cookieParser=require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors=require("cors");
const requestRouter = require("./routes/request.js");
const authRouter = require("./routes/auth");



//middleware pehle
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",//when u login u should get in token inside cookies
  credentials:true,
}));
app.use("/", authRouter);
app.use("/request", requestRouter);
//app.use(jwt()); jsonwebtoken is not an express middleware it is just a utility library


app.post("/signup", async (req, res) => {
  //validate the data 
  

  
  try {
    validateSignUpData(req);
    const {firstName,lastName,email,password,age}=req.body;
    //encrypt the password
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);
  const user = new User({
    firstName,lastName,email,password:passwordHash,age
  });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

app.post("/login",async(req,res)=>{
  try{
   const{email,password}=req.body;
   const user=await User.findOne({email:email});
   if(!user){
    throw new Error("emailid is not presesnt in the db")
   }
    const ispasswordValid=await bcrypt.compare(password,user.password)
  if(ispasswordValid){
    //create a jwt token
    const token=await jwt.sign({_id:user._id},"DEV@Tinder@#");
    console.log(token);


    //add the token to create cookie
    res.cookie("token", token, {
      httpOnly: true, 
      secure: false ,
      sameSite: "lax"   
    });
    res.send(user);
  }


  
  else{
    throw new Error("password is not correct")
  }
  }
  catch(err){
    res.status(400).send("ERROR:"+err.message);
  }
})
app.get("/profile",async(req,res)=>{
  try{
     const cookies=req.cookies;

const{token}=cookies;
if(!token){
  throw new Error("invalid token");
}
//validate my token
    const decodedMessage=await jwt.verify(token,"DEV@Tinder@#");
const{_id}=decodedMessage;

const user=await User.findById(_id);
if(!user){
  throw new Error("User does not exist");
}
  //console.log(cookies);
  res.send(user);
  }
  catch(err){
//res.status(400).send("Error"+err.message)
res.status(400).json({ error: err.message });
  }
})


// Get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Get user by password
app.get("/user", async (req, res) => {
  const userPassword = req.body.password;
  try {
    console.log("Received password:", userPassword);
    const users = await User.find({ password: userPassword });
    if (users.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Get user by email
app.get("/User", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

  app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId; // id body se le rahe ho
    const data = req.body;

    try {
    
    // allowed fields list
    const ALLOWED_UPDATES = ["photoUrl","gender", "age", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("updates not allowed");
    }
    if(data?.skills.length>10){
      throw new Error("skill cannot be added more than 10 ")
    }
      const user = await User.findByIdAndUpdate(
        userId,              
        data,               
        {
          returnDocument: "after", 
          runValidators: true,     
    });
      

      console.log(user);
      res.send("User updated successfully");
    } catch (err) {
      console.error("Error updating user:", err.message);

      res.status(400).send("update failed"+err.message);
    }
  });
  
// Database connection + start server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening for requests on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


  