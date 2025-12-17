
const formcheck = require('../../models/data_entry/formcheck.model')
const express = require('express');
const fileUpload = require('express-fileupload');
const mime = require('mime');
const fs = require('fs');
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const mongoose = require("mongoose")
const Case = require('../../models/uploads/case.model')
const caseHistory = require('../data_entry/case_history.controller')
const UserSubclientAccess = require('../../models/administration/user_subclient_access.model')
const SubclientNotification = require('../../models/administration/subclient_notification.model')
const Subclient = require('../../models/administration/subclient.model')
const mailSend = require('../mails/send_mail.controller')
const CaseHistory = require("../../models/data_entry/case_history.model")
const moment = require("moment")
const Universities = require('../../models/masters/university.model')
const User = require("../../models/administration/user.model")

exports.create = async (req, res) => {
    if (!req.body.case) {
        res.status(400).json({ message: "Case Id is Mandatory" })
    }
 const caseObj = await Case.findOne({_id: req.body.case})
let numComponents = Number(caseObj.actualComponents.length)
numComponents++
const checkId = `${caseObj.caseId}-${numComponents}`    
if (!req.body.name) {
                    return res.status(400).json({ message: "name is Mandatory" })
                }
if (!req.body.pannumber) {
                    return res.status(400).json({ message: "pannumber is Mandatory" })
                }
if (!req.body.status) {
        res.status(400).json({ message: 'Status required' })
    }
    const obj = new formcheck({
        case: req.body.case,
        personalDetailsData: req.body.personalDetails,
        component: req.body.component == null ? "6723ca901272f0f57d27e2da" : req.body.component,
        checkId: checkId,
name: req.body.name,
            nameRhs: null,
pannumber: req.body.pannumber,
            pannumberRhs: null,
year: req.body.year,
            yearRhs: null,
result: req.body.result,
            resultRhs: null,
verifiedby: req.body.verifiedby,
            verifiedbyRhs: null,
verifiedon: req.body.verifiedon,
            verifiedonRhs: null,
mov: req.body.mov,
            movRhs: null,
issuedby: req.body.issuedby,
            issuedbyRhs: null,
status: req.body.status,
        modifiedBy: req.user.user_id
    });
    if (req.body.status == 'DE-COMPLETED') {
        obj.dataEntryCompletionDate = new Date()
    } else {
        obj.insufficiencyComments = req.body.insufficiencyComments
    }
    obj
        .save(obj)
        .then(data => {
            caseHistory.create(req.body.case, req.body.component, data._id, 'Creating a Check', 'DE-COMPLETED', 'Check Created', null, null, null, req.user.user_id)
            Case
                .findOne({ _id: req.body.case })
                .then(async caseData => {
                    await formcheck.findOneAndUpdate({ _id: obj._id }, { client: caseData.client, subclient: caseData.subclient })
		//.then(caseData => {
                    let checksEntered = 0
                    if (caseData.numberOfChecksEntered != null) {
                        checksEntered = caseData.numberOfChecksEntered
                    }
                    checksEntered = checksEntered + 1
                    Case
                        .findOneAndUpdate({ _id: req.body.case }, { numberOfChecksEntered: checksEntered })
                        .then(caseUpdateData => {
                        })
                        .catch(caseUpdateErr => {
                        })
                })
                .catch(caseErr => {
                    console.log("Error in saving case", caseErr)
                })
            Case
                .update({ _id: req.body.case }, { $push: { actualComponents: "formcheck" } })
                .then(data => {
                    console.log("Updated the case ", data)
                })
                .catch(err => {
                    console.log("Error updating case ", data.caseId)
                })


            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while saving formcheck'
            })
        })
};

exports.findAllForACase = (req, res) => {
    formcheck
        .find({ case: req.params.case })
        .then(data => {
            res.json(data)
        })

        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving formcheck for cases'
            })
        })
};

exports.uploadFile = (req, res) => {

    let componentFile = req.files.componentFile;
    componentFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.componentName + '/' + req.body.componentId + '/candidatedocs/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        res.json({ message: "File uploaded" });
    });
};

exports.uploadProofOfWork = (req, res) => {

    let componentFile = req.files.componentFile;
    componentFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.componentName + '/' + req.body.componentId + '/proofofwork/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        res.json({ message: "File uploaded" });
    });
};

exports.uploadPaymentProof = (req, res) => {

    let componentFile = req.files.componentFile;
    componentFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.componentName + '/' + req.body.componentId + '/paymentproof/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        res.json({ message: "File uploaded" });
    });
};

exports.deleteFile = (req, res) => {

    fs.unlink('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.componentName + '/' + req.body.componentId + '/candidatedocs/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error deleting the file" });
        }
        res.json({ message: "File Deleted" });
    });
};

exports.downloadFile = (req, res) => {
    let file = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/candidatedocs/' + req.query.fileName + '.pdf';
    res.download(file);
};

exports.downloadProofOfWork = (req, res) => {

    let file = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/proofofwork/' + req.query.fileName + '.pdf';
    res.download(file);
};


exports.downloadPaymentProof = (req, res) => {

    let file = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/paymentproof/' + req.query.fileName + '.pdf';
    res.download(file);
};


exports.uploadPvProofOfWork = (req, res) => {

    let componentFile = req.files.componentFile;
    componentFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.componentName + '/' + req.body.componentId + '/pvproofofwork/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        res.json({ message: "File uploaded" });
    });
};


exports.update = (req, res) => {
    if (!req.body._id) {
        res.status(400).json({ message: "Id cannot be empty" })
    }
    if (!req.body.case) {
        res.status(400).json({ message: "Case Id is Mandatory" })
    }

    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
  
name: req.body.name,
pannumber: req.body.pannumber,
year: req.body.year,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,
issuedby: req.body.issuedby,
status: req.body.status,
        insufficiencyComments: req.body.insufficiencyComments,
        dataEntryCompletionDate: req.body.status == 'DE-COMPLETED' ? new Date() : null,
        modifiedBy: req.user.user_id
    })
        .then(data => {
            caseHistory.create(req.params.caseId, req.body.component, data._id, 'Updating Check', req.body.status, 'Check Created', null, null, null, req.user.user_id)
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while saving formcheck'
            })
        })
};


exports.findOne = (req, res) => {
    formcheck.findOne({ case: req.params.caseId, _id: req.params.componentId })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({
                message: err.message || 'Some error occurred while reading a component'
            })
        })
};


exports.updateDataEntryStatus = (req, res) => {
    if (req.body.status == 'DE-COMPLETED') {
        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            status: req.body.status,
            dataEntryCompletionDate: new Date(),
        })
            .then(data => {
                caseHistory.create(req.params.caseId, req.body.component, data._id, 'Updating Check', req.body.status, 'Check Updated', null, null, null, req.user.user_id)
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | "Error occurred while updating status during data entry"
                })
            })
    } else {
        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            status: req.body.status,
            insfficiencyComments: req.body.insufficiencyComments,
            dataEntryCompletionDate: new Date(),
        })
            .then(data => {
                caseHistory.create(req.params.caseId, req.body.component, data._id, 'Updating Check', req.body.status, 'Check Updated', null, null, null, req.user.user_id)
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | "Error occurred while updating status during data entry"
                })
            })
    }
};


exports.updateInputqcStatus = (req, res) => {

    if (req.body.status == 'INPUTQC-ACCEPTED') {

        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
name: req.body.name,
pannumber: req.body.pannumber,
year: req.body.year,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,
issuedby: req.body.issuedby,
status: req.body.status,

            inputqcCompletionDate: new Date(),

            branchAllocatedTo: req.body.branch,

        })

            .then(data => {

                caseHistory.create(req.params.caseId, req.body.component, data._id, 'Upadint Input QC Status', req.body.status, 'Input QC Status Updated', null, null, null, req.user.user_id)

                res.json(data)

            })

            .catch(err => {

                res.status(500).json({

                    message: err.message | "Error occurred while updating status during input qc"

                })

            })

    } else {

        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
name: req.body.name,
pannumber: req.body.pannumber,
year: req.body.year,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,
issuedby: req.body.issuedby,status: req.body.status,
            inputqcComments: req.body.inputqcComments,
            inputqcCompletionDate: new Date(),
            firstInsufficiencyRaisedDate: new Date()
        })
            .then(async data => {
                caseHistory.create(req.params.caseId, req.body.component, data._id, 'Input QC Updation', req.body.status, req.body.inputqcComments, null, null, null, req.user.user_id)
                res.json(data)
            })

            .catch(err => {
                console.log(err)
                caseHistory.create(req.params.caseId, req.body.component, data._id, 'Input QC Updation', req.body.status, req.body.inputqcComments, null, null, null, req.user.user_id)
                res.status(500).json({
                    message: err.message | "Error occurred while updating status during input qc"
                })
            })
    }
};

exports.readFileNames = (req, res) => {
    let files = new Array()
    let filePath = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/candidatedocs'
    if (fs.existsSync(filePath)) {
        fs.readdirSync(filePath).forEach(file => {
            let indexOfDot = file.lastIndexOf(".")
            files.push(file.substring(0, indexOfDot))
        })
    }
    res.json(files)
};


exports.readProofOfWorks = (req, res) => {
    let files = new Array()
    let filePath = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + "/" + req.params.componentId + '/proofofwork'
    if (fs.existsSync(filePath)) {
        fs.readdirSync(filePath).forEach(file => {
            let indexOfDot = file.lastIndexOf(".")
            files.push(file.substring(0, indexOfDot))
        })
    }
    res.json(files)
};



exports.readPaymentProofs = (req, res) => {
    let files = new Array()
    let filePath = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + "/" + req.params.componentId + '/paymentproof'
    if (fs.existsSync(filePath)) {
        fs.readdirSync(filePath).forEach(file => {
            let indexOfDot = file.lastIndexOf(".")
            files.push(file.substring(0, indexOfDot))
        })
    }
    res.json(files)
};


exports.findComponentsFor = (req, res) => {
    let query;
    if (req.params.for == 'INPUTQC') {
        query = { $or: [{ status: 'DE-COMPLETED' }, { status: 'INPUTQC-REJECTED' }] }
    }
    if (req.params.for == 'VERIFICATION') {
        query = { $or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: req.user_userId }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user_userId }, { status: "OUTPUTQC-REJECTED", verificationAllocatedTo: req.user_userId }, { status: 'FE-COMPLETED' }, { status: "FE-INSUF" }, { status: 'FE-COULD-NOT-VERIFY' }] }
    }
    if (req.params.for == 'VERIFICATION-TL') {
        query = { $or: [{ status: 'INPUTQC-ACCEPTED', branchAllocatedTo: { $ne: null } }, { status: 'MENTOR-REVIEW-REJECTED', branchAllocatedTo: { $ne: null } }, { status: "OUTPUTQC-REJECTED", verificationAllocatedTo: { $ne: null } }, { status: 'FE-COMPLETED', branchAllocatedTo: { $ne: null } }, { status: "FE-INSUF", branchAllocatedTo: { $ne: null } }, { status: 'FE-COULD-NOT-VERIFY', branchAllocatedTo: { $ne: null } }] }
    }
    if (req.params.for == 'FE-TL') {
        query = { $or: [{ status: 'ALLOCATE-TO-FE' }, { status: 'ALLOCATED-TO-FE' }] }
    }
    if (req.params.for == 'FE-VERIFICATION') {
        query = { $or: [{ status: 'ALLOCATED-TO-FE', allocatedToFE: req.user.user_id }, { status: 'VERIFIER-REJECTED', allocatedToFE: req.user.user_id }, { status: 'ALLOCATE-TO-FE', allocatedToFE: null }] }
    }
    if (req.params.for == 'FE-VERIFIED') {
        query = { $or: [{ status: 'FE-COMPLETED' }, { status: "FE-INSUF" }, { status: 'FE-COULD-NOT-VERIFY' }] }
    }
    if (req.params.for == 'VENDOR-MANAGER') {
        query = { $or: [{ status: 'ALLOCATE-TO-VENDOR' }, { status: 'ALLOCATED-TO-VENDOR' }] }
    }
    if (req.params.for == 'VENDOR-VERIFICATION') {
        query = { $or: [{ status: 'ALLOCATED-TO-VENDOR', allocatedToVendor: req.user.user_id }, { status: 'VERIFIER-REJECTED', allocatedToVendor: req.user.user_id }] }
    }
    if (req.params.for == 'VENDOR-VERIFIED') {
        query = { $or: [{ status: 'VENDOR-COMPLETED' }, { status: "VENDOR-INSUF" }, { status: 'VENDOR-COULD-NOT-VERIFY' }] }
    }
    if (req.params.for == 'MENTOR-REVIEW') {
        query = { status: 'VERIFICATION-COMPLETED' }
    }
    if (req.params.for == 'OUTPUTQC') {
        query = { status: 'MENTOR-REVIEW-ACCEPTED' }
    }
    if (req.params.for == 'WORD-REPORT-DOWNLOAD') {
        query = { status: 'OUTPUTQC-ACCEPTED' }
    }
    if (req.params.for == 'UPDATE-LHS') {
        query = { status: 'UPDATE-LHS' }
    }
    formcheck.find(query)
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'personalDetailsData' })
        .lean()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error reading checks'
            })
        })
    let getPersonalDetails = function (item) {
        return new Promise((resolve, reject) => {
            PersonalDetailsData
                .findOne({ case: item.case._id })
                .then(personalDetailsData => {
                    if (personalDetailsData != null) {
                        console.log("Personal Details is not null", personalDetailsData)
                        item["dateofbirth"] = personalDetailsData.dateofbirth
                        item["fathername"] = personalDetailsData.fathername
                        item["mobilenumber"] = personalDetailsData.mobilename
                        console.log("item contains ", item.dateofbirth)
                        resolve(item)
                    }
                })
                .catch(err => {
                    console.log("Error ", err)
                    reject()
                })
        })
    }
};

exports.findComponentsForVendorManager = (req, res) => {
    let page = req.query.pageCount;
    let offSet = page * 200;
    let count = 0;
    formcheck
        .count({ status: req.params.status })
        .then(data => {
            count = data
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error reading checks'
            })
        })
        formcheck.find({ status: req.params.status })
        .sort({ _id: 1 })
        .skip(offSet)
        .limit(200)
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'personalDetailsData' })
        .lean()
        .then(data => {
            res.json({ totalCount: count, res: data })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error reading checks'
            })
        })
}


exports.findUnallocatedComponentsForVerification = (req, res) => {
    // let query = { $or: [{ status: 'INPUTQC-ACCEPTED', branchAllocatedTo: null }, { status: 'MENTOR-REVIEW-REJECTED', branchAllocatedTo: null }, { status: 'OUTPUTQC-REJECTED', branchAllocatedTo: null }, { status: 'FE-COMPLETED', branchAllocatedTo: null }, { status: "FE-INSUF", branchAllocatedTo: null }, { status: 'FE-COULD-NOT-VERIFY', branchAllocatedTo: null }] }
    
    let query = { $or: [{ status: 'INPUTQC-ACCEPTED' }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user_userId, branchAllocatedTo: null }, { status: 'OUTPUTQC-REJECTED', verificationAllocatedTo: req.user_userId, branchAllocatedTo: null }, { status: 'FE-COMPLETED', verificationAllocatedTo: req.user.user_id, branchAllocatedTo: null }, { status: "FE-INSUF", verificationAllocatedTo: req.user.user_id, branchAllocatedTo: null }, { status: 'FE-COULD-NOT-VERIFY', verificationAllocatedTo: req.user.user_id, branchAllocatedTo: null }] }

    formcheck.find(query)
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'personalDetailsData' })
        .lean()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log('Error is', err)
            res.status(500).json({
                message: 'Error reading checks'
            })
        })
    let getPersonalDetails = function (item) {
        return new Promise((resolve, reject) => {
            PersonalDetailsData
                .findOne({ case: item.case._id })
                .then(personalDetailsData => {
                    if (personalDetailsData != null) {
                        console.log("Personal Details is not null", personalDetailsData)
                        item["dateofbirth"] = personalDetailsData.dateofbirth
                        item["fathername"] = personalDetailsData.fathername
                        item["mobilenumber"] = personalDetailsData.mobilename
                        console.log("item contains ", item.dateofbirth)
                        resolve(item)
                    }
                })
                .catch(err => {
                    console.log("Error ", err)
                    reject()
                })
        })
    }
};

exports.updateVerificationStatus = async (req, res) => {

    if (req.body.status == 'VERIFICATION-COMPLETED' || req.body.verificationStatus == 'FE-COMPLETED') {

        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
nameRhs: req.body.nameRhs,
pannumberRhs: req.body.pannumberRhs,
yearRhs: req.body.yearRhs,
resultRhs: req.body.resultRhs,
verifiedbyRhs: req.body.verifiedbyRhs,
verifiedonRhs: req.body.verifiedonRhs,
movRhs: req.body.movRhs,
issuedbyRhs: req.body.issuedbyRhs,
status: req.body.status,
            verificationCompletionDate: new Date(),
            grade: req.body.grade,
            grade1: req.body.grade,
            gradingComments: req.body.gradingComments,
            interimOrFinal: req.body.interimOrFinal,
            mode: req.body.mode,
            personContacted: req.body.personContacted,
            contactNumberOfPersonContacted: req.body.contactNumberOfPersonContacted,

        })

            .then(data => {

                caseHistory.create(req.params.caseId, req.body.component, data._id, 'Verification Completed', req.body.status, req.body.gradingComments, null, null, null, req.user.user_id)

                res.json(data)

            })

            .catch(err => {
                res.status(500).json({
                    message: err.message | "Error occurred while updating status during input qc"
                })
            })

    } else if(req.body.status=='DRAFT'){
        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
nameRhs: req.body.nameRhs,
pannumberRhs: req.body.pannumberRhs,
yearRhs: req.body.yearRhs,
resultRhs: req.body.resultRhs,
verifiedbyRhs: req.body.verifiedbyRhs,
verifiedonRhs: req.body.verifiedonRhs,
movRhs: req.body.movRhs,
issuedbyRhs: req.body.issuedbyRhs,
stage: 'WIP',
             })

              .catch(err=>{
                 res.status(500).json({
                  message:err.message | "Error occurred while updating status during input qc"
               })
            })
         }else if (req.body.status == 'ON-HOLD'){
                formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
nameRhs: req.body.nameRhs,
pannumberRhs: req.body.pannumberRhs,
yearRhs: req.body.yearRhs,
resultRhs: req.body.resultRhs,
verifiedbyRhs: req.body.verifiedbyRhs,
verifiedonRhs: req.body.verifiedonRhs,
movRhs: req.body.movRhs,
issuedbyRhs: req.body.issuedbyRhs,
status: req.body.status,
			onHoldCommentsDate: new Date(),
			onHoldComments: req.body.onHoldComments,
		})
            .then(data => {
                caseHistory.create(req.params.caseId, req.body.component, data._id, 'ON-HOLD', req.body.status, req.body.onHoldComments, null, null, null, req.user.user_id)
                res.json(data)
            })

            .catch(err => {
                res.status(500).json({
                    message: err.message | "Error occurred while updating status during input qc"
                })
            })

    } else if (req.body.status == 'UPDATE-LHS') {
        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

        status: req.body.status,
			updateLhsDate: new Date(),
			updateLhsComments: req.body.updateLhsComments,
		})
            .then(data => {
                caseHistory.create(req.params.caseId, req.body.component, data._id, 'UPDATE-LHS', req.body.status, req.body.onHoldComments, null, null, null, req.user.user_id)
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | "Error occurred while updating status during input qc"
                })
            })

            
    } else {

		formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {   

            status: req.body.status,
			insufficiencyRaisedDate: new Date(),
			insufficiencyComments: req.body.insufficiencyComments,

		})
			.then(data => {
				caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff 2 Raised', req.body.status, req.body.insufficiencyComments, null, null, null, req.user.user_id)
				res.json(data)
			})
			.catch(err => {
				res.status(500).json({
					message: err.message | "Error occurred while updating status during input qc"
				})
			})
	}
};

exports.updateFeVerificationStatus = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {nameRhs: req.body.nameRhs,pannumberRhs: req.body.pannumberRhs,yearRhs: req.body.yearRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,issuedbyRhs: req.body.issuedbyRhs,
status: req.body.status,
        feVerificationCompletionDate: new Date(),
        feInsufficiencyComments: req.body.feInsufficiencyComments,
        personContacted: req.body.personContacted,
        contactNumberOfPersonContacted: req.body.contactNumberOfPersonContacted
    })
        .then(data => {
            caseHistory.create(req.params.caseId, req.body.component, data._id, 'FE Verification Completion', req.body.status, req.body.status == 'FE-INSUF' ? req.body.feInsufficiencyComments : "Completed by FE", null, null, null, req.user.user_id)
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message | "Error occurred while updating status during input qc"
            })
        })
};

exports.updateVendorVerificationStatus = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        nameRhs: req.body.nameRhs,pannumberRhs: req.body.pannumberRhs,yearRhs: req.body.yearRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,issuedbyRhs: req.body.issuedbyRhs,
status: req.body.status,
		vendorVerificationCompletionDate: new Date(),
		vendorInsufficiencyComments: req.body.vendorInsufficiencyComments,
		personContacted: req.body.personContacted,
		contactNumberOfPersonContacted: req.body.contactNumberOfPersonContacted
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Vendor Verification Completion', req.body.status, req.body.status == 'VENDOR-INSUF' ? req.body.vendorInsufficiencyComments : "Completed by Vendor", null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during input qc"
			})
		})
};


exports.updateVerifierReviewStatus = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {nameRhs: req.body.nameRhs,pannumberRhs: req.body.pannumberRhs,yearRhs: req.body.yearRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,issuedbyRhs: req.body.issuedbyRhs,
status: req.body.status,
		verificationCompletionDate: req.body.verifierReviewStatus == 'VERIFICATION-COMPLETED' ? new Date() : null,
		verifierReviewStatus: req.body.verifierReviewStatus,
		verifierReviewComments: req.body.verifierReviewComments,
		grade: req.body.grade,
		grade1: req.body.grade,
		gradingComments: req.body.gradingComments,
		personContacted: req.body.personContacted,
		contactNumberOfPersonContacted: req.body.contactNumberOfPersonContacted
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Verification Status Update', req.body.status, req.body.status == 'VERIFICATION-COMPLETED' ? req.body.gradingComments : req.body.verifierReviewComments, null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during input qc"
			})
		})
};

exports.updateMentorReviewStatus = (req, res) => {

        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {nameRhs: req.body.data.nameRhs,pannumberRhs: req.body.data.pannumberRhs,yearRhs: req.body.data.yearRhs,resultRhs: req.body.data.resultRhs,verifiedbyRhs: req.body.data.verifiedbyRhs,verifiedonRhs: req.body.data.verifiedonRhs,movRhs: req.body.data.movRhs,issuedbyRhs: req.body.data.issuedbyRhs,
status: req.body.status,
        mentorReviewCompletionDate: new Date(),
		mentorReviewComments: req.body.mentorReviewComments,
		mentorReviewCompletedBy: req.user.user_id
    })
        .then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Mentor Review', req.body.status, req.body.status == 'MENTOR-REVIEW-REJECTED' ? req.body.mentorReviewComments : "Mentor Review Accepted", null, null, null, req.user.user_id)
            if (data.grade == "602f8b3743383ec9a722496f") {
                SubclientNotification
                    .findOne({ subclient: data.subclient, triggerStatus: "CHECK-OUTPUTQC-ACCEPTED" })
                    .populate({ path: 'template' })
                    .populate({ path: 'subclient' })
                    .then(subclientNotificationData => {
                        if (subclientNotificationData != null && subclientNotificationData.subclient.email != null) {
                            Case
                                .findOne({ _id: req.params.caseId })
                                .then(caseData => {
                                    console.log("Case Data Obtained")
                                    let subject = subclientNotificationData.template.subject
                                    let changedSubject = subject.replace('CASE-ID', caseData.caseId)
                                    let mailText = subclientNotificationData.template.content
                                    let checkDetails = `<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Field Value</td><td>Comments</td></tr><tr><td>${caseData.caseId}</td><td>${caseData.candidateName}</td><td>'formcheck Details'</td><td>${data.name}</td><td>${data.gradingComments}</td></tr></table>`
                                    let changedMailText = mailText.replace('&lt;&lt;DISCREPANCY-TABLE&gt;&gt;', checkDetails)
                                    let mailSent = mailSend.sendMail(subclientNotificationData.subclient.email, changedSubject, changedMailText)
                                    res.json(data)
                                })
                                .catch(err => {
                                    res.status(500).json({ message: "Mail Could not be sent - Error Reading Case" + err })
                                })
                        }

                    })
                    .catch(error => {
                        res.status(500).json({ message: "Mail Could not be sent - Error Reading Subclient Notification" })
                    })
            } else {
                res.json(data)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message | "Error occurred while updating status during mentor review"
            })
        })
};

exports.updateOutputqcStatus = (req, res) => {
        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {nameRhs: req.body.data.nameRhs,pannumberRhs: req.body.data.pannumberRhs,yearRhs: req.body.data.yearRhs,resultRhs: req.body.data.resultRhs,verifiedbyRhs: req.body.data.verifiedbyRhs,verifiedonRhs: req.body.data.verifiedonRhs,movRhs: req.body.data.movRhs,issuedbyRhs: req.body.data.issuedbyRhs,
status: req.body.status,
        outputqcCompletionDate: new Date(),
		outputqcComments: req.body.outputqcComments,
		outputqcCompletedBy: req.user.user_id
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Output QC Status Updation', req.body.status, req.body.status == 'OUTPUTQC-REJECTED' ? req.body.outputqcComments : "", null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during output qc"
			})
		})
};

exports.approveInsuff2 = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'INSUF-2-REQ-ACCEPTED',
		scrutinyApprovedBy: req.user.user_id,
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff Level 2 Approved', 'INSUF-2-REQ-ACCEPTED', "Insuf 2 request Accepted", null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during input qc"
			})
		})
};

exports.rejectInsuff2 = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'INPUTQC-ACCEPTED',
		insufficiencyRejectionComments: req.body.insufficiencyRejectionComments,
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuf Request Rejection', 'Insuf Request Rejected', req.body.insufficiencyRejectionComments, null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during input qc"
			})
		})
};

exports.clearInsuff1 = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'INSUF-1-CLEARED',
		clientClearedBy: req.user.user_id,
		insufficiencyClearedComments: req.body.insufficiencyClearedComments,
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuf 1 Cleared', 'INSUF-1-CLEARED', req.body.insufficiencyClearedComments, null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during input qc"
			})
		})
};

exports.clearInsuff2 = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'INSUF-2-CLEARED',
		clientClearedBy: req.user.user_id,
		insufficiencyClearedComments: req.body.insufficiencyClearedComments,
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuf 2 Cleared', 'INSUF-2-CLEARED', req.body.insufficiencyClearedComments, null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during input qc"
			})
		})
};

exports.rejectInsuff1Clearance = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        status: 'INSUF-1-CLEARANCE-REJECTED',
		insufficiencyClearanceRejectionComments: req.body.insufficiencyClearanceRejectionComments,
		insufficiencyClearanceRejectedBy: req.user.user_id,
		insufficiencyClearanceRejectionDate: Date.now(),
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuf 1 Clearance Rejection', 'INSUF-1-CLEARANCE-REJECTED', req.body.insufficiencyClearanceRejectionComments, null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during input qc"
			})
		})
};

exports.rejectInsuff2Clearance = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'INSUF-2-CLEARANCE-REJECTED',
		insufficiencyClearanceRejectionComments: req.body.insufficiencyClearanceRejectionComments,
		insufficiencyClearanceRejectedBy: req.user.user_id,
		insufficiencyClearanceRejectionDate: Date.now(),
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuf 2 Clearance Rejection', 'INSUF-2-CLEARANCE-REJECTED', req.body.insufficiencyClearanceRejectionComments, null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during input qc"
			})
		})
};

exports.allocateCheckToMyself = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
	    verificationAllocatedTo: req.user.user_id,
        verificationAllocationDate: Date.now(),
    })
		.then(data => {
			//    caseHistory.create(req.params.caseId,req.body.component,data._id,'Allocate Check to myself','ALLOCATE-CHECK','Allocate Check to myself' ,null,null,req.user.user_id,req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during mentor review"
			})
		})
};

exports.getAllChecksAllocatedToMeForVerification = (req, res) => {

    formcheck

        .find({ $or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: req.user.user_id }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user.user_id }, { status: 'ON-HOLD', verificationAllocatedTo: req.user.user_id },{ status: 'DRAFT', verificationAllocatedTo: req.user.user_id } ,{ status: 'OUTPUTQC-REJECTED', verificationAllocatedTo: req.user.user_id }] })
        
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'personalDetailsData' })
        .lean()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving formcheck for cases'
            })
        })
};

let getPersonalDetails = function (item) {
	return new Promise((resolve, reject) => {
		PersonalDetailsData
			.findOne({ case: item.case._id })
			.then(personalDetailsData => {
				if (personalDetailsData != null) {
					console.log("Personal Details is not null", personalDetailsData)
					item["dateofbirth"] = personalDetailsData.dateofbirth
					item["fathername"] = personalDetailsData.fathername
					item["mobilenumber"] = personalDetailsData.mobilename
				}
				resolve(item)
			})
			.catch(err => {
				reject()
			})
	})
}

exports.getInsuffForClient = (req, res) => {

    	UserSubclientAccess.find({ user: req.user.user_id })

        .then(userSubclientData => {

            formcheck
				.find({ $or: [{ status: 'INSUF-1-REQ-ACCEPTED' }, { status: 'INSUF-2-REQ-ACCEPTED' }, { status: 'INSUF-1-CLEARANCE-REJECTED' }, { status: 'INSUF-2-CLEARANCE-REJECTED' }] })
                .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })

				.then(async data => {
					let reqArray = await getReqArray(userSubclientData, data)
					res.json(reqArray)
				})
                .catch(err => {
                    res.status(500).json({
                        message: err.message || 'Some error while retrieving formcheck for cases'
                    })
                })
        })

        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving formcheck for cases'
            })
        })

    	let getReqArray = function (userSubclientData, data) {
		return new Promise((resolve, reject) => {
			let reqData = new Array()
			for (let i = 0; i < data.length; i++) {
				let insuffData = data[i]
				for (let j = 0; j < userSubclientData.length; j++) {
					let subclientData = userSubclientData[j]
					if (insuffData.case.subclient._id.toString() == subclientData.subclient.toString()) {
						reqData.push(insuffData)
						break
					}
				}
			}
			resolve(reqData)
		})
	}
}
 

exports.getInsuffForScrutiny = (req, res) => {

    formcheck

		.find({ $or: [{ status: 'INSUF-1-CLEARED' }, { status: 'INSUF-2-CLEARED' }, { status: 'INSUF-2-REQ' }, { status: 'CLARIFICATION-REQ' }, { status: 'COST-APPROVAL-REQ' }] })        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })

   		.then(data => {
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message || 'Some error while retrieving education for cases'
			})
		})
};


exports.approveInsuffClearance = async (req, res) => {

    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
	    status: 'INPUTQC-ACCEPTED',
		insufficiencyClearedDate: Date.now(),
	})
	
    .then(data => {
		res.json(data)
	})
	.catch(err => {
		res.status(500).json({
			message: err.message | "Error occurred while updating status during input qc"
		})
	})


}

exports.deleteCheck = (req, res) => {
    formcheck.findOneAndDelete({ case: req.params.caseId, _id: req.params.componentId })
        .then(data => {
			caseHistory.create(req.params.casieId, req.body.component, data._id, 'Deleting a check', 'Check Deleted', 'Check Deleted', null, null, null, req.user.user_id)
            res.json(data)
        })
        .catch(err => {
            res.json({
                message: err.message || 'Some error occurred while reading a component'
            })
        })
};

exports.putItToFeBucket = (req, res) => {

    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            status: req.body.status,
			modifiedBy: req.user.user_id
        })
        .then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Put Check in FE Bucket', req.body.status, 'Putting Check in FE Bucket', null, null, null, req.user.user_id)
            res.json(data)
        })
		.catch(err => {
			res.status(500).json({
				message: err.message | "Some error occurred while putting a check to FE bucket"
			})
		})
};

exports.putItToVendorBucket = (req, res) => {

    formcheck
        .findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            status: req.body.status,
            modifiedBy: req.user.user_id
        })
        .then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Putting Check in Vendor Bucket', 'Put Check in Venfo Bucket', 'Check put in vendor bucket', null, null, null, req.user.user_id)
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
				message: err.message | "Some error occurred while putting a check to Vendor bucket"
            })
        })
};

exports.allocateCheckToFe = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'ALLOCATED-TO-FE',
		allocatedToFE: req.user.user_id,
		allocatedToVendor: null,
		feAllocationDate: Date.now(),
    })
        .then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Allocating to FE', 'ALLOCATED-TO-FE', 'Allocated to FE', null, req.user.user_id, null, req.user.user_id)
            res.json(data)
        })
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during mentor review"
			})
		})
};

exports.allocateCheckToVendor = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'ALLOCATED-TO-VENDOR',
		allocatedToVendor: req.body.vendor,
		allocatedToFE: null,
		vendorAllocationDate: Date.now(),
    })
        .then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Allocating to Vendor', 'ALLOCATED-TO-VENDOR', 'Check allocated to vendor', req.body.vendor, null, null, req.user.user_id)
            res.json(data)
        })
		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during mentor review"
			})
		})
};

exports.allocateCheckToVerifier = (req, res) => {
    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		verificationAllocatedTo: req.body.verifier,
		verificationAllocationDate: Date.now(),
    })
        .then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Allocating Check to Analyst', 'Allocated Check to Analyst', 'Allocated Check to Analyst', null, null, req.body.veifier, req.user.user_id)
            res.json(data)
        })

		.catch(err => {
			res.status(500).json({
				message: err.message | "Error occurred while updating status during mentor review"
			})
		})
};


exports.reinitiateCheck = (req, res) => {

    formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        status: 'INPUTQC-ACCEPTED',
        reinitiationDate: new Date(),
        reinitiationComments: req.body.reinitiationComments,
        verificationAllocatedTo: null,
        modifiedBy: req.user.user_id
    })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Reinitiating a check', 'REINITIATED', req.body.reinitiationComments, null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Some error occurred while putting a check to Vendor bucket"
			})
		})
};


exports.addNote = async (req, res) => {

    formcheck
		.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
			stage: 'WIP',
			effortType: req.body.effortType,
			modifiedBy: req.user.user_id
        })
		.then(data => {
			caseHistory.create(req.params.caseId, req.body.component, data._id, 'Effort Added', 'EFFORT ADDED', req.body.note, null, null, null, req.user.user_id)
			res.json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message | "Some error occurred while putting a check to Vendor bucket"
			})
		})
};

exports.addquicknote = async (req, res) => {
    try {
        const caseData = await formcheck.findOne({ _id: req.body._id })
        const caseComments = []
		Object.assign(caseComments, caseData ? caseData.comments : null)
		const commentToPush = { user: mongoose.Types.ObjectId(req.user.user_id), date: new Date(), comment: req.body.comment, colorType: req.body.colorType }
		caseComments.push(commentToPush)
        const updatedCaseData = await formcheck.findOneAndUpdate({ _id: req.body._id }, { comments: caseComments })
		return res.json(updatedCaseData)
	
        } catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
	}
}

exports.getAllquicknoteForACheck = async (req, res) => {
    try {
		let result = new Array()
        const caseData = await formcheck.findOne({ _id: req.params.case_id })
		let comments = caseData.comments || []
		for (let i = 0; i < comments.length; i++) {
			const comment = comments[i]
			const userData = await User.findOne({ _id: comment.user })
			result.push({ user: userData, date: comment.date, comment: comment.comment, colorType: comment.colorType })
		}
		return res.json(result)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
	}
}

exports.searchInstitutionsFromMasters = async (req, res) => {

	try {

		const searchString = req.query.search

		const institutionsData = await Universities.find({ name: { $regex: new RegExp('^' + searchString, 'i') } });

		return res.json(institutionsData)

	} catch (error) {

		console.log(error)

		return res.status(500).json({ error: "Could not get education masters due to an internal server error." })

	}

}

exports.searchInstitutionsFromMastersAnalyst = async (req, res) => {

	const institution = req.params.institution.replace("%20", " ")
	Universities.find({ name: institution })
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			res.json({
				message: err.message || 'Some error occurred while reading a component'
			})
		})

}

exports.createForCde = (req, res) => {
    console.log("In formcheck Create for CDE")
    let caseId = req.caseId
    if (!req.body.case) {
        res.status(400).json({ message: "Case Id is Mandatory" })
    }
if (!req.body.name) {
            res.status(400).json({ message: "name is Mandatory" })
        }
if (!req.body.pannumber) {
            res.status(400).json({ message: "pannumber is Mandatory" })
        }
if (!req.body.year) {
            res.status(400).json({ message: "year is Mandatory" })
        }
if (!req.body.result) {
            res.status(400).json({ message: "result is Mandatory" })
        }
if (!req.body.verifiedby) {
            res.status(400).json({ message: "verifiedby is Mandatory" })
        }
if (!req.body.verifiedon) {
            res.status(400).json({ message: "verifiedon is Mandatory" })
        }
if (!req.body.mov) {
            res.status(400).json({ message: "mov is Mandatory" })
        }
if (!req.body.issuedby) {
            res.status(400).json({ message: "issuedby is Mandatory" })
        }
if (!req.body.status) {
    res.status(400).json({ message: 'Status required' })
}
}

exports.findOneForCde = (req, res) => {
    console.log("In formcheck for CDE Find One")
    let caseId = req.caseId
    if (caseId != null) {
        formcheck.findOne({ case: req.params.caseId, serialNumber: req.params.serialNumber })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json({
                    message: err.message || 'Some error occurred while reading a component'
                })
            })
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
};

exports.deleteFileForCde = (req, res) => {
    console.log("Got the name of the file to delete ", req.query.fileName)
    let caseId = req.caseId
    if (caseId != null) {
        fs.unlink('/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/candidatedocs/' + req.query.fileName + '.pdf', function (err) {
            console.log("Error deleting the file ", err)
            if (err) {
                res.status(500).send({ message: "Error deleting the file" });
            }
            res.json({ message: "File Deleted" });
        });
    }
};

exports.deleteAllFilesForCde = (req, res) => {
    let caseId = req.caseId
    if (caseId != null) {
        fs.rmSync('/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/candidatedocs/', { recursive: true, force: true })
        res.json({ message: "File Deleted" });

    }
};

exports.downloadFileForCde = (req, res) => {
    let caseId = req.caseId
    if (caseId != null) {
        let file = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/candidatedocs/' + req.query.fileName + '.pdf';
        res.download(file);
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
};

exports.readFileNamesForCde = (req, res) => {
    let caseId = req.caseId
    if (caseId != null) {
        let files = new Array()
        let filePath = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/candidatedocs'
        if (fs.existsSync(filePath)) {
            fs.readdirSync(filePath).forEach(file => {
                let indexOfDot = file.lastIndexOf(".")
                files.push(file.substring(0, indexOfDot))
            })
        }
        res.json(files)
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
};

exports.updateForCde = (req, res) => {
    console.log("In update CDE..................................")
    let caseId = req.caseId
    if (caseId != null) {
        if (!req.body._id) {
            res.status(400).json({ message: "Id cannot be empty" })
        }
        if (!req.body.case) {
            res.status(400).json({ message: "Case Id is Mandatory" })
        }
        if (!req.body.status) {
            res.status(400).json({ message: 'Status required' })
        }
        formcheck.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            
name: req.body.name,
pannumber: req.body.pannumber,
year: req.body.year,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,
issuedby: req.body.issuedby,
status: req.body.status,
            insufficiencyComments: req.body.insufficiencyComments,
            dataEntryCompletionDate: req.body.status == 'CDE-COMPLETED' ? new Date() : null,
        })
            .then(data => {
                caseHistory.create(req.params.caseId, req.body.component, data._id, 'Updating Check', req.body.status, 'Check Created', null, null, null, null)
                res.json(data)
            })
            .catch(err => {
                console.log("Error updating the check", err)
                res.status(500).json({
                    message: err.message || 'Some error while saving formcheck'
                })
            })
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
};

exports.uploadFileForCde = (req, res) => {
    let caseId = req.caseId
    if (caseId != null) {
        let componentFile = req.files.componentFile;
        componentFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.componentName + '/' + req.body.componentId + '/candidatedocs/' + req.body.fileName + '.pdf', function (err) {
            if (err) {
                res.status(500).send({ message: "Error uploading the file" });
            }
            res.json({ message: "File uploaded" });
        });
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
};

