const mongoose= require('mongoose');
const DashboardSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId},
    modifiedOn:{type:Date,required:true,default:Date.now}
});
DashboardSchema.index({name:1},{unique:true});
module.exports = mongoose.model('Dashboard',DashboardSchema);