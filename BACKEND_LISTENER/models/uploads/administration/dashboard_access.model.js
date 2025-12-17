const mongoose = require('mongoose')
const DashboardAccessSchema = mongoose.Schema({
    role:{type:mongoose.Schema.Types.ObjectId,ref:'Role'},
    dashboard:{type:mongoose.Schema.Types.ObjectId,ref:'Dashboard'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('DashboardAccess',DashboardAccessSchema);
