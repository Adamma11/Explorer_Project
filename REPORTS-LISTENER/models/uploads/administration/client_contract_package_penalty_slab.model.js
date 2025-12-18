const mongoose = require('mongoose');
const ClientContractPackagePenaltySlabSchema = mongoose.Schema({
    clientContractPackage:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContractPackage'},
    serialNumber:{type:Number,required:true},
    from:{type:Number,required:true},
    to:{type:Number,required:true},
    penalty:{type:Number,required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}    
});
ClientContractPackagePenaltySlabSchema.index({clientContractPackage:1,serialNumber:1},{unique:true});
module.exports = mongoose.model('ClientContractPackagePenaltySlab',ClientContractPackagePenaltySlabSchema);