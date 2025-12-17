const Case = require("../../models/uploads/case.model")
const UserSubclientAccess = require("../../models/administration/user_subclient_access.model")
const Component = require("../../models/administration/component.model")
const CourtRecord = require("../../models/data_entry/courtrecord.model")
const ComponentField = require("../../models/administration/component_field.model")
const ColorMaster = require('../../models/administration/color_master.model')
const Client = require("../../models/administration/client.model")
const mongoose = require("mongoose")
const { default: axios } = require("axios")


exports.getCase = async (req, res) => {
    try {
        const caseId = req.query.caseid
        const caseData = await Case.findOne({ caseId: caseId })
        if (!caseData) {
            return res.status(400).json({ message: "no case found for the case Id" })
        }

//        let userSubclientAccessData = await UserSubclientAccess.findOne({ $and: [{ subclient: caseData.subclient }, { user: req.user.user_id }] })

  //       if (!userSubclientAccessData) {
    //         return res.status(403).json({ message: "Forbidden" })
      //   }
        const result = {
            _id: caseData._id,
            caseId: caseId,
            candidateName: caseData.candidateName,
            //status: caseData.status == "OUTPUTQC-ACCEPTED" ? "Completed" : "Pending",
            status: caseData.status,
        }
	      if(caseData.status == "OUTPUTQC-ACCEPTED"){
		result.caseCompletionDate = caseData.outputqcCompletionDate
            	result.bgvgrade =  caseData.grade != null ? await getColorCodeName(caseData.grade) : "" 
                }


        await addComponentDetails(caseData, result)
	addAggComponentStatus(result)
        return res.json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "could not fetch case status" })
    }
}



async function getColorCodeName(colorCode) {
    if (!mongoose.isValidObjectId(colorCode)) {
        return ""
    }
    const gradeData = await ColorMaster.findOne({ _id: colorCode })
    if (!gradeData) {
        return ""
    } else {
        return gradeData.name
    }
}

async function getCompletedStatus(colorCode) {
    const gradeData = await ColorMaster.findOne({ _id: colorCode })
    if (!gradeData) {
        return ""
    } else if (gradeData.name === "Green") {
        return "Verified Clear"
    } else if (gradeData.name === "Amber") {
        return "Unable to Verify"
    } else if (gradeData.name === "Red") {
        return "Discrepancy"
    } else if (gradeData.name === "Grey") {
        return "Stop Check"
    }
}

async function addComponentDetails(caseData, resultObj) {
    	let allComponents = await Component.find({},{name:1})
        let actualComponents = allComponents.map(item => item.name)
	//let actualComponents = caseData.actualComponents
        if (actualComponents.includes("courtrecord")) {
            const courtRecordData = await CourtRecord.find({ case: caseData._id })
            let status = ""
            let grade = ""
            let isGreen = false
	    let isAmber = false
            let isRed = false
            let isGrey = false
            for (let i = 0; i < courtRecordData.length; i++) {
                const item = courtRecordData[i]
                if (item.status != "OUTPUTQC-ACCEPTED" && item.status != "MENTOR-REVIEW-ACCEPTED") {
                    status = item.status
                }

                if (item.grade == "602f8b3743383ec9a722496f") {
                    isRed = true
                }
		     if (item.grade == "602f8b3743383ec9a7224970") {
                    isAmber = true
                }
                if (item.grade == "602f8b3743383ec9a722496e") {
                    isGreen = true
                }
                if (item.grade == "63c8df0c3d7db9cb051e4032") {
                    isGrey = true
                }

            }

      if (resultObj.courtRecordStatus != "Pending") {
                if (isRed) {
                    grade = "602f8b3743383ec9a722496f"
                    resultObj.courtRecordGrade = "Red"
                }else if(isAmber){
			grade = "602f8b3743383ec9a7224970"
			                    resultObj.courtRecordGrade = "Amber"
		}else if (isGreen) {
                    grade = "602f8b3743383ec9a722496e"
                    resultObj.courtRecordGrade = "Green"
                } else if (isGrey) {
                    grade = "63c8df0c3d7db9cb051e4032"
                    resultObj.courtRecordGrade = "Grey"
                }
            }
            resultObj.courtRecordStatus = status == "" ? await getCompletedStatus(grade) : "Pending"
        }
	console.log("ACTUAL COMPONENTS:", actualComponents)
        while (actualComponents.length) {
            const currComponent = actualComponents[0]
            const model = require(`../../models/data_entry/${currComponent}.model`)
            const modelData = await model.find({ case: caseData._id })
            const componentData = await Component.findOne({ name: currComponent })
            resultObj[`${currComponent}Details`] = []

            for (let i = 0; i < modelData.length; i++) {

                const item = modelData[i]
                const componentDetails = {
                    component: componentData.name,
                    status: item.status == "OUTPUTQC-ACCEPTED" || item.status == "MENTOR-REVIEW-ACCEPTED" ? "Completed" : "Pending",
                    gradingColor: item.grade ? await getColorCodeName(item.grade) : "",
                    gradingRemarks: item.gradingComments ? item.gradingComments : "",
                    componentId: item._id,
                }
                await addApplicationStatusAndDescription(item, componentDetails)
                resultObj[`${currComponent}Details`].push(componentDetails)
            }
            actualComponents = actualComponents.filter(comp => comp != currComponent)
        }

}


async function addApplicationStatusAndDescription(item, componentDetails) {
    if (item.status == "DE-ALLOCATED") {
        componentDetails.applicationStatus = "DE-ALLOCATED"
        componentDetails.description = "Data Entry Started"
    } else if (item.status == "DE-COMPLETED") {
        componentDetails.applicationStatus = "DE-COMPLETED"
        componentDetails.description = "Data Entry Completed"
    } else if (item.status == "INPUTQC-ACCEPTED") {
        componentDetails.applicationStatus = "INPUTQC-ACCEPTED"
        componentDetails.description = "Data Entry Validation - Accepted"
    } else if (item.status == "INPUTQC-REJECTED") {
        componentDetails.applicationStatus = "INPUTQC-REJECTED"
        componentDetails.description = "Data Entry Validation - Rejected"
    } else if (item.status == "VERIFICATION-COMPLETED") {
        componentDetails.applicationStatus = "VERIFICATION-COMPLETED"
        componentDetails.description = "Verification Completed"
    } else if (item.status == "MENTOR-REVIEW-ACCEPTED") {
        componentDetails.applicationStatus = "MENTOR-REVIEW-ACCEPTED"
        componentDetails.description = "Mentor Review - Accepted"
    } else if (item.status == "MENTOR-REVIEW-REJECTED") {
        componentDetails.applicationStatus = "MENTOR-REVIEW-REJECTED"
        componentDetails.description = "Mentor Review - Rejected"
    } else if (item.status == "OUTPUTQC-ACCEPTED") {
        componentDetails.applicationStatus = "OUTPUTQC-ACCEPTED"
        componentDetails.description = "BGV Completed and Accepted"
    } else if (item.status == "OUTPUTQC-REJECTED") {
        componentDetails.applicationStatus = "OUTPUTQC-REJECTED"
        componentDetails.description = "BGV Completed and Rejected"
    } else if (item.status == "ALLOCATE-TO-VENDOR") {
        componentDetails.applicationStatus = "ALLOCATE-TO-VENDOR"
        componentDetails.description = "Allocated to vendor for verification."
    } else if (item.status == "INSUF-1-REQ-ACCEPTED") {
        componentDetails.insufficiencyRaisedDate = item.insufficiencyRaisedDate
        componentDetails.insufficiencyComments = item.insufficiencyComments
        componentDetails.applicationStatus = "INSUF-1-REQ-ACCEPTED"
        componentDetails.description = "First Insufficiency Raised."
        const componentData = await ComponentField.findOne({ component: item.component })
        componentDetails.insufficiency = [{
            insuffLabel: item.shortdescription ? item.shortdescription : "",
            insuffType: item.insuffType ? item.insuffType : ""
        }]

    } else if (item.status == "INSUF-2-REQ-ACCEPTED") {
        componentDetails.insufficiencyRaisedDate = item.insufficiencyRaisedDate
        componentDetails.insufficiencyComments = item.insufficiencyComments
        componentDetails.applicationStatus = "INSUF-2-REQ-ACCEPTED"
        componentDetails.description = "Second Insufficiency Raised."
        const componentData = await ComponentField.findOne({ component: item.component })
        componentDetails.insufficiency = [{
            insuffLabel: item.shortdescription ? item.shortdescription : "",
            insuffType: item.insuffType ? item.insuffType : ""
        }]
    } else if (item.status == "INSUF-3-REQ-ACCEPTED") {
        componentDetails.insufficiencyRaisedDate = item.insufficiencyRaisedDate
        componentDetails.insufficiencyComments = item.insufficiencyComments
        componentDetails.applicationStatus = "INSUF-3-REQ-ACCEPTED"
        componentDetails.description = "Third Insufficiency Raised."
        const componentData = await ComponentField.findOne({ component: item.component })
        componentDetails.insufficiency = [{
            insuffLabel: item.shortdescription ? item.shortdescription : "",
            insuffType: item.insuffType ? item.insuffType : ""
        }]

    } else if (item.status == "INSUF-4-REQ-ACCEPTED") {
        componentDetails.insufficiencyRaisedDate = item.insufficiencyRaisedDate
        componentDetails.insufficiencyComments = item.insufficiencyComments
        componentDetails.applicationStatus = "INSUF-4-REQ-ACCEPTED"
        componentDetails.description = "Fourth Insufficiency Raised."
        const componentData = await ComponentField.findOne({ component: item.component })
        componentDetails.insufficiency = [{
            insuffLabel: item.shortdescription ? item.shortdescription : "",
            insuffType: item.insuffType ? item.insuffType : ""
        }]

    } else if (item.status == "INSUF-5-REQ-ACCEPTED") {
        componentDetails.insufficiencyRaisedDate = item.insufficiencyRaisedDate
        componentDetails.insufficiencyComments = item.insufficiencyComments
        componentDetails.applicationStatus = "INSUF-5-REQ-ACCEPTED"
        componentDetails.description = "Fifth Insufficiency Raised."
        const componentData = await ComponentField.findOne({ component: item.component })
        componentDetails.insufficiency = [{
            insuffLabel: item.shortdescription ? item.shortdescription : "",
            insuffType: item.insuffType ? item.insuffType : ""
        }]

    }
}

exports.sendCaseStatusToMercedes = async (req, res) => {
    try {
        const allCaseStatus = []
        const clients = await Client.find({ name: /MBRDI-/ })
        const clientIds = clients.map(client => client._id)
        const allMercCases = await Case.find({ client: { $in: clientIds } })

        console.log("Got All the merc cases...")

        const accessToken = req.headers['authorization'].split(" ")[1]
        console.log("accessToken:", accessToken)
        const headers = {
            authorization: `bearer ${accessToken}`
        }

        for (let i = 0; i < allMercCases.length; i++) {
            const caseId = allMercCases[i].caseId
            try {
                const response = await axios.get(`https://vibe.verifacts.co.in/api/apigetcaseroutes/GetCaseStatus?caseid=${caseId}`, { headers: headers })
                allCaseStatus.push(response.data)
            } catch (err) {
                console.log("Could not get data for case Id: ", caseId)
                continue
            }
        }

        for (let i = 0; i < allCaseStatus.length; i++) {
            try {
                await axios.post("https://mbrdi-documentation-stag.mercedes-benz.com/hrpad/api/v1/vendor/status/31", allCaseStatus[i])
            } catch (err) {
                console.log("Could not send data for case Id: ", caseId)
                continue
            }
        }

        return res.json({ message: "sent all case statuses successfully." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "could not send case status to mercedes due to an internal server error:" + error })
    }
}

function addAggComponentStatus(item){
	const componentDetails = Object.keys(item).filter(comp => comp.includes("Details"))
	let hasAmber = false
	let hasGreen = false
	for(let i=0; i<componentDetails.length; i++){
		
		let currComponent = componentDetails[i]
		for(let j=0; j<item[currComponent].length; j++){
			let currDetailsItem = item[currComponent][j]
			console.log(currDetailsItem)
   			if(currDetailsItem.gradingColor == "Red"){
                        	item.aggComponentStatus = "Red"
                        	return
                	}
                	if(currDetailsItem.gradingColor == "Amber"){
                        	hasAmber = true
                	}
                	if(currDetailsItem.gradingColor == "Green"){
                        	hasGreen = true
                	}

		}

	}

	if(hasAmber){
		item.aggComponentStatus = "Amber"
		return
	}
	else if(hasGreen) {
		item.aggComponentStatus = "Green"
		return
	}
}
