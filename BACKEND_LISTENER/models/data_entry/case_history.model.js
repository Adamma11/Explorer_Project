const mongoose = require('mongoose')
const CaseHistorySchema = mongoose.Schema({
    case:{type:mongoose.Schema.Types.ObjectId,ref:'Case',required:true},
mov:{type:String},movRhs:{type:String},
comments:[],
colorType:{type:String},
    component:{type:mongoose.Schema.Types.ObjectId,ref:'Component'},
    check:{type:String},
    operation:{type:String},
    status:{type:String},	
    remarks:{type:String},
	 nextfollowupdate: { type: String },
    date:{type:Date},
   allocatedToVendor:{type:mongoose.Schema.Types.ObjectId,
ref:'Vendor'},
    allocatedToFe:{type:mongoose.Schema.Types.ObjectId,ref:'User'},	
    allocatedToVerifier:{type:mongoose.Schema.Types.ObjectId,ref:'User'},	
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})
module.exports = mongoose.model('CaseHistory',CaseHistorySchema);
