const mongoose = require('mongoose')
const RequestforPaymentEducationSchema = mongoose.Schema({
    case:{type:mongoose.Schema.Types.ObjectId,ref:'Case'},
    componentName:{type:String},
    componentType:{type:String},
    componentDisplayName:{type:String},
    componentId:{type:String},
    inFavourOf:{type:String},
    modeOfPayment:{type:String},
    amount:{type:String},
    requestDate:{type:Date},
    status:{type:String},
    paymentReferenceNumber:String,
    requestCompletionDate:{type:Date},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('RequestforPaymentEducation',RequestforPaymentEducationSchema);