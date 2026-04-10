const mongoose = require("mongoose");

const connectDB = async()=>{
      await mongoose.connect('mongodb://himanshu23:Ut5vvyqdWvSt4Qnq@ac-7mngqsu-shard-00-00.4hxwqag.mongodb.net:27017,ac-7mngqsu-shard-00-01.4hxwqag.mongodb.net:27017,ac-7mngqsu-shard-00-02.4hxwqag.mongodb.net:27017/DevTinder?ssl=true&replicaSet=atlas-10jvjz-shard-0&authSource=admin&appName=DevTinder');
      

}

module.exports = {connectDB};