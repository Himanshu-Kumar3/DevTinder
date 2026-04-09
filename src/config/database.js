const mongoose = require("mongoose");

const connectDB = async()=>{
      await mongoose.connect('mongodb+srv://himanshu23:Ut5vvyqdWvSt4Qnq@devtinder.4hxwqag.mongodb.net/');
      
}

module.exports = {connectDB};