const mongoose = require('mongoose')
const CourierDetailsEducationSchema = mongoose.Schema({
    case:{type:mongoose.Schema.Types.ObjectId,ref:'Case'},
mov:{type:String},movRhs:{type:String},
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
module.exports = mongoose.model('CourierDetailsEducation',CourierDetailsEducationSchema);
