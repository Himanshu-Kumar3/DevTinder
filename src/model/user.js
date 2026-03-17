const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


// Since the User model is an instace of the userSchema -> we can define schema methods which will be for different users  
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
            validate(value){
                  if(!validator.isEmail(value)){
                        throw new Error("Email is not valid : "+ value)
                  }

            }
      },
      password:{
            type:String,
            required:true,
            minlength:8,
            validate(value){
                  if(!validator.isStrongPassword(value)){
                        throw new Error("Password is weak : Data maybe breach")
                  }
            }
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



// schema methods :- to offload something
userSchema.methods.getJWT = async function(){
      const user = this;
      const token = await  jwt.sign({_id : user._id}, "DEV@Tinder9508" , {expiresIn : '1d'} )
      return token;
}

userSchema.methods.passwordValidator = async function(passwordByUser){
      const user = this;
      const passwordHash = user.password;
      const isPasswordValid = await bcrypt.compare(passwordByUser , passwordHash)
      return isPasswordValid;
}


// Model = collection/database name , schema name
// Based on that scema we create a new model
const User = mongoose.model("user" , userSchema);
module.exports = User;