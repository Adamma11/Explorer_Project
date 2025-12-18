const mongoose = require('mongoose');
const ClientContractSchema = mongoose.Schema({
    client:{type:mongoose.Schema.Types.ObjectId,ref:'Client',required:true},
    agreementDate:{type:Date,required:true},
    effectiveDate:{type:Date,required:true},
    expiryDate:{type:Date,required:true},
    retentationDate:{type:Date},	
    penaltySlabs:[],
    incentiveSlabs:[],
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
ClientContractSchema.index({client:1,agreementDate:1},{unique:true});
module.exports = mongoose.model('ClientContract',ClientContractSchema);
