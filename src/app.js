const express = require('express');
const {connectDB} = require("./config/database");
const cookieParser = require('cookie-parser');

// This create an app 
const app = express();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


app.use(express.json());
app.use(cookieParser());


app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);




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