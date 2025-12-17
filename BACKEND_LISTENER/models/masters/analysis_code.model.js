const mongoose = require('mongoose')
const AnalysisCodeSchema = mongoose.Schema({
    analysisType:{type:mongoose.Schema.Types.ObjectId,ref:'AnalysisType'},
    name:{type:String},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,default:Date.now()}
})
module.exports = mongoose.model('AnalysisCode',AnalysisCodeSchema)
