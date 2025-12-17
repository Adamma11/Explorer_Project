const mongoose = require('mongoose');
const ComponentFieldSchema = mongoose.Schema({
    component:{type:mongoose.Schema.Types.ObjectId,ref:'Component',required:true},
    name:{type:String,required:true},
    type:{type:String,required:true},
    size:{type:Number},
    values:{type:String},
    mandatory:{type:String},
    lhsRhs:{type:String},
    conditionField:{type:String},
    condition:{type:String},
    conditionValue:{type:String},
    label:{type:String,required:true},
    fieldNumber:{type:Number},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
})

module.exports = mongoose.model('ComponentField',ComponentFieldSchema);