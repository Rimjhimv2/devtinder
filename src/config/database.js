const mongoose= require("mongoose");
//to connect to the cluster basically 
//good way to connect to wrap it inside async and call await 
const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://rimjhimv543:2a3Pbu2VskxyCEJw@namestenode.xeiymrv.mongodb.net/devTinder"
      );
      
}
//connectDB return a promise 

module.exports=connectDB


//call this function 

//anything you want to configure your app just write inside this//
//npm library called mongoose..
//connectDB() → mongoose.connect() call karta hai → ye Promise return karta hai.

//Agar MongoDB se connection ban gaya → .then() chalega aur "Database connection established..." print karega.

//Agar connection me problem aayi (IP whitelist, wrong password, internet issue) → .catch() chalega aur error print karega.