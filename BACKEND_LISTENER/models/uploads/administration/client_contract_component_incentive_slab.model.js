const mongoose = require('mongoose');
const ClientContractComponentIncentiveSlabSchema = mongoose.Schema({
    clientContractComponent:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContractComponent',required:true},
    serialNumber:{type:Number,unique:true},
    from:{type:Number,required:true},
    to:{type:Number,required:true},
    penalty:{type:Number,required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
ClientContractComponentIncentiveSlabSchema.index({clientContractComponent:1,serialNumber:1},{unique:true});
module.exports = mongoose.model('ClientContractComponentIncentiveSlab',ClientContractComponentIncentiveSlabSchema);