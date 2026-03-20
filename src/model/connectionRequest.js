const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
      fromUserId :{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },status:{
            type:String,
            enum:{ // same as validate method :- defines what should be the status . other than this shows error
                  values:["interested" , "ignored" , "accepted" , "rejected"],
                  message:'{VALUE} is not valid status'
            }
      }
},{timestamps:true});

connectionRequestSchema.pre("save" , function(){
      const connectionRequest = this;
      if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
            throw new Error("You can't Send connection request to yourself");
      }

});

// Compound index -> to make the search query inside the db faster
connectionRequestSchema.index({fromUserId: 1 , toUserId: 1});
const ConnectionRequest = mongoose.model("connectionRequest" , connectionRequestSchema);
module.exports = ConnectionRequest;