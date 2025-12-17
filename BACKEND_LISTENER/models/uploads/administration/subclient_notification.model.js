const mongoose = require('mongoose');
const SubclientNotificationSchema = mongoose.Schema({
    subclient:{type:mongoose.Schema.Types.ObjectId,ref:'Subclient'},
    triggerStatus:{type:String},
    triggerColor:{type:String},
    frequency:{type:String},
    template:{type:mongoose.Schema.Types.ObjectId,ref:'EmailTemplate'},	
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
})
module.exports = mongoose.model('SubclientNotification',SubclientNotificationSchema);
