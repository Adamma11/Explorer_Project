const Case = require('../../models/uploads/case.model');
const Client = require('../../models/administration/client.model')
const Subclient = require('../../models/administration/subclient.model')
const caseHistory = require('../data_entry/case_history.controller')
const moment = require('moment');
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const user_subclient_access = require('../../models/administration/user_subclient_access.model');
const client_contract_packageModel = require('../../models/administration/client_contract_package.model');
const client_contract_profileModel = require('../../models/administration/client_contract_profile.model');
const ClientContract = require("../../models/administration/client_contract.model")
const Component = require("../../models/administration/component.model")
const componentField = require("../../models/administration/component_field.model")

exports.create = async (req, res) => {
   try {
       if (!req.body.candidateName) {
           return res.status(400).json({ message: "candidateName Cannot be empty" });
       }
       if (!req.body.gender) {
           return res.status(400).json({ message: "gender cannot be empty" });
       }
       if (!req.body.dateofbirth) {
           return res.status(400).json({ message: "dateofbirth cannot be empty" })
       }
       if (!req.body.uniqueid) {
           return res.status(400).json({ message: "uniqueid cannot be empty" })
       }
       if (!req.body.mobilenumber) {
           return res.status(400).json({ message: "mobilenumber cannot be empty" })
       }
       if (!req.body.empid) {
           return res.status(400).json({ message: "empid cannot be empty" })
       }
       if (!req.body.dateofjoining) {
           return res.status(400).json({ message: "dateofjoining cannot be empty" })
       }
       if (!req.files) {
           return res.status(400).json({ message: "upload files not present" })
       }
	
	const pdData = await PersonalDetailsData.findOne({uniqueid: req.body.uniqueid, empid: req.body.empid})
console.log("pdData:", pdData)
	   if(pdData){
		return res.status(400).json({error: "Case already exists with empid and uniqueid"})
	   }

       let currDate = moment();
       let clientData = await Client.findOne({ name: req.body.clientName })
       client = clientData._id
       let subclientData = await Subclient.findOne({ $and: [{ name: req.body.subclientName }, { client: client }] })
       subclient = subclientData._id
       let userSubclientAccessData = await user_subclient_access.findOne({ $and: [{ subclient: subclient }, { user: req.user.user_id }] })
       console.log(userSubclientAccessData)

       if (!userSubclientAccessData) {
           return res.status(403).json({ message: "Forbidden" })
       }

       const client_id = await findClient(req)
       const subclient_id = await findSubclient(req, client_id)

       if (client_id == null && subclient_id == null) {
           return res.status(403).json("Forbidden")
       }
      
        let findString = `A${clientData.clientCode}*`;
        console.log('find string is ', findString);	   

       let caseId;
       // Quesrying the latest case id for that clinet
       const caseData = await Case.find({ caseId: { "$regex": findString, "$options": "i" } }).sort({ initiationDate: -1 }).limit(5)

       if (caseData.length) {
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
           caseId = appendLatestCaseId(latestCaseId);
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
       await createCase(caseId);

       async function createCase(caseId) {
           console.log('about to create the case body is ', req.body);
           //let intTat = req.body.tat - 1;
           //console.log("moment is ", moment().add(intTat, 'days'));


           let package_id = null
           let profile_id = null

           let client = await Client.findOne({ name: req.body.clientName })
           client = client._id
           const clientContractData = await ClientContract.findOne({ client: client })
           if (req.body.package) {
               console.log("package:", req.body.package)

               const packageData = await client_contract_packageModel.findOne({ name: req.body.package, clientContract: clientContractData._id })
		    console.log("packageData:", packageData)
               package_id = packageData._id
           }
           if (req.body.profile) {
               console.log("profile:", req.body.profile)
               const profileData = await client_contract_profileModel.findOne({ name: req.body.profile, clientContract: clientContractData._id })
               profile_id = profileData._id
           }


           const caseToCreate = new Case({
               caseId: caseId,
               client: client,
               subclient: subclient,
               candidateName: req.body.candidateName,
               employeeId: req.body.empId,
               initiationDate: new Date(),
               //tatEndDate: moment().add(intTat, 'days').toDate(),
		package: package_id,
		profile: profile_id,   
               ///package: req.body.package,
               //profile: req.body.profile,
               //status: req.body.status,
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
           const caseCreated = await caseToCreate.save(caseToCreate)

           console.log("created case")
           console.log("Files uploaded:", req.files)
           caseHistory.create(caseCreated._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id);
           const fileNames = Object.keys(req.files)
           console.log("Filenames:", fileNames)
           for (let i = 0; i < fileNames.length; i++) {
               const file = req.files[fileNames[i]];
               console.log("File is:", file)
               const filePath = `/REPO_STORAGE/case_uploads/${caseId}/${file.name}`;

               await new Promise((resolve, reject) => {
		       if(!file.mv){
			       resolve()
		       }

                    file.mv(filePath, function (err) {
                       if (err) {
                           return res.status(500).send(err);
                       }
                       resolve()
                   });
               })
           }

           let personalDetails = await createPersonalDetailsData(req, caseCreated._id)
           let componentsToCheck = req.body.componentsToCheck

           if (componentsToCheck && componentsToCheck.length > 0) {
               for (let i = 0; i < componentsToCheck.length; i++) {
                   const item = componentsToCheck[i]
                   await createModelDetails(caseCreated._id, client_id, subclient_id, personalDetails._id, item)
               }
           }

	await Case.findOneAndUpdate({_id: caseCreated._id}, {personalDetails: personalDetails._id})
           return res.status(201).json(caseCreated)

       }

   } catch (err) {
       console.log(err)
       return res.status(500).json({ error: err.message })
   }
}

async function createModelDetails(case_id, client, subclient, personalDetails_id, item) {

   const componentData = await Component.findOne({ name: item.name })
   const model = require(`../../models/data_entry/${item.name}.model`)
   const componentFieldData = await componentField.find({ component: componentData._id })


   const dataToDB = {
       case: case_id,
       client: client,
       subclient: subclient,
       personalDetailsData: personalDetails_id,
       component: componentData._id,
       status: "DE-COMPLETED",
       modifiedBy: null
   }

   for (let i = 0; i < componentFieldData.length; i++) {
       const currField = componentFieldData[i].name
       dataToDB[currField] = item[currField]
   }

   const modelData = new model(dataToDB);
   await modelData.save()
}


async function createPersonalDetailsData(req, case_id) {
   const personalDetailsData = new PersonalDetailsData({
       case: case_id,
	   name: req.body.candidateName,
fathername: req.body.fathername,
dateofbirth: new Date(req.body.dateofbirth),
number: req.body.mobilenumber,
emailid: req.body.emailid,
empid: req.body.empid,
uniqueid: req.body.uniqueid,
employeeid: req.body.employeeid,
doj: req.body.dateofjoining ? moment( req.body.dateofjoining) : null,
process: req.body.process,
location: req.body.location,
aadhernumber: req.body.aadhernumber,
pancard: req.body.pancard,
       /*candidatename: req.body.candidateName,
       fathername: req.body.fathername,
       gender: req.body.gender,
       //dateofbirth: moment("DD/MM/YYYY", req.body.dateofbirth),
	dateofbirth: new Date(req.body.dateofbirth),	   
       uniqueid: req.body.uniqueid,
       mobilename: req.body.mobilenumber,
       empid: req.body.empid,
       dateofjoining: req.body.dateofjoining ? moment("DD/MM/YYYY", req.body.dateofjoining) : null,*/
   })
   await personalDetailsData.save()
	return personalDetailsData
}




async function findClient(req) {
   const data = await Client.findOne({ name: req.body.clientName })
   return data._id
}

async function findSubclient(req, client_id) {
   const data = await Subclient.findOne({ client: client_id, name: req.body.subclientName })
   return data._id
}

