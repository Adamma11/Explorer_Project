const mongoose = require('mongoose');
const ClientContractProfileComponentSchema = mongoose.Schema({
    clientContractProfile:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContractProfile',required:true},
    clientContractComponent:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContractComponent',required:true},
    description:{type:String},
    maxChecks:{type:Number},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
});
ClientContractProfileComponentSchema.index({clientContractProfile:1,clientContractComponent:1},{unique:true});
module.exports = mongoose.model('ClientContractProfileComponent',ClientContractProfileComponentSchema);