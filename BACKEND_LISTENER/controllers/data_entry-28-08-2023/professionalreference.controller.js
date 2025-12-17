const professionalreference = require('../../models/data_entry/professionalreference.model')
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

exports.create=(req,res)=>{
if(!req.body.case){
   res.status(400).json({message:"Case Id is Mandatory"})
}
   if(!req.body.referencename){
       res.status(400).json({message:'Reference Name required'})
   }
   if(!req.body.referencecontact){
       res.status(400).json({message:'Reference Contact required'})
   }
   if(!req.body.referenceemail){
       res.status(400).json({message:'Reference Email required'})
   }
   if(!req.body.relationshipwithreferee){
       res.status(400).json({message:'Relationship with Referee required'})
   }
   if(!req.body.sincehowlongdoyouknowthecandidate){
       res.status(400).json({message:'Since how long do you know the Candidate? required'})
   }
   if(!req.body.dutiesandresponsibilitiesofthecandidate){
       res.status(400).json({message:'Duties and responsibilities of the candidate? required'})
   }
   if(!req.body.communicationskills){
       res.status(400).json({message:'Communication Skills required'})
   }
   if(!req.body.effectivenessinmeetinggoalsandobjectives){
       res.status(400).json({message:'Effectiveness in meeting goals and objectives required'})
   }
   if(!req.body.professionalstrengths){
       res.status(400).json({message:'Professional strengths required'})
   }
   if(!req.body.professionalweaknesses){
       res.status(400).json({message:'Professional weaknesses required'})
   }
   if(!req.body.abilitytowithstandpressure){
       res.status(400).json({message:'Ability to withstand pressure required'})
   }
   if(!req.body.peoplemanagementskills){
       res.status(400).json({message:'People management skills (if applicable) required'})
   }
   if(!req.body.reliability){
       res.status(400).json({message:'Reliability required'})
   }
   if(!req.body.honesty){
       res.status(400).json({message:'Honesty required'})
   }
   if(!req.body.attendanceandpunctuality){
       res.status(400).json({message:'Attendance and punctuality required'})
   }
   if(!req.body.personalproblemshabitsinterferingwithperformance){
       res.status(400).json({message:'Personal problems / habits interfering with performance required'})
   }
   if(!req.body.reasonforleaving){
       res.status(400).json({message:'Reason for leaving required'})
   }
   if(!req.body.jobperformanceratingonascale){
       res.status(400).json({message:'Job performance rating on a scale of 1 to 10 required'})
   }
   if(!req.body.anyissueswithcandidateyoucameacrossduringyourassociation){
       res.status(400).json({message:'Any issues with candidate you came across during your association required'})
   }
   if(!req.body.currentorganization){
       res.status(400).json({message:'Current Organization required'})
   }
   if(!req.body.currentdesignation){
       res.status(400).json({message:'Current Designation required'})
   }
   if(!req.body.interpersonalskills){
       res.status(400).json({message:'Interpersonal skills required'})
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   const obj = new professionalreference({
   case:req.body.case,
  personalDetailsData:req.body.personalDetails,
   component:req.body.component ==null ? "645e0c38da4885b59f88ffc5":req.body.component,
       referencename:req.body.referencename,
       referencenameRhs:null,
       referencecontact:req.body.referencecontact,
       referencecontactRhs:null,
       referenceemail:req.body.referenceemail,
       referenceemailRhs:null,
       relationshipwithreferee:req.body.relationshipwithreferee,
       relationshipwithrefereeRhs:null,
       sincehowlongdoyouknowthecandidate:req.body.sincehowlongdoyouknowthecandidate,
       sincehowlongdoyouknowthecandidateRhs:null,
       dutiesandresponsibilitiesofthecandidate:req.body.dutiesandresponsibilitiesofthecandidate,
       dutiesandresponsibilitiesofthecandidateRhs:null,
       communicationskills:req.body.communicationskills,
       communicationskillsRhs:null,
       effectivenessinmeetinggoalsandobjectives:req.body.effectivenessinmeetinggoalsandobjectives,
       effectivenessinmeetinggoalsandobjectivesRhs:null,
       professionalstrengths:req.body.professionalstrengths,
       professionalstrengthsRhs:null,
       professionalweaknesses:req.body.professionalweaknesses,
       professionalweaknessesRhs:null,
       abilitytowithstandpressure:req.body.abilitytowithstandpressure,
       abilitytowithstandpressureRhs:null,
       peoplemanagementskills:req.body.peoplemanagementskills,
       peoplemanagementskillsRhs:null,
       reliability:req.body.reliability,
       reliabilityRhs:null,
       honesty:req.body.honesty,
       honestyRhs:null,
       attendanceandpunctuality:req.body.attendanceandpunctuality,
       attendanceandpunctualityRhs:null,
       personalproblemshabitsinterferingwithperformance:req.body.personalproblemshabitsinterferingwithperformance,
       personalproblemshabitsinterferingwithperformanceRhs:null,
       reasonforleaving:req.body.reasonforleaving,
       reasonforleavingRhs:null,
       jobperformanceratingonascale:req.body.jobperformanceratingonascale,
       jobperformanceratingonascaleRhs:null,
       anyissueswithcandidateyoucameacrossduringyourassociation:req.body.anyissueswithcandidateyoucameacrossduringyourassociation,
       anyissueswithcandidateyoucameacrossduringyourassociationRhs:null,
       currentorganization:req.body.currentorganization,
       currentorganizationRhs:null,
       currentdesignation:req.body.currentdesignation,
       currentdesignationRhs:null,
       interpersonalskills:req.body.interpersonalskills,
       interpersonalskillsRhs:null,
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
   .update({_id:req.body.case},{$push:{actualComponents:"professionalreference"}})
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
          message:err.message || 'Some error while saving professionalreference'
       })
   })
};
exports.findAllForACase=(req,res)=>{

 professionalreference
 .find({case:req.params.case})
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving professionalreference for cases'
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
   if(!req.body.referencename){
   }
   if(!req.body.referencecontact){
   }
   if(!req.body.referenceemail){
   }
   if(!req.body.relationshipwithreferee){
   }
   if(!req.body.sincehowlongdoyouknowthecandidate){
   }
   if(!req.body.dutiesandresponsibilitiesofthecandidate){
   }
   if(!req.body.communicationskills){
   }
   if(!req.body.effectivenessinmeetinggoalsandobjectives){
   }
   if(!req.body.professionalstrengths){
   }
   if(!req.body.professionalweaknesses){
   }
   if(!req.body.abilitytowithstandpressure){
   }
   if(!req.body.peoplemanagementskills){
   }
   if(!req.body.reliability){
   }
   if(!req.body.honesty){
   }
   if(!req.body.attendanceandpunctuality){
   }
   if(!req.body.personalproblemshabitsinterferingwithperformance){
   }
   if(!req.body.reasonforleaving){
   }
   if(!req.body.jobperformanceratingonascale){
   }
   if(!req.body.anyissueswithcandidateyoucameacrossduringyourassociation){
   }
   if(!req.body.currentorganization){
   }
   if(!req.body.currentdesignation){
   }
   if(!req.body.interpersonalskills){
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       referencename:req.body.referencename,
       referencecontact:req.body.referencecontact,
       referenceemail:req.body.referenceemail,
       relationshipwithreferee:req.body.relationshipwithreferee,
       sincehowlongdoyouknowthecandidate:req.body.sincehowlongdoyouknowthecandidate,
       dutiesandresponsibilitiesofthecandidate:req.body.dutiesandresponsibilitiesofthecandidate,
       communicationskills:req.body.communicationskills,
       effectivenessinmeetinggoalsandobjectives:req.body.effectivenessinmeetinggoalsandobjectives,
       professionalstrengths:req.body.professionalstrengths,
       professionalweaknesses:req.body.professionalweaknesses,
       abilitytowithstandpressure:req.body.abilitytowithstandpressure,
       peoplemanagementskills:req.body.peoplemanagementskills,
       reliability:req.body.reliability,
       honesty:req.body.honesty,
       attendanceandpunctuality:req.body.attendanceandpunctuality,
       personalproblemshabitsinterferingwithperformance:req.body.personalproblemshabitsinterferingwithperformance,
       reasonforleaving:req.body.reasonforleaving,
       jobperformanceratingonascale:req.body.jobperformanceratingonascale,
       anyissueswithcandidateyoucameacrossduringyourassociation:req.body.anyissueswithcandidateyoucameacrossduringyourassociation,
       currentorganization:req.body.currentorganization,
       currentdesignation:req.body.currentdesignation,
       interpersonalskills:req.body.interpersonalskills,
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
          message:err.message || 'Some error while saving professionalreference'
       })
   })
};
exports.findOne=(req,res)=>{
   professionalreference.findOne({case:req.params.caseId,_id:req.params.componentId})
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
    professionalreference.find(query)
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
    professionalreference
    .count({status:req.params.status})
    .then(data=>{
      count = data
    })
    .catch(err=>{
       res.status(500).json({
          message:'Error reading checks'
       })
    })
    professionalreference.find({status:req.params.status})
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
    professionalreference.find(query)
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
exports.updateVerificationStatus=(req,res)=>{
 if(req.body.status=='VERIFICATION-COMPLETED' || req.body.verificationStatus=='FE-COMPLETED'){
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       referencenameRhs:req.body.referencenameRhs,
       referencecontactRhs:req.body.referencecontactRhs,
       referenceemailRhs:req.body.referenceemailRhs,
       relationshipwithrefereeRhs:req.body.relationshipwithrefereeRhs,
       sincehowlongdoyouknowthecandidateRhs:req.body.sincehowlongdoyouknowthecandidateRhs,
       dutiesandresponsibilitiesofthecandidateRhs:req.body.dutiesandresponsibilitiesofthecandidateRhs,
       communicationskillsRhs:req.body.communicationskillsRhs,
       effectivenessinmeetinggoalsandobjectivesRhs:req.body.effectivenessinmeetinggoalsandobjectivesRhs,
       professionalstrengthsRhs:req.body.professionalstrengthsRhs,
       professionalweaknessesRhs:req.body.professionalweaknessesRhs,
       abilitytowithstandpressureRhs:req.body.abilitytowithstandpressureRhs,
       peoplemanagementskillsRhs:req.body.peoplemanagementskillsRhs,
       reliabilityRhs:req.body.reliabilityRhs,
       honestyRhs:req.body.honestyRhs,
       attendanceandpunctualityRhs:req.body.attendanceandpunctualityRhs,
       personalproblemshabitsinterferingwithperformanceRhs:req.body.personalproblemshabitsinterferingwithperformanceRhs,
       reasonforleavingRhs:req.body.reasonforleavingRhs,
       jobperformanceratingonascaleRhs:req.body.jobperformanceratingonascaleRhs,
       anyissueswithcandidateyoucameacrossduringyourassociationRhs:req.body.anyissueswithcandidateyoucameacrossduringyourassociationRhs,
       currentorganizationRhs:req.body.currentorganizationRhs,
       currentdesignationRhs:req.body.currentdesignationRhs,
       interpersonalskillsRhs:req.body.interpersonalskillsRhs,
         status:req.body.status,
         verificationCompletionDate:new Date(),
         grade:req.body.grade,
         grade1:req.body.grade,
         gradingComments:req.body.gradingComments,
         interimOrFinal:req.body.interimOrFinal,
         mode:req.body.mode,
         personContacted:req.body.personContacted,
         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted,
         })
         .then(data=>{
            caseHistory.create(req.params.caseId,req.body.component,data._id,'Verification Completed',req.body.status,req.body.gradingComments,null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during input qc"
             })
         })
 }else{
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:req.body.status,
         insufficiencyRaisedDate:new Date(),
         insufficiencyComments:req.body.insufficiencyComments,
         })
         .then(data=>{
             caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuff 2 Raised',req.body.status,req.body.insufficiencyComments,null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during input qc"
             })
         })
 }
};
exports.updateFeVerificationStatus=(req,res)=>{
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       referencenameRhs:req.body.referencenameRhs,
       referencecontactRhs:req.body.referencecontactRhs,
       referenceemailRhs:req.body.referenceemailRhs,
       relationshipwithrefereeRhs:req.body.relationshipwithrefereeRhs,
       sincehowlongdoyouknowthecandidateRhs:req.body.sincehowlongdoyouknowthecandidateRhs,
       dutiesandresponsibilitiesofthecandidateRhs:req.body.dutiesandresponsibilitiesofthecandidateRhs,
       communicationskillsRhs:req.body.communicationskillsRhs,
       effectivenessinmeetinggoalsandobjectivesRhs:req.body.effectivenessinmeetinggoalsandobjectivesRhs,
       professionalstrengthsRhs:req.body.professionalstrengthsRhs,
       professionalweaknessesRhs:req.body.professionalweaknessesRhs,
       abilitytowithstandpressureRhs:req.body.abilitytowithstandpressureRhs,
       peoplemanagementskillsRhs:req.body.peoplemanagementskillsRhs,
       reliabilityRhs:req.body.reliabilityRhs,
       honestyRhs:req.body.honestyRhs,
       attendanceandpunctualityRhs:req.body.attendanceandpunctualityRhs,
       personalproblemshabitsinterferingwithperformanceRhs:req.body.personalproblemshabitsinterferingwithperformanceRhs,
       reasonforleavingRhs:req.body.reasonforleavingRhs,
       jobperformanceratingonascaleRhs:req.body.jobperformanceratingonascaleRhs,
       anyissueswithcandidateyoucameacrossduringyourassociationRhs:req.body.anyissueswithcandidateyoucameacrossduringyourassociationRhs,
       currentorganizationRhs:req.body.currentorganizationRhs,
       currentdesignationRhs:req.body.currentdesignationRhs,
       interpersonalskillsRhs:req.body.interpersonalskillsRhs,
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       referencenameRhs:req.body.referencenameRhs,
       referencecontactRhs:req.body.referencecontactRhs,
       referenceemailRhs:req.body.referenceemailRhs,
       relationshipwithrefereeRhs:req.body.relationshipwithrefereeRhs,
       sincehowlongdoyouknowthecandidateRhs:req.body.sincehowlongdoyouknowthecandidateRhs,
       dutiesandresponsibilitiesofthecandidateRhs:req.body.dutiesandresponsibilitiesofthecandidateRhs,
       communicationskillsRhs:req.body.communicationskillsRhs,
       effectivenessinmeetinggoalsandobjectivesRhs:req.body.effectivenessinmeetinggoalsandobjectivesRhs,
       professionalstrengthsRhs:req.body.professionalstrengthsRhs,
       professionalweaknessesRhs:req.body.professionalweaknessesRhs,
       abilitytowithstandpressureRhs:req.body.abilitytowithstandpressureRhs,
       peoplemanagementskillsRhs:req.body.peoplemanagementskillsRhs,
       reliabilityRhs:req.body.reliabilityRhs,
       honestyRhs:req.body.honestyRhs,
       attendanceandpunctualityRhs:req.body.attendanceandpunctualityRhs,
       personalproblemshabitsinterferingwithperformanceRhs:req.body.personalproblemshabitsinterferingwithperformanceRhs,
       reasonforleavingRhs:req.body.reasonforleavingRhs,
       jobperformanceratingonascaleRhs:req.body.jobperformanceratingonascaleRhs,
       anyissueswithcandidateyoucameacrossduringyourassociationRhs:req.body.anyissueswithcandidateyoucameacrossduringyourassociationRhs,
       currentorganizationRhs:req.body.currentorganizationRhs,
       currentdesignationRhs:req.body.currentdesignationRhs,
       interpersonalskillsRhs:req.body.interpersonalskillsRhs,
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       referencenameRhs:req.body.referencenameRhs,
       referencecontactRhs:req.body.referencecontactRhs,
       referenceemailRhs:req.body.referenceemailRhs,
       relationshipwithrefereeRhs:req.body.relationshipwithrefereeRhs,
       sincehowlongdoyouknowthecandidateRhs:req.body.sincehowlongdoyouknowthecandidateRhs,
       dutiesandresponsibilitiesofthecandidateRhs:req.body.dutiesandresponsibilitiesofthecandidateRhs,
       communicationskillsRhs:req.body.communicationskillsRhs,
       effectivenessinmeetinggoalsandobjectivesRhs:req.body.effectivenessinmeetinggoalsandobjectivesRhs,
       professionalstrengthsRhs:req.body.professionalstrengthsRhs,
       professionalweaknessesRhs:req.body.professionalweaknessesRhs,
       abilitytowithstandpressureRhs:req.body.abilitytowithstandpressureRhs,
       peoplemanagementskillsRhs:req.body.peoplemanagementskillsRhs,
       reliabilityRhs:req.body.reliabilityRhs,
       honestyRhs:req.body.honestyRhs,
       attendanceandpunctualityRhs:req.body.attendanceandpunctualityRhs,
       personalproblemshabitsinterferingwithperformanceRhs:req.body.personalproblemshabitsinterferingwithperformanceRhs,
       reasonforleavingRhs:req.body.reasonforleavingRhs,
       jobperformanceratingonascaleRhs:req.body.jobperformanceratingonascaleRhs,
       anyissueswithcandidateyoucameacrossduringyourassociationRhs:req.body.anyissueswithcandidateyoucameacrossduringyourassociationRhs,
       currentorganizationRhs:req.body.currentorganizationRhs,
       currentdesignationRhs:req.body.currentdesignationRhs,
       interpersonalskillsRhs:req.body.interpersonalskillsRhs,
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
exports.updateMentorReviewStatus=(req,res)=>{
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:req.body.status,
         mentorReviewCompletionDate:new Date(),
         mentorReviewComments:req.body.mentorReviewComments,
         mentorReviewCompletedBy:req.user.user_id
         })
         .then(data=>{
                        caseHistory.create(req.params.caseId,req.body.component,data._id,'Mentor Review',req.body.status,req.body.status == 'MENTOR-REVIEW-REJECTED'? req.body.mentorReviewComments:"Mentor Review Accepted" ,null,null,null,req.user.user_id)
              if(data.grade == "602f8b3743383ec9a722496f"){
                  SubclientNotification
                  .findOne({subclient:data.subclient,triggerStatus:"CHECK-OUTPUTQC-ACCEPTED"})
                  .populate({path:'template'})
                  .populate({path:'subclient'})
                  .then(subclientNotificationData=>{
                       if(subclientNotificationData != null && subclientNotificationData.subclient.email != null){
	                   Case
                          .findOne({_id:req.params.caseId})
                          .then(caseData=>{
                               console.log("Case Data Obtained")
                               let subject =subclientNotificationData.template.subject
                               let changedSubject  = subject.replace('CASE-ID',caseData.caseId)
                               let mailText = subclientNotificationData.template.content
                               let checkDetails = `<table border=1px><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Comments</td></tr><tr><td>caseData.caseId</td><td>caseData.candidateName</td><td>Address Details</td><td>data.gradingComments</td></tr></table>`
                               let changedMailText = mailText.replace('&lt;&lt;DISCREPANCY-TABLE&gt;&gt;',checkDetails)
                               let mailSent = mailSend.sendMail(subclientNotificationData.subclient.email,changedSubject,changedMailText)
                               res.json(data)
                           })
                           .catch(err=>{
                                 res.status(500).json({message:"Mail Could not be sent - Error Reading Case" + err})
                           })
                        }
                   })
                   .catch(error=>{
                        res.status(500).json({message:"Mail Could not be sent - Error Reading Subclient Notification"})
 	            })
               }else{
	            res.json(data)
               }
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during mentor review"
             })
         })
};
exports.updateOutputqcStatus=(req,res)=>{
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INPUTQC-ACCEPTED',
     insufficiencyRejectionComments:req.body.insufficiencyRejectionComments,
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
 professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
     status:'INSUF-2-CLEARED',
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
 professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         verificationAllocatedTo:req.user.user_id,
         })
         .then(data=>{
            caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocate Check to myself','ALLOCATE-CHECK','Allocate Check to myself' ,null,null,req.user.user_id,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during mentor review"
             })
         })
};
exports.getAllChecksAllocatedToMeForVerification=(req,res)=>{

 professionalreference
 .find({$or:[{status:'INPUTQC-ACCEPTED',verificationAllocatedTo:req.user.user_id},{status:'MENTOR-REVIEW-REJECTED',verificationAllocatedTo:req.user.user_id},{status:'OUTPUTQC-REJECTED',verificationAllocatedTo:req.user.user_id}]})
.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
.populate({path:'personalDetailsData'})
.lean()
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving professionalreference for cases'
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
      professionalreference
     .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
      .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
      .then(async data=>{
         let reqArray = await getReqArray(userSubclientData,data)
         res.json(reqArray)
      })
     .catch(err=>{
          res.status(500).json({
             message:err.message || 'Some error while retrieving professionalreference for cases'
          })
      })
 })
 .catch(err=>{
      res.status(500).json({
         message:err.message || 'Some error while retrieving professionalreference for cases'
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

 professionalreference
 .find({$or:[{status:'INSUF-1-CLEARED'},{status:'INSUF-2-CLEARED'},{status:'INSUF-2-REQ'},{status:'CLARIFICATION-REQ'},{status:'COST-APPROVAL-REQ'}]})
.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving professionalreference for cases'
       })
   })
};
exports.approveInsuffClearance=(req,res)=>{
 professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
   professionalreference.findOneAndDelete({case:req.params.caseId,_id:req.params.componentId})
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

     professionalreference
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

     professionalreference
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     professionalreference.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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

     professionalreference
     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         status:'REINITIATED',
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

      professionalreference
     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         stage:'WIP',
         modifiedBy:req.user.user_id
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
