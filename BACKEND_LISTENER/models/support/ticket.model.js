const mongoose=require('mongoose')
const TicketSchema = mongoose.Schema({
    ticketNumber:{type:String,required:true},
    client:{type:mongoose.Schema.Types.ObjectId,ref:'Client',required:true},
    subclient:{type:mongoose.Schema.Types.ObjectId,ref:'Subclient',required:true},
    raisedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    raisedOn:{type:Date,default:Date.now()},
    subject:{type:String},
    message:{type:String},
    status:{type:String},
    closureDate:{type:Date},
    closedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('Ticket',TicketSchema);
