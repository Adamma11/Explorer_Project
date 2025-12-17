const Case = require('../../models/uploads/case.model');
const Client = require('../../models/administration/client.model')
const Subclient = require('../../models/administration/subclient.model')
const Component = require("../../models/administration/component.model")
const caseHistory = require('../data_entry/case_history.controller')
const moment = require('moment');
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const user_subclient_access = require('../../models/administration/user_subclient_access.model');
const path = require("path")
const fs = require("fs")

exports.create = async (req, res) => {
	console.log(req.files)
    try {
        if (!req.body.clientName) {
            return res.status(400).json({ error: "Please provide client name" })
        }
        if (!req.body.subclientName) {
            return res.status(400).json({ error: "Please provide subclient name" })
        }

        const clientData = await Client.findOne({ name: req.body.clientName })
        const subclientData = await Subclient.findOne({ name: req.body.subclientName, client: clientData._id })
 	const latestCaseId = await getLatestCaseId(clientData)
        //const latestCaseId = await getLatestCaseId()
	    console.log("latestCaseId:", latestCaseId)

        const componentsToCheck = JSON.parse(req.body.componentsToCheck);
	 let componentTocheckArray =[]
        for(let compDetails of componentsToCheck){
            let details = await Component.findOne({name:compDetails.componentName})
             if (details) {
                componentTocheckArray.push({
                    component: details._id,
                    componentName: details.name
                });
            }
        }
	  // console.log("COM",componentsToCheck)

        const caseData = new Case({
            caseId: latestCaseId,
            candidateName: req.body.candidateName,
            employeeId: req.body.empid,
            client: clientData._id,
            subclient: subclientData._id,
            initiationDate: new Date(),
            status: "DE-COMPLETED",
	    componentsToCheck: componentTocheckArray
	})

	let formattedDob = null;

	if (req.body.dateofbirth) {
  // Expecting DD/MM/YYYY format
  	const parts = req.body.dateofbirth.split('/');
 	 if (parts.length === 3) {
    	const [day, month, year] = parts;
    	formattedDob = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
  }
}
        const personalDetailsData = new PersonalDetailsData({
            case: caseData._id,
            name: req.body.candidateName,
	    fathername: req.body.fathername,
        //    dateofbirth: new Date(req.body.dateofbirth),
   	dateofbirth: formattedDob ? new Date(formattedDob) : null,
            aadhernumber: req.body.aadhernumber,
	    pancard: req.body.pancard,
	    number: req.body.number,
	    emailid: req.body.emailid,
            employeeid: req.body.employeeid,
            doj: req.body.doj,
            process: req.body.process,
	    location: req.body.location,	
	    status: "DE-COMPLETED",
            dataEntryCompletionDate: new Date(),
            modifiedBy: req.user.user_id,
        })

        await caseData.save()
        await personalDetailsData.save()

        for (let i = 0; i < componentsToCheck.length; i++) {
            const currcomponent = componentsToCheck[i]
	     console.log("CURRE",currcomponent)	
            const componentData = await Component.findOne({ name: currcomponent.componentName })
            const model = require(`../../models/data_entry/${currcomponent.componentName}.model`)
            delete currcomponent.componentName
            const modelData = new model({
                ...currcomponent,
                case: caseData._id,
                creationDate: new Date(),
                createdBy: req.user.user_id,
                creationDate: new Date(),
                client: clientData._id,
                subclient: subclientData._id,
                component: componentData._id,
                personalDetailsData: personalDetailsData._id,
                status: "DE-COMPLETED",
                dataEntryCompletionDate: new Date(),
            })

            await modelData.save()
	   console.log("MODEL",modelData)	
        }

	    await moveUploadedFiles(req.files, `/REPO_STORAGE/case_uploads/${caseData.caseId}/`)

        return res.status(201).json(caseData)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}

async function moveUploadedFiles(files, destinationDir) {
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }

    const movePromises = [];

    for (const key in files) {
        const fileData = files[key];

        // If multiple files under same key, it's an array
        const fileArray = Array.isArray(fileData) ? fileData : [fileData];

        for (const file of fileArray) {
            const targetPath = path.join(destinationDir, file.name);

            const movePromise = new Promise((resolve, reject) => {
                file.mv(targetPath, (err) => {
                    if (err) return reject(err);
                    resolve(targetPath);
                });
            });

            movePromises.push(movePromise);
        }
    }

    return Promise.all(movePromises);
}

/*async function getLatestCaseId() {
    let currDate = moment();
    let findString = `${currDate.format("YY")}${currDate.format(
        "MM"
    )}${currDate.format("DD")}.*`;
    console.log("find string is ", findString);
    const cases = await Case.find({ caseId: { $regex: findString, $options: "i" } })

    let caseId =
        currDate.format("YY") +
        currDate.format("MM") +
        currDate.format("DD") +
        "A0001" +
        "B";
    console.log(caseId)
    if (cases.length == 0) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "A0001" +
            "B";
        console.log("Case Id is ", caseId);

    } else if (cases.length > 0 < 9999) {
        console.log("in cases between 0 to 9999");
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "A" +
            ("0000" + (cases.length + 1)).slice(-4) +
            "B";
        console.log("Case Id is ", caseId);
    } else if (cases.length >= 9999 < 19998) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "B" +
            ("0000" + (cases.length - 9999 + 1)).slice(4) +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 19998 < 29997) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "C" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 29997 < 39996) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "D" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 39996 < 49995) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "E" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 49995 < 59994) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "F" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 59994 < 69993) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "G" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 69993 < 79992) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "H" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 79992 < 89991) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "I" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 89991 < 99990) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "J" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 99990 < 109989) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "K" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 109989 < 110988) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "L" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 110988 < 120987) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "M" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 120987 < 130986) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "N" +
            cases.length +
            1 +
            "B";
    } else if (cases.length >= 130986 < 140985) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "O" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 140985 < 150984) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "P" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 150984 < 160983) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "Q" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 160983 < 170982) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "R" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 170982 < 180981) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "S" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 180981 < 190980) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "T" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 190980 < 200979) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "U" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 200979 < 210978) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "V" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 210978 < 220977) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "W" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 220977 < 230976) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "X" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 230976 < 240975) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "Y" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    } else if (cases.length >= 240975 < 250974) {
        caseId =
            currDate.format("YY") +
            currDate.format("MM") +
            currDate.format("DD") +
            "Z" +
            cases.length +
            1 +
            "B";
        console.log("caseId:", caseId)

    }
    console.log("caseId last:", caseId)

    return caseId
}*/
async function getLatestCaseId(clientData) {
    try {
        console.log("creating case",clientData)
        let findString = `A${clientData.clientCode}*`;
        console.log("findString-",findString)
         let caseId;
          const caseData = await Case.find({ caseId: { "$regex": findString, "$options": "i" }, client: clientData._id }).sort({ initiationDate: -1 }).limit(10)

        console.log("caseData:", caseData)

            if (caseData && caseData.length) {
        console.log("Client Code Length:", clientData.clientCode.length)
                const sortedData = caseData.sort((a, b) => {
                    Number(a.caseId.slice(clientData.clientCode.length + 1)) > Number(b.caseId.slice(clientData.clientCode.length + 1))
                })

                const latestCaseId = sortedData[0].caseId
                caseId = appendLatestCaseId(latestCaseId);

                function appendLatestCaseId(caseId) {
                    console.log("latest case id:", caseId)
                    const caseNumber = Number(caseId.slice(clientData.clientCode.length + 1));
                    let newNumber = caseNumber + 1
                    console.log("Case number and new number are: ", caseNumber, newNumber)
                    caseId = caseId.slice(0, clientData.clientCode.length + 1) + newNumber
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
            caseId = `A${clientData.clientCode}1`
        }
        return caseId
    } catch (error) {
        console.log("Error creating caseId in getLatestCaseId function", error)
    }
}
