const mongoose=require('mongoose')
const FollowupSchema = mongoose.Schema({
    leadOrProspect:{type:mongoose.Schema.Types.ObjectId,ref:'LeadOrProspect',required:true},
    followupDate:{type:Date,required:true},
    contactPerson:{type:String,required:true},
    designation:{type:String},
    notes:{type:String},
    modifiedBy:{type:mongoose.Schema.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})   
module.exports = mongoose.model("Followup",FollowupSchema);
