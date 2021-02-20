var mongoose = require("mongoose")
const shortid = require("shortid")
const users = mongoose.model("user")
const task = mongoose.model("task")
const validateInput = require("../lib/validation")
const friend = mongoose.model("friend")
const response = require("../lib/lib")
const passwordLib = require("../lib/generatePassword")
const nm = require("../appconfig/mail")
const check = require('../lib/checkLib')
const time = require('./../lib/timeLib');
const logger = require('./../lib/loggerLib');
const AuthModel = mongoose.model('Auth')
const token = require('../lib/tokenLib')
const taskHistory = mongoose.model("taskhistory")


let signup = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not meet the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }


    let createUser = () => {
        return new Promise((resolve, reject) => {
            users.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        let id = shortid.generate();
                        let newUser = new users({
                            userId: id,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            countryCode: req.body.countryCode,
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now(),
                            createdBy: id
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


}
let checkEmail = (email) => {

    users.findOne(email)
        .exec((err, retrievedUserDetails) => {
            if (err) {
                logger.error(err.message, 'userController: createUser', 10)
                return err;
            }
            else {
                return retrievedUserDetails
            }
        })
}
let forgot = (req, res) => {
    return new Promise((resolve, reject) => {
        let data = {
            email: req.body.email
        }
        if (req.body.email) {
            if (!validateInput.Email(req.body.email)) {
                let apiResponse = response.generate(true, 'Email Does not meet the requirement', 400, null)
                reject(apiResponse)
            }
            else {
                users.findOne(data)
                    .exec((err, retrievedUserDetails) => {
                        if (err) {
                            console.log(err)
                            let apiResponse = response.generate(false, 'Email not found', 500, null)
                            res.send(apiResponse)
                        }
                        else {
                            if (retrievedUserDetails == null) {
                                let apiResponse = response.generate(false, 'Email not found', 500, null)
                                res.send(apiResponse)
                            } else {
                                nm.sendMail(req.body.email, "Forget password link")
                                let apiResponse = response.generate(false, 'Email sent successfully', 200, retrievedUserDetails)
                                res.send(apiResponse)
                            }

                        }

                    });




            }
        }
    });
}



let login = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {

                users.findOne({ email: req.body.email }, (err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        console.log(retrievedUserDetails)
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    console.log(isMatch)
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }


    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}
let addTodo = (req, res) => {
    var a;
    if (req.body.subtask != undefined) {
        a = new task({
            taskId: shortid.generate(),
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            friends: req.body.friends,
            subTask: req.body.subtask,
            createdBy: req.body.id,
            createdOn: time.now()

        })
    }
    else {
        a = new task({
            taskId: shortid.generate(),
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            friends: req.body.friends,
            createdBy: req.body.id,
            createdOn: time.now()
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
    var tasks = []
    task.find({
        "createdBy": req.query.id
    }, function (err, result) {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Group Controller: getAllGroups', 10)
            let apiResponse = response.generate(true, 'Failed To Find Group Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            task.find({
                friends: {
                    $in: [
                        mongoose.Types.ObjectId(req.query.id)
                    ]
                }
            }, function (err, friendResult) {
                tasks.push(friendResult)
                let apiResponse = response.generate(false, 'All Group Details Found', 200, tasks)
                res.send(apiResponse)
            })
        } else {
            tasks.push(result)
            task.find({
                friends: {
                    $in: [
                        mongoose.Types.ObjectId(req.query.id)
                    ]
                }
            }, function (err, friendResult) {
                if (friendResult) {
                    tasks.push(friendResult)
                    let apiResponse = response.generate(false, 'All Group Details Found', 200, tasks)
                    res.send(apiResponse)
                }
            });
        }

    });
}

let friendList = (req, res) => {
    friend.find({ invitedBy: req.query.id }).select("-_v")
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
           addTaskHistory("Task history updated",req.body.updatedBy,req.query.id );
            res.send(apiResponse)
        }

    });

}

let addTaskHistory=(action,id,taskId)=>{
    let newTaskHistory = new taskHistory({
        taskHistoryId:shortid.generate(),
        taskId:taskId,
        action:action,
        updatedBy:id,
        updatedOn:time.now()
    });
    newTaskHistory.save((err, result) => {
        if (err) {
           console.log(err)
        }
        else {
            console.log(result)
        }
    })

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

let deleteTask = (req, res) => {
    task.findByIdAndDelete({ _id: req.query.id }).exec((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error in deleting task", 500, null)
            res.send(apiresponse)
        }
        else {
            let apiresponse = response.generate(false, "task deleted successfully", 200, result)
            addTaskHistory("Task deleted successfully",req.query._id,req.query.id)
            res.send(apiresponse)
        }
    });
}
let undoTaskHistory = (req, res) => {
    taskHistory.findOneAndDelete({ "taskId": req.query.id }, { "sort": { "date": -1 } }).exec((err, result) => {
        if (err) {
            let apiresponse = response.generate(true, "error in undoing task history", 500, null)
            res.send(apiresponse)
        }
        else {
            let apiresponse = response.generate(false, "task history undo successfully", 200, result)
            res.send(apiresponse)
        }
    });
}

let updatePass = (req, res) => {
    return new Promise((resolve, reject) => {
        Users.findOneAndUpdate({ email: req.body.email }, passwordLib.hashpassword(req.body.password), { multi: true }).exec((err, newExpense) => {

            if (err) {
                console.log(err)
                logger.error(err.message, 'UserController: Update Password', 10)
                let apiResponse = response.generate(true, 'Failed to update password', 500, null)
                reject(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Password updated successfully', 200, newExpense)
                res.send(apiResponse)
            }
        })
    });
}
let addFriend = (req, res) => {

    let newFriend = new friend({
        friendId: req.body.id,
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
            nm.inviteFriend(req.body.email, "To do list invitation")
            let apiresponse = response.generate(false, "friend invited successfully", 200, data)
            res.send(apiresponse)
        }
    })
}


let taskCount = (req, res) => {

    task.count({
        createdBy: req.query.id

    }).exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, "error in counting task", 500, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.generate(false, "success in counting task", 200, result)
            res.send(apiResponse)
        }
    })

}
let friendCount = (req, res) => {

    friend.count({
        invitedBy: req.query.id

    }).exec((err, result) => {
        if (err) {
            let apiResponse = response.generate(true, "error in counting task", 500, null)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.generate(false, "success in counting task", 200, result)
            res.send(apiResponse)
        }
    })

}
let logout = (req, res) => {
    AuthModel.findOneAndRemove({ userId: req.body.userId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })
}
let saveToken = (tokenDetails) => {
    return new Promise((resolve, reject) => {
        AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
            if (err) {
                console.log(err.message, 'userController: saveToken', 10)
                let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                reject(apiResponse)
            } else if (check.isEmpty(retrievedTokenDetails)) {
                let newAuthToken = new AuthModel({
                    userId: tokenDetails.userId,
                    authToken: tokenDetails.token,
                    tokenSecret: tokenDetails.tokenSecret,
                    tokenGenerationTime: time.now()
                })

                newAuthToken.save((err, newTokenDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'userController: saveToken', 10)
                        let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                        reject(apiResponse)
                    } else {
                        let responseBody = {
                            authToken: newTokenDetails.authToken,
                            userDetails: tokenDetails.userDetails
                        }
                        resolve(responseBody)
                    }
                })
            } else {
                retrievedTokenDetails.authToken = tokenDetails.token
                retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                retrievedTokenDetails.tokenGenerationTime = time.now()
                retrievedTokenDetails.save((err, newTokenDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'userController: saveToken', 10)
                        let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                        reject(apiResponse)
                    } else {
                        let responseBody = {
                            authToken: newTokenDetails.authToken,
                            userDetails: tokenDetails.userDetails
                        }
                        resolve(responseBody)
                    }
                })
            }
        })
    })
}
let userDetailsByEmail = (req, res) => {
    let findQuery = {}
    findQuery['email'] = req.query.email;

    users.find(findQuery)
        .select('-__v')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getUserDdetails', 10)
                let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Friends Found', 'User Controller: getUserDdetails')
                let apiResponse = response.generate(true, 'No Friend Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('friend found and listed.')
                let apiResponse = response.generate(false, 'getUserDdetails', 200, result)
                res.send(apiResponse)
            }
        })
}
let userDetailsById = (req, res) => {
  

    users.find({_id:mongoose.Types.ObjectId(req.query.id)})
        .select('-__v')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getUserDdetails', 10)
                let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Friends Found', 'User Controller: getUserDdetails')
                let apiResponse = response.generate(true, 'No Friend Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('user found and listed.')
                let apiResponse = response.generate(false, 'getUserDdetails', 200, result)
                res.send(apiResponse)
            }
        })
}
let getTaskHistory = (req, res) => {
    let findQuery = {}
    findQuery['taskId'] = req.query.id;

    taskHistory.find(findQuery)
        .select('-__v')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'error in task history', 10)
                let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'task history found successfully', 200, result)
                res.send(apiResponse)
            }
        })
}

let getNotification = (req, res) => {
    task.find({
        'friends': {
            $in: [
                mongoose.Types.ObjectId(req.query.id)
            ]
        }
    }, function (err, result) {
            if (err) {
                console.log(err)
                logger.error(err.message, 'error in task history', 10)
                let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(false, 'task history not found', 500, null)
                res.send(apiResponse)
            }
            else{
                taskHistory.find({ "taskId": mongoose.Types.ObjectId(result[0]._id)}).exec((err1, result1) => {
                   console.log(err1)
                    if (err1) {
                        let apiresponse = response.generate(true, "error in sending notification", 500, null)
                        res.send(apiresponse)
                    }
                    else {
                        console.log(result1)
                        let apiresponse = response.generate(false, "notification sent", 200, result1)
                        res.send(apiresponse)
                    }
                });
            }
        })
}



module.exports = {

    signup: signup,
    taskCount: taskCount,
    friendCount: friendCount,
    login: login,
    addTodo: addTodo,
    getTodo: getTodo,
    singleView: singleView,
    update: update,
    forgot: forgot,
    updatePass: updatePass,
    addFriend: addFriend,
    deleteTask: deleteTask,
    updateProfile: updateProfile,
    friendList: friendList,
    checkEmail: checkEmail,
    logout: logout,
    userDetailsByEmail: userDetailsByEmail,
    userDetailsById:userDetailsById,
    getTaskHistory:getTaskHistory,
    undoTaskHistory:undoTaskHistory,
    getNotification:getNotification
}