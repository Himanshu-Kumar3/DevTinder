# This is a repo For DevTinder

# DevTinder
 - Create an account
 - Login / Update your profile
 - Feed Page -> Explore 
 - Send connection request 
 - See the matches
 - See whom i sent the request / response 
 - Messages and so on 



# Working in this app
 - Initialize the app using npm init
 - installed express
 - creating a server
 - listining to the port 7777
 - difined the / , /test ,/hello path
 - since everytime we made changes we have to restart the server is very tiredsome
  - installed nodemon -> automatically restart the server when we make any changes into our server
 - installed postman for testing API
   - create workspace and collection and test API call 
 - installed mongoose -> to connect with the database
 - connect with db and after than start the server
 - create middlewares for authorization and other things
 - created  schema for the collection
 - created model based on the schema 
 - after this created an instance based in that model
 - save it to the database  
 - make the schema dynamic i.e get the schema info / data from the client side
 - parsing the json data form from the client side using middleware -> express.json() ->inbuilt json format
 -  to use this we do =>  app.use(express.json()) -> without path it is applicable for all the path
   



# FOR CRUD OPERATION -->  
 - Refer -> Mongoose docs -> Model -> Class


 # For schema validation 
  - goto -> mongoose docs -> schemaTypes

  # For gender validation
  - in model  -> findByIdAndUpdate -> in option ->runValidators:true

 # For timestamp
 - mongoose docs -> timestamps 
 - during creation of schema -> const userSchema = new Schema({ name: String }, { timestamps: true })


<!-- We should never trust on req.body -->

# API METHODS 
# Sign Up
 ## validate the user before sign up
 - using helper function -> inside utils

 ## encrypt the password
 - install bcrypt from npm
 - create password hash using bcrypt.has(plaintext , saltnumber)
 ## store the password into DB
 - using {password : encryptedPassword} 



# Login
 ## validate the email 
  - check if the email exists or not
 ## validate the password
  - using bcrypt.compare(plaintext , user.password)  // user -> get from the db
 ## Login the user 
  - create token -> also set the expire
  - store it into cookies -> also set the expire
  





 # review the Request
  - API Method - request/review/:status/:requestId
  ## validate the user
   - Either user is loggedIn Or not -> using userAuth (validator / middleware)

  ## Validate the status
    - status should only be either accepted / rejected

  ## validate the user / connection request
   - _id == requestId  , toUserId == loggedInUser ._id  , status == "interested"

  ## Change the status
    - connectionRequest.status = status

  ## save the data to db ;     
   




   <!-- Devtinder Ubunto -->
   frontend -> http://13.48.177.183/
   backend -> http://13.48.177.183:7777

   map into domain
   frontend -> devTinder.com
   backend -> devtinder.com:777(not) => instead it should be devTinder.com/api