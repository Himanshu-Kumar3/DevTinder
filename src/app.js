const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./model/user");
// This create an app 
const app = express();

app.use(express.json());


// To put data into the database
app.post("/signup" , async (req , res)=>{
      // const dummyUser = {
      //       firstName:"Ravi",
      //       lastName:"Kumar",
      //       emailId:"ravi@gmail.com",
      //       password:"ravi@123"
      // }
      // instead of this :- 
      // After creating a new model -> create an instance
      const user = new User(req.body);

      try{
            // by saving it -> new document is created in the collection
           await user.save();
           res.send("Data Send successfully")
      }catch(er){
            res.status(400).send("Error :" + er.message)
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




