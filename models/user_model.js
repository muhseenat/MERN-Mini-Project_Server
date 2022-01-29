const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String},
        
    }
)

const model = mongoose.model('UserData',userSchema)

module.exports= model