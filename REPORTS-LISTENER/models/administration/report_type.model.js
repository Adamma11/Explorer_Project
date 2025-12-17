const mongoose = require('mongoose');
const ReportTypeSchema = mongoose.Schema({
    type:{type:String,required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,defalut:Date.now}
})
module.exports = mongoose.model('ReportType',ReportTypeSchema);
