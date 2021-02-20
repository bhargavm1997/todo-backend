var mongoose = require("mongoose")
Schema = mongoose.Schema


let taskHistorySchema = new Schema(
    {
        taskHistoryId: {
            type: String,
            default: "",
            unique: true
        },
        taskId:{
            type:Schema.Types.ObjectId,
            ref: "Task"
        },
        action: {
            type: String,
            default: ""
        },
        updatedBy:
        {
            type: String,
            default: ""
        },
        updatedOn:
        {
            type: Date,
            default: ""
        }



    }
)



mongoose.model("taskhistory", taskHistorySchema)