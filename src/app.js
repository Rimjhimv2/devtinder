require("dotenv").config();
const express = require("express"); // import express
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

// Signup Route
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

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

  app.patch("/user", async (req, res) => {
    const userId = req.body.userId; // keep naming consistent
    const data = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,              // pass only the id
        data,                // update data
        {
          returnDocument: "after", // gives updated document (use "new: true" in older Mongoose)
          runValidators: true,     // validates before updating
        }
      );
      

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
