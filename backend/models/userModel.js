const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user must have a name']
    },

    password:{
        type:String,
        required:[true,'user must have a password']
    }
})

module.exports = mongoose.model('User', userSchema)