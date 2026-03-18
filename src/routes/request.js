const express = require("express");
const {userAuth} = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("request" , userAuth ,async  (req, res)=>{
      try{
      const user =await  req.user;
      res.send(user.firstName + "Sending the connection request");
      }catch(er){
            res.status(400).send("Error : " + er.message);
      }
})

module.exports = requestRouter;