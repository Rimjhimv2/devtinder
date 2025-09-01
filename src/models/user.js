//Create a user schema" ka simple matlab hota hai — tum MongoDB me ek blueprint define kar rahe ho 
// jisme ye decide hota hai ki User naam ka document kaisa dikhega, kaunse fields honge,
// unka type kya hoga, aur unpe kaunse rules lagenge.
///imp imp note

//once u creatyed a schema then create a moongoose model



const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 4,
    maxlength: 13
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password is not strong enough: " + value);
      }
    }
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  gender: {
    type: String,
    enum:{
      values:["male","female","other"],
      message:`{VALUE} is not a valid gender type`,
    }
  
    //validate(value) {
     // if (!["male", "female", "others"].includes(value)) {
     //   throw new Error("Gender data is not valid");
      //}
   // }
  },
  photoUrl: {
    type: String,
    default: "https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid photo url: " + value);
      }
    }
  },
  about: {
    type: String,
    default: "This is the default description of the user"
  },
  skills: {
    type: [String],
  }
}, {
  timestamps: true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
