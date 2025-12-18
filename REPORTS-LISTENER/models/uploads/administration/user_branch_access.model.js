const mongoose = require('mongoose');
const UserBranchAccessSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    branch:{type:mongoose.Schema.Types.ObjectId,ref:'Branch'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('UserBranchAccess',UserBranchAccessSchema);