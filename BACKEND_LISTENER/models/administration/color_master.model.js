const mongoose = require('mongoose');
const ColorMasterSchema = mongoose.Schema({
    colorCode:{type:String,unique:true},
    name:{type:String,unique:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
module.exports = mongoose.model('ColorMaster',ColorMasterSchema);