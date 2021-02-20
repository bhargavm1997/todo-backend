let mongoose=require("mongoose"),
Schema= mongoose.Schema


let taskSchema=new Schema({


    taskId:{
        type:String,
        default:"",
        unique:true
    },
    title:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    status:{
        type:String,
        default:""
    },
    subTask:{
        type:String,
        default:""
    },
    friends:[{
        type:Schema.Types.ObjectId,
        ref:"friend"
    }],
    createdBy:{
        type:String,
        default:""
    },
    createdOn:{
        type:Date,
        default:""
    },
    status:{
        type:String,
        default:"active"
    }


})



mongoose.model("task",taskSchema)