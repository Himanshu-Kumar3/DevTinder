const express = require("express");
const {userAuth} = require("../middleware/auth");
const profileRouter = express.Router(); // the variable name can be anything


// Get Profile
profileRouter.get("/profile" ,userAuth, async (req , res)=>{
      try{
      const user = req.user;
      res.send(user);
    }catch(er){
            res.status(400).send("Error : " + er.message)
      }

})

module.exports = profileRouter;