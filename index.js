var express=require("express")
var app=express()
var mongoose=require("mongoose")
var config=require("./app/appconfig/config")
const http=require("http")
const server=http.createServer(app)
var route="./app/route"
var model="./app/model"
const bp=require("body-parser")
var cors = require('cors')

app.use(cors())

var fs=require("fs")

app.use(bp.json())
app.use(bp.urlencoded({extended:false}))

app.all('*',function(req,res,next){
res.header("Access-Control-Allow-Origin","*");
res.header('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept");
res.header("Access-Control-Allow-Methods",'GET,PUT,POST,DELETE')
next();
})



fs.readdirSync(model).forEach(function(file){

if(~file.indexOf(".js"))
{
require(model + "/" +file)
}

})


fs.readdirSync(route).forEach(function(file){

if(~file.indexOf(".js"))
{
    let b = require(route+"/"+ file)
    b.setRouter(app)
}


})


let db = mongoose.connect(config.db.uri,{ useMongoClient: true });

mongoose.connection.on("open",function(error){
    if(error)
    {
        console.log("error");
    }
    else{
        console.log("connection success")
    }
})

mongoose.connection.on("error",function(error){
    console.log("error")
})


server.listen(config.port)
console.log(config.port)
