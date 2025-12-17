const mongoose = require('mongoose')
const VoucherSchema = mongoose.Schema({
    meeting:{type:mongoose.Schema.Types.ObjectId,ref:'Meeting'},
    voucherNumber:{type:Number},
    voucherAmount:{type:Number},
    travelExpenses:[],
    hotelExpenses:[],
    localConveyanceExpenses:[],
    entertainmentExpenses:[],
    otherExpenses:[],
    status:{type:String},
    rejectionComments:{type:String},
    bde:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('Voucher',VoucherSchema);
