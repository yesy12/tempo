const express = require("express");
const axios = require("axios");

require("dotenv").config();
const app = express();
const port = 9000;

const link = `${process.env.link}Taboao%20da%20Serra&appid=${process.env.appid}${process.env.link_parametrs}`;

app.get("/",async(req,res)=>{
    const response = await axios.get(link);
    console.log(response.data);
    res.json({"message":response.data});
})

app.listen(port,()=>{
    console.log(`Running on port ${port}...`);
})