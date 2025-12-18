const mongoose = require('mongoose');
const RoleSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
});
module.exports = mongoose.model('Role',RoleSchema);