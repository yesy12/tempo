const express = require("express");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
const port = 9000;

//File
const {readFile} = require("fs");

const language_AcceptFile = __dirname + "/listLanguage.txt";

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
    let {city, language, system} = req.body;
    let erros = 0;

    city = city.replace(" ","%20");

    await readFile(language_AcceptFile, "utf8", (err, data)=>{
        if(err) throw err;
        
        let languages_accepts = data.split(",");
        let exists = false;

        languages_accepts.forEach(language_accept =>{
            if(language_accept == language){
                exists = true;
            }
        })
        if(exists == false){
            erros += 1;
        }
    })

    if( !(system == "metric") || !(system == "imperial") ){
        erros += 1;
    } 

    // link_parametrs = "&units=metric&lang=pt_br"
    
    const link = `${process.env.link}${city}&appid=${process.env.appid}&units=${system}&lang=${language}`;
    console.log(link);

    const response = await axios
    .get(link)
    .then((data)=>{
        res.render("indexPost",{
            data, system
        })
    })
    .catch((error)=>{
        console.log(error);
        res.send("City Not Found");
    })
    

})

app.listen(port,()=>{
    console.log(`Running on port ${port}...`);
})