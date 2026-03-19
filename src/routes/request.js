const express = require("express");
const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");
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
            })
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