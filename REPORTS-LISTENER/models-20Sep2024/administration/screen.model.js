const mongoose = require('mongoose');
const ScreenSchema = mongoose.Schema({
    code:{type:String,unique:true},
    name:{type:String,unique:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,'ref':'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports=mongoose.model('Screen',ScreenSchema);