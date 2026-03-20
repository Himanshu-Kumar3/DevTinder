const express = require("express");
const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");
const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:userId" , userAuth ,async (req, res)=>{
      try{
            const fromUserId = req.user._id;
            const toUserId = req.params.userId;
            const status = req.params.status;
            const allowedStatus = ["interested" , "ignored"];
            if(!allowedStatus.includes(status)){
                  throw new Error("invalid status type : " + status);
            }
            const connectionRequest = new ConnectionRequest({
                  fromUserId ,
                  toUserId,
                  status
            });

            // if the toUser is not exists:
           const toUser = await User.findById(toUserId);
           if(!toUser){
            res.status(404).send({message:"User not exists!!"})
           }

      //      If p1 -> p2 already exists or p2 -> p1 
           const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                  {fromUserId , toUserId},
                  {fromUserId:toUserId , toUserId: fromUserId}
            ]
           });

           if(existingConnectionRequest){
            res.status(400).json({message:"Can't send connection request !!"})
           }
           const data  =  await connectionRequest.save();
            res.json({
                  message:`Connection request sent successfuly`,
                  data,
            }
            )
            
      }catch(er){
            res.status(400).send("Error : " + er.message);
      }
})

module.exports = requestRouter;