const mongoose = require('mongoose');
const ClientContractPackageSchema = mongoose.Schema({
    clientContract:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContract',required:true},
    name:{type:String,required:true},
    tat:{type:Number},
    price:{type:Number,required:true},
    clientContractPackageComponents:[],
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
});
module.exports = mongoose.model('ClientContractPackage',ClientContractPackageSchema);
