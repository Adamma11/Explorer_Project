const mongoose = require('mongoose');
const ModuleSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId},
    modifiedOn:{type:Date,required:true,default:Date.now}
});
module.exports=mongoose.model('Module',ModuleSchema);
