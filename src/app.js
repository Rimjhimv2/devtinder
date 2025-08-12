const express=require("express");//import express into your project
const app=express();//crete an expresss app
//const {adminAuth,userAuth}=require("./middleware/auth")



//app.use("/admin", adminAuth );

//app.use("/user", userAuth );
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})
app.get("/getuserData",(req,res)=>{
    //try{
    throw new Error("dvbzhjf");
    res.send("user data sent ");
//}
//catch(err){
    //res.status(500).send("some error occur contact support team")
//}


});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
console.log("server is sucessfully listening on port 7777")
})

//app.get("/admin/getAllData", (req, res) => {
   // res.send("All Data Sent");
//});
//app.get("/admin/deleteUser",(req,res)=>{
   // res.send("deleted a user");
//})


//app.use("/admin", ...)This tells Express:“For any route starting with /admin (GET, POST, etc.), run this middleware first.”

//console.log("Admin auth is getting checked!!") Just logs to the server console that the middleware is runn.Token checkmtoken is hardcoded to "xyz".

//isAdminAuthorized checks if token is "xyz".In real apps, you’d get token from request headers and validate it.If unauthorized → send HTTP 401 Unauthorized response.

//If authorized → call next() to move to the actual route handler.










//request handler for all incoming http request
app.listen(3000,()=>{
    console.log("server is succesfully listening our request")

});
//this tell ur project to start listening for req on this port
//these 3 line create our web server