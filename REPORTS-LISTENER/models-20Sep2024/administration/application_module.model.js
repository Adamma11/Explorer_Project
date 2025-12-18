const mongoose = require('mongoose');
const ApplicationModuleSchema = mongoose.Schema({
    name:{type:String,required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
});
module.exports = mongoose.model('ApplicationModule',ApplicationModuleSchema);