const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./model/user");
const {validateUser} = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require("./middleware/auth");
// This create an app 
const app = express();


app.use(express.json());
app.use(cookieParser());


// To put data into the database
app.post("/signup" , async (req , res)=>{
       try{
            const {firstName , lastName , emailId, password} = req.body
      // const dummyUser = {
      //       firstName:"Ravi",
      //       lastName:"Kumar",
      //       emailId:"ravi@gmail.com",
      //       password:"ravi@123"
      // }
      // instead of this :- 
      // After creating a new model -> create an instance


// Before Storing 
// Validate the data
    validateUser(req);

// Encrypting the password -
// Once password is encrypted -> can't be decrypted -> only the person who sets the password can know what the password will be 
    const encryptedPassword  = await bcrypt.hash(password , 10); // bcrypt.hash(plaintext , saltrounds)
      // saltrounds -> basically hash  -> repeat number
      //  more the saltround strong will be the password
      const user = new User({  // this is an instance of the User(Model)
            firstName , 
            lastName ,
            emailId ,
            password :encryptedPassword
      });

     
            // by saving it -> new document is created in the collection
           await user.save();
           res.send("Data Send successfully")
      }catch(er){
            res.status(400).send("Error :" + er.message)
      }
    
})

// For Login

app.post("/login" ,async(req, res)=>{
      try{
            const {emailId , password} = req.body;
            const user = await User.findOne({emailId:emailId})
            if(!user){
                  throw new Error("Invalid Credential");
            }
            const isValidPassword = await  user.passwordValidator(password); // return boolean(true / false)
            if(isValidPassword){
                  // Create a jwt token
                  // const token = jwt.sign({secretinfo} , privatekey , {signature});
                  const token = await  user.getJWT()
                  res.cookie("token" , token , { expires: new Date(Date.now() + 8 * 3600000), httpOnly: true }); // cookie will be expred in 8 days
                  console.log(token)
                  res.send("login sucessful");

            }else{
                  throw new Error("Invalid Credential");

            }

      }catch(er){
            res.status(400).send("Error : " + er.message);
      }

})

// Getting profile :-
app.get("/profile" ,userAuth , async (req,res)=>{

      try{
      // validate the token
      // const decoded(secretinfo) = jwt.verify(token , privateKey)
      const user = await req.user;
      res.send(user);

      }catch(er){
            res.status(400).send("ERROR : " + er.message);
      }

})



// Sending connection request

app.post("/sendConnection" ,userAuth ,  async(req, res)=>{
      try{
            const user = await req.user;

            res.send(user.firstName + " sent the connection ..!")

      }catch(er){
            res.status(400).send("Error :"+ er.message)
      }


})


const port  = 7777;
// By this now the app is ready to listen the request
connectDB()
.then(()=>{
      console.log("connection with database successfully");
      app.listen(port, ()=>{
      console.log(`App is listening to port ${port}`)
})

}).catch(er=>{
      console.log("Connection failed....."+ er);
})