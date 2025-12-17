const AnalysisType = require('../../models/masters/analysis_type.model')
const express = require('express');
exports.create = (req,res)=>{
   if(!req.body.name){
      res.status(400).json({message:"Name Cannot be empty"});
   }
   let analysisType = new AnalysisType({
       name:req.body.name,
       modifiedBy:req.user.user_id,
       modifiedOn:new Date()
   })
   analysisType
   .save(analysisType)
   .then(data=>{
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:"Error saving analysis type"
       })
   })
}
exports.update = (req,res)=>{
  if(!req.body.name){
     res.status(400).json({message:"Name Cannot be empty"})
  }
  AnalysisType
  .findOneAndUpdate({_id:req.params._id},{name:req.body.name})
  .then(data=>{
     res.json(data)
  })
  .catch(err=>{
     res.status(500).json({
        message:"Error Saving Analysis Type"
     })
  })
}
exports.read = (req,res)=>{
  console.log("About to read analysis type",req.params._id)
  AnalysisType
  .findOne({_id:req.params._id})
  .then(data=>{
     res.json(data)
  })
  .catch(err=>{
     res.status(500).json({
        message:"Error reading Analysis Type"
     })
  })
}
exports.readAll = (req,res)=>{
  AnalysisType
  .find()
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
   AnalysisType
   .findOneAndDelete({_id:req.params._id})
   .then(data=>{
      res.json(data)
   })
   .catch(err=>{
      res.status(500).json({
        message:"Error Deleting Analysis Type"
      })
   })
}

