const xlsx = require("xlsx")
const Components = require("../../models/administration/component.model")
const moment = require("moment")
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const path = require("path")
const fs = require("fs")

exports.getAnalystTrackerReport = async (req, res) => {
    try {
        const result = []
        let query = { $and: [{ status: { $ne: "MENTOR-REVIEW-ACCEPTED", $ne: "OUTPUTQC-ACCEPTED" } }, { verificationAllocatedTo: req.user.user_id }] }
        const allComponents = await Components.find({})

        for (let i = 0; i < allComponents.length; i++) {
            const currComponent = allComponents[i].name
            console.log("Adding data for component:", currComponent)

            const model = require(`../../models/data_entry/${currComponent}.model`)
            const modelData = await model.find(query)
                .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
                .populate({ path: 'verificationAllocatedTo' })
                .populate({ path: 'allocatedToFE' })
                .populate({ path: 'allocatedToVendor' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })

            for (let j = 0; j < modelData.length; j++) {
                const item = modelData[j]
		    if(!item.case){
			    continue
		    }
                const personalDetails = await PersonalDetailsData.findOne({ case: item.case._id })
		console.log(personalDetails)

                const dataToAdd = {
                    "Case Id": item.case ? item.case.caseId : "",
                    "Candidate Name": personalDetails ? personalDetails.name : "",
                    "Client": item.case.client ? item.case.subclient.client.name : "",
                    "Subclient": item.case.subclient ? item.case.subclient.name : "",
                    "Date of Birth": personalDetails ? moment(personalDetails.dateofbirth).format("DD/MM/YYYY") : "",
                    "Father's Name": personalDetails ? personalDetails.fathername : "",
                    "Contact Number": personalDetails ? personalDetails.number : "",
                    "Component": currComponent,
                    "Status": item.status,
                    "Initiation Date": item.case.initiationDate ? moment(item.case.initiationDate).format("DD/MM/YYYY") : "",
                    "TAT End Date": item.case.tatEndDate ? moment(item.case.tatEndDate).format("DD/MM/YYYY") : "",
                    "Verifier": item.verificationAllocatedTo ? item.verificationAllocatedTo.name : "",
                    "FE": item.allocatedToFE ? item.allocatedToFE.name : "",
                    "Check Id": item.checkId,
                    "Insuff Raised Date": item.insufficiencyRaisedDate ? moment(item.insufficiencyRaisedDate).format("DD/MM/YYYY") : "",
                    "Insuff Cleared Date": item.insufficiencyClearedDate ? moment(item.insufficiencyClearedDate).format("DD/MM/YYYY") : "",
                    "Reinitiation Date": item.case.reinitiationDate ? moment(item.case.reinitiationDate).format("DD/MM/YYYY") : "",
                    "Verification Completion Date": item.verificationCompletionDate ? moment(item.verificationCompletionDate).format("DD/MM/YYYY") : ""
                }
                result.push(dataToAdd)
            }
        }

        console.log("Got all data now dumping to xlsx....")

        const newWB = xlsx.utils.book_new()
        const newWS = xlsx.utils.json_to_sheet(result)
        xlsx.utils.book_append_sheet(newWB, newWS, "Analyst Tracker")
        xlsx.writeFile(newWB, path.join(__dirname, "analyst_tracker.xlsx"))
        res.download(path.join(__dirname, "analyst_tracker.xlsx"))
        setTimeout(() => {
            var filePath = path.join(__dirname, "analyst_tracker.xlsx");
            fs.unlinkSync(filePath);
            console.log("file deleted")
        }, 4000)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}
