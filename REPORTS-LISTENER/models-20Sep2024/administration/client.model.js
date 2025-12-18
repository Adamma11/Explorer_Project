const mongoose = require('mongoose');
const ClientSchema = mongoose.Schema({
    name:{type:String,required:true,unique:true},
    clientCode:{type:String},	
    status:{type:String,required:true},
    contactPerson:{type:String},
    telephone:{type:String},
    email:{type:String},
    address:{type:String,required:true},
    pinCode:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    cin:{type:String},
    gstin:{type:String},
    pan:{type:String},
    pfNumber:{type:String},
    domainName:{type:String},
    colorCodes:[],
    reportTypes:[],
    priority:{type:Number},
    archiveAfter:{type:Number},
    uploadTypes:[],
    closureTypesAllowed:[],
    closureModesAllowed:[],
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}        
})
module.exports = mongoose.model('Client',ClientSchema);
