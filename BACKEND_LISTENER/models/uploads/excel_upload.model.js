const mongoose = require('mongoose');
const ExcelUploadSchema = mongoose.Schema({
    referenceNumber:{type:Number,required:true,uniquie:true},
    client:{type:mongoose.Schema.Types.ObjectId,ref:'Client',required:true},
    subclient:{type:mongoose.Schema.Types.ObjectId,ref:'Subclient',required:true},
    package:{type:mongoose.Schema.Types.ObjectId,ref:'Package'},
    profile:{type:mongoose.Schema.Types.ObjectId,ref:'Profile'},
    componentsToCheck:[],
    uploadDate:{type:Date},
    status:{type:String,default:'OPEN'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.nw}
})
module.exports = mongoose.model('ExcelUpload',ExcelUploadSchema);
