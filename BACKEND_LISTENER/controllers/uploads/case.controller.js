const Case = require('../../models/uploads/case.model');
const caseHistory = require('../data_entry/case_history.controller')
const Batch = require('../../models/uploads/batch.model');
const UserSubclientAccess = require('../../models/administration/user_subclient_access.model')
const SubclientNotification = require('../../models/administration/subclient_notification.model')
const Subclient = require('../../models/administration/subclient.model')
const mailSend = require('../mails/send_mail.controller')
const express = require('express');
const moment = require('moment');
const fileUpload = require('express-fileupload');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const nodemailer = require('nodemailer')
const Client = require("../../models/administration/client.model")
const mongoose = require("mongoose");
const userModel = require('../../models/administration/user.model');
const ClientContractProfiles = require("../../models/administration/client_contract_profile.model")
const ClientContractPackages = require("../../models/administration/client_contract_package.model")
const Role = require("../../models/administration/role.model")
const UserRole = require("../../models/administration/user_role.model")
const UpdateLhsAuthModel = require("../../models/administration/update_lhs_user_auth.model")
const { Types } = require("mongoose")
const bcrypt = require("bcrypt")
const PersonalDetails = require("../../models/data_entry/personal_details_data.model")
const crypto = require("crypto")
const Component = require("../../models/administration/component.model")
const ComponentFields = require("../../models/administration/component_field.model")
const EmailTemplate = require("../../models/masters/email_template.model");
const ColorMaster = require("../../models/administration/color_master.model");
const { sendEmail } = require('../../shared/sendEmail');
const ClientContract = require("../../models/administration/client_contract.model")


/*exports.create = async (req, res) => {

    try {
        if (!req.body.client) {
            res.status(400).json({ message: "Client Cannot be empty" });

        }
        if (!req.body.subclient) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }
        if (!req.body.candidateName) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }


        const client = await Client.findOne({ _id: req.body.client })
        let findString = `A${client.clientCode}*`;
        console.log('find string is ', findString);

        let caseId;
        // Quesrying the latest case id for that clinet
	             const caseData = await Case.find({ caseId: { "$regex": findString, "$options": "i" }, client: client._id }).sort({ initiationDate: -1 }).limit(10)

	    console.log("caseData:", caseData)

        if (caseData && caseData.length) {
		console.log("Client Code Length:", client.clientCode.length)
            const sortedData = caseData.sort((a, b) => {
                Number(a.caseId.slice(client.clientCode.length + 1)) > Number(b.caseId.slice(client.clientCode.length + 1))
            })

            const latestCaseId = sortedData[0].caseId
            caseId = appendLatestCaseId(latestCaseId);
 try {
        if (!req.body.client) {
            res.status(400).json({ message: "Client Cannot be empty" });

        }
        if (!req.body.subclient) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }
        if (!req.body.candidateName) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }


        const client = await Client.findOne({ _id: req.body.client })
        let findString = `A${client.clientCode}*`;
        console.log('find string is ', findString);

        let caseId;
        // Quesrying the latest case id for that clinet
                     const caseData = await Case.find({ caseId: { "$regex": findString, "$options": "i" }, client: client._id }).sort({ initiationDate: -1 }).limit(10)

            console.log("caseData:", caseData)

        if (caseData && caseData.length) {
                console.log("Client Code Length:", client.clientCode.length)
            const sortedData = caseData.sort((a, b) => {
                Number(a.caseId.slice(client.clientCode.length + 1)) > Number(b.caseId.slice(client.clientCode.length + 1))
            })

            const latestCaseId = sortedData[0].caseId
            caseId = appendLatestCaseId(latestCaseId);

            function appendLatestCaseId(caseId) {
                console.log("latest case id:", caseId)
                const caseNumber = Number(caseId.slice(client.clientCode.length + 1));
                let newNumber = caseNumber + 1
                console.log("Case number and new number are: ", caseNumber, newNumber)
                caseId = caseId.slice(0, client.clientCode.length + 1) + newNumber
                                                 
            function appendLatestCaseId(caseId) {
                console.log("latest case id:", caseId)
                const caseNumber = Number(caseId.slice(client.clientCode.length + 1));
                let newNumber = caseNumber + 1
                console.log("Case number and new number are: ", caseNumber, newNumber)
                caseId = caseId.slice(0, client.clientCode.length + 1) + newNumber
                console.log("Case id is:", caseId)
                return caseId
            }

		   let caseExists = true

             while (caseExists) {
                const existCaseData = await Case.findOne({ caseId: caseId })
                if (!existCaseData) {
                    caseExists = false
                    break
                }
                console.log("CASE ID:", caseId, "exists, hence appending 1")
                caseId = appendLatestCaseId(caseId)
            }

        } else {
            caseId = `A${client.clientCode}1`
        }

        console.log('caseid after appending new number:', caseId)

        console.log('got the last case id and now creating the batch');
        createCase(caseId);

        function createCase(caseId) {
            console.log('about to create the case body is ', req.body);
            let intTat = req.body.tat - 1;
            console.log("moment is ", moment().add(intTat, 'days'));
            //        console.log("intTat is ",intTat);
            caseToCreate = new Case({
                caseId: caseId,
                client: req.body.client,
                subclient: req.body.subclient,
                candidateName: req.body.candidateName,
                employeeId: req.body.employeeId,
                initiationDate: new Date(),
                tatEndDate: moment().add(intTat, 'days').toDate(),
                package: req.body.package,
                profile: req.body.profile,
                status: req.body.status,
                componentsToCheck: (req.body.componentsToCheck ? JSON.parse(req.body.componentsToCheck) : null),
                dataEntryCompletionDate: null,
                inputqcCompletionDate: null,
                outputqcCompletionDate: null,
                reportDate: null,
                caseStopDate: null,
                reinitiationDate: null,
                firstInsufficiencyRaisedDate: null,
                lastInsufficiencyClearedDate: null,
                grade: null,
                dataEntryAllocatedTo: null,
                modifiedBy: req.user.user_id
            })
            if (req.body.batch) {
                caseToCreate.batch = req.body.batch
            }
            caseToCreate
                .save(caseToCreate)
                .then(data => {
                    console.log("created case");
                    //  const caseZipFiles = Array.isArray(req.files.caseZipFile)
                    //  ? req.files.caseZipFile
                    //: [req.files.caseZipFile]; // Wrap in an array if not already an array
                    console.log("Files uploaded:", req.files)
                    caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id);
                    const fileNames = Object.keys(req.files)
                    console.log("Filenames:", fileNames)
                    for (let i = 0; i < fileNames.length; i++) {
                        const file = req.files[fileNames[i]];
                        console.log("File is:", file)
                        const filePath = `/REPO_STORAGE/case_uploads/${caseId}/${file.name}`;

                        file.mv(filePath, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }

                            // Continue processing or respond once all files are moved
                            res.json(data);
                        });
                    }
                })

                /*.then(data => {
                    console.log("created case");
                    let caseZipFile = req.files.caseZipFile;
                    caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id)
                    caseZipFile.mv(`/REPO_STORAGE/case_uploads/${caseId}/` + caseZipFile.name, function (err) {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.json(data);
                    })

                })*/
//24sep2025
      /*          .catch(err => {
                    console.log("error creating the case ", err.message);
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the case"
                    })
                })
        }
    } catch (err) {
        console.log(err)
        return res.json({ message: "Could not create a case due to an internal server error." + err })
    }



};


function getLatestCase() {
    return new Promise((res, rej) => {
        Case.aggregate([
            {
                $addFields: {
                    numericCaseId: {
                        $toInt: { $substr: ["$caseId", 4, -1] }
                    }
                }
            },
            {
                $sort: { numericCaseId: -1 }
            },
            {
                $limit: 1
            },
            {
                $project: { _id: 0, caseId: 1 }
            }
        ])
            .exec((err, result) => {
                if (err) {
                    console.error(err);
                    rej(err);
                }
                console.log(result[0])
                res(result[0])
            });
    })
}*/ 
/*exports.create = async (req, res) => {

 try {
        if (!req.body.client) {
            res.status(400).json({ message: "Client Cannot be empty" });

        }
        if (!req.body.subclient) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }
        if (!req.body.candidateName) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }


        const client = await Client.findOne({ _id: req.body.client })
        let findString = `A${client.clientCode}*`;
        console.log('find string is ', findString);
        let caseId;
       // Quesrying the latest case id for that clinet
        const caseData = await Case.find({ caseId: { "$regex": findString, "$options": "i" } }).sort({initiationDate: -1}).limit(5)

     console.log("caseData:", caseData)

        if (caseData.length) {
            const sortedData = caseData.sort((a, b) => {
                Number(a.caseId.slice(client.clientCode.length + 1)) > Number(b.caseId.slice(client.clientCode.length + 1))
            })

            const latestCaseId = sortedData[0].caseId
            caseId = appendLatestCaseId(latestCaseId);

            function appendLatestCaseId(caseId) {
        console.log("latest case id:", caseId)
        const caseNumber = Number(caseId.slice(client.clientCode.length + 1));
                let newNumber = caseNumber + 1
                console.log("Case number and new number are: ", caseNumber, newNumber)
                caseId = caseId.slice(0, client.clientCode.length + 1) + newNumber
                console.log("Case id is:", caseId)
        return caseId
            }
     caseId = appendLatestCaseId(latestCaseId);
    	
            //await Case.deleteOne({caseId: caseId})

        } else {
            caseId = `A${client.clientCode}1`
        }

             console.log('caseid after appending new number:', caseId)

        console.log('got the last case id and now creating the batch');
        createCase(caseId);

        function createCase(caseId) {
            console.log('about to create the case body is ', req.body);
            let intTat = req.body.tat - 1;
            console.log("moment is ", moment().add(intTat, 'days'));
            //        console.log("intTat is ",intTat);
            caseToCreate = new Case({
                caseId: caseId,
                client: req.body.client,
                subclient: req.body.subclient,
                candidateName: req.body.candidateName,
                employeeId: req.body.employeeId,
                initiationDate: new Date(),
                tatEndDate: moment().add(intTat, 'days').toDate(),
                package: req.body.package,
                profile: req.body.profile,
                status: req.body.status,
                componentsToCheck: (req.body.componentsToCheck ? JSON.parse(req.body.componentsToCheck) : null),
                dataEntryCompletionDate: null,
                inputqcCompletionDate: null,
                outputqcCompletionDate: null,
                reportDate: null,
                caseStopDate: null,
                reinitiationDate: null,
                firstInsufficiencyRaisedDate: null,
                lastInsufficiencyClearedDate: null,
                grade: null,
                dataEntryAllocatedTo: null,
        modifiedBy:req.user.user_id
            })
            if (req.body.batch) {
                caseToCreate.batch = req.body.batch
            }
            caseToCreate
                .save(caseToCreate)
        .then(data => {
                console.log("created case");
              //  const caseZipFiles = Array.isArray(req.files.caseZipFile)
                //  ? req.files.caseZipFile
                  //: [req.files.caseZipFile]; // Wrap in an array if not already an array
        console.log("Files uploaded:", req.files)
                caseHistory.create(data._id, null,null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id);
const fileNames = Object.keys(req.files)
            console.log("Filenames:", fileNames)
                for (let i = 0; i < fileNames.length; i++) {
                  const file = req.files[fileNames[i]];
            console.log("File is:",file)
                  const filePath = `/REPO_STORAGE/case_uploads/${caseId}/${file.name}`;

                  file.mv(filePath, function (err) {
                    if (err) {
                      return res.status(500).send(err);
                    }

                    // Continue processing or respond once all files are moved
                      res.json(data);
                  });
                }
              })

                /*.then(data => {
                    console.log("created case");
                    let caseZipFile = req.files.caseZipFile;
                    caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id)
                    caseZipFile.mv(`/REPO_STORAGE/case_uploads/${caseId}/` + caseZipFile.name, function (err) {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.json(data);
                    })

                })old
                //.catch(err => {
                  //  console.log("error creating the case ", err.message);
                   // res.status(500).send({
                        message: err.message || "Some error occurred while creating the case"
                    })
                })
        }
    } catch (err) {
        console.log(err)
        return res.json({ message: "Could not create a case due to an internal server error." + err })
    }



};*/
// 24 sep 2025
exports.create = async (req, res) => {

    try {
        if (!req.body.client) {
            res.status(400).json({ message: "Client Cannot be empty" });

        }
        if (!req.body.subclient) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }
        if (!req.body.candidateName) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }


        const client = await Client.findOne({ _id: req.body.client })
        let findString = `A${client.clientCode}*`;
        console.log('find string is ', findString);

        let caseId;
        // Quesrying the latest case id for that clinet
                 const caseData = await Case.find({ caseId: { "$regex": findString, "$options": "i" }, client: client._id }).sort({ initiationDate: -1 }).limit(10)

        console.log("caseData:", caseData)

        if (caseData && caseData.length) {
        console.log("Client Code Length:", client.clientCode.length)
            const sortedData = caseData.sort((a, b) => {
                Number(a.caseId.slice(client.clientCode.length + 1)) > Number(b.caseId.slice(client.clientCode.length + 1))
            })

            const latestCaseId = sortedData[0].caseId
            caseId = appendLatestCaseId(latestCaseId);

            function appendLatestCaseId(caseId) {
                console.log("latest case id:", caseId)
                const caseNumber = Number(caseId.slice(client.clientCode.length + 1));
                let newNumber = caseNumber + 1
                console.log("Case number and new number are: ", caseNumber, newNumber)
                caseId = caseId.slice(0, client.clientCode.length + 1) + newNumber
                console.log("Case id is:", caseId)
                return caseId
            }

           let caseExists = true

            while (caseExists) {
                const existCaseData = await Case.findOne({ caseId: caseId })
                if (!existCaseData) {
                    caseExists = false
                    break
                }
                console.log("CASE ID:", caseId, "exists, hence appending 1")
                caseId = appendLatestCaseId(caseId)
            }

        } else {
            caseId = `A${client.clientCode}1`
        }

        console.log('caseid after appending new number:', caseId)

        console.log('got the last case id and now creating the batch');
        createCase(caseId);

        function createCase(caseId) {
            console.log('about to create the case body is ', req.body);
            let intTat = req.body.tat - 1;
            console.log("moment is ", moment().add(intTat, 'days'));
            //        console.log("intTat is ",intTat);
            caseToCreate = new Case({
                caseId: caseId,
                client: req.body.client,
                subclient: req.body.subclient,
                candidateName: req.body.candidateName,
                employeeId: req.body.employeeId,
                initiationDate: new Date(),
                tatEndDate: moment().add(intTat, 'days').toDate(),
                package: req.body.package,
                profile: req.body.profile,
                status: req.body.status,
                componentsToCheck: (req.body.componentsToCheck ? JSON.parse(req.body.componentsToCheck) : null),
                dataEntryCompletionDate: null,
                inputqcCompletionDate: null,
                outputqcCompletionDate: null,
                reportDate: null,
                caseStopDate: null,
                reinitiationDate: null,
                firstInsufficiencyRaisedDate: null,
                lastInsufficiencyClearedDate: null,
                grade: null,
                dataEntryAllocatedTo: null,
                modifiedBy: req.user.user_id
            })
            if (req.body.batch) {
                caseToCreate.batch = req.body.batch
            }
            caseToCreate
                .save(caseToCreate)
                .then(data => {
                    console.log("created case");
                    //  const caseZipFiles = Array.isArray(req.files.caseZipFile)
                    //  ? req.files.caseZipFile
                    //: [req.files.caseZipFile]; // Wrap in an array if not already an array
                    console.log("Files uploaded:", req.files)
                    caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id);
                    const fileNames = Object.keys(req.files)
                    console.log("Filenames:", fileNames)
                    for (let i = 0; i < fileNames.length; i++) {
                        const file = req.files[fileNames[i]];
                        console.log("File is:", file)
                        const filePath = `/REPO_STORAGE/case_uploads/${caseId}/${file.name}`;

                        file.mv(filePath, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }

                            // Continue processing or respond once all files are moved
                            res.json(data);
                        });
                    }
                })

                /*.then(data => {
                    console.log("created case");
                    let caseZipFile = req.files.caseZipFile;
                    caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id)
                    caseZipFile.mv(`/REPO_STORAGE/case_uploads/${caseId}/` + caseZipFile.name, function (err) {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.json(data);
                    })

                })*/
                .catch(err => {
                    console.log("error creating the case ", err.message);
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the case"
                    })
                })
        }
    } catch (err) {
        console.log(err)
        return res.json({ message: "Could not create a case due to an internal server error." + err })
    }



};
exports.findAllCasesForAClientAndSubclient = (req, res) => {
    Case
        .find({ client: req.params.clientId, subclient: req.params.subclientId, batch: null })
        .sort({ caseId: -1 })
        .populate({ path: 'package' })
        .populate({ path: 'profile' })
        .then(cases => {
            res.json(cases);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while reading cases for the subclient"
            })
        })
};
exports.findACase = (req, res) => {
    Case
        .findOne({ _id: req.params._id })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while reading a case"
            })
        })
};
exports.findAllForABatch = (req, res) => {
    Case
        .find({ batch: req.params.batch })
        .populate({ path: 'package' })
        .populate({ path: 'profile' })
        .then(cases => {
            res.json(cases)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while reading a case"
            })
        })
}
exports.findOneDeUnAllocated = (req, res) => {
    //    console.log('in findOneDeUnAllocated');
    Case.find({ status: "INITIATED", dataEntryAllocatedTo: null })
        .populate({ path: 'client' })
        .populate({ path: 'subclient' })
        .populate({ path: 'package' })
        .populate({ path: 'profile' })
        .limit(1)
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                let acase = null;
                for (let item of data) {
                    acase = item;
                    break;
                }
                //            console.log('acase is ',acase);
                Case.findOneAndUpdate({ caseId: acase.caseId },
                    { dataEntryAllocatedTo: req.user.user_id, status: 'DE-ALLOCATED' })
                    //            {dataEntryAllocatedTo:null},{status:'INITIATED'})
                    .then(updatedData => {
                        res.json(acase);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while reading a case"
                        })
                    })
            } else {
                res.status(204).json({ message: "No data available" });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while reading a case"
            })
        })
}
exports.downloadCaseFile = (req, res) => {
    fs.readdir(`/REPO_STORAGE/case_uploads/${req.params.caseId}`, function (err, files) {
        if (err) {
            res.status(500).json({
                message: "Error reading file"
            })
        }
        files.forEach(file => {

            console.log('constructed file path ', file);
            let fileName = path.basename(file);
            console.log('got file name ', fileName);
            let mimeType = mime.lookup(file);
            console.log('mime type is ', mimeType);
            res.setHeader('Content-disposition', 'attachment;filename=' + fileName);
            res.setHeader('Content-type', mimeType);

            /*    res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = file.Name
                }; */
            res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
            console.log('header set about to download  file');
            res.download(`/REPO_STORAGE/case_uploads/${req.params.caseId}/${file}`, fileName);
        })
    })

}
exports.downloadCaseFileForCDF = (req, res) => {
    console.log("About to get the file for the case........", req.params.caseId)
    fs.readdir(`/REPO_STORAGE/case_uploads/${req.params.caseId}`, function (err, files) {
        if (err) {
            res.status(500).json({
                message: "Error reading file"
            })
        }
        let requiredFile;
        if (files != null) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                console.log('Got the file')
                console.log('path.extname(file) is ', path.extname(file))
                if (path.extname(file) == '.zip' || path.extname(file) == '.rar') {
                    requiredFile = file.replace(/ /g, '_')
                    fs.rename('/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + file, '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + requiredFile, (err) => {
                        if (err) {
                            res.status(500).json({
                                message: 'Error downloading the file'
                            })
                        }
                    })
                    break
                }
            }
        }
        if (requiredFile) {
            console.log('trying to rename  the file')
            //            fs.rename('/REPO_STORAGE/case_uploads/'+req.params.caseId + '/' +file,'REPO_STORAGE/case_uploads/'+req.params.caseId+'/'+requiredFile)		 
            console.log('constructed file path ', requiredFile);
            let fileName = path.basename(requiredFile);
            console.log('got file name ', fileName);
            let mimeType = mime.lookup(requiredFile);
            console.log('mime type is ', mimeType);
            res.setHeader('Content-disposition', 'attachment;filename=' + fileName);
            res.setHeader('Content-type', mimeType);

            /*    res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = file.Name
                }; */
            res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
            console.log('header set about to download  file');
            res.download(`/REPO_STORAGE/case_uploads/${req.params.caseId}/${requiredFile}`, fileName);
        }

    })

}


//bulk upload for case initiation
exports.bulkUploadCaseInititaion = async (req, res) => {
    try {

        let { excelFile } = req.files
        let { aCase, data } = req.body

        aCase = JSON.parse(aCase)
        data = JSON.parse(data)
        
        console.log("uploadBulk: ", JSON.stringify(req.body))
        console.log("uploadBulk: components to check:", aCase?.componentsToCheck)
        for (let i = 0; i < data.length; i++) {
            const currItem = data[i]
            const caseId = await generateCaseId(aCase.client)
            
            const caseData = new Case({
                caseId: caseId,
                candidateName: currItem.personalDetails_name,
                subclient: aCase.subclient,
                client: aCase.client,
                package: aCase.package ? aCase.package : null,
                profile: aCase.profile ? aCase.profile : null,
                componentsToCheck: aCase.componentsToCheck ? aCase.componentsToCheck : null,
                initiationDate: new Date(),
                status: "INITIATED"
	    });
		
	    const uploadDir = ''
            fs.mkdirSync(uploadDir, { recursive: true });
            const uploadPath = path.join(uploadDir, excelFile.name);


            excelFile.mv(uploadPath, (err) => {
                if (err) {
                    console.log('error == ', err);

                  return res.status(500).send('Error moving file: ' + err);
                }
            })
            await caseData.save()
		
            const personalDetailsData = new PersonalDetails({
                case: caseData._id,
                name: currItem.personalDetails_name,
                fathername: currItem.personalDetails_fathername,
                gender: currItem?.personalDetails_gender,
                dateofbirth: moment(currItem['personalDetails_dateofbirth(MM/DD/YYYY)']).add(1, 'days').toDate(),
                uniqueid: currItem?.personalDetails_uniqueid,
                number: currItem.personalDetails_number,
                emailid: currItem.personalDetails_emailid,
                dateofjoining: req.body.dateofjoining,
                modifiedBy: req.user.user_id,
                status: "INITIATED",
            })

            await personalDetailsData.save()
	    console.log("BULK",personalDetailsData)
        }
        return res.json({ message: "bulk upload completed successfully" })
    } catch (err) {
        console.log("err: uploadBulk:", err)
        return res.status(500).json({ error: err.message })
    }
}


//bulk upload
/*exports.bulkUpload = async (req, res) => {
    try {

        let { excelFile } = req.files
        let { aCase, data } = req.body

        aCase = JSON.parse(aCase)
        data = JSON.parse(data)

        console.log("uploadBulk: ", JSON.stringify(req.body))
        console.log("uploadBulk: components to check:", aCase?.componentsToCheck)
        for (let i = 0; i < data.length; i++) {
            const currItem = data[i]
            // const caseId = await getLatestCaseId()
            const caseId = await generateCaseId(aCase.client)
            console.log('data === ', currItem?.personalDetails_name);
            
            const caseData = new Case({
                caseId: caseId,
                candidateName: currItem.personalDetails_name,
                subclient: aCase.subclient,
                client: aCase.client,
                package: aCase.package ? aCase.package : null,
                profile: aCase.profile ? aCase.profile : null,
                componentsToCheck: aCase.componentsToCheck ? aCase.componentsToCheck : null,
                initiationDate: new Date(),
                status: "INPUTQC-ACCEPTED"
            })

	    const uploadDir = ''
            fs.mkdirSync(uploadDir, { recursive: true });
            const uploadPath = path.join(uploadDir, excelFile.name);
            

            excelFile.mv(uploadPath, (err) => {
                if (err) {
                    console.log('error == ', err);
                    
                  return res.status(500).send('Error moving file: ' + err);
                }
            })

            await caseData.save()

            const personalDetailsData = new PersonalDetails({
                case: caseData._id,
                candidatename: currItem.personalDetails_name,
                fathername: currItem.personalDetails_fathername,
                gender: currItem.personalDetails_gender,
                dateofbirth: moment(currItem['personalDetails_dateofbirth(MM/DD/YYYY)']).add(1, 'days').toDate(),
                uniqueid: currItem.personalDetails_uniqueid,
                mobilename: currItem.personalDetails_mobilename,
                empid: req.body.empid,
		doj:moment(currItem['personalDetails_doj(MM/DD/YYYY)']).add(1, 'days').toDate(),
                //dateofjoining: req.body.dateofjoining,
                modifiedBy: req.user.user_id,
                status: "INPUTQC-ACCEPTED",
            })

            await personalDetailsData.save()


            let components = await getComponentsInACase(caseData)
            console.log("uploadBulk: components", components)
            while (components.length) {

                const currComponent = components[0]
                console.log("uploadBulk: currComponent:", currComponent)
                const componentFields = Object.keys(currItem).filter(item => item.includes(currComponent)).map(item => item.replace(`${currComponent}_`, ''))
                console.log("uploadBulk: componentFields:", JSON.stringify(componentFields))
                const componentData = await Component.findOne({ name: currComponent })
                const componentFieldsData = await ComponentFields.find({ component: componentData._id })
                const mainKeys = componentFields.filter(item => !item.includes("_"))
                console.log("uploadBulk: mainKeys:", mainKeys)
                const lastElement = componentFields[componentFields.length - 1]
                console.log("uploadBulk: lastElement:", lastElement)
                let maxChecksEntered = components.filter(item => item == currComponent).length
                const model = require(`../../models/data_entry/${currComponent}.model`)
                console.log("uploadBulk: NaN:", isNaN(lastElement[lastElement.length - 1]))
                //maxChecksEntered = !isNaN(lastElement[lastElement.length - 1]) ? maxChecksEntered : 0
                console.log("uploadBulk: maxChecksEntered:", maxChecksEntered)

                for (let j = 0; j < maxChecksEntered; j++) {
                    const dataToSave = {
                        case: caseData._id,
                        status: "INPUTQC-ACCEPTED",
                        component: componentData._id,
                        personalDetailsData: personalDetailsData._id
                    }
                    if (j == 0) {
                        mainKeys.forEach(key => {
                            const currField = componentFieldsData.find(field => field.name == key)
                            if (currField.type == "DATE") {
                                dataToSave[key] = moment(currItem[`${currComponent}_${key}`]).add(1, 'days').toDate()
                            } else {
                                dataToSave[key] = currItem[`${currComponent}_${key}`]
                            }
                        })
                    } else {
                        mainKeys.forEach(key => {

                            const currField = componentFieldsData.find(field => field.name == key)
                            if (currField.type == "DATE") {
                                dataToSave[key] = moment(currItem[`${currComponent}_${key}_${i + 1}`]).add(1, 'days').toDate()
                            }
                            dataToSave[key] = currItem[`${currComponent}_${key}_${i}`]
                        })
                    }
                    console.log("uploadBulk: dataToSave:", JSON.stringify(dataToSave))
                    const modelData = new model(dataToSave)
                    await modelData.save()
                }
                components = components.filter(item => item !== components[0])
            }
        }





        return res.json({ message: "bulk upload completed successfully" })
    } catch (err) {
        console.log("err: uploadBulk:", err)
        return res.status(500).json({ error: err.message })
    }
}*/
/////New 16Sep2025/////
/*exports.bulkUpload = async (req, res) => {
    try {

        // let { excelFile } = req.files
        let { aCase, data } = req.body

        // aCase = JSON.parse(aCase)
        // data = JSON.parse(data)

        console.log("uploadBulk: ", JSON.stringify(req.body))
        // console.log("uploadBulk: components to check:", aCase?.componentsToCheck)
        for (let i = 0; i < data.length; i++) {
            const currItem = data[i]
            // console.log("currItem--",currItem)
            // const caseId = await getLatestCaseId()
            const caseId = await generateCaseId(aCase.client)
            // console.log('data === ', currItem?.personalDetails_candidatename);
            
            const caseData = new Case({
                caseId: caseId,
                candidateName: currItem?.personalDetails_name,
                subclient: aCase.subclient,
                client: aCase.client,
                package: aCase.package ? aCase.package : null,
                profile: aCase.profile ? aCase.profile : null,
                initiationDate: new Date(),
               // update-15sep25
                // componentsToCheck: aCase.componentsToCheck ? aCase.componentsToCheck : null,
                // status: "INPUTQC-ACCEPTED"
                status: "INITIATED"
                // end-15sep25
            })
            console.log("caseid",caseData.caseId)
	    // const uploadDir = ''
        //     fs.mkdirSync(uploadDir, { recursive: true });
        //     const uploadPath = path.join(uploadDir, excelFile.name);
            

        //     excelFile.mv(uploadPath, (err) => {
        //         if (err) {
        //             console.log('error == ', err);
                    
        //           return res.status(500).send('Error moving file: ' + err);
        //         }
        //     })

            await caseData.save()

            const personalDetailsData = new PersonalDetails({
                case: caseData._id,
                candidatename: currItem.personalDetails_name,
                fathername: currItem.personalDetails_fathername,
                gender: currItem.personalDetails_gender,
                dateofbirth: moment(currItem['personalDetails_dateofbirth(MM/DD/YYYY)']).add(1, 'days').toDate(),
                uniqueid: currItem.personalDetails_uniqueid,
                mobilename: currItem.personalDetails_mobilename,
                empid: req.body.empid,
		doj:moment(currItem['personalDetails_doj(MM/DD/YYYY)']).add(1, 'days').toDate(),
                //dateofjoining: req.body.dateofjoining,
                modifiedBy: req.user.user_id,
                // updated-15sep25
                // status: "INPUTQC-ACCEPTED",
                status: "INITIATED"
                // end-15sep25
                
            })

            await personalDetailsData.save()

            // updated-15sep25
            // let components = await getComponentsInACase(caseData)
            // console.log("uploadBulk: components", components)
            // while (components.length) {

            //     const currComponent = components[0]
            //     console.log("uploadBulk: currComponent:", currComponent)
            //     const componentFields = Object.keys(currItem).filter(item => item.includes(currComponent)).map(item => item.replace(`${currComponent}_`, ''))
            //     console.log("uploadBulk: componentFields:", JSON.stringify(componentFields))
            //     const componentData = await Component.findOne({ name: currComponent })
            //     const componentFieldsData = await ComponentFields.find({ component: componentData._id })
            //     const mainKeys = componentFields.filter(item => !item.includes("_"))
            //     console.log("uploadBulk: mainKeys:", mainKeys)
            //     const lastElement = componentFields[componentFields.length - 1]
            //     console.log("uploadBulk: lastElement:", lastElement)
            //     let maxChecksEntered = components.filter(item => item == currComponent).length
            //     const model = require(`../../models/data_entry/${currComponent}.model`)
            //     console.log("uploadBulk: NaN:", isNaN(lastElement[lastElement.length - 1]))
            //     //maxChecksEntered = !isNaN(lastElement[lastElement.length - 1]) ? maxChecksEntered : 0
            //     console.log("uploadBulk: maxChecksEntered:", maxChecksEntered)

            //     for (let j = 0; j < maxChecksEntered; j++) {
            //         const dataToSave = {
            //             case: caseData._id,
            //             status: "INPUTQC-ACCEPTED",
            //             component: componentData._id,
            //             personalDetailsData: personalDetailsData._id
            //         }
            //         if (j == 0) {
            //             mainKeys.forEach(key => {
            //                 const currField = componentFieldsData.find(field => field.name == key)
            //                 if (currField.type == "DATE") {
            //                     dataToSave[key] = moment(currItem[`${currComponent}_${key}`]).add(1, 'days').toDate()
            //                 } else {
            //                     dataToSave[key] = currItem[`${currComponent}_${key}`]
            //                 }
            //             })
            //         } else {
            //             mainKeys.forEach(key => {

            //                 const currField = componentFieldsData.find(field => field.name == key)
            //                 if (currField.type == "DATE") {
            //                     dataToSave[key] = moment(currItem[`${currComponent}_${key}_${i + 1}`]).add(1, 'days').toDate()
            //                 }
            //                 dataToSave[key] = currItem[`${currComponent}_${key}_${i}`]
            //             })
            //         }
            //         console.log("uploadBulk: dataToSave:", JSON.stringify(dataToSave))
            //         const modelData = new model(dataToSave)
            //         await modelData.save()
            //     }
            //     components = components.filter(item => item !== components[0])
            // }
            // end-15sep25
        }





        return res.json({ message: "bulk upload completed successfully" })
    } catch (err) {
        console.log("err: uploadBulk:", err)
        return res.status(500).json({ error: err.message })
    }
}*/
///////////////////////
////23Sep2025//
exports.bulkUpload = async (req, res) => {
    try {
        // update-expo20Sep25
        const { aCase, data ,filePaths} = req.body
        // end-expo20sep25
        console.log("uploadBulk: ", JSON.stringify(req.body))
        for (let i = 0; i < data.length; i++) {
             const currItem = data[i];
            // const caseId = await getLatestCaseId()
 
            const caseId = await generateCaseId(aCase.client)
 
            const caseData = new Case({
                caseId: caseId,
                candidateName: currItem?.personalDetails_name,
                subclient: aCase.subclient,
                client: aCase.client,
                package: aCase.package ? aCase.package : null,
                profile: aCase.profile ? aCase.profile : null,
                initiationDate: new Date(),
                status: "INITIATED"
                // end
            })
            console.log("caseDat",caseData.caseId)
            await caseData.save()
            // update-expo-20sep25
            const caseUploadDir = path.join(  `/REPO_STORAGE/case_uploads/${caseData.caseId}`);
            if (!fs.existsSync(caseUploadDir)) {
                fs.mkdirSync(caseUploadDir, { recursive: true });
            }
 
            if (filePaths.excelFilePath) {
                const newExcelPath = path.join(caseUploadDir, path.basename(filePaths.excelFilePath));
                fs.copyFileSync(filePaths.excelFilePath, newExcelPath);
                console.log(`Copied Excel file for case ${caseData.caseId} to ${newExcelPath}`);
            }
 
            if (filePaths.zipFilePath) {
                const newZipPath = path.join(caseUploadDir, path.basename(filePaths.zipFilePath));
                fs.copyFileSync(filePaths.zipFilePath, newZipPath);
                console.log(`Copied ZIP file for case ${caseData.caseId} to ${newZipPath}`);
            }
            // end-expo20sep25
            const personalDetailsData = new PersonalDetails({
                case: caseData._id,
                name: currItem.personalDetails_name,
                fathername: currItem.personalDetails_fathername,
               // gender: currItem.personalDetails_gender,
                dateofbirth: moment(currItem['personalDetails_dateofbirth(MM/DD/YYYY)']).add(1, 'days').toDate(),
                //uniqueid: currItem.personalDetails_uniqueid,
                number: currItem.personalDetails_number,
                employee: req.body.employeeid,
                doj:moment(currItem['personalDetails_doj(MM/DD/YYYY)']).add(1, 'days').toDate(),
 		emailid: currItem.personalDetails_emailid,
 		process: currItem.personalDetails_process,
 		location: currItem.personalDetails_location,
 		aadhernumber: currItem.personalDetails_aadhernumber,
 		pancard: currItem.personalDetails_pancard,
                modifiedBy: req.user.user_id,
                status: "INITIATED",
            })
 
            await personalDetailsData.save()
 
         
        }
 
        return res.json({ message: "bulk upload completed successfully" })
    } catch (err) {
        console.log("err: uploadBulk:", err)
        return res.status(500).json({ error: err.message })
    }
}
////////////////////

async function getComponentsInACase(acase) {
    const package = acase.package;
    const profile = acase.profile;
    const componentsToCheck = acase.componentsToCheck
    let data;
    const components = [];

    if (package) {
        data = await ClientContractPackages.findOne({ _id: package });
        data.clientContractPackageComponents.forEach((item) => {
            const numChecks = Number(item.maxChecks);
            for (let i = 0; i < numChecks; i++) {
                components.push(item.componentName);
            }
        });
    } else if (profile) {
        data = await ClientContractProfiles.findOne({ _id: profile });
        data.clientContractProfileComponents.forEach((item) => {
            const numChecks = Number(item.maxChecks);

            for (let i = 0; i < numChecks; i++) {
                components.push(item.componentName);
            }
        }
        );
    } else if (componentsToCheck) {
        for (let i = 0; i < componentsToCheck.length; i++) {
            for (let j = 0; j < Number(componentsToCheck[i].maxChecks); j++) {
                components.push(componentsToCheck[i].componentName)
            }
        }
    }

    return components;
}

async function generateCaseId(clientId){
    try {
        const client = await Client.findOne({ _id: clientId });

        let findString = `A${client.clientCode}*`;
        console.log("Find string is", findString);
        const caseData = await Case.find({
            caseId: { "$regex": findString, "$options": "i" },
            client: client._id
        })
            .sort({ initiationDate: -1 })
            .limit(10);

        console.log("Case Data:", caseData);

        let caseId;

        if (caseData && caseData.length) {
            console.log("Client Code Length:", client.clientCode.length);
            const sortedData = caseData.sort((a, b) => {
                return Number(a.caseId.slice(client.clientCode.length + 1)) - 
                       Number(b.caseId.slice(client.clientCode.length + 1));
            });

            const latestCaseId = sortedData[sortedData.length - 1].caseId;
            caseId = appendLatestCaseId(latestCaseId, client.clientCode);

            let caseExists = true;
            while (caseExists) {
                const existCaseData = await Case.findOne({ caseId: caseId });
                if (!existCaseData) {
                    caseExists = false;
                    break;
                }
                console.log("CASE ID:", caseId, "exists, hence appending 1");
                caseId = appendLatestCaseId(caseId, client.clientCode);
            }
        } else {
            caseId = `A${client.clientCode}1`;
        }

        console.log("Final caseId:", caseId);
        return caseId;
    } catch (error) {
        console.error("Error generating caseId:", error);
        throw error;
    }
}

function appendLatestCaseId(caseId, clientCode) {
    console.log("Latest case ID:", caseId);
    const caseNumber = Number(caseId.slice(clientCode.length + 1));
    let newNumber = caseNumber + 1;
    console.log("Case number and new number are:", caseNumber, newNumber);

    const newCaseId = caseId.slice(0, clientCode.length + 1) + newNumber;
    console.log("New Case ID:", newCaseId);

    return newCaseId;
}


exports.updateStatus = (req, res) => {
    if (req.body.status == 'DE-COMPLETED') {
        Case.findOneAndUpdate({ _id: req.params._id }, { status: req.body.status, dataEntryCompletionDate: new Date() })
            .then(data => {
                caseHistory.create(data._id, null, null, 'Data Entry Completed', req.body.status, 'Data Entry Completion', null, null, null, req.user.user_id)
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while updating case status"
                })
            })
    } else if (req.body.status == 'INPUTQC-ACCEPTED') {
        Case.findOneAndUpdate({ _id: req.params._id }, { status: req.body.status, inputqcCompletionDate: new Date(), inputqcCompletedBy: req.user.user_id })
            .then(data => {
                caseHistory.create(data._id, null, null, 'Data Entry Completed', req.body.status, 'Data Entry Completion', null, null, null, req.user.user_id)
                res.json(data);
            })
            .catch(err => {
                console.log("Error updating Case Status......when Input QC......", err)

                return res.json({ message: err.message || "Some error occurred while updating case status" })
            })


    } else {
        Case.findOneAndUpdate({ _id: req.params._id }, { status: req.body.status })
            .then(data => {
                caseHistory.create(data._id, null, null, 'Data Entry Updation of Case', req.body.status, 'Data Entry Updation', null, null, null, req.user.user_id)
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while updating case status"
                })
            })
    }
};
exports.findCasesWithStatus = (req, res) => {
    Case.find({ status: req.params.status, dataEntryAllocatedTo: req.user.user_id })
        .populate({ path: 'client' })
        .populate({ path: 'subclient' })
        .populate({ path: 'profile' })
        .populate({ path: 'package' })
        .populate({ path: 'dataEntryAllocatedTo' })
        .populate({ path: 'outputqcAllocatedTo' })
    .then(async data => {
            if (req.params.status == "DE-ALLOCATED") {
                let resultData = []
                for (let i = 0; i < data.length; i++) {
                    const item = data[i]
                    let numComponents = 0
                    if (item.profile) {
                        const clientContractProfiles = await ClientContractProfiles.find({ _id: item.profile })
                        numComponents = clientContractProfiles && clientContractProfiles.clientContractProfileComponents ? clientContractProfiles.clientContractProfileComponents.length : 0
                    } else if (item.package) {
                        const clientContractPackages = await ClientContractPackages.find({ _id: item.package })
                        numComponents = clientContractPackages && clientContractPackages.clientContractPackageComponents ? clientContractPackages.clientContractPackageComponents.length : 0

                    } else if (item.componentsToCheck) {
                        numComponents = item.componentsToCheck.length
                    }
                    resultData[i] = { ...data[i]._doc }
                    resultData[i].totalChecks = numComponents
            resultData[i].pendingChecks = numComponents - item.actualComponents.length
                }

                return res.json(resultData);
            }
            if (req.params.status == "INPUTQC-REJECTED") {
                let resultData = []
                for (let i = 0; i < data.length; i++) {
                    const item = data[i]
                    let numComponents = 0
                    let rejectedComponents = 0
                    if (item.profile) {
                        const clientContractProfiles = await ClientContractProfiles.find({ _id: item.profile })
                        numComponents = clientContractProfiles && clientContractProfiles.clientContractProfileComponents ? clientContractProfiles.clientContractProfileComponents.length : 0
                    } else if (item.package) {
                        const clientContractPackages = await ClientContractPackages.find({ _id: item.package })
                        numComponents = clientContractPackages && clientContractPackages.clientContractPackageComponents ? clientContractPackages.clientContractPackageComponents.length : 0

                    } else if (item.componentsToCheck) {
                        numComponents = item.componentsToCheck.length
                    }

                    let actualComponents = item.actualComponents
              while (actualComponents.length) {
                        const currComponent = actualComponents[0]
                        const model = require(`../../models/data_entry/${currComponent}.model`)
                        const modelData = await model.find({case: item._id})
                        for(let j=0; j<modelData.length; j++){
                                const currItem = modelData[j]
                                  if (currItem.status == 'INPUTQC-REJECTED') {
                                rejectedComponents++
                                }

                        }
                        actualComponents = actualComponents.filter(comp => comp != currComponent)
                    }

                    resultData[i] = { ...data[i]._doc }
                    resultData[i].totalChecks = numComponents
                    resultData[i].rejectChecks = rejectedComponents

                }

                return res.json(resultData);
            }

            res.json(data)

        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'An error occurred while fetching cases with a status'
            })
        })
}
///////////new 24apr2024////
/*exports.findCasesWithStatus = (req, res) => {
    Case.find({ status: req.params.status, dataEntryAllocatedTo: req.user.user_id })
        .populate({ path: 'client' })
        .populate({ path: 'subclient' })
        .populate({ path: 'profile' })
        .populate({ path: 'package' })
        .populate({ path: 'dataEntryAllocatedTo' })
        .populate({ path: 'outputqcAllocatedTo' })
	.populate({ path: 'personalDetailsData' })
	.populate({ path: 'personalDetails' })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'An error occurred while fetching cases with a status'
            })
        })
}*/
//////////new 24Apr2024////
/*exports.findCasesForInputqc = (req, res) => {
    let getSubclientsForTheUser = function () {
        return new Promise((resolve, reject) => {
            UserSubclientAccess
                .find({ user: req.user.user_id }, { _id: 0, subclient: 1 })
                .then(data => {
                    console.log("subclients are ", data);
                    resolve(data);
                })
                .catch(err => {
                    reject()
                })
        })
    }
    prepareData()
    async function prepareData() {
        let subclients = await getSubclientsForTheUser()
        Case.find({ status: "DE-COMPLETED", subclient: { $in: subclients } })
            .populate({ path: 'client' })
            //       .populate({path:'subclient'})
            .populate({ path: 'subclient', populate: { path: 'branch' } })
            .populate({ path: 'profile' })
            .populate({ path: 'package' })
            .populate({ path: 'dataEntryAllocatedTo' })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || 'An error occurred while fetching cases with a status'
                })
            })
    }
}*/
exports.findCasesForInputqc = async (req, res) => {
	let count = 0;
  let page = req.query.pageCount;
  let offSet = page * 500;
  const subclientsAccessData = await UserSubclientAccess.find({
    user: req.user.user_id,
  });
  const subclients = subclientsAccessData.map((data) => data.subclient);
  console.log(
    "subclients:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ",
    req.params.status
  );
  console.log("subclients:########################### ", req.query.status);
  Case.count({ status: req.params.status, subclient: { $in: subclients } })
    .then((countData) => {
      count = countData;
    })
    .catch((err) => {
      console.log("Error is ", err);
      res.status(500).json({
        message: "Error occured while getting count of cases",
      });
    });
  Case.find({ status: req.params.status, subclient: { $in: subclients } })
    .sort({ caseId: 1 })
    .skip(offSet)
    .limit(500)
    .populate({ path: "client" })
    //    .populate({path:'subclient'})
    .populate({ path: "subclient", populate: { path: "branch" } })
    .populate({ path: "profile" })
    .populate({ path: "package" })
    .populate({ path: "dataEntryAllocatedTo" })
    .populate({ path: "outputqcAllocatedTo" })
    .then((data) => {
      console.log("findAllCasesWithStatus:", JSON.stringify(data));
      res.json({ totalCount: count, resp: data });
    })
    .catch((err) => {
      console.log("Problem in reading the case ...........", err);
      res.status(500).json({
        message:
          err.message || "An error occurred while fetching cases with a status",
      });
    });
}

// Changed on 22nd November 2022 by Arjun
exports.findAllCasesWithStatus = (req, res) => {
    let count = 0;
    let page = req.query.pageCount
    let offSet = page * 50
    Case
        .count({ status: req.params.status })
        .then(countData => {
            count = countData;
        })
        .catch(err => {
            console.log("Error is ", err);
            res.status(500).json({
                message: 'Error occured while getting count of cases'
            })
        })
    Case.find({ status: req.params.status })
        .sort({ caseId: 1 })
        .skip(offSet)
        //.limit(50)
        .populate({ path: 'client' })
        //    .populate({path:'subclient'})
        .populate({ path: 'subclient', populate: { path: 'branch' } })
        .populate({ path: 'profile' })
        .populate({ path: 'package' })
        .populate({ path: 'dataEntryAllocatedTo' })
        .populate({ path: 'outputqcAllocatedTo' })
    .then(async data => {
            const responseData = []
            for (let i = 0; i < data.length; i++) {
                const item = { ...data[i] }._doc
                let numComponents = 0
        let rejectedComponents = 0
    
                if (item.profile) {
                    const clientContractProfiles = await ClientContractProfiles.find({ _id: item.profile })
                    numComponents = clientContractProfiles && clientContractProfiles.clientContractProfileComponents ? clientContractProfiles.clientContractProfileComponents.length : 0
                } else if (item.package) {
                    const clientContractPackages = await ClientContractPackages.find({ _id: item.package })
                    numComponents = clientContractPackages && clientContractPackages.clientContractPackageComponents ? clientContractPackages.clientContractPackageComponents.length : 0

                } else if (item.componentsToCheck) {
                    numComponents = item.componentsToCheck.length
                }
        console.log("Current Item:", item)
           let actualComponents = item.actualComponents
                    while (actualComponents && actualComponents.length) {
                        const currComponent = actualComponents[0]
                const model = require(`../../models/data_entry/${currComponent}.model`)
                const modelData = await model.find({case: item._id})
                for(let j=0; j<modelData.length; j++){
                const currItem = modelData[j]
                  if (currItem.status == 'INPUTQC-REJECTED') {
                                rejectedComponents++
                            }

            }
                        actualComponents = actualComponents.filter(comp => comp != currComponent)
                    }

                        
        item.rejectChecks = rejectedComponents 
                item.totalChecks = numComponents
        item.pendingChecks = numComponents - actualComponents.length
                responseData[i] = item
            }
            res.json({ totalCount: count, resp: responseData });
        })
        .catch(err => {
            console.log("Problem in reading the case ...........", err)
            res.status(500).json({
                message: err.message || 'An error occurred while fetching cases with a status'
            })
        })
}
///////01Apr2024//
/*exports.findAllCasesWithStatus = async (req, res) => {
    //let count = 0;
    //let page = req.query.pageCount
    //let offSet = page * 500
    const subclientsAccessData = await UserSubclientAccess.find({ user: req.user.user_id })
    const subclients = subclientsAccessData.map(data => data.subclient)
    console.log("subclients:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ", req.params.status)
    console.log("subclients:########################### ", req.query.status)
    Case
        .count({ status: req.params.status, subclient: { $in: subclients } })
        .then(countData => {
            count = countData;
        })
        .catch(err => {
            console.log("Error is ", err);
            res.status(500).json({
                message: 'Error occured while getting count of cases'
            })
        })
    Case.find({ status: req.params.status, subclient: { $in: subclients } })
        .sort({ caseId: 1 })
        //.skip(offSet)
        // .limit(500)
        .populate({ path: 'client' })
        //    .populate({path:'subclient'})
        .populate({ path: 'subclient', populate: { path: 'branch' } })
        .populate({ path: 'profile' })
        .populate({ path: 'package' })
        .populate({ path: 'dataEntryAllocatedTo' })
        .populate({ path: 'outputqcAllocatedTo' })
        .then(data => {

            res.json({ totalCount: count, resp: data });
        })
        .catch(err => {
            console.log("Problem in reading the case ...........", err)
            res.status(500).json({
                message: err.message || 'An error occurred while fetching cases with a status'
            })
        })
}*/
//01Apr2024///////
// End Changed on 22nd November 2022 by Arjun
// newly added
exports.findAllCasesWithStatusForMe = (req, res) => {
    let count = 0;
    let page = req.query.pageCount
    let offSet = page * 50
    Case
        .count({ status: req.params.status })
        .then(countData => {
            count = countData;
        })
        .catch(err => {
            console.log("Error is ", err);
            res.status(500).json({
                message: 'Error occured while getting count of cases'
            })
        })
    Case.find({ status: req.params.status, outputqcAllocatedTo: req.user.user_id })
        .sort({ caseId: 1 })
        .skip(offSet)
        .limit(50)
        .populate({ path: 'client' })
        //    .populate({path:'subclient'})
        .populate({ path: 'subclient', populate: { path: 'branch' } })
        .populate({ path: 'profile' })
        .populate({ path: 'package' })
        .populate({ path: 'dataEntryAllocatedTo' })
        .populate({ path: 'outputqcAllocatedTo' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
            const responseData = []
            for (let i = 0; i < data.length; i++) {
                const item = { ...data[i] }._doc
                let numComponents = 0
                let rejectedComponents = 0

                if (item.profile) {
                    const clientContractProfiles = await ClientContractProfiles.find({ _id: item.profile })
                    numComponents = clientContractProfiles && clientContractProfiles.clientContractProfileComponents ? clientContractProfiles.clientContractProfileComponents.length : 0
                } else if (item.package) {
                    const clientContractPackages = await ClientContractPackages.find({ _id: item.package })
                    numComponents = clientContractPackages && clientContractPackages.clientContractPackageComponents ? clientContractPackages.clientContractPackageComponents.length : 0

                } else if (item.componentsToCheck) {
                    numComponents = item.componentsToCheck.length
                }
                console.log("Current Item:", item)
                let actualComponents = item.actualComponents
                while (actualComponents && actualComponents.length) {
                    const currComponent = actualComponents[0]
                    const model = require(`../../models/data_entry/${currComponent}.model`)
                    const modelData = await model.find({ case: item._id })
                    for (let j = 0; j < modelData.length; j++) {
                        const currItem = modelData[j]
                        if (currItem.status == 'INPUTQC-REJECTED') {
                            rejectedComponents++
                        }

                    }
                    actualComponents = actualComponents.filter(comp => comp != currComponent)
                }


                item.rejectChecks = rejectedComponents
                item.totalChecks = numComponents
                item.pendingChecks = numComponents - actualComponents.length
                responseData[i] = item
            }
            res.json({ totalCount: count, resp: responseData });
        })
        .catch(err => {
            console.log("Problem in reading the case ...........", err)
            res.status(500).json({
                message: err.message || 'An error occurred while fetching cases with a status'
            })
        })
}
//newly added
exports.findACaseForReport = (req, res) => {
    Case.find({ caseId: req.params.caseId })
        .limit(1)
        .populate({ path: 'client' })
        .populate({ path: 'subclient' })
        .populate({ path: 'profile' })
        .populate({ path: 'package' })
        .populate({ path: 'dataEntryAllocatedTo' })
        .then(data => {
            console.log("Found a case ", data)
            res.json({ totalCount: 1, resp: data });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'An error occurred while fetching cases with a status'
            })
        })
}

exports.createABatchCase = async (req, res) => {

    try {
        if (!req.body.client) {
            res.status(400).json({ message: "Client Cannot be empty" });

        }
        if (!req.body.subclient) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }
        if (!req.body.candidateName) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }
        let currDate = moment();
        const client = await Client.findOne({ _id: req.body.client })
        let findString = `A${currDate.format('YY')}${currDate.format('MM')}${currDate.format('DD')}${client.clientCode}*`;
        console.log('find string is ', findString);
        let caseId;

        // Quesrying the latest case id for that clinet
        const caseData = await Case.findOne({ caseId: { "$regex": findString, "$options": "i" } }).sort({ caseId: -1 })
        if (caseData) {
            const latestCaseId = caseData.caseId
            caseId = appendLatestCaseId(latestCaseId);

            // Appending 1 to the latest case Id
            function appendLatestCaseId(caseId) {
                const caseNumber = caseId.slice(10);
                caseId = caseId.replace(caseNumber, '');

                let latestCaseNumber = '';
                for (let i = 0; i < caseNumber.length; i++) {
                    if (caseNumber[i] !== '0') {
                        latestCaseNumber = caseNumber.slice(i);
                        break;
                    }
                }

                latestCaseNumber = Number(latestCaseNumber) + 1;
                if (latestCaseNumber < 9) {
                    latestCaseNumber = '000' + latestCaseNumber;
                } else if (latestCaseNumber > 9 && latestCaseNumber < 99) {
                    latestCaseNumber = '00' + latestCaseNumber;
                } else if (latestCaseNumber > 99 && latestCaseNumber < 999) {
                    latestCaseNumber = '0' + latestCaseNumber;
                }
                caseId = caseId + latestCaseNumber;
                return caseId;
            }

        } else {
            caseId = `A${currDate.format('YY')}${currDate.format('MM')}${currDate.format('DD')}${client.clientCode}0001`
        }
        console.log(caseId)
        console.log('got the last case id and now creating the batch');
        createCase(caseId);

        function createCase(caseId) {
            console.log('about to create the case body is ', req.body);
            let intTat = req.body.tat - 1;
            console.log("moment is ", moment().add(intTat, 'days'));
            //        console.log("intTat is ",intTat);
            caseToCreate = new Case({
                caseId: caseId,
                client: req.body.client,
                subclient: req.body.subclient,
                candidateName: req.body.candidateName,
                employeeId: req.body.employeeId,
                initiationDate: new Date(),
                tatEndDate: moment().add(intTat, 'days').toDate(),
                package: req.body.package,
                profile: req.body.profile,
                status: req.body.status,
                batch: req.body.batch,
                componentsToCheck: (req.body.componentsToCheck ? JSON.parse(req.body.componentsToCheck) : null),
                dataEntryCompletionDate: null,
                inputqcCompletionDate: null,
                outputqcCompletionDate: null,
                reportDate: null,
                caseStopDate: null,
                reinitiationDate: null,
                firstInsufficiencyRaisedDate: null,
                lastInsufficiencyClearedDate: null,
                grade: null,
                dataEntryAllocatedTo: null
            })
            caseToCreate
                .save(caseToCreate)
                .then(caseData => {
                    Batch
                        .findOne({ _id: req.body.batch })
                        .then(data => {
                            caseHistory.create(caseData._id, null, null, 'Batch Case Creation', 'BATCH-CASE-CREATION', 'Batch Case Creation', null, null, null, req.user.user_id)
                            let oldPath = `/REPO_STORAGE/batch_uploads/${data.batchId}/${req.body.caseFileName}`;
                            let f = path.basename(oldPath);
                            let newPath = `/REPO_STORAGE/case_uploads/${caseId}`
                            !fs.existsSync(newPath) && fs.mkdirSync(newPath);
                            let dest = path.resolve(newPath, f)
                            fs.rename(oldPath, dest, (err) => {
                                if (err) {
                                    console.log('error moving file ', err);
                                    res.status(500).json({
                                        message: err.message | 'Some error occurred while moving the case related file'
                                    })
                                }
                                res.json(caseData);
                            })
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the case"
                            })
                        })

                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the case"
                    })
                })
        }
    } catch (err) {
        console.log(err)
        return res.json({ message: "Could not create a batch case due to internal server error: " + err })
    }
}
exports.findCasesReadyForOutputqc = (req, res) => {

}

exports.uploadloa = (req, res) => {
    let loaFile = req.files.loaFile;
    loaFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/loa/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        res.json({ message: "File uploaded" });
    });
};

exports.pendingCases = (req, res) => {
    console.log("In pending cases")
    let query = { user: req.user.user_id }
    if (req.params.client_id != "-") {
        query = { user: req.user.user_id, client: req.params.client_id }
    }
    console.log("Query is ", query)
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find(query, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    getPendingCases()
    async function getPendingCases() {
        try {
            let subclientArray = await getSubclientArray();
            let count = 0;
            Case
                .count({ status: { $ne: 'OUTPUTQC-ACCEPTED' }, subclient: { $in: subclientArray } })
                .then(countData => {
                    count = countData;
                })
                .catch(err => {
                    console.log("Error is ", err);
                    res.status(500).json({
                        message: 'Error occured while getting count of cases'
                    })
                })
            Case
                .find({ status: { $ne: 'OUTPUTQC-ACCEPTED' }, subclient: { $in: subclientArray } })
                .sort({ caseId: 1 })
                .skip(offset)
                .limit(500)
                .populate({ path: 'subclient', populate: { path: 'client' } })
                .then(data => {
                    res.json({ totalCount: count, resp: data })
                })
                .catch(err => {
                    console.log("Error is ", err);
                    res.status(500).json({
                        message: err.message | 'Some error occured while fetching pending cases'
                    })
                })
        }
        catch (error) {
            res.status(500).json({
                message: 'Some error occured while fetching pending cases'
            })
        }

    }


}
exports.searchByCandidateName = (req, res) => {
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find({ user: req.user.user_id }, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    getCasesByCandidateName()
    async function getCasesByCandidateName() {
        let subclientArray = await getSubclientArray();
        let count = 0;
        Case
            .count({ candidateName: { "$regex": req.params.candidateName, "$options": "i" }, subclient: { $in: subclientArray } })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        Case
            .find({ candidateName: { "$regex": req.params.candidateName, "$options": "i" }, subclient: { $in: subclientArray } })
            .sort({ caseId: 1 })
            .skip(offset)
            .limit(500)
            .populate({ path: 'subclient', populate: { path: 'client' } })
            .then(data => {
                res.json({ totalCount: count, resp: data })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | 'Some error occured while fetching pending cases'
                })
            })
    }

}
/*exports.searchByCaseId = (req, res) => {
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find({ user: req.user.user_id }, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    getCasesByCaseId()
    async function getCasesByCaseId() {
        let subclientArray = await getSubclientArray();
        let count = 0;
        Case
            .count({ caseId: req.params.caseId, subclient: { $in: subclientArray } })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        Case
            .find({ caseId: req.params.caseId, subclient: { $in: subclientArray } })
            .sort({ caseId: 1 })
            .skip(offset)
            .limit(500)
            .populate({ path: 'subclient', populate: { path: 'client' } })
            .then(async data => {
                                const personalDetailsPromises = data.map(async (item) => {
                        const personalDetails = await personal_details_dataModel.find({ case: item._id });
                        return { ...item._doc, personalDetails: personalDetails };
                    });

                    const dataWithPersonalDetails = await Promise.all(personalDetailsPromises);

                    res.json({ totalCount: count, resp: dataWithPersonalDetails });
                //res.json({ totalCount: count, resp: data })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | 'Some error occured while fetching pending cases'
                })
            })
    }

}*/
exports.searchByCaseId = (req, res) => {
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find({ user: req.user.user_id }, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    getCasesByCaseId()
    async function getCasesByCaseId() {
        let subclientArray = await getSubclientArray();
        let count = 0;
        Case
            .count({ caseId: req.params.caseId, subclient: { $in: subclientArray } })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        Case
            .find({ caseId: req.params.caseId, subclient: { $in: subclientArray } })
            .sort({ caseId: 1 })
            .skip(offset)
            .limit(500)
            .populate({ path: 'subclient', populate: { path: 'client' } })
            .then(data => {
                res.json({ totalCount: count, resp: data })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | 'Some error occured while fetching pending cases'
                })
            })
    }

}


exports.searchByInitiationDate = (req, res) => {
    console.log("In search by completion date");
    let query = { user: req.user.user_id }
    if (req.params.client_id != "-") {
        query = { user: req.user.user_id, client: req.params.client_id }
    }
    console.log("In search by initiation date");
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find(query, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    getCasesByInitiationDate();
    async function getCasesByInitiationDate() {
        let subclientArray = await getSubclientArray();
        let count = 0;
        Case
            .count({ initiationDate: { $gte: req.params.initiationDateFrom, $lte: req.params.initiationDateTo }, subclient: { $in: subclientArray } })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        Case
            .find({ initiationDate: { $gte: req.params.initiationDateFrom, $lte: req.params.initiationDateTo }, subclient: { $in: subclientArray } })
            .sort({ caseId: 1 })
            .skip(offset)
            .limit(500)
            .populate({ path: 'subclient', populate: { path: 'client' } })
	    .populate({ path: 'grade', model: 'ColorMaster' }) // added this line
            .then(data => {
                res.json({ totalCount: count, resp: data })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | 'Some error occured while fetching pending cases'
                })
            })
    }

}
/*exports.searchByCompletionDate = (req, res) => {
    console.log("In search by completion date");
    let query = { user: req.user.user_id }
    if (req.params.client_id != "-") {
        query = { user: req.user.user_id, client: req.params.client_id }
    }
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find(query, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    getCasesByCompletionDate();
    async function getCasesByCompletionDate() {
        let subclientArray = await getSubclientArray();
        let count = 0;
        Case
            .count({ outputqcCompletionDate: { $gte: req.params.completionDateFrom, $lte: req.params.completionDateTo + "T23:59:59.999Z" }, subclient: { $in: subclientArray },status:"OUTPUTQC-ACCEPTED" })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        Case
            .find({ outputqcCompletionDate: { $gte: req.params.completionDateFrom, $lte: req.params.completionDateTo + "T23:59:59.999Z" }, subclient: { $in: subclientArray } ,status:"OUTPUTQC-ACCEPTED"})
            .sort({ caseId: 1 })
            .skip(offset)
            .limit(500)
            .populate({ path: 'subclient', populate: { path: 'client' } })
            .then(data => {
                res.json({ totalCount: count, resp: data })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | 'Some error occured while fetching pending cases'
                })
            })
    }
}*/
exports.searchByCompletionDate = (req, res) => {
    console.log("In search by completion date");
    let query = { user: req.user.user_id }
    if (req.params.client_id != "-") {
        query = { user: req.user.user_id, client: req.params.client_id }
    }
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find(query, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    getCasesByCompletionDate();
    async function getCasesByCompletionDate() {
        let subclientArray = await getSubclientArray();
        let count = 0;
        Case
            .count({ outputqcCompletionDate: { $gte: req.params.completionDateFrom, $lte: req.params.completionDateTo + "T23:59:59.999Z" }, subclient: { $in: subclientArray }, status: "OUTPUTQC-ACCEPTED" })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        // Case
        //     .find({ outputqcCompletionDate: { $gte: req.params.completionDateFrom, $lte: req.params.completionDateTo + "T23:59:59.999Z" }, subclient: { $in: subclientArray }, status: "OUTPUTQC-ACCEPTED" })
        //     .sort({ caseId: 1 })
        //     .skip(offset)
        //     .limit(500)
        //     .populate({ path: 'subclient', populate: { path: 'client' } })
        //     .then(data => {
        //         res.json({ totalCount: count, resp: data })
        //     })
        //     .catch(err => {
        //         res.status(500).json({
        //             message: err.message | 'Some error occured while fetching pending cases'
        //         })
        //     })

        Case.find({
            outputqcCompletionDate: {
                $gte: req.params.completionDateFrom,
                $lte: req.params.completionDateTo + "T23:59:59.999Z"
            },
            subclient: { $in: subclientArray },
            status: "OUTPUTQC-ACCEPTED"
        })
            .sort({ caseId: 1 })
            .skip(offset)
            .limit(500)
            .populate({ path: 'subclient', populate: { path: 'client' } })
            .populate({ path: 'grade', model: 'ColorMaster' }) // added this line
            .then(data => {
                res.json({ totalCount: count, resp: data });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || 'Some error occurred while fetching pending cases'
                });
            });

    }
}
exports.searchByCaseIdWithNoRestrictions = (req, res) => {
    let page = req.query.pageCount;
    let offset = page * 500;
    let count = 0;
    Case
        .count({ caseId: req.params.caseId })
        .then(countData => {
            count = countData;
        })
        .catch(err => {
            console.log("Error in case id search no res is ", err);
            res.status(500).json({
                message: 'Error occured while getting count of cases'
            })
        })
    Case
        .find({ caseId: req.params.caseId })
        .sort({ caseId: 1 })
        .skip(offset)
        .limit(500)
        .populate({ path: 'subclient', populate: { path: 'client' } })
        .then(data => {
            res.json({ totalCount: count, resp: data })
        })
        .catch(err => {
            console.log("Error in case id search no res", err)
            res.status(500).json({
                message: err.message | 'Some error occured while fetching pending cases'
            })
        })


}


exports.uploadExcelCase = async (req, res) => {
    try {
        let currDate = moment();
        const client = await Client.findOne({ _id: req.body.client })
        let findString = `A${currDate.format('YY')}${currDate.format('MM')}${currDate.format('DD')}${client.clientCode}*`;
        console.log('find string is ', findString);
        let caseId;

        // Quesrying the latest case id for that clinet
        const caseData = await Case.findOne({ caseId: { "$regex": findString, "$options": "i" } }).sort({ caseId: -1 })
        if (caseData) {
            const latestCaseId = caseData.caseId
            caseId = appendLatestCaseId(latestCaseId);

            // Appending 1 to the latest case Id
            function appendLatestCaseId(caseId) {
                const caseNumber = caseId.slice(10);
                caseId = caseId.replace(caseNumber, '');

                let latestCaseNumber = '';
                for (let i = 0; i < caseNumber.length; i++) {
                    if (caseNumber[i] !== '0') {
                        latestCaseNumber = caseNumber.slice(i);
                        break;
                    }
                }

                latestCaseNumber = Number(latestCaseNumber) + 1;
                if (latestCaseNumber < 9) {
                    latestCaseNumber = '000' + latestCaseNumber;
                } else if (latestCaseNumber > 9 && latestCaseNumber < 99) {
                    latestCaseNumber = '00' + latestCaseNumber;
                } else if (latestCaseNumber > 99 && latestCaseNumber < 999) {
                    latestCaseNumber = '0' + latestCaseNumber;
                }
                caseId = caseId + latestCaseNumber;
                return caseId;
            }

        } else {
            caseId = `A${currDate.format('YY')}${currDate.format('MM')}${currDate.format('DD')}${client.clientCode}0001`
        }
        console.log(caseId)
        console.log('got the last case id and now creating the batch');
        createCase(caseId);

        function createCase(caseId) {
            console.log('about to create the case body is ', req.body);
            let intTat = req.body.tat - 1;
            console.log("moment is ", moment().add(intTat, 'days'));
            //        console.log("intTat is ",intTat);
            caseToCreate = new Case({
                caseId: caseId,
                client: req.body.client,
                subclient: req.body.subclient,
                candidateName: req.body.candidateName,
                employeeId: req.body.employeeId,
                initiationDate: new Date(),
                tatEndDate: moment().add(intTat, 'days').toDate(),
                package: req.body.package,
                profile: req.body.profile,
                status: req.body.status,
                batch: req.body.batch,
                componentsToCheck: (req.body.componentsToCheck ? req.body.componentsToCheck : null),
                dataEntryCompletionDate: null,
                inputqcCompletionDate: null,
                outputqcCompletionDate: null,
                reportDate: null,
                caseStopDate: null,
                reinitiationDate: null,
                firstInsufficiencyRaisedDate: null,
                lastInsufficiencyClearedDate: null,
                grade: null,
                dataEntryAllocatedTo: null
            })
            console.log("Case to create is ", caseToCreate);
            caseToCreate
                .save(caseToCreate)
                .then(caseData => {
                    caseHistory.create(caseData._id, null, null, 'Excel Case Creation', 'EXCEL-CASE-CREATION', 'Excel Case Creation', null, null, null, req.user.user_id)
                    res.json(caseData);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the case"
                    })
                })
        }
    } catch (err) {
        console.log(err)
        return res.json({ message: "Could not create excel case due to an internal server error: " + err })
    }
}

exports.addACheck = (req, res) => {
    console.log("Additional Checks ", req.body.checkToAdd)
    Case.findOne({ _id: req.params._id })
        .then(data => {
            let additionalChecks = null
            if (data.additionalChecks == null) {
                additionalChecks = [req.body.checkToAdd]
            } else {
                additionalChecks = data.additionalChecks
                additionalChecks.push(req.body.checkToAdd)
                Case
                    .findOneAndUpdate({ _id: req.params._id }, {
                        additionalChecks: additionalChecks,
                        status: "ADD-CHECK"
                    })
                    .then(data => {
                        res.json(data)
                    })
                    .catch(err => {
                        console.log("Error is ", err)
                        res.status(500).json({
                            message: err | 'Some error occurred  while adding a check'
                        })
                    })
            }

        })
        .catch(err => {
            console.log("Error is ", err)
            res.status(500).json({
                message: err | 'Some error occurred while adding a check'
            })
        })

}



exports.allocateCaseToUser = (req, res) => {
    console.log("About to update the de allocated", req.params.case_id)
    console.log("About to sllocate it to", req.body.case_id)
    Case
        .findOneAndUpdate({ _id: req.params.case_id }, { dataEntryAllocatedTo: req.body.user_id, status: 'DE-ALLOCATED', dataEntryAllocationDate: new Date() })
        .then(data => {
            // caseHistory.create(data_id,null,null,'Case Allocation','CASE-ALLOCATION','Data Entry Allocation to',null,null,req.body.user_id,req.user.user_id)	    
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: "Error allocating to user"
            })
        })
}
exports.setOutputqcGrade = (req, res) => {
    console.log("About to update case grade")
    console.log("grade to update ", req.body.grade)
    console.log("Report type to update ", req.body.reportType)
    console.log("Grading comments to update", req.body.gradingComments)
    let subclient = ""
    let caseId = ""
    let candidateName = ""
    Case
        .findOneAndUpdate({ _id: req.params.case_id }, {
            status: "OUTPUTQC-ACCEPTED",
            grade: req.body.grade,
            grade1: req.body.grade,
            gradingComments: req.body.gradingComments,
            reportType: req.body.reportType,
            outputqcCompletionDate: Date.now(),
            outputqcCompletedBy: req.user.user_id
        })
        .then(data => {
            console.log("Case Grade updated")
            subclient = data.subclient
            caseHistory.create(data._id, null, null, 'Output QC Acceptance & Grading', 'CASE-UPDATION', 'Output & QC Grading', null, null, null, req.user.user_id)
            checkAndSendMail()
            res.json(data)
        })
        .catch(err => {
            console.log("Error saving case status...........  ", err)
            res.status(500).json({
                message: "Error updating case status"
            })
        })

    function checkAndSendMail() {
        //        console.log("trying to find a notification for the status ",req.body.status)
        //        console.log("trying to find a notification for the subclient ",req.body.subclient)
        SubclientNotification
            .findOne({ subclient: subclient, triggerStatus: req.body.status, triggerColor: req.body.grade, fequency: 'INCIDENT' })
            .populate({ path: 'template' })
            .then(data => {
                console.log("Data to send mail is ", data);
                if (data != null) {
                    let mailAddresses = ""
                    UserSubclientAccess
                        .find({ subclient: data.subclient._id })
                        .populate({ path: 'user' })
                        .then(subclientData => {
                            for (let i = 0; i < subclientData.length; i++) {
                                let item = subclientData[i]
                                if (i == 0) {
                                    mailAddresses = item.user.userId
                                } else {
                                    mailAddresses = mailAddresses + "," + item.user.userId
                                }
                            }
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'Could not send mails to the client'
                            })
                        })
                    let subject = data.template.subject
                    let changedSubject = subject.replace('<<CASE-ID>>', req.body.caseId)
                    let mailText = data.template.content
                    let caseDetails = `<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td></tr><tr><td>${caseId}</td><td>${candidateName}</td></tr></table>`
                    let changedMailText = mailText.replace('&lt;&lt;DISCREPANCY-TABLE&gt;&gt', caseDetails)
                    let mailSent = mailSend.sendMail(madilAddresses, changedSubject, changedMailText)
                } else {
                    return true
                }

            })
            .catch(err => {
                return false
            })

    }


}
exports.updateInsuffRaisedDate = (req, res) => {
    Case
        .findOne({ _id: req.params._id })
        .then(data => {
		console.log("Req body:", req.body)
            if (data.firstInsufficiencyRaisedDate == null) {
                Case
                    .findOneAndUpdate({ _id: req.params._id }, { firstInsufficiencyRaisedDate: Date.now() })
                    .then(data => {
                        //                caseHistory.create(data._id,null,null,'First Insuff Raised','CASE-UPDATION','First Insuff Raised',null,null,null,req.user.user_id)		   
                        checkAndSendMail()
                        res.json(data)
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "Error updating case status"
                        })
                    })
            } else {
                checkAndSendMail()
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Error updating case status"
            })
        })
    function checkAndSendMail() {
        console.log("trying to find a notification for the status...", req.body.status)
        console.log("trying to find a notification for the subclient... ", req.body.subclient)
        console.log("Insuf comments are ", req.body.insufficiencyComments)
        SubclientNotification
            .findOne({ subclient: req.body.subclient, triggerStatus: req.body.status })
            .populate({ path: 'subclient' })
            .populate({ path: 'subclient', populate: { path: 'cam' } })
            .populate({ path: 'template' })
            .then(async data => {
                console.log("Data to send mail for insufffffffffffffff is....now ", data);
                if (data != null) {
                    if (data.frequency == 'INCIDENT') {
                        console.log("Have to send a mail")
                        //let mailAddresses = data.subclient.email + "," + data.subclient.cam.userId
                        let mailAddresses = data.subclient.email
                        console.log("Mails are to be sent to ............", mailAddresses)
                        let insufficiencyComments = ""
                        if (req.body.insufficiencyComments != null) {
                            insufficiencyComments = req.body.insufficiencyComments
                        } else if (req.body.insufficiencyDetails != null) {
                            insufficiencyComments = req.body.insufficiencyDetails
                        }

                        /*		    UserSubclientAccess
                                    .find({subclient:data.subclient._id})
                                    .populate({path:'user'})	
                                    .then(subclientData=>{
                                       for(let i=0; i < subclientData.length;i++){
                                     let  item = subclientData[i]      
                                     if(i==0){
                                                 mailAddresses = item.user.userId		
                                     }else{
                                       mailAddresses = mailAddresses + "," + item.user.userId
                                     }        
                                       }	    
                                    })
                                        .catch(err=>{
                                       res.status(500).json({
                                           message: 'Could not send mails to the client'     
                                       })	    
                                    })		*/
                        let subject = data.template.subject
                        let changedSubject = subject.replace('<<CASE-ID>>', req.body.caseId)
                        let mailText = data.template.content
                        let caseDetails = `<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Details</td></tr><tr><td>${req.body.caseId}</td><td>${req.body.candidateName}</td><td>${req.body.componentDisplayName}</td><td>${insufficiencyComments}</td</tr></table>`
                        let changedMailText = mailText.replace('&lt;&lt;INSUFFICIENCY-TABLE&gt;&gt;', caseDetails)
                        let mailSent = mailSend.sendMail(mailAddresses, changedSubject, changedMailText)
                        return mailSent
                    } else {
			    console.log("First return")
                        return true
                    }
                } else {
			console.log("Second return")
                    return true
                }

            })
            .catch(err => {
                console.log('Error getting notification details............................ ', err)
            })

    }
    let getMailIds = function (subclientId) {
        return new Promise((resolve, reject) => {
            Subclient
                .findOne({ _id: subclientId })
                .then(subclientData => {
                    let mailAddresses = subclientData.email
                    resolve(mailAddresses)
                })
                .catch(err => {
                    reject()
                })

        })
    }
}
exports.updateInsuffClearedDate = (req, res) => {
    console.log("Insuff Last clered date being updated for ", req.params._id)
    Case
        .findOneAndUpdate({ _id: req.params._id }, { lastInsufficiencyClearedDate: Date.now() })
        .then(data => {
            console.log("Updated", data)
            caseHistory.create(data._id, null, null, 'Last Insuff Cleared', 'CASE-UPDATION', 'Last Insuff Cleared', null, null, null, req.user.user_id)
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: "Error updating case status"
            })
        })
}
/////Main//////
 /*exports.uploadPdfReport = (req, res) => {
    let reportFile = req.files.reportFile;
    console.log("reportFile", reportFile)
    console.log("case id  ", req.body.caseId)
    console.log("reportType ", req.body.reportType)
    console.log("file name ", req.body.fileName);
    reportFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/reports/' + req.body.reportType + '/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        Case
            .findOneAndUpdate({ caseId: req.body.caseId }, {
                reportType: req.body.reportType,
                reportDate: moment(new Date()).add(5, 'hours').add(30, 'minutes')
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Error updating Report Type'
                })
            })

    });

}*/
////////////////////new///////////////////////////
exports.uploadPdfReport = async (req, res) => {

  if (req.body.reportType == "undefined") {
    return res.status(400).json({ error: "Report type cannot be undefined" });
  }

  let reportFile = req.files.reportFile;

  let updateData = {};

  console.log("reportFile", reportFile);

  console.log("case id  ", req.body.caseId);

  console.log("reportType ", req.body.reportType);

  console.log("file name ", req.body.fileName);

  if (req.body.fileName.includes(req.body.caseId)) {
    reportFile.mv(
      "/REPO_STORAGE/case_uploads/" +
        req.body.caseId +
        "/reports/" +
        req.body.reportType +
        "/" +
        req.body.fileName +
        ".pdf",
      function (err) {
        if (err) {
          return res.status(500).send({ message: "Error uploading the file" });
        }

        if (req.body.reportType === "INTERIM") {
          updateData = {
            reportType: req.body.reportType,

            interimReportDate: moment(new Date())
              .add(5, "hours")
              .add(30, "minutes"),

            interimReportUploadedBy: req.user.user_id,
          };
        } else if (req.body.reportType === "SUPPLEMENTARY") {
          updateData = {
            reportType: req.body.reportType,
            supplementaryReportDate: moment(new Date())
              .add(5, "hours")
              .add(30, "minutes"),
            supplementaryReportUploadedBy: req.user.user_id,
          };
        } else {
          updateData = {
            reportType: req.body.reportType,

            reportDate: moment(new Date()).add(5, "hours").add(30, "minutes"),
          };
        }

        Case.findOneAndUpdate({ caseId: req.body.caseId }, updateData)

          .then(async (data) => {
            const template = await EmailTemplate.findOne({
              name: "Report Completion - Adamma",
            });

            const subclientNotificationData =
              await SubclientNotification.findOne({
                subclient: data.subclient,
                template: template._id,
              });

            // Sending mail to the client with all the components and the color code for the component for a case

            if (subclientNotificationData) {
              let actualComponents = data.actualComponents;

              console.log(actualComponents);

              const subclientData = await Subclient.findOne({
                _id: data.subclient,
              }).populate("cam");

              const gradeData = await ColorMaster.findOne({ _id: data.grade });
              let gradingColor = "";
              if (gradeData) {
                gradingColor = gradeData.name;
              }

              // Getting the template for final report email to the client

              let subject = template.subject;

              subject = subject.replace("(caseId)", data.caseId);
              subject = subject.replace("(grade)", gradingColor);

              let html = template.content;

              html = html.replace("(caseId)", data.caseId);

              html = html.replace("(candidateName)", data.candidateName);

              // Table to return with component and color code

              let table = `

                    <table style="float: left; border:1px solid black; display:block;" cellspacing="15" rules="rows">

                    <thead>

                    <tr>

                    <th><b>Component</b></th>

                    <th><b>Color Code</b></th>

                    </tr>

                    </thead>

                    <tbody>

                   `;

              // Getting all the component data for a certain case.

              while (actualComponents.length) {
                const component = actualComponents[0];

                const model = require(`../../models/data_entry/${component}.model`);

                const modelData = await model
                  .find({ case: data._id })
                  .populate("component");

                for (let i = 0; i < modelData.length; i++) {
                  const item = modelData[i];

                  console.log(
                    "****************************************FinalReportUpload***************************************************",
                    item.component
                  );
                  const componentData = await Component.findOne({
                    name: component,
                  });
                  const displayName = componentData.displayName;
                  let color = "";

                  if (item.grade) {
                    const colorname = await ColorMaster.findOne({
                      _id: item.grade,
                    });

                    color =
                      colorname.name === "Amber" ? "orange" : colorname.name;

                    table += `<tr>

                                            <td>${displayName} ${
                      modelData.length > 1 ? i : ""
                    }</td>

                                            <td style="color:${color}">${
                      colorname.name == undefined ? "" : colorname.name
                    }</td>

                                         </tr>`;
                  } else {
                    const colorname = ColorMaster.findOne({ _id: item.grade });

                    color =
                      colorname.name === "Amber" ? "orange" : colorname.name;

                    table += `<tr>

                                            <td>${item.component.displayName} ${
                      modelData.length > 1 ? i : ""
                    }</td>

                                            <td style="color:${color}">${
                      colorname.name
                    }</td>

                                          </tr>`;
                  }
                }

                actualComponents = actualComponents.filter(
                  (component) => component != actualComponents[0]
                );
              }

              table += ` </tbody>

                    </table><br/><br/><br><br><br><br><br><br>`;

              html = html.replace("&lt;&lt;COMPONENT-TABLE&gt;&gt;", table);

              // Send mail to the client with all the components and grading color

              mailSend.sendMail(
                //`${subclientData.email}, ${subclientData.cam.userId}`,
                `${subclientData.email}`,
                subject,
                html,
                [
                  {
                    filename: `${data.caseId} - ${req.body.reportType} -${data.candidateName} Report.pdf`,
                    path:
                      "/REPO_STORAGE/case_uploads/" +
                      req.body.caseId +
                      "/reports/" +
                      req.body.reportType +
                      "/" +
                      req.body.fileName +
                      ".pdf",
                  },
                ]
              );
            }
            console.log("ASSASKDASDASD", res.json(data));
            res.json(data);
            // PDF File 11 October 2023

            res.json(data);
          })

          .catch((err) => {
            console.log(err);

            res.status(500).send({
              message: err.message,
            });
          });
      }
    );
  } else {
    res.status(500).send("File Name should include Case ID");
  }
};
/////////////////////////////////////////////////
/*exports.readReportFileNames=(req,res)=>{
    let reports = new Array()
    let filePath='/REPO_STORAGE/case_uploads/' + req.params.caseId + '/reports/'
    if(fs.existsSync(filePath)){
        fs.readdirSync(filePath).forEach(file=>{
             let reportFileDetails = ({})
             let stats = fs.statSync(`/REPO_STORAGE/case_uploads/${req.params.caseId}/reports/${file}`)
             if(!stats.isFile()){
                reportFileDetails["type"] = file
             }else{
                reportFileDetails["fileName"]=file
             }
             reports.push(reportFileDetails)
         })
     }
     res.json(reports)
}*/
/*exports.readReportFileNames = (req, res) => {
    let reports = new Array()
    let filePath = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/reports/'
    if (fs.existsSync(filePath)) {
        fs.readdirSync(filePath).forEach(file => {
            let reportFileDetails = ({})
            let stats = fs.statSync(`/REPO_STORAGE/case_uploads/${req.params.caseId}/reports/${file}`)
            if (!stats.isFile()) {
                //reportFileDetails["type"] = file
                fs.readdirSync(`/REPO_STORAGE/case_uploads/${req.params.caseId}/reports/${file}`).forEach(item => {
                    //  reportFileDetails["fileName"] = item
                    reports.push({ type: file, fileName: item })
                })
            }
        })
    }
    res.json(reports)
}*/
//19Aug2024////
exports.readReportFileNames = async (req, res) => {
  let reports = [];
  const caseData = await Case.findOne({ caseId: req.params.caseId });
  let filePath =
    "/REPO_STORAGE/case_uploads/" + req.params.caseId + "/reports/";
  let archivefilePath =
    "/archive/case_uploads/" + req.params.caseId + "/reports/";

  if (fs.existsSync(filePath)) {
    fs.readdirSync(filePath).forEach((file) => {
      let reportFileDetails = {};
      let stats = fs.statSync(
        `/REPO_STORAGE/case_uploads/${req.params.caseId}/reports/${file}`
      );
      if (!stats.isFile()) {
        fs.readdirSync(
          `/REPO_STORAGE/case_uploads/${req.params.caseId}/reports/${file}`
        ).forEach((item) => {
          reports.push({ type: file, fileName: item, date: stats.birthtime });
        });
      }
    });
  } else if (fs.existsSync(archivefilePath)) {
    fs.readdirSync(archivefilePath).forEach((file) => {
      let reportFileDetails = {};
      let stats = fs.statSync(
        `/archive/case_uploads/${req.params.caseId}/reports/${file}`
      );
      if (!stats.isFile()) {
        fs.readdirSync(
          `/archive/case_uploads/${req.params.caseId}/reports/${file}`
        ).forEach((item) => {
          reports.push({ type: file, fileName: item, date: stats.birthtime });
        });
      }
    });
  }

  res.json(reports);
};
///////////////
exports.downloadPdfReport = (req, res) => {
    console.log("about to fetch the pdf report for the case", req.query.caseId)
    console.log("Report type is ", req.query.reportType)
    console.log("File name is ", req.query.fileName)
    let file = '/REPO_STORAGE/case_uploads/' + req.query.caseId + '/reports/' + req.query.reportType + '/' + req.query.fileName;
    res.download(file);
}

exports.countOfCasesBetweenDates = (req, res) => {
    let query = { initiationDate: { $gte: req.query.dateFrom, $lte: req.query.dateTo } }

    if (req.query.countType == 'GREEN') {
        query = { outputqcCompletionDate: { $gte: req.query.dateFrom, $lte: req.query.dateTo }, grade: "602f8b3743383ec9a722496e" }
    }
    if (req.query.countType == 'AMBER') {
        query = { outputqcCompletionDate: { $gte: req.query.dateFrom, $lte: req.query.dateTo }, grade: "602f8b3743383ec9a7224970" }
    }
    if (req.query.countType == 'RED') {
        query = { outputqcCompletionDate: { $gte: req.query.dateFrom, $lte: req.query.dateTo }, grade: "602f8b3743383ec9a722496f" }
    }
    if (req.query.countType == 'COMPLETED') {
        query = { outputqcCompletionDate: { $gte: req.query.dateFrom, $lte: req.query.dateTo } }
    }

    if (req.query.countType == 'COMPLETED') {
        query = { outputqcCompletionDate: { $gte: req.query.dateFrom, $lte: req.query.dateTo } }
    }
    if (req.query.countType == 'WIP') {
        //      query = {$and:[{status:{$ne:'OUTPUTQC-ACCEPTED'}},{status:{$ne:'INSUF-1-REQ-ACCEPTED'}},{status:{$ne:'INSUF-2-REQ-ACCEPTED'}},{status:{$ne:'CLARIFICATION-REQ-ACCEPTED'}},{status:{$ne:'COST-APPROVAL-REQ-ACCEPTED'}}]}	  

        query = { $or: [{ status: { $ne: 'OUTPUTQC-ACCEPTED' }, firstInsufficiencyRaisedDate: null }, { status: { $ne: 'OUTPUTQC-ACCEPTED' }, firstInsufficiencyRaisedDate: { $ne: null }, lastInsfficiencyClearedDate: { $ne: null } }] }
    }
    if (req.query.countType == 'INSUF') {
        //      query = {$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'CLARIFICATION-REQ-ACCEPTED'},{status:'COST-APPROVAL-REQ-ACCEPTED'}]}	    
        query = { status: { $ne: 'OUTPUTQC-ACCEPTED' }, firstInsufficiencyRaisedDate: { $ne: null }, lastInsfficiencyClearedDate: null }
    }
    let getSubclientsForTheUser = function () {
        return new Promise((resolve, reject) => {
            UserSubclientAccess
                .find({ user: req.user.user_id }, { _id: 0, subclient: 1 })
                .then(data => {
                    console.log("subclients are ", data);
                    resolve(data);
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let getCasesForSubclients = function (subclients) {
        return new Promise((resolve, reject) => {
            Case
                .count({ $and: [{ $or: subclients }, query] })
                .populate({ path: 'subclient', populate: { path: 'client' } })
                .then(data => {
                    resolve(data);
                })

                .catch(err => {
                    console.log("Error in getting the cases for the subclients", err)
                    reject()
                })
        })
    }
    getCountOfCases()
    async function getCountOfCases() {
        try {
            let subClients = await getSubclientsForTheUser()
            let count = await getCasesForSubclients(subClients)
            res.json({ count: count })
        } catch (err) {
            res.status(500).json({
                message: "Error getting the count of cases"
            })
        }
    }

}
exports.getDataEntryNewInitiationsForDashBoard = (req, res) => {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let date = today.getDate()
    let dateString = ""
    let monthString = ""
    if (month < 10) {
        monthString = "0" + month
    } else {
        monthString = month
    }
    if (date < 10) {
        dateString = "0" + date
    } else {
        dateString = date
    }
    Case
        .count({ initiatioDate: { $gte: year + "-" + monthString + "-" + dateString } })
        .then(data => {
            res.json({ count: data })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error getting count of data entry initiated"
            })
        })
}
exports.getInputqcRejectionsForDashBoard = (req, res) => {
    Case
        .count({ status: "INPUTQC-REJECTED" })
        .then(data => {
            res.json({ count: data })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error getting count input qc rejections"
            })
        })
}
exports.getInputqcAcceptedForDashBoard = (req, res) => {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let date = today.getDate()
    let dateString = ""
    let monthString = ""
    if (month < 10) {
        monthString = "0" + month
    } else {
        monthString = month
    }
    if (date < 10) {
        dateString = "0" + date
    } else {
        dateString = date
    }

    Case
        .count({ status: { $ne: "INPUTQC-REJECTED" }, inputqcCompletionDate: { $gte: year + "-" + monthString + "-" + dateString } })
        .then(data => {
            res.json({ count: data })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error getting count input qc rejections"
            })
        })
}
exports.getLastSixMonthsCaseInitiated = (req, res) => {
    let data = []
    let getSubclientsForTheUser = function () {
        return new Promise((resolve, reject) => {
            UserSubclientAccess
                .find({ user: req.user.user_id }, { _id: 0, subclient: 1 })
                .then(data => {
                    console.log("subclients are ", data);
                    resolve(data);
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let getMonthlyData = function (startDate, endDate, subclients) {
        return new Promise((resolve, reject) => {
            Case
                .count({ $and: [{ $or: subclients }, { initiationDate: { $gte: startDate, $lte: endDate } }] })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(0)
                })

        })
    }
    getData()
    async function getData() {
        let subclients = await getSubclientsForTheUser()
        let firstMonthData = await getMonthlyData("2021-11-01", "2021-11-30", subclients)
        let secondMonthData = await getMonthlyData("2021-12-01", "2021-12-31", subclients)
        let thirdMonthData = await getMonthlyData("2022-01-01", "2021-01-31", subclients)
        let fourthMonthData = await getMonthlyData("2022-02-01", "2022-02-28", subclients)
        let fifthMonthData = await getMonthlyData("2022-03-01", "2022-03-31", subclients)
        let sixthMonthData = await getMonthlyData("2022-04-01", "2022-04-30", subclients)
        data.push(['November', firstMonthData])
        data.push(['December', secondMonthData])
        data.push(['January', thirdMonthData])
        data.push(['February', fourthMonthData])
        data.push(['March', fifthMonthData])
        data.push(['April', sixthMonthData])
        res.json(data)
    }
}
exports.getCasesWithStatusMailSent = (req, res) => {
    Case
        .find({ status: "MAIL-SENT", client: req.params.clientId, subclient: req.params.subclientId })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: "Error reading cases"
            })
        })
}
exports.resendMail = (req, res) => {
    Case
        .findOneAndUpdate({ caseId: req.params.caseId }, { candidateEmail: req.body.candidateEmail })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: "Error resendint mail"
            })
        })
}

exports.initiateCdeCase = async (req, res) => {
    if (!req.body.client) {
        res.status(400).json({ message: "Client Cannot be empty" });

    }
    if (!req.body.subclient) {
        res.status(400).json({ message: "Subclient Cannot be empty" });
    }
    if (!req.body.candidateName) {
        res.status(400).json({ message: "Subclient Cannot be empty" });
    }
    let currDate = moment();
    const client = await Client.findOne({ _id: req.body.client })
    let findString = `A${currDate.format('YY')}${currDate.format('MM')}${currDate.format('DD')}${client.clientCode}*`;
    console.log('find string is ', findString);
    let caseId;

    // Quesrying the latest case id for that clinet
    const caseData = await Case.findOne({ caseId: { "$regex": findString, "$options": "i" } }).sort({ caseId: -1 })
    if (caseData) {
        const latestCaseId = caseData.caseId
        caseId = appendLatestCaseId(latestCaseId);

        // Appending 1 to the latest case Id
        function appendLatestCaseId(caseId) {
            const caseNumber = caseId.slice(10);
            caseId = caseId.replace(caseNumber, '');

            let latestCaseNumber = '';
            for (let i = 0; i < caseNumber.length; i++) {
                if (caseNumber[i] !== '0') {
                    latestCaseNumber = caseNumber.slice(i);
                    break;
                }
            }

            latestCaseNumber = Number(latestCaseNumber) + 1;
            if (latestCaseNumber < 9) {
                latestCaseNumber = '000' + latestCaseNumber;
            } else if (latestCaseNumber > 9 && latestCaseNumber < 99) {
                latestCaseNumber = '00' + latestCaseNumber;
            } else if (latestCaseNumber > 99 && latestCaseNumber < 999) {
                latestCaseNumber = '0' + latestCaseNumber;
            }
            caseId = caseId + latestCaseNumber;
            return caseId;
        }

    } else {
        caseId = `A${currDate.format('YY')}${currDate.format('MM')}${currDate.format('DD')}${client.clientCode}0001`
    }
    console.log(caseId)
    console.log('got the last case id and now creating the batch');
    createCase(caseId);

    function createCase(caseId) {
        console.log('about to create the case body is ', req.body);
        let intTat = req.body.tat - 1;
        console.log("moment is ", moment().add(intTat, 'days'));
        //        console.log("intTat is ",intTat);
        caseToCreate = new Case({
            caseId: caseId,
            client: req.body.client,
            subclient: req.body.subclient,
            candidateName: req.body.candidateName,
            initiationDate: new Date(),
            employeeId: req.body.employeeId,
            tatEndDate: moment().add(intTat, 'days').toDate(),
            package: req.body.package,
            profile: req.body.profile,
            status: req.body.status,
            candidateEmail: req.body.candidateEmail,
            cde: req.body.cde,
            componentsToCheck: (req.body.componentsToCheck ? JSON.parse(req.body.componentsToCheck) : null),
            dataEntryCompletionDate: null,
            inputqcCompletionDate: null,
            outputqcCompletionDate: null,
            reportDate: null,
            caseStopDate: null,
            reinitiationDate: null,
            firstInsufficiencyRaisedDate: null,
            lastInsufficiencyClearedDate: null,
            grade: null,
            dataEntryAllocatedTo: null
        })
        if (req.body.batch) {
            caseToCreate.batch = req.body.batch
        }
        caseToCreate
            .save(caseToCreate)
            .then(data => {
                console.log("created case");
                caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id)
                res.json(data)
            })
            .catch(err => {
                console.log("error creating the case ", err.message);
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the case"
                })
            })
    }
}
exports.getCdeCaseDetails = (req, res) => {
    //   console.log("Access Token is ",req.query.access_token)
    //   let returnedCaseId = authenticateCdeToken(req.query.access_token)
    //   console.log("Case Id being returned is ",returnedCaseId)
    //     console.log("returned Case Id ", req)
    let returnedCaseId = req.caseId
    if (returnedCaseId != null) {
        Case
            .findOne({ caseId: returnedCaseId })
            .then(data => {
                if (data.status == 'MAIL-SENT' || data.status == 'CDE-REJECTED') {
                    res.json(data)
                } else {
                    res.status(409).json({ message: "You have submitted the required details" })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err | 'Some error occurred while reading the case'
                })
            })
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }

}
exports.saveAuthorizationSignature = (req, res) => {
    let caseId = req.caseId
    console.log("In save authoriztion signature case id is ", caseId)
    if (caseId != null) {
        console.log("Base 64 file is ", req.body.signature)
        const buffer = Buffer.from(req.body.signature)
        console.log("Buffer is ", buffer)
        if (fs.existsSync("/REPO_STORAGE/case_uploads/" + caseId + "/auth_signature/")) {
            fs.writeFileSync("/REPO_STORAGE/case_uploads/" + caseId + "/auth_signature/signature.jpg", buffer)
        } else if (!fs.existsSync("/REPO_STORAGE/case_uploads/" + caseId)) {
            fs.mkdirSync("/REPO_STORAGE/case_uploads/" + caseId)
            fs.mkdirSync("/REPO_STORAGE/case_uploads/" + caseId + "/auth_signature/")
            fs.writeFileSync("/REPO_STORAGE/case_uploads/" + caseId + "/auth_signature/signature.jpg", buffer)
        } else if (!fs.existsSync("/REPO_STORAGE/case_uploads/" + caseId + "/auth_signature")) {
            fs.mkdirSync("/REPO_STORAGE/case_uploads/" + caseId + "/auth_signature/")
            fs.writeFileSync("/REPO_STORAGE/case_uploads/" + caseId + "/auth_signature/signature.jpg", buffer)
            console.log("directory for the auth signature created")
        }
        //    fs.writeFileSync("/REPO_STORAGE/case_uploads/"+caseId+"/auth_signature/signature.jpg",buffer)

        Case
            .findOneAndUpdate({ caseId: caseId }, { status: "CDE-COMPLETED", dataEntryCompletionDate: new Date() })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({
                    message: "Error during submission"
                })
            })
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
}
exports.findAllCasesWithStatusCdeCompleted = (req, res) => {
    let getSubclientsForTheUser = function () {
        return new Promise((resolve, reject) => {
            UserSubclientAccess
                .find({ user: req.user.user_id }, { _id: 0, subclient: 1 })
                .then(data => {
                    console.log("subclients are ", data);
                    resolve(data);
                })
                .catch(err => {
                    reject()
                })
        })
    }
    getData()
    async function getData() {
        let subclients = await getSubclientsForTheUser()
        let count = 0;
        let page = req.query.pageCount
        let offSet = page * 500
        Case
            .count({ $and: [{ $or: subclients, status: "CDE-COMPLETED" }] })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        Case.find({ $and: [{ $or: subclients, status: "CDE-COMPLETED" }] })
            .sort({ caseId: 1 })
            .skip(offSet)
            .limit(500)
            .populate({ path: 'client' })
            .populate({ path: 'subclient' })
            .populate({ path: 'profile' })
            .populate({ path: 'package' })
            .populate({ path: 'dataEntryAllocatedTo' })
            .then(data => {
                res.json({ totalCount: count, resp: data });
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || 'An error occurred while fetching cases with a status'
                })
            })
    }
}
// Added by Arjun on 22nd November 2022
exports.updateOutputqcAllocation = (req, res) => {
    Case
        .findOneAndUpdate({ _id: req.params.case_id }, { outputqcAllocatedTo: req.body.user_id, outputqcAllocationDate: new Date() })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'An error occurred while updating outputqc allocation'
            })
        })
}
// End Added by Arjun on 22nd November 2022
/*exports.uploadPdfReport = async (req, res) => {
    let reportFile = req.files.reportFile;
    let updateData = {}
    ///ABCDconsole.log("reportFile", reportFile)
    console.log("case-id  ", req.body.caseId)
    console.log("reportType ", req.body.reportType)
    console.log("file name ", req.body.fileName);
    reportFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/reports/' + req.body.reportType + '/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            return res.status(500).send({ message: "Error uploading the file" });
        }

        if (req.body.reportType === "INTERIM") {
            updateData = {
                reportType: req.body.reportType,
                interimReportDate: moment(new Date()).add(5, 'hours').add(30, 'minutes'),
                interimReportUploadedBy: req.user.user_id
            }
        } else {
            updateData = {
                reportType: req.body.reportType,
                reportDate: moment(new Date()).add(5, 'hours').add(30, 'minutes')
            }
        }
        Case
            .findOneAndUpdate({ caseId: req.body.caseId }, updateData)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Error updating Report Type'
                })
            })

    });

}*/

//archived
exports.searchUnarchivedCases = (req, res) => {
    console.log("In search by completion date");
    let query = { user: req.user.user_id }
    if (req.params.client_id != "-") {
        query = { user: req.user.user_id, client: req.params.client_id }
    }
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find(query, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    getCasesByCompletionDate();
    async function getCasesByCompletionDate() {
        let subclientArray = await getSubclientArray();
        let count = 0;
        Case
            .count({ outputqcCompletionDate: { $gte: req.params.completionDateFrom, $lte: req.params.completionDateTo + "T23:59:59.999Z" }, subclient: { $in: subclientArray }, $or: [{ archived: { $exists: false } }, { archived: false }] })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        Case
            .find({ outputqcCompletionDate: { $gte: req.params.completionDateFrom, $lte: req.params.completionDateTo + "T23:59:59.999Z" }, subclient: { $in: subclientArray }, $or: [{ archived: { $exists: false } }, { archived: false }] })
            .sort({ caseId: 1 })
            .skip(offset)
            .limit(500)
            .populate({ path: 'subclient', populate: { path: 'client' } })
            .then(data => {
                res.json({ totalCount: count, resp: data })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | 'Some error occured while fetching pending cases'
                })
            })
    }
}
exports.searchByCaseIdUnarchived = (req, res) => {
    let page = req.query.pageCount;
    let offset = page * 500;
    let count = 0;
    Case
        .count({ caseId: req.params.caseId, $or: [{ archived: { $exists: false } }, { archived: false }] })
        .then(countData => {
            count = countData;
        })
        .catch(err => {
            console.log("Error in case id search no res is ", err);
            res.status(500).json({
                message: 'Error occured while getting count of cases'
            })
        })
    Case
        .find({ caseId: req.params.caseId, $or: [{ archived: { $exists: false } }, { archived: false }] })
        .sort({ caseId: 1 })
        .skip(offset)
        .limit(500)
        .populate({ path: 'subclient', populate: { path: 'client' } })
        .then(data => {
            res.json({ totalCount: count, resp: data })
        })
        .catch(err => {
            console.log("Error in case id search no res", err)
            res.status(500).json({
                message: err.message | 'Some error occured while fetching pending cases'
            })
        })


}
//newe 09-jan-23 un-archived
exports.searchArchivedCaseByCaseId = async (req, res) => {
    let page = req.query.pageCount;
    let offset = page * 500;
    let count = 0;
    Case
        .count({ caseId: req.params.caseId, archived: true })
        .then(countData => {
            count = countData;
        })
        .catch(err => {
            console.log("Error in case id search no res is ", err);
            res.status(500).json({
                message: 'Error occured while getting count of cases'
            })
        })
    Case
        .find({ caseId: req.params.caseId, archived: true })
        .sort({ caseId: 1 })
        .skip(offset)
        .limit(500)
        .populate({ path: 'subclient', populate: { path: 'client' } })
        .then(data => {
            res.json({ totalCount: count, resp: data })
        })
        .catch(err => {
            console.log("Error in case id search no res", err)
            res.status(500).json({
                message: err.message | 'Some error occured while fetching pending cases'
            })
        })


}
/*exports.addAComment = async (req, res) => {
    try {
        const caseData = await Case.findOne({ _id: req.body.case_id })
        const caseComments = []
        Object.assign(caseComments, caseData.comments)
        const commentToPush = {user: mongoose.Types.ObjectId(req.user.user_id), date: new Date(), comment: req.body.comment }
        caseComments.push(commentToPush)
        const updatedCaseData = await Case.findOneAndUpdate({ _id: req.body.case_id }, { comments: caseComments })
        return res.json(updatedCaseData)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
    }
}

exports.getAllCommentsForACase = async (req, res) => {
    try {
        let result = new Array()
        const caseData = await Case.findOne({ _id: req.params.case_id })
        let comments = caseData.comments
        for(let i =0; i<comments.length; i++){
            const comment = comments[i]
            const userData = await userModel.findOne({_id: comment.user})
            result.push({user: userData, date: comment.date, comment: comment.comment})
        }
        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
    }
}*/

exports.addAComment = async (req, res) => {
    try {
        const caseData = await Case.findOne({ _id: req.body.case_id })
        const caseComments = []
        Object.assign(caseComments, caseData.comments)
        const commentToPush = { user: mongoose.Types.ObjectId(req.user.user_id), date: new Date(), comment: req.body.comment, colorType: req.body.colorType }
        caseComments.push(commentToPush)
        const updatedCaseData = await Case.findOneAndUpdate({ _id: req.body.case_id }, { comments: caseComments })
        return res.json(updatedCaseData)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Could not add a comment due to an err: " + err })
    }
}

exports.getAllCommentsForACase = async (req, res) => {
    try {
        let result = new Array()
        const caseData = await Case.findOne({ _id: req.params.case_id })
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
//21Aug2023 
exports.downloadfileLOA = (req, res) => {
    let file = '/cvws_new_uploads/case_uploads/' + req.params.caseId + '/loa/' + req.query.fileName + '.pdf';
    res.download(file);
};

///////////27Mar2024///
exports.deleteAllCases = async (req, res) => {

    try {
        const caseIds = req.params.case_id.split(",")
        for (let i = 0; i < caseIds.length; i++) {
            const caseId = caseIds[i]
            const caseData = await Case.findOne({ caseId: caseId })

            console.log("Deleting a case:", caseData.caseId)
            let actualComponents = caseData.actualComponents

            if (!actualComponents.length) {
                await Case.findOneAndUpdate({ _id: caseData._id }, { status: "DELETED-CASE" })
                console.log("Updated case status successfully...")

                if (fs.existsSync(`/cvws_new_uploads/case_uploads/${caseData.caseId}`)) {
                    fs.rmSync(`/cvws_new_uploads/case_uploads/${caseData.caseId}`, { recursive: true })
                    console.log("Case filed deleted for case ID:", caseData.caseId)
                }
                return res.json({ message: "Deleted the case successfully." })

            }

            while (actualComponents.length) {

                const currentComponent = actualComponents[0]
                const model = require(`../../models/data_entry/${currentComponent}.model`)

                const modelData = await model.find({ case: caseData._id })

                console.log("Updating status of Component: ", currentComponent)

                for (let i = 0; i < modelData.length; i++) {
                    const item = modelData[i]
                    await model.findOneAndUpdate({ _id: item._id }, { status: "DELETED-CHECK" })
                }

                actualComponents = actualComponents.filter(comp => comp != currentComponent)
            }

            console.log("Updated status of all components successfully...")

            await Case.findOneAndUpdate({ _id: caseData._id }, { status: "DELETED-CASE" })
            console.log("Updated case status successfully...")

            if (fs.existsSync(`/cvws_new_uploads/case_uploads/${caseData.caseId}`)) {
                fs.rmSync(`/cvws_new_uploads/case_uploads/${caseData.caseId}`, { recursive: true })
                console.log("Case filed deleted for case ID:", caseData.caseId)
            }

        }

        return res.json({ message: "Deleted the case successfully." })

    } catch (error) {
        console.log("Error getting the list ", error);
        res.status(500).json({ message: error });
    }
}
//////////////////////
/*exports.deleteCase = async (req, res) => {

    try {

        const { case_id } = req.params

        const caseData = await Case.findOne({ _id: case_id })

        let actualComponents = caseData.actualComponents

        while (actualComponents.length) {

            const currComponent = actualComponents[0]

            const model = require(`../../models/data_entry/${currComponent}.model`)

            const modelData = await model.find({ case: case_id })



            for (let i = 0; i < modelData.length; i++) {

                const item = modelData[i]

                await model.findOneAndUpdate({ _id: case_id }, { status: "DELETED-CHECK" })

            }

            actualComponents = actualComponents.filter(comp => comp != actualComponents)

        }



        await Case.findOneAndUpdate({ _id: case_id }, { status: "DELETED-CASE" })

        return res.json({ message: "Deleted Case Successfully" })

    } catch (err) {

        console.log(err)

        return res.status(500).json({ error: "could not delete case" })

    }

}*/
///find with user
exports.findCasesWithUser = (req, res) => {
    Case.find({ status: req.params.status, modifiedBy: req.user.user_id })
        .populate({ path: 'client' })
        .populate({ path: 'subclient' })
        .populate({ path: 'profile' })
        .populate({ path: 'package' })
        .populate({ path: 'modifiedBy' })
        .populate({ path: 'outputqcAllocatedTo' })
        .then(async data => {
            if (req.params.status == "INITIATED") {
                let resultData = []
                for (let i = 0; i < data.length; i++) {
                    const item = data[i]
                    let numComponents = 0
                    if (item.profile) {
                        const clientContractProfiles = await ClientContractProfiles.find({ _id: item.profile })
                        numComponents = clientContractProfiles && clientContractProfiles.clientContractProfileComponents ? clientContractProfiles.clientContractProfileComponents.length : 0
                    } else if (item.package) {
                        const clientContractPackages = await ClientContractPackages.find({ _id: item.package })
                        numComponents = clientContractPackages && clientContractPackages.clientContractPackageComponents ? clientContractPackages.clientContractPackageComponents.length : 0

                    } else if (item.componentsToCheck) {
                        numComponents = item.componentsToCheck.length
                    }
                    resultData[i] = { ...data[i]._doc }
                    resultData[i].totalChecks = numComponents
                    resultData[i].pendingChecks = numComponents - item.actualComponents.length
                }

                return res.json(resultData);
            }
            if (req.params.status == "INPUTQC-REJECTED") {
                let resultData = []
                for (let i = 0; i < data.length; i++) {
                    const item = data[i]
                    let numComponents = 0
                    let rejectedComponents = 0
                    if (item.profile) {
                        const clientContractProfiles = await ClientContractProfiles.find({ _id: item.profile })
                        numComponents = clientContractProfiles && clientContractProfiles.clientContractProfileComponents ? clientContractProfiles.clientContractProfileComponents.length : 0
                    } else if (item.package) {
                        const clientContractPackages = await ClientContractPackages.find({ _id: item.package })
                        numComponents = clientContractPackages && clientContractPackages.clientContractPackageComponents ? clientContractPackages.clientContractPackageComponents.length : 0

                    } else if (item.componentsToCheck) {
                        numComponents = item.componentsToCheck.length
                    }

                    let actualComponents = item.actualComponents
                    while (actualComponents.length) {
                        const currComponent = actualComponents[0]
                        const model = require(`../../models/data_entry/${currComponent}.model`)
                        const modelData = await model.find({ case: item._id })
                        for (let j = 0; j < modelData.length; j++) {
                            const currItem = modelData[j]
                            if (currItem.status == 'INPUTQC-REJECTED') {
                                rejectedComponents++
                            }

                        }
                        actualComponents = actualComponents.filter(comp => comp != currComponent)
                    }

                    resultData[i] = { ...data[i]._doc }
                    resultData[i].totalChecks = numComponents
                    resultData[i].rejectChecks = rejectedComponents

                }

                return res.json(resultData);
            }

            res.json(data)

        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'An error occurred while fetching cases with a status'
            })
        })
}

exports.allocateDEOnCaseCreation = async (req, res) => {
    try {
        const case_id = req.params.case_id
        const caseData = await Case.findOneAndUpdate({ _id: case_id }, { dataEntryAllocatedTo: req.user.user_id, status: 'DE-ALLOCATED' })
        return res.json(caseData)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message)
    }
}
exports.updateTatEndDate = async (req, res) => {
    try {
        const tatEndDate = new Date(req.body.newRevisedDate)

        await Case.findOneAndUpdate({ _id: req.body.case_id }, { tatEndDate: tatEndDate })

        return res.json({ message: "Updated tat end date successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message)
    }
}

//////////New Search By Emp Id////////////
exports.searchByEmpId = (req, res) => {
    let page = req.query.pageCount;
    let offset = page * 500;
    let getSubclientArray = function () {
        let subclientarray = new Array();
        return new Promise(function (resolve, reject) {
            UserSubclientAccess
                .find({ user: req.user.user_id }, { subclient: 1, _id: 0 })
                .then(data => {
                    data.forEach(item => {
                        subclientarray.push(item.subclient)
                    })
                    resolve(subclientarray)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    getCasesByEmpId()
    async function getCasesByEmpId() {
        let subclientArray = await getSubclientArray();
        let count = 0;
        Case
            .count({ employeeId: req.params.employeeId, subclient: { $in: subclientArray } })
            .then(countData => {
                count = countData;
            })
            .catch(err => {
                console.log("Error is ", err);
                res.status(500).json({
                    message: 'Error occured while getting count of cases'
                })
            })
        Case
            .find({ employeeId: req.params.employeeId, subclient: { $in: subclientArray } })
            .sort({ employeeId: 1 })
            .skip(offset)
            .limit(500)
            .populate({ path: 'subclient', populate: { path: 'client' } })
            .then(data => {
                res.json({ totalCount: count, resp: data })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message | 'Some error occured while fetching pending cases'
                })
            })
    }

}
//////////////////////////////////////////
exports.deleteProofOfWork = (req, res) => {

    fs.unlink('/cvws_new_uploads/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/proofofwork/' + req.query.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error deleting the file" });
        }
        res.json({ message: "File Deleted" });
    });
};


// Update LHS BY Candidate
exports.generatePasswordAndSendEmailToCandidate = async (req, res) => {
    try {
        const case_id = req.params.case_id
        const caseData = await Case.findOne({ _id: case_id })
           // console.log("send link",caseData)
        await UpdateLhsAuthModel.findOneAndDelete({ caseId: caseData.caseId })
        console.log("send link",UpdateLhsAuthModel)
        const personalDetails = await PersonalDetails.findOne({ case: case_id })
        const username = caseData.caseId
        const password = crypto.randomUUID().toString().slice(0, 10)

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const updateUserAuthData = new UpdateLhsAuthModel({
            caseId: username,
            password: hashedPassword
        })

        await updateUserAuthData.save()
        const link = "https://explorer.adamma.in/api/showLoginPageForCandidateLhsFieldUpdate"

        const html = `
        <p>Dear Candidate,</p><br>
        <p>We are background verification partners of client. This link is generated for you to update your information.  Please use the following credentials to access the information:</p><br>
                <p>Link: ${link}</p>

        <p>Username: ${username}</p>
        <p>Password: ${password}</p>
        <br><br>
        <p>Please don't reply to this email as it is a system generated email.</p>
        <p>Thank you,</p>
        <p>Team Verifacts</p>
        `

        mailSend.sendMail(personalDetails.emailid, "Request To Update Information", html)
        console.log("User PAss:",username,password)
        return res.json({ message: "Sent email successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}

exports.showLoginPageForCandidateLhsFieldUpdate = async (req, res) => {
    try {
        const loginHtml = `
                        <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Login Form</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }

                        .login-container {
                            background-color: #fff;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            border-radius: 8px;
                            overflow: hidden;
                            width: 300px;
                            max-width: 100%;
                            padding: 20px;
                            box-sizing: border-box;
                        }

                        .login-container h2 {
                            text-align: center;
                            color: #333;
                        }

                        .login-form {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                        }

                        .login-form input {
                            padding: 10px;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                            font-size: 16px;
                        }

                        .login-form button {
                            background-color: #4caf50;
                            color: #fff;
                            padding: 12px;
                            border: none;
                            border-radius: 4px;
                            font-size: 16px;
                            cursor: pointer;
                        }

                        .login-form button:hover {
                            background-color: #45a049;
                        }
                    </style>
                </head>
                <body>

                <div class="login-container">
                    <h2>Login</h2>
                    <form class="login-form" method="POST" action="https://explorer.adamma.in/api/showLhsPageToCandidate">
                        <input type="text" placeholder="Username" name="username" required>
                        <input type="password" placeholder="Password" name="password" required>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                </body>
                </html>

        `
        return res.send(loginHtml)

    } catch (err) {
        console.log(err)

    }
}

////////////////new//////////
exports.showLhsPageToCandidate = async (req, res) => {
  try {
    const { username: caseId, password } = req.body;
    const linkToPost = `https://explorer.adamma.in/api/updateCandidateLhs`;

    const UpdateLhsAuthData = await UpdateLhsAuthModel.findOne({ caseId });
    if (!UpdateLhsAuthData) {
      return res.status(404).json({ message: "Invalid Case ID" });
    }

    const isPasswordMatch = bcrypt.compareSync(password, UpdateLhsAuthData.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Username or password is invalid" });
    }

    const caseData = await Case.findOne({ caseId }).lean();
    if (!caseData) {
      return res.status(404).json({ message: "Case not found" });
    }

    // Step 1: Build actualComponents
    let rawComponents = [];

    if (Array.isArray(caseData.componentsToCheck) && caseData.componentsToCheck.length) {
      rawComponents = caseData.componentsToCheck;
    } else if (Array.isArray(caseData.actualComponents) && caseData.actualComponents.length) {
      rawComponents = caseData.actualComponents
        .map(ac => caseData.componentsToCheck.find(ctc => ctc.componentName === ac))
        .filter(Boolean);
    }

    let actualComponents = [];
    for (const comp of rawComponents) {
      const repeatCount = parseInt(comp.maxChecks) || 1;
      for (let i = 0; i < repeatCount; i++) {
        actualComponents.push({
          ...comp,
          repeatIndex: i + 1,
          uniqueName: `${comp.componentName}-${i + 1}`
        });
      }
    }

    // Step 2: Build HTML
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Field Update Form</title>
        <script nonce="8IBTHwOdqNKAWeKl7plt8g==" src="https://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js"></script>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            margin: 0;
          }
                    .form-container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 800px;
          }
          h2, h3 {
            margin-bottom: 20px;
            font-size: 18px;
            color: #333;
          }
          .form-group {
            margin-bottom: 15px;
          }
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
          }
          input, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 12px;
          }
          input:focus, textarea:focus {
            border-color: #ffa600;
            outline: none;
          }
          .submit {
            width: 100%;
            padding: 10px;
            background-color: #ffa600;
            border: none;
            border-radius: 4px;
            color: white;
            font-size: 18px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
      <div class="form-container">
        <h1 style="text-align: center; margin-bottom: 50px;">Please Update Your Fields Here</h1>
        <form action="${linkToPost}" method="POST" enctype="multipart/form-data">
    `;
      for (const currComponent of actualComponents) {
      const { componentName, repeatIndex } = currComponent;

      const model = require(`../../models/data_entry/${componentName}.model`);
      let modelData = await model.find({ case: caseData._id });

      const componentData = await Component.findOne({ name: componentName });
      if (!componentData) continue;

      const fields = await ComponentFields.find({ component: componentData._id, lhsRhs: "BOTH" });

      // If no record exists, create one
      if (!modelData.length) {
        const dataToSave = {
          case: caseData._id,
          client: caseData.client,
          component: componentData._id,
          status: "CDE-ALLOCATED"
        };
        const newEntry = new model(dataToSave);
        await newEntry.save();
        modelData = [newEntry];
      }

      // Display each item instance
      for (let i = 0; i < modelData.length; i++) {
        const item = modelData[i];

        html += `<h3>${componentData.displayName} - ${repeatIndex}</h3>`;

        for (const field of fields) {
          const value = item[field.name] || '';
          const inputName = `${componentData.name}|${item._id}|${field.name}`;
          const readonly = ["MENTOR-REVIEW-ACCEPTED", "OUTPUTQC-ACCEPTED"].includes(item.status) ? 'readonly' : 'required';

          html += `
            <div class="form-group">
              <label for="${inputName}">${field.label}:</label>
              <input type="text" id="${inputName}" name="${inputName}" value="${value}" ${readonly}>
            </div>
          `;
        }

        html += `
          <div class="form-group">
            <label for="${componentData.name}_files">Upload Files for ${componentData.displayName} - ${repeatIndex}</label>
            <input type="file" id="${componentData.name}_files" name="${componentData.name}_${item._id}" multiple>
          </div>
          <hr>
        `;
      }
    }
 // Signature and Submit
  /*  html += `
      <input type="submit" class="submit" value="Submit">
      <div class="form-group">
        <label for="signature">Signature</label>
        <div>
          <canvas id="signatureCanvas" style="border: 1px solid black;"></canvas>
          <input type="hidden" id="signatureData" name="signatureData" required>
          <button type="button" id="clearSignature">Clear Signature</button>
        </div>
      </div>
      </form>
      <script nonce="8IBTHwOdqNKAWeKl7plt8g==">
        const canvas = document.getElementById("signatureCanvas");
        const signatureDataInput = document.getElementById("signatureData");
        const clearButton = document.getElementById("clearSignature");
        const signaturePad = new SignaturePad(canvas);

        canvas.addEventListener("touchstart", (e) => e.preventDefault());
        clearButton.addEventListener("click", () => {
          signaturePad.clear();
          signatureDataInput.value = "";
        });
        signaturePad.onEnd = () => {
          signatureDataInput.value = signaturePad.toDataURL();
        };
      </script>
      </div>
      </body>
      </html>
    `;*/
	  html += `
  <div class="form-group">
    <label>
      <input type="checkbox" id="confirmCheck" style="width:auto; margin-right: 8px;">
     By checking this check box I hereby authorize my current employer and/or its authorized agency Adamma Info Services Pvt. Ltd. to make an independent investigation of my Background, References, Past employment, Education, Criminal or Police records, and other checks deemed necessary under records including those maintained by both public and private organizations and all public records for the purpose of confirming the information contained on my Application and/or obtaining other information which may be material to my qualifications for service now or if applicable during the tenure of my employment or service with my current employer.

     I release my current employer and its authorized agency Adamma Info Services Pvt. Ltd. and any person or entity, which provides information pursuant to this authorization from any and all liabilities, claims or law suits in regards to the information obtained from any and all of the above referenced sources used.

     I hereby declare that all the information provided in my Resume, Documents submitted, and the Candidate Declaration Form are true and complete and I am liable for all inaccuracies and omissions.
     I promise to extend total co-operation and provide relevant documents required to conduct my Employment Background Verification.

    </label>
  </div>

  <div class="form-group">
    <label for="signature">Signature</label>
    <div>
      <canvas id="signatureCanvas" style="border: 1px solid black;"></canvas>
      <input type="hidden" id="signatureData" name="signatureData" required>
      <button type="button" id="clearSignature">Clear Signature</button>
    </div>
  </div>

  <input type="submit" class="submit" value="Submit">
  </form>

  <script nonce="8IBTHwOdqNKAWeKl7plt8g==">
    const canvas = document.getElementById("signatureCanvas");
    const signatureDataInput = document.getElementById("signatureData");
    const clearButton = document.getElementById("clearSignature");
    const signaturePad = new SignaturePad(canvas);
    const confirmCheck = document.getElementById("confirmCheck");
    const form = document.querySelector("form");

    canvas.addEventListener("touchstart", (e) => e.preventDefault());
    clearButton.addEventListener("click", () => {
      signaturePad.clear();
      signatureDataInput.value = "";
    });
    signaturePad.onEnd = () => {
      signatureDataInput.value = signaturePad.toDataURL();
    };

    //  Prevent submission unless checkbox is checked
    form.addEventListener("submit", function(event) {
      if (!confirmCheck.checked) {
        event.preventDefault();
        alert("Please check the confirmation box before submitting.");
      }
    });
  </script>
`;

    return res.send(html);
  } catch (err) {
    console.error("Error in showLhsPageToCandidate:", err);
    return res.status(500).json({ error: err.message });
  }
};



//////////////////////////////////above is new 04Aug2025////////////
/*exports.showLhsPageToCandidate = async (req, res) => {
    try {
        const caseId = req.body.username
        const password = req.body.password
	const linkToPost = `https://uat-explorer.adamma.in/api/updateCandidateLhs`
        const UpdateLhsAuthData = await UpdateLhsAuthModel.findOne({ caseId: caseId })

        const isPasswordMatch = bcrypt.compareSync(password, UpdateLhsAuthData.password)

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "username or password is invalid" })
        }

        const caseData = await Case.findOne({ caseId: caseId })

        let html = `
        
                <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Field Update Form</title>
            <script nonce="8IBTHwOdqNKAWeKl7plt8g==" src="https://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js"></script>

    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
        }

        .form-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 800px;
            box-sizing: border-box;
        }

        h2 {
            margin-bottom: 20px;
            font-size: 20px;
            color: #333;
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }

        input,
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            font-size: 12px;
            color: #333;
        }

        input:focus,
        textarea:focus {
            border-color: #ffa600;
            outline: none;
        }

        .submit{
            width: 100%;
            padding: 10px;
            background-color: #ffa600;
            border: none;
            border-radius: 4px;
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .submit:hover {
            background-color: #ffa600;
        }
    </style>
</head>

<body>
    <div class="form-container">
        <h1 style="text-align: center; margin-bottom: 50px;">Please Update Your Fields Here</h1>
	
                            <form action="${linkToPost}" method="POST" enctype="multipart/form-data">
        `
	    console.log("test",caseData)
	    let actualComponents = Array.isArray(caseData.componentsToCheck) && caseData.componentsToCheck.length
  ? caseData.componentsToCheck
  : [];

       // let actualComponents = caseData.actualComponents && caseData.actualComponents.length ? caseData.actualComponents : caseData.componentsToCheck.map(item => item.componentName)
//	let actualComponents = caseData && caseData.actualComponents && caseData.actualComponents.length ? caseData.actualComponents  : (caseData.componentsToCheck ? caseData.componentsToCheck.map(item => item.componentName) : []);
console.log("actualComponents:", actualComponents);

	console.log("actualComponents:", actualComponents)
        while (actualComponents.length) {
           // const currComponent = actualComponents[0]
	        const currComponent = actualComponents.shift(); // or actualComponents[0] if not removing
                const componentName = currComponent.componentName;

            //const model = require(`../../models/data_entry/${currComponent}.model`)
            const model = require(`../../models/data_entry/${componentName}.model`)  		
            let modelData = await model.find({ case: caseData._id })
            const componentData = await Component.findOne({ name: currComponent })
            const fields = await ComponentFields.find({ component: componentData._id, lhsRhs: "BOTH" })
            console.log("modelData:", modelData) 
		if(!modelData.length){

			const dataToSave = {case: caseData._id, client: caseData.client, component: componentData._id, status:"CDE-ALLOCATED"}
					
			const data =  new model(dataToSave)
			await data.save()
			modelData = [data]
			console.log("modelData:", JSON.stringify(modelData))
		}
		
            for (let i = 0; i < modelData.length; i++) {
                const item = modelData[i]
                html += `<h3>Update Information for - ${componentData.displayName} - ${i+1}</h3>`
                for (let j = 0; j < fields.length; j++) {
                    const currField = fields[j].name
			const displayCurrField = fields[j].label
                   
                        if (item.status == "MENTOR-REVIEW-ACCEPTED" || item.status == "OUTPUTQC-ACCEPTED") {
                            html += `
                            <div class="form-group">
                            <label for="${currField}">${displayCurrField}:</label>
                            <input type="text" id="${currField}" name="${componentData.name}|${item._id}|${currField}" value="${item[currField]}" readonly><br/>
                            </div>
                            `
                        } else {
                            html += `
                            <div class="form-group">
                            <label for="${currField}">${displayCurrField}:</label>
                            <input type="text" id="${currField}" name="${componentData.name}|${item._id}|${currField}" value="${item[currField] || ''}" required><br/>
                            </div>
                            `
                        }

                    
                }

		   html += `
                            <div class="form-group">
			    <label for="${componentData.name}_files">Upload Files for ${componentData.displayName}</label>
			    <input type="file" id="${componentData.name}_files" name="${componentData.name}_${item._id}" multiple>
			    </div>
			    ` 
		    		
		   html += "<hr>"
            }

            actualComponents = actualComponents.filter(comp => comp !== currComponent)
        }


        html += `
        <input type="submit" class="submit" value="Submit">
	  <div class="form-group">
          <label for="signature">Signature</label>
          <div>
            <canvas id="signatureCanvas" style="border: 1px solid black;"></canvas>
            <input type="hidden" id="signatureData" name="signatureData" required>
            <button type="button" id="clearSignature">Clear Signature</button>
          </div>
        </div>
        </form>
	            <script nonce="8IBTHwOdqNKAWeKl7plt8g==">
		     const canvas = document.getElementById("signatureCanvas");
      const signatureDataInput = document.getElementById("signatureData");
      const clearButton = document.getElementById("clearSignature");
      const signaturePad = new SignaturePad(canvas);

      canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
      });
      clearButton.addEventListener("click", () => {
        signaturePad.clear();
        signatureDataInput.value = "";
      });

      signaturePad.onEnd = () => {
        signatureDataInput.value = signaturePad.toDataURL();
      };


		    </script>
        </body>
</html>
        `
        return res.send(html)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}*/




exports.updateCandidateLhs = async (req, res) => {
    try {
	    let case_id = ""
        const keys = Object.keys(req.body)
	  console.log("Files:", req.files) 
        for (let i = 0; i < keys.length; i++) {
            const currKey = keys[i]
            const component = currKey.split("|")[0]
            const check = currKey.split("|")[1]
            const field = currKey.split("|")[2]
            const query = {status:"DE-COMPLETED"}
            query[field] = req.body[currKey]
		if(component.includes("signature")){
			continue
		}
            const model = require(`../../models/data_entry/${component}.model`)
            const modelData = await model.findOneAndUpdate({ _id: check }, query)
        }
	    const fileKeys = Object.keys(req.files)
	    console.log(fileKeys)

	   
	for(let i=0; i<fileKeys.length; i++){
		const currKey = fileKeys[i]
		const compToPlace = currKey.split("_")
		const component = compToPlace[0]
		const check = compToPlace[1]
		 const model = require(`../../models/data_entry/${component}.model`)
		const modelData = await model.findOne({_id: check})
		const caseData = await Case.findOne({_id: modelData.case })
		case_id = caseData._id
		const destinationPath = `/REPO_STORAGE/case_uploads/${caseData.caseId}/${component}/${check}/candidatedocs`
		console.log(caseData.caseId)
		if(!fs.existsSync(destinationPath)){
			fs.mkdirSync(destinationPath,{recursive: true})
		}
		if(req.files[currKey].length){
		for(let j=0; j<req.files[currKey].length; j++){
			const currFile = req.files[currKey][j]
			console.log("CurrKey, Currfile:", currKey, currFile)
		await new Promise((resolve,reject)=>{
 			currFile.mv(destinationPath+"/"+ currFile.name , function(err) {
				console.log("file name:",currFile.name )
     			if(err){
       				console.log(err);
				reject(err)
     				}else{
					resolve()
				}})
		})
		}
		}else{

			 await new Promise((resolve,reject)=>{
                        req.files[currKey].mv(destinationPath+"/"+ req.files[currKey].name , function(err) {
                                console.log("file name:",req.files[currKey].name )
                        if(err){
                                console.log(err);
                                reject(err)
                                }else{
                                        resolve()
                                }})
                })

		}
}

  let caseData = await Case.findOneAndUpdate({ _id: case_id }, { status: "DE-COMPLETED" });
      let subclientData = await Subclient.findOne({_id: caseData?.subclient}).populate({ path: 'cam', model: 'User', select: 'userId' })
      console.log('data ==== ', subclientData);
      //let camId = subclientData?.cam?.userId
      let camId = 'BGV.inception@adamma.in'
      if (camId) {
        const emailConfig = {
            to: camId,
            subject: "Inception Completed By Candidate",
            text:
              "Greetings from Adamma!\n\n" +
              "The data entry for the case " + caseData?.caseId + " has been successfully completed." + "\n\n" +
              "Please do not reply to this email as this is a system generated email.\n\n" +
              "Thank you,\n" +
              "Team Explorer",
          };

          try {
            await sendEmail(emailConfig, caseData);
            return res.send(`<h2>Updated All Fields Successfully</h2>`);
          } catch (e) {
	    console.log("Error:",e)
            res.status(500).json({ error: "Error sending Email." });
          }
      } else {
          return res.send(`<h2>Updated All Fields Successfully</h2>`);
      }
	//await Case.findOneAndUpdate({_id: case_id}, {status: "DE-COMPLETED"})
        //return res.send(`<h2>Updated All Fields Successfully</h2>`)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}
////
exports.readcdf = (req, res) => {
    let files = new Array()
    let filePath = '/REPO_STORAGE/case_uploads/' + req.params.caseId
    if (fs.existsSync(filePath)) {
        fs.readdirSync(filePath).forEach(file => {
            let indexOfDot = file.lastIndexOf(".")
            files.push(file.substring(0, indexOfDot))
        })
    }
    res.json(files.filter(item => item))
};

///Added by venky
exports.deletecdf = async (req, res) => {
    console.log("@@@@@@@@@@@@@@@",req.params.caseId) 

 try {
const filePath  = '/REPO_STORAGE/case_uploads/'+req.params.caseId  	  
     console.log("@@@@@@@@@@@@@@@",filePath)
   if (fs.existsSync(filePath)) {
     fs.rmSync(filePath + "/" +fs.readdirSync(filePath).find(item => item.includes(req.query.fileName)))
     return res.json({ message: "File Deleted Successfully" });
   } else {
     return res.status(404).json({ error: "File not found" });
   }
 } catch (err) {
   console.log(err);
   return res.status(500).json({ error: err.message });
 }
};

exports.createFromApi = async (req, res) => {

    try {
        if (!req.body.client) {
            res.status(400).json({ message: "Client Cannot be empty" });

        }
        if (!req.body.subclient) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }
        if (!req.body.candidateName) {
            res.status(400).json({ message: "Subclient Cannot be empty" });
        }


        const client = await Client.findOne({ name: req.body.client })
        let findString = `A${client.clientCode}*`;
        console.log('find string is ', findString);
        let caseId;
        // Quesrying the latest case id for that clinet
        const caseData = await Case.find({ caseId: { "$regex": findString, "$options": "i" } }).sort({ initiationDate: -1 }).limit(5)

        if (caseData.length) {
            const sortedData = caseData.sort((a, b) => {
                Number(a.caseId.slice(client.clientCode.length + 1)) > Number(b.caseId.slice(client.clientCode.length + 1))
            })

            const latestCaseId = sortedData[0].caseId
            caseId = appendLatestCaseId(latestCaseId);

            function appendLatestCaseId(caseId) {
                console.log("latest case id:", caseId)
                const caseNumber = Number(caseId.slice(client.clientCode.length + 1));
                let newNumber = caseNumber + 1
                console.log("Case number and new number are: ", caseNumber, newNumber)
                caseId = caseId.slice(0, client.clientCode.length + 1) + newNumber
                console.log("Case id is:", caseId)
                return caseId
            }
            caseId = appendLatestCaseId(latestCaseId);

        } else {
            caseId = `A${client.clientCode}1`
        }

        console.log('caseid after appending new number:', caseId)

        console.log('got the last case id and now creating the batch');
        createCase(caseId);

        function createCase(caseId) {
            console.log('about to create the case body is ', req.body);
            let intTat = req.body.tat - 1;
            console.log("moment is ", moment().add(intTat, 'days'));
            //        console.log("intTat is ",intTat);
            caseToCreate = new Case({
                caseId: caseId,
                client: req.body.client,
                subclient: req.body.subclient,
                candidateName: req.body.candidateName,
                employeeId: req.body.employeeId,
                initiationDate: new Date(),
                tatEndDate: moment().add(intTat, 'days').toDate(),
                package: req.body.package,
                profile: req.body.profile,
                status: "INITIATED",
                componentsToCheck: (req.body.componentsToCheck ? JSON.parse(req.body.componentsToCheck) : null),
                dataEntryCompletionDate: null,
                inputqcCompletionDate: null,
                outputqcCompletionDate: null,
                reportDate: null,
                caseStopDate: null,
                reinitiationDate: null,
                firstInsufficiencyRaisedDate: null,
                lastInsufficiencyClearedDate: null,
                grade: null,
                dataEntryAllocatedTo: null,
                modifiedBy: req.user.user_id
            })
            if (req.body.batch) {
                caseToCreate.batch = req.body.batch
            }
            caseToCreate
                .save(caseToCreate)
                .then(data => {
                    console.log("created case");
                    //  const caseZipFiles = Array.isArray(req.files.caseZipFile)
                    //  ? req.files.caseZipFile
                    //: [req.files.caseZipFile]; // Wrap in an array if not already an array
                    console.log("Files uploaded:", req.files)
                    caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id);
                    const fileNames = Object.keys(req.files)
                    console.log("Filenames:", fileNames)
                    for (let i = 0; i < fileNames.length; i++) {
                        const file = req.files[fileNames[i]];
                        console.log("File is:", file)
                        const filePath = `/REPO_STORAGE/case_uploads/${caseId}/${file.name}`;

                        file.mv(filePath, function (err) {
                            if (err) {
                                return res.status(500).send(err);
                            }

                            // Continue processing or respond once all files are moved
                            res.json(data);
                        });
                    }
                })

                /*.then(data => {
                    console.log("created case");
                    let caseZipFile = req.files.caseZipFile;
                    caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id)
                    caseZipFile.mv(`/REPO_STORAGE/case_uploads/${caseId}/` + caseZipFile.name, function (err) {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.json(data);
                    })

                })*/
                .catch(err => {
                    console.log("error creating the case ", err.message);
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the case"
                    })
                })
        }
    } catch (err) {
        console.log(err)
        return res.json({ message: "Could not create a case due to an internal server error." + err })
    }



};
/////////////////////////////////////////AdminDdash Board///////////////////
exports.getInflowsAndOutflowsPerDay = async (req, res) => {
    try {
        let clientIdsArray = req.query?.clientId?.split(',');
        let isClient = false;
        if (!req.query?.clientId && req.user.user_id) {
            const clientRoles = ['Client User', 'Client Account Manager'];
            const regexPatterns = clientRoles.map(role => new RegExp(`^\\s*${role.trim()}\\s*$`, 'i'));
            const roleIds = await Role.distinct('_id', { name: { $in: regexPatterns } });

            const userId = await UserRole.findOne({ user: req.user.user_id, role: { $in: roleIds } }).select('-_id user');

            if (userId) {
                isClient = true;
                const clientIds = await UserSubclientAccess.distinct('client', { user: req.user.user_id });
                if (clientIds?.length) {
                    clientIdsArray = [...clientIds];
                }
            }
        }

        if (isClient && !clientIdsArray?.length) {
            return res.status(200).json([]);
        }

        if (!isClient) {
            const LeaderShipRoleDoc = await Role.findOne({ name: 'Leadership' }).select('-__v').lean();
            if (!LeaderShipRoleDoc) {
                return res.status(200).json([]);
            }

            const userId = await UserRole.findOne({ user: req.user.user_id, role: Types.ObjectId(LeaderShipRoleDoc._id) }).select('-_id user');
            if (!userId) {
                console.log("no user found");
                return res.status(200).json([]);
            }
        }

        const todayDate = new Date().getDate();
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const [inflowData, outflowData] = await Promise.all([
            calculateData(year, month, todayDate, 'initiationDate', clientIdsArray),
            calculateData(year, month, todayDate, 'outputqcCompletionDate', clientIdsArray)
        ]);

        const result = [{ id: "Inflow", "color": "hsl(164, 70%, 50%)", "data": inflowData }, {
            id: "Outflow", "color": "hsl(217, 70%, 50%)", "data": outflowData
        }];

        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "could not fetch inflow and outflow data." });
    }
};

async function calculateData(year, month, todayDate, dateField, clientIdsArray) {
    const data = [];
    const batchedQueries = [];

    // Prepare batched queries
    for (let i = 1; i <= todayDate; i++) {
        const date = new Date(year, month - 1, i);
        const nextDate = new Date(year, month - 1, i + 1);
        const query = { [dateField]: { $gte: date, $lt: nextDate } };
        if (clientIdsArray?.length) {
            query.client = { $in: clientIdsArray };
        }
        batchedQueries.push(query);
    }

    // Execute batched queries in parallel
    const batchedResults = await Promise.all(batchedQueries.map(query =>
        Case.find(query).select({ _id: 0, client: 1 }).lean()
    ));

    // Format results
    for (let i = 0; i < batchedResults.length; i++) {
        data.push({ x: i + 1, y: batchedResults[i] });
    }

    return data;
}
//


//Anil-15022024
exports.pendingFrequencyBucket = async (req, res) => {
    try {
        const batchSize = 100; // Adjust batch size as needed

        let clientIdsArray = req.query?.clientId?.split(',');
        let isClient = false;

        if (!req.query?.clientId && req.user.user_id) {
            const clientRoles = ['Client User', 'Client Account Manager'];
            const roleIds = await Role.distinct('_id', { name: { $in: clientRoles } });
            const userId = await UserRole.findOne({ user: req.user.user_id, role: { $in: roleIds } }).select('-_id user');

            if (userId) {
                isClient = true;
                const clientIds = await UserSubclientAccess.distinct('client', { user: req.user.user_id });
                if (clientIds?.length) {
                    clientIdsArray = [...clientIds];
                }
            }
        }

        if (isClient && !clientIdsArray?.length) {
            return res.status(200).json({});
        }

        if (!isClient) {
            const LeaderShipRoleDoc = await Role.findOne({ name: 'Leadership' }).select('-__v').lean();
            if (!LeaderShipRoleDoc) {
                return res.status(200).json({});
            }

            const userId = await UserRole.findOne({ user: req.user.user_id, role: Types.ObjectId(LeaderShipRoleDoc._id) }).select('-_id user');
            if (!userId) {
                return res.status(200).json({});
            }
        }

        clientIdsArray = clientIdsArray?.length ? clientIdsArray?.map(client => Types.ObjectId(client)) : undefined;
        const caseQuery = { status: { $nin: ["STOP-CASE", "OUTPUTQC-ACCEPTED", "DELETED-CASE", "MENTOR-REVIEW-ACCEPTED"] } };

        if (clientIdsArray?.length) {
            caseQuery.client = { $in: clientIdsArray };
        }

        const aggregationPipeline = [
            { $match: caseQuery },
            {
                $project: {
                    numDays: {
                        $divide: [
                            { $subtract: [new Date(), "$initiationDate"] },
                            1000 * 60 * 60 * 24
                        ]
                    },
                    isBranchType: { $eq: ["$reqQueryType", "branch"] },
                    subclientBranch: "$subclient.branch",
                    client: 1
                }
            },
            {
                $project: {
                    numDays: 1,
                    typeBasedGrouping: {
                        $cond: {
                            if: "$isBranchType",
                            then: {
                                $switch: {
                                    branches: [
                                        { case: { $and: [{ $gte: ["$numDays", 0] }, { $lt: ["$numDays", 10] }] }, then: "0 - 10" },
                                        { case: { $and: [{ $gte: ["$numDays", 10] }, { $lt: ["$numDays", 20] }] }, then: "10 - 20" },
                                        { case: { $and: [{ $gte: ["$numDays", 20] }, { $lt: ["$numDays", 30] }] }, then: "20 - 30" },
                                        { case: { $and: [{ $gte: ["$numDays", 30] }, { $lt: ["$numDays", 40] }] }, then: "30 - 40" },
                                        { case: { $and: [{ $gte: ["$numDays", 40] }, { $lt: ["$numDays", 50] }] }, then: "40 - 50" },
                                        { case: { $gte: ["$numDays", 50] }, then: "> 50" },
                                    ],
                                    default: "Other"
                                }
                            },
                            else: {
                                $switch: {
                                    branches: [
                                        { case: { $and: [{ $gte: ["$numDays", 0] }, { $lt: ["$numDays", 10] }] }, then: "0 - 10" },
                                        { case: { $and: [{ $gte: ["$numDays", 10] }, { $lt: ["$numDays", 20] }] }, then: "10 - 20" },
                                        { case: { $and: [{ $gte: ["$numDays", 20] }, { $lt: ["$numDays", 30] }] }, then: "20 - 30" },
                                        { case: { $and: [{ $gte: ["$numDays", 30] }, { $lt: ["$numDays", 40] }] }, then: "30 - 40" },
                                        { case: { $and: [{ $gte: ["$numDays", 40] }, { $lt: ["$numDays", 50] }] }, then: "40 - 50" },
                                        { case: { $gte: ["$numDays", 50] }, then: "> 50" },
                                    ],
                                    default: "Other"
                                }
                            }
                        }
                    },
                    client: 1
                }
            }
        ];

        const pipelineWithoutGroup = [...aggregationPipeline];
        pipelineWithoutGroup.push({ $group: { _id: "$typeBasedGrouping", count: { $sum: 1 }, branches: { $push: "$subclientBranch" }, clients: { $push: "$client" } } });

        let formattedResult = {
            "Total": 0,
            "0 - 10": [],
            "10 - 20": [],
            "20 - 30": [],
            "30 - 40": [],
            "40 - 50": [],
            "> 50": []
        };

        const processBatch = async (pipeline) => {
            let skip = 0;
            let hasMore = true;

            while (hasMore) {
                const resultData = await Case.aggregate([...pipeline, { $skip: skip }, { $limit: batchSize }]);
                hasMore = resultData.length === batchSize;
                skip += batchSize;

                resultData.forEach(curr => {
                    formattedResult[curr._id] = formattedResult[curr._id] || [];
                    formattedResult[curr._id] = formattedResult[curr._id].concat(req.query.type === "branch" ? curr.branches : curr.clients);
                    formattedResult["Total"] += curr.count;
                });
            }
        };

        await Promise.all([processBatch(pipelineWithoutGroup)]);

        return res.json(formattedResult);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting pending Frequency Bucket: " + err });
    }
};



exports.getCasesBreakdown = async (req, res) => {
    try {
        let clientIdsArray = req.query?.clientId?.split(',');
        let isClient = false;

        if (!req.query?.clientId && req.user.user_id) {
            let clientRoles = ['Client User', 'Client Account Manager'];
            const regexPatterns = clientRoles.map(role => new RegExp(`^\\s*${role.trim()}\\s*$`, 'i'));
            const roleIds = await Role.distinct('_id', { name: { $in: regexPatterns } });

            const userId = await UserRole.findOne({ user: req.user.user_id, role: { $in: roleIds } }).select('-_id user');

            if (userId) {
                isClient = true;
                const clientIds = await UserSubclientAccess.distinct('client', { user: req.user.user_id });
                if (clientIds?.length) {
                    clientIdsArray = [...clientIds];
                }
            }
        }

        if (isClient && !clientIdsArray?.length) {
            return res.status(200).json({});
        }

        if (!isClient) {
            const LeaderShipRoleDoc = await Role.findOne({ name: 'Leadership' }).select('-__v').lean();
            if (LeaderShipRoleDoc) {
                const userId = await UserRole.findOne({ user: req.user.user_id, role: Types.ObjectId(LeaderShipRoleDoc._id) }).select('-_id user');
                if (!userId) {
                    return res.status(200).json({});
                }
            }
            if (!LeaderShipRoleDoc) {
                return res.status(200).json({});
            }
        }

        clientIdsArray = clientIdsArray?.length ? clientIdsArray?.map(client => Types.ObjectId(client)) : undefined;

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const startOfTheMonth = new Date(year, month - 1, 1);

        let caseQuery = {
            //outputqcCompletionDate: { $gte: startOfTheMonth, $exists: true, $ne: null }
            outputqcCompletionDate: { $exists: true, $ne: null }
        };

        if (req.query.clientId || (isClient && clientIdsArray?.length)) {
            caseQuery.client = { $in: clientIdsArray };
        }

        const aggregationPipeline = [
            { $match: caseQuery },
            {
                $project: {
                    _id: 1,
                    grade: 1,
                    subclientBranch: "$subclient.branch",
                    client: 1
                }
            },
            {
                $addFields: {
                    groupField: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$grade", "602f8b3743383ec9a722496e"] }, then: "$subclientBranch" },
                                { case: { $eq: ["$grade", "66276996af405433530f3c84"] }, then: "$subclientBranch" },
                                { case: { $eq: ["$grade", "602f8b3743383ec9a7224970"] }, then: "$subclientBranch" },
                            ],
                            default: "$client"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    greenCasesCount: { $sum: { $cond: [{ $eq: ["$grade", "602f8b3743383ec9a722496e"] }, 1, 0] } },
                    amberCasesCount: { $sum: { $cond: [{ $eq: ["$grade", "602f8b3743383ec9a7224970"] }, 1, 0] } },
                    redCasesCount: { $sum: { $cond: [{ $eq: ["$grade", "66276996af405433530f3c84"] }, 1, 0] } },
                    greenCases: { $push: { $cond: [{ $eq: ["$grade", "602f8b3743383ec9a722496e"] }, "$_id", "$$REMOVE"] } },
                    amberCases: { $push: { $cond: [{ $eq: ["$grade", "602f8b3743383ec9a7224970"] }, "$_id", "$$REMOVE"] } },
                    redCases: { $push: { $cond: [{ $eq: ["$grade", "66276996af405433530f3c84"] }, "$_id", "$$REMOVE"] } },
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ];

        const casesForTheMonth = await Case.aggregate(aggregationPipeline);

        if (casesForTheMonth.length === 0) {
            return res.status(200).json({});
        }

        return res.json(casesForTheMonth[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Could not fetch case breakdown data." });
    }
}



exports.getCaseDataForDashboard = async (req, res) => {
    try {
        const filePath = "/tmp/dashboard-data"

        const result = JSON.parse(fs.readFileSync(`${filePath}/insuff_stat.txt`, "utf-8"))
        // let isClient=false;
        let clientRoles = ['Client User', 'Client Account Manager'];
        const regexPatterns = clientRoles.map(role => new RegExp(`^\\s*${role.trim()}\\s*$`, 'i'))
        const roleIds = await Role.distinct('_id', { name: { $in: regexPatterns } });

        const userId = await UserRole.findOne({ user: req.user.user_id, role: { $in: roleIds } }).select('-_id user');
        if (userId) {
            // isClient=true;
            let clientIds = await UserSubclientAccess.distinct('client', { user: req.user.user_id });
            if (clientIds?.length) {
                clientIds = clientIds.map(id => id.toString());
                let inflowForClients = 0, outflowForClients = 0, wipForClients = 0, insuffForClients = 0, insuffWipForClients = 0;
                if (result?.inflowForFilter?.length) {
                    inflowForClients = result.inflowForFilter.reduce((count, currentValue) => {
                        if (clientIds.includes(currentValue)) {
                            count++
                        }
                        return count;
                    }, 0)
                }
                if (result?.outflowForFilter?.length) {
                    outflowForClients = result.outflowForFilter.reduce((count, currentValue) => {
                        if (clientIds.includes(currentValue)) {
                            count++
                        }
                        return count;
                    }, 0)
                }
                if (result?.wipForFilter?.length) {
                    wipForClients = result.wipForFilter.reduce((count, currentValue) => {
                        if (clientIds.includes(currentValue)) {
                            count++
                        }
                        return count;
                    }, 0)
                }
                if (result?.insuffForFilter?.length) {
                    insuffForClients = result.insuffForFilter.reduce((count, currentValue) => {
                        if (clientIds.includes(currentValue)) {
                            count++
                        }
                        return count;
                    }, 0)
                }
                if (result?.insuffWipForFilter?.length) {
                    insuffWipForClients = result.insuffWipForFilter.reduce((count, currentValue) => {
                        if (clientIds.includes(currentValue)) {
                            count++
                        }
                        return count;
                    }, 0)
                }

                const filteredResults = {
                    inflow: !isNaN(inflowForClients) ? inflowForClients : 0,
                    outflow: !isNaN(outflowForClients) ? outflowForClients : 0,
                    wip: !isNaN(wipForClients) ? wipForClients : 0,
                    insuff: !isNaN(insuffForClients) ? insuffForClients : 0,
                    insuffWip: !isNaN(insuffWipForClients) ? insuffWipForClients : 0,
                    clientCount: clientIds?.length,
                };
                return res.status(200).json(filteredResults);

            }

        }

        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "could not fetch data.", err: error.message })
    }
}

//Copied from ADMIN DASHBOARD SERVER

exports.writeCaseDataForDashboard = async (req, res) => {
    try {
        // Getting case data from the start of the month until today.
        const result = {}
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const startOfTheMonth = `${year}-${month}-01`
        const casesForTheMonth = await Case.find({ initiationDate: { $gte: startOfTheMonth } }).populate('subclient')
        casesForTheMonth.forEach(item => console.log(new Date(item.initiationDate).toDateString(), item.caseId))
        console.log("Total Cases For The month:", casesForTheMonth.length)
        const allCasesPending = await Case.find({ status: { $nin: ["OUTPUTQC-ACCEPTED", "DELETED-CASE", "STOP-CASE"] } })
        //        const outFlowCasesForTheMonth = await Case.find({ outputqcCompletionDate: { $gte: startOfTheMonth } })
        const outFlowCasesForTheMonth = await Case.find({ outputqcCompletionDate: { $gte: startOfTheMonth } }).populate('subclient')

        console.log("outflow cases for the month:", outFlowCasesForTheMonth.length)
        const inflowCount = casesForTheMonth.length
        const outflowCount = outFlowCasesForTheMonth.length
        const caseStatusCounts = await getInsuffStatus(allCasesPending)
        const caseGradeCounts = calculateCasesByGrade(outFlowCasesForTheMonth)
        const clientCount = await Client.count({})

        // Adding all data to the result object
        result.inflow = inflowCount
        result.outflow = outflowCount
        result.wip = caseStatusCounts.wip
        result.insuff = caseStatusCounts.insuff
        result.insuffWip = caseStatusCounts.insuffWip
        result.redCases = caseGradeCounts.redCasesCount
        result.greenCases = caseGradeCounts.greenCasesCount
        result.amberCases = caseGradeCounts.amberCasesCount
        result.clientCount = clientCount
        result.allClients = await Client.find({})
        result.inflowForFilter = casesForTheMonth.map(item => item.client)
        result.outflowForFilter = outFlowCasesForTheMonth.map(item => item.client)
        result.wipForFilter = caseStatusCounts.wipCases.map(item => item.client)
        result.insuffForFilter = caseStatusCounts.insuffCases.map(item => item.client)
        result.insuffWipForFilter = caseStatusCounts.insuffWipCases.map(item => item.client)
        result.redCasesForFilter = caseGradeCounts.redCases
        result.greenCasesForFilter = caseGradeCounts.greenCases
        result.amberCasesForFilter = caseGradeCounts.amberCases

        console.log(result)
        const filePath = "/tmp/dashboard-data"
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        fs.writeFileSync(`${filePath}/insuff_stat.txt`, JSON.stringify(result), { flag: "w" })

        return res.json({ message: "file written successfully." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "could not fetch dashboard data." })
    }
}

function calculateCasesByGrade(outputQcCases, type) {
  let greenCasesCount = 0;
  let amberCasesCount = 0;
  let redCasesCount = 0;
  let greenCases = [];
  let amberCases = [];
  let redCases = [];
  if (type == "branch") {
    for (let i = 0; i < outputQcCases.length; i++) {
      let item = outputQcCases[i];
      // console.log("Getting grade for caseId:", item.caseId)
      if (item.grade == "602f8b3743383ec9a722496e") {
        greenCasesCount++;
        greenCases.push(item.subclient.branch);
      } else if (item.grade == "602f8b3743383ec9a722496f") {
        redCasesCount++;
        redCases.push(item.subclient.branch);
      } else if (item.grade == "602f8b3743383ec9a7224970") {
        amberCasesCount++;
        amberCases.push(item.subclient.branch);
      }
    }
  } else {
    for (let i = 0; i < outputQcCases.length; i++) {
      let item = outputQcCases[i];
      // console.log("Getting grade for caseId:", item.caseId)
      if (item.grade == "602f8b3743383ec9a722496e") {
        greenCasesCount++;
        greenCases.push(item.client);
      } else if (item.grade == "602f8b3743383ec9a722496f") {
        redCasesCount++;
        redCases.push(item.client);
      } else if (item.grade == "602f8b3743383ec9a7224970") {
        amberCasesCount++;
        amberCases.push(item.client);
      }
    }
  }
  return {
    greenCasesCount,
    amberCasesCount,
    redCasesCount,
    greenCases,
    amberCases,
    redCases,
  };
}


exports.writeBranchCaseData = async (req, res) => {
    try {
        // Getting case data from the start of the month until today.
        const result = {}
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const startOfTheMonth = `${year}-${month}-01`
        const casesForTheMonth = await Case.find({ initiationDate: { $gte: startOfTheMonth } }).populate('subclient')
        const allCasesPending = await Case.find({ status: { $nin: ["OUTPUTQC-ACCEPTED", "DELETED-CASE", "STOP-CASE"] } }).populate('subclient')
        const outFlowCasesForTheMonth = await Case.find({ outputqcCompletionDate: { $gte: startOfTheMonth } }).populate('subclient')
        const inflowCount = casesForTheMonth.length
        const outflowCount = outFlowCasesForTheMonth.length
        const caseStatusCounts = await getInsuffStatus(allCasesPending)
        const caseGradeCounts = calculateCasesByGrade(outFlowCasesForTheMonth, "branch")
        const branchCount = await Branch.count({})

        // Adding all data to the result object
        result.inflow = inflowCount
        result.outflow = outflowCount
        result.wip = caseStatusCounts.wip
        result.insuff = caseStatusCounts.insuff
        result.insuffWip = caseStatusCounts.insuffWip
        result.redCases = caseGradeCounts.redCasesCount
        result.greenCases = caseGradeCounts.greenCasesCount
        result.amberCases = caseGradeCounts.amberCasesCount
        result.branchCount = branchCount
        result.allBranches = await Branch.find({}, { _id: 1, name: 1 })
        result.inflowForFilter = casesForTheMonth.map(item => item.subclient.branch ? item.subclient.branch : null)
        result.outflowForFilter = outFlowCasesForTheMonth.map(item => item.subclient.branch ? item.subclient.branch : null)
        result.wipForFilter = caseStatusCounts.wipCases.map(item => item.subclient.branch ? item.subclient.branch : null)
        result.insuffForFilter = caseStatusCounts.insuffCases.map(item => item.subclient.branch ? item.subclient.branch : null)
        result.insuffWipForFilter = caseStatusCounts.insuffWipCases.map(item => item.subclient.branch ? item.subclient.branch : null)
        result.redCasesForFilter = caseGradeCounts.redCases
        result.greenCasesForFilter = caseGradeCounts.greenCases
        result.amberCasesForFilter = caseGradeCounts.amberCases

        console.log(result)
        const filePath = "/tmp/dashboard-data"
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        fs.writeFileSync(`${filePath}/branch_cases.cache`, JSON.stringify(result), { flag: "w" })

        return res.json({ message: "file written successfully." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "could not fetch dashboard data." })
    }
}

exports.getBranchCaseData = async (req, res) => {
    try {
        const filePath = "/tmp/dashboard-data"
        const result = JSON.parse(fs.readFileSync(`${filePath}/branch_cases.cache`, "utf-8"))
        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "could not fetch dashboard data." })
    }
}



exports.writeWipSummary = async (req, res) => {
    try {
        const result = { allCases: [] }
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const startOfTheMonth = `${year}-${month}-01`
        const componentData = await Component.find({})
        for (let i = 0; i < componentData.length; i++) {
            result[componentData[i].name] = { id: i, displayName: componentData[i].displayName, wtCount: { cases: [], caseIds: [] }, atCount: { cases: [], caseIds: [] }, dtCount: { cases: [], caseIds: [] }, btCount: { cases: [], caseIds: [] } }
        }
        const casesForTheMonth = await Case.find({ $and: [{ initiationDate: { $gte: startOfTheMonth } }, { status: { $ne: "OUTPUTQC-ACCEPTED" } }] })

        for (let i = 0; i < casesForTheMonth.length; i++) {
            const currentCase = casesForTheMonth[i]
            console.log("Getting data for:", currentCase.caseId)
            result.allCases.push(currentCase.caseId)
            let actualComponents = currentCase.actualComponents
            const clientContractData = await ClientContract.findOne({ client: currentCase.client })
            while (actualComponents.length) {
                const currComponentName = actualComponents[0]
                let model
                if (!fs.existsSync(path.join(__dirname, `../models/data_entry/${currComponentName}.model.js`))) {
                    actualComponents = actualComponents.filter(comp => comp != currComponentName)
                    continue
                }
                model = require(`../models/data_entry/${currComponentName}.model`)
                const modelData = await model.find({ $and: [{ case: currentCase._id }, { status: { $ne: "STOP-CASE" } }, { status: { $ne: "MENTOR-REVIEW-ACCEPTED" } }, { status: { $ne: "OUTPUTQC-ACCEPTED" } }] }).populate({
                    path: 'case',
                    populate: {
                        path: 'subclient'
                    }
                })
                const comp = await Component.findOne({ name: currComponentName })

                for (let j = 0; j < modelData.length; j++) {
                    const currComponent = modelData[j]
                    const clientContractComponentData = await ClientContractComponent.findOne({ clientContract: clientContractData._id, component: comp._id })
                    if (clientContractComponentData) {
                        const tat = clientContractComponentData.tat

                        const daysSinceInit = Math.ceil((new Date() - currentCase.initiationDate) / (1000 * 60 * 60 * 24))

                        if (tat < daysSinceInit) {
                            result[comp.name].btCount.cases.push([currComponent.client, currComponent.case.subclient.branch])
                            result[comp.name].btCount.caseIds.push(currentCase.caseId)

                        } else if (daysSinceInit == tat) {
                            result[comp.name].dtCount.cases.push([currComponent.client, currComponent.case.subclient.branch])
                            result[comp.name].dtCount.caseIds.push(currentCase.caseId)

                        } else if (daysSinceInit > tat - 3) {
                            result[comp.name].atCount.cases.push([currComponent.client, currComponent.case.subclient.branch])
                            result[comp.name].atCount.caseIds.push(currentCase.caseId)

                        } else {
                            result[comp.name].wtCount.cases.push([currComponent.client, currComponent.case.subclient.branch])
                            result[comp.name].wtCount.caseIds.push(currentCase.caseId)
                        }

                    }
                }
                actualComponents = actualComponents.filter(comp => comp != currComponentName)
            }
        } ""
        console.log(result)
        const formattedResult = Object.values(result)
        const filePath = "/tmp/dashboard-data"
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }
        fs.writeFileSync(`${filePath}/wip_summary.txt`, JSON.stringify(formattedResult), { flag: "w" })

        return res.json({ message: "file written successfully." })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error getting WIP Summary" });
    }
}

exports.getWipSummary = async (req, res) => {
    try {
        const filePath = "/tmp/dashboard-data"
        const result = JSON.parse(fs.readFileSync(`${filePath}/wip_summary.txt`, "utf-8"))
        result.shift()
        result.forEach(item => {
            item.atCases = item.atCount.cases
            item.wtCases = item.wtCount.cases
            item.dtCases = item.dtCount.cases
            item.btCases = item.btCount.cases
            if (item.atCases.length + item.wtCases.length + item.dtCases.length + item.btCases.length) {
                item.btPercent = Number((item.btCases.length * 100) / (item.atCases.length + item.wtCases.length + item.dtCases.length + item.btCases.length)).toFixed(2)
            } else {
                item.btPercent = 0.00
            }
        })

        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "could not read the file" })
    }
}
exports.getClientCaseDataForDashboard = async (req, res) => {
    try {
        // Getting case data from the start of the month until today.
        const result = {}
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const startOfTheMonth = `${year}-${month}-01`
        console.log("client:", req.query.clientId)
        if (!req.query.clientId) {
            console.log("User:", req.user.user_id)
            const subclientAccessData = await UserSubclientAccess.find({ user: req.user.user_id })
            const subclients = subclientAccessData.map(item => item.subclient)
            const casesForTheMonth = await Case.find({ $and: [{ initiationDate: { $gte: startOfTheMonth } }, { subclient: { $in: subclients } }] })
            const caseData = await Case.find({})

            const allCasesPending = await Case.find({ $and: [{ subclient: { $in: subclients } }, { status: { $nin: ["STOP-CASE", "OUTPUTQC-ACCEPTED", "DELETED-CASE", "MENTOR-REVIEW-ACCEPTED"] } }] })

            const inflowCount = casesForTheMonth.length
            const outflowCases = await Case.find({ $and: [{ outputqcCompletionDate: { $gte: startOfTheMonth } }, { subclient: { $in: subclients } }] })
            const outflowCount = outflowCases.length
            const caseStatusCounts = await getInsuffStatus(allCasesPending)
            const caseGradeCounts = calculateCasesByGrade(outflowCases)

            // Adding all data to the result object
            result.inflow = inflowCount
            result.outflow = outflowCount
            result.wip = caseStatusCounts.wip
            result.insuff = caseStatusCounts.insuff
            result.insuffWip = caseStatusCounts.insuffWip
            result.redCases = caseGradeCounts.redCases
            result.greenCases = caseGradeCounts.greenCases
            result.amberCases = caseGradeCounts.amberCases
        } else {
            console.log("User client:", req.user.user_id)

            const casesForTheMonth = await Case.find({ $and: [{ initiationDate: { $gte: startOfTheMonth } }, { client: req.query.client }] })
            const allCasesPending = await Case.find({ $and: [{ client: req.query.client }, { status: { $ne: "STOP-CASE" } }, { status: { $ne: "OUTPUTQC-ACCEPTED" } }, { status: { $ne: "MENTOR-REVIEW-ACCEPTED" } }] })
            const inflowCount = casesForTheMonth.length
            const outflowCases = await Case.find({ $and: [{ outputqcCompletionDate: { $gte: startOfTheMonth } }, { client: req.query.client }] })
            const outflowCount = outflowCases.length
            const caseStatusCounts = await getInsuffStatus(allCasesPending)
            const caseGradeCounts = calculateCasesByGrade(outflowCases)

            // Adding all data to the result object
            result.inflow = inflowCount
            result.outflow = outflowCount
            result.wip = caseStatusCounts.wip
            result.insuff = caseStatusCounts.insuff
            result.insuffWip = caseStatusCounts.insuffWip
            result.redCases = caseGradeCounts.redCases
            result.greenCases = caseGradeCounts.greenCases
            result.amberCases = caseGradeCounts.amberCases
        }

        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "could not fetch data for dashboard" })
    }
}

async function getInsuffStatus(cases) {
  let insuff = 0;
  let insuffWip = 0;
  let wip = 0;
  let insuffCases = [];
  let insuffWipCases = [];
  let wipCases = [];
 
  for (let i = 0; i < cases.length; i++) {
    const item = cases[i];
    console.log("Getting insuff status for:", item.caseId);
    let actualComponents = item.actualComponents;
    let insuffCompCount = 0;
    let compCount = 0;
    let completedCompCount = 0;
    while (actualComponents.length) {
      const currComponent = actualComponents[0];
      if (
        !fs.existsSync(
          path.join(__dirname, `../models/data_entry/${currComponent}.model.js`)
        )
      ) {
        actualComponents = actualComponents.filter(
          (comp) => comp != currComponent
        );
        continue;
      }
      const model = require(`../models/data_entry/${currComponent}.model`);
      const modelData = await model.find({ case: item._id });
      for (let i = 0; i < modelData.length; i++) {
        compCount++;
        const currentItem = modelData[i];
        if (
          currentItem.status == "INSUF-1-REQ-ACCEPTED" ||
          currentItem.status == "INSUF-2-REQ-ACCEPTED" ||
          currentItem.status == "INSUF-3-REQ-ACCEPTED" ||
          currentItem.status == "INSUF-4-REQ-ACCEPTED" ||
          currentItem.status == "INSUF-5-REQ-ACCEPTED" ||
          currentItem.status == "INSUF-1-CLEARANCE-REJECTED" ||
          currentItem.status == "INSUF-2-CLEARANCE-REJECTED" ||
          item.status == "INSUF-3-CLEARANCE-REJECTED" ||
          currentItem.status == "INSUF-4-CLEARANCE-REJECTED" ||
          currentItem.status == "INSUF-5-CLEARANCE-REJECTED"
        ) {
          insuffCompCount++;
        } else if (
          currentItem.status == "MENTOR-REVIEW-ACCEPTED" ||
          currentItem.status == "OUTPUTQC-ACCEPTED"
        ) {
          completedCompCount++;
        }
      }
 
      actualComponents = actualComponents.filter(
        (comp) => comp != currComponent
      );
    }
    if (insuffCompCount == 0) {
      wip++;
      wipCases.push(item);
    } else if (insuffCompCount + completedCompCount == compCount) {
      insuff++;
      insuffCases.push(item);
    } else {
      insuffWip++;
      insuffWipCases.push(item);
    }
  }
  console.log("Completed getting insuff counts");
  return { insuff, insuffWip, wip, insuffCases, insuffWipCases, wipCases };
}


exports.getClientCasesBreakdown = async (req, res) => {
    try {
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const startOfTheMonth = `${year}-${month}-01`
        const subclientAccessData = await UserSubclientAccess.find({ user: req.user.user_id }, { subclient: 1, _id: 0 })
        const subclients = subclientAccessData.map(item => item.subclient.toString())

        const casesForTheMonth = await Case.find({ $and: [{ outputqcCompletionDate: { $gte: startOfTheMonth }, subclient: { $in: subclients } }, { outputqcCompletionDate: { $exists: true } }, { outputqcCompletionDate: { $ne: null } }] })
        const caseGradeData = calculateCasesByGrade(casesForTheMonth)
        return res.json(caseGradeData)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "could not fetch case breakdown data" })
    }
}

exports.getClientInflowsAndOutflowsPerDay = async (req, res) => {
    try {
        const subclientAccessData = await UserSubclientAccess.find({ user: req.user.user_id }, { subclient: 1, _id: 0 })
        const subclients = subclientAccessData.map(item => item.subclient.toString())
        const inflowData = []
        const outflowData = []
        const todayDate = new Date().getDate()
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        for (let i = 1; i <= todayDate; i++) {
            const date = `${year}-${month}-${i}`
            const nextDate = `${year}-${month}-${i + 1}`
            const query = { $and: [{ initiationDate: { $gte: date } }, { initiationDate: { $lt: nextDate } }, { subclient: { $in: subclients } }] };
            inflowData.push({
                "x": i, "y": await Case.countDocuments(query)
            })
        }
        for (let i = 1; i <= todayDate; i++) {
            const date = `${year}-${month}-${i}`
            const nextDate = `${year}-${month}-${i + 1}`
            const query = { $and: [{ outputqcCompletionDate: { $gte: date } }, { outputqcCompletionDate: { $lt: nextDate } }, { outputqcCompletionDate: { $exists: true } }, { outputqcCompletionDate: { $ne: null } }, { subclient: { $in: subclients } }] };
            outflowData.push({ "x": i, "y": await Case.countDocuments(query) })
        }

        const result = [{ id: "Inflow", "color": "hsl(164, 70%, 50%)", "data": inflowData }, {
            id: "Outflow", "color": "hsl(217, 70%, 50%)", "data": outflowData
        }]

        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "could not fetch inflow and outflow data." })

    }
}

exports.clientPendingFrequencyBucket = async (req, res) => {
    try {

        // Pending cases for the subclient
        const subclientAccessData = await UserSubclientAccess.find({ user: req.user.user_id }, { subclient: 1, _id: 0 })
        const subclients = subclientAccessData.map(item => item.subclient.toString())
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const startOfTheMonth = `${year}-${month}-01`
        //const caseData = await Case.find({ $and: [{ status: { $ne: "OUTPUTQC-ACCEPTED" } }, { initiationDate: { $gte: startOfTheMonth } }, { subclient: { $in: subclients } }] })
        const caseData = await Case.find({ $and: [{ status: { $ne: "OUTPUTQC-ACCEPTED" } }, { subclient: { $in: subclients } }] })


        const resultData = {
            "Total": 0,
            "0 - 10": 0,
            "10 - 20": 0,
            "20 - 30": 0,
            "30 - 40": 0,
            "40 - 50": 0,
            "> 50": 0
        }

        const today = new Date()

        for (let i = 0; i < caseData.length; i++) {

            const item = caseData[i]
            const numDays = (today.getTime() - item.initiationDate.getTime()) / (1000 * 60 * 60 * 24)

            if (numDays >= 0 && numDays < 10) {
                resultData["0 - 10"]++
                resultData["Total"]++
            } else if (numDays >= 10 && numDays < 20) {
                resultData["10 - 20"]++
                resultData["Total"]++
            } else if (numDays >= 20 && numDays < 30) {
                resultData["20 - 30"]++
                resultData["Total"]++
            } else if (numDays >= 30 && numDays < 40) {
                resultData["30 - 40"]++
                resultData["Total"]++
            } else if (numDays >= 40 && numDays < 50) {
                resultData["40 - 50"]++
                resultData["Total"]++
            } else if (numDays >= 50) {
                resultData["> 50"]++
                resultData["Total"]++
            }
        }
        return res.json(resultData)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error getting pending Frequency Bucket" });
    }

}

exports.getClientWipSummary = async (req, res) => {
    try {
        const result = { allCases: [] }
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const startOfTheMonth = `${year}-${month}-01`
        const componentData = await Component.find({})
        for (let i = 0; i < componentData.length; i++) {
            result[componentData[i].name] = { id: i, displayName: componentData[i].displayName, wtCount: { count: 0, caseIds: [] }, atCount: { count: 0, caseIds: [] }, dtCount: { count: 0, caseIds: [] }, btCount: { count: 0, caseIds: [] } }
        }
        const subclientAccessData = await UserSubclientAccess.find({ user: req.user.user_id })
        const subclients = subclientAccessData.map(item => item.subclient)
        const casesForTheMonth = await Case.find({ $and: [{ subclient: { $in: subclients } }, { initiationDate: { $gte: startOfTheMonth } }, { status: { $ne: "OUTPUTQC-ACCEPTED" } }] })

        for (let i = 0; i < casesForTheMonth.length; i++) {
            const currentCase = casesForTheMonth[i]
            result.allCases.push(currentCase.caseId)
            let actualComponents = currentCase.actualComponents
            const clientContractData = await ClientContract.findOne({ client: currentCase.client })
            console.log("Fetching data for caseId: " + currentCase.caseId)
            while (actualComponents.length) {
                const currComponentName = actualComponents[0]
                const model = require(`../models/data_entry/${currComponentName}.model`)
                const modelData = await model.find({ $and: [{ case: currentCase._id }, { status: { $ne: "MENTOR-REVIEW-ACCEPTED" } }, { status: { $ne: "OUTPUTQC-ACCEPTED" } }] })
                const comp = await Component.findOne({ name: currComponentName })

                for (let j = 0; j < modelData.length; j++) {
                    const currComponent = modelData[j]
                    const clientContractComponentData = await ClientContractComponent.findOne({ clientContract: clientContractData._id, component: comp._id })
                    if (clientContractComponentData) {
                        const tat = clientContractComponentData.tat

                        const daysSinceInit = Math.ceil((new Date() - currentCase.initiationDate) / (1000 * 60 * 60 * 24))
                        if (tat < daysSinceInit) {
                            result[comp.name].btCount.count++
                            result[comp.name].btCount.caseIds.push(currentCase.caseId)

                        } else if (daysSinceInit == tat) {
                            result[comp.name].dtCount.count++
                            result[comp.name].dtCount.caseIds.push(currentCase.caseId)

                        } else if (daysSinceInit > tat - 3) {
                            result[comp.name].atCount.count++
                            result[comp.name].atCount.caseIds.push(currentCase.caseId)

                        } else {
                            result[comp.name].wtCount.count++
                            result[comp.name].wtCount.caseIds.push(currentCase.caseId)
                        }
                    }
                }
                actualComponents = actualComponents.filter(comp => comp != currComponentName)
            }
        }
        const formattedResult = Object.values(result)

        formattedResult.shift()
        formattedResult.forEach(item => {
            item.atCount = item.atCount.count
            item.wtCount = item.wtCount.count
            item.dtCount = item.dtCount.count
            item.btCount = item.btCount.count
            if (item.atCount + item.wtCount + item.dtCount + item.btCount) {
                item.btPercent = Number((item.btCount * 100) / (item.atCount + item.wtCount + item.dtCount + item.btCount)).toFixed(2)
            } else {
                item.btPercent = 0.00
            }
        })

        return res.json(formattedResult)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error getting WIP Summary" });
    }
}

exports.getWipSummaryTable = async (req, res) => {
    try {
        const component = req.params.component.replace("%20", " ")
        let wipResult
        if (!req.query.user) {
            const filePath = "/tmp/dashboard-data"
            wipResult = JSON.parse(fs.readFileSync(`${filePath}/wip_summary.txt`, "utf-8"))
        } else {
            const response = jwt.verify(req.query.user, process.env.ACCESS_TOKEN_SECRET)
            console.log("jwtResponse:", response.user_id)
            const subclientAccessData = await UserSubclientAccess.find({ user: response.user_id })
            console.log("subclient Accesses:", subclientAccessData)
            const subclients = subclientAccessData.map(item => item.subclient)
            wipResult = await wipSummaryForClient(subclients)
        }
        console.log(wipResult)
        const caseIds = wipResult[0]
        wipResult = wipResult.filter(comp => comp.displayName == component)[0]
        console.log(wipResult)
        let workbook
        let worksheetData = []
        if (req.query.csv) {
            workbook = xlsx.utils.book_new();
        }

        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>WIP ${component}</title>
            <style>
            .styled-table {
                border-collapse: collapse;
                margin: 25px 0;
                font-size: 0.9em;
                font-family: sans-serif;
                min-width: 400px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            .styled-table thead tr {
                background-color: #009879;
                color: #ffffff;
                text-align: left;
            }
            .styled-table th,
            .styled-table td {
                padding: 12px 15px;
            }
            .styled-table tbody tr {
                border-bottom: 1px solid #dddddd;
            }

            .styled-table tbody tr:nth-of-type(even) {
                background-color: #f3f3f3;
            }

            .styled-table tbody tr:last-of-type {
                border-bottom: 2px solid #009879;
            }
            .styled-table tbody tr.active-row {
                font-weight: bold;
                color: #009879;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                text-decoration: none;
                background-color: #009879;
                color: white;
                border-radius: 5px;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
                cursor: pointer;
                margin-left: 300px;
              }
            </style>

        </head>
        <body>`
        if (req.query.user) {
            html += `<a class="button" href=https://vibe.verifacts.co.in/dashboardapi/getWipSummaryTable/${component}?csv=true&user=${req.query.user}" target="_blank" > Export XLSX</a >`
        } else {
            html += `<a class="button" href="https://vibe.verifacts.co.in/dashboardapi/getWipSummaryTable/${component}?csv=true" target="_blank" > Export XLSX</a >`
        }
        html += `<center><h3>WIP Summary for ${component}</h3></center>
        <table class="styled-table" style="margin: 10px auto;">
        <thead>
            <tr>
                <th>Case ID</th>
                <th>WT Count</th>
                <th>AT Count</th>
                <th>DT Count</th>
                <th>BT Count</th>
            </tr>
        </thead>
        <tbody>
        `
        for (let i = 0; i < caseIds.length; i++) {
            const item = caseIds[i]
            let wtCount = 0
            let atCount = 0
            let dtCount = 0
            let btCount = 0


            wipResult.wtCount.caseIds.forEach(id => {
                (id == item) && wtCount++
            })
            wipResult.atCount.caseIds.forEach(id => {
                (id == item) && atCount++
            })
            wipResult.dtCount.caseIds.forEach(id => {
                (id == item) && dtCount++
            })
            wipResult.btCount.caseIds.forEach(id => {
                (id == item) && btCount++
            })

            if (wtCount || atCount || dtCount || btCount) {
                req.query.csv && worksheetData.push({ "Case ID": item, "WT Count": wtCount, "AT Count": atCount, "DT Count": dtCount, "BT Count": btCount })
                html += `
            <tr>
            <td>${item}</td>
            <td>${wtCount}</td>
            <td>${atCount}</td>
            <td>${dtCount}</td>
            <td>${btCount}</td>
        </tr>
            `}

        }
        html += `</tbody></table>

        </html>
        `
        if (req.query.csv) {
            const worksheet = xlsx.utils.json_to_sheet(worksheetData);
            xlsx.utils.book_append_sheet(workbook, worksheet, `${component.split(' ')[0]} WIP SUMMARY`);
            xlsx.writeFile(workbook, `/tmp/${component}_wip_summary.xlsx`);
            re.sdownload(`/tmp/${component}_wip_summary.xlsx`)
            setTimeout(() => { fs.rmSync(`/tmp/${component}_wip_summary.xlsx`); console.log("File deleted."); }, 2000)
            return
        } else {
            return res.send(html)
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "could not load wip summary table" })
    }
}
///////tat Update///////////
/*exports.updateTat = (req, res) => {
  console.log("tat@@@@@@@@@@@@@@@@@@@@",req.params.case_id);
  console.log("tat@@@@@@@@@@@@@@@@@@@@",req.body);
  Case.findOneAndUpdate(
    { _id: req.params.case_id },
    {
      initiationDate: req.body.initiationDate,
      tatEndDate: req.body.tatEndDate
    }
      return res.json({message: "Updated tat end date successfully"})
  )
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "An error occurred while updating TAT",
      });
    });
};*/
exports.updateTat = async (req, res) => {
    try {
        console.log("tat@@@@@@@@@@@@@@@@@@@@", req.params.case_id);
        console.log("tat@@@@@@@@@@@@@@@@@@@@", req.body);
        await Case.findOneAndUpdate(
            { _id: req.params.case_id },
            {
	        candidateName: req.body.candidateName,
                employeeId: req.body.employeeId,    
                initiationDate: req.body.initiationDate,
                tatEndDate: req.body.tatEndDate
            }
        )

        return res.json({ message: "Updated tat end date successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message)
    }
}

// exports.generatePasswordAndSendEmailToCandidate = async (req, res) => {
//     try {
//         const case_id = req.params.case_id
//         const caseData = await Case.findOne({ _id: case_id })
//         await UpdateLhsAuthModel.findOneAndDelete({ caseId: caseData.caseId })

//         const personalDetails = await PersonalDetails.findOne({ case: case_id })
//         const username = caseData.caseId
//         const password = Crypto.randomUUID().toString().slice(0, 10)

//         const salt = bcrypt.genSaltSync(10)
//         const hashedPassword = bcrypt.hashSync(password, salt)

//         const updateUserAuthData = new UpdateLhsAuthModel({
//             caseId: username,
//             password: hashedPassword
//         })

//         await updateUserAuthData.save()
//         const link = "https://uat-explorer.adamma.in/api/showLoginPageForCandidateLhsFieldUpdate"

//         const html = `
//         <p>Dear Candidate,</p><br>
//         <p>We are background verification partners of client. This link is generated for you to update your information.  Please use the following credentials to access the information:</p><br>
//         <a href="${link}">Link: ${link}</a>
//         <p>Username: ${username}</p>
//         <p>Password: ${password}</p>
//         <br><br>
//         <p>Please don't reply to this email as it is a system generated email.</p>
//         <p>Thank you,</p>
//         <p>Team Verifacts</p>
//         `

//         mailSend.sendMail("arun.kumar@verifacts.co.in", "Request To Update Information", html)

//         return res.json({ message: "Sent email successfully" })
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: err.message })
//     }
// }

// exports.showLoginPageForCandidateLhsFieldUpdate = async (req, res) => {
//     try {
//         const loginHtml = `
//                         <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Login Form</title>
//                     <style>
//                         body {
//                             font-family: Arial, sans-serif;
//                             background-color: #f4f4f4;
//                             margin: 0;
//                             display: flex;
//                             justify-content: center;
//                             align-items: center;
//                             height: 100vh;
//                         }

//                         .login-container {
//                             background-color: #fff;
//                             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                             border-radius: 8px;
//                             overflow: hidden;
//                             width: 300px;
//                             max-width: 100%;
//                             padding: 20px;
//                             box-sizing: border-box;
//                         }

//                         .login-container h2 {
//                             text-align: center;
//                             color: #333;
//                         }

//                         .login-form {
//                             display: flex;
//                             flex-direction: column;
//                             gap: 15px;
//                         }

//                         .login-form input {
//                             padding: 10px;
//                             border: 1px solid #ddd;
//                             border-radius: 4px;
//                             font-size: 16px;
//                         }

//                         .login-form button {
//                             background-color: #4caf50;
//                             color: #fff;
//                             padding: 12px;
//                             border: none;
//                             border-radius: 4px;
//                             font-size: 16px;
//                             cursor: pointer;
//                         }

//                         .login-form button:hover {
//                             background-color: #45a049;
//                         }
//                     </style>
//                 </head>
//                 <body>

//                 <div class="login-container">
//                     <h2>Login</h2>
//                     <form class="login-form" method="POST" action="https://uat-explorer.adamma.in/api/showLhsPageToCandidate">
//                         <input type="text" placeholder="Username" name="username" required>
//                         <input type="password" placeholder="Password" name="password" required>
//                         <button type="submit">Submit</button>
//                     </form>
//                 </div>

//                 </body>
//                 </html>

//         `
//         return res.send(loginHtml)

//     } catch (err) {
//         console.log(err)

//     }
// }

// exports.showLhsPageToCandidate = async (req, res) => {
//     try {
//         const caseId = req.body.username
//         const password = req.body.password

//         const UpdateLhsAuthData = await UpdateLhsAuthModel.findOne({ caseId: caseId })

//         const isPasswordMatch = bcrypt.compareSync(password, UpdateLhsAuthData.password)

//         if (!isPasswordMatch) {
//             return res.status(401).json({ message: "username or password is invalid" })
//         }

//         const caseData = await Case.findOne({ caseId: caseId })

//         let html = `
//         <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>Update LHS Fields</title>
//          <style>
//         body {
//             font-family: 'Arial', sans-serif;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             height: 100vh;
//         }

//         form {
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }

//         h2 {
//             text-align: center;
//             color: #333;
//         }

//         label {
//             display: block;
//             margin-bottom: 8px;
//             color: #555;
//         }

//         input {
//             width: 100%;
//             padding: 8px;
//             margin-bottom: 16px;
//             box-sizing: border-box;
//             border: 1px solid #ccc;
//             border-radius: 4px;
//         }

//         input[type="submit"] {
//             background-color: #4caf50;
//             color: #fff;
//             cursor: pointer;
//         }

//         input[type="submit"]:hover {
//             background-color: #45a049;
//         }
//     </style>
//             </head>
//             <body>

//                 <h2>Update Information</h2>
//                 <form action="https://uat-explorer.adamma/api/updateCandidateLhs" method="post">
//         `

//         let actualComponents = caseData.actualComponents

//         while (actualComponents.length) {
//             const currComponent = actualComponents[0]

//             const model = require(`../../models/data_entry/${currComponent}.model`)
//             const modelData = await model.find({ case: caseData._id })
//             const componentData = await Component.findOne({ name: currComponent })
//             const fields = await ComponentFields.find({ component: componentData._id })

//             for (let i = 0; i < modelData.length; i++) {
//                 const item = modelData[i]
//                 html += `<h3>Update Information for - ${componentData.displayName} - ${i}</h3>`
//                 for (let j = 0; j < fields.length; j++) {
//                     const currField = fields[j].name
//                     if (item[currField]) {
//                         if (item.status == "MENTOR-REVIEW-ACCEPTED" || item.status == "OUTPUTQC-ACCEPTED") {
//                             html += `
//                             <label for="${currField}">${currField}:</label>
//                             <input type="text" id="${currField}" name="${componentData.name}|${item._id}|${currField}" value="${item[currField]}" readonly><br/>
//                             `
//                         } else {
//                             html += `
//                             <label for="${currField}">${currField}:</label>
//                             <input type="text" id="${currField}" name="${componentData.name}|${item._id}|${currField}" value="${item[currField]}" required><br/>
//                             `
//                         }

//                     }
//                 }
//             }

//             actualComponents = actualComponents.filter(comp => comp !== currComponent)
//         }


//         html += `
//         <input type="submit" value="Submit">
//         </form>
//         </body>
// </html>
//         `
//         return res.send(html)

//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: err.message })
//     }
// }
// exports.updateCandidateLhs = async (req, res) => {
//     try {
//         const keys = Object.keys(req.body)

//         for (let i = 0; i < keys.length; i++) {
//             const currKey = keys[i]
//             const component = currKey.split("|")[0]
//             const check = currKey.split("|")[1]
//             const field = currKey.split("|")[2]
//             const query = {}
//             query[field] = req.body[currKey]
//             const model = require(`../../models/data_entry/${component}.model`)
//             const modelData = await model.findOneAndUpdate({ _id: check }, query)
//         }

//         return res.send(`<h2>Updated All Fields Successfully</h2>`)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ error: err.message })
//     }
// }
//////////////////////////////////////////26Aug2024//////////////////
exports.updateDraft = (req, res) => {
	console.log("MOV-DRaft:",req.body.moveDraft)
    Case.findOneAndUpdate(
      { _id: req.params._id },
      {
        moveDraft: req.body.moveDraft,
      }
    )
      .then(async (data) => {

        caseHistory.create(
          data._id,
          null,
          null,
          "moved to draft",
          "INITIATED",
          "moved to draft",
          null,
          null,
          null,
          req.user.user_id
        );
        res.json(data);
      })
      .catch((err) => {
        console.log("Error updating Case Status......when Input QC......", err);
        res.status(500).json({
          message:
            err.message || "Some error occurred while updating case status",
        });
      });
    }
///////////////////kynode///////////////
exports.findCasesWithDetails = (req, res) => {
    Case.find({ _id: req.params._id })
        .populate({ path: 'client' })
        .populate({ path: 'subclient' })
        .populate({ path: 'profile' })
        .populate({ path: 'package' })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'An error occurred while fetching cases with a status'
            })
        })
}
//////////////12Dec2024///////////
exports.returnToFinalQc = async (req, res) => {
   try {
       const model = require(`../../models/data_entry/${req.body.componentName}.model`)
       const modelData = await model.findOneAndUpdate({ _id: req.body._id }, { status: "MENTOR-REVIEW-ACCEPTED" })
       const caseData = await Case.findOneAndUpdate({ _id: req.body.case_id }, { status: "MENTOR-REVIEW-ACCEPTED" })
       return res.json(caseData)
   } catch (err) {
       console.log(err)
       return res.status(500).json({ error: err.message })
   }
}
//////09Aug2025 final Qc Allocation Bucket/////
// controllers/cases.controller.js
exports.findAllCasesWithStatusForFinalQc = async (req, res) => {
  try {
    const status = req.params.status;
    const page = parseInt(req.query.pageCount) || 0;
    const limit = 500;
    const skip = page * limit;

    // Get all subclients for this user
    const subclients = await UserSubclientAccess.find({ user: req.user.user_id }, { subclient: 1 }).lean();
    if (!subclients.length) {
      return res.json({ totalCount: 0, resp: [] });
    }

    const subclientIds = subclients.map(s => s.subclient);

    // Count total
    const totalCount = await Case.countDocuments({
      subclient: { $in: subclientIds },
      status
    });

    // Query only necessary fields
    const data = await Case.find({
      subclient: { $in: subclientIds },
      status
    })
      .sort({ caseId: 1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: "client", select: "name colorCodes" })
      .populate({ path: "subclient", select: "name" })
      .select("caseId candidateName tatEndDate initiationDate outputqcAllocatedTo outputqcAllocationDate")
      .lean();

    res.json({ totalCount, resp: data });
  } catch (err) {
    console.error("Error fetching cases:", err);
    res.status(500).json({ message: err.message || "Error fetching cases" });
  }
};

/////////////////////New 16Sep2025///
exports.uploadFiles = async (req, res) => {
  try {
    if (!req.files || !req.files.excel) {
      return res.status(400).json({ error: 'Excel file is required.' });
    }
    let aCase;
    try {
      aCase = JSON.parse(req.body.aCase);
	console.log("cases-",aCase)
    } catch (err) {
      return res.status(400).json({ error: 'Invalid case data.' });
    }

   // const uploadDir = "C:/Users/Dell/Downloads/cvws_new_uploads/candidate_docs";
    const uploadDir = "/REPO_STORAGE/candidate_docs";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const excelFile = req.files.excel;
    const excelFileName = `${aCase.batchId}_${timestamp}_${excelFile.name}`;
    const excelFilePath = path.join(uploadDir, excelFileName);
    
    await excelFile.mv(excelFilePath);
    console.log('Excel file saved to:', excelFilePath);

    let zipFilePath = null;
    if (req.files.zip) {
      const zipFile = req.files.zip;
      const zipFileName = `${aCase.batchId}_${timestamp}_${zipFile.name}`;
      zipFilePath = path.join(uploadDir, zipFileName);
      await zipFile.mv(zipFilePath);
      console.log('ZIP file saved to:', zipFilePath);
    }

    return res.json({ 
      message: 'Files uploaded successfully', 
      excelFilePath, 
      zipFilePath
    });
  } catch (err) {
    console.log('Error in uploadFiles:', err);
    return res.status(500).json({ error: err.message });
  }
};
// end-15sep25
const parseExcelDate = (value) => {
    if (!value) return null;
    const m = moment(value, ["MM/DD/YYYY", "YYYY-MM-DD", "DD/MM/YYYY"], true);
    return m.isValid() ? m.toDate() : null;
};
const parseIfString = (input) => {
    if (typeof input === "string") {
        try {
            return JSON.parse(input);
        } catch (err) {
            console.warn("Failed to parse, returning original input:", input);
            return input;
        }
    }
    return input; // already an object
};
 
exports.bulkUploadCRM = async (req, res) => {
    try {
        // Parse payload safely
        const aCase = parseIfString(req.body.aCase);
        const data = parseIfString(req.body.data);
 
        // Uploaded files from express-fileupload
        const excelFile = req.files?.excel;
        const zipFile = req.files?.zip;
 
        for (let i = 0; i < data.length; i++) {
            const currItem = data[i];
 
            // Generate caseId
            const caseId = await generateCaseId(aCase.client);
 
            // Save Case
            const caseData = new Case({
                caseId,
                candidateName: currItem.personalDetails_name,
                subclient: aCase.subclient,
                client: aCase.client,
                package: aCase.package || null,
                profile: aCase.profile || null,
                initiationDate: new Date(),
                status: "INITIATED",
            });
            await caseData.save();
 
            // Log in Case History
            await caseHistory.create(
                caseData._id,
                null,
                null,
                "Bulk Upload",
                "EXCEL-CASE-CREATION",
                "Excel Case Creation",
                null,
                null,
                null,
                req.user.user_id
            );
 
            // Prepare upload directory
            const caseUploadDir = path.join(`/REPO_STORAGE/case_uploads/${caseData.caseId}`);
            if (!fs.existsSync(caseUploadDir)) fs.mkdirSync(caseUploadDir, { recursive: true });
 
            // Save Excel file
            if (excelFile) {
                const excelPath = path.join(caseUploadDir, excelFile.name);
                await excelFile.mv(excelPath);
                console.log(`Excel file saved: ${excelPath}`);
            }
 
            // Save ZIP file
            if (zipFile) {
                const zipPath = path.join(caseUploadDir, zipFile.name);
                await zipFile.mv(zipPath);
                console.log(`ZIP file saved: ${zipPath}`);
            }
 
            // Save personal details
            const personalDetailsData = new PersonalDetails({
                case: caseData._id,
                name: currItem.personalDetails_candidatename,
                fathername: currItem.personalDetails_fathername || "NA",
                dateofbirth: parseExcelDate(currItem["personalDetails_dateofbirth(MM/DD/YYYY)"]),
                number: currItem.personalDetails_mobilename,
                employee: req.body.employeeid,
                doj: parseExcelDate(currItem["personalDetails_doj(MM/DD/YYYY)"]),
                emailid: currItem.personalDetails_emailid,
                process: currItem.personalDetails_process,
                location: currItem.personalDetails_location,
                aadhernumber: currItem.personalDetails_aadhernumber,
                pancard: currItem.personalDetails_pancard,
                modifiedBy: req.user.user_id,
                status: "INITIATED",
            });
            await personalDetailsData.save();
        }
 
 
        return res.json({ message: "Bulk upload completed successfully" });
    } catch (err) {
        console.error("Error in bulkUpload:", err);
        return res.status(500).json({ error: err.message });
    }
};



exports.updateTat = async (req, res) => {
    try {
        console.log("tat@@@@@@@@@@@@@@@@@@@@", req.params.case_id);
        console.log("tat@@@@@@@@@@@@@@@@@@@@", req.body);
        await Case.findOneAndUpdate(
            { _id: req.params.case_id },
            {
	        candidateName: req.body.candidateName,
                employeeId: req.body.employeeId,
                initiationDate: req.body.initiationDate,
                tatEndDate: req.body.tatEndDate
            }
        )

        return res.json({ message: "Updated tat end date successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message)
    }
}


////Added code sep-19///
// Get TAT stats (In TAT vs Out TAT)
exports.getTatStats = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    // fetch cases initiated this month
    const cases = await Case.find({
      initiationDate: { $gte: startOfMonth, $lte: endOfMonth }
    });

    let inTat = 0;
    let outTat = 0;

    cases.forEach(c => {
      if (c.initiationDate && c.tatEndDate) {
        if (new Date(c.initiationDate) <= new Date(c.tatEndDate)) {
          inTat++;
        } else {
          outTat++;
        }
      }
    });

    return res.json({ inTat, outTat });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err.message);
  }
};

exports.getTatStatsTrend = async (req, res) => {
  try {
    const now = new Date();

    // Prepare last 6 months ranges
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
      months.push({ monthStart, monthEnd });
    }

    // Run queries in parallel
    const queries = months.map(m =>
      Promise.all([
        Case.countDocuments({ initiationDate: { $gte: m.monthStart, $lte: m.monthEnd } }),
        Case.countDocuments({ tatEndDate: { $gte: m.monthStart, $lte: m.monthEnd } })
      ])
    );

    const resultsData = await Promise.all(queries);

    // Format results
    const results = resultsData.map((counts, idx) => {
      const [inTat, outTat] = counts;
      return {
        month: months[idx].monthStart.toLocaleString('default', { month: 'short' }),
        inTat,
        outTat
      };
    });

    res.json(results);
  } catch (err) {
    console.error('Error in getTatStatsTrend:', err);
    res.status(500).json({ message: err.message });
  }
};
exports.getCaseCountsForDashboard = async (req, res) => {
  try {
    const statuses = [
      "INITIATED",
      "DE-ALLOCATED",
      "INPUTQC-REJECTED",
      "DE-COMPLETED",
      "MENTOR-REVIEW",
      "MENTOR-REVIEW-ACCEPTED",
      "VERIFICATION-COMPLETED"
    ];

    const counts = {};

    for (let status of statuses) {
      counts[status] = await Case.countDocuments({ status });
    }

    res.json({ success: true, counts });
  } catch (err) {
    console.error("Error fetching dashboard counts:", err);
    res.status(500).json({ message: "Error while fetching dashboard counts" });
  }
};


exports.getTotalCountForInitiatedDeallocatedRejected = async (req, res) => {
  try {
    const statuses = ["INITIATED", "DE-ALLOCATED", "INPUTQC-REJECTED"];

    // Count all cases where status is in the above list
    const totalCount = await Case.countDocuments({ status: { $in: statuses } });

    res.json({ success: true, totalCount });
  } catch (err) {
    console.error("Error fetching combined count:", err);
    res.status(500).json({ message: "Error while fetching combined count" });
  }
};
exports.uploadModify = (req, res) => {
    let loaFile = req.files.loaFile;
    loaFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        res.json({ message: "File uploaded" });
    });



};
exports.uploadQuickNoteFiles = async (req, res) => {
  try {
    const { caseId, componentName, componentId } = req.body;
    const file = req.files?.quickNoteFile;

    console.log('Quick note file upload request:', { caseId, componentName, componentId });

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fs = require('fs');
    const path = require('path');

    const folderPath = `./REPO_STORAGE/quick_notes/${caseId}`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileArray = Array.isArray(file) ? file : [file];
    const uploadedFiles = [];

    for (const fileItem of fileArray) {
      const fileName = `${Date.now()}_${fileItem.name}`;
      const filePath = path.join(folderPath, fileName);

      await new Promise((resolve, reject) => {
        fileItem.mv(filePath, (err) => {
          if (err) {
            console.error('File move error:', err);
            return reject(err);
          }
          resolve();
        });
      });

      uploadedFiles.push({
        originalName: fileItem.name,
        storedName: fileName,
        path: filePath,
        size: fileItem.size,
        uploadedAt: new Date(),
        componentName: componentName,
        componentId: componentId
      });
    }


    res.json({
      success: true,
      uploadedFiles: uploadedFiles,
      message: `${uploadedFiles.length} file(s) uploaded successfully for quick note`
    });

  } catch (err) {
    console.error("uploadQuickNoteFiles Error:", err);
    res.status(500).json({ message: err.message });
  }
};
