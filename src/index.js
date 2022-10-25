const express = require("express");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
const port = 9000;


//public files
app.use("/static", express.static("public"));


//Req file
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(bodyParser.json());

//Config
app.set("view engine","ejs");
app.set("views", "./src/views");


app.get("/",(req,res)=>{
    res.render("indexGet")
})

app.post("/",async(req,res)=>{
    let {city} = req.body;

    city = city.replace(" ","%20");
    
    const link = `${process.env.link}${city}&appid=${process.env.appid}${process.env.link_parametrs}`;
    console.log(link);
    try{
        const response = await axios.get(link);
        
        res.render("indexPost",{
            data: response.data
        })
    }
    catch{
        res.send("City not found");
    }

})

app.listen(port,()=>{
    console.log(`Running on port ${port}...`);
})