const express = require('express');

// This create an app 
const app = express();

// to do something when the app is listening 

// define path explicitely
app.use("/test" ,(req , res)=>{
      res.send("Testing your app ....")
})

app.use("/hello" , (req , res) =>{
      res.send("Hello Hello Hello Badka Da !!")
})
// For all path it will return hello from server when we don't define any other path 
app.use("/" ,(req,res)=>{
     res.send("Hello From Server...!");
})

const port  = 7777;

// By this now the app is ready to listen the request
app.listen(port, ()=>{
      console.log(`App is listening to port ${port}`)
});