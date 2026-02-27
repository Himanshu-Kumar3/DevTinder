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


// Getting data from the database :-
// Only one data 
app.get("/user" ,async(req, res)=>{
      const userId = req.body.id;
      try{
      //   const user = await  User.find({emailId: userEmail}); // finds all the  document which  has this email id return [of documents]
      //   to find only one :-
      // if we leave empty {} -> in findOne  -> returns an arbitrary document -> which is generally the first document of the collection
      // const user = await User.findOne({emailId:userEmail})  // returns document only 
      const user = await User.findById(userId)  // {_id:id} = {id}
      if(!user){
            res.status(404).send("user not found")
      }else{
            res.send(user)
      }
      //   if(user.length > 0){
      //       res.send(user)
      //   }else{
      //       res.status(404).send("User not found")
      //   }
        
      }catch(er){
       console.log("Error is error ")
      }
})



// To get all the documents of a collection :-
app.get("/find" , (async (req, res)=>{
      try{
            const users = await User.find({})
            if(users.length > 0){
                  res.send(users);
            }else{
                  res.status(404).send("User not found")
            }
      }catch(er){
            console.log("Error is " + er.message)
      }
}))


// To delete document from the database using -> findByIdAndDelete(id / _id:id)
app.delete("/user" , async(req, res) =>{
      const userId = req.body.userId;
      try{
            const user = await User.findByIdAndDelete(userId);
            if(!user){
                  res.status(404).send("Error : File not Found")
            }else{
                  res.send("user deleted successfully")
            }   

      }catch(er){
            res.status(400).send("Error : Something Went Wrong")
      }
}) 

// Update the user using  -> Patch  method
// using  -> findByIdAndUpdate is equivalent to the findOneAndUpdate

// It only updates the document data which is in schema -> ignores all other things
app.patch("/user" , async(req  , res) =>{
      const userId = req.body.userId;
      const data  = req.body;
      try{

            const user = await User.findByIdAndUpdate(userId , data , {returnDocument:"after"}) // bydefault returnDocument = 'before'
            if(!user){
                  res.status(404).send("Error : Document not found")
            }else{
                  console.log(user);
                  res.send("Data updated successfully")

            }
      }catch(er){
            res.status(400).send("Error:  Something went wrong")
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




