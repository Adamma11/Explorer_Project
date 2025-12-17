const mongoose = require('mongoose');
const ClientHolidaySchema = mongoose.Schema({
    client:{type:String,required:true},
    date:{type:Date,required:true},
    description:{type:String,required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
ClientHolidaySchema.index({client:1,date:1},{unique:true});
module.exports = mongoose.model('ClientHoliday',ClientHolidaySchema);