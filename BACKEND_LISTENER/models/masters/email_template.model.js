const mongoose =require('mongoose');
const EmailTemplateSchema = mongoose.Schema({
    name :{type:String,required:true},
    subject:{type:String},
    content:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
}
);
module.exports = mongoose.model("EmailTemplate",EmailTemplateSchema);
