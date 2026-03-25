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
            return res.status(404).json({message:"User not exists!!"})
           }

      //      If p1 -> p2 already exists or p2 -> p1 
           const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                  {fromUserId , toUserId},
                  {fromUserId:toUserId , toUserId: fromUserId}
            ]
           });

           if(existingConnectionRequest){
            return res.status(400).send({message:"Connection request already exists!!"})
           }
           const data  =  await connectionRequest.save();
            res.json({
                  message:`${req.user.firstName} ${status}  in ${toUser.firstName} `,
                  data,
            }
            )
            
      }catch(er){
            res.status(400).send("Error : " + er.message);
      }
});


requestRouter.post("/request/review/:status/:requestId" , userAuth , async (req, res)=>{
      try{
            // Check if the status is valid or not 
            const {status , requestId} = req.params;
            const allowedStatus = ["accepted" , "rejected"];
            const isStatusAllowed = allowedStatus.includes(status);
            if(!isStatusAllowed){
                  return res.status(400).json({message:"Status not allowed !"});
            }
            const loggedInUser = req.user;
            const connectionRequest = await ConnectionRequest.findOne({_id:requestId , toUserId : loggedInUser._id ,status :"interested"});
            if(!connectionRequest){
                  return res.status(404).send("User Not Found !");
            }
            connectionRequest.status = status;
            const data = await connectionRequest.save()
            res.json({message:"Connection Request " + status , data});
      }catch(er){
            res.status(400).send("Error : "  + er.message)
      }
})

module.exports = requestRouter;