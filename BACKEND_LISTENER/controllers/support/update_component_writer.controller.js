const fs = require('fs')
const Component = require("../../models/administration/component.model")
const ComponentField = require("../../models/administration/component_field.model")
const path = require('path')

exports.updateComponentDetails = async (req, res) => {
    try {

        console.log("logged data == ", req.body);
        console.log("data == ", req.params);


        const componentName = req.body.name
        const componentDisplayName = req.body.displayName
        const fileUploadRequired = req.body.fileUploadRequired
        const type = req.body.type
        const componentFields = req.body.componentFields
        const component_id = req.params._id

        // Check if the component exists in the database

        const existingComponent = await Component.findOne({ _id: component_id });
        if (existingComponent) {
            // Deleteing Existing Files like - (controller, routes, models)
            await deleteExistingComponentDetails(componentName, component_id);
        }

        // Add component to db
        const component = new Component({
            name: req.body.name,
            displayName: req.body.displayName,
            fileUploadRequired: req.body.fileUploadRequired,
            allowCopyingFrom: null,
            type: req.body.type,
            modifiedBy: null
        });

        const componentData = await component.save()

        console.log("component saved!")

        // Adding the component Fields
        writeComponentFields(req.body.componentFields, componentData._id)

        // Add to all app routes
        addToAllAppRoutes(componentName)


        // Create a new route file
        writeRouter(componentName)

        // Create a cde route file
        writeCdeRouter(componentName)

        // Write the controller
        writeController(componentName, componentFields, componentData._id)

        // Write the model
        writeModel(componentName, req.body.componentFields)


        return res.json({ message: "wrote the component successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "could not write the component" })
    }
}


function writeController(componentName, componentFields, component_id) {
	console.log("Test read:")
    try {
        let controller = `
const ${componentName} = require('../../models/data_entry/${componentName}.model')
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
const Component = require('../../models/administration/component.model');
const ComponentField = require('../../models/administration/component_field.model');
const CheckHistory  = require('../../models/administration/checkHistory.model');

exports.create = async (req, res) => {
    if (!req.body.case) {
        res.status(400).json({ message: "Case Id is Mandatory" })
    }
 const caseObj = await Case.findOne({_id: req.body.case})
let numComponents = Number(caseObj.actualComponents.length)
numComponents++
    `
        for (let i = 0; i < componentFields.length; i++) {
            console.log(componentFields[i])
            const currField = componentFields[i].lhsRhs == "BOTH" ? componentFields[i] : null
            if (currField) {
                controller += `\nif (!req.body.${currField.name}) {
                    return res.status(400).json({ message: "${currField.name} is Mandatory" })
                }`
            }

        }
        controller += `\nif (!req.body.status) {
        res.status(400).json({ message: 'Status required' })
    }
    const obj = new ${componentName}({
        case: req.body.case,
        personalDetailsData: req.body.personalDetails,
        component: req.body.component == null ? "${component_id}" : req.body.component,
        checkId: checkId,`

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `\n${currField.name}: req.body.${currField.name},
            ${currField.name}Rhs: null,`
        }
        controller += `\nstatus: req.body.status,
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
                    await ${componentName}.findOneAndUpdate({ _id: obj._id }, { client: caseData.client, subclient: caseData.subclient })
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
                .update({ _id: req.body.case }, { \$push: { actualComponents: "${componentName}" } })
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
                message: err.message || 'Some error while saving ${componentName}'
            })
        })
};

exports.findAllForACase = (req, res) => {
    ${componentName}
        .find({ case: req.params.case })
        .then(data => {
            res.json(data)
        })

        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving ${componentName} for cases'
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

    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
  `

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `\n${currField.name}: req.body.${currField.name},`
        }
        controller += `\nstatus: req.body.status,
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
                message: err.message || 'Some error while saving ${componentName}'
            })
        })
};


exports.findOne = (req, res) => {
    ${componentName}.findOne({ case: req.params.caseId, _id: req.params.componentId })
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
        ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
        ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

        ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {`

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `\n${currField.name}: req.body.${currField.name},`
        }

        controller += `\nstatus: req.body.status,

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

        ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {`

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `\n${currField.name}: req.body.${currField.name},`
        }

        controller += `status: req.body.status,
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
        query = { \$or: [{ status: 'DE-COMPLETED' }, { status: 'INPUTQC-REJECTED' }] }
    }
    if (req.params.for == 'VERIFICATION') {
        query = { \$or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: req.user_userId }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user_userId }, { status: "OUTPUTQC-REJECTED", verificationAllocatedTo: req.user_userId }, { status: 'FE-COMPLETED' }, { status: "FE-INSUF" }, { status: 'FE-COULD-NOT-VERIFY' }] }
    }
    if (req.params.for == 'VERIFICATION-TL') {
        query = { \$or: [{ status: 'INPUTQC-ACCEPTED', branchAllocatedTo: { \$ne: null } }, { status: 'MENTOR-REVIEW-REJECTED', branchAllocatedTo: { \$ne: null } }, { status: "OUTPUTQC-REJECTED", verificationAllocatedTo: { \$ne: null } }, { status: 'FE-COMPLETED', branchAllocatedTo: { \$ne: null } }, { status: "FE-INSUF", branchAllocatedTo: { \$ne: null } }, { status: 'FE-COULD-NOT-VERIFY', branchAllocatedTo: { \$ne: null } }] }
    }
    if (req.params.for == 'FE-TL') {
        query = { \$or: [{ status: 'ALLOCATE-TO-FE' }, { status: 'ALLOCATED-TO-FE' }] }
    }
    if (req.params.for == 'FE-VERIFICATION') {
        query = { \$or: [{ status: 'ALLOCATED-TO-FE', allocatedToFE: req.user.user_id }, { status: 'VERIFIER-REJECTED', allocatedToFE: req.user.user_id }, { status: 'ALLOCATE-TO-FE', allocatedToFE: null }] }
    }
    if (req.params.for == 'FE-VERIFIED') {
        query = { \$or: [{ status: 'FE-COMPLETED' }, { status: "FE-INSUF" }, { status: 'FE-COULD-NOT-VERIFY' }] }
    }
    if (req.params.for == 'VENDOR-MANAGER') {
        query = { \$or: [{ status: 'ALLOCATE-TO-VENDOR' }, { status: 'ALLOCATED-TO-VENDOR' }] }
    }
    if (req.params.for == 'VENDOR-VERIFICATION') {
        query = { \$or: [{ status: 'ALLOCATED-TO-VENDOR', allocatedToVendor: req.user.user_id }, { status: 'VERIFIER-REJECTED', allocatedToVendor: req.user.user_id }] }
    }
    if (req.params.for == 'VENDOR-VERIFIED') {
        query = { \$or: [{ status: 'VENDOR-COMPLETED' }, { status: "VENDOR-INSUF" }, { status: 'VENDOR-COULD-NOT-VERIFY' }] }
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
    ${componentName}.find(query)
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
    ${componentName}
        .count({ status: req.params.status })
        .then(data => {
            count = data
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error reading checks'
            })
        })
        ${componentName}.find({ status: req.params.status })
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
    // let query = { \$or: [{ status: 'INPUTQC-ACCEPTED', branchAllocatedTo: null }, { status: 'MENTOR-REVIEW-REJECTED', branchAllocatedTo: null }, { status: 'OUTPUTQC-REJECTED', branchAllocatedTo: null }, { status: 'FE-COMPLETED', branchAllocatedTo: null }, { status: "FE-INSUF", branchAllocatedTo: null }, { status: 'FE-COULD-NOT-VERIFY', branchAllocatedTo: null }] }
    
    let query = { \$or: [{ status: 'INPUTQC-ACCEPTED' }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user_userId, branchAllocatedTo: null }, { status: 'OUTPUTQC-REJECTED', verificationAllocatedTo: req.user_userId, branchAllocatedTo: null }, { status: 'FE-COMPLETED', verificationAllocatedTo: req.user.user_id, branchAllocatedTo: null }, { status: "FE-INSUF", verificationAllocatedTo: req.user.user_id, branchAllocatedTo: null }, { status: 'FE-COULD-NOT-VERIFY', verificationAllocatedTo: req.user.user_id, branchAllocatedTo: null }] }

    ${componentName}.find(query)
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
  try {
    const { caseId, componentId } = req.params;
    const existing = await ${componentName}.findOne({ case: caseId, _id: componentId });
    if (!existing) return res.status(404).json({ message: 'Component not found' });

    const updateData = {

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

      const updated = await ${componentName}.findOneAndUpdate(
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
      return ${componentName}.findOneAndUpdate(
        { case: caseId, _id: componentId },
        {
          ...updateData,
          stage: 'WIP'
        }
      ).then(data => res.json(data)).catch(err => {
        res.status(500).json({ message: err.message || "Error occurred while updating status during input qc" });
      });
    } else if (req.body.status === 'ON-HOLD') {
      return ${componentName}.findOneAndUpdate(
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
      return ${componentName}.findOneAndUpdate(
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
      return ${componentName}.findOneAndUpdate(
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
      return ${componentName}.findOneAndUpdate(
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

exports.updateFeVerificationStatus = (req, res) => {
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {`

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `${currField.name}Rhs: req.body.${currField.name}Rhs,`
        }

        controller += `\nstatus: req.body.status,
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
        `

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `${currField.name}Rhs: req.body.${currField.name}Rhs,`
        }

        controller += `\nstatus: req.body.status,
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {`

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `${currField.name}Rhs: req.body.${currField.name}Rhs,`
        }

        controller += `\nstatus: req.body.status,
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

exports.updateMentorReviewStatus = async (req, res) => {
    try {
        const { caseId, componentId } = req.params;
        const existing = await ${componentName}.findOne({ case: caseId, _id: componentId });
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
 return acc;
        }, []);

        const updated = await ${componentName}.findOneAndUpdate(
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
		                                    let checkDetails = \`<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Field Value</td><td>Comments</td></tr><tr><td>\${caseData.caseId}</td><td>\${caseData.candidateName}</td><td>'${componentName} Details'</td><td>\${data.${componentFields[0].name}}</td><td>\${data.gradingComments}</td></tr></table>\`

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

exports.updateOutputqcStatus = (req, res) => {
        ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {`

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `${currField.name}Rhs: req.body.data.${currField.name}Rhs,`
        }

        controller += `\nstatus: req.body.status,
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'INPUTQC-ACCEPTED',
        nextfollowupdate: null,
        stage: 'INSUF-REJ',
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'INSUF-2-CLEARED',
        stage: 'INSUF-CLEAR',
        nextfollowupdate: null,
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
		status: 'INSUF-2-CLEARANCE-REJECTED',
        stage: 'INSUF-REJ',
        nextfollowupdate: null,
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    ${componentName}

        .find({ \$or: [{ status: 'INPUTQC-ACCEPTED', verificationAllocatedTo: req.user.user_id }, { status: 'MENTOR-REVIEW-REJECTED', verificationAllocatedTo: req.user.user_id }, { status: 'ON-HOLD', verificationAllocatedTo: req.user.user_id },{ status: 'DRAFT', verificationAllocatedTo: req.user.user_id } ,{ status: 'OUTPUTQC-REJECTED', verificationAllocatedTo: req.user.user_id }] })
        
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'personalDetailsData' })
        .lean()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving ${componentName} for cases'
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

            ${componentName}
				.find({ \$or: [{ status: 'INSUF-1-REQ-ACCEPTED' }, { status: 'INSUF-2-REQ-ACCEPTED' }, { status: 'INSUF-1-CLEARANCE-REJECTED' }, { status: 'INSUF-2-CLEARANCE-REJECTED' }] })
                .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })

				.then(async data => {
					let reqArray = await getReqArray(userSubclientData, data)
					res.json(reqArray)
				})
                .catch(err => {
                    res.status(500).json({
                        message: err.message || 'Some error while retrieving ${componentName} for cases'
                    })
                })
        })

        .catch(err => {
            res.status(500).json({
                message: err.message || 'Some error while retrieving ${componentName} for cases'
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

    ${componentName}

		.find({ \$or: [{ status: 'INSUF-1-CLEARED' }, { status: 'INSUF-2-CLEARED' }, { status: 'INSUF-2-REQ' }, { status: 'CLARIFICATION-REQ' }, { status: 'COST-APPROVAL-REQ' }] })\
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })

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

    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    ${componentName}.findOneAndDelete({ case: req.params.caseId, _id: req.params.componentId })
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

    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    ${componentName}
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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
    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
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

    ${componentName}
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
        const caseData = await ${componentName}.findOne({ _id: req.body._id })
        const caseComments = []
                Object.assign(caseComments, caseData ? caseData.comments : null)
                const commentToPush = { user: mongoose.Types.ObjectId(req.user.user_id), date: new Date(), comment: req.body.comment, colorType: req.body.colorType }
                caseComments.push(commentToPush)
        const updatedCaseData = await ${componentName}.findOneAndUpdate({ _id: req.body._id }, { comments: caseComments })
                return res.json(updatedCaseData)

        } catch (err) {
                console.log(err)
                return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
        }
}

exports.getAllquicknoteForACheck = async (req, res) => {
    try {
                let result = new Array()
        const caseData = await ${componentName}.findOne({ _id: req.params.case_id })
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
    console.log("In ${componentName} Create for CDE")
    let caseId = req.caseId
    if (!req.body.case) {
        res.status(400).json({ message: "Case Id is Mandatory" })
    }`
        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `\nif (!req.body.${currField.name}) {
            res.status(400).json({ message: "${currField.name} is Mandatory" })
        }`
        }
        controller += `\nif (!req.body.status) {
    res.status(400).json({ message: 'Status required' })
}
}

exports.findOneForCde = (req, res) => {
    console.log("In ${componentName} for CDE Find One")
    let caseId = req.caseId
    if (caseId != null) {
        ${componentName}.findOne({ case: req.params.caseId, serialNumber: req.params.serialNumber })
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
        ${componentName}.findOneAndUpdate({ case: req.params.caseId, _id: req.params.componentId }, {
            `

        for (let i = 0; i < componentFields.length; i++) {
            const currField = componentFields[i]
            controller += `\n${currField.name}: req.body.${currField.name},`
        }
        controller += `\nstatus: req.body.status,
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
                    message: err.message || 'Some error while saving ${componentName}'
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

`

        fs.writeFileSync(`controllers/data_entry/${componentName}.controller.js`, controller, { flag: "w" })
        console.log('The controller has been saved!');
    } catch (err) {
        throw new Error(err.message)
    }

}


function writeRouter(componentName) {
    try {
        const router = `
const ${componentName} = require('../controllers/data_entry/${componentName}.controller');
const express = require('express');
const router = express.Router();


router.post("/",${componentName}.create);
router.get("/:case",${componentName}.findAllForACase);
router.get("/findone/:caseId/:componentId",${componentName}.findOne);
router.post("/uploadfile",${componentName}.uploadFile);
router.post("/uploadproofofwork",${componentName}.uploadProofOfWork);
router.post("/uploadpvproofofwork",${componentName}.uploadPvProofOfWork);
router.post("/uploadpaymentproof",${componentName}.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",${componentName}.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",${componentName}.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",${componentName}.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",${componentName}.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",${componentName}.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",${componentName}.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",${componentName}.readPaymentProofs);
router.put("/:caseId/:componentId",${componentName}.update);
router.put("/updatedataentrystatus/:caseId/:componentId",${componentName}.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",${componentName}.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",${componentName}.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",${componentName}.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",${componentName}.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",${componentName}.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",${componentName}.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",${componentName}.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",${componentName}.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",${componentName}.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",${componentName}.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",${componentName}.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",${componentName}.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",${componentName}.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",${componentName}.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",${componentName}.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",${componentName}.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",${componentName}.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",${componentName}.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",${componentName}.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",${componentName}.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",${componentName}.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",${componentName}.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",${componentName}.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",${componentName}.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",${componentName}.addNote);
router.get("/findcomponentsfor/:for",${componentName}.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",${componentName}.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",${componentName}.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",${componentName}.reinitiateCheck);
// router.get("/",${componentName}.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", ${componentName}.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", ${componentName}.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", ${componentName}.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", ${componentName}.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        `
        fs.writeFileSync(`routes/${componentName}.routes.js`, router, { flag: "w" })
        console.log('The router has been saved!');
    } catch (err) {
        throw new Error(err.message)
    }
}


function writeModel(componentName, componentFields) {
    let model = `
    const mongoose = require('mongoose')
const ${componentName}Schema = mongoose.Schema({
case:{type:mongoose.Schema.Types.ObjectId,ref:'Case',required:true},
comments:[],
colorType:{type:String},
checkId: {type:String},
serialNumber:{type:Number},
// efforts:{type:Number},
client:{type:mongoose.Schema.Types.ObjectId,ref:'Client'},
subclient:{type:mongoose.Schema.Types.ObjectId,ref:'Subclient'},	
component:{type:mongoose.Schema.Types.ObjectId,ref:'Component'},
personalDetailsData:{type:mongoose.Schema.Types.ObjectId,ref:'PersonalDetailsData'},
`
    for (let i = 0; i < componentFields.length; i++) {
        const currField = componentFields[i]
        if (currField.type == 'TEXT') {
            if (currField.lhsRhs == "BOTH") {
                model += `\n${currField.name}:{type:String},`
                model += `\n${currField.name}Rhs:{type:String},`
            } else if (currField.lhsRhs == "RHS") {
                model += `\n${currField.name}Rhs:{type:String},`
            }

        } else if (currField.type == 'DATE') {
            if (currField.lhsRhs == "BOTH") {
                model += `\n${currField.name}:{type:Date},`
                model += `\n${currField.name}Rhs:{type:Date},`
            } else if (currField.lhsRhs == "RHS") {
                model += `\n${currField.name}Rhs:{type:Date},`
            }
        }
    }
    model += `
 \nearlierStage:{type:String},
stage:{type:String},
status:{type:String},
onHoldComments:{type:String},
onHoldCommentsDate:{type:Date},
updateLhsComments:{type:String},
updateLhsDate:{type:Date},	
nextfollowupdate:{type:String},
expectedclosuredate:{type:String},
insufficiencyRaisedDate:{type:Date},
insufficiencyClearedDate:{type:Date},
insufficiencyClearanceRejectionDate:{type:Date},
insufficiencyComments:{type:String},
insufficiencyClearedComments:{type:String},
insufficiencyRejectionComments:{type:String},
insufficiencyClearanceRejectionComments:{type:String},
insufficiencyClearanceRejectedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
dataEntryCompletionDate:{type:Date},
dataEntryCompletedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
inputqcComments:{type:String},
inputqcCompletionDate:{type:Date},
branchAllocatedTo:{type:mongoose.Schema.Types.ObjectId,ref:'Branch'},
verificationAllocatedDate:{type:Date},
verificationAllocatedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
mentorAllocatedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
allocatedToFE:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
feAllocationDate:{type:Date},
allocatedToVendor:{type:mongoose.Schema.Types.ObjectId,ref:'Vendor'},
vendorAllocationDate:{type:Date},
feInsufficiencyComments:{type:String},
feVerificationCompletionDate:{type:String},
vendorInsufficiencyComments:{type:String},
vendorVerificationCompletionDate:{type:String},
verifierReviewComments:{type:String},
verificationStatus:{type:String},
verificationComments:{type:String},
verificationCompletionDate:{type:Date},
verificationCompletedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
personContacted:{type:String},
contactNumberOfPersonContacted:{type:String},
mentorReviewComments:{type:String},
mentorReviewCompletionDate:{type:Date},
mentorReviewCompletedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
scrutinyRejectionReason:{type:String},
scrutinyApprovedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
clientClearanceRemarks:{type:String},
clientClearedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
outputqcComments:{type:String},
outputqcCompletionDate:{type:Date},
reinitiationComments:{type:String},
reinitiationDate:{type:Date},
grade:{type:String},
gradingComments:{type:String},
effortType:{type:String},
interimOrFinal:{type:String},
nextfollowupdate:{type:String},
expectedclosuredate:{type:String},
mode:{type:String},
modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
modifiedOn:{type:Date,default:Date.now}
})
module.exports = mongoose.model('${componentName}',${componentName}Schema);

    `
    fs.writeFileSync(`models/data_entry/${componentName}.model.js`, model)
    console.log("Wrote the model file.")
}

async function writeComponentFields(componentFields, component_id) {
    for (let i = 0; i < componentFields.length; i++) {
        const componentField = new ComponentField({
            name: componentFields[i].name,
            component: component_id,
            type: componentFields[i].type,
            values: componentFields[i].values,
            size: componentFields[i].size,
            mandatory: componentFields[i].mandatory,
            label: componentFields[i].label,
            fieldNumber: componentFields[i].fieldNumber,
            conditionField: componentFields[i].conditionField,
            condition: componentFields[i].condition,
            conditionValue: componentFields[i].conditionValue,
            lhsRhs: componentFields[i].lhsRhs
        })
        await componentField.save()
    }

    console.log("Added component fields to database")
}


function addToAllAppRoutes(componentName) {

    const allroutes = fs.readFileSync("routes/all_app_routes.routes.js", { encoding: "utf-8" })
    const insertPosition = allroutes.lastIndexOf('}');
    const route = `    app.use("/api/${componentName}", authenticateToken ,require("../routes/${componentName}.routes"))
    app.use("/api/${componentName}forcde", authenticateToken ,require("../routes/${componentName}_for_cde.routes"))
    `
    const rest = allroutes.slice(insertPosition)
    let placeToInsert = allroutes.slice(0, insertPosition)
    placeToInsert += route
    placeToInsert += rest

    fs.writeFileSync("routes/all_app_routes.routes.js", placeToInsert)

}

function deleteComponentFiles(componentName) {
    if (fs.existsSync(path.join(__dirname, `../../models/data_entry/${componentName}.model.js`))) {
        fs.rmSync(path.join(__dirname, `../../models/data_entry/${componentName}.model.js`))
        console.log("Model File Deleted...")
    }

    if (fs.existsSync(path.join(__dirname, `../../controllers/data_entry/${componentName}.controller.js`))) {
        fs.rmSync(path.join(__dirname, `../../controllers/data_entry/${componentName}.controller.js`))
        console.log("Controller File Deleted...")
    }

    if (fs.existsSync(path.join(__dirname, `../../routes/${componentName}.routes.js`))) {
        fs.rmSync(path.join(__dirname, `../../routes/${componentName}.routes.js`))
        console.log("Routes File Deleted...")
    }
}

async function updateComponentFields(componentName, componentData) {
    const componentFields = componentData.componentFields
    delete componentData.componentFields
    let model
    if (fs.existsSync(path.join(__dirname, `../../models/${componentName}.model`))) {
        model = require(`../../models/${componentName}.model`)
        let modelData = await model.findOneAndUpdate({ name: componentName }, componentData)
        console.log("Model Data updated...")
        await ComponentField.deleteMany({ component: modelData._id })
        console.log("Component Fields Deleted...")
        await ComponentField.insertMany(componentFields)
        console.log("Component Fields Added...")
    }
}

function writeCdeRouter(componentName) {
    try {
        const router = `
const ${componentName} = require('../controllers/data_entry/${componentName}.controller');
const express = require('express');
const router = express.Router();

router.post("/",${componentName}.createForCde);
router.get("/findone/:caseId/:serialNumber",${componentName}.findOneForCde);
router.post("/uploadfile",${componentName}.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",${componentName}.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",${componentName}.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",${componentName}.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",${componentName}.readFileNamesForCde);
router.put("/:caseId/:componentId",${componentName}.updateForCde);

module.exports = router;`

        fs.writeFileSync(`routes/${componentName}_for_cde.routes.js`, router, { flag: "w" })
        console.log('The router has been saved!');
    } catch (err) {
        throw new Error(err.message)
    }
}

async function deleteExistingComponentDetails(componentName, component_id) {
    try {

        const compName = await Component.findOne({ _id: component_id})
        const componentDoc = await Component.findOneAndDelete({ _id: component_id })
        console.log("componnentName == ", componentDoc.name);
        
        // const componentFieldsDoc = await ComponentField.find({ component: component_id })
        // console.log("data of the component fields == ", componentFieldsDoc)

        const deleteResult = await ComponentField.deleteMany({ component: component_id });
        console.log("Deleted component fields: ", deleteResult);

        // Define the paths for each file
        const controllerPath = path.join(__dirname, `../../controllers/data_entry/${compName.name}.controller.js`);
        const modelPath = path.join(__dirname, `../../models/data_entry/${compName.name}.model.js`);
        const routerPath = path.join(__dirname, `../../routes/${compName.name}.routes.js`);
        const cdeRouterPath = path.join(__dirname, `../../routes/${compName.name}_for_cde.routes.js`);

        const allRoutesPath = path.join(__dirname, '../../routes/all_app_routes.routes.js');


        // Function to check if a file exists and delete it
        const deleteFileIfExists = (filePath) => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`${filePath} deleted successfully.`);
            } else {
                console.log(`${filePath} does not exist.`);
            }
        };

        // Delete the controller, model, and routes files
        deleteFileIfExists(controllerPath);
        console.log("Successfully Deleted Controller File...");

        deleteFileIfExists(modelPath);
        console.log("Successfully Deleted Model File...");


        deleteFileIfExists(routerPath);
        console.log("Successfully Deleted Router File...");

        deleteFileIfExists(cdeRouterPath);

        console.log(`Files related to component '${compName.name}' deleted.`);

        // Remove routes from all_app_routes
        const allRoutes = fs.readFileSync(allRoutesPath, { encoding: "utf-8" });

        // Define the routes to remove using regex
        const routeToRemove = new RegExp(`\\s*app\\.use\\("/api/${compName.name}", authenticateToken ,require\\(\\..\\/routes\\/${compName.name}\\.routes\\)\\);?\\s*`, 'g');
        const cdeRouteToRemove = new RegExp(`\\s*app\\.use\\("/api/${compName.name}forcde", authenticateToken ,require\\(\\..\\/routes\\/${compName.name}_for_cde\\.routes\\)\\);?\\s*`, 'g');

        // Remove the component's routes from the file
        let updatedRoutes = allRoutes.replace(routeToRemove, '').replace(cdeRouteToRemove, '');

        // Write the updated routes back to the file
        fs.writeFileSync(allRoutesPath, updatedRoutes);

        console.log(`Routes for component '${compName.name}' removed from all_app_routes.routes.js successfully!`);
    } catch (error) {
        console.error(`Error while deleting component '${compName.name}':`, error);
    }
}


exports.updateComponent = async (req, res) => {
    try {
        const componentDisplayName = req.body.displayName
        const componentName = req.body.name
        const componentFields = req.body.componentFields
        const componentData = await Component.find({ name: componentName })
        // Deleting the component Files
        deleteComponentFiles(componentName)
        console.log("Component Files Deleted Successfully...")

        // updating component and component fields
        await updateComponentFields(componentName, componentFields)
        console.log("updated component fields successfully...")


        // Add to all app routes
        addToAllAppRoutes(componentName)


        // Create a new route file
        writeRouter(componentName)

        // Write the controller
        writeController(componentName, componentFields, componentData._id)

        // Write the model
        writeModel(componentName, componentFields)

        console.log("Updated component successfully...")

        return res.json({ message: "Updated the component successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err })
    }
}



