const mongoose = require('mongoose');
const SubclientSchema = mongoose.Schema({
    client:{type:mongoose.Schema.Types.ObjectId,ref:'Client',required:true},
    name:{type:String,required:true},
    status:{type:String,required:true},
    branch:{type:mongoose.Schema.Types.ObjectId,ref:'Branch'},
    cam:{type:mongoose.Schema.Types.ObjectId,ref:'User'},	
    contactPerson:{type:String},
    telephone:{type:String},
    email:{type:String},
    address:{type:String,required:true},
    pinCode:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Subclient',SubclientSchema);
