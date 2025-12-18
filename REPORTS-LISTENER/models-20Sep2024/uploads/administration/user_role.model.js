const mongoose  = require('mongoose');
const UserRoleSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    role:{type:mongoose.Schema.Types.ObjectId,ref:'Role',required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
})
module.exports = mongoose.model('UserRole',UserRoleSchema);
