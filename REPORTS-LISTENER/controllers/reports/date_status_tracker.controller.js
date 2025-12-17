const Component = require("../../models/administration/component.model")
const ExcelJS = require('exceljs');
const PersonalDetails = require("../../models/data_entry/personal_details_data.model")
const moment = require("moment")
const Branch = require("../../models/masters/branch.model")
const mongoose = require('mongoose')

exports.getdateWiseStatusTracker = async (req, res) => {
    try {
        const workBook = new ExcelJS.Workbook()
        console.log("Workbook Constructed");

        const sheet = workBook.addWorksheet()
        console.log("Worksheet Added");

        const headerRow = sheet.addRow(["Case Id", "Candidate Name", "Client", "Subclient", "Branch", "Father's Name", "Date of Birth", "Mobile Number", "Check ID", "Component", "Status", "Initiation Date", "INSUFF Raised Date", "INSUFF Cleared Date", "INSUFF 1 Raised Date", "INSUFF 1 Cleared Date", "INSUFF 2 Raised Date", "INSUFF 2 Cleared Date"])

        const startdate = req.query.fromDate || "2023-01-01"
        const enddate = req.query.toDate || "2023-01-07"
        const client_id = req.query.clientId
        
        console.log("Fetching Report from ${startdate} to ${enddate}", startdate, enddate)
        console.log("Client ID:", client_id)

        let query = {
            $and: [
                { $or: [] } // This will be populated based on the querytype
            ]
        };

        // Add date range based on querytype
        if (req.query.querytype == "INITIATED") {
            console.log("Getting Details for INITIATED Status...");
            query.$and[0].$or.push(
                { initiationDate: { $gte: startdate, $lte: enddate } },
                { status: "INITIATED" }
            );
        }
        if (req.query.querytype == "DE-COMPLETED") {
            console.log("Getting Details for DE-COMPLETED Status...");
            query.$and[0].$or.push(
                { dataEntryCompletionDate: { $gte: startdate, $lte: enddate } },
                { status: "DE-COMPLETED" }
            );
        }
        if (req.query.querytype == "INPUTQC-ACCEPTED") {
            console.log("Getting Details for INPUTQC-ACCEPTED Status...");
            query.$and[0].$or.push(
                { inputqcCompletionDate: { $gte: startdate, $lte: enddate } },
                { status: "INPUTQC-ACCEPTED" }
            );
        }
	if (req.query.querytype == "INPUTQC-REJECTED") {
            console.log("Getting Details for INPUTQC-REJECTED Status...");
            query.$and[0].$or.push(
                { inputqcCompletionDate: { $gte: startdate, $lte: enddate } },
                { status: "INPUTQC-REJECTED" }
            );
        }    
        if (req.query.querytype == "VERIFICATION-COMPLETED") {
            console.log("Getting Details for VERIFICATION-COMPLETED Status...");
            query.$and[0].$or.push(
                { verificationCompletionDate: { $gte: startdate, $lte: enddate } },
                { status: "VERIFICATION-COMPLETED" }
            );
        }
        if (req.query.querytype == "MENTOR-REVIEW-ACCEPTED") {
            console.log("Getting Details for MENTOR-REVIEW-ACCEPTED Status...");
            query.$and[0].$or.push(
                { mentorReviewCompletionDate: { $gte: startdate, $lte: enddate } },
                { status: "MENTOR-REVIEW-ACCEPTED" }
            );
        }
	if (req.query.querytype == "MENTOR-REVIEW-REJECTED") {
            console.log("Getting Details for MENTOR-REVIEW-REJECTED Status...");
            query.$and[0].$or.push(
                { mentorReviewCompletionDate: { $gte: startdate, $lte: enddate } },
                { status: "MENTOR-REVIEW-REJECTED" }
            );
        }    
        if (req.query.querytype == "OUTPUTQC-ACCEPTED") {
            console.log("Getting Details for OUTPUTQC-ACCEPTED Status...");
            query.$and[0].$or.push(
                { outputqcCompletionDate: { $gte: startdate, $lte: enddate } },
                { status: "OUTPUTQC-ACCEPTED" }
            );
        }
	if (req.query.querytype == "OUTPUTQC-REJECTED") {
            console.log("Getting Details for OUTPUTQC-REJECTED Status...");
            query.$and[0].$or.push(
                { outputqcCompletionDate: { $gte: startdate, $lte: enddate } },
                { status: "OUTPUTQC-REJECTED" }
            );
        }    
        if (req.query.querytype == "INSUF-1-REQ") {
            console.log("Getting Details for INSUF-1-REQ Status...");
            query.$and[0].$or.push(
                { insufficiencyRaisedDate: { $gte: startdate, $lte: enddate } },
                { status: "INSUF-1-REQ" }
            );
        }
        if (req.query.querytype == "INSUF-1-REQ-ACCEPTED") {
            console.log("Getting Details for INSUF-1-REQ-ACCEPTED Status...");
            query.$and[0].$or.push(
                { insufficiencyClearedDate: { $gte: startdate, $lte: enddate } },
                { status: "INSUF-1-REQ-ACCEPTED" }
            );
        }
        if (req.query.querytype == "INSUF-2-REQ") {
            console.log("Getting Details for INSUF-2-REQ Status...");
            query.$and[0].$or.push(
                { secondInsufficiencyRaisedDate: { $gte: startdate, $lte: enddate } },
                { status: "INSUF-2-REQ" }
            );
        }
        if (req.query.querytype == "INSUF-2-REQ-ACCEPTED") {
            console.log("Getting Details for INSUF-2-REQ-ACCEPTED Status...");
            query.$and[0].$or.push(
                { secondInsufficiencyClearedDate: { $gte: startdate, $lte: enddate } },
                { status: "INSUF-2-REQ-ACCEPTED" }
            );
        }

        // Only add client filter if not "All"
        if (client_id !== "All") {
            query.$and.push({ client: mongoose.Types.ObjectId(client_id) });
        }

        const compDoc = await Component.find()

        for (let i = 0; i < compDoc.length; i++) {
            const currComp = compDoc[i];
            console.log("current component == ", currComp.name);

            const model = require(`../../models/data_entry/${currComp.name}.model`)

            const modelData = await model.find(query).populate('case').populate('client').populate('subclient')
            console.log("data length == ", modelData.length);

            for (let j = 0; j < modelData.length; j++) {
                const currData = modelData[j];

                const caseID = currData.case.caseId
                console.log(`Working on CASEID = ${caseID} == ${currData?.case._id}`);
                const personalData = await PersonalDetails.findOne({ case: currData?.case._id })
                const candidateName = personalData?.name || ''
                const clientName = currData?.client?.name || ''
                const subclientName = currData?.subclient?.name || ''
                const branchDoc = await Branch.findOne({ _id: currData?.subclient?.branch })
                const branchName = branchDoc?.name || ''
                const fatherName = personalData?.fathername || ''
                const dob = personalData?.dateofbirth ? moment(personalData.dateofbirth).format("DD-MM-YYYY") : ''
                const mobileNumber = personalData?.number || ''
                const checkID = currData?.checkId || ''
                const componentName = currComp?.displayName || ''
                const compStatus = currData?.status || ''
                const initiationDate = currData?.case?.initiationDate ? moment(currData.case.initiationDate).format("DD-MM-YYYY") : ''
                const insuffRaisedDate = currData?.insufficiencyRaisedDate ? moment(currData.insufficiencyRaisedDate).format("DD-MM-YYYY") : ''
                const insuffClearedDate = currData?.insufficiencyClearedDate ? moment(currData.insufficiencyClearedDate).format("DD-MM-YYYY") : ''
                const firstInsuffRaisedDate = currData?.firstInsufficiencyRaisedDate ? moment(currData.firstInsufficiencyRaisedDate).format("DD-MM-YYYY") : ''
                const firstInsuffClearedDate = currData?.firstInsufficiencyClearedDate ? moment(currData.firstInsufficiencyClearedDate).format("DD-MM-YYYY") : ''
                const secondInsuffRaisedDate = currData?.secondInsufficiencyRaisedDate ? moment(currData.secondInsufficiencyRaisedDate).format("DD-MM-YYYY") : ''
                const seconInsuffcleareddate = currData?.secondInsufficiencyClearedDate ? moment(currData.secondInsufficiencyClearedDate).format("DD-MM-YYYY") : ''

                sheet.addRow([caseID, candidateName, clientName, subclientName, branchName, fatherName, dob, mobileNumber, checkID, componentName, compStatus, initiationDate, insuffRaisedDate, insuffClearedDate, firstInsuffRaisedDate, firstInsuffClearedDate, secondInsuffRaisedDate, seconInsuffcleareddate])
            }
        }

        headerRow.height = 100;
        headerRow.eachCell({ includeEmpty: true }, (cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFDDEBF7" }
            };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };
            cell.font = {
                bold: true
            };
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
                "attachment; filename=" + "Client_Date_Wise_Status_Tracker.xlsx"
            );

            console.log("About to return WorkBook");
            return workBook.xlsx.write(res)
                .then(function () {
                    res.status(200).end();
                });
        }

    } catch (error) {
        console.log("error : ", error)
        res.status(500).send("Error Fetching Date Specific Report")
    }
}
