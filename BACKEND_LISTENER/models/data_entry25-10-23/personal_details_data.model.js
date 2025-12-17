const mongoose = require('mongoose')
const PersonalDetailsDataSchema = mongoose.Schema({
case:{type:mongoose.Schema.Types.ObjectId,ref:'Case',required:true},
name:{type:String},
fathername:{type:String},
dateofbirth:{type:Date},
number:{type:String},
emailid:{type:String},
employeeid:{type:String},
doj:{type:Date},
process:{type:String},
location:{type:String},
aadhernumber:{type:String},
pancard:{type:String},
status:{type:String},
dataEntryComments:{type:String},
dataEntryCompletionDate:{type:Date},
inputqcComments:{type:String},
inputqcCompletionDate:{type:Date},
modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
modifiedOn:{type:Date,default:Date.now}
})
module.exports = mongoose.model('PersonalDetailsData',PersonalDetailsDataSchema);