const mongoose = require('mongoose');
const VendorSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    branch:{type:mongoose.Schema.Types.ObjectId,ref:'Branch',required:true},
    status:{type:String,required:true},
    gstin:{type:String},
    contactPerson:{type:String},
    telephone:{type:String},
    email:{type:String},
    address:{type:String,required:true},
    pinCode:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    includedPinRanges:[],
    excludedPinRanges:[],
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
module.exports = mongoose.model('Vendor',VendorSchema);

