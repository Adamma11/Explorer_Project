const educationcomprehensive = require('../../models/data_entry/educationcomprehensive.model')
const express = require('express');
const fileUpload = require('express-fileupload');
const mime = require('mime');
const fs = require('fs'); 
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const Case = require('../../models/uploads/case.model')
const caseHistory = require('../data_entry/case_history.controller')
const UserSubclientAccess = require('../../models/administration/user_subclient_access.model')
const SubclientNotification = require('../../models/administration/subclient_notification.model')
const Subclient = require('../../models/administration/subclient.model')
const mailSend = require('../mails/send_mail.controller')

exports.create=(req,res)=>{
if(!req.body.case){
   res.status(400).json({message:"Case Id is Mandatory"})
}
   if(!req.body.nameofuniversity){
       res.status(400).json({message:'Name of Universit required'})
   }
   if(!req.body.nameofschool){
       res.status(400).json({message:'Name of School required'})
   }
   if(!req.body.cityofstudy){
       res.status(400).json({message:'City of Study required'})
   }
   if(!req.body.typeofqualification){
       res.status(400).json({message:'Type of Qualification required'})
   }
   if(!req.body.qualification){
       res.status(400).json({message:'Qualification required'})
   }
   if(!req.body.specialization){
       res.status(400).json({message:'Specialization required'})
   }
   if(!req.body.rollnumber){
       res.status(400).json({message:'Role / Regd Number required'})
   }
   if(!req.body.yearofjoining){
       res.status(400).json({message:'Year of Joining (mmm-yy) required'})
   }
   if(!req.body.yearofcompletion){
       res.status(400).json({message:'Year of Completion (mmm-yy) required'})
   }
   if(!req.body.marks){
       res.status(400).json({message:'Marks / Division / %age / CGPA required'})
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   const obj = new educationcomprehensive({
   case:req.body.case,
  personalDetailsData:req.body.personalDetails,
   component:req.body.component == null ? "60547c9e779669b9d9dc084b" : req.body.component,
       nameofuniversity:req.body.nameofuniversity,
       nameofuniversityRhs:null,
       nameofschool:req.body.nameofschool,
       nameofschoolRhs:null,
       cityofstudy:req.body.cityofstudy,
       cityofstudyRhs:null,
       typeofqualification:req.body.typeofqualification,
       typeofqualificationRhs:null,
       qualification:req.body.qualification,
       qualificationRhs:null,
       specialization:req.body.specialization,
       specializationRhs:null,
       rollnumber:req.body.rollnumber,
       rollnumberRhs:null,
       yearofjoining:req.body.yearofjoining,
       yearofjoiningRhs:null,
       yearofcompletion:req.body.yearofcompletion,
       yearofcompletionRhs:null,
       marks:req.body.marks,
       marksRhs:null,
       nameofrespondent:req.body.nameofrespondent,
       nameofrespondentRhs:null,
       contactofrespondent:req.body.contactofrespondent,
       contactofrespondentRhs:null,
       emailofrespondent:req.body.emailofrespondent,
       emailofrespondentRhs:null,
       sourceofvfn:req.body.sourceofvfn,
       sourceofvfnRhs:null,
       universitygen:req.body.universitygen,
       universitygenRhs:null,
       dateofverification:req.body.dateofverification,
       dateofverificationRhs:null,
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
        .update({_id:req.body.case},{$push:{actualComponents:"educationcomprehensive"}})
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
          message:err.message || 'Some error while saving educationcomprehensive'
       })
   })
};
exports.findAllForACase=(req,res)=>{

 educationcomprehensive
 .find({case:req.params.case})
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving educationcomprehensive for cases'
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
exports.deleteProofOfWork=(req,res)=>{

   fs.unlink('/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/proofofwork/' + req.query.fileName + '.pdf',function(err){
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
   if(!req.body.nameofuniversity){
   }
   if(!req.body.nameofschool){
   }
   if(!req.body.cityofstudy){
   }
   if(!req.body.typeofqualification){
   }
   if(!req.body.qualification){
   }
   if(!req.body.specialization){
   }
   if(!req.body.rollnumber){
   }
   if(!req.body.yearofjoining){
   }
   if(!req.body.yearofcompletion){
   }
   if(!req.body.marks){
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       nameofuniversity:req.body.nameofuniversity,
       nameofschool:req.body.nameofschool,
       cityofstudy:req.body.cityofstudy,
       typeofqualification:req.body.typeofqualification,
       qualification:req.body.qualification,
       specialization:req.body.specialization,
       rollnumber:req.body.rollnumber,
       yearofjoining:req.body.yearofjoining,
       yearofcompletion:req.body.yearofcompletion,
       marks:req.body.marks,
       nameofrespondent:req.body.nameofrespondent,
       contactofrespondent:req.body.contactofrespondent,
       emailofrespondent:req.body.emailofrespondent,
       sourceofvfn:req.body.sourceofvfn,
       dateofverification:req.body.dateofverification,
       universitygen:req.body.universitygen,
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
          message:err.message || 'Some error while saving educationcomprehensive'
       })
   })
};
exports.findOne=(req,res)=>{
   educationcomprehensive.findOne({case:req.params.caseId,_id:req.params.componentId})
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
        nameofuniversity:req.body.componentData.nameofuniversity,
       nameofschool:req.body.componentData.nameofschool,
       cityofstudy:req.body.componentData.cityofstudy,
       typeofqualification:req.body.componentData.typeofqualification,
       qualification:req.body.componentData.qualification,
       specialization:req.body.componentData.specialization,
       rollnumber:req.body.componentData.rollnumber,
       yearofjoining:req.body.componentData.yearofjoining,
       yearofcompletion:req.body.componentData.yearofcompletion,
       marks:req.body.componentData.marks,
       nameofrespondent:req.body.componentData.nameofrespondent,
       contactofrespondent:req.body.componentData.contactofrespondent,
       emailofrespondent:req.body.componentData.emailofrespondent,
       sourceofvfn:req.body.componentData.sourceofvfn,
       dateofverification:req.body.componentData.dateofverification,
       universitygen:req.body.componentData.universitygen,
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
    educationcomprehensive.find(query)
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
    educationcomprehensive
    .count({status:req.params.status})
    .then(data=>{
      count = data
    })
    .catch(err=>{
       res.status(500).json({
          message:'Error reading checks'
       })
    })
    educationcomprehensive.find({status:req.params.status})
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
 let query={$or:[{status:'INPUTQC-ACCEPTED',branchAllocatedTo:null},{status:'MENTOR-REVIEW-REJECTED',branchAllocatedTo:null},{status:'OUTPUTQC-REJECTED',branchAllocatedTo:null},{status:'FE-COMPLETED',branchAllocatedTo:null},{status:"FE-INSUF",branchAllocatedTo:null},{status:'FE-COULD-NOT-VERIFY',branchAllocatedTo:null}]}
    educationcomprehensive.find(query)
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       nameofuniversityRhs:req.body.nameofuniversityRhs,
       nameofschoolRhs:req.body.nameofschoolRhs,
       cityofstudyRhs:req.body.cityofstudyRhs,
       typeofqualificationRhs:req.body.typeofqualificationRhs,
       qualificationRhs:req.body.qualificationRhs,
       specializationRhs:req.body.specializationRhs,
       rollnumberRhs:req.body.rollnumberRhs,
       yearofjoiningRhs:req.body.yearofjoiningRhs,
       yearofcompletionRhs:req.body.yearofcompletionRhs,
       marksRhs:req.body.marksRhs,
       nameofrespondentRhs:req.body.nameofrespondentRhs,
       contactofrespondentRhs:req.body.contactofrespondentRhs,
       emailofrespondentRhs:req.body.emailofrespondentRhs,
       dateofverificationRhs:req.body.dateofverificationRhs,
       sourceofvfnRhs:req.body.sourceofvfnRhs,
       universitygenRhs:req.body.universitygenRhs,
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       nameofuniversityRhs:req.body.nameofuniversityRhs,
       nameofschoolRhs:req.body.nameofschoolRhs,
       cityofstudyRhs:req.body.cityofstudyRhs,
       typeofqualificationRhs:req.body.typeofqualificationRhs,
       qualificationRhs:req.body.qualificationRhs,
       specializationRhs:req.body.specializationRhs,
       rollnumberRhs:req.body.rollnumberRhs,
       yearofjoiningRhs:req.body.yearofjoiningRhs,
       yearofcompletionRhs:req.body.yearofcompletionRhs,
       marksRhs:req.body.marksRhs,
       nameofrespondentRhs:req.body.nameofrespondentRhs,
       contactofrespondentRhs:req.body.contactofrespondentRhs,
       emailofrespondentRhs:req.body.emailofrespondentRhs,
       dateofverificationRhs:req.body.dateofverificationRhs,
       sourceofvfnRhs:req.body.sourceofvfnRhs,
       universitygenRhs:req.body.universitygenRhs,
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       nameofuniversityRhs:req.body.nameofuniversityRhs,
       nameofschoolRhs:req.body.nameofschoolRhs,
       cityofstudyRhs:req.body.cityofstudyRhs,
       typeofqualificationRhs:req.body.typeofqualificationRhs,
       qualificationRhs:req.body.qualificationRhs,
       specializationRhs:req.body.specializationRhs,
       rollnumberRhs:req.body.rollnumberRhs,
       yearofjoiningRhs:req.body.yearofjoiningRhs,
       yearofcompletionRhs:req.body.yearofcompletionRhs,
       marksRhs:req.body.marksRhs,
       nameofrespondentRhs:req.body.nameofrespondentRhs,
       contactofrespondentRhs:req.body.contactofrespondentRhs,
       emailofrespondentRhs:req.body.emailofrespondentRhs,
       dateofverificationRhs:req.body.dateofverificationRhs,
       sourceofvfnRhs:req.body.sourceofvfnRhs,
       universitygenRhs:req.body.universitygenRhs,
         status:req.body.status,
         vendorVerificationCompletionDate:new Date(),
         vendorInsufficiencyComments:req.body.feInsufficiencyComments,
         personContacted:req.body.personContacted,
         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted 
         })
         .then(data=>{
             caseHistory.create(req.params.caseId,req.body.component,data._id,'Vendor Verification Completion',req.body.status,req.body.status == 'VENDOR-INSUF'? req.body.vendorInsufficiencyComments:"Completed by FE" ,null,null,null,req.user.user_id)
             res.json(data)
         })
         .catch(err=>{
             res.status(500).json({
                 message:err.message | "Error occurred while updating status during input qc"
             })
         })
};
exports.updateVerifierReviewStatus=(req,res)=>{
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       nameofuniversityRhs:req.body.nameofuniversityRhs,
       nameofschoolRhs:req.body.nameofschoolRhs,
       cityofstudyRhs:req.body.cityofstudyRhs,
       typeofqualificationRhs:req.body.typeofqualificationRhs,
       qualificationRhs:req.body.qualificationRhs,
       specializationRhs:req.body.specializationRhs,
       rollnumberRhs:req.body.rollnumberRhs,
       yearofjoiningRhs:req.body.yearofjoiningRhs,
       yearofcompletionRhs:req.body.yearofcompletionRhs,
       marksRhs:req.body.marksRhs,
       nameofrespondentRhs:req.body.nameofrespondentRhs,
       contactofrespondentRhs:req.body.contactofrespondentRhs,
       emailofrespondentRhs:req.body.emailofrespondentRhs,
       dateofverificationRhs:req.body.dateofverificationRhs,
       sourceofvfnRhs:req.body.sourceofvfnRhs,
       universitygenRhs:req.body.universitygenRhs,
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
                                        let checkDetails = `<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Field Value</td><td>Comments</td></tr><tr><td>${caseData.caseId}</td><td>${caseData.candidateName}</td><td>'Education Comprehensive Details'</td><td>${data.nameofuniversity}</td><td>${data.gradingComments}</td></tr></table>`
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
 educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
         verificationAllocatedTo:req.user.user_id,
         verificationAllocationDate:Date.now(),
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

 educationcomprehensive
 .find({$or:[{status:'INPUTQC-ACCEPTED',verificationAllocatedTo:req.user.user_id},{status:'MENTOR-REVIEW-REJECTED',verificationAllocatedTo:req.user.user_id},{status:'OUTPUTQC-REJECTED',verificationAllocatedTo:req.user.user_id}]})
.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
.populate({path:'personalDetailsData'})
.lean()
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving educationcomprehensive for cases'
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
    let page = req.query.pageCount;
    let offSet = page * 50;
    let count = 0;	

UserSubclientAccess.find({user:req.user.user_id},{subclient:1,_id:0})
 .then(userSubclientData=>{
      educationcomprehensive
     .find({$and:[{$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]},{$or:userSubclientData}]})
	 
     .sort({_id:1})
     .skip(offSet)
     .limit(50)	 
      .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
      .then(data=>{
//         let reqArray = await getReqArray(userSubclientData,data)
         res.json(data)
      })
     .catch(err=>{
          res.status(500).json({
             message:err.message || 'Some error while retrieving educationcomprehensive for cases'
          })
      })
 })
 .catch(err=>{
      res.status(500).json({
         message:err.message || 'Some error while retrieving educationcomprehensive for cases'
      })
  })
}
exports.searchACaseForInsuffForClient=(req,res)=>{
 console.log("In search for insuff case education, case id required is ",req.query.caseId)
 Case
 .findOne({caseId:req.query.caseId})
 .then(caseData=>{
    console.log("Case Data found for education insuff")
    console.log("About  to find subclients for  user",req.user.user_id)
    UserSubclientAccess.find({user:req.user.user_id},{_id:0,subclient:1})
    .then(userSubclientData=>{
       console.log("In education insuff user subclient access is ",userSubclientData)
       educationcomprehensive
     .find({$and:[{$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]},{$or:userSubclientData},{case:caseData._id}]})
	    
//       .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}],$or:userSubclientData,case:caseData._id})

       .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
       .then(data=>{
          console.log("Found the education insuff data ",data)
          res.json(data)
       })
       .catch(err=>{
          res.status(500).json({
             message:"Error searching insuff for address"
          })
       })
    })
    .catch(err=>{
       res.status(500).json({
               message:"Error Reading User Subclient Data for Insuff Search"
       })
    })
 })
 .catch(err=>{
    res.status(500).json({
            message:"Error Reading Case Data"
    })
 })
	
}

exports.getInsuffForScrutiny=(req,res)=>{

 educationcomprehensive
 .find({$or:[{status:'INSUF-1-CLEARED'},{status:'INSUF-2-CLEARED'},{status:'INSUF-2-REQ'},{status:'CLARIFICATION-REQ'},{status:'COST-APPROVAL-REQ'}]})
.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
.populate({path:'case',populate:{path:'subclient',populate:{path:'branch'}}})	
 .then(data=>{
     res.json(data)
 })
 .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while retrieving educationcomprehensive for cases'
       })
   })
};
exports.approveInsuffClearance=(req,res)=>{
 educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
   educationcomprehensive.findOneAndDelete({case:req.params.caseId,_id:req.params.componentId})
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

     educationcomprehensive
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

     educationcomprehensive
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
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
     educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
	     status:'INPUTQC-ACCEPTED',    
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

    educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
        nameofuniversityRhs:req.body.nameofuniversityRhs,
        nameofschoolRhs:req.body.nameofschoolRhs,
        cityofstudyRhs:req.body.cityofstudyRhs,
        typeofqualificationRhs:req.body.typeofqualificationRhs,
        qualificationRhs:req.body.qualificationRhs,
        specializationRhs:req.body.specializationRhs,
        rollnumberRhs:req.body.rollnumberRhs,
        yearofjoiningRhs:req.body.yearofjoiningRhs,
        yearofcompletionRhs:req.body.yearofcompletionRhs,
        marksRhs:req.body.marksRhs,
        nameofrespondentRhs:req.body.nameofrespondentRhs,
        contactofrespondentRhs:req.body.contactofrespondentRhs,
        emailofrespondentRhs:req.body.emailofrespondentRhs,
        dateofverificationRhs:req.body.dateofverificationRhs,
        sourceofvfnRhs:req.body.sourceofvfnRhs,
        universitygenRhs:req.body.universitygenRhs,
          status:req.body.status,
          verificationCompletionDate:new Date(),
          grade:req.body.grade,
      grade1:req.body.grade,    
          gradingComments:req.body.gradingComments,
          interimOrFinal:req.body.interimOrFinal,
          mode:req.body.mode,
          personContacted:req.body.personContacted,
          contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted,
          reinitiationDate: new Date(),
          reinitiationComments: req.body.reinitiationComments
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
exports.addNote = async (req, res) => {
    const CaseHistory = require("../../models/data_entry/case_history.model")

    // Restricting Follow Ups if current follow up or follow ups before that exists

    try {
        if (req.body.effortType.includes('Followup')) {
            const followUpNumber = Number(req.body.effortType[8])
            console.log(followUpNumber)
            const caseHistoryData = await CaseHistory.find({ case: req.params.caseId, check: req.params.componentId, operation: /Followup/ })
            console.log("CHD:",caseHistoryData)
            if(!caseHistoryData.length){
                if(followUpNumber !== 1){
                    return res.status(400).json({ message: `Next follow up should be Follow Up 1` })
                }
            }else{
                const latestFollowUp = caseHistoryData[caseHistoryData.length - 1]
                                const latestFollowUpNumber = Number(latestFollowUp.operation[8])
                if(latestFollowUpNumber == 6){
                    return res.status(400).json({message: "Follow Up Limit Reached"})
                }
                if (followUpNumber != latestFollowUpNumber + 1) {
                    return res.status(400).json({ message: `Next follow up should be Follow Up ${latestFollowUpNumber + 1}` })
                }
            }
          
          
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Could not create effort due to internal server error." })
    }


    educationcomprehensive
        .findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            stage: 'WIP',
            modifiedBy: req.user.user_id
        })
        .then(data => {
            caseHistory.create(req.body.case_id, req.body.component, data._id, req.body.effortType, 'EFFORT ADDED', req.body.note, null, null, null, req.user.user_id)

            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message | "Some error occurred while putting a check to Vendor bucket"
            })
        })
};
exports.getChecksWhereGradeOneIsNullAndGradeNotNull= (req,res)=>{
       educationcomprehensive
       .find({subclient:null})
       .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
       .then(data=>{
         data.forEach(item=>{
           console.log("About to update subclient of address online",item._id)
           educationcomprehensive
           .findOneAndUpdate({_id:item._id},{subclient:item.case.subclient._id,client:item.case.subclient.client._id})
           .then(data=>{
           })
           .catch(err=>{
              console.log("Error in updating address ",err)
           })
/*           Case
           .update({_id:item.case._id},{$push:{actualComponents:"educationcomprehensive"}})
           .then(data=>{
              console.log("Updated the case ",data)
           })
           .catch(err=>{
              console.log("Error updating case ",data.caseId)
           })*/
		 
         })
//         res.json(data)
         res.json({message:"Completed"})
       })
       .catch(err=>{
         console.log("Error reading address",err)
         res.status(500).json({
            message:"Error reading User"
         })
       })	
}
exports.createForCde=(req,res)=>{
let caseId = req.caseId
if(caseId != null){
   if(!req.body.case){
      res.status(400).json({message:"Case Id is Mandatory"})
   }
   if(!req.body.nameofuniversity){
       res.status(400).json({message:'Name of Universit required'})
   }
   if(!req.body.nameofschool){
       res.status(400).json({message:'Name of School required'})
   }
   if(!req.body.cityofstudy){
       res.status(400).json({message:'City of Study required'})
   }
   if(!req.body.typeofqualification){
       res.status(400).json({message:'Type of Qualification required'})
   }
   if(!req.body.qualification){
       res.status(400).json({message:'Qualification required'})
   }
   if(!req.body.specialization){
       res.status(400).json({message:'Specialization required'})
   }
   if(!req.body.rollnumber){
       res.status(400).json({message:'Role / Regd Number required'})
   }
   if(!req.body.yearofjoining){
       res.status(400).json({message:'Year of Joining (mmm-yy) required'})
   }
   if(!req.body.yearofcompletion){
       res.status(400).json({message:'Year of Completion (mmm-yy) required'})
   }
   if(!req.body.marks){
       res.status(400).json({message:'Marks / Division / %age / CGPA required'})
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   const obj = new educationcomprehensive({
   case:req.body.case,
  personalDetailsData:req.body.personalDetails,
   component:req.body.component,
       serialNumber:req.body.serialNumber,
       nameofuniversity:req.body.nameofuniversity,
       nameofuniversityRhs:null,
       nameofschool:req.body.nameofschool,
       nameofschoolRhs:null,
       cityofstudy:req.body.cityofstudy,
       cityofstudyRhs:null,
       typeofqualification:req.body.typeofqualification,
       typeofqualificationRhs:null,
       qualification:req.body.qualification,
       qualificationRhs:null,
       specialization:req.body.specialization,
       specializationRhs:null,
       rollnumber:req.body.rollnumber,
       rollnumberRhs:null,
       yearofjoining:req.body.yearofjoining,
       yearofjoiningRhs:null,
       yearofcompletion:req.body.yearofcompletion,
       yearofcompletionRhs:null,
       marks:req.body.marks,
       marksRhs:null,
       nameofrespondent:req.body.nameofrespondent,
       nameofrespondentRhs:null,
       contactofrespondent:req.body.contactofrespondent,
       contactofrespondentRhs:null,
       emailofrespondent:req.body.emailofrespondent,
       emailofrespondentRhs:null,
       sourceofvfn:req.body.sourceofvfn,
       sourceofvfnRhs:null,
       universitygen:req.body.universitygen,
       universitygenRhs:null,
       dateofverification:req.body.dateofverification,
       dateofverificationRhs:null,
       status:req.body.status,
//       modifiedBy:req.user.user_id
   });
       if(req.body.status == 'CDE-COMPLETED'){
           obj.dataEntryCompletionDate = new Date()
       }else{
           obj.insufficiencyComments = req.body.insufficiencyComments
       }
   obj
   .save(obj)
   .then(data=>{
       caseHistory.create(req.body.case,req.body.component,data._id,'Creating a Check','CDE-COMPLETED','Check Created',null,null,null,null)
        Case
        .update({_id:req.body.case},{$push:{actualComponents:"educationcomprehensive"}})
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
          message:err.message || 'Some error while saving educationcomprehensive'
       })
   })
  }else{
    res.status(403).json({
       message:"Forbidden"
    })
  }
};

exports.findOneForCde=(req,res)=>{
   let caseId = req.caseId
   if(caseId != null){
      educationcomprehensive.findOne({case:req.params.caseId,serialNumber:req.params.serialNumber})
      .then(data=>{
           res.json(data)
      })
      .catch(err=>{
           res.json({
               message:err.message || 'Some error occurred while reading a component'
           })
      })
   }else{
      res.status(403).json({
              message: "Forbidden"
      })
   }
};
exports.readFileNamesForCde=(req,res)=>{
  let caseId = req.caseId
  if(caseId != null){
     let files = new Array()
     let filePath='/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName  + '/' + req.params.componentId + '/candidatedocs'
     if(fs.existsSync(filePath)){
         fs.readdirSync(filePath).forEach(file=>{
              let indexOfDot = file.lastIndexOf(".")
              files.push(file.substring(0,indexOfDot))
         })
     }
     res.json(files)
  }else{
     res.status(403).json({
             message:"Forbidden"
     })
  }
};
exports.uploadFileForCde=(req,res)=>{
   let caseId = req.caseId
   if(caseId != null){
      let componentFile = req.files.componentFile;
      componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/candidatedocs/' + req.body.fileName + '.pdf',function(err){
          if(err){
              res.status(500).send({message:"Error uploading the file"});
          }
          res.json({message:"File uploaded"});
      });
   }else{
      res.status(403).json({
              message:"Forbidden"
      })
   }
};
exports.downloadFileForCde=(req,res)=>{
   let caseId = req.caseId
   if(caseId != null){
      let file = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/candidatedocs/' + req.query.fileName + '.pdf';
      res.download(file);
   }else{
      res.status(403).json({
              message:"Forbidden"
      })
   }
};
exports.updateForCde=(req,res)=>{
let caseId = req.caseId
if(caseId != null){

   if(!req.body._id){
      res.status(400).json({message:"Id cannot be empty"})
   }
   if(!req.body.case){
      res.status(400).json({message:"Case Id is Mandatory"})
   }
   if(!req.body.nameofuniversity){
   }
   if(!req.body.nameofschool){
   }
   if(!req.body.cityofstudy){
   }
   if(!req.body.typeofqualification){
   }
   if(!req.body.qualification){
   }
   if(!req.body.specialization){
   }
   if(!req.body.rollnumber){
   }
   if(!req.body.yearofjoining){
   }
   if(!req.body.yearofcompletion){
   }
   if(!req.body.marks){
   }
   if(!req.body.status){
       res.status(400).json({message:'Status required'})
   }
   educationcomprehensive.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{
       nameofuniversity:req.body.nameofuniversity,
       nameofschool:req.body.nameofschool,
       cityofstudy:req.body.cityofstudy,
       typeofqualification:req.body.typeofqualification,
       qualification:req.body.qualification,
       specialization:req.body.specialization,
       rollnumber:req.body.rollnumber,
       yearofjoining:req.body.yearofjoining,
       yearofcompletion:req.body.yearofcompletion,
       marks:req.body.marks,
       nameofrespondent:req.body.nameofrespondent,
       contactofrespondent:req.body.contactofrespondent,
       emailofrespondent:req.body.emailofrespondent,
       sourceofvfn:req.body.sourceofvfn,
       universitygen:req.body.universitygen,
       dateofverification:req.body.dateofverification,
   status:req.body.status,
   insufficiencyComments:req.body.insufficiencyComments,
   dataEntryCompletionDate:req.body.status == 'CDE-COMPLETED' ? new Date() : null,
   modifiedBy:req.user.user_id
   })
   .then(data=>{
              caseHistory.create(req.params.caseId,req.body.component,data._id,'Updating Check',req.body.status,'Check Created',null,null,null,null)
       res.json(data)
   })
   .catch(err=>{
       res.status(500).json({
          message:err.message || 'Some error while saving educationcomprehensive'
       })
   })
 }else{
   res.status(403).json({
      message:"Forbidden"
   })
 }
};
exports.deleteFileForCde=(req,res)=>{
   let caseId = req.caseId
   if(caseId != null){
      fs.unlink('/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/candidatedocs/' + req.query.fileName + '.pdf',function(err){
          if(err){
              res.status(500).send({message:"Error deleting the file"});
          }
          res.json({message:"File Deleted"});
     });
   }
};
exports.deleteCheckForCde=(req,res)=>{
let caseId = req.caseId
   if(caseId != null){
      educationcomprehensive.findOneAndDelete({case:req.params.caseId,_id:req.params.componentId})
      .then(data=>{
          caseHistory.create(req.body.case,req.body.component,data._id,'Deleting a check','Check Deleted','Check Deleted',null,null,null,null)
          acase.deleteCheck(req.params.caseId,data.component,data._id)
          res.json(data)
      })
      .catch(err=>{
          res.json({
             message:err.message || 'Some error occurred while reading a component'
          })
      })
   }else{
      res.status(403).json({
        message:"Forbidden"
      })
   }
};
exports.deleteAllFilesForCde=(req,res)=>{
   let caseId = req.caseId
   if(caseId != null){
      fs.rmSync('/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/candidatedocs/',{recursive: true, force: true })
          res.json({message:"File Deleted"});

   }
};

