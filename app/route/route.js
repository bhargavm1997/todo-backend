var express = require("express")
var config = require("../appconfig/config")
var cont = require("../controller/controller")



module.exports.setRouter = (app) => {
    let baseurl = `${config.ver}`
    app.post(`${baseurl}/signup`, cont.signup)
    /**
         * @api {post} /api/v1/signup User Sign Up
         * @apiVersion 0.0.1
         * @apiGroup sign up
         *
         * @apiParam {String} firstName  firstName of the user passed as a body parameter
         * @apiParam {String} lastName  lastName of the user passed as a body parameter
         * @apiParam {String} email  email of the user passed as a body parameter
         * @apiParam {String} countryCode countryCode of the user passed as a body parameter
         * @apiParam {String} mobileNumber mobileNumber of the user passed as a body parameter
         * @apiParam {String} password password of the user passed as a body parameter
    
         *
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "sign up successfully",
            "status": 200,
            "data": [
                        {
                            userId:"String",
                            firstName:"String",
                            lastName:"String",
                            password:"String",
                            email:"String",
                            countryCode:"String",
                            mobile:"String",
                            createdOn:"date",
                            createdBy:"String"
                        }
                    ]
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "Failed to create new User",
            "status": 500,
            "data": null
           }
         */
    app.post(`${baseurl}/login`, cont.login)

    /**
     * @api {post} /api/v1/users/login login user
     * @apiVersion 0.0.1
     * @apiGroup login
     *
     * @apiParam {String} email  email of the user passed as a body parameter
     * @apiParam {String} password  password of the user passed as a body parameter

        *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "login successfully",
        "status": 200,
        "data": [
                    {
                        userId:"String",
                        firstName:"String",
                        lastName:"String",
                        password:"String",
                        email:"String",
                        countryCode:"String",
                        mobile:"String",
                        createdOn:"date",
                        createdBy:"String"
                    }
                ]
            }
        }
    }
      @apiErrorExample {json} Error-Response:
     *
     * {
        "error": true,
        "message": "Failed To Find User Details",
        "status": 500,
        "data": null
       }
     */
    app.post(`${baseurl}/addTodo`, cont.addTodo)

    /**
     * @api {post} /api/v1/addTodo add to do list
     * @apiVersion 0.0.1
     * @apiGroup insert
     *
     * @apiParam {String} title  title of to do list as a body parameter
     * @apiParam {String} description  description of to do list as a body parameter
     * @apiParam {String} subtask  subtask of to do list as a body parameter
     * @apiParam {String} status  status of to do list as a body parameter
     * @apiParam {String} createdBy  createdBy of to do list as a body parameter

        *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "to do list added successfully",
        "status": 200,
        "data": [
                    {
                        "taskId":"String",
                        title:"String",
                        description:"String",
                        subtask:"String",
                        friends:"String",
                        createdOn:"date",
                        createdBy:"String"
                    }
                ]
            }
        }
    }
      @apiErrorExample {json} Error-Response:
     *
     * {
        "error": true,
        "message": "Failed To Add to do list",
        "status": 500,
        "data": null
       }
     */
    app.get(`${baseurl}/getTodo`, cont.getTodo)

    /**
         * @api {get} /api/v1/getTodo Get to do list
         * @apiVersion 0.0.1
         * @apiGroup read
         *
         * @apiParam {String} createdBy createdBy of the user passed as the URL parameter
         * @apiParam {String} friends friends id passed as the URL parameter
         * 
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "fetched to do list successfully ",
            "status": 200,
            "data": [
                        {
                            "taskId":"String",
                            title:"String",
                            description:"String",
                            subtask:"String",
                            friends:"String",
                            createdOn:"date",
                            createdBy:"String"
                        }
                    ]
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "error occurred",
            "status": 500,
            "data": null
           }
         */

    app.get(`${baseurl}/getTaskHistory`, cont.getTaskHistory)


    /**
         * @api {get} /api/v1/getTaskHistory Get task history
         * @apiVersion 0.0.1
         * @apiGroup read
         *
         * @apiParam {String} taskId taskId of the task passed as the URL parameter
         * 
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "fetched task history successfully ",
            "status": 200,
            "data": [
                        {
                            taskHistoryId:"String",
                            action:"String",
                            updatedOn:"date",
                            updatedBy:"String",
                            taskId:"String"
                        }
                    ]
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "error occurred",
            "status": 500,
            "data": null
           }
         */

    app.get(`${baseurl}/singleView`, cont.singleView)



    /**
         * @api {get} /api/v1/getTask Get task by id
         * @apiVersion 0.0.1
         * @apiGroup read
         *
         * @apiParam {String} id id of the task passed as the URL parameter
         * 
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "fetched task by id successfully ",
            "status": 200,
            "data": [
                        {
                            "taskId":"String",
                            title:"String",
                            description:"String",
                            subtask:"String",
                            friends:"String",
                            createdOn:"date",
                            createdBy:"String"
                        }
                    ]
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "error occurred",
            "status": 500,
            "data": null
           }
         */

    app.put(`${baseurl}/update`, cont.update)
    /**
         * @api {put} /api/v1/update Update task by taskId
         * @apiVersion 0.0.1
         * @apiGroup edit
         *
        * @apiParam {String} taskId  id of to do list as a query parameter
        * @apiParam {String} title  title of to do list as a body parameter
     * @apiParam {String} description  description of to do list as a body parameter
     * @apiParam {String} subtask  subtask of to do list as a body parameter
     * @apiParam {String} status  status of to do list as a body parameter
     * @apiParam {String} createdBy  createdBy of to do list as a body parameter
         *  @apiSuccessExample {json} Success-Response:
         *  {
           [ 
               data: {
               createdBy: "String",
                createdOn: date,
                description: "String",
                friends: "String",
                status: "String",
                subTask: "String",
                taskId: "String",
                title: "String"
                }
         ],
          error: false
         message: "task updated successfully"
        status: 200
                }
           
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "Failed to update to do list",
            "status": 500,
            "data": null
           }
         */
    app.post(`${baseurl}/forgot`, cont.forgot)
    
    /**
     * @api {post} /api/v1/forgot forgot link
     * @apiVersion 0.0.1
     * @apiGroup link sent
     *
     * @apiParam {String} email  email of to do list as a body parameter
 
        *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "forgot link sent successfully",
        "status": 200,
        "data": [
                   {
                            userId:"String",
                            firstName:"String",
                            lastName:"String",
                            password:"String",
                            email:"String",
                            countryCode:"String",
                            mobile:"String",
                            createdOn:"date",
                            createdBy:"String"
                        }
                ]
            }
        }
    }
      @apiErrorExample {json} Error-Response:
     *
     * {
        "error": true,
        "message": "Failed To send link",
        "status": 500,
        "data": null
       }
     */
    app.put(`${baseurl}/updatePass`, cont.updatePass)
    /**
         * @api {put} /api/v1/updatePass Update password by email id
         * @apiVersion 0.0.1
         * @apiGroup edit
         *
        * @apiParam {String} email  email of user as a body parameter
        * @apiParam {String} password  password of user as a body parameter
  
         *  @apiSuccessExample {json} Success-Response:
         *  {
           [ 
               data: {
                 userId:"String",
                        firstName:"String",
                        lastName:"String",
                        password:"String",
                        email:"String",
                        countryCode:"String",
                        mobile:"String",
                        createdOn:"date",
                        createdBy:"String"
                }
         ],
          error: false
         message: "password updated successfully"
        status: 200
                }
           
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "Failed to update password",
            "status": 500,
            "data": null
           }
         */
    app.post(`${baseurl}/addFriend`, cont.addFriend)
    
    /**
     * @api {post} /api/v1/addFriend add friend
     * @apiVersion 0.0.1
     * @apiGroup insert
     *
     * @apiParam {String} id  id of user as a body parameter
     * @apiParam {String} email  email of user as a body parameter
     * @apiParam {String} invitedBy  invitedBy user as a body parameter

        *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "friend added successfully",
        "status": 200,
        "data": [
                    {
                        "friendId":"String",
                        email:"String",
                        invitedBy:"String",
                        invitedOn:date
                    }
                ]
            }
        }
    }
      @apiErrorExample {json} Error-Response:
     *
     * {
        "error": true,
        "message": "Failed To Add friend",
        "status": 500,
        "data": null
       }
     */
    app.delete(`${baseurl}/undoTaskHistory`, cont.undoTaskHistory)
    
    /**
     * @api {post} /api/v1/undoTaskHistory undo task history
     * @apiVersion 0.0.1
     * @apiGroup delete
     *
     * @apiParam {String} taskId  taskId of user as a URL parameter

        *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "friend added successfully",
        "status": 200,
        "data": [
                    {
                        friendId:"String",
                        email:"String",
                        invitedBy:"String",
                        invitedOn:date
                    }
                ]
            }
        }
    }
      @apiErrorExample {json} Error-Response:
     *
     * {
        "error": true,
        "message": "Failed undo task history",
        "status": 500,
        "data": null
       }
     */
    app.delete(`${baseurl}/deleteTask`, cont.deleteTask)
     /**
     * @api {post} /api/v1/deleteTask delete task by task id
     * @apiVersion 0.0.1
     * @apiGroup delete
     *
     * @apiParam {String} taskId  taskId of user as a URL parameter

        *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "task deleted successfully",
        "status": 200,
        "data": [
                    {
                            taskId:"String",
                            title:"String",
                            description:"String",
                            subtask:"String",
                            friends:"String",
                            createdOn:"date",
                            createdBy:"String"
                    }
                ]
            }
        }
    }
      @apiErrorExample {json} Error-Response:
     *
     * {
        "error": true,
        "message": "Failed to delete task",
        "status": 500,
        "data": null
       }
     */

    app.put(`${baseurl}/updateProfile`, cont.updateProfile)
     /**
         * @api {put} /api/v1/updateProfile Update profile by id
         * @apiVersion 0.0.1
         * @apiGroup edit
         *
         * @apiParam {String} id  id of user as a URL parameter
       * @apiParam {String} firstName  firstName of the user passed as a body parameter
         * @apiParam {String} lastName  lastName of the user passed as a body parameter
         * @apiParam {String} email  email of the user passed as a body parameter
         * @apiParam {String} countryCode countryCode of the user passed as a body parameter
         * @apiParam {String} mobileNumber mobileNumber of the user passed as a body parameter
         * @apiParam {String} password password of the user passed as a body parameter
  
         *  @apiSuccessExample {json} Success-Response:
         *  {
           [ 
               data: {
                        userId:"String",
                        firstName:"String",
                        lastName:"String",
                        password:"String",
                        email:"String",
                        countryCode:"String",
                        mobile:"String",
                        createdOn:"date",
                        createdBy:"String"
                }
         ],
          error: false
         message: "user profile updated successfully"
        status: 200
                }
           
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "Failed to update profile",
            "status": 500,
            "data": null
           }
         */
    app.get(`${baseurl}/friendList`, cont.friendList),
     /**
         * @api {get} /api/v1/friendList Get friend list
         * @apiVersion 0.0.1
         * @apiGroup read
         *
         * @apiParam {String} createdBy createdBy of the user passed as the URL parameter
         * 
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "fetched friend list successfully ",
            "status": 200,
            "data": [
                        {
                        friendId:"String",
                        email:"String",
                        invitedBy:"String",
                        invitedOn:date
                        }
                    ]
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "error occurred",
            "status": 500,
            "data": null
           }
         */

    app.get(`${baseurl}/taskCount`, cont.taskCount)
     /**
         * @api {get} /api/v1/taskCount Get taskcount
         * @apiVersion 0.0.1
         * @apiGroup read
         *
         * @apiParam {String} createdBy createdBy of the task passed as the URL parameter
         * 
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "fetched task count successfully ",
            "status": 200,
            "data": 4
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "error occurred",
            "status": 500,
            "data": null
           }
         */

    app.get(`${baseurl}/friendCount`, cont.friendCount)
    /**
         * @api {get} /api/v1/friendCount Get friendcount
         * @apiVersion 0.0.1
         * @apiGroup read
         *
         * @apiParam {String} createdBy createdBy of the task passed as the URL parameter
         * 
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "fetched friend count successfully ",
            "status": 200,
            "data": 4
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "error occurred",
            "status": 500,
            "data": null
           }
         */

    app.get(`${baseurl}/userDetailsByEmail`, cont.userDetailsByEmail)
     /**
         * @api {post} /api/v1/userDetailsByEmail get user details by email
         * @apiVersion 0.0.1
         * @apiGroup fetch
         *
         * @apiParam {String} email  email of the user passed as a URI parameter
    
         *
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "user details fetch successfully",
            "status": 200,
            "data": [
                        {
                            userId:"String",
                            firstName:"String",
                            lastName:"String",
                            password:"String",
                            email:"String",
                            countryCode:"String",
                            mobile:"String",
                            createdOn:"date",
                            createdBy:"String"
                        }
                    ]
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "Failed to fetch user details",
            "status": 500,
            "data": null
           }
         */
   
    app.get(`${baseurl}/getNotification`, cont.getNotification)
    
    /**
         * @api {get} /api/v1/getNotification Get task history
         * @apiVersion 0.0.1
         * @apiGroup read
         *
         * @apiParam {String} taskId taskId of the task passed as the URL parameter
         * 
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "fetched task history successfully ",
            "status": 200,
            "data": [
                        {
                            taskHistoryId:"String",
                            action:"String",
                            updatedOn:"date",
                            updatedBy:"String",
                            taskId:"String"
                        }
                    ]
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "error occurred",
            "status": 500,
            "data": null
           }
         */

    app.get(`${baseurl}/userDetailsById`, cont.userDetailsById)
      /**
         * @api {post} /api/v1/userDetailsById get user details by id
         * @apiVersion 0.0.1
         * @apiGroup fetch
         *
         * @apiParam {String} id  id of the user passed as a URI parameter
    
         *
         *  @apiSuccessExample {json} Success-Response:
         *  {
            "error": false,
            "message": "user details fetch successfully",
            "status": 200,
            "data": [
                        {
                            userId:"String",
                            firstName:"String",
                            lastName:"String",
                            password:"String",
                            email:"String",
                            countryCode:"String",
                            mobile:"String",
                            createdOn:"date",
                            createdBy:"String"
                        }
                    ]
                }
            }
        }
          @apiErrorExample {json} Error-Response:
         *
         * {
            "error": true,
            "message": "Failed to fetch user details",
            "status": 500,
            "data": null
           }
         */
   

}


