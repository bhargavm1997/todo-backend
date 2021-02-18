var express=require("express")
var config=require("../appconfig/config")
var cont=require("../controller/controller")



module.exports.setRouter=(app)=>
{
let baseurl=`${config.ver}`
app.post(`${baseurl}/signup`,cont.signup)
app.post(`${baseurl}/login`,cont.login)
app.post(`${baseurl}/addTodo`,cont.addTodo)
app.get(`${baseurl}/getTodo`,cont.getTodo)
app.get(`${baseurl}/singleView`,cont.singleView)
app.put(`${baseurl}/update`,cont.update)
app.post(`${baseurl}/forgot`,cont.forgot)
app.put(`${baseurl}/updatePass`,cont.updatePass)
app.post(`${baseurl}/addFriend`,cont.addFriend)
app.delete(`${baseurl}/deleteTask`,cont.deleteTask)
app.put(`${baseurl}/updateProfile`,cont.updateProfile)
app.get(`${baseurl}/friendList`,cont.friendList)

}


