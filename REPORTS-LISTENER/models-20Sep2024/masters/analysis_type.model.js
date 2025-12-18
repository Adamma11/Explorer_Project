const mongoose = require('mongoose')
const AnalysisTypeSchema = mongoose.Schema({
    name:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('AnalysisType',AnalysisTypeSchema)
