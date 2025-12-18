const mongoose  = require('mongoose');
const UserSchema = mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    status:{type:String,required:true},
    branch:{type:mongoose.Schema.Types.ObjectId,ref:'Branch'},
    reportingManager:{type:mongoose.Schema.ObjectId,ref:'User'},
    type:{type:String,required:true},
    includedPinRanges:[],
    excludedPinRanges:[],
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now},
});
UserSchema.index({userId:1},{unique:true});
module.exports = mongoose.model('User',UserSchema);