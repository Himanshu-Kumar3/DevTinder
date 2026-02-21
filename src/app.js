const express = require('express');
const {adminAuth} = require("./middleware/auth")
// This create an app 
const app = express();


// Handling Errors :-
app.get("/getUserData" , (req , res) =>{
      // try{
          throw new Error(" Anonymous")
          res.send("User Data Sent")
      // }catch(er){
      //   res.status(500).send("Error occurs")
      // }
     
})

app.use("/",(er , req , res , next)=>{
      if(er){
            res.status(500).send(` ${er} `);
      }
})




// why do we need the middleware :- if we hava to write the auth for admin -> without middleware we have to write it for each and every path
// which can become a very messy -> to make the code clean we use them

// app.use("/admin" , adminAuth);

// // also 
// app.get("/user" , (req, res) =>{
//       res.send("HEY I am your user")
// })

// // Defining the authorization in all the path -> looks clumsy 
// app.get("/admin/getAllData" , (req, res)=>{
//           res.send("Getting all the data")     
// });


// app.get("/admin/deleteData" , (req, res)=>{
//             res.send("Deleted all the data");
// })


// These middle route handlers are known as middlewares
// app.use("/user" , (req,res,next)=>{
//       console.log("Response from app.use")
//       next();
// });
// app.get("/user" , (req, res,next)=>{
//       console.log("1st Response")
//       next();
// }
// ,(req, res , next)=>{
//       console.log("2nd Response")
//       next()
// } ,  // this last one is called route handler
// (req,res)=>{
//       res.send("3rd Response")
// })




// Defining the path :-
// We can define route handler as many as we want  
// also we can wrap them into an array 
// app.use("/user" , (req, res , next)=>{
//       // If we don't return / send anything from route handler -> executes ultil it hits the timeout
//       // get hangged  -> always send something from the route handler
//       console.log("Requesting to the path user")
//       // res.send("Response !!")
//       next();
// },(req, res , next)=>{
//       console.log("Route handler 2");
//       res.send("2nd Response")
//       next();
// },(req, res)=>{
//       console.log("Route handler 2");
//       res.send("2nd Response")
// })


const port  = 7777;

// By this now the app is ready to listen the request
app.listen(port, ()=>{
      console.log(`App is listening to port ${port}`)
});