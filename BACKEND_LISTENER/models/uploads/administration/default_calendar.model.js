const mongoose = require('mongoose');
const DefaultCalendarSchema = mongoose.Schema({
    date:{type:Date},
    description:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOne:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('DefaultCalendar',DefaultCalendarSchema);
