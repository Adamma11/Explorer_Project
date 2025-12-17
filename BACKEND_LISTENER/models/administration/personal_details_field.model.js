const mongoose = require('mongoose');
const PersonalDetailsFieldSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    type:{type:String,required:true},
    size:{type:Number},
    values:{type:String},
    mandatory:{type:Boolean,default:true},
    label:{type:String,required:true},
    fieldNumber:{type:Number},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
})
module.exports = mongoose.model('PersonalDetailsField',PersonalDetailsFieldSchema);