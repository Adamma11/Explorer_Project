const mongoose =require('mongoose');
const BranchSchema = mongoose.Schema({
    name :{type:String,required:true,unique:true},
    address:{type:String,required:true},
    pinCode:{type:String,required:true},
    district :{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    includedPinRanges:[],
    excludedPinRanges:[],
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
}
);
module.exports = mongoose.model("Branch",BranchSchema);