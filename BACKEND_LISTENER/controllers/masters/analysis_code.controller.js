const AnalysisCode = require('../../models/masters/analysis_code.model')
const express = require('express');
exports.create = (req,res)=>{
   if(!req.body.analysisType){
     res.status(400).json({message:"Analysis Type Cannot be empty"})
   }
   if(!req.body.name){
      res.status(400).json({message:"Name Cannot be empty"});
   }
   let analysisCode = new AnalysisCode({
       analysisType:req.body.analysisType,
       name:req.body.name,
       modifiedBy:req.user.user_id,
       modifiedOn:new Date()
   })
   analysisCode
   .save(analysisCode)
   .then(data=>{
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:"Error saving analysis code"
       })
   })
}
exports.update = (req,res)=>{
  if(!req.body.name){
     res.status(400).json({message:"Name Cannot be empty"})
  }
  AnalysisCode
  .findOneAndUpdate({analysisType:req.params.analysisType,_id:req.params._id},{name:req.body.name})
  .then(data=>{
     res.json(data)
  })
  .catch(err=>{
     res.status(500).json({
        message:"Error Saving Analysis Code"
     })
  })
}
exports.read = (req,res)=>{
  console.log("About to read analysis code",req.params._id)
  AnalysisCode
  .findOne({analysisType:req.params.analysisType,_id:req.params._id})
  .then(data=>{
     res.json(data)
  })
  .catch(err=>{
     res.status(500).json({
        message:"Error reading Analysis Code"
     })
  })
}
exports.readAll = (req,res)=>{
  AnalysisCode
  .find({analysisType:req.params.analysisType})
  .populate({path:'analysisType'})
  .then(data=>{
     res.json(data)
  })
  .catch(err=>{
     res.status(500).json({
        message:"Error reading Analysis Types"
     })
  })
}
exports.delete = (req,res)=>{
   AnalysisCode
   .findOneAndDelete({analysisType:req.params.analysisType,_id:req.params._id})
   .then(data=>{
      res.json(data)
   })
   .catch(err=>{
      res.status(500).json({
        message:"Error Deleting Analysis Code"
      })
   })
}

