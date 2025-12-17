const UserRoles = require("../../models/administration/user_role.model")
const ComponentAccess = require("../../models/administration/component_access.model")
const Users = require("../../models/administration/user.model")
const Component = require("../../models/administration/component.model")
const moment = require('moment')
const XLSX = require('xlsx');



exports.getAnalystTracker = async (req, res) => {
    try {

        console.log("In Analyst Tracker...");

        const user_id = req.user.user_id


        let query = ""

        if (req.query.reportType == 'PENDING') {
            query = { $and: [{ verificationAllocatedTo: user_id }, { $or: [{ status: 'MENTOR-REVIEW-ACCEPTED' }, { status: 'OUTPUTQC-ACCEPTED' }, { status: "VERIFICATION-COMPLETED" }] }] };
        }

        if (req.query.reportType == "COMPLETED") {
            query = { $and: [{ verificationCompletionDate: { $gte: req.query.dateFrom, $lte: req.query.dateTo + "T23:59:59.999Z" } }, { verificationAllocatedTo: user_id }, { $or: [{ status: 'MENTOR-REVIEW-ACCEPTED' }, { status: 'OUTPUTQC-ACCEPTED' }, { status: "VERIFICATION-COMPLETED" }] }] };
        }


        let result = []

        const compDoc = await Component.find({})

        for (let i = 0; i < compDoc.length; i++) {
            const currComp = compDoc[i];

            const model = require(`../../models/data_entry/${currComp.name}.model`)
            const modelData = await model.find(query).populate('case').populate('verificationAllocatedto')

            for (let j = 0; j < modelData.length; j++) {
                const currData = modelData[j];

                console.log(`Working on CaseId : ${currData.case?.caseId}`);

                const userDoc = await Users.findOne({ _id: user_id })

                console.log("Current Data == ", currData.checkId)



                const itemToPush = {
                    "Case ID": currData.case?.caseId,
                    "Candidate Name": currData.case?.candidateName,
                    "Check ID": currData.checkId,
                    "Check Name": currComp.displayName,
                    "Check  Status": currData.status,
                    "Verification Allocated To": userDoc.name ? userDoc.name : '',
                    "Verification Completion Date": currData.verificationCompletionDate ? moment(currData.verificationCompletionDate).format("DD-MM-YYYY") : ''
                }
                result.push(itemToPush)
            }

        }
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(result);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, '/REPO_STORAGE/tmp_tl_tracker/analystTracker.xlsx');
        res.download('/REPO_STORAGE/tmp_tl_tracker//analystTracker.xlsx');

    } catch (error) {
        console.log("error :", error)
        res.status(500).send("Error Fetching the Analyst Report")
    }
}
