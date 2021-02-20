var mongoose = require("mongoose")
Schema = mongoose.Schema


let userSchema = new Schema(
    {
        userId: {
            type: String,
            default: "",
            unique: true
        },

        firstName: {
            type: String,
            default: ""
        },
        lastName: {
            type: String,
            default: ""
        },
        email:
        {
            type: String,
            default: ""
        },
        countryCode: {
            type: String,
            default: ""
        },
        mobileNumber:
        {
            type: String,
            default: ""
        },
        password:
        {
            type: String,
            default: ""
        },
        createdBy:
        {
            type: String,
            default: ""
        },
        createdOn:
        {
            type: Date,
            default: ""
        }



    }
)



mongoose.model("user", userSchema)