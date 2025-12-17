const ClientAnalysisCode = require('../../models/administration/client_analysis_code.model')
const express = require('express');

exports.create = (req,res)=>{
  let clientAnalysisCode = new ClientAnalysisCode({
     client:req.body.client,
     analysisType:req.body.analysisType,
     analysisCode:req.body.analysisCode,
     modifiedBy:req.user.user_id,
     modifiedOn:new Date()
  })
  clientAnalysisCode
  .save(clientAnalysisCode)
  .then(async data=>{
   const clientAnalysisCodeData = await ClientAnalysisCode.findOne({_id: data._id})
   .populate('client')
     res.json(clientAnalysisCodeData)
  })
  .catch(err=>{
     res.status(500).json({
        message:"Error creting client analysis code"
     })
  })

}
exports.deleteAllForClient = (req,res)=>{
  ClientAnalysisCode
  .deleteMany({client:req.params.client})
  .then(data=>{
     res.json(data)
  })
  .catch(err=>{
     res.status(500).json({
             message:"Error deleting client analysis code"
     })
  })
}
exports.readForAClientAndType = (req,res)=>{
  ClientAnalysisCode
  .findOne({client:req.params.client,analysisType:req.params.analysisType})
  .then(data=>{
     res.json(data)
  })
  .catch(err=>{
     res.status(500).json({
             message:"Error getting analysis code for a client and analysis type"
     })

  })
}

