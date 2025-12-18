const mongoose=require('mongoose')
const MeetingSchema = mongoose.Schema({
    leadOrProspect:{type:mongoose.Schema.Types.ObjectId,ref:'LeadOrProspect',required:true},
    meetingDate:{type:Date,required:true},
    venue:{type:String},
    verifactsAttendees:{type:String},
    clientAttendees:{type:String},
    preparedBy:{type:String},
    discussionPoints:[],
    status:{type:String},
    rejectionComments:{type:String},
    bde:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model("Meeting",MeetingSchema);