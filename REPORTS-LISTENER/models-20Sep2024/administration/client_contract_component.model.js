const mongoose = require('mongoose');
const ClientContractComponentSchema = mongoose.Schema({
    clientContract:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContract',required:true},
    component:{type:mongoose.Schema.Types.ObjectId,ref:'Component',required:true},
    tat:{type:Number},
    price:{type:Number},
    verbalPrice:{type:Number},
    onlinePrice:{type:Number},
    pvPrice:{type:Number},
    reimbursementAllowed:{type:Boolean},
    reimbursementPrice:{type:Number},
    closureModesAllowed:{type:String},
    interimClosureAllowed:{type:Boolean},
    scopeOfWork:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
ClientContractComponentSchema.index({clientContract:1,component:1},{unique:true});
module.exports = mongoose.model('ClientContractComponent',ClientContractComponentSchema);