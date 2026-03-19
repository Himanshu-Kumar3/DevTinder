const express = require("express");
const {userAuth} = require("../middleware/auth");
const {validateUserEdit} = require("../utils/validator");
const {validateEditPassword} = require("../utils/validator");
const bcrypt = require("bcrypt");
const profileRouter = express.Router(); // the variable name can be anything


// Get Profile
profileRouter.get("/profile/view" ,userAuth, async (req , res)=>{
      try{
      const user = req.user;
      res.send(user);
    }catch(er){
            res.status(400).send("Error : " + er.message)
      }

});

profileRouter.post("/profile/edit" , userAuth , async (req , res)=>{

      try{
             const loggedInUser = req.user;
             if(!validateUserEdit(req)){
                  throw new Error("Update Not Allowed !!")
             }else{
                  const user = req.body;
                  if(user?.skills.length >10){
                        throw new Error("Maximum skills length should be 10")
                  }
                  if(user?.photoUrl)
                  console.log(loggedInUser);
                  Object.keys(user).forEach(key => loggedInUser[key] = user[key]);
                  console.log(loggedInUser);
                  await loggedInUser.save();
                  res.send(`${loggedInUser.firstName} your data was updated successfuly` )
             }

      }catch(er){
            res.send("Error :" + er.message)
      }
     



});

// Forgot password:

profileRouter.post("/profile/password/forget",userAuth , async (req,res)=>{
      try{
      const loggedInUser = req.user;
      const {currentPassword , newPassword } = req.body;

      const isCorrectPassword = await loggedInUser.passwordValidator(currentPassword);
      if(isCorrectPassword){
             if(validateEditPassword(req)){
                  encryptedPassword = await bcrypt.hash(newPassword , 10);
                  loggedInUser.password = encryptedPassword;
                  loggedInUser.save();
                  res.send("Password updated successfuly")
             } 
      }
}catch(er){
      res.status(400).send("Error :" + er.message);
}

})

module.exports = profileRouter;