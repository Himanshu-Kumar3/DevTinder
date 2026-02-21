const adminAuth = (req, res , next)=>{
      console.log("Hey You just visited the authorization");
      const token = 'xyz';
      const isAuthrized = token === 'xyz';
      if(!isAuthrized){
            res.status(401).send("ERROR : Unautorized")
      }else{
            next();
      }

}

module.exports = {adminAuth}