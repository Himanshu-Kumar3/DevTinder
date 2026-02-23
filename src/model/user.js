const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
      // Schema is created
      firstName : {
            type:String
      } ,
      lastName : {
            type:String
      },
      emailId:{
            type:String
      },
      password:{
            type:String
      },
      age:{
            type:Number
      },
      gender:{
            type:String
      }
})

// Model = collection/database name , schema name
// Based on that scema we create a new model
const User = mongoose.model("user" , userSchema);
module.exports = User;