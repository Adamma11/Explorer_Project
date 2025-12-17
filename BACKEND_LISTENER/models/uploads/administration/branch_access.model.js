const mongoose = require('mongoose');
const BranchAccessSchema = mongoose.Schema({
    branch:{type:mongoose.Schema.Types.ObjectId,ref:'Branch'},
    role:{type:mongoose.Schema.Types.ObjectId,ref:'Role'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('BranchAccess',BranchAccessSchema);