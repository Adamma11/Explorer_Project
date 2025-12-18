const mongoose = require('mongoose');
const EmploymentMasterSchema = mongoose.Schema({
    name:{type:String},
    address:{type:String},
    city:{type:String},
    source:{type:String},
    url:{type:String},
    verificationFee:{type:String},
    branch:{type:mongoose.Schema.Types.ObjectId,ref:'Branch'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()},
    concernperson:{type:String,required:true}, 
    designation:{type:String,required:true},
    modeofverification:{type:String,required:true}, 
    daysforverification:{type:String,required:true}, 
    email:{type:String,required:true},
    phone:{type:String,required:true}, 
})
module.exports = mongoose.model('EmploymentMaster',EmploymentMasterSchema)