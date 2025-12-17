const mongoose = require('mongoose')
const UserVendorAccessSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    vendor:{type:mongoose.Schema.Types.ObjectId,ref:'Vendor',required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
module.exports = mongoose.model('UserVendorAccess',UserVendorAccessSchema)