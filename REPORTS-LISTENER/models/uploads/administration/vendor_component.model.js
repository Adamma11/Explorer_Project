const mongoose = require('mongoose');
const VendorComponentSchema = mongoose.Schema({
    vendor:{type:mongoose.Schema.Types.ObjectId,ref:'Vendor',required:true},
    component:{type:mongoose.Schema.Types.ObjectId,ref:'Component',required:true},
    price:{type:Number},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
});
VendorComponentSchema.index({vendor:1,component:1},{unique:true});
module.exports = mongoose.model('VendorComponent',VendorComponentSchema);