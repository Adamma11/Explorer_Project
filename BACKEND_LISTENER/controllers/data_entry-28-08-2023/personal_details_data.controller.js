const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const express = require('express');

exports.create=(req,res)=>{
   if(!req.body.case){
       res.status(400).json({message:"Case required"})
   }
   if(!req.body.candidatename){
       res.status(400).json({message:"Candidate Name required"})
   }
   if(!req.body.fathername){
       res.status(400).json({message:"Father's Name required"})
   }
   if(!req.body.gender){
       res.status(400).json({message:"Gender required"})
   }
   if(!req.body.dateofbirth){
       res.status(400).json({message:"Date of Birth required"})
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   const personalDetailsData = new PersonalDetailsData({
   case:req.body.case,
       candidatename:req.body.candidatename,
       fathername:req.body.fathername,
       gender:req.body.gender,
       dateofbirth:req.body.dateofbirth,
       uniqueid:req.body.uniqueid,
       empid:req.body.empid,
       dateofjoining:req.body.dateofjoining,
       processname:req.body.processname,
       locationname:req.body.locationname,
       modifiedBy:req.user.user_id,
       status:req.body.dataEntryStatus,
   });
       if(req.body.status == 'DE-COMPLETED'){
           personalDetailsData.dataEntryCompletionDate = new Date()
       }else{
           personalDetailsData.insufficiencyComments = req.body.insufficiencyComments
       }
   personalDetailsData
   .save(personalDetailsData)
   .then(data=>{
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while saving Personal Details Data'
       })
   })
};
exports.findAllForACase=(req,res)=>{

 PersonalDetailsData
 .find({case:req.params.case})
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving Personal Details Data for cases'
       })
   })
};
exports.update=(req,res)=>{
   if(!req.body.case){
       res.status(400).json({message:"Case required"})
   }
   if(!req.body.candidatename){
       res.status(400).json({message:"Candidate Name required"})
   }
   if(!req.body.fathername){
       res.status(400).json({message:"Father's Name required"})
   }
   if(!req.body.gender){
       res.status(400).json({message:"Gender required"})
   }
   if(!req.body.dateofbirth){
       res.status(400).json({message:"Date of Birth required"})
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   PersonalDetailsData.findOneAndUpdate({_id:req.params._id},{
   case:req.body.case,
       candidatename:req.body.candidatename,
       fathername:req.body.fathername,
       gender:req.body.gender,
       dateofbirth:req.body.dateofbirth,
       uniqueid:req.body.uniqueid,
       empid:req.body.empid,
       dateofjoining:req.body.dateofjoining,
       processname:req.body.processname,
       locationname:req.body.locationname,
       status:req.body.status,
       insufficiencyComments:req.body.insufficiencyComments,
       dataEntryCompletionDate:req.body.status == 'DE-COMPLETED' ? new Date() : null,
       modifiedBy:req.user.user_id,
   })
   .then(data=>{
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while saving Personal Details Data'
       })
   })
};
exports.findOne=(req,res)=>{
   PersonalDetailsData.findOne({case:req.params.case_id})
   .then(data=>{
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
           message: err.message || 'Error occurred while reading personal details'
       })
   })
};
exports.updateDataEntryStatus=(req,res)=>{
 if(req.body.status=='DE-COMPLETED'){
   PersonalDetailsData.findOneAndUpdate({_id:req.params.case_id},{
       status:req.body.status,
       dataEntryCompletionDate:new Date(),
       modifiedBy:req.user.user_id,
   })
   .then(data=>{
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while saving Personal Details Data'
       })
   })
 }else{
   PersonalDetailsData.findOneAndUpdate({_id:req.params.case_id},{
   status:req.body.status,
   insfficiencyComments:req.body.insufficiencyComments
   })
   .then(data=>{
        res.json(data)
    })
    .catch(err=>{
         res.status(500).json({
             message:err.message | "Error occurred while updating status during data entry"
         })
    })
 }
};
exports.updateInputqcStatus=(req,res)=>{
 if(req.body.status=='INPUTQC-ACCEPTED'){
   PersonalDetailsData.findOneAndUpdate({case:req.params.case_id},{
       status:req.body.status,
       inputqcCompletionDate:new Date(),
       modifiedBy:req.user.user_id,
   })
   .then(data=>{
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while saving Personal Details Data'
       })
   })
 }else{
   PersonalDetailsData.findOneAndUpdate({case:req.params.case_id},{
       status:req.body.status,
       inputqcComments:req.body.inputqcComments,
       modifiedBy:req.user.user_id
   })
   .then(data=>{
        res.json(data)
    })
    .catch(err=>{
         res.status(500).json({
             message:err.message | "Error occurred while updating status during data entry"
         })
    })
 }
};
