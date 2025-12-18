const mongoose = require('mongoose');
const ClientContractPackageComponentSchema = mongoose.Schema({
    clientContractPackage:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContractPackage',required:true},
    clientComponent:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContractComponent',required:true},
    description:{type:String},
    maxChecks:{type:Number},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
});
ClientContractPackageComponentSchema.index({clientContractPackage:1,clientComponent:1},{unique:true});
module.exports = mongoose.model('ClientContractPackageComponent',ClientContractPackageComponentSchema);