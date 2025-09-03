const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",   // optional, acha practice hai
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);
//connectionRequest.find({fromUserId:6789999999})
//now all these query are v v fast
//by writing this these query are v v fast even if million of data is present
connectionRequestSchema.index({fromUserId:1,toUserId:1})
connectionRequestSchema.pre("save",function(next){
  const connectionRequestSchema=this;
  if(connectionRequestSchema.fromUserId.equals(connectionRequestSchema.toUserId)){
    throw new Error("Cannot send connection request to yourself!");
    
  }
  next();
})
//check if the fromUser is same as touserId



// ✅ correct:
const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
