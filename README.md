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
   
