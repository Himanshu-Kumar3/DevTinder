const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req, res , next)=>{

      try{
      // Get the  from the req cookie
      const {token} = req.cookies;

      if(!token){
            return res.status(401).send("Please Login!")
      }
      const decodedObj = await jwt.verify(token , "DEV@Tinder9508");
      const user = await User.findById(decodedObj);
      if(!user){
            throw new Error("User not found..!")
      }
      req.user = user;
      next();
}catch(er){
      res.status(400).send("Error : " + er.message)
}

    

}

module.exports = {userAuth};