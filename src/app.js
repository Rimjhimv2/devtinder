const express=require("express");//import express into your project
 const connectDB=require("./config/database")
const app=express();//crete an expresss app
const User=require("./models/user");
app.use(express.json());
app.post("/signup",async(req,res)=>{
  //console.log(req.body);
  const user=new User(req.body);
  try{
    await user.save();
    res.send("User added successfully");
  }catch(err){
    res.status(400).send("error saving the user"+err.message);
  }
//creating a new instance of a model
//const user=new User({
  //firstName:"sachin",
  l//astName:"Verma",
  //emailId:"ih@gmail.com",
  //password:"sac34",
  
//});
//await user.save();
//res.send("user sent data succesfully")



});




//request handler for all incoming http request
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777,()=>{
        console.log("server is succesfully listening our request")
    
    });
})
  .catch(err => {
    console.error("Database connection failed:", err);
  });

//this tell ur project to start listening for req on this port
//these 3 line create our web server