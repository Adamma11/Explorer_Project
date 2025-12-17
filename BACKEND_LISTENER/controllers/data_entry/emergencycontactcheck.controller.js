const emergencycontactcheck = require('../../models/data_entry/emergencycontactcheck.model')
const express = require('express');
const fileUpload = require('express-fileupload');
const mime = require('mime');
const fs = require('fs');
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')


const Case = require('../../models/uploads/case.model')
const caseHistory = require('../data_entry/case_history.controller')
const Subclient = require('../../models/administration/subclient.model')
const UserSubclientAccess = require('../../models/administration/user_subclient_access.model')
const mailSend = require('../mails/send_mail.controller')
const mongoose = require("mongoose")
const User = require("../../models/administration/user.model")
const CheckHistory  = require('../../models/administration/checkHistory.model');

exports.create=async(req,res)=>{
if(!req.body.case){
   res.status(400).json({message:"Case Id is Mandatory"})
}
const caseObj = await Case.findOne({_id: req.body.case})
let numComponents = Number(caseObj.actualComponents.length)
numComponents++
const checkId = `${caseObj.caseId}-${numComponents}`
   if(!req.body.emergencycontactnumberone){
       res.status(400).json({message:'Emergency Contact Number 1 required'})
   }
   if(!req.body.relationshipemergencycontactnumberone){
       res.status(400).json({message:'Relationship (Emergency Contact Number 1) required'})
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   const obj = new emergencycontactcheck({
   case:req.body.case,
  personalDetailsData:req.body.personalDetails,
  checkId: checkId,
   component:req.body.component ==null ? "645df603da4885b59f88fc97":req.body.component,
       emergencycontactnumberone:req.body.emergencycontactnumberone,
       emergencycontactnumberoneRhs:null,
       relationshipemergencycontactnumberone:req.body.relationshipemergencycontactnumberone,
       relationshipemergencycontactnumberoneRhs:null,
       emergencycontactnumbertwo:req.body.emergencycontactnumbertwo,
       emergencycontactnumbertwoRhs:null,
       relationshipemergencycontactnumbertwo:req.body.relationshipemergencycontactnumbertwo,
       relationshipemergencycontactnumbertwoRhs:null,
       dateofcontact:req.body.dateofcontact,
       dateofcontactRhs:null,
       verifiedon:req.body.verifiedon,
       verifiedonRhs:null,
       remarks:req.body.remarks,
       remarksRhs:null,
       datasource:req.body.datasource,
       datasourceRhs:null,
       modeofverification:req.body.modeofverification,
       modeofverificationRhs:null,
       status:req.body.status,
       modifiedBy:req.user.user_id
   });
       if(req.body.status == 'DE-COMPLETED'){
           obj.dataEntryCompletionDate = new Date()
       }else{
           obj.insufficiencyComments = req.body.insufficiencyComments
       }
   obj
   .save(obj)
   .then(data=>{
       caseHistory.create(req.body.case,req.body.component,data._id,'Creating a Check','DE-COMPLETED','Check Created',null,null,null,req.user.user_id)
       Case
       .findOne({_id:req.body.case})
       .then(caseData=>{
           let checksEntered = 0
           if(caseData.numberOfChecksEntered != null){
              checksEntered = caseData.numberOfChecksEntered
           }
           checksEntered = checksEntered + 1
           Case
           .findOneAndUpdate({_id:req.body.case},{numberOfChecksEntered:checksEntered})
           .then(caseUpdateData=>{
           })
           .catch(caseUpdateErr=>{
           })
   })
   .catch(caseErr=>{
        console.log("Error in saving case",caseErr)
   })
   Case
   .update({_id:req.body.case},{$push:{actualComponents:"emergencycontactcheck"}})
   .then(data=>{
       console.log("Updated the case ",data)
   })
   .catch(err=>{
      console.log("Error updating case ",data.caseId)
   })
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while saving emergencycontactcheck'
       })
   })
};
exports.findAllForACase=(req,res)=>{

 emergencycontactcheck
 .find({case:req.params.case})
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving emergencycontactcheck for cases'
       })
   })
};
exports.uploadFile=(req,res)=>{

   let componentFile = req.files.componentFile;
   componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/candidatedocs/' + req.body.fileName + '.pdf',function(err){
       if(err){
           res.status(500).send({message:"Error uploading the file"});
       }
       res.json({message:"File uploaded"});
   });
};
exports.uploadProofOfWork=(req,res)=>{

   let componentFile = req.files.componentFile;
   componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/proofofwork/' + req.body.fileName + '.pdf',function(err){
       if(err){
           res.status(500).send({message:"Error uploading the file"});
       }
       res.json({message:"File uploaded"});
   });
};
exports.uploadPaymentProof=(req,res)=>{

   let componentFile = req.files.componentFile;
   componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/paymentproof/' + req.body.fileName + '.pdf',function(err){
       if(err){
           res.status(500).send({message:"Error uploading the file"});
       }
       res.json({message:"File uploaded"});
   });
};
exports.deleteFile=(req,res)=>{

   fs.unlink('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/candidatedocs/' + req.body.fileName + '.pdf',function(err){
       if(err){
           res.status(500).send({message:"Error deleting the file"});
       }
       res.json({message:"File Deleted"});
   });
};
exports.downloadFile=(req,res)=>{

   let file = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/candidatedocs/' + req.query.fileName + '.pdf';
   res.download(file);
};
exports.downloadProofOfWork=(req,res)=>{

   let file = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/proofofwork/' + req.query.fileName + '.pdf';
   res.download(file);
};
exports.downloadPaymentProof=(req,res)=>{

   let file = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/paymentproof/' + req.query.fileName + '.pdf';
   res.download(file);
};
exports.uploadPvProofOfWork=(req,res)=>{

   let componentFile = req.files.componentFile;
   componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/pvproofofwork/' + req.body.fileName + '.pdf',function(err){
       if(err){
           res.status(500).send({message:"Error uploading the file"});
       }
       res.json({message:"File uploaded"});
   });
};
exports.update=(req,res)=>{
if(!req.body._id){
   res.status(400).json({message:"Id cannot be empty"})
}
if(!req.body.case){
   res.status(400).json({message:"Case Id is Mandatory"})
}
   if(!req.body.emergencycontactnumberone){
   }
   if(!req.body.relationshipemergencycontactnumberone){
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       emergencycontactnumberone:req.body.emergencycontactnumberone,
       relationshipemergencycontactnumberone:req.body.relationshipemergencycontactnumberone,
       emergencycontactnumbertwo:req.body.emergencycontactnumbertwo,
       relationshipemergencycontactnumbertwo:req.body.relationshipemergencycontactnumbertwo,
       dateofcontact:req.body.dateofcontact,
       verifiedon:req.body.verifiedon,
       remarks:req.body.remarks,
       datasource:req.body.datasource,
       modeofverification:req.body.modeofverification,
   status:req.body.status,
   insufficiencyComments:req.body.insufficiencyComments,
   dataEntryCompletionDate:req.body.status == 'DE-COMPLETED' ? new Date() : null,
   modifiedBy:req.user.user_id
   })
   .then(data=>{
              caseHistory.create(req.params.caseId,req.body.component,data._id,'Updating Check',req.body.status,'Check Created',null,null,null,req.user.user_id)
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while saving emergencycontactcheck'
       })
   })
};
exports.findOne=(req,res)=>{
   emergencycontactcheck.findOne({case:req.params.caseId,_id:req.params.componentId})
    .then(data=>{
         res.json(data)
     })
    .catch(err=>{
         res.json({
             message:err.message || 'Some error occurred while reading a component'
         })
     })
};
exports.updateDataEntryStatus=(req,res)=>{
 if(req.body.status=='DE-COMPLETED'){
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:req.body.status,
         dataEntryCompletionDate:new Date(),
         })
         .then(data=>{
                        caseHistory.create(req.params.caseId,req.body.component,data._id,'Updating Check',req.body.status,'Check Updated',null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during data entry"
             })
         })
 }else{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:req.body.status,
         insfficiencyComments:req.body.insufficiencyComments,
         dataEntryCompletionDate:new Date(),
         })
         .then(data=>{
                       caseHistory.create(req.params.caseId,req.body.component,data._id,'Updating Check',req.body.status,'Check Updated',null,null,null,req.user.user_id)
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
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:req.body.status,
         inputqcCompletionDate:new Date(),
         branchAllocatedTo:req.body.branch,
         })
         .then(data=>{
                          caseHistory.create(req.params.caseId,req.body.component,data._id,'Upadint Input QC Status',req.body.status,'Input QC Status Updated',null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during input qc"
             })
         })
 }else{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:req.body.status,
         inputqcComments:req.body.inputqcComments,
         inputqcCompletionDate:new Date(),
         })
         .then(data=>{
             res.json(data)
         })
         .catch(err=>{
                         caseHistory.create(req.params.caseId,req.body.component,data._id,'Input QC Updation',req.body.status,req.body.inputqcComments,null,null,null,req.user.user_id)
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during input qc"
             })
         })
 }
};
exports.readFileNames=(req,res)=>{
  let files = new Array()
  let filePath='/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName  + '/' + req.params.componentId + '/candidatedocs'
  if(fs.existsSync(filePath)){
      fs.readdirSync(filePath).forEach(file=>{
           let indexOfDot = file.lastIndexOf(".")
           files.push(file.substring(0,indexOfDot))
       })
   }
   res.json(files)
};
exports.readProofOfWorks=(req,res)=>{
  let files = new Array()
  let filePath='/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + "/" + req.params.componentId + '/proofofwork'
  if(fs.existsSync(filePath)){
      fs.readdirSync(filePath).forEach(file=>{
           let indexOfDot = file.lastIndexOf(".")
           files.push(file.substring(0,indexOfDot))
       })
   }
   res.json(files)
};
exports.readPaymentProofs=(req,res)=>{
  let files = new Array()
  let filePath='/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + "/" + req.params.componentId + '/paymentproof'
  if(fs.existsSync(filePath)){
      fs.readdirSync(filePath).forEach(file=>{
           let indexOfDot = file.lastIndexOf(".")
           files.push(file.substring(0,indexOfDot))
       })
   }
   res.json(files)
};
exports.findComponentsFor=(req,res)=>{
 let query;
 if(req.params.for=='INPUTQC'){
     query={$or:[{status:'DE-COMPLETED'},{status:'INPUTQC-REJECTED'}]}
 }
 if(req.params.for=='VERIFICATION'){
     query={$or:[{status:'INPUTQC-ACCEPTED',verificationAllocatedTo:req.user_userId},{status:'MENTOR-REVIEW-REJECTED',verificationAllocatedTo:req.user_userId},{status:"OUTPUTQC-REJECTED",verificationAllocatedTo:req.user_userId},{status:'FE-COMPLETED'},{status:"FE-INSUF"},{status:'FE-COULD-NOT-VERIFY'}]}
 }
 if(req.params.for=='VERIFICATION-TL'){
     query={$or:[{status:'INPUTQC-ACCEPTED',branchAllocatedTo:{$ne:null}},{status:'MENTOR-REVIEW-REJECTED',branchAllocatedTo:{$ne:null}},{status:"OUTPUTQC-REJECTED",verificationAllocatedTo:{$ne:null}},{status:'FE-COMPLETED',branchAllocatedTo:{$ne:null}},{status:"FE-INSUF",branchAllocatedTo:{$ne:null}},{status:'FE-COULD-NOT-VERIFY',branchAllocatedTo:{$ne:null}}]}
 }
 if(req.params.for=='FE-TL'){
     query={$or:[{status:'ALLOCATE-TO-FE'},{status:'ALLOCATED-TO-FE'}]}
 }
 if(req.params.for=='FE-VERIFICATION'){
     query={$or:[{status:'ALLOCATED-TO-FE',allocatedToFE:req.user.user_id},{status:'VERIFIER-REJECTED',allocatedToFE:req.user.user_id},{status:'ALLOCATE-TO-FE',allocatedToFE:null}]}
 }
 if(req.params.for=='FE-VERIFIED'){
     query={$or:[{status:'FE-COMPLETED'},{status:"FE-INSUF"},{status:'FE-COULD-NOT-VERIFY'}]}
 }
 if(req.params.for=='VENDOR-MANAGER'){
     query={$or:[{status:'ALLOCATE-TO-VENDOR'},{status:'ALLOCATED-TO-VENDOR'}]}
 }
 if(req.params.for=='VENDOR-VERIFICATION'){
     query={$or:[{status:'ALLOCATED-TO-VENDOR',allocatedToVendor:req.user.user_id},{status:'VERIFIER-REJECTED',allocatedToVendor:req.user.user_id}]}
 }
 if(req.params.for=='VENDOR-VERIFIED'){
     query={$or:[{status:'VENDOR-COMPLETED'},{status:"VENDOR-INSUF"},{status:'VENDOR-COULD-NOT-VERIFY'}]}
 }
 if(req.params.for=='MENTOR-REVIEW'){
     query={status:'VERIFICATION-COMPLETED'}
 }
 if(req.params.for=='OUTPUTQC'){
     query={status:'MENTOR-REVIEW-ACCEPTED'}
 }
 if(req.params.for=='WORD-REPORT-DOWNLOAD'){
     query={status:'OUTPUTQC-ACCEPTED'}
 }
 if(req.params.for=='UPDATE-LHS'){
     query={status:'UPDATE-LHS'}
 }
    emergencycontactcheck.find(query)
       .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
       .populate({path:'allocatedToFE'})
       .populate({path:'allocatedToVendor'})
       .populate({path:'verificationAllocatedTo'})
       .populate({path:'personalDetailsData'})
       .lean()
       .then(data=>{
              res.json(data)
        })
       .catch(err=>{
           res.status(500).json({
               message:'Error reading checks'
           })
       })
       let getPersonalDetails = function(item){
          return new Promise((resolve,reject)=>{
                 PersonalDetailsData
                 .findOne({case:item.case._id})
                 .then(personalDetailsData=>{
                     if(personalDetailsData != null){
                        console.log("Personal Details is not null",personalDetailsData)
                        item["dateofbirth"]=personalDetailsData.dateofbirth
                        item["fathername"]=personalDetailsData.fathername
                        item["mobilenumber"]=personalDetailsData.mobilename
                        console.log("item contains ",item.dateofbirth)
                        resolve(item)
                     }
                 })
                .catch(err=>{
                    console.log("Error ",err)
                    reject()                 })
          })
       }
};
exports.findComponentsForVendorManager=(req,res)=>{
    let page = req.query.pageCount;
    let offSet = page * 200;
    let count = 0;
    emergencycontactcheck
    .count({status:req.params.status})
    .then(data=>{
      count = data
    })
    .catch(err=>{
       res.status(500).json({
          message:'Error reading checks'
       })
    })
    emergencycontactcheck.find({status:req.params.status})
                    .sort({_id:1})
                    .skip(offSet)
                    .limit(200)
                    .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                    .populate({path:'allocatedToFE'})
                    .populate({path:'allocatedToVendor'})
                    .populate({path:'verificationAllocatedTo'})
                    .populate({path:'personalDetailsData'})
                    .lean()
                    .then(data=>{
                        res.json({totalCount:count,res:data})
                    })
                    .catch(err=>{
                         res.status(500).json({
                            message:'Error reading checks'
                         })
                   })
}
exports.findUnallocatedComponentsForVerification=(req,res)=>{
 let query={$or:[{status:'INPUTQC-ACCEPTED',branchAllocatedTo:null},{status:'MENTOR-REVIEW-REJECTED',verificationAllocatedTo:req.user_userId,branchAllocatedTo:null},{status:'OUTPUTQC-REJECTED',verificationAllocatedTo:req.user_userId,branchAllocatedTo:null},{status:'FE-COMPLETED',verificationAllocatedTo:req.user.user_id,branchAllocatedTo:null},{status:"FE-INSUF",verificationAllocatedTo:req.user.user_id,branchAllocatedTo:null},{status:'FE-COULD-NOT-VERIFY',verificationAllocatedTo:req.user.user_id,branchAllocatedTo:null}]}
    emergencycontactcheck.find(query)
       .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
       .populate({path:'allocatedToFE'})
       .populate({path:'allocatedToVendor'})
       .populate({path:'verificationAllocatedTo'})
       .populate({path:'personalDetailsData'})
       .lean()
       .then(data=>{
            res.json(data)
        })
       .catch(err=>{
           console.log('Error is',err)
           res.status(500).json({
               message:'Error reading checks'
           })
       })
       let getPersonalDetails = function(item){
          return new Promise((resolve,reject)=>{
                 PersonalDetailsData
                 .findOne({case:item.case._id})
                 .then(personalDetailsData=>{
                     if(personalDetailsData != null){
                        console.log("Personal Details is not null",personalDetailsData)
                        item["dateofbirth"]=personalDetailsData.dateofbirth
                        item["fathername"]=personalDetailsData.fathername
                        item["mobilenumber"]=personalDetailsData.mobilename
                        console.log("item contains ",item.dateofbirth)
                        resolve(item)
                     }
                 })
                .catch(err=>{
                    console.log("Error ",err)
                    reject()                 })
          })
       }
};

////new//////

exports.updateVerificationStatus = async (req, res) => {
  try {
    const { caseId, componentId } = req.params;
    const existing = await emergencycontactcheck.findOne({ case: caseId, _id: componentId });
    if (!existing) return res.status(404).json({ message: 'Component not found' });

    const updateData = {///updateVerificationStatus
      /*institutenameRhs: req.body.institutenameRhs,
      universitynameRhs: req.body.universitynameRhs,
      cityRhs: req.body.cityRhs,
      stateRhs: req.body.stateRhs,
      contactnumberRhs: req.body.contactnumberRhs,
      degreeRhs: req.body.degreeRhs,
      registrationnumberRhs: req.body.registrationnumberRhs,
      yearofpassingRhs: req.body.yearofpassingRhs,
      verifiernameRhs: req.body.verifiernameRhs,
      verifierdesignationRhs: req.body.verifierdesignationRhs,
      verifieremailidRhs: req.body.verifieremailidRhs,
      verifiedbyRhs: req.body.verifiedbyRhs,
      verifiedonRhs: req.body.verifiedonRhs,
      modeofverificationRhs: req.body.modeofverificationRhs,
      status: req.body.status,
      verificationCompletionDate: new Date(),
      grade: req.body.grade,
      grade1: req.body.grade,
      gradingComments: req.body.gradingComments,
      interimOrFinal: req.body.interimOrFinal,
      mode: req.body.mode,
      personContacted: req.body.personContacted,
      contactNumberOfPersonContacted: req.body.contactNumberOfPersonContacted
      */
	    verificationCompletionDate: new Date(),
	    ...req.body,
    };

    if (req.body.status === 'VERIFICATION-COMPLETED' || req.body.verificationStatus === 'FE-COMPLETED') {
      const modifiedFields = Object.keys(updateData).reduce((acc, key) => {
        if (updateData[key] !== undefined && updateData[key] !== existing[key]) {
          acc.push({
            field: key,
            oldValue: existing[key],
            newValue: updateData[key]
          });
        }
        return acc;
      }, []);

      const updated = await emergencycontactcheck.findOneAndUpdate(
        { case: caseId, _id: componentId },
        updateData,
        { new: true }
      );

      if (modifiedFields.length > 0) {
        await CheckHistory.create({
          caseId,
          componentId,
          modifiedBy: req.user.user_id,
          modifiedOn: new Date(),
          modifiedFields
        });
      }

      await caseHistory.create(caseId, req.body.component, updated._id, 'Verification Completed', req.body.status, req.body.gradingComments, null, null, null, req.user.user_id);
      return res.json(updated);
    }

    // Other statuses
    if (req.body.status === 'DRAFT') {
      return emergencycontactcheck.findOneAndUpdate(
        { case: caseId, _id: componentId },
        {
          ...updateData,
          stage: 'WIP'
        }
      ).then(data => res.json(data)).catch(err => {
        res.status(500).json({ message: err.message || "Error occurred while updating status during input qc" });
      });
    } else if (req.body.status === 'ON-HOLD') {
      return emergencycontactcheck.findOneAndUpdate(
        { case: caseId, _id: componentId },
        {
          ...updateData,
	  stage:'ON-HOLD',
	  nextfollowupdate: null,
          onHoldCommentsDate: new Date(),
          onHoldComments: req.body.onHoldComments
        },
        { new: true }
      ).then(data => {
        caseHistory.create(caseId, req.body.component, data._id, 'ON-HOLD', req.body.status, req.body.onHoldComments, null, null, null, req.user.user_id);
        res.json(data);
      }).catch(err => {
        res.status(500).json({ message: err.message || "Error occurred while updating status during input qc" });
      });
    } else if (req.body.status === 'WIP') {
      return emergencycontactcheck.findOneAndUpdate(
        { case: caseId, _id: componentId },
        { stage: 'WIP', nextfollowupdate: null},     
        { new: true }
      ).then(data => {
        caseHistory.create(caseId, req.body.component, data._id, 'WIP', req.body.status, req.body.onHoldComments, null, null, null, req.user.user_id);
        res.json(data);
      }).catch(err => {
        res.status(500).json({ message: err.message || "Error occurred while updating status during input qc" });
      });
    } else if (req.body.status === 'UPDATE-LHS') {
      return emergencycontactcheck.findOneAndUpdate(
        { case: caseId, _id: componentId },
        {
          status: req.body.status,
	  stage:'UPDATE-LHS',
	  nextfollowupdate: null,
          updateLhsDate: new Date(),
          updateLhsComments: req.body.updateLhsComments
        },
        { new: true }
      ).then(data => {
        caseHistory.create(caseId, req.body.component, data._id, 'UPDATE-LHS', req.body.status, req.body.onHoldComments, null, null, null, req.user.user_id);
        res.json(data);
      }).catch(err => {
        res.status(500).json({ message: err.message || "Error occurred while updating status during input qc" });
      });
    } else {
      return emergencycontactcheck.findOneAndUpdate(
        { case: caseId, _id: componentId },
        {
          status: req.body.status,
          insufficiencyRaisedDate: new Date(),
          insufficiencyComments: req.body.insufficiencyComments
        },
        { new: true }
      ).then(data => {
        caseHistory.create(caseId, req.body.component, data._id, 'Insuff 2 Raised', req.body.status, req.body.insufficiencyComments, null, null, null, req.user.user_id);
        res.json(data);
      }).catch(err => {
        res.status(500).json({ message: err.message || "Error occurred while updating status during input qc" });
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Unexpected error occurred during verification status update' });
  }
};


// exports.updateVerificationStatus=(req,res)=>{
//  if(req.body.status=='VERIFICATION-COMPLETED' || req.body.verificationStatus=='FE-COMPLETED'){
//      emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
//        emergencycontactnumberoneRhs:req.body.emergencycontactnumberoneRhs,
//        relationshipemergencycontactnumberoneRhs:req.body.relationshipemergencycontactnumberoneRhs,
//        emergencycontactnumbertwoRhs:req.body.emergencycontactnumbertwoRhs,
//        relationshipemergencycontactnumbertwoRhs:req.body.relationshipemergencycontactnumbertwoRhs,
//        dateofcontactRhs:req.body.dateofcontactRhs,
//        verifiedonRhs:req.body.verifiedonRhs,
//        remarksRhs:req.body.remarksRhs,
//        datasourceRhs:req.body.datasourceRhs,
//        modeofverificationRhs:req.body.modeofverificationRhs,
//          status:req.body.status,
//          verificationCompletionDate:new Date(),
//          grade:req.body.grade,
//          grade1:req.body.grade,
//          gradingComments:req.body.gradingComments,
//          interimOrFinal:req.body.interimOrFinal,
//          mode:req.body.mode,
//          personContacted:req.body.personContacted,
//          contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted,
//          })
//          .then(data=>{
//             caseHistory.create(req.params.caseId,req.body.component,data._id,'Verification Completed',req.body.status,req.body.gradingComments,null,null,null,req.user.user_id)
//              res.json(data)
//          })
//          .catch(err=>{
//              res.status(500).json({
//                  message:err.message | "Error occurred while updating status during input qc"
//              })
//          })
//  }else{
//      emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
//          status:req.body.status,
//          insufficiencyRaisedDate:new Date(),
//          insufficiencyComments:req.body.insufficiencyComments,
//          })
//          .then(data=>{
//              caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuff 2 Raised',req.body.status,req.body.insufficiencyComments,null,null,null,req.user.user_id)
//              res.json(data)
//          })
//          .catch(err=>{
//              res.status(500).json({
//                  message:err.message | "Error occurred while updating status during input qc"
//              })
//          })
//  }
// };
exports.updateFeVerificationStatus=(req,res)=>{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       emergencycontactnumberoneRhs:req.body.emergencycontactnumberoneRhs,
       relationshipemergencycontactnumberoneRhs:req.body.relationshipemergencycontactnumberoneRhs,
       emergencycontactnumbertwoRhs:req.body.emergencycontactnumbertwoRhs,
       relationshipemergencycontactnumbertwoRhs:req.body.relationshipemergencycontactnumbertwoRhs,
       dateofcontactRhs:req.body.dateofcontactRhs,
       verifiedonRhs:req.body.verifiedonRhs,
       remarksRhs:req.body.remarksRhs,
       datasourceRhs:req.body.datasourceRhs,
       modeofverificationRhs:req.body.modeofverificationRhs,
         status:req.body.status,
         feVerificationCompletionDate:new Date(),
         feInsufficiencyComments:req.body.feInsufficiencyComments,
         personContacted:req.body.personContacted,
         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted
         })
         .then(data=>{
             caseHistory.create(req.params.caseId,req.body.component,data._id,'FE Verification Completion',req.body.status,req.body.status == 'FE-INSUF'? req.body.feInsufficiencyComments:"Completed by FE" ,null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during input qc"
             })
         })
};
exports.updateVendorVerificationStatus=(req,res)=>{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       emergencycontactnumberoneRhs:req.body.emergencycontactnumberoneRhs,
       relationshipemergencycontactnumberoneRhs:req.body.relationshipemergencycontactnumberoneRhs,
       emergencycontactnumbertwoRhs:req.body.emergencycontactnumbertwoRhs,
       relationshipemergencycontactnumbertwoRhs:req.body.relationshipemergencycontactnumbertwoRhs,
       dateofcontactRhs:req.body.dateofcontactRhs,
       verifiedonRhs:req.body.verifiedonRhs,
       remarksRhs:req.body.remarksRhs,
       datasourceRhs:req.body.datasourceRhs,
       modeofverificationRhs:req.body.modeofverificationRhs,
         status:req.body.status,
         vendorVerificationCompletionDate:new Date(),
         vendorInsufficiencyComments:req.body.vendorInsufficiencyComments,
         personContacted:req.body.personContacted,
         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted
         })
         .then(data=>{
             caseHistory.create(req.params.caseId,req.body.component,data._id,'Vendor Verification Completion',req.body.status,req.body.status == 'VENDOR-INSUF'? req.body.vendorInsufficiencyComments:"Completed by Vendor" ,null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during input qc"
             })
         })
};
exports.updateVerifierReviewStatus=(req,res)=>{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       emergencycontactnumberoneRhs:req.body.emergencycontactnumberoneRhs,
       relationshipemergencycontactnumberoneRhs:req.body.relationshipemergencycontactnumberoneRhs,
       emergencycontactnumbertwoRhs:req.body.emergencycontactnumbertwoRhs,
       relationshipemergencycontactnumbertwoRhs:req.body.relationshipemergencycontactnumbertwoRhs,
       dateofcontactRhs:req.body.dateofcontactRhs,
       verifiedonRhs:req.body.verifiedonRhs,
       remarksRhs:req.body.remarksRhs,
       datasourceRhs:req.body.datasourceRhs,
       modeofverificationRhs:req.body.modeofverificationRhs,
         status:req.body.status,
         verificationCompletionDate:req.body.verifierReviewStatus == 'VERIFICATION-COMPLETED' ? new Date():null,
         verifierReviewStatus:req.body.verifierReviewStatus,
         verifierReviewComments:req.body.verifierReviewComments,
         grade:req.body.grade,
         grade1:req.body.grade,
         gradingComments:req.body.gradingComments,
         personContacted:req.body.personContacted,
         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted
         })
         .then(data=>{
            caseHistory.create(req.params.caseId,req.body.component,data._id,'Verification Status Update',req.body.status,req.body.status == 'VERIFICATION-COMPLETED'? req.body.gradingComments:req.body.verifierReviewComments ,null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during input qc"
             })
         })
};

///new/////

exports.updateMentorReviewStatus = async (req, res) => {
    try {
        const { caseId, componentId } = req.params;
        const existing = await emergencycontactcheck.findOne({ case: caseId, _id: componentId });
        if (!existing) return res.status(404).json({ message: 'Component not found' });

        const updateData = {
           /* institutenameRhs: req.body.data?.institutenameRhs,
            universitynameRhs: req.body.data?.universitynameRhs,
            cityRhs: req.body.data?.cityRhs,
            stateRhs: req.body.data?.stateRhs,
            contactnumberRhs: req.body.data?.contactnumberRhs,
            degreeRhs: req.body.data?.degreeRhs,
            registrationnumberRhs: req.body.data?.registrationnumberRhs,
            yearofpassingRhs: req.body.data?.yearofpassingRhs,
            verifiernameRhs: req.body.data?.verifiernameRhs,
            verifierdesignationRhs: req.body.data?.verifierdesignationRhs,
            verifieremailidRhs: req.body.data?.verifieremailidRhs,
            verifiedbyRhs: req.body.data?.verifiedbyRhs,
            verifiedonRhs: req.body.data?.verifiedonRhs,
            modeofverificationRhs: req.body.data?.modeofverificationRhs,*/
            ...req.body.data,
            status: req.body.status,
            mentorReviewCompletionDate: new Date(),
            mentorReviewComments: req.body.mentorReviewComments,
            mentorReviewCompletedBy: req.user.user_id
        };

        // Track modified fields
        const modifiedFields = Object.keys(updateData).reduce((acc, key) => {
            if (updateData[key] !== undefined && updateData[key] !== existing[key]) {
                acc.push({
                    field: key,
                    oldValue: existing[key],
                    newValue: updateData[key]
                });
            }
            return acc;
        }, []);

        const updated = await emergencycontactcheck.findOneAndUpdate(
            { case: caseId, _id: componentId },
            updateData,
            { new: true }
        );

        // Save check history if any fields were modified
        if (modifiedFields.length > 0) {
            await CheckHistory.create({
                caseId,
                componentId,
                modifiedBy: req.user.user_id,
                modifiedOn: new Date(),
                modifiedFields
            });
        }

        // Create case history
        await caseHistory.create(
            caseId, 
            req.body.component, 
            updated._id, 
            'Mentor Review', 
            req.body.status, 
            req.body.status == 'MENTOR-REVIEW-REJECTED' ? req.body.mentorReviewComments : "Mentor Review Accepted", 
            null, 
            null, 
            null, 
            req.user.user_id
        );

        //added code nov-07
                
                          // Auto update Output QC only when mentor accepted
                if (req.body.status === "MENTOR-REVIEW-ACCEPTED") {
                
                    await emergencycontactcheck.findOneAndUpdate(
                        { case: caseId, _id: componentId },
                        {
                            status: "OUTPUTQC-ACCEPTED",
                            outputqcCompletionDate: new Date(),
                            outputqcComments: req.body.mentorReviewComments,
                            outputqcCompletedBy: req.user.user_id
                        },
                        { new: true }
                    );
                
                    await caseHistory.create(
                        caseId,
                        req.body.component,
                        updated._id,
                        'Output QC Auto Updation',
                        "OUTPUTQC-ACCEPTED",
                        req.body.mentorReviewComments || "Output QC Accepted (Auto)",
                        null,
                        null,
                        null,
                        req.user.user_id
                    );
                }

        // Handle notification if grade matches specific value
        if (updated.grade == "602f8b3743383ec9a722496f") {
            const subclientNotificationData = await SubclientNotification.findOne({
                subclient: updated.subclient,
                triggerStatus: "CHECK-OUTPUTQC-ACCEPTED"
            })
            .populate('template')
            .populate('subclient');

            if (subclientNotificationData != null && subclientNotificationData.subclient.email != null) {
                const caseData = await Case.findOne({ _id: caseId });
                console.log("Case Data Obtained");
                
                let subject = subclientNotificationData.template.subject.replace('CASE-ID', caseData.caseId);
                let mailText = subclientNotificationData.template.content;
                let checkDetails = `<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Field Value</td><td>Comments</td></tr><tr><td>${caseData.caseId}</td><td>${caseData.candidateName}</td><td>'emergencycontactcheck Details'</td><td>${updated.institutename}</td><td>${updated.gradingComments}</td></tr></table>`;
                let changedMailText = mailText.replace('&lt;&lt;DISCREPANCY-TABLE&gt;&gt;', checkDetails);
                
                try {
                    await mailSend.sendMail(subclientNotificationData.subclient.email, subject, changedMailText);
                } catch (err) {
                    console.error("Mail sending error:", err);
                }
            }
        }

        res.json(updated);
    } catch (err) {
        console.error("Error in updateMentorReviewStatus:", err);
        res.status(500).json({
            message: err.message || "Error occurred while updating status during mentor review"
        });
    }
};

// exports.updateMentorReviewStatus=(req,res)=>{
//      emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
//                emergencycontactnumberoneRhs:req.body.data.emergencycontactnumberoneRhs,
//        relationshipemergencycontactnumberoneRhs:req.body.data.relationshipemergencycontactnumberoneRhs,
//        emergencycontactnumbertwoRhs:req.body.data.emergencycontactnumbertwoRhs,
//        relationshipemergencycontactnumbertwoRhs:req.body.data.relationshipemergencycontactnumbertwoRhs,
//        dateofcontactRhs:req.body.data.dateofcontactRhs,
//        verifiedonRhs:req.body.data.verifiedonRhs,
//        remarksRhs:req.body.data.remarksRhs,
//        datasourceRhs:req.body.data.datasourceRhs,
//        modeofverificationRhs:req.body.data.modeofverificationRhs,
// 	     status:req.body.status,
//          mentorReviewCompletionDate:new Date(),
//          mentorReviewComments:req.body.mentorReviewComments,
//          mentorReviewCompletedBy:req.user.user_id
//          })
//          .then(data=>{
//                         caseHistory.create(req.params.caseId,req.body.component,data._id,'Mentor Review',req.body.status,req.body.status == 'MENTOR-REVIEW-REJECTED'? req.body.mentorReviewComments:"Mentor Review Accepted" ,null,null,null,req.user.user_id)
//               if(data.grade == "602f8b3743383ec9a722496f"){
//                   SubclientNotification
//                   .findOne({subclient:data.subclient,triggerStatus:"CHECK-OUTPUTQC-ACCEPTED"})
//                   .populate({path:'template'})
//                   .populate({path:'subclient'})
//                   .then(subclientNotificationData=>{
//                        if(subclientNotificationData != null && subclientNotificationData.subclient.email != null){
// 	                   Case
//                           .findOne({_id:req.params.caseId})
//                           .then(caseData=>{
//                                console.log("Case Data Obtained")
//                                let subject =subclientNotificationData.template.subject
//                                let changedSubject  = subject.replace('CASE-ID',caseData.caseId)
//                                let mailText = subclientNotificationData.template.content
//                                let checkDetails = `<table border=1px><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Comments</td></tr><tr><td>caseData.caseId</td><td>caseData.candidateName</td><td>Address Details</td><td>data.gradingComments</td></tr></table>`
//                                let changedMailText = mailText.replace('&lt;&lt;DISCREPANCY-TABLE&gt;&gt;',checkDetails)
//                                let mailSent = mailSend.sendMail(subclientNotificationData.subclient.email,changedSubject,changedMailText)
//                                res.json(data)
//                            })
//                            .catch(err=>{
//                                  res.status(500).json({message:"Mail Could not be sent - Error Reading Case" + err})
//                            })
//                         }
//                    })
//                    .catch(error=>{
//                         res.status(500).json({message:"Mail Could not be sent - Error Reading Subclient Notification"})
//  	            })
//                }else{
// 	            res.json(data)
//                }
//          })
//          .catch(err=>{
//              res.status(500).json({
//                  message:err.message | "Error occurred while updating status during mentor review"
//              })
//          })
// };
exports.updateOutputqcStatus=(req,res)=>{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
               emergencycontactnumberoneRhs:req.body.data.emergencycontactnumberoneRhs,
       relationshipemergencycontactnumberoneRhs:req.body.data.relationshipemergencycontactnumberoneRhs,
       emergencycontactnumbertwoRhs:req.body.data.emergencycontactnumbertwoRhs,
       relationshipemergencycontactnumbertwoRhs:req.body.data.relationshipemergencycontactnumbertwoRhs,
       dateofcontactRhs:req.body.data.dateofcontactRhs,
       verifiedonRhs:req.body.data.verifiedonRhs,
       remarksRhs:req.body.data.remarksRhs,
       datasourceRhs:req.body.data.datasourceRhs,
       modeofverificationRhs:req.body.data.modeofverificationRhs,
	     status:req.body.status,
         outputqcCompletionDate:new Date(),
         outputqcComments:req.body.outputqcComments,
         outputqcCompletedBy:req.user.user_id
         })
         .then(data=>{
            caseHistory.create(req.params.caseId,req.body.component,data._id,'Output QC Status Updation',req.body.status,req.body.status == 'OUTPUTQC-REJECTED'? req.body.outputqcComments:"" ,null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during output qc"
             })
         })
};
exports.approveInsuff2=(req,res)=>{
 emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INSUF-2-REQ-ACCEPTED',
     scrutinyApprovedBy:req.user.user_id,
   })
   .then(data=>{
               caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuff Level 2 Approved','INSUF-2-REQ-ACCEPTED',"Insuf 2 request Accepted" ,null,null,null,req.user.user_id)
       res.json(data)
    })
   .catch(err=>{
       res.status(500).json({
           message:err.message | "Error occurred while updating status during input qc"
       })
   })
};
exports.rejectInsuff2=(req,res)=>{
 emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INPUTQC-ACCEPTED',
         stage: 'INSUF-REJ',
            nextfollowupdate: null,
     insufficiencyRejectionComments:req.body.insufficiencyRejectionComments,
	  insufficiencyClearanceRejectedBy: req.user.user_id,
                insufficiencyClearanceRejectionDate: Date.now(),

   })
   .then(data=>{
        caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf Request Rejection','Insuf Request Rejected',req.body.insufficiencyRejectionComments ,null,null,null,req.user.user_id)
       res.json(data)
    })
   .catch(err=>{
       res.status(500).json({
           message:err.message | "Error occurred while updating status during input qc"
       })
   })
};
exports.clearInsuff1=(req,res)=>{
 emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INSUF-1-CLEARED',
     clientClearedBy:req.user.user_id,
     insufficiencyClearedComments:req.body.insufficiencyClearedComments,
   })
   .then(data=>{
             caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf 1 Cleared','INSUF-1-CLEARED',req.body.insufficiencyClearedComments ,null,null,null,req.user.user_id)
       res.json(data)
    })
   .catch(err=>{
       res.status(500).json({
           message:err.message | "Error occurred while updating status during input qc"
       })
   })
};
exports.clearInsuff2=(req,res)=>{
 emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INSUF-2-CLEARED',
           stage: 'INSUF-CLEAR',
            nextfollowupdate: null,
     clientClearedBy:req.user.user_id,
     insufficiencyClearedComments:req.body.insufficiencyClearedComments,
   })
   .then(data=>{
              caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf 2 Cleared','INSUF-2-CLEARED',req.body.insufficiencyClearedComments ,null,null,null,req.user.user_id)
       res.json(data)
    })
   .catch(err=>{
       res.status(500).json({
           message:err.message | "Error occurred while updating status during input qc"
       })
   })
};
exports.rejectInsuff1Clearance=(req,res)=>{
 emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INSUF-1-CLEARANCE-REJECTED',
     insufficiencyClearanceRejectionComments:req.body.insufficiencyClearanceRejectionComments,
     insufficiencyClearanceRejectedBy:req.user.user_id,
     insufficiencyClearanceRejectionDate:Date.now(),
   })
   .then(data=>{
              caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf 1 Clearance Rejection','INSUF-1-CLEARANCE-REJECTED',req.body.insufficiencyClearanceRejectionComments ,null,null,null,req.user.user_id)
       res.json(data)
    })
   .catch(err=>{
       res.status(500).json({
           message:err.message | "Error occurred while updating status during input qc"
       })
   })
};
exports.rejectInsuff2Clearance=(req,res)=>{
 emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INSUF-2-CLEARANCE-REJECTED',
     insufficiencyClearanceRejectionComments:req.body.insufficiencyClearanceRejectionComments,
     insufficiencyClearanceRejectedBy:req.user.user_id,
     insufficiencyClearanceRejectionDate:Date.now(),
   })
   .then(data=>{
              caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf 2 Clearance Rejection','INSUF-2-CLEARANCE-REJECTED',req.body.insufficiencyClearanceRejectionComments ,null,null,null,req.user.user_id)
       res.json(data)
    })
   .catch(err=>{
       res.status(500).json({
           message:err.message | "Error occurred while updating status during input qc"
       })
   })
};
exports.allocateCheckToMyself=(req,res)=>{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         verificationAllocatedTo:req.user.user_id,
         })
         .then(data=>{
        //    caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocate Check to myself','ALLOCATE-CHECK','Allocate Check to myself' ,null,null,req.user.user_id,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during mentor review"
             })
         })
};
exports.getAllChecksAllocatedToMeForVerification=(req,res)=>{

 emergencycontactcheck
// .find({$or:[{status:'INPUTQC-ACCEPTED',verificationAllocatedTo:req.user.user_id},{status:'MENTOR-REVIEW-REJECTED',verificationAllocatedTo:req.user.user_id},{status:'OUTPUTQC-REJECTED',verificationAllocatedTo:req.user.user_id},{status:'VERIFICATION-COMPLETED',verificationAllocatedTo:req.user.user_id}]})
.find({ $or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: req.user.user_id }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user.user_id }, { status: 'OUTPUTQC-REJECTED', verificationAllocatedTo: req.user.user_id }] })
.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
.populate({path:'personalDetailsData'})
.lean()
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving emergencycontactcheck for cases'
       })
   })
};
      let getPersonalDetails = function(item){
          return new Promise((resolve,reject)=>{
                 PersonalDetailsData
                 .findOne({case:item.case._id})
                 .then(personalDetailsData=>{
                     if(personalDetailsData != null){
                        console.log("Personal Details is not null",personalDetailsData)
                        item["dateofbirth"]=personalDetailsData.dateofbirth
                        item["fathername"]=personalDetailsData.fathername
                        item["mobilenumber"]=personalDetailsData.mobilename
                     }
                     resolve(item)                   })
                   .catch(err=>{
                       reject()
                   })
           })
       }
exports.getInsuffForClient=(req,res)=>{

UserSubclientAccess.find({user:req.user.user_id})
 .then(userSubclientData=>{
      emergencycontactcheck
     .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
      .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
      .then(async data=>{
         let reqArray = await getReqArray(userSubclientData,data)
         res.json(reqArray)
      })
     .catch(err=>{
          res.status(500).json({
             message:err.message || 'Some error while retrieving emergencycontactcheck for cases'
          })
      })
 })
 .catch(err=>{
      res.status(500).json({
         message:err.message || 'Some error while retrieving emergencycontactcheck for cases'
      })
  })
 let getReqArray = function(userSubclientData,data){
     return new Promise((resolve,reject)=>{
         let reqData = new Array()
         for(let i=0; i < data.length;i++){
            let insuffData = data[i]
            for(let j=0; j < userSubclientData.length;j++){
               let subclientData = userSubclientData[j]
               if(insuffData.case.subclient._id.toString() == subclientData.subclient.toString()){
                  reqData.push(insuffData)
                  break
               }
            }
         }
         resolve(reqData)
     })
}
}
exports.getInsuffForScrutiny=(req,res)=>{

 emergencycontactcheck
 .find({$or:[{status:'INSUF-1-CLEARED'},{status:'INSUF-2-CLEARED'},{status:'INSUF-2-REQ'},{status:'CLARIFICATION-REQ'},{status:'COST-APPROVAL-REQ'}]})
.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving emergencycontactcheck for cases'
       })
   })
};
exports.approveInsuffClearance=(req,res)=>{
 emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INPUTQC-ACCEPTED',
     insufficiencyClearedDate:Date.now(),
   })
   .then(data=>{
       res.json(data)
    })
   .catch(err=>{
       res.status(500).json({
           message:err.message | "Error occurred while updating status during input qc"
       })
   })
};
exports.deleteCheck=(req,res)=>{
   emergencycontactcheck.findOneAndDelete({case:req.params.caseId,_id:req.params.componentId})
                   .then(data=>{
                                              caseHistory.create(req.params.casieId,req.body.component,data._id,'Deleting a check','Check Deleted','Check Deleted',null,null,null,req.user.user_id)
                         res.json(data)
                    })
                   .catch(err=>{
                         res.json({
                              message:err.message || 'Some error occurred while reading a component'
                          })
                    })
};
exports.putItToFeBucket=(req,res)=>{

     emergencycontactcheck
     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:req.body.status,
         modifiedBy:req.user.user_id
      })
     .then(data=>{
                  caseHistory.create(req.params.caseId,req.body.component,data._id,'Put Check in FE Bucket',req.body.status,'Putting Check in FE Bucket',null,null,null,req.user.user_id)
         res.json(data)
      })
     .catch(err=>{
         res.status(500).json({
             message: err.message | "Some error occurred while putting a check to FE bucket"
         })
     })
};
exports.putItToVendorBucket=(req,res)=>{

     emergencycontactcheck
     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:req.body.status,
         modifiedBy:req.user.user_id
      })
     .then(data=>{
            caseHistory.create(req.params.caseId,req.body.component,data._id,'Putting Check in Vendor Bucket','Put Check in Venfo Bucket','Check put in vendor bucket' ,null,null,null,req.user.user_id)
         res.json(data)
      })
     .catch(err=>{
         res.status(500).json({
             message: err.message | "Some error occurred while putting a check to Vendor bucket"
         })
     })
};
exports.allocateCheckToFe=(req,res)=>{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:'ALLOCATED-TO-FE',
         allocatedToFE:req.user.user_id,
         allocatedToVendor:null,
         feAllocationDate:Date.now(),
         })
         .then(data=>{
             caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocating to FE','ALLOCATED-TO-FE','Allocated to FE' ,null,req.user.user_id,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during mentor review"
             })
         })
};
exports.allocateCheckToVendor=(req,res)=>{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:'ALLOCATED-TO-VENDOR',
         allocatedToVendor:req.body.vendor,
         allocatedToFE:null,
         vendorAllocationDate:Date.now(),
         })
         .then(data=>{
             caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocating to Vendor','ALLOCATED-TO-VENDOR','Check allocated to vendor' ,req.body.vendor,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during mentor review"
             })
         })
};
exports.allocateCheckToVerifier=(req,res)=>{
     emergencycontactcheck.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         verificationAllocatedTo:req.body.verifier,
         verificationAllocationDate:Date.now(),
         })
         .then(data=>{
              caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocating Check to Analyst','Allocated Check to Analyst','Allocated Check to Analyst' ,null,null,req.body.veifier,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during mentor review"
             })
         })
};
exports.reinitiateCheck=(req,res)=>{

     emergencycontactcheck
     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:'INPUTQC-ACCEPTED',
         reinitiationDate:new Date(),
         reinitiationComments:req.body.reinitiationComments,
         verificationAllocatedTo:null,
         modifiedBy:req.user.user_id
      })
     .then(data=>{
         caseHistory.create(req.params.caseId,req.body.component,data._id,'Reinitiating a check','REINITIATED',req.body.reinitiationComments,null,null,null,req.user.user_id)
         res.json(data)
      })
     .catch(err=>{
         res.status(500).json({
             message: err.message | "Some error occurred while putting a check to Vendor bucket"
         })
     })
};
exports.addNote=(req,res)=>{

      emergencycontactcheck
     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
                  stage:'WIP',
	     effortType:req.body.effortType,
         modifiedBy:req.user.user_id,
	     nextfollowupdate:req.body.nextfollowupdatedate

      })
     .then(data=>{
         caseHistory.create(req.params.caseId,req.body.component,data._id,'Effort Added','EFFORT ADDED',req.body.note,null,null,null,req.user.user_id)
         res.json(data)
      })
     .catch(err=>{
         res.status(500).json({
             message: err.message | "Some error occurred while putting a check to Vendor bucket"
         })
     })
};
exports.addquicknote = async (req, res) => {
    try {
        const caseData = await emergencycontactcheck.findOne({ _id: req.body.case_id  })
        const caseComments = []
        Object.assign(caseComments, caseData?caseData.comments:null)
        const commentToPush = {user: mongoose.Types.ObjectId(req.user.user_id), date: new Date(), comment: req.body.comment, colorType: req.body.colorType }
        caseComments.push(commentToPush)
        const updatedCaseData = await emergencycontactcheck.findOneAndUpdate({ _id: req.body._id }, { comments: caseComments })
        return res.json(updatedCaseData)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
    }
}

exports.getAllquicknoteForACheck = async (req, res) => {
    try {
        let result = new Array()
        const caseData = await emergencycontactcheck.findOne({ _id: req.params.case_id })
		let comments = caseData.comments || []
        for(let i =0; i<comments.length; i++){
            const comment = comments[i]
            const userData = await User.findOne({_id: comment.user})
            result.push({user: userData, date: comment.date, comment: comment.comment, colorType: comment.colorType})
        }
        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
    }
}


