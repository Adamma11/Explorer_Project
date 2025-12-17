const mongoose = require('mongoose')
const PersonalDetailsDataSchema = mongoose.Schema({
case:{type:mongoose.Schema.Types.ObjectId,ref:'Case',required:true},
candidatename:{type:String},
fathername:{type:String},
gender:{type:String},
dateofbirth:{type:Date},
uniqueid:{type:String},
mobilename:{type:String},
empid:{type:String},
dateofjoining:{type:Date},
status:{type:String},
dataEntryComments:{type:String},
dataEntryCompletionDate:{type:Date},
inputqcComments:{type:String},
inputqcCompletionDate:{type:Date},
modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
modifiedOn:{type:Date,default:Date.now}
})
module.exports = mongoose.model('PersonalDetailsData',PersonalDetailsDataSchema);