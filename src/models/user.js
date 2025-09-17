const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 4,
      maxlength: 13,
    },
    lastName: {
      type: String,
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
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default description of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.index({ firstName: 1, lastName: 1 });
userSchema.index({gender:1});


userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id },
    "DEV@Tinder@#",
    { expiresIn: "7d" }
  );
  return token;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

