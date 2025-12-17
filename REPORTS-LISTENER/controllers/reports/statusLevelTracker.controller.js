const Component = require("../../models/administration/component.model")
const ExcelJS = require('exceljs');
const PersonalDetails = require("../../models/data_entry/personal_details_data.model")
const ClientContracts = require("../../models/administration/client_contract.model")
const ClientContractProfile = require('../../models/administration/client_contract_profile.model')
const moment = require("moment")
const Case = require("../../models/uploads/case.model")
const Client = require('../../models/administration/client.model')
const Subclient = require("../../models/administration/subclient.model")
const Branch = require("../../models/masters/branch.model")
const mongoose = require('mongoose')

exports.getStatusLevelTrackerForClient = async (req, res) => {
    try {
        const workBook = new ExcelJS.Workbook()
        console.log("Workbook Constructed");

        const sheet = workBook.addWorksheet()
        console.log("Worksheet Added");

        const headerRow = sheet.addRow(["Case Id", "Candidate Name", "Client", "Subclient", "Branch", "Father's Name", "Date of Birth", "Mobile Number", "Check ID", "Component", "Status", "Initiation Date"])

        let query = {};
        if (req.query.clientId !== "All") {
            const client_id = mongoose.Types.ObjectId(req.query.clientId);
            query.client = client_id;
        }

        if (req.query.reportType == "INITIATED") {
            console.log("Getting Details for INITIATED Status...");
            query.status = "INITIATED";
        }
        if (req.query.reportType == "DE-COMPLETED") {
            console.log("Getting Details for DE-COMPLETED Status...");   
            query.status = "DE-COMPLETED";
        }
        if (req.query.reportType == "INPUTQC-ACCEPTED") {
            console.log("Getting Details for INPUTQC-ACCEPTED Status...");
            query.status = "INPUTQC-ACCEPTED";
        }
        if (req.query.reportType == "INPUTQC-REJECTED") {
            console.log("Getting Details for INPUTQC-REJECTED Status...");   
            query.status = "INPUTQC-REJECTED";
        }
        if (req.query.reportType == "VERIFICATION-COMPLETED") {
            console.log("Getting Details for VERIFICATION-COMPLETED Status...");   
            query.status = "VERIFICATION-COMPLETED";
        }
        if (req.query.reportType == "MENTOR-REVIEW-ACCEPTED") {
            console.log("Getting Details for MENTOR-REVIEW-ACCEPTED Status...");   
            query.status = "MENTOR-REVIEW-ACCEPTED";
        }
        if (req.query.reportType == "MENTOR-REVIEW-REJECTED") {
            console.log("Getting Details for MENTOR-REVIEW-REJECTED Status...");   
            query.status = "MENTOR-REVIEW-REJECTED";
        }
        if (req.query.reportType == "OUTPUTQC-ACCEPTED") {
            console.log("Getting Details for OUTPUTQC-ACCEPTED Status...");   
            query.status = "OUTPUTQC-ACCEPTED";
        }
        if (req.query.reportType == "OUTPUTQC-REJECTED") {
            console.log("Getting Details for OUTPUTQC-REJECTED Status...");   
            query.status = "OUTPUTQC-REJECTED";
        }

        const compDoc = await Component.find()

        for (let i = 0; i < compDoc.length; i++) {
            const currComp = compDoc[i];
            console.log(`Component Name  = ${currComp.name}`);

            const model = require(`../../models/data_entry/${currComp.name}.model`)
            const modelData = await model.find(query).populate('case').populate({path: 'client', model: 'Client'}).populate({path: 'subclient', model: 'Subclient'}).lean()

            for (let j = 0; j < modelData.length; j++) {
                const currData = modelData[j];

                const caseID = currData.case.caseId
                console.log("Working on CaseID == ", caseID);

                const personaldetailsdata = await PersonalDetails.findOne({case:currData.case})
                const candidateName = personaldetailsdata?.name
                const clientName = currData?.client?.name
                const subclientName = currData?.subclient?.name
                const branchDoc = await Branch.findOne({_id: currData?.subclient?.branch})
                const branchName = branchDoc?.name
                const fatherName = personaldetailsdata?.fathername
                const dob = personaldetailsdata?.dateofbirth ? moment(personaldetailsdata?.dateofbirth).format("DD-MM-YYYY") : ''
                const mobileNumber = personaldetailsdata?.number
                const checkID = currData?.checkId
                const componentname = currComp?.displayName
                const status = currData?.status
                const initiationDate = currData?.case?.initiationDate
                
                sheet.addRow([caseID, candidateName, clientName, subclientName, branchName, fatherName, dob, mobileNumber, checkID, componentname, status, initiationDate])
            }
        }

        headerRow.height = 100;
        headerRow.eachCell({ includeEmpty: true }, (cell) => {
            // Setting the fill color for the cell
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFDDEBF7" }
            };

            // Setting the border for the cell
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };

            // Making the font bold for the cell
            cell.font = {
                bold: true
            };

            // Vertically aligning the text to the middle
            cell.alignment = {
                vertical: 'middle'
            };
        });

        await prepareReport()
        async function prepareReport() {
            console.log("Setting Headers")
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "Client_Status_Tracker.xlsx"
            );

            console.log("About to return WorkBook");
            return workBook.xlsx.write(res)
                .then(function () {
                    res.status(200).end();
                });
        }

    } catch (error) {
        console.log("error: ", error);
        res.status(500).send("Error Fetching Client Level Tracker")
    }
}
