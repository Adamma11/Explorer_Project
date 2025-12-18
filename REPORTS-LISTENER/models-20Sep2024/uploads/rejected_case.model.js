const mongoose = require('mongoose')
const RejectedCaseSchema = mongoose.Schema({
    batch:{type:mongoose.Schema.Types.ObjectId,ref:'Batch',required:true},
    serialNumber:{type:Number,required:true},
    candidateName:{type:String,required:true},
    rejectionReason:{type:String},
    rejectionDate:{type:Date},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
RejectedCaseSchema.index({batch:1,serialNumber:1},{unique:true})
module.exports = mongoose.model('RejectedCase',RejectedCaseSchema);
