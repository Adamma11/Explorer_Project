const mongoose = require('mongoose')
const CourierDetailsEmploymentSchema = mongoose.Schema({
    case:{type:mongoose.Schema.Types.ObjectId,ref:'Case'},
comments:[],
colorType:{type:String},
    componentName:{type:String},
    componentId:{type:String},
    courierName:{type:String},
    awbNumber:{type:String},
    courierDate:{type:Date},
    status:{type:String},
   modifiedBy:{type:mongoose.Schema.Types.ObjectId,
ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('CourierDetailsEmployment',CourierDetailsEmploymentSchema);