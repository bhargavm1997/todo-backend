var mongoose=require("mongoose")
const shortid = require("shortid")
const users=mongoose.model("user")
const task=mongoose.model("task")
const response=require("../lib/lib")
const passwordLib=require("../lib/generatePassword")
const nm=require("../appconfig/mail")

let signup=(req,res)=>
{
var si=shortid.generate()
    let a=new users({
          userid:si,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        mobile:req.body.mobile,
        password:passwordLib.hashpassword(req.body.password),
        createdBy:si
    })

a.save((err,result)=>
{
    if(err)
    {
        let apiresponse=response.generate(true,"error",500,null)
        res.send(apiresponse)
    }
    else{
        let data=result.toObject()
        let apiresponse=response.generate(false,"success",200,data)
        res.send(apiresponse)
    }
})
}

let login=(req,res)=>
{
    let a={}
a["email"]=req.body.email

users.findOne(a).exec((err,result)=>
{
   
        if (err){ 
            let apiresponse=response.generate(true,"error",500,null)
            res.send(apiresponse)
        } 
        else{ 
            let apiresponse=response.generate(false,"success",200,result)
        res.send(apiresponse)
        } 
});
}


let addTodo=(req,res)=>
{

    let a=new task({
        taskId:shortid.generate(),
        title:req.body.title,
        description:req.body.description,
       createdBy:req.body.id

    })

    a.save((err,result)=>
    {
        if(err)
        {
            let apiresponse=response.generate(true,"error",500,null)
            res.send(apiresponse)
        }
        else{
            let data=result.toObject()
            let apiresponse=response.generate(false,"succes",200,data)
            res.send(apiresponse)
        }
    })

}


let getTodo=(req,res)=>{

task.find().select("-_v")
.lean().exec((err,result)=>
{
    if(err)
    {
    let apiresponse=response.generate(true,"error",500,null)
    res.send(apiresponse)
}
else{
    let apiresponse=response.generate(false,"success",200,result)
    res.send(apiresponse)
    
}
})


}



let singleView=(req,res)=>
{
let a={

}
a["_id"]=req.query.id
task.findOne(a).exec((err,result)=>
{
    if(err)
    {
        let apiresponse=response.generate(true,"error",500,null)
        res.send(apiresponse)
    }
    else{
        let apiresponse=response.generate(false,"success",200,result)
        res.send(apiresponse)
    }
})


}




let update=(req,res)=>
{
let a=new task({
title:req.body.title,
description:req.body.description
})

task.findOneAndUpdate({_id:req.query._id},req.body).exec((err,result)=>{
    if(err)
    {
        let apiResponse=response.generate(true,"errr",500,null)
        res.send(apiresponse)
    }
    else{
        let apiresponse=response.generate(false,"success",200,result)
        res.send(apiResponse)
    }

});

}




let forgot=(req,res)=>
{
let data={
    email:req.body.email
}
  users.findOne(data).exec((err,result)=>
  {
      if(err)
      {
          let apiresponse=response.generate(true,"error",500,null)
          res.send(apiresponse)
      }
      else
      {
        nm.sendMail(req.body.email,"Forget Password")
        let apiresponse=response.generate(false,"success",200,result)
        res.send(apiresponse)
      }
  }
   


  )

}



let updatePass=(req,res)=>
{

    let a={
        password:req.body.password
    }

users.findOneAndUpdate({email:req.body.email}, a).exec((err,result)=>
{
if(err)
{
    let apiResponse=response.generate(true,"error",500,null)
    res.send(apiResponse)
}
else{
    let apiresponse=response.generate(false,"success",200,result)
    res.send(apiresponse)
}
}
)

}







module.exports={

    signup:signup,
    login:login,
    addTodo:addTodo,
    getTodo:getTodo,
    singleView:singleView,
    update:update,
    forgot:forgot ,
    updatePass:updatePass
}