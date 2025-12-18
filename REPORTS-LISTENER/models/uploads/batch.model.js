const mongoose = require('mongoose');
const BatchSchema = mongoose.Schema({
    batchId:{type:Number,required:true,unique:true},
    client:{type:mongoose.Schema.Types.ObjectId,ref:'Client'},
    subclient:{type:mongoose.Schema.Types.ObjectId,ref:'Subclient'},
    batchDescription:{type:String},
    numberOfCases:{type:Number},
    acceptedCases:{type:Number},
    rejectedCases:{type:Number},
    uploadDate:{type:Date,required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
module.exports = mongoose.model('Batch',BatchSchema);