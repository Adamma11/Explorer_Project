const fs = require('fs');
const express = require('express');
const componentModel = require('../models/administration/component.model');
const { findOne } = require('../models/administration/component.model');

exports.writeModel = (req,res,component_id)=>{
    const requiredModelLines = getRequiredModelLines();
    const schemaLines = getSchemaLines();
    const allModelLines = requiredModelLines + schemaLines;
    fs.writeFile(`/BACKEND-LISTENER/models/data_entry/${req.body.name.toLowerCase()}.model.js`,allModelLines,function(err){
        if(err){
            console.log('error is ',err);
            res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});        
        }
        console.log('started wrting controller lines');
        const requiredControllerLines = getRequiredControllerLines();
        const createLines = getCreateLines();
        const allocateCheckToMyselfLines = getAllocateCheckToMyselfLines();
        const allocateCheckToFeLines = getAllocateCheckToFeLines();
        const allocateCheckToVendorLines = getAllocateCheckToVendorLines();
        const allocateCheckToVeriferLines = getAllocateCheckToVerifierLines();
        const getAllChecksAllocatedToMeForVerificationLines = getGetAllChecksAllocatedToMeForVerificationLines();
        const findAllForACaseLines = getFindAllForACaseLines();
        const uploadFileLines = getUploadFileLines();
        const uploadProofOfWorkLines = getUploadProofOfWorkLines();
        const uploadPvProofOfWorkLines = getUploadPvProofOfWorkLines();
        const uploadPaymentProofLines = getUploadPaymentProofLines();
        const deleteFileLines = getDeleteFileLines();
        const downloadFileLines = getDownloadFileLines();
        const downloadProofOfWorkLines = getDownloadProofOfWorkLines();
        const downloadPaymentProofLines = getDownloadPaymentProofLines();
        const findOneLines = getFindOneLines();
        const updateLines = getUpdateLines();
        const updateDataEntryStatusLines = getUpdateDataEntryStatusLines();
        const updateInputqcStatusLines = getUpdateInputqcStatusLines();
        const readFileNameLines =  getReadFileNameLines();
        const readProofOfWorks =  getReadProofOfWorkLines();
        const readPaymentProofFileNameLines =  getReadPaymentProofFileNameLines();
//        const findOneWithInputqcStatusLines = getFindOneWithInputqcStatusLines();
        const findComponentsForLines = getFindComponentsForLines();
	const findComponentsForVendorManagerLines = getFindComponentsForVendorManagerLines();    
        const findUnallocatedComponentsForVerificationLines = getFindUnallocatedComponentsForVerificationLines();
        const updateVerificationStatusLines = getUpdateVerificationStatusLines();
        const updateFeVerificationStatusLines = getUpdateFeVerificationStatusLines();        
        const updateVendorVerificationStatusLines = getUpdateVendorVerificationStatusLines();                
        const updateMentorReivewStatusLines = getUpdateMentorReviewStatusLines();
        const updateOutputqcStatusLines = getUpdateOutputqcStatusLines();
        const updateVerifierReviewStatusLines = getUpdateVerifierReviewStatusLines();
        const approveInsuffClearanceLines = getApproveInsuffClearanceLines();   
        const approveInsuff2Lines = getApproveInsuff2Lines();   
        const rejectInsuff2Lines = getRejectInsuff2Lines();
        const clearInsuff1Lines = getClearInsuff1Lines();        
        const clearInsuff2Lines = getClearInsuff2Lines();        
        const rejectInsuff1ClearanceLines = getRejectInsuff1ClearanceLines();        
        const rejectInsuff2ClearanceLines = getRejectInsuff2ClearanceLines();                
        const getInsuffForClientLines = getGetInsuffForClientLines();
        const getInsuffForScrutinyLines = getGetInsuffForScrutinyLines();
        const deleteCheckLines  = getDeleteCheckLines();
        const putItToFeBucketLines = getPutItToFeBucketLines();
        const putItToVendorBucketLines = getPutItToVendorBucketLines();
	const reinitiateCheckLines = getReinitiateCheckLines();    
        const addNoteLines = getAddNoteLines();	    
        const allControllerLines = requiredControllerLines + createLines + findAllForACaseLines + uploadFileLines + uploadProofOfWorkLines + uploadPaymentProofLines + deleteFileLines + downloadFileLines + downloadProofOfWorkLines  + downloadPaymentProofLines + uploadPvProofOfWorkLines + updateLines + findOneLines + updateDataEntryStatusLines + updateInputqcStatusLines + readFileNameLines + readProofOfWorks + readPaymentProofFileNameLines +  findComponentsForLines + findComponentsForVendorManagerLines + findUnallocatedComponentsForVerificationLines + updateVerificationStatusLines + updateFeVerificationStatusLines  + updateVendorVerificationStatusLines + updateVerifierReviewStatusLines + updateMentorReivewStatusLines + updateOutputqcStatusLines + approveInsuff2Lines + rejectInsuff2Lines  + clearInsuff1Lines + clearInsuff2Lines + rejectInsuff1ClearanceLines + rejectInsuff2ClearanceLines + allocateCheckToMyselfLines + getAllChecksAllocatedToMeForVerificationLines + getInsuffForClientLines + getInsuffForScrutinyLines + approveInsuffClearanceLines + deleteCheckLines + putItToFeBucketLines + putItToVendorBucketLines + allocateCheckToFeLines + allocateCheckToVendorLines + allocateCheckToVeriferLines + reinitiateCheckLines + addNoteLines;
        fs.writeFile(`/BACKEND-LISTENER/controllers/data_entry/${req.body.name.toLowerCase()}.controller.js`,allControllerLines,function(err){
            if(err){
                console.log('error is',err);
                res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});        
            }
        })
        const requiredRouterLines = getRequiredRouterLines();
        const routeLines  = getRouteLines();
        const allRouterLines = requiredRouterLines + routeLines;
        fs.writeFile(`/BACKEND-LISTENER/routes/${req.body.name.toLowerCase()}.routes.js`,allRouterLines,function(err){
            if(err){
                console.log('error is',err);
                res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});                        
            }
        })
        fs.readFile(`/BACKEND-LISTENER/routes/all_app_routes.routes.js`,'utf8',function(err,data){
            if(err){
                console.log('error is',err);
                res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});                                        
            }
            console.log('search for app use line resulted in ',data.search(`api/${req.body.name.toLowerCase()}`));
            if(data.search(`api/${req.body.name.toLowerCase()}`)==-1){
                var result = data.replace('}',`    app.use('/api/${req.body.name.toLowerCase()}',authenticateToken,require('../routes/${req.body.name.toLowerCase()}.routes'));\n`+'}')
                fs.writeFile(`/BACKEND-LISTENER/routes/all_app_routes.routes.js`,result,function(err){
                    if(err){
                        console.log('error is',err);
                        res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});                                            
                    }
                })
            }
        })
    })    
    
    function getRequiredModelLines(){
        let reqLine = "const mongoose = require('mongoose')\n";
        return reqLine;
    }
    function getSchemaLines(){
        let componentFields = req.body.componentFields;
        let schemaLines = `const ${req.body.name}Schema = mongoose.Schema({\n`;
        schemaLines = schemaLines + `case:{type:mongoose.Schema.Types.ObjectId,ref:'Case',required:true},\n`;
        schemaLines = schemaLines + `component:{type:mongoose.Schema.Types.ObjectId,ref:'Component'},\n`;
        schemaLines = schemaLines + `personalDetailsData:{type:mongoose.Schema.Types.ObjectId,ref:'PersonalDetailsData'},\n`;        	    
        for(let componentField of componentFields){
            schemaLines = schemaLines + `${componentField.name}:`;
            schemaLines = schemaLines + getFieldType(componentField.type)

            schemaLines = schemaLines + `${componentField.name}Rhs:`;
            schemaLines = schemaLines + getFieldType(componentField.type)            
        }
        schemaLines = schemaLines + `earlierStage:{type:String},\n`;
        schemaLines = schemaLines + `stage:{type:String},\n`;
        schemaLines = schemaLines + `status:{type:String},\n`;
        schemaLines = schemaLines + `insufficiencyRaisedDate:{type:Date},\n`;
        schemaLines = schemaLines + `insufficiencyClearedDate:{type:Date},\n`;
        schemaLines = schemaLines + `insufficiencyClearanceRejectionDate:{type:Date},\n`;
        schemaLines = schemaLines + `insufficiencyComments:{type:String},\n`;
        schemaLines = schemaLines + `insufficiencyClearedComments:{type:String},\n`;
        schemaLines = schemaLines + `insufficiencyRejectionComments:{type:String},\n`;
        schemaLines = schemaLines + `insufficiencyClearanceRejectionComments:{type:String},\n`;
        schemaLines = schemaLines + `insufficiencyClearanceRejectedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;
        schemaLines = schemaLines + `dataEntryCompletionDate:{type:Date},\n`;
        schemaLines = schemaLines + `dataEntryCompletedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;        
        schemaLines = schemaLines + `inputqcComments:{type:String},\n`;
        schemaLines = schemaLines + `inputqcCompletionDate:{type:Date},\n`;        
        schemaLines = schemaLines + `branchAllocatedTo:{type:mongoose.Schema.Types.ObjectId,ref:'Branch'},\n`;        
        schemaLines = schemaLines + `verificationAllocatedDate:{type:Date},\n`;        
        schemaLines = schemaLines + `verificationAllocatedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;        
        schemaLines = schemaLines + `mentorAllocatedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;        
        schemaLines = schemaLines + `allocatedToFE:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;        
        schemaLines = schemaLines + `feAllocationDate:{type:Date},\n`;        
        schemaLines = schemaLines + `allocatedToVendor:{type:mongoose.Schema.Types.ObjectId,ref:'Vendor'},\n`;        
        schemaLines = schemaLines + `vendorAllocationDate:{type:Date},\n`;        
        schemaLines = schemaLines + `feInsufficiencyComments:{type:String},\n`;
        schemaLines = schemaLines + `feVerificationCompletionDate:{type:String},\n`;
        schemaLines = schemaLines + `vendorInsufficiencyComments:{type:String},\n`;
        schemaLines = schemaLines + `vendorVerificationCompletionDate:{type:String},\n`;        
        schemaLines = schemaLines + `verifierReviewComments:{type:String},\n`;
        schemaLines = schemaLines + `verificationStatus:{type:String},\n`;
        schemaLines = schemaLines + `verificationComments:{type:String},\n`;                
        schemaLines = schemaLines + `verificationCompletionDate:{type:Date},\n`;                
        schemaLines = schemaLines + `verificationCompletedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;        
        schemaLines = schemaLines + `personContacted:{type:String},\n`;                        
        schemaLines = schemaLines + `contactNumberOfPersonContacted:{type:String},\n`;                        
        schemaLines = schemaLines + `mentorReviewComments:{type:String},\n`;                        
        schemaLines = schemaLines + `mentorReviewCompletionDate:{type:Date},\n`;                
        schemaLines = schemaLines + `mentorReviewCompletedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;        
        schemaLines = schemaLines + `scrutinyRejectionReason:{type:String},\n`;                
        schemaLines = schemaLines + `scrutinyApprovedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;                
        schemaLines = schemaLines + `clientClearanceRemarks:{type:String},\n`;                
        schemaLines = schemaLines + `clientClearedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;                        
        schemaLines = schemaLines + `outputqcComments:{type:String},\n`;                                
        schemaLines = schemaLines + `outputqcCompletionDate:{type:Date},\n`;               
        schemaLines = schemaLines + `reinitiationComments:{type:String},\n`;                                
        schemaLines = schemaLines + `reinitiationDate:{type:Date},\n`;                        	    
        schemaLines = schemaLines + `grade:{type:String},\n`;
        schemaLines = schemaLines + `gradingComments:{type:String},\n`;
        schemaLines = schemaLines + `interimOrFinal:{type:String},\n`;
        schemaLines = schemaLines + `mode:{type:String},\n`;
        schemaLines = schemaLines + `modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;
        schemaLines = schemaLines + `modifiedOn:{type:Date,default:Date.now}\n`,
//        schemaLines = schemaLines + `checkHistory:any[]\n`
        schemaLines = schemaLines + `})\n`;
        schemaLines = schemaLines + `module.exports = mongoose.model('${req.body.name}',${req.body.name}Schema);`
        return schemaLines;
    }

    function getFieldType(fieldType){
        if(fieldType.toLowerCase() == 'text' ||
        fieldType.toLowerCase() == 'textarea' ||
        fieldType.toLowerCase() == 'select' ||
        fieldType.toLowerCase() == 'email' ||
        fieldType.toLowerCase() == 'telephone' ||
        fieldType.toLowerCase() == 'url' ||
        fieldType.toLowerCase() == 'ac-uni' ||
        fieldType.toLowerCase() == 'ac-com' ||
        fieldType.toLowerCase() == 'ac-pin' 
        ){
         return `{type:String},\n`;
     }
     if(fieldType.toLowerCase() == 'number'){
         return `{type:Number},\n`;
     }
     if(fieldType.toLowerCase() == 'checkbox'){
         return `{type:Boolean},\n`;
     }      
     if(fieldType.toLowerCase() == 'date' ||
     fieldType.toLowerCase() == 'time' ){
         return `{type:Date},\n`;
     }                 
    }

    function getRequiredControllerLines(){
        let reqLine = `const ${req.body.name} = require('../../models/data_entry/${req.body.name.toLowerCase()}.model')\n`;       
        reqLine = reqLine + `const express = require('express');\n`;
        reqLine = reqLine + `const fileUpload = require('express-fileupload');\n`;
        reqLine = reqLine + `const mime = require('mime');\n`;
        reqLine = reqLine + `const fs = require('fs');\n`;
        reqLine = reqLine + `const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')\n\n`
        reqLine = reqLine + `const Case = require('../../models/uploads/case.model')\n`
	reqLine = reqLine + `const caseHistory = require('../data_entry/case_history.controller')\n`  
  	reqLine = reqLine + `const Subclient = require('../../models/administration/subclient.model')\n`  
        reqLine = reqLine + `const UserSubclientAccess = require('../../models/administration/user_subclient_access.model')\n`        	    
        reqLine = reqLine + `const mailSend = require('../mails/send_mail.controller')\n\n`        	    
        return reqLine;         
    }

    function getCreateLines(){
        let componentFields = req.body.componentFields;

        let createLines = `exports.create=(req,res)=>{\n`;
        createLines = createLines + `if(!req.body.case){\n`;
        createLines = createLines + `   res.status(400).json({message:"Case Id is Mandatory"})\n`;
        createLines = createLines + `}\n`;
        for(let componentField of componentFields){
            if((componentField.lhsRhs =='LHS' || componentField.lhsRhs=='BOTH') && componentField.mandatory=='MANDATORY'){
                createLines = createLines + `   if(!req.body.${componentField.name}){\n`;
                createLines = createLines + `       res.status(400).json({message:'${componentField.label} required'})\n`;
                createLines = createLines + `   }\n`;
            }
        }        
        createLines = createLines + `   if(!req.body.status){\n`;
        createLines = createLines + `       res.status(400).json({message:'Status required'})\n`;
        createLines = createLines + `   }\n`;
        createLines = createLines + `   const obj = new ${req.body.name}({\n`
        createLines = createLines + `   case:req.body.case,\n`;
	createLines = createLines +  `  personalDetailsData:req.body.personalDetails,\n`    
        createLines = createLines + `   component:req.body.component ==null ? "${componentFields[0].component}":req.body.component,\n`;
        for(let  componentField of componentFields){
            if(componentField.lhsRhs=='RHS' || componentField.lhsRhs=='BOTH'){
                createLines = createLines + `       ${componentField.name}:req.body.${componentField.name},\n`
                createLines = createLines + `       ${componentField.name}Rhs:null,\n`
            }
        }
        createLines = createLines + `       status:req.body.status,\n`; 
//        createLines = createLines + `       comments:req.body.comments,\n`; 
        createLines = createLines + `       modifiedBy:req.user.user_id\n`;
        createLines = createLines + `   });\n`;
        createLines = createLines + `       if(req.body.status == 'DE-COMPLETED'){\n`;
        createLines = createLines + `           obj.dataEntryCompletionDate = new Date()\n`
        createLines = createLines + `       }else{\n`;
        createLines = createLines + `           obj.insufficiencyComments = req.body.insufficiencyComments\n`;
        createLines = createLines + `       }\n`
//        createLines = createLines + `       obj.checkHistory.push({date:Date.now,status:req.body.status,remarks:req.body.insufficiencyComments,user:req.user.userId})\n`
        createLines = createLines + `   obj\n`;
        createLines = createLines + `   .save(obj)\n`;
        createLines = createLines + `   .then(data=>{\n`;
	createLines = createLines + `       caseHistory.create(req.body.case,req.body.component,data._id,'Creating a Check','DE-COMPLETED','Check Created',null,null,null,req.user.user_id)\n`
        createLines = createLines + `       Case\n`
        createLines = createLines + `       .findOne({_id:req.body.case})\n`
        createLines = createLines + `       .then(caseData=>{\n`
        createLines = createLines + `           let checksEntered = 0\n`
        createLines = createLines + `           if(caseData.numberOfChecksEntered != null){\n`
        createLines = createLines + `              checksEntered = caseData.numberOfChecksEntered\n`
        createLines = createLines + `           }\n`
        createLines = createLines + `           checksEntered = checksEntered + 1\n`
        createLines = createLines + `           Case\n`
        createLines = createLines + `           .findOneAndUpdate({_id:req.body.case},{numberOfChecksEntered:checksEntered})\n`
        createLines = createLines + `           .then(caseUpdateData=>{\n`
        createLines = createLines + `           })\n`
        createLines = createLines + `           .catch(caseUpdateErr=>{\n`
        createLines = createLines + `           })\n`
        createLines = createLines + `   })\n`
        createLines = createLines + `   .catch(caseErr=>{\n`
        createLines = createLines + `        console.log("Error in saving case",caseErr)\n`
        createLines = createLines + `   })\n`
        createLines = createLines + `   Case\n`
        createLines = createLines + `   .update({_id:req.body.case},{$push:{actualComponents:"${req.body.name}"}})\n`
        createLines = createLines + `   .then(data=>{\n`
        createLines = createLines + `       console.log("Updated the case ",data)\n`
        createLines = createLines + `   })\n`
        createLines = createLines + `   .catch(err=>{\n`
        createLines = createLines + `      console.log("Error updating case ",data.caseId)\n`
        createLines = createLines + `   })\n`
        createLines = createLines + `       res.json(data)\n`;
        createLines = createLines + `   })\n`
        createLines = createLines + `   .catch(err=>{\n`;
        createLines = createLines + `       res.status(500).json({\n`;
        createLines = createLines + `          message:err.message || 'Some error while saving ${req.body.name}'\n`;
        createLines = createLines + `       })\n`;
        createLines = createLines + `   })\n`;
        createLines = createLines +`};\n`;
        return createLines;

//        createLines = createLines + `       const obj = new ${req.body.name}({`;
        
    }
    function getFindAllForACaseLines(){
        let findAllForACaseLines = `exports.findAllForACase=(req,res)=>{\n\n`;       
        findAllForACaseLines = findAllForACaseLines + ` ${req.body.name}\n`;
        findAllForACaseLines = findAllForACaseLines + ` .find({case:req.params.case})\n`;
        findAllForACaseLines = findAllForACaseLines + ` .then(data=>{\n`;
        findAllForACaseLines = findAllForACaseLines + `     res.json(data)\n`;
        findAllForACaseLines = findAllForACaseLines + ` })\n`;
        findAllForACaseLines = findAllForACaseLines + ` .catch(err=>{\n`;
        findAllForACaseLines = findAllForACaseLines + `       res.status(500).json({\n`;
        findAllForACaseLines = findAllForACaseLines + `          message:err.message || 'Some error while retrieving ${req.body.name} for cases'\n`;
        findAllForACaseLines = findAllForACaseLines + `       })\n`;        
        findAllForACaseLines = findAllForACaseLines + `   })\n`;
        findAllForACaseLines = findAllForACaseLines +`};\n`;        

        return findAllForACaseLines;

    }
    function getUploadFileLines(){
        let uploadFileLines = `exports.uploadFile=(req,res)=>{\n\n`;
        uploadFileLines = uploadFileLines + `   let componentFile = req.files.componentFile;\n`
        uploadFileLines = uploadFileLines + `   componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/candidatedocs/' + req.body.fileName + '.pdf',function(err){\n`;
        uploadFileLines = uploadFileLines + `       if(err){\n`;
        uploadFileLines = uploadFileLines + `           res.status(500).send({message:"Error uploading the file"});\n`
        uploadFileLines = uploadFileLines + `       }\n`;
        uploadFileLines = uploadFileLines + `       res.json({message:"File uploaded"});\n`;
        uploadFileLines = uploadFileLines + `   });\n`;
        uploadFileLines = uploadFileLines + `};\n`;

        return uploadFileLines;
    }    
    function getUploadProofOfWorkLines(){
        let uploadFileLines = `exports.uploadProofOfWork=(req,res)=>{\n\n`;
        uploadFileLines = uploadFileLines + `   let componentFile = req.files.componentFile;\n`
        uploadFileLines = uploadFileLines + `   componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/proofofwork/' + req.body.fileName + '.pdf',function(err){\n`;
        uploadFileLines = uploadFileLines + `       if(err){\n`;
        uploadFileLines = uploadFileLines + `           res.status(500).send({message:"Error uploading the file"});\n`
        uploadFileLines = uploadFileLines + `       }\n`;
        uploadFileLines = uploadFileLines + `       res.json({message:"File uploaded"});\n`;
        uploadFileLines = uploadFileLines + `   });\n`;
        uploadFileLines = uploadFileLines + `};\n`;

        return uploadFileLines;
    }
    function getUploadPaymentProofLines(){
        let uploadPaymentProofLines = `exports.uploadPaymentProof=(req,res)=>{\n\n`;
        uploadPaymentProofLines = uploadPaymentProofLines + `   let componentFile = req.files.componentFile;\n`
        uploadPaymentProofLines = uploadPaymentProofLines + `   componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/paymentproof/' + req.body.fileName + '.pdf',function(err){\n`;
        uploadPaymentProofLines = uploadPaymentProofLines + `       if(err){\n`;
        uploadPaymentProofLines = uploadPaymentProofLines + `           res.status(500).send({message:"Error uploading the file"});\n`
        uploadPaymentProofLines = uploadPaymentProofLines + `       }\n`;
        uploadPaymentProofLines = uploadPaymentProofLines + `       res.json({message:"File uploaded"});\n`;
        uploadPaymentProofLines = uploadPaymentProofLines + `   });\n`;
        uploadPaymentProofLines = uploadPaymentProofLines + `};\n`;

        return uploadPaymentProofLines;
    }       
    function getDeleteFileLines(){
        let deleteFileLines = `exports.deleteFile=(req,res)=>{\n\n`;
        deleteFileLines = deleteFileLines + `   fs.unlink('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/candidatedocs/' + req.body.fileName + '.pdf',function(err){\n`;
        deleteFileLines = deleteFileLines + `       if(err){\n`;
        deleteFileLines = deleteFileLines + `           res.status(500).send({message:"Error deleting the file"});\n`
        deleteFileLines = deleteFileLines + `       }\n`;
        deleteFileLines = deleteFileLines + `       res.json({message:"File Deleted"});\n`;
        deleteFileLines = deleteFileLines + `   });\n`;
        deleteFileLines = deleteFileLines + `};\n`;

        return deleteFileLines;        
    } 

    function getDeleteProofOfWorkLines(){
        let deleteProofOfWorkLines = `exports.deleteProofOfWork=(req,res)=>{\n`
        deleteProofOfWorkLines = deleteProofOfWorkLines + `fs.unlink('/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/proofofwork/' + req.query.fileName + '.pdf',function(err){\n`
        deleteProofOfWorkLines = deleteProofOfWorkLines + `  if(err){\n`
        deleteProofOfWorkLines = deleteProofOfWorkLines + `    res.status(500).send({message:"Error deleting the file"});\n`
        deleteProofOfWorkLines = deleteProofOfWorkLines = `  }\n`
        deleteProofOfWorkLines = deleteProofOfWorkLines = ` res.json({message:"File Deleted"});\n`
        deleteProofOfWorkLines = deleteProofOfWorkLines = `});\n`
        deleteProofOfWorkLines = deleteProofOfWorkLines = `};\n`
        return deleteProofOfWorkLines
    }
    function getDownloadFileLines(){
        let readFileLines = `exports.downloadFile=(req,res)=>{\n\n`;
        readFileLines = readFileLines + `   let file = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/candidatedocs/' + req.query.fileName + '.pdf';\n`;
        readFileLines = readFileLines + `   res.download(file);\n`
        readFileLines = readFileLines + `};\n`;

        return readFileLines;        
    }   
    function getDownloadProofOfWorkLines(){
        let readProofOfWorkLines = `exports.downloadProofOfWork=(req,res)=>{\n\n`;
        readProofOfWorkLines = readProofOfWorkLines + `   let file = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/proofofwork/' + req.query.fileName + '.pdf';\n`;
        readProofOfWorkLines = readProofOfWorkLines + `   res.download(file);\n`
        readProofOfWorkLines = readProofOfWorkLines + `};\n`;

        return readProofOfWorkLines;               
    }

    function getDownloadPaymentProofLines(){
        let readPaymentProofLines = `exports.downloadPaymentProof=(req,res)=>{\n\n`;
        readPaymentProofLines = readPaymentProofLines + `   let file = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/paymentproof/' + req.query.fileName + '.pdf';\n`;
        readPaymentProofLines = readPaymentProofLines + `   res.download(file);\n`
        readPaymentProofLines = readPaymentProofLines + `};\n`;

        return readPaymentProofLines;        
    }
    function getUploadPvProofOfWorkLines(){
        let uploadPvProofOfWorkLines = `exports.uploadPvProofOfWork=(req,res)=>{\n\n`;
        uploadPvProofOfWorkLines = uploadPvProofOfWorkLines + `   let componentFile = req.files.componentFile;\n`
        uploadPvProofOfWorkLines = uploadPvProofOfWorkLines + `   componentFile.mv('/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/pvproofofwork/' + req.body.fileName + '.pdf',function(err){\n`;
        uploadPvProofOfWorkLines = uploadPvProofOfWorkLines + `       if(err){\n`;
        uploadPvProofOfWorkLines = uploadPvProofOfWorkLines + `           res.status(500).send({message:"Error uploading the file"});\n`
        uploadPvProofOfWorkLines = uploadPvProofOfWorkLines + `       }\n`;
        uploadPvProofOfWorkLines = uploadPvProofOfWorkLines + `       res.json({message:"File uploaded"});\n`;
        uploadPvProofOfWorkLines = uploadPvProofOfWorkLines + `   });\n`;
        uploadPvProofOfWorkLines = uploadPvProofOfWorkLines + `};\n`;

        return uploadPvProofOfWorkLines;        
    }
    function getUpdateLines(){
        let componentFields = req.body.componentFields;

        let updateLines = `exports.update=(req,res)=>{\n`;
        updateLines = updateLines + `if(!req.body._id){\n`;
        updateLines = updateLines + `   res.status(400).json({message:"Id cannot be empty"})\n`;
        updateLines = updateLines + `}\n`;        
        updateLines = updateLines + `if(!req.body.case){\n`;
        updateLines = updateLines + `   res.status(400).json({message:"Case Id is Mandatory"})\n`;
        updateLines = updateLines + `}\n`;
        for(let componentField of componentFields){
            if((componentField.lhsRhs =='LHS' || componentField.lhsRhs=='BOTH') && componentField.mandatory=='MANDATORY'){
                updateLines = updateLines + `   if(!req.body.${componentField.name}){\n`;
                updatetLines = updateLines + `       res.status(400).json({message:'${componentField.label} required'})\n`;
                updateLines = updateLines + `   }\n`;
            }
        }        
        updateLines = updateLines + `   if(!req.body.status){\n`;
        updateLines = updateLines + `       res.status(400).json({message:'Status required'})\n`;
        updateLines = updateLines + `   }\n`;
        updateLines = updateLines + `   ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`
        for(let  componentField of componentFields){
            updateLines = updateLines + `       ${componentField.name}:req.body.${componentField.name},\n`
        } 
        updateLines = updateLines + `   status:req.body.status,\n`;        
        updateLines = updateLines + `   insufficiencyComments:req.body.insufficiencyComments,\n`;        
        updateLines = updateLines + `   dataEntryCompletionDate:req.body.status == 'DE-COMPLETED' ? new Date() : null,\n`;
//        updateLines = updateLines + `   checkHistory:checkHistory.push({date:Date.now,status:req.body.status,remarks:req.body.insufficiencyComments,user:req.user.userId}),\n`;
        updateLines = updateLines + `   modifiedBy:req.user.user_id\n`;
        updateLines = updateLines + `   })\n`;
        updateLines = updateLines + `   .then(data=>{\n`;
        updateLines = updateLines + `              caseHistory.create(req.params.caseId,req.body.component,data._id,'Updating Check',req.body.status,'Check Created',null,null,null,req.user.user_id)\n`
	updateLines = updateLines + `       res.json(data)\n`    
        updateLines = updateLines + `   })\n`
        updateLines = updateLines + `   .catch(err=>{\n`;
        updateLines = updateLines + `       res.status(500).json({\n`;
        updateLines = updateLines + `          message:err.message || 'Some error while saving ${req.body.name}'\n`;
        updateLines = updateLines + `       })\n`;
        updateLines = updateLines + `   })\n`;
        updateLines = updateLines +`};\n`;
        return updateLines;

        
    }   
    function getFindOneLines(){
        let findOneLines = `exports.findOne=(req,res)=>{\n`;        
        findOneLines = findOneLines + `   ${req.body.name}.findOne({case:req.params.caseId,_id:req.params.componentId})\n`;
        findOneLines = findOneLines + `    .then(data=>{\n`;
        findOneLines = findOneLines + `         res.json(data)\n`;
        findOneLines = findOneLines + `     })\n`;
        findOneLines = findOneLines + `    .catch(err=>{\n`;
        findOneLines = findOneLines + `         res.json({\n`;
        findOneLines = findOneLines + `             message:err.message || 'Some error occurred while reading a component'\n`;
        findOneLines = findOneLines + `         })\n`;
        findOneLines = findOneLines + `     })\n`;
        findOneLines = findOneLines + `};\n`
        return findOneLines;
                          
    }
    function getUpdateDataEntryStatusLines(){
        let updateDataEntryStatusLines  = `exports.updateDataEntryStatus=(req,res)=>{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + ` if(req.body.status=='DE-COMPLETED'){\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         status:req.body.status,\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         dataEntryCompletionDate:new Date(),\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         .then(data=>{\n`;
	updateDataEntryStatusLines = updateDataEntryStatusLines + `                        caseHistory.create(req.params.caseId,req.body.component,data._id,'Updating Check',req.body.status,'Check Updated',null,null,null,req.user.user_id)\n`    
        updateDataEntryStatusLines = updateDataEntryStatusLines + `             res.json(data)\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         .catch(err=>{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `             res.status(500).json({\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `                 message:err.message | "Error occurred while updating status during data entry"\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `             })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         })\n`;    
        updateDataEntryStatusLines = updateDataEntryStatusLines + ` }else{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         status:req.body.status,\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         insfficiencyComments:req.body.insufficiencyComments,\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         dataEntryCompletionDate:new Date(),\n`;        
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         .then(data=>{\n`;
	updateDataEntryStatusLines = updateDataEntryStatusLines + `                       caseHistory.create(req.params.caseId,req.body.component,data._id,'Updating Check',req.body.status,'Check Updated',null,null,null,req.user.user_id)\n`    
        updateDataEntryStatusLines = updateDataEntryStatusLines + `             res.json(data)\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         .catch(err=>{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `             res.status(500).json({\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `                 message:err.message | "Error occurred while updating status during data entry"\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `             })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         })\n`;        
        updateDataEntryStatusLines = updateDataEntryStatusLines + ` }\n`
        updateDataEntryStatusLines = updateDataEntryStatusLines + `};\n`;    
        return updateDataEntryStatusLines;
    }

    function getUpdateInputqcStatusLines(){
        let updateInputqcStatusLines  = `exports.updateInputqcStatus=(req,res)=>{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + ` if(req.body.status=='INPUTQC-ACCEPTED'){\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         status:req.body.status,\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         inputqcCompletionDate:new Date(),\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         branchAllocatedTo:req.body.branch,\n`;
//        updateInputqcStatusLines = updateInputqcStatusLines + `         checkHistory:checkHistory.push({date:Date.now,status:req.body.status,remarks:req.body.inputqcComments,user:req.user.userId})\n`;        
        updateInputqcStatusLines = updateInputqcStatusLines + `         })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         .then(data=>{\n`;
	updateInputqcStatusLines = updateInputqcStatusLines + `                          caseHistory.create(req.params.caseId,req.body.component,data._id,'Upadint Input QC Status',req.body.status,'Input QC Status Updated',null,null,null,req.user.user_id)\n`    
        updateInputqcStatusLines = updateInputqcStatusLines + `             res.json(data)\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         .catch(err=>{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `             res.status(500).json({\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `                 message:err.message | "Error occurred while updating status during input qc"\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `             })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         })\n`;    
        updateInputqcStatusLines = updateInputqcStatusLines + ` }else{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         status:req.body.status,\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         inputqcComments:req.body.inputqcComments,\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         inputqcCompletionDate:new Date(),\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         .then(data=>{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `             res.json(data)\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         .catch(err=>{\n`;
	updateInputqcStatusLines = updateInputqcStatusLines + `                         caseHistory.create(req.params.caseId,req.body.component,data._id,'Input QC Updation',req.body.status,req.body.inputqcComments,null,null,null,req.user.user_id)\n`    
        updateInputqcStatusLines = updateInputqcStatusLines + `             res.status(500).json({\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `                 message:err.message | "Error occurred while updating status during input qc"\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `             })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         })\n`;        
        updateInputqcStatusLines = updateInputqcStatusLines + ` }\n`
        updateInputqcStatusLines = updateInputqcStatusLines + `};\n`;    
        return updateInputqcStatusLines;
    } 
    function getReadFileNameLines(){
        let readFileNameLines = `exports.readFileNames=(req,res)=>{\n`;
        readFileNameLines = readFileNameLines + `  let files = new Array()\n`;
        readFileNameLines = readFileNameLines + `  let filePath='/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName  + '/' + req.params.componentId + '/candidatedocs'\n`;
        readFileNameLines = readFileNameLines + `  if(fs.existsSync(filePath)){\n`;
        readFileNameLines = readFileNameLines + `      fs.readdirSync(filePath).forEach(file=>{\n`;
        readFileNameLines = readFileNameLines + `           let indexOfDot = file.lastIndexOf(".")\n`;
        readFileNameLines = readFileNameLines + `           files.push(file.substring(0,indexOfDot))\n`;
        readFileNameLines = readFileNameLines + `       })\n`;
        readFileNameLines = readFileNameLines + `   }\n`
        readFileNameLines = readFileNameLines + `   res.json(files)\n`;
        readFileNameLines = readFileNameLines + `};\n`
        return readFileNameLines;
    }
    function getReadProofOfWorkLines(){
        let readFileNameLines = `exports.readProofOfWorks=(req,res)=>{\n`;
        readFileNameLines = readFileNameLines + `  let files = new Array()\n`;
        readFileNameLines = readFileNameLines + `  let filePath='/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + "/" + req.params.componentId + '/proofofwork'\n`;
        readFileNameLines = readFileNameLines + `  if(fs.existsSync(filePath)){\n`;
        readFileNameLines = readFileNameLines + `      fs.readdirSync(filePath).forEach(file=>{\n`;
        readFileNameLines = readFileNameLines + `           let indexOfDot = file.lastIndexOf(".")\n`;
        readFileNameLines = readFileNameLines + `           files.push(file.substring(0,indexOfDot))\n`;
        readFileNameLines = readFileNameLines + `       })\n`;
        readFileNameLines = readFileNameLines + `   }\n`
        readFileNameLines = readFileNameLines + `   res.json(files)\n`;
        readFileNameLines = readFileNameLines + `};\n`
        return readFileNameLines;
    } 
    function getReadPaymentProofFileNameLines(){
        let readPaymentProofFileNameLines = `exports.readPaymentProofs=(req,res)=>{\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `  let files = new Array()\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `  let filePath='/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + "/" + req.params.componentId + '/paymentproof'\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `  if(fs.existsSync(filePath)){\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `      fs.readdirSync(filePath).forEach(file=>{\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `           let indexOfDot = file.lastIndexOf(".")\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `           files.push(file.substring(0,indexOfDot))\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `       })\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `   }\n`
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `   res.json(files)\n`;
        readPaymentProofFileNameLines = readPaymentProofFileNameLines + `};\n`
        return readPaymentProofFileNameLines;        
    }
    function getFindComponentsForLines(){
        let findComponentsForLines = `exports.findComponentsFor=(req,res)=>{\n`;
        findComponentsForLines = findComponentsForLines + ` let query;\n`;
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='INPUTQC'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'DE-COMPLETED'},{status:'INPUTQC-REJECTED'}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='VERIFICATION'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'INPUTQC-ACCEPTED',verificationAllocatedTo:req.user_userId},{status:'MENTOR-REVIEW-REJECTED',verificationAllocatedTo:req.user_userId},{status:"OUTPUTQC-REJECTED",verificationAllocatedTo:req.user_userId},{status:'FE-COMPLETED'},{status:"FE-INSUF"},{status:'FE-COULD-NOT-VERIFY'}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='VERIFICATION-TL'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'INPUTQC-ACCEPTED',branchAllocatedTo:{$ne:null}},{status:'MENTOR-REVIEW-REJECTED',branchAllocatedTo:{$ne:null}},{status:"OUTPUTQC-REJECTED",verificationAllocatedTo:{$ne:null}},{status:'FE-COMPLETED',branchAllocatedTo:{$ne:null}},{status:"FE-INSUF",branchAllocatedTo:{$ne:null}},{status:'FE-COULD-NOT-VERIFY',branchAllocatedTo:{$ne:null}}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='FE-TL'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'ALLOCATE-TO-FE'},{status:'ALLOCATED-TO-FE'}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                        
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='FE-VERIFICATION'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'ALLOCATED-TO-FE',allocatedToFE:req.user.user_id},{status:'VERIFIER-REJECTED',allocatedToFE:req.user.user_id},{status:'ALLOCATE-TO-FE',allocatedToFE:null}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='FE-VERIFIED'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'FE-COMPLETED'},{status:"FE-INSUF"},{status:'FE-COULD-NOT-VERIFY'}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='VENDOR-MANAGER'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'ALLOCATE-TO-VENDOR'},{status:'ALLOCATED-TO-VENDOR'}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                        
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='VENDOR-VERIFICATION'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'ALLOCATED-TO-VENDOR',allocatedToVendor:req.user.user_id},{status:'VERIFIER-REJECTED',allocatedToVendor:req.user.user_id}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='VENDOR-VERIFIED'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={$or:[{status:'VENDOR-COMPLETED'},{status:"VENDOR-INSUF"},{status:'VENDOR-COULD-NOT-VERIFY'}]}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='MENTOR-REVIEW'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={status:'VERIFICATION-COMPLETED'}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                        
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='OUTPUTQC'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={status:'MENTOR-REVIEW-ACCEPTED'}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                               
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='WORD-REPORT-DOWNLOAD'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={status:'OUTPUTQC-ACCEPTED'}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`                                       
        findComponentsForLines = findComponentsForLines + ` if(req.params.for=='UPDATE-LHS'){\n`;
        findComponentsForLines = findComponentsForLines + `     query={status:'UPDATE-LHS'}\n`
        findComponentsForLines = findComponentsForLines + ` }\n`	    

        findComponentsForLines = findComponentsForLines + `    ${req.body.name}.find(query)\n`;
//        findComponentsForLines = findComponentsForLines + `        .limit(200)\n`	    
        findComponentsForLines = findComponentsForLines + `       .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})\n`;
        findComponentsForLines = findComponentsForLines + `       .populate({path:'allocatedToFE'})\n`;
        findComponentsForLines = findComponentsForLines + `       .populate({path:'allocatedToVendor'})\n`;
        findComponentsForLines = findComponentsForLines + `       .populate({path:'verificationAllocatedTo'})\n`;        
	findComponentsForLines = findComponentsForLines + `       .populate({path:'personalDetailsData'})\n`    
        findComponentsForLines = findComponentsForLines + `       .lean()\n`;                
        findComponentsForLines = findComponentsForLines + `       .then(data=>{\n`;
        findComponentsForLines = findComponentsForLines + `              res.json(data)\n`                        
        findComponentsForLines = findComponentsForLines + `        })\n`                        
        findComponentsForLines = findComponentsForLines + `       .catch(err=>{\n`;
        findComponentsForLines = findComponentsForLines + `           res.status(500).json({\n`;
        findComponentsForLines = findComponentsForLines + `               message:'Error reading checks'\n`;
        findComponentsForLines = findComponentsForLines + `           })\n`;
        findComponentsForLines = findComponentsForLines + `       })\n`;        
        findComponentsForLines = findComponentsForLines + `       let getPersonalDetails = function(item){\n`;                                
        findComponentsForLines = findComponentsForLines + `          return new Promise((resolve,reject)=>{\n`;                
        findComponentsForLines = findComponentsForLines + `                 PersonalDetailsData\n`
        findComponentsForLines = findComponentsForLines + `                 .findOne({case:item.case._id})\n`
        findComponentsForLines = findComponentsForLines + `                 .then(personalDetailsData=>{\n`   
        findComponentsForLines = findComponentsForLines + `                     if(personalDetailsData != null){\n`   
        findComponentsForLines = findComponentsForLines + `                        console.log("Personal Details is not null",personalDetailsData)\n`                     
        findComponentsForLines = findComponentsForLines + `                        item["dateofbirth"]=personalDetailsData.dateofbirth\n`        
        findComponentsForLines = findComponentsForLines + `                        item["fathername"]=personalDetailsData.fathername\n`                
        findComponentsForLines = findComponentsForLines + `                        item["mobilenumber"]=personalDetailsData.mobilename\n`    
        findComponentsForLines = findComponentsForLines + `                        console.log("item contains ",item.dateofbirth)\n`                                
        findComponentsForLines = findComponentsForLines + `                        resolve(item)\n`                                        
        findComponentsForLines = findComponentsForLines + `                     }\n`                                        
        findComponentsForLines = findComponentsForLines + `                 })\n`                                
        findComponentsForLines = findComponentsForLines + `                .catch(err=>{\n`                
        findComponentsForLines = findComponentsForLines + `                    console.log("Error ",err)\n`;                                        
        findComponentsForLines = findComponentsForLines + `                    reject()`               
        findComponentsForLines = findComponentsForLines + `                 })\n`                
        findComponentsForLines = findComponentsForLines + `          })\n`;                                                
        findComponentsForLines = findComponentsForLines + `       }\n`;                                                        
        findComponentsForLines = findComponentsForLines + `};\n`;
        return findComponentsForLines;
    }
    function getFindComponentsForVendorManagerLines(){
	let findComponentsForVendorManagerLines = `exports.findComponentsForVendorManager=(req,res)=>{\n`
	findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    let page = req.query.pageCount;\n`    
	findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    let offSet = page * 200;\n`
	findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    let count = 0;\n`    
	findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    ${req.body.name}\n`
	findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    .count({status:req.params.status})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    .then(data=>{\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `      count = data\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    })\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    .catch(err=>{\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `       res.status(500).json({\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `          message:'Error reading checks'\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `       })\n`        
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    })\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `    ${req.body.name}.find({status:req.params.status})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .sort({_id:1})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .skip(offSet)\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .limit(200)\n` 
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .populate({path:'allocatedToFE'})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .populate({path:'allocatedToVendor'})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .populate({path:'verificationAllocatedTo'})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .populate({path:'personalDetailsData'})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .lean()\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .then(data=>{\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                        res.json({totalCount:count,res:data})\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    })\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                    .catch(err=>{\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                         res.status(500).json({\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                            message:'Error reading checks'\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                         })\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `                   })\n`
        findComponentsForVendorManagerLines = findComponentsForVendorManagerLines + `}\n`    
	return findComponentsForVendorManagerLines;    
    }
    function getFindUnallocatedComponentsForVerificationLines(){
        let findUnallocatedComponentsForVerificationLines = `exports.findUnallocatedComponentsForVerification=(req,res)=>{\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + ` let query={$or:[{status:'INPUTQC-ACCEPTED',branchAllocatedTo:null},{status:'MENTOR-REVIEW-REJECTED',verificationAllocatedTo:req.user_userId,branchAllocatedTo:null},{status:'OUTPUTQC-REJECTED',verificationAllocatedTo:req.user_userId,branchAllocatedTo:null},{status:'FE-COMPLETED',verificationAllocatedTo:req.user.user_id,branchAllocatedTo:null},{status:"FE-INSUF",verificationAllocatedTo:req.user.user_id,branchAllocatedTo:null},{status:'FE-COULD-NOT-VERIFY',verificationAllocatedTo:req.user.user_id,branchAllocatedTo:null}]}\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `    ${req.body.name}.find(query)\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       .populate({path:'allocatedToFE'})\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       .populate({path:'allocatedToVendor'})\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       .populate({path:'verificationAllocatedTo'})\n`; 
	findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       .populate({path:'personalDetailsData'})\n`    
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       .lean()\n`;         
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       .then(data=>{\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `            res.json(data)\n`                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `        })\n`                        
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       .catch(err=>{\n`;
	findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `           console.log('Error is',err)\n`     
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `           res.status(500).json({\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `               message:'Error reading checks'\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `           })\n`;
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       })\n`;        
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       let getPersonalDetails = function(item){\n`;                                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `          return new Promise((resolve,reject)=>{\n`;                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                 PersonalDetailsData\n`
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                 .findOne({case:item.case._id})\n`
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                 .then(personalDetailsData=>{\n`   
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                     if(personalDetailsData != null){\n`   
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                        console.log("Personal Details is not null",personalDetailsData)\n`                     
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                        item["dateofbirth"]=personalDetailsData.dateofbirth\n`        
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                        item["fathername"]=personalDetailsData.fathername\n`                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                        item["mobilenumber"]=personalDetailsData.mobilename\n`    
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                        console.log("item contains ",item.dateofbirth)\n`                                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                        resolve(item)\n`                                        
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                     }\n`                                        
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                 })\n`                                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                .catch(err=>{\n`                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                    console.log("Error ",err)\n`;                                        
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                    reject()`               
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `                 })\n`                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `          })\n`;                                                
        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `       }\n`;                                                        

        findUnallocatedComponentsForVerificationLines = findUnallocatedComponentsForVerificationLines + `};\n`;
        return findUnallocatedComponentsForVerificationLines;
    }
    function getUpdateVerificationStatusLines(){
        let componentFields = req.body.componentFields;
        let updateVerificationStatusLines  = `exports.updateVerificationStatus=(req,res)=>{\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + ` if(req.body.status=='VERIFICATION-COMPLETED' || req.body.verificationStatus=='FE-COMPLETED'){\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        for(let  componentField of componentFields){
            updateVerificationStatusLines = updateVerificationStatusLines + `       ${componentField.name}Rhs:req.body.${componentField.name}Rhs,\n`
        }
        updateVerificationStatusLines = updateVerificationStatusLines + `         status:req.body.status,\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         verificationCompletionDate:new Date(),\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         grade:req.body.grade,\n`;        
        updateVerificationStatusLines = updateVerificationStatusLines + `         grade1:req.body.grade,\n`;        
        updateVerificationStatusLines = updateVerificationStatusLines + `         gradingComments:req.body.gradingComments,\n`;        
        updateVerificationStatusLines = updateVerificationStatusLines + `         interimOrFinal:req.body.interimOrFinal,\n`;        
        updateVerificationStatusLines = updateVerificationStatusLines + `         mode:req.body.mode,\n`;        
        updateVerificationStatusLines = updateVerificationStatusLines + `         personContacted:req.body.personContacted,\n`;                
        updateVerificationStatusLines = updateVerificationStatusLines + `         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted,\n`;                        
        updateVerificationStatusLines = updateVerificationStatusLines + `         })\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         .then(data=>{\n`;
	updateVerificationStatusLines = updateVerificationStatusLines + `            caseHistory.create(req.params.caseId,req.body.component,data._id,'Verification Completed',req.body.status,req.body.gradingComments,null,null,null,req.user.user_id)\n`    
        updateVerificationStatusLines = updateVerificationStatusLines + `             res.json(data)\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         })\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         .catch(err=>{\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `             res.status(500).json({\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `                 message:err.message | "Error occurred while updating status during input qc"\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `             })\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         })\n`;    
        updateVerificationStatusLines = updateVerificationStatusLines + ` }else{\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         status:req.body.status,\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         insufficiencyRaisedDate:new Date(),\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         insufficiencyComments:req.body.insufficiencyComments,\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         })\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         .then(data=>{\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `             caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuff 2 Raised',req.body.status,req.body.insufficiencyComments,null,null,null,req.user.user_id)\n`	    
        updateVerificationStatusLines = updateVerificationStatusLines + `             res.json(data)\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         })\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         .catch(err=>{\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `             res.status(500).json({\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `                 message:err.message | "Error occurred while updating status during input qc"\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `             })\n`;
        updateVerificationStatusLines = updateVerificationStatusLines + `         })\n`;        
        updateVerificationStatusLines = updateVerificationStatusLines + ` }\n`
        updateVerificationStatusLines = updateVerificationStatusLines + `};\n`;    
        return updateVerificationStatusLines;
    }
    function getUpdateFeVerificationStatusLines(){
        let componentFields = req.body.componentFields;
        let updateFeVerificationStatusLines  = `exports.updateFeVerificationStatus=(req,res)=>{\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        for(let  componentField of componentFields){
            updateFeVerificationStatusLines = updateFeVerificationStatusLines + `       ${componentField.name}Rhs:req.body.${componentField.name}Rhs,\n`
        }
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         status:req.body.status,\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         feVerificationCompletionDate:new Date(),\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         feInsufficiencyComments:req.body.feInsufficiencyComments,\n`;        
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         personContacted:req.body.personContacted,\n`;                
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted\n`;                        
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         })\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         .then(data=>{\n`;
	updateFeVerificationStatusLines = updateFeVerificationStatusLines + `             caseHistory.create(req.params.caseId,req.body.component,data._id,'FE Verification Completion',req.body.status,req.body.status == 'FE-INSUF'? req.body.feInsufficiencyComments:"Completed by FE" ,null,null,null,req.user.user_id)\n`    
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `             res.json(data)\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         })\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         .catch(err=>{\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `             res.status(500).json({\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `                 message:err.message | "Error occurred while updating status during input qc"\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `             })\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         })\n`;    
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `};\n`;    
        return updateFeVerificationStatusLines;
    }    
    function getUpdateVendorVerificationStatusLines(){
        let componentFields = req.body.componentFields;
        let updateFeVerificationStatusLines  = `exports.updateVendorVerificationStatus=(req,res)=>{\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        for(let  componentField of componentFields){
            updateFeVerificationStatusLines = updateFeVerificationStatusLines + `       ${componentField.name}Rhs:req.body.${componentField.name}Rhs,\n`
        }
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         status:req.body.status,\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         vendorVerificationCompletionDate:new Date(),\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         vendorInsufficiencyComments:req.body.vendorInsufficiencyComments,\n`;        
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         personContacted:req.body.personContacted,\n`;                
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted\n`;                        
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         })\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         .then(data=>{\n`;
	updateFeVerificationStatusLines = updateFeVerificationStatusLines + `             caseHistory.create(req.params.caseId,req.body.component,data._id,'Vendor Verification Completion',req.body.status,req.body.status == 'VENDOR-INSUF'? req.body.vendorInsufficiencyComments:"Completed by Vendor" ,null,null,null,req.user.user_id)\n`    
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `             res.json(data)\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         })\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         .catch(err=>{\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `             res.status(500).json({\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `                 message:err.message | "Error occurred while updating status during input qc"\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `             })\n`;
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `         })\n`;    
        updateFeVerificationStatusLines = updateFeVerificationStatusLines + `};\n`;    
        return updateFeVerificationStatusLines;        
    }
    function getUpdateVerifierReviewStatusLines(){
        let componentFields = req.body.componentFields;
        let updateVerificationReviewStatusLines = `exports.updateVerifierReviewStatus=(req,res)=>{\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines +`     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;        
        for(let  componentField of componentFields){
            updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `       ${componentField.name}Rhs:req.body.${componentField.name}Rhs,\n`            
        }
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         status:req.body.status,\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         verificationCompletionDate:req.body.verifierReviewStatus == 'VERIFICATION-COMPLETED' ? new Date():null,\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         verifierReviewStatus:req.body.verifierReviewStatus,\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         verifierReviewComments:req.body.verifierReviewComments,\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         grade:req.body.grade,\n`;        
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         grade1:req.body.grade,\n`;        
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         gradingComments:req.body.gradingComments,\n`;        
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         personContacted:req.body.personContacted,\n`;                
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted\n`;                                
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         })\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         .then(data=>{\n`;
	updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `            caseHistory.create(req.params.caseId,req.body.component,data._id,'Verification Status Update',req.body.status,req.body.status == 'VERIFICATION-COMPLETED'? req.body.gradingComments:req.body.verifierReviewComments ,null,null,null,req.user.user_id)\n`    
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `             res.json(data)\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         })\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         .catch(err=>{\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `             res.status(500).json({\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `                 message:err.message | "Error occurred while updating status during input qc"\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `             })\n`;
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `         })\n`;    
        updateVerificationReviewStatusLines = updateVerificationReviewStatusLines + `};\n`;        

        return updateVerificationReviewStatusLines
    }
    function getUpdateMentorReviewStatusLines(){
        let updateMentorReviewStatusLines = `exports.updateMentorReviewStatus=(req,res)=>{\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         status:req.body.status,\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         mentorReviewCompletionDate:new Date(),\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         mentorReviewComments:req.body.mentorReviewComments,\n`;        
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         mentorReviewCompletedBy:req.user.user_id\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         })\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         .then(data=>{\n`;
	updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                        caseHistory.create(req.params.caseId,req.body.component,data._id,'Mentor Review',req.body.status,req.body.status == 'MENTOR-REVIEW-REJECTED'? req.body.mentorReviewComments:"Mentor Review Accepted" ,null,null,null,req.user.user_id)\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `              if(data.grade == "602f8b3743383ec9a722496f"){\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                  SubclientNotification\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                  .findOne({subclient:data.subclient,triggerStatus:"CHECK-OUTPUTQC-ACCEPTED"})\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                  .populate({path:'template'})\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                  .populate({path:'subclient'})\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                  .then(subclientNotificationData=>{\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                       if(subclientNotificationData != null && subclientNotificationData.subclient.email != null){\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `	                   Case\n`
	    updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                          .findOne({_id:req.params.caseId})\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                          .then(caseData=>{\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                               console.log("Case Data Obtained")\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                               let subject =subclientNotificationData.template.subject\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                               let changedSubject  = subject.replace('CASE-ID',caseData.caseId)\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                               let mailText = subclientNotificationData.template.content\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + '                               let checkDetails = <table border=1px><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Comments</td></tr><tr><td>' + 'caseData.caseId' + '</td><td>' + 'caseData.candidateName' + '</td><td>Address Details</td><td>' + 'data.gradingComments' + '</td></tr></table>\n'
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                               let changedMailText = mailText.replace('&lt;&lt;DISCREPANCY-TABLE&gt;&gt;',checkDetails)\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                               let mailSent = mailSend.sendMail(subclientNotificationData.subclient.email,changedSubject,changedMailText)\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                               res.json(data)\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                           })\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                           .catch(err=>{\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                                 res.status(500).json({message:"Mail Could not be sent - Error Reading Case" + err})\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                           })\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                        }\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                   })\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                   .catch(error=>{\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                        res.status(500).json({message:"Mail Could not be sent - Error Reading Subclient Notification"})\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + ` 	            })\n`	
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `               }else{\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `	            res.json(data)\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `               }\n`
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         })\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         .catch(err=>{\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `             res.status(500).json({\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `                 message:err.message | "Error occurred while updating status during mentor review"\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `             })\n`;
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `         })\n`;    
        updateMentorReviewStatusLines = updateMentorReviewStatusLines + `};\n`;            
        return updateMentorReviewStatusLines;
    }
    function getUpdateOutputqcStatusLines(){
        let updateOutputqcStatusLines = `exports.updateOutputqcStatus=(req,res)=>{\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         status:req.body.status,\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         outputqcCompletionDate:new Date(),\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         outputqcComments:req.body.outputqcComments,\n`;        
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         outputqcCompletedBy:req.user.user_id\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         })\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         .then(data=>{\n`;
	updateOutputqcStatusLines = updateOutputqcStatusLines + `            caseHistory.create(req.params.caseId,req.body.component,data._id,'Output QC Status Updation',req.body.status,req.body.status == 'OUTPUTQC-REJECTED'? req.body.outputqcComments:"" ,null,null,null,req.user.user_id)\n`    
        updateOutputqcStatusLines = updateOutputqcStatusLines + `             res.json(data)\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         })\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         .catch(err=>{\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `             res.status(500).json({\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `                 message:err.message | "Error occurred while updating status during output qc"\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `             })\n`;
        updateOutputqcStatusLines = updateOutputqcStatusLines + `         })\n`;    
        updateOutputqcStatusLines = updateOutputqcStatusLines + `};\n`;            
        return updateOutputqcStatusLines;        
    }
    function getGetAllChecksAllocatedToMeForVerificationLines(){
        let getAllChecksAllocatedToMeForVerificationLines = `exports.getAllChecksAllocatedToMeForVerification=(req,res)=>{\n\n`;       
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + ` ${req.body.name}\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + ` .find({$or:[{status:'INPUTQC-ACCEPTED',verificationAllocatedTo:req.user.user_id},{status:'MENTOR-REVIEW-REJECTED',verificationAllocatedTo:req.user.user_id},{status:'OUTPUTQC-REJECTED',verificationAllocatedTo:req.user.user_id}]})\n`;
   
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})\n`
	getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `.populate({path:'personalDetailsData'})\n`    
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `.lean()\n`        
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + ` .then(data=>{\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `     res.json(data)\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + ` })\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + ` .catch(err=>{\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `       res.status(500).json({\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `          message:err.message || 'Some error while retrieving ${req.body.name} for cases'\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `       })\n`;        
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `   })\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines +`};\n`;        
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `      let getPersonalDetails = function(item){\n`        
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `          return new Promise((resolve,reject)=>{\n`                
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                 PersonalDetailsData\n`
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                 .findOne({case:item.case._id})\n`
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                 .then(personalDetailsData=>{\n`   
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                     if(personalDetailsData != null){\n`   
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                        console.log("Personal Details is not null",personalDetailsData)\n`                     
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                        item["dateofbirth"]=personalDetailsData.dateofbirth\n`        
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                        item["fathername"]=personalDetailsData.fathername\n`                
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                        item["mobilenumber"]=personalDetailsData.mobilename\n`
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                     }\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                     resolve(item)`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                   })\n`;        
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                   .catch(err=>{\n`;
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                       reject()\n`
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `                   })\n`;        
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `           })\n`;                
        getAllChecksAllocatedToMeForVerificationLines = getAllChecksAllocatedToMeForVerificationLines + `       }\n`;                        

        return getAllChecksAllocatedToMeForVerificationLines;

    }
 
    function getDeleteCheckLines(){
        let deleteCheckLines = `exports.deleteCheck=(req,res)=>{\n`;
        deleteCheckLines = deleteCheckLines + `   ${req.body.name}.findOneAndDelete({case:req.params.caseId,_id:req.params.componentId})\n`;
        deleteCheckLines = deleteCheckLines + `                   .then(data=>{\n`;
	deleteCheckLines = deleteCheckLines + `                                              caseHistory.create(req.params.casieId,req.body.component,data._id,'Deleting a check','Check Deleted','Check Deleted',null,null,null,req.user.user_id)\n`    
        deleteCheckLines = deleteCheckLines + `                         res.json(data)\n`;
        deleteCheckLines = deleteCheckLines + `                    })\n`;                 
        deleteCheckLines = deleteCheckLines + `                   .catch(err=>{\n`;
        deleteCheckLines = deleteCheckLines + `                         res.json({\n`;
        deleteCheckLines = deleteCheckLines + `                              message:err.message || 'Some error occurred while reading a component'\n`;
        deleteCheckLines = deleteCheckLines + `                          })\n`;
        deleteCheckLines = deleteCheckLines + `                    })\n`;
        deleteCheckLines = deleteCheckLines + `};\n`        
        return deleteCheckLines;
    }    


   
/*    function getFindOneWithInputqcStatusLines(){
        let findOneWithInputqcStatusLines = `exports.findWithInputqcStatus=(req,res)=>{\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `    ${req.body.name}.find({inputqcStatus:req.params.inputqcStatus})\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `       .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `       .then(data=>{\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `           res.json(data)\n`
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `       })\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `       .catch(err=>{\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `           res.status(500).json({\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `               message:'Error reading checks'\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `           })\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `       })\n`;
        findOneWithInputqcStatusLines = findOneWithInputqcStatusLines + `};\n`;
        return findOneWithInputqcStatusLines;
    } */
    


	    


    function getApproveInsuff2Lines(){
        let approveInsuff2Lines  = `exports.approveInsuff2=(req,res)=>{\n`;        
        approveInsuff2Lines = approveInsuff2Lines + ` ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        approveInsuff2Lines = approveInsuff2Lines + `     status:'INSUF-2-REQ-ACCEPTED',\n`
        approveInsuff2Lines = approveInsuff2Lines + `     scrutinyApprovedBy:req.user.user_id,\n`
//        approveInsuff2Lines = approveInsuff2Lines + `     checkHistory:checkHistory.push({date:Date.now,status:req.body.status,remarks:'Scrutiny Approved',user:req.user.userId})\n`;                        
        approveInsuff2Lines = approveInsuff2Lines + `   })\n`;      
        approveInsuff2Lines = approveInsuff2Lines + `   .then(data=>{\n`;
	approveInsuff2Lines = approveInsuff2Lines + `               caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuff Level 2 Approved','INSUF-2-REQ-ACCEPTED',"Insuf 2 request Accepted" ,null,null,null,req.user.user_id)\n`    
        approveInsuff2Lines = approveInsuff2Lines + `       res.json(data)\n`;
        approveInsuff2Lines = approveInsuff2Lines + `    })\n`;
        approveInsuff2Lines = approveInsuff2Lines + `   .catch(err=>{\n`;
        approveInsuff2Lines = approveInsuff2Lines + `       res.status(500).json({\n`;
        approveInsuff2Lines = approveInsuff2Lines + `           message:err.message | "Error occurred while updating status during input qc"\n`;
        approveInsuff2Lines = approveInsuff2Lines + `       })\n`;
        approveInsuff2Lines = approveInsuff2Lines + `   })\n`;          
        approveInsuff2Lines = approveInsuff2Lines + `};\n`;            
        return approveInsuff2Lines;
    }
    function getApproveInsuffClearanceLines(){
        let approveInsuff2Lines  = `exports.approveInsuffClearance=(req,res)=>{\n`;        
        approveInsuff2Lines = approveInsuff2Lines + ` ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        approveInsuff2Lines = approveInsuff2Lines + `     status:'INPUTQC-ACCEPTED',\n`
        approveInsuff2Lines = approveInsuff2Lines + `     insufficiencyClearedDate:Date.now(),\n`
//        approveInsuff2Lines = approveInsuff2Lines + `     checkHistory:checkHistory.push({date:Date.now,status:req.body.status,remarks:'Scrutiny Approved Clearance',user:req.user.userId})\n`;                        
        approveInsuff2Lines = approveInsuff2Lines + `   })\n`;      
        approveInsuff2Lines = approveInsuff2Lines + `   .then(data=>{\n`;
        approveInsuff2Lines = approveInsuff2Lines + `       res.json(data)\n`;
        approveInsuff2Lines = approveInsuff2Lines + `    })\n`;
        approveInsuff2Lines = approveInsuff2Lines + `   .catch(err=>{\n`;
        approveInsuff2Lines = approveInsuff2Lines + `       res.status(500).json({\n`;
        approveInsuff2Lines = approveInsuff2Lines + `           message:err.message | "Error occurred while updating status during input qc"\n`;
        approveInsuff2Lines = approveInsuff2Lines + `       })\n`;
        approveInsuff2Lines = approveInsuff2Lines + `   })\n`;          
        approveInsuff2Lines = approveInsuff2Lines + `};\n`;            
        return approveInsuff2Lines;
    }

    function getRejectInsuff2Lines(){
        let rejectInsuff2Lines  = `exports.rejectInsuff2=(req,res)=>{\n`;        
        rejectInsuff2Lines = rejectInsuff2Lines + ` ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        rejectInsuff2Lines = rejectInsuff2Lines + `     status:'INPUTQC-ACCEPTED',\n`
        rejectInsuff2Lines = rejectInsuff2Lines + `     insufficiencyRejectionComments:req.body.insufficiencyRejectionComments,\n`
//        rejectInsuff2Lines = rejectInsuff2Lines + `     checkHistory:checkHistory.push({date:Date.now,status:req.body.status,remarks:req.body.insufficiencyRejectionComments,user:req.user.userId})\n`;                                
        rejectInsuff2Lines = rejectInsuff2Lines + `   })\n`;      
        rejectInsuff2Lines = rejectInsuff2Lines + `   .then(data=>{\n`;
	rejectInsuff2Lines = rejectInsuff2Lines + `        caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf Request Rejection','Insuf Request Rejected',req.body.insufficiencyRejectionComments ,null,null,null,req.user.user_id)\n`    
        rejectInsuff2Lines = rejectInsuff2Lines + `       res.json(data)\n`;
        rejectInsuff2Lines = rejectInsuff2Lines + `    })\n`;
        rejectInsuff2Lines = rejectInsuff2Lines + `   .catch(err=>{\n`;
        rejectInsuff2Lines = rejectInsuff2Lines + `       res.status(500).json({\n`;
        rejectInsuff2Lines = rejectInsuff2Lines + `           message:err.message | "Error occurred while updating status during input qc"\n`;
        rejectInsuff2Lines = rejectInsuff2Lines + `       })\n`;
        rejectInsuff2Lines = rejectInsuff2Lines + `   })\n`;          
        rejectInsuff2Lines = rejectInsuff2Lines + `};\n`;            
        return rejectInsuff2Lines;
    }    

    function getClearInsuff2Lines(){
        let clearInsuff2Lines  = `exports.clearInsuff2=(req,res)=>{\n`;        
        clearInsuff2Lines = clearInsuff2Lines + ` ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        clearInsuff2Lines = clearInsuff2Lines + `     status:'INSUF-2-CLEARED',\n`
        clearInsuff2Lines = clearInsuff2Lines + `     clientClearedBy:req.user.user_id,\n`
        clearInsuff2Lines = clearInsuff2Lines + `     insufficiencyClearedComments:req.body.insufficiencyClearedComments,\n`	    
//        clearInsuff2Lines = clearInsuff2Lines + `     checkHistory:checkHistory.push({date:Date.now,status:req.body.status,remarks:'Insuff Cleared by Client',user:req.user.userId})\n`;                                        
        clearInsuff2Lines = clearInsuff2Lines + `   })\n`;      
        clearInsuff2Lines = clearInsuff2Lines + `   .then(data=>{\n`;
        clearInsuff2Lines = clearInsuff2Lines + `              caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf 2 Cleared','INSUF-2-CLEARED',req.body.insufficiencyClearedComments ,null,null,null,req.user.user_id)\n`	    
        clearInsuff2Lines = clearInsuff2Lines + `       res.json(data)\n`;
        clearInsuff2Lines = clearInsuff2Lines + `    })\n`;
        clearInsuff2Lines = clearInsuff2Lines + `   .catch(err=>{\n`;
        clearInsuff2Lines = clearInsuff2Lines + `       res.status(500).json({\n`;
        clearInsuff2Lines = clearInsuff2Lines + `           message:err.message | "Error occurred while updating status during input qc"\n`;
        clearInsuff2Lines = clearInsuff2Lines + `       })\n`;
        clearInsuff2Lines = clearInsuff2Lines + `   })\n`;          
        clearInsuff2Lines = clearInsuff2Lines + `};\n`;            
        return clearInsuff2Lines;
    }
    function getRejectInsuff1ClearanceLines(){
        let rejectInsuff1ClearanceLines  = `exports.rejectInsuff1Clearance=(req,res)=>{\n`;        
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + ` ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `     status:'INSUF-1-CLEARANCE-REJECTED',\n`
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `     insufficiencyClearanceRejectionComments:req.body.insufficiencyClearanceRejectionComments,\n`
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `     insufficiencyClearanceRejectedBy:req.user.user_id,\n`
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `     insufficiencyClearanceRejectionDate:Date.now(),\n`        
//        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `     checkHistory:checkHistory.push({date:Date.now,status:req.body.status,remarks:req.body.insufficiencyClearanceRejectionComments,user:req.user.userId})\n`;                                                
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `   })\n`;      
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `   .then(data=>{\n`;
	rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `              caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf 1 Clearance Rejection','INSUF-1-CLEARANCE-REJECTED',req.body.insufficiencyClearanceRejectionComments ,null,null,null,req.user.user_id)\n`    
	    
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `       res.json(data)\n`;
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `    })\n`;
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `   .catch(err=>{\n`;
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `       res.status(500).json({\n`;
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `           message:err.message | "Error occurred while updating status during input qc"\n`;
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `       })\n`;
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `   })\n`;          
        rejectInsuff1ClearanceLines = rejectInsuff1ClearanceLines + `};\n`;            
        return rejectInsuff1ClearanceLines;        
    }
    function getRejectInsuff2ClearanceLines(){
        let rejectInsuff2ClearanceLines  = `exports.rejectInsuff2Clearance=(req,res)=>{\n`;        
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + ` ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `     status:'INSUF-2-CLEARANCE-REJECTED',\n`
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `     insufficiencyClearanceRejectionComments:req.body.insufficiencyClearanceRejectionComments,\n`
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `     insufficiencyClearanceRejectedBy:req.user.user_id,\n`
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `     insufficiencyClearanceRejectionDate:Date.now(),\n`
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `   })\n`;      
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `   .then(data=>{\n`;
	rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `              caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf 2 Clearance Rejection','INSUF-2-CLEARANCE-REJECTED',req.body.insufficiencyClearanceRejectionComments ,null,null,null,req.user.user_id)\n`    
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `       res.json(data)\n`;
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `    })\n`;
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `   .catch(err=>{\n`;
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `       res.status(500).json({\n`;
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `           message:err.message | "Error occurred while updating status during input qc"\n`;
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `       })\n`;
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `   })\n`;          
        rejectInsuff2ClearanceLines = rejectInsuff2ClearanceLines + `};\n`;            
        return rejectInsuff2ClearanceLines;        
    }    
    function getClearInsuff1Lines(){
        let clearInsuff1Lines  = `exports.clearInsuff1=(req,res)=>{\n`;        
        clearInsuff1Lines = clearInsuff1Lines + ` ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        clearInsuff1Lines = clearInsuff1Lines + `     status:'INSUF-1-CLEARED',\n`
        clearInsuff1Lines = clearInsuff1Lines + `     clientClearedBy:req.user.user_id,\n`
        clearInsuff1Lines = clearInsuff1Lines + `     insufficiencyClearedComments:req.body.insufficiencyClearedComments,\n`    
//        clearInsuff1Lines = clearInsuff1Lines + `     checkHistory:checkHistory.push({date:Date.now,status:req.body.status,remarks:'Cleared by Client',user:req.user.userId})\n`;                                                                
        clearInsuff1Lines = clearInsuff1Lines + `   })\n`;      
        clearInsuff1Lines = clearInsuff1Lines + `   .then(data=>{\n`;
	clearInsuff1Lines = clearInsuff1Lines + `             caseHistory.create(req.params.caseId,req.body.component,data._id,'Insuf 1 Cleared','INSUF-1-CLEARED',req.body.insufficiencyClearedComments ,null,null,null,req.user.user_id)\n`    
        clearInsuff1Lines = clearInsuff1Lines + `       res.json(data)\n`;
        clearInsuff1Lines = clearInsuff1Lines + `    })\n`;
        clearInsuff1Lines = clearInsuff1Lines + `   .catch(err=>{\n`;
        clearInsuff1Lines = clearInsuff1Lines + `       res.status(500).json({\n`;
        clearInsuff1Lines = clearInsuff1Lines + `           message:err.message | "Error occurred while updating status during input qc"\n`;
        clearInsuff1Lines = clearInsuff1Lines + `       })\n`;
        clearInsuff1Lines = clearInsuff1Lines + `   })\n`;          
        clearInsuff1Lines = clearInsuff1Lines + `};\n`;            
        return clearInsuff1Lines;
    }    





    function getAllocateCheckToMyselfLines(){
        let allocateCheckToMyselfLines = `exports.allocateCheckToMyself=(req,res)=>{\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `         verificationAllocatedTo:req.user.user_id,\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `         })\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `         .then(data=>{\n`;
	allocateCheckToMyselfLines = allocateCheckToMyselfLines + `            caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocate Check to myself','ALLOCATE-CHECK','Allocate Check to myself' ,null,null,req.user.user_id,req.user.user_id)\n`    
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `             res.json(data)\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `         })\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `         .catch(err=>{\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `             res.status(500).json({\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `                 message:err.message | "Error occurred while updating status during mentor review"\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `             })\n`;
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `         })\n`;    
        allocateCheckToMyselfLines = allocateCheckToMyselfLines + `};\n`;            
        return allocateCheckToMyselfLines;
    }    
    function getAllocateCheckToFeLines(){
        let allocateCheckToFeLines = `exports.allocateCheckToFe=(req,res)=>{\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `         status:'ALLOCATED-TO-FE',\n`;        
        allocateCheckToFeLines = allocateCheckToFeLines + `         allocatedToFE:req.user.user_id,\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `         allocatedToVendor:null,\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `         feAllocationDate:Date.now(),\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `         })\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `         .then(data=>{\n`;
	allocateCheckToFeLines = allocateCheckToFeLines + `             caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocating to FE','ALLOCATED-TO-FE','Allocated to FE' ,null,req.user.user_id,null,req.user.user_id)\n`    
	    
        allocateCheckToFeLines = allocateCheckToFeLines + `             res.json(data)\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `         })\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `         .catch(err=>{\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `             res.status(500).json({\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `                 message:err.message | "Error occurred while updating status during mentor review"\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `             })\n`;
        allocateCheckToFeLines = allocateCheckToFeLines + `         })\n`;    
        allocateCheckToFeLines = allocateCheckToFeLines + `};\n`;            
        return allocateCheckToFeLines;        
    }
    function getAllocateCheckToVendorLines(){
        let allocateCheckToVendorLines = `exports.allocateCheckToVendor=(req,res)=>{\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         status:'ALLOCATED-TO-VENDOR',\n`;        
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         allocatedToVendor:req.body.vendor,\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         allocatedToFE:null,\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         vendorAllocationDate:Date.now(),\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         })\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         .then(data=>{\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `             caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocating to Vendor','ALLOCATED-TO-VENDOR','Check allocated to vendor' ,req.body.vendor,null,null,req.user.user_id)\n`	    
        allocateCheckToVendorLines = allocateCheckToVendorLines + `             res.json(data)\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         })\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         .catch(err=>{\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `             res.status(500).json({\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `                 message:err.message | "Error occurred while updating status during mentor review"\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `             })\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         })\n`;    
        allocateCheckToVendorLines = allocateCheckToVendorLines + `};\n`;            
        return allocateCheckToVendorLines;        
    }
    function getAllocateCheckToVerifierLines(){
        let allocateCheckToVendorLines = `exports.allocateCheckToVerifier=(req,res)=>{\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `     ${req.body.name}.findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         verificationAllocatedTo:req.body.verifier,\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         verificationAllocationDate:Date.now(),\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         })\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         .then(data=>{\n`;
	allocateCheckToVendorLines = allocateCheckToVendorLines + `              caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocating Check to Analyst','Allocated Check to Analyst','Allocated Check to Analyst' ,null,null,req.body.veifier,req.user.user_id)\n`    
        allocateCheckToVendorLines = allocateCheckToVendorLines + `             res.json(data)\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         })\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         .catch(err=>{\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `             res.status(500).json({\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `                 message:err.message | "Error occurred while updating status during mentor review"\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `             })\n`;
        allocateCheckToVendorLines = allocateCheckToVendorLines + `         })\n`;    
        allocateCheckToVendorLines = allocateCheckToVendorLines + `};\n`;            
        return allocateCheckToVendorLines;        
    }

    function getGetInsuffForClientLines(){
        let getInsuffForClientLines = `exports.getInsuffForClient=(req,res)=>{\n\n`;       
        getInsuffForClientLines = getInsuffForClientLines +  `UserSubclientAccess.find({user:req.user.user_id})\n`
        getInsuffForClientLines = getInsuffForClientLines + ` .then(userSubclientData=>{\n`
        getInsuffForClientLines = getInsuffForClientLines +  `      ${req.body.name}\n`;
        getInsuffForClientLines = getInsuffForClientLines +  `     .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})\n`;
        getInsuffForClientLines = getInsuffForClientLines + `      .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})\n`
        getInsuffForClientLines = getInsuffForClientLines + `      .then(async data=>{\n`;
        getInsuffForClientLines = getInsuffForClientLines + `         let reqArray = await getReqArray(userSubclientData,data)\n`
        getInsuffForClientLines = getInsuffForClientLines + `         res.json(reqArray)\n`
        getInsuffForClientLines = getInsuffForClientLines + `      })\n`;
        getInsuffForClientLines = getInsuffForClientLines + `     .catch(err=>{\n`;
        getInsuffForClientLines = getInsuffForClientLines + `          res.status(500).json({\n`;
        getInsuffForClientLines = getInsuffForClientLines + `             message:err.message || 'Some error while retrieving ${req.body.name} for cases'\n`;
        getInsuffForClientLines = getInsuffForClientLines + `          })\n`;        
        getInsuffForClientLines = getInsuffForClientLines + `      })\n`;
        getInsuffForClientLines = getInsuffForClientLines + ` })\n`;     
        getInsuffForClientLines = getInsuffForClientLines + ` .catch(err=>{\n`;
        getInsuffForClientLines = getInsuffForClientLines + `      res.status(500).json({\n`;
        getInsuffForClientLines = getInsuffForClientLines + `         message:err.message || 'Some error while retrieving ${req.body.name} for cases'\n`;
        getInsuffForClientLines = getInsuffForClientLines + `      })\n`;        
        getInsuffForClientLines = getInsuffForClientLines + `  })\n`;          
	getInsuffForClientLines = getInsuffForClientLines + ` let getReqArray = function(userSubclientData,data){\n`
        getInsuffForClientLines = getInsuffForClientLines + `     return new Promise((resolve,reject)=>{\n`
        getInsuffForClientLines = getInsuffForClientLines + `         let reqData = new Array()\n`
        getInsuffForClientLines = getInsuffForClientLines + `         for(let i=0; i < data.length;i++){\n`
        getInsuffForClientLines = getInsuffForClientLines + `            let insuffData = data[i]\n`
        getInsuffForClientLines = getInsuffForClientLines + `            for(let j=0; j < userSubclientData.length;j++){\n`
        getInsuffForClientLines = getInsuffForClientLines + `               let subclientData = userSubclientData[j]\n`
        getInsuffForClientLines = getInsuffForClientLines + `               if(insuffData.case.subclient._id.toString() == subclientData.subclient.toString()){\n`
        getInsuffForClientLines = getInsuffForClientLines + `                  reqData.push(insuffData)\n`
        getInsuffForClientLines = getInsuffForClientLines + `                  break\n`
        getInsuffForClientLines = getInsuffForClientLines + `               }\n`
        getInsuffForClientLines = getInsuffForClientLines + `            }\n`
        getInsuffForClientLines = getInsuffForClientLines + `         }\n`
        getInsuffForClientLines = getInsuffForClientLines + `         resolve(reqData)\n`
        getInsuffForClientLines = getInsuffForClientLines + `     })\n`
        getInsuffForClientLines = getInsuffForClientLines + `}\n`
        getInsuffForClientLines = getInsuffForClientLines + `}\n`;             
        return getInsuffForClientLines; 

	    
/*	let getInsuffForClientLines = 'exports.getInsuffForClient=(req,res)=>{\n\n'    
        getInsuffForClientLines = getInsuffForClientLines + ` ${req.body.name}\n`;
        getInsuffForClientLines = getInsuffForClientLines + ` .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})\n`;
        getInsuffForClientLines = getInsuffForClientLines + `.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})\n`
        getInsuffForClientLines = getInsuffForClientLines + ` .then(data=>{\n`;
        getInsuffForClientLines = getInsuffForClientLines + `     res.json(data)\n`;
        getInsuffForClientLines = getInsuffForClientLines + ` })\n`;
        getInsuffForClientLines = getInsuffForClientLines + ` .catch(err=>{\n`;
        getInsuffForClientLines = getInsuffForClientLines + `       res.status(500).json({\n`;
        getInsuffForClientLines = getInsuffForClientLines + `          message:err.message || 'Some error while retrieving ${req.body.name} for cases'\n`;
        getInsuffForClientLines = getInsuffForClientLines + `       })\n`;        
        getInsuffForClientLines = getInsuffForClientLines + `   })\n`;
        getInsuffForClientLines = getInsuffForClientLines +`};\n`;        

        return getInsuffForClientLines; */

    }

    function getGetInsuffForScrutinyLines(){
        let getInsuffForScrutinyLines = `exports.getInsuffForScrutiny=(req,res)=>{\n\n`;       
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + ` ${req.body.name}\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + ` .find({$or:[{status:'INSUF-1-CLEARED'},{status:'INSUF-2-CLEARED'},{status:'INSUF-2-REQ'},{status:'CLARIFICATION-REQ'},{status:'COST-APPROVAL-REQ'}]})\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + `.populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})\n`
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + ` .then(data=>{\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + `     res.json(data)\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + ` })\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + ` .catch(err=>{\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + `       res.status(500).json({\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + `          message:err.message || 'Some error while retrieving ${req.body.name} for cases'\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + `       })\n`;        
        getInsuffForScrutinyLines = getInsuffForScrutinyLines + `   })\n`;
        getInsuffForScrutinyLines = getInsuffForScrutinyLines +`};\n`;        

        return getInsuffForScrutinyLines;

    }
    function getPutItToFeBucketLines(){
        let putItToFeBucketLines = `exports.putItToFeBucket=(req,res)=>{\n\n`;
        putItToFeBucketLines = putItToFeBucketLines + `     ${req.body.name}\n`;
        putItToFeBucketLines = putItToFeBucketLines + `     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        putItToFeBucketLines = putItToFeBucketLines + `         status:req.body.status,\n`;
        putItToFeBucketLines = putItToFeBucketLines + `         modifiedBy:req.user.user_id\n`;
        putItToFeBucketLines = putItToFeBucketLines + `      })\n`;
        putItToFeBucketLines = putItToFeBucketLines + `     .then(data=>{\n`;
	putItToFeBucketLines = putItToFeBucketLines + `                  caseHistory.create(req.params.caseId,req.body.component,data._id,'Put Check in FE Bucket',req.body.status,'Putting Check in FE Bucket',null,null,null,req.user.user_id)\n`    
	    
        putItToFeBucketLines = putItToFeBucketLines + `         res.json(data)\n`;
        putItToFeBucketLines = putItToFeBucketLines + `      })\n`;
        putItToFeBucketLines = putItToFeBucketLines + `     .catch(err=>{\n`;
        putItToFeBucketLines = putItToFeBucketLines + `         res.status(500).json({\n`;
        putItToFeBucketLines = putItToFeBucketLines + `             message: err.message | "Some error occurred while putting a check to FE bucket"\n`
        putItToFeBucketLines = putItToFeBucketLines + `         })\n`;
        putItToFeBucketLines = putItToFeBucketLines + `     })\n`;
        putItToFeBucketLines = putItToFeBucketLines + `};\n`
        return putItToFeBucketLines;
    }


    function getPutItToVendorBucketLines(){
        let putItToVendorBucketLines = `exports.putItToVendorBucket=(req,res)=>{\n\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `     ${req.body.name}\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `         status:req.body.status,\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `         modifiedBy:req.user.user_id\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `      })\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `     .then(data=>{\n`;
	putItToVendorBucketLines = putItToVendorBucketLines + `            caseHistory.create(req.params.caseId,req.body.component,data._id,'Putting Check in Vendor Bucket','Put Check in Venfo Bucket','Check put in vendor bucket' ,null,null,null,req.user.user_id)\n`    
        putItToVendorBucketLines = putItToVendorBucketLines + `         res.json(data)\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `      })\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `     .catch(err=>{\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `         res.status(500).json({\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `             message: err.message | "Some error occurred while putting a check to Vendor bucket"\n`
        putItToVendorBucketLines = putItToVendorBucketLines + `         })\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `     })\n`;
        putItToVendorBucketLines = putItToVendorBucketLines + `};\n`
        return putItToVendorBucketLines;
    }
    function getReinitiateCheckLines(){
        let reinitiateCheckLines = `exports.reinitiateCheck=(req,res)=>{\n\n`;
        reinitiateCheckLines = reinitiateCheckLines  + `     ${req.body.name}\n`;	    
        reinitiateCheckLines = reinitiateCheckLines + `     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        reinitiateCheckLines = reinitiateCheckLines + `         status:'REINITIATED',\n`;
        reinitiateCheckLines = reinitiateCheckLines + `         reinitiationDate:new Date(),\n`;
        reinitiateCheckLines = reinitiateCheckLines + `         reinitiationComments:req.body.reinitiationComments,\n`;
        reinitiateCheckLines = reinitiateCheckLines + `         verificationAllocatedTo:null,\n`;        
        reinitiateCheckLines = reinitiateCheckLines + `         modifiedBy:req.user.user_id\n`;
        reinitiateCheckLines = reinitiateCheckLines + `      })\n`;
        reinitiateCheckLines = reinitiateCheckLines + `     .then(data=>{\n`;
        reinitiateCheckLines = reinitiateCheckLines + `         caseHistory.create(req.params.caseId,req.body.component,data._id,'Reinitiating a check','REINITIATED',req.body.reinitiationComments,null,null,null,req.user.user_id)\n`
        reinitiateCheckLines = reinitiateCheckLines + `         res.json(data)\n`;
        reinitiateCheckLines = reinitiateCheckLines + `      })\n`;
        reinitiateCheckLines = reinitiateCheckLines + `     .catch(err=>{\n`;
        reinitiateCheckLines = reinitiateCheckLines + `         res.status(500).json({\n`;
        reinitiateCheckLines = reinitiateCheckLines + `             message: err.message | "Some error occurred while putting a check to Vendor bucket"\n`
        reinitiateCheckLines = reinitiateCheckLines + `         })\n`;
        reinitiateCheckLines = reinitiateCheckLines + `     })\n`;        
        reinitiateCheckLines = reinitiateCheckLines +  `};\n`
	return reinitiateCheckLines    
    }	
    function getAddNoteLines(){
        let addNoteLines = `exports.addNote=(req,res)=>{\n\n`;
	addNoteLines = addNoteLines + `      ${req.body.name}\n`    
        addNoteLines = addNoteLines + `     .findOneAndUpdate({case:req.params.caseId,_id:req.params.componentId},{\n`;
        addNoteLines = addNoteLines + `         stage:'WIP',\n`;
        addNoteLines = addNoteLines + `         modifiedBy:req.user.user_id\n`;
        addNoteLines = addNoteLines + `      })\n`;
        addNoteLines = addNoteLines + `     .then(data=>{\n`;
        addNoteLines = addNoteLines + `         caseHistory.create(req.params.caseId,req.body.component,data._id,'Effort Added','EFFORT ADDED',req.body.note,null,null,null,req.user.user_id)\n`        
        addNoteLines = addNoteLines + `         res.json(data)\n`;
        addNoteLines = addNoteLines + `      })\n`;
        addNoteLines = addNoteLines + `     .catch(err=>{\n`;
        addNoteLines = addNoteLines + `         res.status(500).json({\n`;
        addNoteLines = addNoteLines + `             message: err.message | "Some error occurred while putting a check to Vendor bucket"\n`
        addNoteLines = addNoteLines + `         })\n`;
        addNoteLines = addNoteLines + `     })\n`;        
        addNoteLines = addNoteLines +  `};\n`
        return addNoteLines;
    }    
	
    function getRequiredRouterLines(){
        let requiredRouterLines = `const ${req.body.name.toLowerCase()} = require('../controllers/data_entry/${req.body.name.toLowerCase()}.controller');\n`
        requiredRouterLines = requiredRouterLines + `const express = require('express');\n`;
        requiredRouterLines = requiredRouterLines + `const router = express.Router();\n\n`;
        return requiredRouterLines;
    }
    function getRouteLines(){
        let routeLines = `router.post("/",${req.body.name.toLowerCase()}.create);\n`;
        routeLines = routeLines + `router.get("/:case",${req.body.name.toLowerCase()}.findAllForACase);\n`;
        routeLines = routeLines + `router.get("/findone/:caseId/:componentId",${req.body.name.toLowerCase()}.findOne);\n`;
        routeLines = routeLines + `router.post("/uploadfile",${req.body.name.toLowerCase()}.uploadFile);\n`;
        routeLines = routeLines + `router.post("/uploadproofofwork",${req.body.name.toLowerCase()}.uploadProofOfWork);\n`;
        routeLines = routeLines + `router.post("/uploadpvproofofwork",${req.body.name.toLowerCase()}.uploadPvProofOfWork);\n`;
        routeLines = routeLines + `router.post("/uploadpaymentproof",${req.body.name.toLowerCase()}.uploadPaymentProof);\n`;
        routeLines = routeLines + `router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",${req.body.name.toLowerCase()}.deleteFile);\n`;
        routeLines = routeLines + `router.get("/downloadfile/:caseId/:componentName/:componentId",${req.body.name.toLowerCase()}.downloadFile);\n`;        
        routeLines = routeLines + `router.get("/downloadproofofwork/:caseId/:componentName/:componentId",${req.body.name.toLowerCase()}.downloadProofOfWork);\n`;                
        routeLines = routeLines + `router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",${req.body.name.toLowerCase()}.downloadPaymentProof);\n`;                
        routeLines = routeLines + `router.get("/readfilenames/:caseId/:componentName/:componentId",${req.body.name.toLowerCase()}.readFileNames);\n`;                
        routeLines = routeLines + `router.get("/readproofofworks/:caseId/:componentName/:componentId",${req.body.name.toLowerCase()}.readProofOfWorks);\n`;                
        routeLines = routeLines + `router.get("/readpaymentproofs/:caseId/:componentName/:componentId",${req.body.name.toLowerCase()}.readPaymentProofs);\n`;                
        routeLines = routeLines + `router.put("/:caseId/:componentId",${req.body.name.toLowerCase()}.update);\n`;        
        routeLines = routeLines + `router.put("/updatedataentrystatus/:caseId/:componentId",${req.body.name.toLowerCase()}.updateDataEntryStatus);\n`
        routeLines = routeLines + `router.put("/updateinputqcstatus/:caseId/:componentId",${req.body.name.toLowerCase()}.updateInputqcStatus);\n`
        routeLines = routeLines + `router.put("/updateverificationstatus/:caseId/:componentId",${req.body.name.toLowerCase()}.updateVerificationStatus);\n`
        routeLines = routeLines + `router.put("/updatefeverificationstatus/:caseId/:componentId",${req.body.name.toLowerCase()}.updateFeVerificationStatus);\n`        
        routeLines = routeLines + `router.put("/updatevendorverificationstatus/:caseId/:componentId",${req.body.name.toLowerCase()}.updateVendorVerificationStatus);\n`                
        routeLines = routeLines + `router.put("/updateverifierreviewstatus/:caseId/:componentId",${req.body.name.toLowerCase()}.updateVerifierReviewStatus);\n`                
        routeLines = routeLines + `router.put("/updatementorreviewstatus/:caseId/:componentId",${req.body.name.toLowerCase()}.updateMentorReviewStatus);\n`        
        routeLines = routeLines + `router.put("/updateoutputqcstatus/:caseId/:componentId",${req.body.name.toLowerCase()}.updateOutputqcStatus);\n`                
        routeLines = routeLines + `router.put("/approveinsuff2/:caseId/:componentId",${req.body.name.toLowerCase()}.approveInsuff2);\n`        
        routeLines = routeLines + `router.put("/rejectinsuff2/:caseId/:componentId",${req.body.name.toLowerCase()}.rejectInsuff2);\n`        
        routeLines = routeLines + `router.put("/clearinsuff1/:caseId/:componentId",${req.body.name.toLowerCase()}.clearInsuff1);\n`        
        routeLines = routeLines + `router.put("/clearinsuff2/:caseId/:componentId",${req.body.name.toLowerCase()}.clearInsuff2);\n`        
        routeLines = routeLines + `router.put("/rejectinsuff1clearance/:caseId/:componentId",${req.body.name.toLowerCase()}.rejectInsuff1Clearance);\n`        
        routeLines = routeLines + `router.put("/rejectinsuff2clearance/:caseId/:componentId",${req.body.name.toLowerCase()}.rejectInsuff2Clearance);\n`                
        routeLines = routeLines + `router.put("/allocatechecktomyself/:caseId/:componentId",${req.body.name.toLowerCase()}.allocateCheckToMyself);\n`                
        routeLines = routeLines + `router.get("/user/getallchecksallocatedtomeforverification",${req.body.name.toLowerCase()}.getAllChecksAllocatedToMeForVerification);\n`                        
        routeLines = routeLines + `router.get("/insuff/insuffforclient",${req.body.name.toLowerCase()}.getInsuffForClient);\n`                                
        routeLines = routeLines + `router.get("/insuff/insuffforscrutiny",${req.body.name.toLowerCase()}.getInsuffForScrutiny);\n`             
        routeLines = routeLines + `router.put("/approveinsuffclearance/:caseId/:componentId",${req.body.name.toLowerCase()}.approveInsuffClearance);\n`                                   
        routeLines = routeLines + `router.delete("/deletecheck/case/:caseId/component/:componentId",${req.body.name.toLowerCase()}.deleteCheck);\n`
        routeLines = routeLines + `router.put("/putittofebucket/:caseId/:componentId",${req.body.name.toLowerCase()}.putItToFeBucket);\n`                                   
        routeLines = routeLines + `router.put("/putittovendorbucket/:caseId/:componentId",${req.body.name.toLowerCase()}.putItToVendorBucket);\n`                                   
        routeLines = routeLines + `router.put("/allocatechecktofe/:caseId/:componentId",${req.body.name.toLowerCase()}.allocateCheckToFe);\n`                                   
        routeLines = routeLines + `router.put("/allocatechecktovendor/:caseId/:componentId",${req.body.name.toLowerCase()}.allocateCheckToVendor);\n`                                   
        routeLines = routeLines + `router.put("/allocatechecktoverifier/:caseId/:componentId",${req.body.name.toLowerCase()}.allocateCheckToVerifier);\n`                       
        routeLines = routeLines + `router.put("/addnote/:caseId/:componentId",${req.body.name.toLowerCase()}.addNote);\n` 	    
//        routeLines = routeLines + `router.put("/updatementorreviewstatus/caseId/:compnentId",${req.body.name.toLowerCase()}.updateMentorReviewStatus);\n`        
//        routeLines = routeLines + `router.put("/updateoutputqcstatus/caseId/:compnentId",${req.body.name.toLowerCase()}.updateOutputqcStatus);\n`                
//        routeLines = routeLines + `router.get("/findwithinputqcstatus/:inputqcStatus",${req.body.name.toLowerCase()}.findWithInputqcStatus)\n`;
        routeLines = routeLines + `router.get("/findcomponentsfor/:for",${req.body.name.toLowerCase()}.findComponentsFor)\n`;        
	routeLines = routeLines + `router.get("/findcomponentsforvendormanager/:status",${req.body.name.toLowerCase()}.findComponentsForVendorManager)\n`;    
        routeLines = routeLines + `router.get("/find/unallocated/verification/",${req.body.name.toLowerCase()}.findUnallocatedComponentsForVerification)\n`;               routeLines = routeLines + `router.put("/reinitiatecheck/:caseId/:componentId",${req.body.name.toLowerCase()}.reinitiateCheck);\n`                                   
        routeLines = routeLines + `module.exports = router;\n`;
        return routeLines;
    }


}
