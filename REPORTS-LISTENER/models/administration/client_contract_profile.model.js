const mongoose = require('mongoose');
const ClientContractProfileSchema = mongoose.Schema({
    clientContract:{type:mongoose.Schema.Types.ObjectId,ref:'ClientContract',required:true},
    name:{type:String,required:true},
    clientContractProfileComponents:[],    
    tat:{type:Number},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
});
module.exports = mongoose.model('ClientContractProfile',ClientContractProfileSchema);