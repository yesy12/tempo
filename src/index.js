const express = require("express");
const app = express();
const port = 9000;

app.get("/",async(req,res)=>{
    res.json({"message":"ola mundo"});
})


app.listen(port,()=>{
    console.log(`Running on port ${port}...`);
})