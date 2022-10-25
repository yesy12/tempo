const express = require("express");
const axios = require("axios");
const path = require("path");

require("dotenv").config();
const app = express();
const port = 9000;

app.use("/static", express.static("public"));

app.set("view engine","ejs");
app.set("views", "./src/views");

const link = `${process.env.link}Taboao%20da%20Serra&appid=${process.env.appid}${process.env.link_parametrs}`;

app.get("/",(req,res)=>{
    res.render("indexGet")
})

app.post("/",async(req,res)=>{
    console.log(req.body);
    const response = await axios.get(link);
    res.render("indexPost",{
        data: response.data
    })
})

app.listen(port,()=>{
    console.log(`Running on port ${port}...`);
})