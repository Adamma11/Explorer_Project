const mongoose = require('mongoose');
const RoleModuleAccessSchema = mongoose.Schema({
    role:{type:mongoose.Schema.Types.ObjectId,ref:'Role',required:true},
    applicationModule:{type:mongoose.Schema.Types.ObjectId,ref:'ApplicationModule',required:true},
    create:{type:Boolean,default:false},
    read:{type:Boolean,default:false},
    update:{type:Boolean,default:false},
    delete:{type:Boolean,default:false},    
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
});
module.exports = mongoose.model('RoleModuleAccess',RoleModuleAccessSchema);
