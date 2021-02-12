
const nm=require("nodemailer")


let sendmail=(senderName,Subject)=>
{


    var transporter=nm.createTransport({
        host:"smtp.googlemail.com",
        port:465,
        secure:true,
        auth:{

            user:"def831024@gmail.com",
            pass:"Kaddy@1994"

        }

    
    } )

var mailOptions={
    from:"def831024@gmail.com",
    to:senderName,
    Subject:Subject,
    html:"<h4>Hello,</h4> <h5> copy paste below link in new tab <br> <a> http://localhost:4200/updatepassword/" + senderName +"</a></h5>"
}



transporter.sendMail(mailOptions,function(err,result)
{
if(err)
{
    console.log("error")
}
else{
    console.log("email sent"+result.response)
    
}
})
}


module.exports={

    sendMail:sendmail
}