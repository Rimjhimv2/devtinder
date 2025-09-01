//const mongoose= require("mongoose");
//to connect to the cluster basically 
//good way to connect to wrap it inside async and call await 
//const connectDB=async()=>{
    //await mongoose.connect(
       // "mongodb+srv://rimjhimv543:2a3Pbu2VskxyCEJw@namestenode.xeiymrv.mongodb.net/devTinder"
       //process.env.MONGO_URI
      //)//;
      
//}
//connectDB return a promise 

//module.exports=connectDB
//each and every data goes into the adtabase have to validates


//call this function 

//anything you want to configure your app just write inside this//
//npm library called mongoose..
//connectDB() → mongoose.connect() call karta hai → ye Promise return karta hai.

//Agar MongoDB se connection ban gaya → .then() chalega aur "Database connection established..." print karega.

//Agar connection me problem aayi (IP whitelist, wrong password, internet issue) → .catch() chalega aur error print karega.np


const mongoose = require("mongoose");

// Function to connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDB;
