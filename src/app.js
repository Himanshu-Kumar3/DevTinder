const express = require('express');

// This create an app 
const app = express();

// Defining the path :-
// We can define route handler as many as we want  
// also we can wrap them into an array 
app.use("/user" , (req, res , next)=>{
      // If we don't return / send anything from route handler -> executes ultil it hits the timeout
      // get hangged  -> always send something from the route handler
      console.log("Requesting to the path user")
      // res.send("Response !!")
      next();
},(req, res , next)=>{
      console.log("Route handler 2");
      res.send("2nd Response")
      next();
},(req, res)=>{
      console.log("Route handler 2");
      res.send("2nd Response")
})


const port  = 7777;

// By this now the app is ready to listen the request
app.listen(port, ()=>{
      console.log(`App is listening to port ${port}`)
});