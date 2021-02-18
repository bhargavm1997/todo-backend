let mongoose=require("mongoose"),
Schema= mongoose.Schema


let friendSchema=new Schema({


    friendId:{
        type:String,
        default:"",
        unique:true
    },
    email:{
        type:String,
        default:""
    },
    invitedBy:{
        type:String,
        default:""
    },
    invitedOn:{
        type:Date,
        default:""
    }
  


})



mongoose.model("friend",friendSchema)