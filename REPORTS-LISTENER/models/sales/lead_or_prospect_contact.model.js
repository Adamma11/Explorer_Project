const mongoose = require('mongoose')
const LeadOrProspectContactSchema = mongoose.Schema({
    name:{type:String,required:true},
    leadOrProspect:{type:mongoose.Schema.Types.ObjectId,ref:'LeadOrProspect'},
    department:{type:String},
    designation:{type:String},
    phone:{type:String},
    emailId:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
}) 
module.exports = mongoose.model("LeadOrProspectContact",LeadOrProspectContactSchema);