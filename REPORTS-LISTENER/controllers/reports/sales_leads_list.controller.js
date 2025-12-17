const xlsx = require('xlsx')
const LeadOrProspect = require("../../models/sales/lead_or_prospect_model")
const FollowUp = require("../../models/sales/follow_up.model")
const Meeting = require("../../models/sales/meeting.model")
const path = require('path')
const fs = require('fs')
exports.generatesSalesLeedsList = async (req, res) => {
    try {
        console.log("Fetching leads data....")
        let finalData = []
        let sortedFinalData = []

        const leadsData = await LeadOrProspect.find({}, { modifiedOn: 0, __v: 0 }).populate('bde', { name: 1, _id: 0 })
        console.log("Fetching meetings data....")
        for (let i = 0; i < leadsData.length; i++) {

            finalData[i] = {}
            Object.assign(finalData[i], leadsData[i]._doc)


            const meeting = await Meeting.find({ leadOrProspect: finalData[i]._id })
            const followupData = await FollowUp.find({ LeadOrProspect: finalData[i]._id }, { followupDate: 1 })
            // console.log(finalData[i])
            finalData[i]._id = String(finalData[i]._id)
            if (finalData[i].contactPersons[0]) {
                const contactPersons = finalData[i].contactPersons[0]
                const keys = Object.keys(contactPersons)
                for (let j = 0; j < keys.length; j++) {
                    const currdata = finalData[i]
                    currdata[keys[j]] = contactPersons[keys[j]]
                    finalData[i] = currdata

                }
                delete (finalData[i].contactPersons)
            }
            if (meeting[0]) {
                const keys = Object.keys(meeting[0])
                for (let j = 0; j < keys.length; j++) {
                    const currdata = finalData[i]
                    currdata[keys[j]] = meeting[0][keys[j]]
                    finalData[i] = currdata
                }
            }
            sortedFinalData[i] = {
                ['Pipe line NB 2021/22']: finalData[i].financial,
                ['Company Name']: finalData[i].name.toUpperCase(),
                HQ: finalData[i].headquarters,
                TYPE: finalData[i].industry,
                YEAR: finalData[i].financial,
                TIER: finalData[i].tier,
                QTR: finalData[i].quarter,
                PRIOR: "",
                OWNER: finalData[i].owner,
                EB: "",
                ['CASE/MTH']: finalData[i].CasePerMonth,
                ['AVG VAL']: finalData[i].AverageValue,
                ['UNIVERSE-REV']: finalData[i].universalRevenue,
                MTS: finalData[i].Months,
                ['% Share']: finalData[i].PerShare,
                ['VERIFACTS SHARE']: finalData[i].verifactsShare,
                ['VF CASES PER MONTH']: finalData[i].CasePerMonth,
                TYPE: "",
                Meeting: finalData[i].meetingDate,
                ['Vendor 1']: "",
                Name: finalData[i].bde.name,
                des: finalData[i].designation,
                ['Email id']: finalData[i].email,
                ['Follow up date']: followupData[0] ? followupData[0].followupDate : "",
                Status: finalData[i].status,
                Remarks: finalData[i].otherDetails
            }
        }
        console.log(sortedFinalData)

        console.log("Got all data now dumping to xlsx....")

        const newWB = xlsx.utils.book_new()
        const newWS = xlsx.utils.json_to_sheet(sortedFinalData)
        xlsx.utils.book_append_sheet(newWB, newWS, "Checks in Sales Client")
        xlsx.writeFile(newWB, path.join(__dirname, "Checks In Sales Clients.xlsx"))
        res.download(path.join(__dirname, "Checks In Sales Clients.xlsx"))
        setTimeout(() => {
            var filePath = path.join(__dirname, "Checks In Sales Clients.xlsx");
            fs.unlinkSync(filePath);
            console.log("file deleted")
        }, 4000)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server Error." + err })
    }

}