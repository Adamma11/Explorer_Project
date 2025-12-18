const mongoose = require('mongoose');
const PersonalDetailsSchema = mongoose.Schema({
    displayName:{type:String,required:true,unique:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}    
})
module.exports = mongoose.model('PersonalDetails',PersonalDetailsSchema);