const mongoose = require("mongoose")
const { Schema }= mongoose

//   creating a schema for new user
const UserSchema = new Schema({
    name:{
        type:String,
        Requied:true,
    },
    Email:{
        type:String,
        Requied:true,
        unique:true
    },
    Password:{
        type:String,
        Requied:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model('user',UserSchema)

module.exports =User