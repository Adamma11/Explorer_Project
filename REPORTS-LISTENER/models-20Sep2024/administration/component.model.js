const mongoose = require('mongoose');
const ComponentSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    displayName:{type:String,required:true},
    fileUploadRequired:{type:Boolean,default:false},
    allowCopyingFrom:{type:mongoose.Schema.Types.ObjectId,ref:'Component'},
    type:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}    
})
module.exports = mongoose.model('Component',ComponentSchema);
