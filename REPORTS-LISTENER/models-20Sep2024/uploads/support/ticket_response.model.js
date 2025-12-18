const mongoose=require('mongoose')
const TicketResponseSchema = mongoose.Schema({
    ticket:{type:mongoose.Schema.Types.ObjectId,ref:'Ticket'},
    response:{type:String},
    responseDate:{type:Date},
    responseBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})
module.exports = mongoose.model('TicketResponse',TicketResponseSchema)
