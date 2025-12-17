const mongoose = require('mongoose');
const ComponentAccessSchema = mongoose.Schema({
    component:{type:mongoose.Schema.Types.ObjectId,ref:'Component'},
    role:{type:mongoose.Schema.Types.ObjectId,ref:'Role'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
ComponentAccessSchema.index({ role: 1 });
module.exports = mongoose.model('ComponentAccess',ComponentAccessSchema);
