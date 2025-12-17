const mongoose = require('mongoose');
const VendorContractSchema = mongoose.Schema({
    vendor:{type:mongoose.Schema.Types.ObjectId,ref:'Vendor'},
    agreementDate:{type:Date},
    effectiveDate:{type:Date},
    expiryDate:{type:Date},
    addressPrices:[],
    educationPrices:[],
    employmentPrices:[],
    otherComponentPrices:[],
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports=mongoose.model('VendorContract',VendorContractSchema);
