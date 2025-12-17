const mongoose = require('mongoose')
const UserSubclientAccessSchema = mongoose.Schema({
    client:{type:mongoose.Schema.Types.ObjectId,ref:'Client',required:true},
    subclient:{type:mongoose.Schema.Types.ObjectId,ref:'Subclient',required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId},
    modifiedBy:{type:Date,default:Date.now}
})
module.exports = mongoose.model('UserSubclientAccess',UserSubclientAccessSchema);