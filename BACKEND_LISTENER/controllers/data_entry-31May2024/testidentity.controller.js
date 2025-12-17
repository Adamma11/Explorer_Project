
const testidentity = require('../../models/data_entry/testidentity.model')
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
//const uanhidden = require('../../models/data_entry/uanhidden.model')
//const bankstmthidden = require('../../models/data_entry/bankstmthidden.model')
const CaseHistory = require("../../models/data_entry/case_history.model")
const moment = require("moment")

exports.create = (req, res) => {
    if (!req.body.case) {
        res.status(400).json({ message: "Case Id is Mandatory" })
    }
if (!req.body.name) {
                    return res.status(400).json({ message: "name is Mandatory" })
                }
if (!req.body.fathername) {
                    return res.status(400).json({ message: "fathername is Mandatory" })
                }
if (!req.body.dob) {
                    return res.status(400).json({ message: "dob is Mandatory" })
                }
if (!req.body.idtype) {
                    return res.status(400).json({ message: "idtype is Mandatory" })
                }
if (!req.body.idnumber) {
                    return res.status(400).json({ message: "idnumber is Mandatory" })
                }
if (!req.body.status) {
        res.status(400).json({ message: 'Status required' })
    }
    const obj = new testidentity({
        case: req.body.case,
        personalDetailsData: req.body.personalDetails,
        component: req.body.component == null ? "6548c35d2b6cd2c20faf3107" : req.body.component,
name: req.body.name,
            nameRhs: null,
fathername: req.body.fathername,
            fathernameRhs: null,
dob: req.body.dob,
            dobRhs: null,
idtype: req.body.idtype,
            idtypeRhs: null,
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
                    await testidentity.findOneAndUpdate({ _id: obj._id }, { client: caseData.client, subclient: caseData.subclient })
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
                .update({ _id: req.body.case }, { $push: { actualComponents: "testidentity" } })
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
                message: err.message || 'Some error while saving testidentity'
            })
        })
};

exports.findAllForACase = (req, res) => {
    testidentity
        .find({ case: req.params.case })
        .then(data => {
            res.json(data)
        })

        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving testidentity for cases'
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

exports.deleteProofOfWork = (req, res) => {

    fs.unlink('/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/proofofwork/' + req.query.fileName + '.pdf', function (err) {
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

    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
  
name: req.body.name,
fathername: req.body.fathername,
dob: req.body.dob,
idtype: req.body.idtype,
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
                message: err.message || 'Some error while saving testidentity'
            })
        })
};


exports.findOne = (req, res) => {
    testidentity.findOne({ case: req.params.caseId, _id: req.params.componentId })
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
        testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
        testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

        testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            
            
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

        testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            status: req.body.status,
            inputqcComments: req.body.inputqcComments,
            inputqcCompletionDate: new Date(),
            firstInsufficiencyRaisedDate: new Date()
        })
            .then(async data => {
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

exports.clearCostApproval = (req, res) => {
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        status: 'COST-APPROVAL-CLEARED',
        clientClearedBy: req.user.user_id,
        insufficiencyClearedComments: req.body.insufficiencyClearedComments,
    })
        .then(data => {
            caseHistory.create(req.params.caseId, req.body.component, data._id, 'Cost Approval Cleared', 'COST-APPROVAL-CLEARED', req.body.insufficiencyClearedComments, null, null, null, req.user.user_id)
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message | "Error occurred while updating status during input qc"
            })
        })
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
    testidentity.find(query)
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
    testidentity
        .count({ status: req.params.status })
        .then(data => {
            count = data
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error reading checks'
            })
        })
        testidentity.find({ status: req.params.status })
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
    let query = { $or: [{ status: 'INPUTQC-ACCEPTED', branchAllocatedTo: null }, { status: 'MENTOR-REVIEW-REJECTED', branchAllocatedTo: null }, { status: 'OUTPUTQC-REJECTED', branchAllocatedTo: null }, { status: 'FE-COMPLETED', branchAllocatedTo: null }, { status: "FE-INSUF", branchAllocatedTo: null }, { status: 'FE-COULD-NOT-VERIFY', branchAllocatedTo: null }] }
    testidentity.find(query)
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

        testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

nameRhs: req.body.nameRhs,
fathernameRhs: req.body.fathernameRhs,
dobRhs: req.body.dobRhs,
idtypeRhs: req.body.idtypeRhs,
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

    } else {

        const testidentityData = await testidentity.findOne({ case: req.params.caseId, _id: req.params.componentId })
        if (req.body.status.toLowerCase().includes('update') || req.body.status.toLowerCase().includes('cost') || req.body.status.toLowerCase().includes('clarification')) {
            testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

        } else if (!testidentityData.secondInsufficiencyRaisedDate) {

            testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: "INSUF-2-REQ",

                insufficiencyRaisedDate: new Date(),

                insufficiencyComments: req.body.insufficiencyComments,

            })

                .then(data => {

                    caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff 2 Raised', req.body.status, req.body.insufficiencyComments, null, null, null, req.user.user_id)

                    return res.json(data)

                })

                .catch(err => {

                    res.status(500).json({

                        message: err.message | "Error occurred while updating status during input qc"

                    })

                })



        } else if (!testidentityData.thirdInsufficiencyRaisedDate) {

            testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: "INSUF-3-REQ",

                insufficiencyRaisedDate: new Date(),

                insufficiencyComments: req.body.insufficiencyComments,

            })

                .then(data => {

                    caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff 2 Raised', req.body.status, req.body.insufficiencyComments, null, null, null, req.user.user_id)

                    return res.json(data)

                })

                .catch(err => {

                    res.status(500).json({

                        message: err.message | "Error occurred while updating status during input qc"

                    })

                })

        } else if (!testidentityData.fourthInsufficiencyRaisedDate) {

            testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: "INSUF-4-REQ",

                insufficiencyRaisedDate: new Date(),

                insufficiencyComments: req.body.insufficiencyComments,

            })

                .then(data => {

                    caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff 2 Raised', req.body.status, req.body.insufficiencyComments, null, null, null, req.user.user_id)

                    return res.json(data)

                })

                .catch(err => {

                    res.status(500).json({

                        message: err.message | "Error occurred while updating status during input qc"

                    })

                })

        } else if (!testidentityData.fifthInsufficiencyRaisedDate) {

            testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: "INSUF-5-REQ",

                insufficiencyRaisedDate: new Date(),

                insufficiencyComments: req.body.insufficiencyComments,

            })

                .then(data => {

                    caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff 2 Raised', req.body.status, req.body.insufficiencyComments, null, null, null, req.user.user_id)

                    return res.json(data)

                })

                .catch(err => {

                    res.status(500).json({

                        message: err.message | "Error occurred while updating status during input qc"

                    })

                })

        } else {

            return res.status(500).json({ error: "Maximum amount of insuff request reached." })

        }

    }

}

exports.updateFeVerificationStatus = (req, res) => {
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        nameRhs: req.body.nameRhs,fathernameRhs: req.body.fathernameRhs,dobRhs: req.body.dobRhs,idtypeRhs: req.body.idtypeRhs,idnumberRhs: req.body.idnumberRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,status: req.body.status,
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        nameRhs: req.body.nameRhs,fathernameRhs: req.body.fathernameRhs,dobRhs: req.body.dobRhs,idtypeRhs: req.body.idtypeRhs,idnumberRhs: req.body.idnumberRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,status: req.body.status,
        feVerificationCompletionDate: new Date(),
        feInsufficiencyComments: req.body.feInsufficiencyComments,
        personContacted: req.body.personContacted,
        contactNumberOfPersonContacted: req.body.contactNumberOfPersonContacted
    })
        .then(data => {
            caseHistory.create(req.params.caseId, req.body.component, data._id, 'Vendor Verification Completion', req.body.status, req.body.status == 'VENDOR-INSUF' ? req.body.vendorInsufficiencyComments : "Completed by FE", null, null, null, req.user.user_id)
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message | "Error occurred while updating status during input qc"
            })
        })
};


exports.updateVerifierReviewStatus = (req, res) => {
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        nameRhs: req.body.nameRhs,fathernameRhs: req.body.fathernameRhs,dobRhs: req.body.dobRhs,idtypeRhs: req.body.idtypeRhs,idnumberRhs: req.body.idnumberRhs,resultRhs: req.body.resultRhs,verifiedbyRhs: req.body.verifiedbyRhs,verifiedonRhs: req.body.verifiedonRhs,movRhs: req.body.movRhs,status: req.body.status,
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
                                    let checkDetails = `<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Field Value</td><td>Comments</td></tr><tr><td>${caseData.caseId}</td><td>${caseData.candidateName}</td><td>'testidentity Details'</td><td>${data.name}</td><td>${data.gradingComments}</td></tr></table>`
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
exports.approveInsuff2 = async (req, res) => {

    try {

        const testidentityData = await testidentity.findOne({ case: req.params.caseId, _id: req.params.componentId })

        if (!testidentitytData.secondInsufficiencyRaisedDate) {

            const data = await testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: 'INSUF-2-REQ-ACCEPTED',

                scrutinyApprovedBy: req.user.user_id,

                secondInsufficiencyRaisedDate: new Date()

            })

            caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff Level 2 Approved', 'INSUF-2-REQ-ACCEPTED', "Insuf 2 request Accepted", null, null, null, req.user.user_id)

            res.json(data)

        } else if (!testidentityData.thirdInsufficiencyRaisedDate) {

            const data = await testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: 'INSUF-3-REQ-ACCEPTED',

                scrutinyApprovedBy: req.user.user_id,

                thirdInsufficiencyRaisedDate: new Date()

            })

            caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff Level 2 Approved', 'INSUF-2-REQ-ACCEPTED', "Insuf 2 request Accepted", null, null, null, req.user.user_id)

            res.json(data)

        } else if (!testidentityData.fourthInsufficiencyRaisedDate) {

            const data = await testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: 'INSUF-4-REQ-ACCEPTED',

                scrutinyApprovedBy: req.user.user_id,

                fourthInsufficiencyRaisedDate: new Date()

            })

            caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff Level 2 Approved', 'INSUF-2-REQ-ACCEPTED', "Insuf 2 request Accepted", null, null, null, req.user.user_id)

            res.json(data)

        } else if (!testidentityData.fifthInsufficiencyRaisedDate) {

            const data = await testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: 'INSUF-5-REQ-ACCEPTED',

                scrutinyApprovedBy: req.user.user_id,

                fifthInsufficiencyRaisedDate: new Date()

            })

            caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff Level 2 Approved', 'INSUF-2-REQ-ACCEPTED', "Insuf 2 request Accepted", null, null, null, req.user.user_id)

            res.json(data)

        }

    } catch (err) {

        console.log(err)

        return res.status(500).json(err.message)

    }
};
// exports.approveInsuff2 = (req, res) => {
//     testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
//         status: 'INSUF-2-REQ-ACCEPTED',
//         scrutinyApprovedBy: req.user.user_id,
//     })
//         .then(data => {
//             caseHistory.create(req.params.caseId, req.body.component, data._id, 'Insuff Level 2 Approved', 'INSUF-2-REQ-ACCEPTED', "Insuf 2 request Accepted", null, null, null, req.user.user_id)
//             res.json(data)
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: err.message | "Error occurred while updating status during input qc"
//             })
//         })
// };
exports.rejectInsuff2 = (req, res) => {
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        verificationAllocatedTo: req.user.user_id,
        verificationAllocationDate: Date.now(),
    })
        .then(data => {
            // caseHistory.create(req.params.caseId, req.body.component, data._id, 'Allocate Check to myself', 'ALLOCATE-CHECK', 'Allocate Check to myself', null, null, req.user.user_id, req.user.user_id)
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message | "Error occurred while updating status during mentor review"
            })
        })
};
exports.getAllChecksAllocatedToMeForVerification = (req, res) => {

    testidentity
        .find({ $or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: req.user.user_id }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user.user_id }, { status: 'OUTPUTQC-REJECTED', verificationAllocatedTo: req.user.user_id }] })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'personalDetailsData' })
        .lean()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving testidentity for cases'
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
    let page = req.query.pageCount;
    let offSet = page * 50;
    let count = 0;

    UserSubclientAccess.find({ user: req.user.user_id }, { subclient: 1, _id: 0 })

        .then(userSubclientData => {

            testidentity
                .find({ $and: [{ $or: [{ status: 'INSUF-1-REQ-ACCEPTED' }, { status: 'INSUF-2-REQ-ACCEPTED' }, { status: 'INSUF-3-REQ-ACCEPTED' }, { status: 'INSUF-4-REQ-ACCEPTED' }, { status: 'INSUF-5-REQ-ACCEPTED' }, { status: 'INSUF-1-CLEARANCE-REJECTED' }, { status: 'INSUF-2-CLEARANCE-REJECTED' }] }, { $or: userSubclientData }] })
                .sort({ _id: 1 })
                .skip(offSet)
                .limit(50)
                .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
                .then(data => {
                    res.json(data)
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message || 'Some error while retrieving testidentity for cases'
                    })
                })
        })

        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving testidentity for cases'
            })
        })
}

exports.searchACaseForInsuffForClient = (req, res) => {

    console.log("In search for insuff case testidentity, case id required is ", req.query.caseId)

    Case
        .findOne({ caseId: req.query.caseId })
        .then(caseData => {
            console.log("Case Data found for testidentity insuff")
            console.log("About  to find subclients for  user", req.user.user_id)
            UserSubclientAccess.find({ user: req.user.user_id }, { _id: 0, subclient: 1 })
                .then(userSubclientData => {
                    console.log("In testidentity insuff user subclient access is ", userSubclientData)
                    testidentity
                        .find({ $and: [{ $or: [{ status: 'INSUF-1-REQ-ACCEPTED' }, { status: 'INSUF-2-REQ-ACCEPTED' }, { status: 'INSUF-3-REQ-ACCEPTED' }, { status: 'INSUF-4-REQ-ACCEPTED' }, { status: 'INSUF-5-REQ-ACCEPTED' }, { status: 'INSUF-1-CLEARANCE-REJECTED' }, { status: 'INSUF-2-CLEARANCE-REJECTED' }] }, { $or: userSubclientData }, { case: caseData._id }] })
                        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
                        .then(data => {
                            console.log("Found the testidentity insuff data ", data)
                            res.json(data)
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: "Error searching insuff for testidentity"
                            })
                        })
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Error Reading User Subclient Data for Insuff Search"
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error Reading Case Data"
            })
        })
}

exports.getInsuffForScrutiny = (req, res) => {

    testidentity

        .find({ $or: [{ status: 'INSUF-1-CLEARED' }, { status: 'INSUF-2-CLEARED' }, { status: 'INSUF-2-REQ' }, { status: 'INSUF-3-REQ' }, { status: 'INSUF-4-REQ' }, { status: 'INSUF-5-REQ' }, { status: 'CLARIFICATION-REQ' }, { status: 'COST-APPROVAL-REQ' }] })

        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })

        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })

        .then(data => {

            res.json(data)

        })

        .catch(err => {

            res.status(500).json({

                message: err.message || 'Some error while retrieving testidentity for cases'

            })

        })

};

exports.approveInsuffClearance = async (req, res) => {

    try {

        if (req.body.status == "INSUF-2-CLEARED") {

            const testidentityData = await testidentity.findOne({ case: req.params.caseId, _id: req.params.componentId })

            if (!testidentityData.secondInsufficiencyClearedDate) {

                const data = await testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                    status: 'INPUTQC-ACCEPTED',

                    insufficiencyClearedDate: Date.now(),

                    secondInsufficiencyClearedDate: new Date()

                })

                res.json(data)

            } else if (!testidentityData.thirdInsufficiencyClearedDate) {

                const data = await testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                    status: 'INPUTQC-ACCEPTED',

                    insufficiencyClearedDate: Date.now(),

                    thirdInsufficiencyClearedDate: new Date()

                })

                res.json(data)

            } else if (!testidentityData.fourthInsufficiencyClearedDate) {

                const data = await testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                    status: 'INPUTQC-ACCEPTED',

                    insufficiencyClearedDate: Date.now(),

                    fourthInsufficiencyClearedDate: new Date()

                })

                res.json(data)

            } else if (!testidentityData.fifthInsufficiencyClearedDate) {

                const data = await testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                    status: 'INPUTQC-ACCEPTED',

                    insufficiencyClearedDate: Date.now(),

                    fifthInsufficiencyClearedDate: new Date()

                })

                res.json(data)

            }

        } else {

            testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {

                status: 'INPUTQC-ACCEPTED',

                insufficiencyClearedDate: Date.now(),

                firstInsufficiencyClearedDate: new Date()

            })

                .then(data => {

                    res.json(data)

                })

                .catch(err => {

                    res.status(500).json({

                        message: err.message | "Error occurred while updating status during input qc"

                    })

                })

        };

    } catch (err) {

        console.log(err)

        return res.json(err.message)

    }



}

exports.deleteCheck = (req, res) => {
    testidentity.findOneAndDelete({ case: req.params.caseId, _id: req.params.componentId })
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

    testidentity
        .findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    testidentity
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        
nameRhs: req.body.nameRhs,
fathernameRhs: req.body.fathernameRhs,
dobRhs: req.body.dobRhs,
idtypeRhs: req.body.idtypeRhs,
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
        reinitiationDate: new Date(),
        reinitiationComments: req.body.reinitiationComments
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
    const CaseHistory = require("../../models/data_entry/case_history.model")

    // Restricting Follow Ups if current follow up or follow ups before that exists

    try {
        if (req.body.effortType.includes('Followup')) {
            const followUpNumber = Number(req.body.effortType[8])
            console.log(followUpNumber)
            const caseHistoryData = await CaseHistory.find({ case: req.params.caseId, check: req.params.componentId, operation: /Followup/ })
            console.log("CHD:", caseHistoryData)
            if (!caseHistoryData.length) {  
                if (followUpNumber !== 1) {
                    return res.status(400).json({ message: `Next follow up should be Follow Up 1` })
                }
            } else {
                const latestFollowUp = caseHistoryData[caseHistoryData.length - 1]
                const latestFollowUpNumber = Number(latestFollowUp.operation[8])
                if (latestFollowUpNumber == 6) {
                    return res.status(400).json({ message: "Follow Up Limit Reached" })
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


    testidentity
        .findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            stage: 'WIP',
            nextfollowupdate: moment(req.body.nextfollowupdate).format("DD-MMM-YYYY"),
            expectedclosuredate: moment(req.body.expectedclosuredate).format("DD-MMM-YYYY"),
            modifiedBy: req.user.user_id,
            $inc: { efforts: 1 }
        })
        .then(async data => {
            const caseHistoryData = new CaseHistory({
                case: req.body.case_id,
                component: data.component,
                check: data._id,
                operation: req.body.effortType,
                status: 'EFFORT ADDED',
                remarks: req.body.note,
                nextfollowupdate: moment(req.body.nextfollowupdate).format("DD-MMM-YYYY"),
                expectedclosuredate: moment(req.body.expectedclosuredate).format("DD-MMM-YYYY"),
                date: moment(Date.now()).add(5, 'hours').add(30, 'minutes'),
                user: req.user.user_id
            })
            await caseHistoryData.save()
            res.json(data)
        })

        .catch(err => {
            res.status(500).json({
                message: err.message | "Some error occurred while putting a check to Vendor bucket"
            })
        })
};
exports.getChecksWhereGradeOneIsNullAndGradeNotNull = (req, res) => {
    testidentity
        .find({ subclient: null })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .then(data => {
            data.forEach(item => {
                console.log("About to update subclient of testidentity", item._id)
                testidentity
                    .findOneAndUpdate({ _id: item._id }, { subclient: item.case.subclient._id, client: item.case.subclient.client._id })
                    .then(data => {
                    })
                    .catch(err => {
                        console.log("Error in updating testidentity ", err)
                    })
            })
            res.json({ message: "Completed" })
        })
        .catch(err => {
            console.log("Error reading testidentity", err)
            res.status(500).json({
                message: "Error reading User"
            })
        })
}

exports.createForCde = (req, res) => {
    console.log("In testidentity Create for CDE")
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
if (!req.body.idtype) {
            res.status(400).json({ message: "idtype is Mandatory" })
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
        
    console.log("Case Id for testidentity CDE ", caseId)
    if (caseId != null) {
        const obj = new testidentity({
        case: req.body.case,
        personalDetailsData: req.body.personalDetails,
        component: req.body.component == null ? "6548c35d2b6cd2c20faf3107" : req.body.component,
name: req.body.name,
            nameRhs: null,
fathername: req.body.fathername,
            fathernameRhs: null,
dob: req.body.dob,
            dobRhs: null,
idtype: req.body.idtype,
            idtypeRhs: null,
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
            modifiedBy: null
        });
        console.log("Object for saving created in CDE for testidentity")
        if (req.body.status == 'CDE-COMPLETED') {
            obj.dataEntryCompletionDate = new Date()
        } else {
            obj.insufficiencyComments = req.body.insufficiencyComments
        }
        console.log("About to save testidentity for CDE")
        obj
            .save(obj)
            .then(data => {
                caseHistory.create(req.body.case, req.body.component, data._id, 'Creating a Check', 'DE-COMPLETED', 'Check Created', null, null, null, null)
                Case
                    .update({ _id: req.body.case }, { $push: { actualComponents: "testidentity" } })
                    .then(data => {
                        console.log("Updated the case ", data)
                    })
                    .catch(err => {
                        console.log("Error updating case ", data.caseId)
                    })


                res.json(data)
            })
            .catch(err => {
                console.log("Error Occurred while creating the testidentity for CDE ", err)
                res.status(500).json({
                    message: err.message || 'Some error while saving testidentity'
                })
            })
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
};
exports.findOneForCde = (req, res) => {
    console.log("In testidentity for CDE Find One")
    let caseId = req.caseId
    if (caseId != null) {
        testidentity.findOne({ case: req.params.caseId, serialNumber: req.params.serialNumber })
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
        testidentity.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            
name: req.body.name,
fathername: req.body.fathername,
dob: req.body.dob,
idtype: req.body.idtype,
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
                    message: err.message || 'Some error while saving testidentity'
                })
            })
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
exports.deleteCheckForCde = (req, res) => {
    let caseId = req.caseId
    if (caseId != null) {
        testidentity.findOneAndDelete({ case: req.params.caseId, _id: req.params.componentId })
            .then(data => {
                caseHistory.create(req.body.case, req.body.component, data._id, 'Deleting a check', 'Check Deleted', 'Check Deleted', null, null, null, null)
                acase.deleteCheck(req.params.caseId, data.component, data._id)
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
exports.deleteAllFilesForCde = (req, res) => {
    let caseId = req.caseId
    if (caseId != null) {
        fs.rmSync('/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/candidatedocs/', { recursive: true, force: true })
        res.json({ message: "File Deleted" });

    }
};

exports.addquicknote = async (req, res) => {
    try {
        const caseData = await testidentity.findOne({ _id: req.body._id })
        const caseComments = []
        Object.assign(caseComments, caseData ? caseData.comments : null)
        const commentToPush = { user: mongoose.Types.ObjectId(req.user.user_id), date: new Date(), comment: req.body.comment, colorType: req.body.colorType }
        caseComments.push(commentToPush)
        const updatedCaseData = await testidentity.findOneAndUpdate({ _id: req.body._id }, { comments: caseComments })
        return res.json(updatedCaseData)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
    }
}

exports.getAllquicknoteForACheck = async (req, res) => {
    try {
        let result = new Array()
        const caseData = await testidentity.findOne({ _id: req.params._id })
        let comments = caseData.comments
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i]
            const userData = await userModel.findOne({ _id: comment.user })
            result.push({ user: userData, date: comment.date, comment: comment.comment, colorType: comment.colorType })
        }
        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
    }
}

