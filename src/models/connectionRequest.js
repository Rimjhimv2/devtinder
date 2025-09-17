const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",   
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
connectionRequestSchema.index({fromUserId:1,toUserId:1})
connectionRequestSchema.pre("save",function(next){
  const connectionRequestSchema=this;
  if(connectionRequestSchema.fromUserId.equals(connectionRequestSchema.toUserId)){
    throw new Error("Cannot send connection request to yourself!");
    
  }
  next();
})
const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
