const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");

const {validateSignupUser} = require("../utils/validator");
// const app = epxress() this and below is same thing for us developers
const authRouter = express.Router();


// Signup
authRouter.post("/signup" , async (req,res)=>{
      try{
      const {firstName , lastName , emailId , password} = req.body;
      validateSignupUser(req);

      const encryptedPassword = await bcrypt.hash(password , 10);

      // create instance of the user model
      const user = new User({
            firstName , 
            lastName ,
            emailId ,
            password :encryptedPassword
      });
      user.save();
      res.send("Signup Sucessful !")
}catch(er){
      res.status(400).send("Error :" + er.message);
}


})

// Login 

authRouter.post("/login" , async(req , res)=>{
      try{
      const {emailId , password} = req.body;

      const user = await User.findOne({emailId:emailId});
      if(!user){
            throw new Error("Invalid Credentials")
      }
      // Create JWT TOKEN AND assign into a cookies
      const isValidPassword = await user.passwordValidator(password);
    
      if(isValidPassword){
            const token = await user.getJWT();
            res.cookie("token" , token, {expires: new Date(Date.now() + 8 * 3600000), httpOnly: true});
            res.send("Login Sucessful")
           
      }else{
             throw new Error("Invalid Credential");

      }
}catch(er){
      res.status(400).send("Error :" + er.message);
}
    
})


module.exports = authRouter;