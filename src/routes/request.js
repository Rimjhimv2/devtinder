const express = require("express");
const requestRouter = express.Router();

const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
requestRouter.post(
  "/send/:status/:toUserId",  
  userAuth, 
  async (req, res) => {
    console.log(" Route hit hua", req.params); 
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
    
      const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
            { fromUserId: fromUserId, toUserId: toUserId }, 
            { fromUserId: toUserId, toUserId: fromUserId }  
           ]
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

