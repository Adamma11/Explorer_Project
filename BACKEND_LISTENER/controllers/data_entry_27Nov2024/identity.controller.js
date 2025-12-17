
const identity = require('../../models/data_entry/identity.model')
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
const { default: puppeteer } = require('puppeteer');
const { Types } = require('mongoose');
const Path = require("path")

//added by anil on 3/26/2024 start
const externalAPIController = require("../support/external-api.controller");
const surepassToken = process.env.SUREPASStOKEN;
const { default: axios } = require('axios');
const pdf = require('html-pdf')
const { expologo } = require('../../shared/logo');
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
if (!req.body.fathername) {
                    return res.status(400).json({ message: "fathername is Mandatory" })
                }
if (!req.body.dob) {
                    return res.status(400).json({ message: "dob is Mandatory" })
                }
if (!req.body.typeofid) {
                    return res.status(400).json({ message: "typeofid is Mandatory" })
                }
if (!req.body.idnumber) {
                    return res.status(400).json({ message: "idnumber is Mandatory" })
                }
if (!req.body.status) {
        res.status(400).json({ message: 'Status required' })
    }
    const obj = new identity({
        case: req.body.case,
        personalDetailsData: req.body.personalDetails,
        component: req.body.component == null ? "6723cb9c1272f0f57d27f621" : req.body.component,
        checkId: checkId,
name: req.body.name,
            nameRhs: null,
fathername: req.body.fathername,
            fathernameRhs: null,
dob: req.body.dob,
            dobRhs: null,
typeofid: req.body.typeofid,
            typeofidRhs: null,
idnumber: req.body.idnumber,
            idnumberRhs: null,
result: req.body.result,
            resultRhs: null,
verifiedby: req.body.verifiedby,
            verifiedbyRhs: null,
verifiedon: req.body.verifiedon,
            verifiedonRhs: null,
mov: req.body.mov,
            movRhs: null,
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
                    await identity.findOneAndUpdate({ _id: obj._id }, { client: caseData.client, subclient: caseData.subclient })
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
                .update({ _id: req.body.case }, { $push: { actualComponents: "identity" } })
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
                message: err.message || 'Some error while saving identity'
            })
        })
};

exports.findAllForACase = (req, res) => {
    identity
        .find({ case: req.params.case })
        .then(data => {
            res.json(data)
        })

        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving identity for cases'
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

    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
  
name: req.body.name,
fathername: req.body.fathername,
dob: req.body.dob,
typeofid: req.body.typeofid,
idnumber: req.body.idnumber,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,
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
                message: err.message || 'Some error while saving identity'
            })
        })
};


exports.findOne = (req, res) => {
    identity.findOne({ case: req.params.caseId, _id: req.params.componentId })
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
        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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


exports.updateInputqcStatus = async (req, res) => {
try {
    if (req.body.status == 'INPUTQC-ACCEPTED') {

     /*   identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
name: req.body.name,
fathername: req.body.fathername,
dob: req.body.dob,
typeofid: req.body.typeofid,
idnumber: req.body.idnumber,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,
status: req.body.status,

            inputqcCompletionDate: new Date(),

            branchAllocatedTo: req.body.branch,

        })*/
           const payload = {
		name: req.body.name,
fathername: req.body.fathername,
dob: req.body.dob,
typeofid: req.body.typeofid,
idnumber: req.body.idnumber,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,   
                status: req.body.status,
                inputqcCompletionDate: new Date(),
                branchAllocatedTo: req.body.branch,
                verificationAllocatedTo: Types.ObjectId('66027de1d566155e6547d055')
            }
	                const identityData = await identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, payload,  {new:true}).lean()

            caseHistory.create(req.params.caseId, req.body.component, identityData._id, 'Upadint Input QC Status', req.body.status, 'Input QC Status Updated', null, null, null, req.user.user_id);

            const caseData = await Case.findOne({ _id: identityData.case }).lean();

            await callSurepassApiForIdentityCheck(identityData, caseData, req);

            return res.json(identityData)

            /*.then(data => {

                caseHistory.create(req.params.caseId, req.body.component, data._id, 'Upadint Input QC Status', req.body.status, 'Input QC Status Updated', null, null, null, req.user.user_id)

                res.json(data)

            })

            .catch(err => {

                res.status(500).json({

                    message: err.message | "Error occurred while updating status during input qc"

                })

            })*/

    } else {

        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
name: req.body.name,
fathername: req.body.fathername,
dob: req.body.dob,
typeofid: req.body.typeofid,
idnumber: req.body.idnumber,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,status: req.body.status,
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
	    } catch (error) {
        console.log(error.message, "--------------");
        return res.status(500).send({ error: "error while updating input qc status", message: error?.message })
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
    identity.find(query)
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
    identity
        .count({ status: req.params.status })
        .then(data => {
            count = data
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error reading checks'
            })
        })
        identity.find({ status: req.params.status })
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

    identity.find(query)
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

        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
nameRhs: req.body.nameRhs,
fathernameRhs: req.body.fathernameRhs,
dobRhs: req.body.dobRhs,
typeofidRhs: req.body.typeofidRhs,
idnumberRhs: req.body.idnumberRhs,
resultRhs: req.body.resultRhs,
verifiedbyRhs: req.body.verifiedbyRhs,
verifiedonRhs: req.body.verifiedonRhs,
movRhs: req.body.movRhs,
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
        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
nameRhs: req.body.nameRhs,
fathernameRhs: req.body.fathernameRhs,
dobRhs: req.body.dobRhs,
typeofidRhs: req.body.typeofidRhs,
idnumberRhs: req.body.idnumberRhs,
resultRhs: req.body.resultRhs,
verifiedbyRhs: req.body.verifiedbyRhs,
verifiedonRhs: req.body.verifiedonRhs,
movRhs: req.body.movRhs,
stage: 'WIP',
             })

              .catch(err=>{
                 res.status(500).json({
                  message:err.message | "Error occurred while updating status during input qc"
               })
            })
         }else if (req.body.status == 'ON-HOLD'){
                identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
nameRhs: req.body.nameRhs,
fathernameRhs: req.body.fathernameRhs,
dobRhs: req.body.dobRhs,
typeofidRhs: req.body.typeofidRhs,
idnumberRhs: req.body.idnumberRhs,
resultRhs: req.body.resultRhs,
verifiedbyRhs: req.body.verifiedbyRhs,
verifiedonRhs: req.body.verifiedonRhs,
movRhs: req.body.movRhs,
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
        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

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

		identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {   

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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {nameRhs: req.body.nameRhs,fathernameRhs: req.body.fathernameRhs,dobRhs: req.body.dobRhs,typeofidRhs: req.body.typeofidRhs,idnumberRhs: req.body.idnumberRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        nameRhs: req.body.nameRhs,fathernameRhs: req.body.fathernameRhs,dobRhs: req.body.dobRhs,typeofidRhs: req.body.typeofidRhs,idnumberRhs: req.body.idnumberRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {nameRhs: req.body.nameRhs,fathernameRhs: req.body.fathernameRhs,dobRhs: req.body.dobRhs,typeofidRhs: req.body.typeofidRhs,idnumberRhs: req.body.idnumberRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,
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

        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {nameRhs: req.body.data.nameRhs,fathernameRhs: req.body.data.fathernameRhs,dobRhs: req.body.data.dobRhs,typeofidRhs: req.body.data.typeofidRhs,idnumberRhs: req.body.data.idnumberRhs,resultRhs: req.body.data.resultRhs,verifiedbyRhs: req.body.data.verifiedbyRhs,verifiedonRhs: req.body.data.verifiedonRhs,movRhs: req.body.data.movRhs,
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
                                    let checkDetails = `<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Field Value</td><td>Comments</td></tr><tr><td>${caseData.caseId}</td><td>${caseData.candidateName}</td><td>'identity Details'</td><td>${data.name}</td><td>${data.gradingComments}</td></tr></table>`
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
        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {nameRhs: req.body.data.nameRhs,fathernameRhs: req.body.data.fathernameRhs,dobRhs: req.body.data.dobRhs,typeofidRhs: req.body.data.typeofidRhs,idnumberRhs: req.body.data.idnumberRhs,resultRhs: req.body.data.resultRhs,verifiedbyRhs: req.body.data.verifiedbyRhs,verifiedonRhs: req.body.data.verifiedonRhs,movRhs: req.body.data.movRhs,
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    identity

        .find({ $or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: req.user.user_id }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user.user_id }, { status: 'ON-HOLD', verificationAllocatedTo: req.user.user_id },{ status: 'DRAFT', verificationAllocatedTo: req.user.user_id } ,{ status: 'OUTPUTQC-REJECTED', verificationAllocatedTo: req.user.user_id }] })
        
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'personalDetailsData' })
        .lean()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving identity for cases'
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

            identity
				.find({ $or: [{ status: 'INSUF-1-REQ-ACCEPTED' }, { status: 'INSUF-2-REQ-ACCEPTED' }, { status: 'INSUF-1-CLEARANCE-REJECTED' }, { status: 'INSUF-2-CLEARANCE-REJECTED' }] })
                .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })

				.then(async data => {
					let reqArray = await getReqArray(userSubclientData, data)
					res.json(reqArray)
				})
                .catch(err => {
                    res.status(500).json({
                        message: err.message || 'Some error while retrieving identity for cases'
                    })
                })
        })

        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving identity for cases'
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

    identity

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

    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndDelete({ case: req.params.caseId, _id: req.params.componentId })
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

    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    identity
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    identity
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
        const caseData = await identity.findOne({ _id: req.body._id })
        const caseComments = []
		Object.assign(caseComments, caseData ? caseData.comments : null)
		const commentToPush = { user: mongoose.Types.ObjectId(req.user.user_id), date: new Date(), comment: req.body.comment, colorType: req.body.colorType }
		caseComments.push(commentToPush)
        const updatedCaseData = await identity.findOneAndUpdate({ _id: req.body._id }, { comments: caseComments })
		return res.json(updatedCaseData)
	
        } catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
	}
}

exports.getAllquicknoteForACheck = async (req, res) => {
    try {
		let result = new Array()
        const caseData = await identity.findOne({ _id: req.params.case_id })
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
    console.log("In identity Create for CDE")
    let caseId = req.caseId
    if (!req.body.case) {
        res.status(400).json({ message: "Case Id is Mandatory" })
    }
if (!req.body.name) {
            res.status(400).json({ message: "name is Mandatory" })
        }
if (!req.body.fathername) {
            res.status(400).json({ message: "fathername is Mandatory" })
        }
if (!req.body.dob) {
            res.status(400).json({ message: "dob is Mandatory" })
        }
if (!req.body.typeofid) {
            res.status(400).json({ message: "typeofid is Mandatory" })
        }
if (!req.body.idnumber) {
            res.status(400).json({ message: "idnumber is Mandatory" })
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
if (!req.body.status) {
    res.status(400).json({ message: 'Status required' })
}
}

exports.findOneForCde = (req, res) => {
    console.log("In identity for CDE Find One")
    let caseId = req.caseId
    if (caseId != null) {
        identity.findOne({ case: req.params.caseId, serialNumber: req.params.serialNumber })
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
        identity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            
name: req.body.name,
fathername: req.body.fathername,
dob: req.body.dob,
typeofid: req.body.typeofid,
idnumber: req.body.idnumber,
result: req.body.result,
verifiedby: req.body.verifiedby,
verifiedon: req.body.verifiedon,
mov: req.body.mov,
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
                    message: err.message || 'Some error while saving identity'
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

/////////////////////////////////////Drop Box//////////////////////
exports.getChecksForDropbox = async (req, res) => {
    try {
        const components = [identity];
        const result = [];



        for (let i = 0; i < components.length; i++) {
            const currComponent = components[i];
            //const data = await currComponent.find({ $or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: "66027de1d566155e6547d055" }] })
            //const data = await currComponent.find({ status: "INPUTQC-ACCEPTED", verificationAllocatedTo: "66027de1d566155e6547d055", })
	     const data = await currComponent.find({ $or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: "66027de1d566155e6547d055" }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: "66027de1d566155e6547d055" }, { status: "OUTPUTQC-REJECTED", verificationAllocatedTo: "66027de1d566155e6547d055" }] })
                //.populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
		      .populate({
        path: 'case',
        populate: {
          path: 'subclient',
          populate: {
            path: 'client',
            populate: {
              path: 'colorCodes.color', // assuming 'colorCodes' is the field containing ObjectId references
              model: 'ColorMaster'      // model name of the 'ColorMaster' schema
            }
          }
        }
      })
                .populate({ path: 'case', populate: { path: 'profile' } })
                .populate({ path: 'case', populate: { path: 'package' } })
                .populate({ path: 'personalDetailsData' })
                .populate({ path: 'component' })
                .populate({ path: 'verificationAllocatedTo' })
                .lean();



            console.log('Result:!!!!!!!!!!!!!!!!!!', i);
            for (const item of data) {
                if (!item || !item?._id || !item?.case?.caseId || !item?.component || !item?.component?.name) {
                    // return res.status(500).json({message:item})

                    item.fileUploaded = false;
                    result.push(item);
                    continue;
                }
                const directoryPath = `/REPO_STORAGE/case_uploads/${item.case.caseId}/${item.component.name}/${item._id}/proofofwork/`;
                console.log('Checking file existence for item:', item);
                const fileExists = await doesPdfFileExist(directoryPath);
                console.log("fileExists", fileExists);
                item.fileUploaded = fileExists;
                result.push(item);
            }
            // console.log('Result:', result); 

        }
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}
//////
/////////////////

async function doesPdfFileExist(directoryPath) {
    try {
        console.log("Checking directory for PDF files:", directoryPath);
        const files = await fs.promises.readdir(directoryPath);

        const pdfFileExists = files.some(file => /\.pdf$/i.test(file));

        return pdfFileExists;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false; // Directory does not exist
        }
        throw error; // Throw if it's an unexpected error
    }
}
//



exports.generatePdfWithSurepass = async (req, res) => {
    try {
        const identityData = await identity.findById(req.body._id, { _id: 1, typeofid: 1, idnumber: 1, nameasperid: 1, case: 1 });

        const data = await callSurepassApiForIdentityCheck(identityData, { caseId: req.body.caseId }, req);

        if (data) {
            return res.status(200).json({ isFile: true, filename: data });

        } else {
            return res.status(500).json({ isFile: false, message: "Failed to generate pdf" });

        }

    } catch (error) {
        console.log("generatePdfWithSurepass", error);
        return res.status(500).json({ message: error?.message });
    }
}

const callSurepassApiForIdentityCheck = async (identityData, caseData, req) => {
    return new Promise(async (resolve, reject) => {
	    const headers = getHeaders(surepassToken);
        /*const headers = {
            headers: {
                Authorization: `Bearer ${surepassToken}`,
                "Content-Type": "application/json",
            },
        };*/
        if (identityData.typeofid.toLowerCase() == "pan" || identityData.typeofid.toLowerCase() == "pan card") {

            const response = await axios.post(
                "https://kyc-api.surepass.io/api/v1/pan/pan-comprehensive",
                { id_number: identityData.idnumber },
                headers
            );

            if (response.status == 200) {
                externalAPIController.saveData(caseData.caseId, identityData.typeofid, response, req);
                const responseData = response.data.data;

		                    // added by anil on 6/20/2024 start
                if(identityData.status==="INPUTQC-ACCEPTED" && String(identityData.client) === "61d6d538e200e4004ea398b9"){

                  await writeRHSANDUpdateVerificationStatus(identityData,responseData,caseData._id,req.user.user_id,"pan");

               }
             // added by anil on 6/20/2024 end

                let html = this.getBaseHTMLForIdentityCheckReport("PAN", caseData.caseId, identityData.nameasperid);
                html += `        
                                    <tr>
                                    
                                    <td style="font-size: medium;">&nbsp;<b>ID Number</b></td>
                                    
                                    <td style="font-size: medium;">&nbsp;${responseData.pan_number}</td>
                                    
                                    </tr>
                                 
                                    
                                    <tr>
                                    
                                    <td style="font-size: medium;">&nbsp;<b>Full Name</b></td>
                                    
                                    <td style="font-size: medium;">&nbsp;${responseData.full_name}</td>
                                    
                                    </tr>
                                  
                            
                                    </tbody>
                                    
                                    </table>
                                    
                                    <div style="margin-top:40px; margin-left:auto; margin-right:auto;;width:96%">
                                    
                                    <h3><strong>Disclaimer:-</strong></h3>
                                    
                                    <p style="font-size:small; font-family:Calibri, sans-serif;">The content of this report has been sourced from
                                    the
                                    
                                    government databases & this report has
                                    
                                    been updated as on the date of verification. The data might have been changed, deleted,
                                    
                                    modified from thereon.</p>
                                    </div>
                                    </body>
                                    
                                    </html>`;

                const path = `/REPO_STORAGE/case_uploads/${caseData.caseId}/identity/${identityData._id}/proofofwork`;

                this.convertHtmlToPDF(html, path, "pan_report.pdf").then((value) => {
                    //this.convertHTMLToPDF(html, path, "pan_report.pdf").then((value) => {
                    resolve("pan_report.pdf");
                }).catch((error) => {
                    reject(false);
                });


            } else {
                reject(false)
            }


        } else if (identityData.typeofid.toLowerCase().includes("oter")) {


            /**  code from external-api */

            const response = await axios.post(
                "https://kyc-api.surepass.io/api/v1/voter-id/voter-id",
                { id_number: identityData.idnumber },
                headers
            );
            // Making a table with the pan information retrieved.


            if (response.status == 200) {
                const responseData = response.data.data

                externalAPIController.saveData(caseData.caseId, identityData.typeofid, response, req);
		    
		                              // added by anil on 6/20/2024 start

                          if(identityData.status==="INPUTQC-ACCEPTED" && String(identityData.client) === "61d6d538e200e4004ea398b9"){

                            await writeRHSANDUpdateVerificationStatus(identityData,responseData,caseData._id,req.user.user_id,"voter");

                        }
                          // added by anil on 6/20/2024 end

                let html = this.getBaseHTMLForIdentityCheckReport("Voter ID", caseData.caseId, identityData.nameasperid);
                html += `
                          
                            <tr>
                              <td style="font-size: medium;">&nbsp;<b>Voter ID Number</b></td>
                              <td style="font-size: medium;">&nbsp;${responseData.epic_no}</td>
                            </tr>
                              
                            <tr>
                              <td style="font-size: medium;">&nbsp;<b>Candidate Name</b></td>
                              <td style="font-size: medium;">&nbsp;${responseData.name}</td>
                            </tr>
                              
                            <tr>
                              <td style="font-size: medium;">&nbsp;<b>District</b></td>
                              <td style="font-size: medium;">&nbsp;${responseData.district}</td>
                            </tr>
                              
                            <tr>
                              <td style="font-size: medium;">&nbsp;<b>State</b></td>
                              <td style="font-size: medium;">&nbsp;${responseData.state}</td>
                            </tr>
                              
                            <tr>
                              <td style="font-size: medium;">&nbsp;<b>Relation Name</b></td>
                              <td style="font-size: medium;">&nbsp;${responseData.rln_name}</td>
                            </tr>
                              
                            <tr>
                              <td style="font-size: medium;">&nbsp;<b>Relation Type</b></td>
                              <td style="font-size: medium;">&nbsp;${responseData.rln_type}</td>
                            </tr>
                              
                            <tr>
                              <td style="font-size: medium;">&nbsp;<b>Voter ID Validity</b></td>
                              <td style="color:green;font-size: larger;">&nbsp;<b>Valid</b></td>
                            </tr>
                              
                            <tr>
                              <td style="font-size: medium;">&nbsp;<b>Verification Check</b></td>
                              <td style="font-size: medium;">&nbsp;Completed</td>
                            </tr>
                          
                          </tbody>
                        </table>
                          
                        <div style="margin-top:40px; margin-left:auto; margin-right:auto;;width:96%">
                          
                        <h3><strong>Disclaimer:-</strong></h3>
                          
                        <p style="font-size:small; font-family:Calibri, sans-serif;">The content of this report has been sourced from
                          the government databases & this report has been updated as on the date of verification. The data might have been changed, deleted,
                          modified from thereon.</p>
                        </div>
                      </body>
                          
                    </html>`;

                console.log("Converting html to pdf")

                const path = `/REPO_STORAGE/case_uploads/${caseData.caseId}/identity/${identityData._id}/proofofwork`;
                this.convertHtmlToPDF(html, path, "voterid_report.pdf").then((value) => {
                    //this.convertHTMLToPDF(html, path, "voterid_report.pdf").then((value) => {
                    resolve("voterid_report.pdf");
                }).catch((error) => {
                    reject(false);
                });

            } else {
                reject(false)
            }


        } else if (identityData.typeofid.toLowerCase().includes("riving") || identityData.typeofid.toLowerCase().includes("dl")) {

            const personalDetails = await PersonalDetailsData.findOne({ case: identityData.case })

            //added by anil on 3/26/2024 start moved existed line to the outside of if block

            const idNumber = identityData.idnumber.replace(" ", "");
            const dob = moment(personalDetails.dateofbirth).format("YYYY-MM-DD");

            const response = await axios.post(
                "https://kyc-api.surepass.io/api/v1/driving-license/driving-license",
                { id_number: idNumber, dob: dob },
                headers
            );


            if (response.status == 200) {
                externalAPIController.saveData(caseData.caseId, identityData.typeofid, response, req);

                const responseData = response.data.data;

		                              // added by anil on 6/20/2024 start
                          if(identityData.status==="INPUTQC-ACCEPTED" && String(identityData.client) === "61d6d538e200e4004ea398b9"){

                            await writeRHSANDUpdateVerificationStatus(identityData,responseData,caseData._id,req.user.user_id,"DL");

                          }

                            // added by anil on 6/20/2024 end

                let html = this.getBaseHTMLForIdentityCheckReport("Driving Licence", caseData.caseId, identityData.nameasperid);

                html += `
              
              <tr>
              <td style="font-size: medium;">&nbsp;<b>INDIVIDUAL NAME</b></td>
              <td style="font-size: medium;">&nbsp;${responseData.name}</td>
              </tr>
              
              <tr>
              <td style="font-size: medium;">&nbsp;<b>ID Number</b></td>
              <td style="font-size: medium;">&nbsp;${responseData.license_number}</td>
              </tr>
              
              <tr>
              <td style="font-size: medium;">&nbsp;<b>Date Of Birth</b></td>
              <td style="font-size: medium;">&nbsp;${responseData.dob}</td>
              </tr>
              
              <tr>
              <td style="font-size: medium;">&nbsp;<b>Issue Date</b></td>
              <td style="font-size: medium;">&nbsp;${responseData.doi}</td>
              </tr>
           
              
              <tr>
              <td style="font-size: medium;">&nbsp;<b>State</b></td>
              <td style="font-size: medium;">&nbsp;${responseData.state}</td>
              </tr>
       
              
              <tr>
              <td style="font-size: medium;">&nbsp;<b>Relation Name</b></td>
              <td style="font-size: medium;">&nbsp;${responseData.father_or_husband_name}</td>
              </tr>
              
              <tr>
              <td style="font-size: medium;">&nbsp;<b>Expiry Date</b></td>
              <td style="font-size: medium;">&nbsp;${responseData.doe}</td>
              </tr>
              
            
              </tbody>
              </table>
              <div style="margin-top:40px; margin-left:auto; margin-right:auto;;width:96%">
              
              <h3><strong>Disclaimer:-</strong></h3>
              
              <p style="font-size:small; font-family:Calibri, sans-serif;">The content of this report has been sourced from
              the
              
              government databases & this report has
              
              been updated as on the date of verification. The data might have been changed, deleted,
              
              modified from thereon.</p>
              </div>
              </body>
              
              </html>
          `;

                console.log("Converting html to pdf")
                console.log("Writing html to pdf")

                const path = `/REPO_STORAGE/case_uploads/${caseData.caseId}/identity/${identityData._id}/proofofwork`

                this.convertHtmlToPDF(html, path, "dl_report.pdf").then((value) => {
                    //this.convertHTMLToPDF(html, path, "dl_report.pdf").then((value) => {
                    resolve("dl_report.pdf");
                }).catch((error) => {
                    reject(false);
                });


            } else {
                reject(false)
            }




        } else if (identityData.typeofid.toLowerCase().includes("aadha") || identityData.typeofid.toLowerCase().includes("adha")) {
            let aadhaarNum = identityData.idnumber;

            const response = await axios.post(
                "https://kyc-api.surepass.io/api/v1/aadhaar-validation/aadhaar-validation",
                { id_number: aadhaarNum },
                headers
            );

            if (response.status == 200) {
                externalAPIController.saveData(caseData.caseId, identityData.typeofid, response, req);

                const responseData = response.data.data
		    
		                              // added by anil on 6/20/2024 start
                          if(identityData.status==="INPUTQC-ACCEPTED" && String(identityData.client) === "61d6d538e200e4004ea398b9"){

                            await writeRHSANDUpdateVerificationStatus(identityData,responseData,caseData._id,req.user.user_id,"aadhaar");

                          }

                            // added by anil on 6/20/2024 end

                // Making a table with the pan information retrieved.
                let html = this.getBaseHTMLForIdentityCheckReport("Aadhaar", caseData.caseId, identityData.nameasperid);
                html += `
                              <tr>
                                 <td style="font-size: medium;">&nbsp;<b>ID Number</b></td> 
                                 <td style="font-size: medium;">&nbsp;${responseData.aadhaar_number}</td>
                              </tr>
                            
                              <tr>
                                 <td style="font-size: medium;">&nbsp;<b>Gender</b></td>
                                 <td style="font-size: medium;">&nbsp;${responseData.gender == "M" ? "MALE" : "FEMALE"}</td>
                              </tr>
                         
                            </tbody>   
                            </table>
        
                            <div style="margin-top:40px; margin-left:auto; margin-right:auto;;width:96%">                 
                               <h3><strong>Disclaimer:-</strong></h3>
                               <p style="font-size:small; font-family:Calibri, sans-serif;">The content of this report has been sourced from
                                  the government databases & this report has been updated as on the date of verification. 
                                  The data might have been changed, deleted, modified from thereon.</p>
                            </div>
                        </body>
                            
                    </html>`;
                const path = `/REPO_STORAGE/case_uploads/${caseData.caseId}/identity/${identityData._id}/proofofwork`;

                this.convertHtmlToPDF(html, path, "aadhaar_report.pdf").then((value) => {
                    //this.convertHTMLToPDF(html, path, "aadhaar_report.pdf").then((value) => {
                    resolve("aadhaar_report.pdf");
                }).catch((error) => {
                    reject(false);
                });

            } else {
                reject(false)
            }




        }

    })

}

exports.downloadAllDocuments = async (req, res) => {
    try {
        const docName = req.params.docName
        const savePath = "/tmp/" + docName + "Documents"

        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath)
        }

        let docType

        if (docName === "pan") {
            docType = "Pan"
        } else if (docName === "voterId") {
            docType = " Voter ID"
        } else if (docName === "aadhaar") {
            docType = "Adhaar"
        }
        console.log("downloadAllDocuments: docType:", docType)
        const identitiesData = await identity.find({ typeofid: docType })
            .populate('case')
            .sort({ dataEntryCompletionDate: -1 })
            .limit(100)
            .lean()

        console.log("downloadAllDocuments: identity doc length:", identitiesData.length)

        for (let i = 0; i < identitiesData.length; i++) {
            const currData = identitiesData[i]
            const docFolder = `/REPO_STORAGE/case_uploads/${currData.case.caseId}/identity/${currData._id}/candidatedocs`
            const docs = fs.readdirSync(docFolder).filter(item => !item.includes("LOA"))
            const fileName = docs.length ? docs[0] : ""

            if (fileName) {
                console.log("downloadAllDocuments: Copying file for CaseId", currData.case.caseId)
                fs.copyFileSync(`${docFolder}/${fileName}`, `${savePath}/${fileName}-${i}`)

            }
        }

        return res.json({ message: "Downloaded all documents" })
    } catch (err) {
        console.log(err)
        return res.status(200).json({ error: err.message })
    }
}



//Anil-24-May-2024
exports.convertHtmlToPDF = async function (html, filepath, fileName) {

    fs.mkdir(filepath, { recursive: true }, async (err) => {
        if (err) {
            throw err;
        } else {
            try {

                // Create a browser instance
                const browser = await puppeteer.launch({
                    headless: 'new',
                    args: ['--no-sandbox', '--disable-setuid-sandbox']

                });
                // Create a new page
                const page = await browser.newPage();
                await page.setContent(html, { waitUntil: 'domcontentloaded' });
                // To reflect CSS used for screens instead of print
                await page.emulateMediaType('screen');
                // Download the PDF
                const PDF = await page.pdf({
                    path: filepath + "/" + fileName,
                    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                    printBackground: true,
                    format: 'A4',
                });
                // Close the browser instance
                await browser.close();
            } catch (error) {
                console.log(error);
            }

        }


    })

}




////////////20jun2024////
function getHeaders(token){
  const headers = {
      headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      },
  };

  return headers;
}
exports.getBaseHTMLForIdentityCheckReport = function (component, caseId, nameasperid) {
    return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        
        <head>
        <meta charset="utf-8">
        <title>Page-1</title>
        </head>
        
        <body>
        <div style="margin-top:-4px; padding-top:23px;">
        <h1 style=" display:inline;margin-top: 100px;  font-family: Tahoma, sans-serif; font-size:large;"><u>ID Type -
        ${component} Verification</u></h1>
        <img style="width: 150px; margin-bottom: 20px; float: right;" src=${expologo}>
        
        </div>
        <h1 style="margin-top: 60px; margin-bottom:0; margin-left:10px; font-size:medium; color:crimson;">REQUEST CRITERIA
        </h1>
        
        <table
        style=" margin-left: auto; margin-right:auto; border: 1px solid black; margin-top:3px;border-collapse: collapse"
        width="96%" rules="all">
        <tbody>
        
        <tr style="height: 25px;text-align: left;font-size: medium;">
        
        <td style="font-size: medium;">&nbsp;<b>REQUEST DATE :</b></td>
        
        <td style="font-size: medium;">&nbsp;${moment().utcOffset("+05:30").format("DD/MM/YYYY")}</td>
        </tr>
        <tr style="height: 25px;text-align: left;font-size: medium;">
        
        <td style="font-size: medium;">&nbsp;<b>REQUEST NO. : </b></td>
        
        <td style="font-size: medium;">&nbsp;-</td>
        </tr>
        <tr style="height: 25px;text-align: left;font-size: medium;">
        
        <td style="font-size: medium;">&nbsp;<b>REQUESTED INDIVIDUAL NAME :</b></td>
        
        <td style="font-size: medium;">&nbsp;${nameasperid}</td>
        </tr>
        <tr style="height: 25px;text-align: left;font-size: medium;">
        
        <td style="font-size: medium;">&nbsp;<b>REQUESTED NRIC/ID : </b></td>
        
        <td style="font-size: medium;">&nbsp;-</td>
        </tr>
        
        <tr style="height: 25px;text-align: left;font-size: medium;">
        
        <td style="font-size: medium;">&nbsp;<b>CLIENT A/C REF. : </b></td>
        
        <td style="font-size: medium;">&nbsp;${caseId}</td>
        </tr>
        </tbody>
        </table>
        
        <h1 style="margin-top: 20px; margin-bottom:0; margin-left:10px; font-size:medium; color:crimson;">SEARCH RECORD</h1>
        <table
        style=" margin-left: auto; margin-right:auto; border: 1px solid black; margin-top:3px;border-collapse: collapse"
        width="96%" rules="all">
        
        <tbody>`
}
