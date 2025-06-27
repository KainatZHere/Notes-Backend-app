const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String ,
        unique: true,
        require: true,
          match: [/^\S+$/, 'Username must not contain spaces.']
    
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})

const userModel = mongoose.model("users",userSchema )


module.exports = userModel