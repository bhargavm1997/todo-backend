var mongoose = require("mongoose")
const shortid = require("shortid")
const users = mongoose.model("user")
const task = mongoose.model("task")
const friend = mongoose.model("friend")
const response = require("../lib/lib")
const passwordLib = require("../lib/generatePassword")
const nm = require("../appconfig/mail")

let signup = (req, res) => {
    var si = shortid.generate()
    let a = new users({
        userid: si,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        countryCode: req.body.countryCode,
        password: passwordLib.hashpassword(req.body.password),
        createdBy: si
    })

    a.save((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error", 500, null)
            res.send(apiresponse)
        }
        else {
            let data = result.toObject()
            let apiresponse = response.generate(false, "success", 200, data)
            res.send(apiresponse)
        }
    })
}

let login = (req, res) => {
    let a = {}
    a["email"] = req.body.email

    users.findOne(a).exec((err, result) => {

        if (err) {
            let apiresponse = response.generate(true, "error", 500, null)
            res.send(apiresponse)
        }
        else {
            //validatePassword(req.body.password,result)
            let apiresponse = response.generate(false, "success", 200, result)
            res.send(apiresponse)
        }
    });
}

let addTodo = (req, res) => {
    var a;
    if(req.body.subtask!=undefined)
    {
        a = new task({
            taskId: shortid.generate(),
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            subTask:req.body.subtask,
            createdBy: req.body.id
    
        })
    }
    else{
         a = new task({
            taskId: shortid.generate(),
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            createdBy: req.body.id
    
        })
    }
    a.save((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error", 500, null)
            res.send(apiresponse)
        }
        else {
            let data = result.toObject()
            let apiresponse = response.generate(false, "success", 200, data)
            res.send(apiresponse)
        }
    })

}


let getTodo = (req, res) => {

    task.find().select("-_v")
        .lean().exec((err, result) => {
            if (err) {
                let apiresponse = response.generate(true, "error", 500, null)
                res.send(apiresponse)
            }
            else {
                let apiresponse = response.generate(false, "success", 200, result)
                res.send(apiresponse)

            }
        })


}

let friendList = (req,res) => {
    friend.find({invitedBy:req.query.id}).select("-_v")
    .lean().exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, 'Failed To find friend list', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All friend Details Found', 200, result)
            res.send(apiResponse)
        }
    })
    
}

 

let singleView = (req, res) => {
    let a = {

    }
    a["_id"] = req.query.id
    task.findOne(a).exec((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error", 500, null)
            res.send(apiresponse)
        }
        else {
            let apiresponse = response.generate(false, "success", 200, result)
            res.send(apiresponse)
        }
    })


}




let update = (req, res) => {
    task.findOneAndUpdate({ _id: req.query.id }, req.body, { multi: true }).exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, "error in updating task", 500, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.generate(false, "task updated successfully", 200, result)
            res.send(apiResponse)
        }

    });

}

let updateProfile = (req, res) => {
    users.findOneAndUpdate({ _id: req.query.id }, req.body, { multi: true }).exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, "error in updating user", 500, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.generate(false, "user updated successfully", 200, result)
            res.send(apiResponse)
        }

    });

}

let deleteTask=(req,res)=>{
    task.findByIdAndDelete({_id:req.query.id}).exec((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error in deleting task", 500, null)
            res.send(apiresponse)
        }
        else {
            let apiresponse = response.generate(false, "task deleted successfully", 200, result)
            res.send(apiresponse)
        }
    });
}



let forgot = (req, res) => {
    let data = {
        email: req.body.email
    }
    users.findOne(data).exec((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error", 500, null)
            res.send(apiresponse)
        }
        else {
            nm.sendMail(req.body.email, "Forget Password")
            let apiresponse = response.generate(false, "success", 200, result)
            res.send(apiresponse)
        }
    }
    )

}



let updatePass = (req, res) => {

    let a = {
        password: passwordLib.hashpassword(req.body.password)
    }

    users.findOneAndUpdate({ email: req.body.email }, a).exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, "error", 500, null)
            res.send(apiResponse)
        }
        else {
            let apiresponse = response.generate(false, "success", 200, result)
            res.send(apiresponse)
        }
    }
    )

}

let addFriend = (req, res) => {

    let newFriend =  new friend({
        friendId:shortid.generate(),
        email: req.body.email,
        invitedBy: req.body.invitedBy
    });

    newFriend.save((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error in sending mail", 500, null)
            res.send(apiresponse)
        }
        else {
            let data = result.toObject()
            nm.sendMail(req.body.email, "To do list invitation")
            let apiresponse = response.generate(false, "friend invited successfully", 200, data)
            res.send(apiresponse)
        }
    })

}





module.exports = {

    signup: signup,
    login: login,
    addTodo: addTodo,
    getTodo: getTodo,
    singleView: singleView,
    update: update,
    forgot: forgot,
    updatePass: updatePass,
    addFriend: addFriend,
    deleteTask:deleteTask,
    updateProfile:updateProfile,
    friendList:friendList

}