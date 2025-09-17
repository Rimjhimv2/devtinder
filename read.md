- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test , /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde ( ^ vs ~ )

- initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extensions ex. /hello, / , hello/2, /xyz
- Order of the routes matter a lot
- Install Postman app and make a workspace/collectio > test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
- Explore routing and use of ?, +, (), * in the routes
- Use of regex in routes /a/ , /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- Multiple Route Handlers - Play with the code
- next()
- next function and errors along with res.send()
-app.use("/route',rH,[rH2,rH3],rH4,rH5)
















The text from the image is as follows:

```
- Error Handling using try , catch

- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recive data from the end user
- User.findOne with duplucate email ids, which object returned
- API- Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

- Explore schematype options from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
-improve the DB schema put all appropriate validation on each  field in schema
-add timestamp to the userSchema
-ADD API LEVEL VALIDATION ON PATCH REQUEST AND SIGNUP POST API 
-data sanitizing add api validation for each field
-install validator
-explorer validator library function and use validator func for pass,email     
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under repctive routers
- Read documentation for express.Router
- Create routes folder for managing auth,profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API → forgot password API
- Make you validate all data in every POST, PATCH apis


#create a connectionrequestSchema
send connection request api
proper validation of data
think about All corner casses
understad or query 

- Read this artcicle about compond indexes
read more about indexes in mongodb
why do we need index in db/
what is the advantages and disadvantages odf creating?























//note imp ques 
  //Express flow:

//Jab bhi ek request aati hai, Express har app.use() / app.METHOD() ko order of registration ke according execute karta hai.

//Agar tumne pehle routes mount kar diye, to request directly un routes pe chale jaati hai →
//  aur unse pehle likhe huye middlewares (jaise cors, cookieParser) apply hi nahi hote.



/note imp ques 
  //Express flow:

//Jab bhi ek request aati hai, Express har app.use() / app.METHOD() ko order of registration ke according execute karta hai.

//Agar tumne pehle routes mount kar diye, to request directly un routes pe chale jaati hai →
//  aur unse pehle likhe huye middlewares (jaise cors, cookieParser) apply hi nahi hote.8*/}



```
//this will only handle get call to /user
//app.get("/user/:userId",(req,res)=>{
  //  console.log(req.params);
   // res.send({firstname:"rimjhim",lastname:"verma"})
//})

/*app.use(
    "/users",
    [(req,res)=>{
    console.log("save data to the database");
    res.send("1st response");
},
(req,res)=>{
    console.log("save data to the database");
    res.send("2nd response");
}],
(req,res)=>{
    console.log("save data to the database");
    res.send("3nd response");
},
(req,res)=>{
    console.log("save data to the database");
    res.send("4nd response");
},
(req,res)=>{
    console.log("save data to the database");
    res.send("5nd response");
}
)*/





//Problem — No more matching route handlers exist after the second one, so Express tries to move on, but since you never sent a response (res.send(), res.end(), or res.json()), the request remains open.

//Result in browser/Postman:

//The request keeps loading forever (hanging request) until it times out.
/*app.get("/isha",(req,res,next)=>{
    console.log("save data to the database");
    
    res.send("data is sucessfully saved to the database");
next();
});
app.get("/isha",(req,res)=>{
    console.log("save data to the database");
    res.send("data is sucessfully saved to the 45 database");
next();
})*/



// Middleware for any path starting with "/"

/*

app.use("/", (req, res,next) => {
    //res.send("Handling / route");
next();
});
//app.use("/", ...) without next() will stop all further route processing if it matches first.
app.get(
    "/user",
    (req, res, next) => { next(); },
    (req, res, next) => { next(); },
    (req, res) => {
        res.send("2nd Route Handler");
    }
);*/




//Why “middle”?The client starts the request.The server eventually sends a response.In between, you can have multiple functions (middlewares) that:
//Look at the request (req) Change the request or response Decide whether to continue to the next middleware (next())Or stop and send a response immediately.

//They are “in the middle” of that flow.


//app.post("/users",(req,res)=>{
   // console.log("save data to the database");
   // res.send("data is sucessfully saved to the database");
//})
///app.delete("/users",(req,res)=>{

   // res.send("data is deleted succesfully");
//})
 

//this will match all the http method api call to /test

app.use("/isha",(req,res,next)=>{
    res.send("hello from  the server");//send a text back to the client
    next();
}, 
    (req,res)=>{
    res.send("hello from  the server second ");//send a text back to the client
})

app.use("/test",(req,res)=>{
    res.send("hello from  the server");//send a text back to the client
})
app.use("/hello",(req,res)=>{
    res.send("hello hello hello hello");//send a text back to the client
})


app.use("/app",(req,res)=>{
    res.send("app is starting");//send a text back to the client
})
