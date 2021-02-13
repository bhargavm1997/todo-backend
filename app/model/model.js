var mongoose=require("mongoose")
Schema=mongoose.Schema


 let userSchema=new Schema(
     {
userid:{
    type:String,
    default:"",
    unique:true
},

firstname:{
    type:String,
    default:""
},
lastname:{
    type:String,
    default:""
},
email:
{
    type:String,
    default:""
},
mobile:
{
    type:String,
    default:""
},
password:
{
    type:String,
    default:""
},
countryCode:{
     type:String,
     default:""
},
createdBy:
{
type:String,
default:""
},
createdOn:
{
    type:Date,
    default:""
}



     }
 )



 mongoose.model("user",userSchema)