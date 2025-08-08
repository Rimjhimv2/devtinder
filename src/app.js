const express=require("express");//import express into your project
const app=express();//crete an expresss app
app.use("/test",(req,res)=>{
    res.send("hello from  the server");//send a text back to the client
})
app.use("/hello",(req,res)=>{
    res.send("hello hello hello hello");//send a text back to the client
})


app.use("/app",(req,res)=>{
    res.send("app is starting");//send a text back to the client
})

app.use("/",(req,res)=>{
    res.send("hello from  the dashboard");//send a text back to the client
})





//request handler for all incoming http request
app.listen(3000,()=>{
    console.log("server is succesfully listening our request")

});
//this tell ur project to start listening for req on this port
//these 3 line create our web server