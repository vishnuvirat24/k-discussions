const mongoose = require("mongoose")


const discussionSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"A discussion must have a title"],
            unique:true,
            trim:true
        },
        description:{
            type:String,
            required:[true,"A discussion must have a description"],
            trim:true
        },
        name:{
            type:String,
            required:[true,'A discussion must have an author name'],
            trim:true
        },
        replies:[{
            reply:String,
            replier:String
        }],

        createdAt :{
            type: Date,
            default:Date.now()
        }
    }
)

const Discussion = mongoose.model('Discussion', discussionSchema)

module.exports = Discussion