const mongoose = require('mongoose');
const ScreenAccessSchema = mongoose.Schema({
    role:{type:mongoose.Schema.Types.ObjectId,ref:'Role'},
    screen:{type:mongoose.Schema.Types.ObjectId,ref:'Screen'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
})
module.exports = mongoose.model('ScreenAccess',ScreenAccessSchema);
