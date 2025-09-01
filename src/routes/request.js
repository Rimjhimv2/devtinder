

{/*const express = require("express");
const requestRouter = express.Router();
//Dekho, tumne auth.js ke end me likha hai:



//➡️ Matlab tum pura function export kar rahe ho, object ke andar nahi.

//Isliye import karte waqt { userAuth } use karoge to undefined milega.
const  userAuth  = require("../middleware/auth");

// Import your model
const ConnectionRequest = require("../models/connectionRequest");

// POST /request/send/:status/:toUserId
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth, // middleware
  async (req, res) => {
    console.log("✅ Route hit hua", req.params); 
    try {
      const fromUserId = req.user._id; // added by userAuth middleware
      const toUserId = req.params.toUserId; // ✅ match param name
      const status = req.params.status;

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
        
      });

      const data = await connectionRequest.save();

      return res.json({
        message: "Connection Request sent successfully",
        data,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
);

module.exports = requestRouter;*/}



const express = require("express");
const requestRouter = express.Router();

const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

// POST /request/send/:status/:toUserId
requestRouter.post(
  "/send/:status/:toUserId",   // 👈 yaha pe "/request" dubara mat likhna
  userAuth, 
  async (req, res) => {
    console.log("✅ Route hit hua", req.params); 
    try {
      const fromUserId = req.user._id; 
      const toUserId = req.params.toUserId.trim(); 
      const status = req.params.status;
      const User=require("../models/user");


      const allowedStatus=["interested","ignored"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"invalid status tyoe:"+status});

      }
      const toUser=await User.findById(toUserId);
  if(!toUser){
    return res.status(404).json({message:"user not found"});
  }
      //if there is an existing connectionRequest
      const existingConnectionRequest=await ConnectionRequest.findOne({
        $or:[
          {
            fromUserId,toUserId
            //check if the fromuserid or touserid already exist then
          },
          {fromUserId:toUserId,toUserId:fromUserId},
        ],
        //once one user send conn req to other then again req cant send to the same person 
        });
        if(existingConnectionRequest){
          return res
          .status(400)
          .send({message:"Connection request already exist!"})
        }


      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      return res.json({
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
      
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
);

module.exports = requestRouter;

