const mongoose = require('mongoose');
const ClientAnalysisCodeSchema  = mongoose.Schema({
    client:{type:mongoose.Schema.Types.ObjectId,ref:'Client'},
    analysisType:{type:mongoose.Schema.Types.ObjectId,ref:'AnalysisType'},
    analysisCode:{type:mongoose.Schema.Types.ObjectId,ref:'AnalysisCode'},
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    modifiedOn:{type:Date,required:true,default:Date.now}
});
module.exports = mongoose.model('ClientAnalysisCode',ClientAnalysisCodeSchema)
