const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");


const User_Safe_Data = "firstName lastName photoUrl skills about age gender"

// Get the requests of the user which are pending i.e status -> interested
userRouter.get("/user/request/recieved" , userAuth , async(req, res)=>{
      try{
            const loggedInUser = req.user;
            const connectionRequest = await ConnectionRequest.find({
                  toUserId : loggedInUser._id,
                  status  :"interested"
            }).populate("fromUserId" ,  "firstName lastName photoUrl skills about age gender");
             
             res.json({message :"Data sent successfuly" , data : connectionRequest})


      }catch(er){
            res.status(400).send("Error : " + er.message);
      }
});

userRouter.get("/user/connections" , userAuth , async(req, res)=>{
      try{

            const loggedInUser = req.user;

            // login - abhisek (fromUserId) ->connection req ->  toUserId ravi (accept)
            const connectionRequests = await ConnectionRequest.find({
                  $or:[
                        {toUserId : loggedInUser._id , status:"accepted"},
                        {fromUserId : loggedInUser._id , status:"accepted"}
                  ]
            }).populate("fromUserId toUserId" , User_Safe_Data);
            // const data = [];
            // connectionRequests.forEach(row =>{
            //       if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            //             data.push(row.toUserId);
            //       }else{
            //             data.push(row.fromUserId)
            //       }
            // })

            // Or :-

            const data = connectionRequests.map(row =>{
                  if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                        return row.toUserId;
                  }
                  return row.fromUserId;
            })


            res.send({message : "Connections" , data})
           
      }catch(er){
            res.status(400).send({message : er.message})
      }
});

userRouter.get("/user/feed" , userAuth , async(req , res)=>{
      try{
            const loggedInUser = req.user;
            
            const page = parseInt(req.query.page)  || 1;
            let limit = parseInt(req.query.limit) || 10;
            limit = limit >50 ? 50 : limit;
            const skip = (page-1) * limit;

            // get all the connection request(sent + recieve)
            const connectionRequests = await ConnectionRequest.find({
                  $or:[{fromUserId : loggedInUser._id} ,
                         {toUserId : loggedInUser._id}]
            }).select("fromUserId toUserId");

            const hideUserFromFeed = new Set();
            connectionRequests.forEach(req =>{
                  hideUserFromFeed.add(req.fromUserId.toString()).add(req.toUserId.toString());
            })
            
            const userFeed = await User.find({
                 $and : [ {_id : {$nin: Array.from(hideUserFromFeed)}},
                          {_id :{$ne : loggedInUser._id}} ]
            }).select(User_Safe_Data).skip(skip).limit(limit) ;

            res.send(userFeed);

      }catch(er){
            res.status(400).send({message : er.message})
      }
})

module.exports = userRouter;