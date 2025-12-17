const mongoose =require('mongoose');
const StandardVerbiageSchema = mongoose.Schema({
    comment :{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
}
);
module.exports = mongoose.model("StandardVerbiage",StandardVerbiageSchema);