//Create a user schema" ka simple matlab hota hai — tum MongoDB me ek blueprint define kar rahe ho 
// jisme ye decide hota hai ki User naam ka document kaisa dikhega, kaunse fields honge,
// unka type kya hoga, aur unpe kaunse rules lagenge.
const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
         type:String
    },
    gender:{
        type:String
    }
})
//once u creatyed a schema then create a moongoose model
const userModel=mongoose.model("user",userSchema);

module.exports=userModel;