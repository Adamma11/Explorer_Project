const mongoose = require('mongoose');
const ClientContractPackageIncentiveSlabSchema = mongoose.Schema({
    clientContractPackage:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContractPackage'},
    serialNumber:{type:Number,required:true},
    from:{type:Number,required:true},
    to:{type:Number,required:true},
    incentive:{type:Number,required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}    
});
ClientContractPackageIncentiveSlabSchema.index({clientContractPackage:1,serialNumber:1},{unique:true});
module.exports = mongoose.model('ClientContractPackageIncentiveSlab',ClientContractPackageIcentiveSlabSchema);