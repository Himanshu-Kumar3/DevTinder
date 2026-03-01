const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
      {
      // Schema is created
      firstName : {
            type:String,
            required: true,
            minlength:4 , 
            maxlength:12
      } ,
      lastName : {
            type:String,
            minlength:4 , 
            maxlength:12
      },
      emailId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
      },
      password:{
            type:String,
            required:true,
            minlength:8,
            maxlength:16
      },
      age:{
            type:Number,
            min:18
      },
      gender:{
            type:String,
           validate(value){
            if(!["male" , "female" , "others"].includes(value)){
                  throw new Error("Gender is not valid")
            }
           }
      },
      about:{
            type:String,
            default:"This is default about for the user"
      },
      skills:{
            type:[String]
      }
} , { timestamps: true })

// Model = collection/database name , schema name
// Based on that scema we create a new model
const User = mongoose.model("user" , userSchema);
module.exports = User;