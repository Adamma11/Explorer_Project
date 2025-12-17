const Case = require('../../models/uploads/case.model');
const Client = require('../../models/administration/client.model')
const Subclient = require('../../models/administration/subclient.model')
const caseHistory = require('../data_entry/case_history.controller')
const moment = require('moment');
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const Address = require('../../models/data_entry/address.model')
const AddressComprehensive = require('../../models/data_entry/addresscomprehensive.model')
const AddressOnline = require('../../models/data_entry/addressonline.model')
const AddressTelephone = require('../../models/data_entry/addresstelephone.model')
const BankStmt = require('../../models/data_entry/bankstmt.model')
const CourtRecord = require('../../models/data_entry/courtrecord.model')
const CreditCheck = require('../../models/data_entry/creditcheck.model')
const CreditEquifax = require('../../models/data_entry/creditequifax.model')
const CreditTrans = require('../../models/data_entry/credittrans.model')
const CriminalRecord = require('../../models/data_entry/criminalrecord.model')
const DirectorshipCheck = require('../../models/data_entry/directorshipcheck.model')
const DlCheck = require('../../models/data_entry/dlcheck.model')
const DrugTestFive = require('../../models/data_entry/drugtestfive.model')
const DrugTestSix = require('../../models/data_entry/drugtestsix.model')
const DrugTestSeven = require('../../models/data_entry/drugtestseven.model')
const DrugTestEight = require('../../models/data_entry/drugtesteight.model')
const DrugTestNine = require('../../models/data_entry/drugtestnine.model')
const DrugTestTen = require('../../models/data_entry/drugtestten.model')
const Education = require('../../models/data_entry/education.model')
const EducationAdvanced = require('../../models/data_entry/educationadvanced.model')
const EducationComprehensive = require('../../models/data_entry/educationcomprehensive.model')
const Employment = require('../../models/data_entry/employment.model')
const EmpAdvance = require('../../models/data_entry/empadvance.model')
const EmpBasic = require('../../models/data_entry/empbasic.model')
const FacisL3 = require('../../models/data_entry/facisl3.model')
const GapVfn = require('../../models/data_entry/gapvfn.model')
const GlobalDatabase = require('../../models/data_entry/globaldatabase.model')
const Identity = require('../../models/data_entry/identity.model')
const Ofac = require('../../models/data_entry/ofac.model')
const Passport = require('../../models/data_entry/passport.model')
const Psychometric = require('../../models/data_entry/physostan.model')
const RefBasic = require('../../models/data_entry/refbasic.model')
const Reference = require('../../models/data_entry/reference.model')
const SiteCheck = require('../../models/data_entry/sitecheck.model')
const SocialMedia = require('../../models/data_entry/socialmedia.model')
const VddAdvance = require('../../models/data_entry/vddadvance.model')
const VoterId = require('../../models/data_entry/voterid.model');
const user_subclient_access = require('../../models/administration/user_subclient_access.model');
// const { UpdateFields } = require('docx/build/file/settings');


exports.create = async (req, res) => {
    /*    if(!req.body.client){
            res.status(400).json({message:"Client Cannot be empty"});
    
        }
        if(!req.body.subclient){
            res.status(400).json({message:"Subclient Cannot be empty"});
        }*/
    try {

        let client = await Client.findOne({ name: req.body.clientName })
        client = client._id
        let subclient = await Subclient.findOne({ $and: [{ name: req.body.subclientName }, { client: client }] })
        subclient = subclient._id
        let userSubclientAccessData = await user_subclient_access.findOne({ $and: [{ subclient: subclient }, { user: req.user.user_id }] })
        console.log(userSubclientAccessData)

        if (!userSubclientAccessData) {
            return res.status(403).json({ message: "Forbidden" })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Error Fetching data"
        })
    }
    console.log("In first source create controller")
    let findClient = function () {
        return new Promise((resolve, reject) => {
            Client
                .findOne({ name: req.body.clientName })
                .then(data => {
                    resolve(data._id)
                })
                .catch(err => {
                    console.log("Client not found", err)
                    resolve(null)
                })

        })
    }

    let findSubclient = function (client_id) {
        return new Promise((resolve, reject) => {
            Subclient
                .findOne({ client: client_id, name: req.body.subclientName })
                .then(data => {
                    resolve(data._id)
                })
                .catch(err => {
                    console.log("Subclient not found", err)
                    resolve(null)
                })

        })
    }
    let createPersonalDetailsData = function (case_id) {
        return new Promise((resolve, reject) => {
            let personalDetailsData = new PersonalDetailsData({
                case: case_id,
                candidatename: req.body.candidateName,
                fathername: req.body.fathername,
                gender: req.body.gender,
                dateofbirth: moment.utc(req.body.dateofbirth, "YYYY-MM-DD"),
                uniqueid: req.body.uniqueid,
                mobilename: req.body.mobilenumber,
                empid: req.body.empid,
                dateofjoining: moment.utc(req.body.dateofjoining, "YYYY-MM-DD")

            })
            personalDetailsData
                .save(personalDetailsData)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createAddressDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const address = new Address({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "602f71a5767164c5698f4e36",
                address: item.address,
                landmark: item.landmark,
                pin: item.pin,
                city: item.city,
                typeofaddress: item.typeofaddress,
                tenureofstay: item.tenureofstay,
                primarycontact: item.primarycontact,
                alternatecontact: item.alternatecontact,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            address.save(address)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createAddressComprehensiveDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const addresscomprehensive = new AddressComprehensive({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "60544bd8b52c89b892ea6ee7",
                fulladdress: item.fulladdress,
                landmark: item.landmark,
                pin: item.pin,
                city: item.city,
                typeofaddress: item.typeofaddress,
                tenureofstay: item.tenureofstay,
                primarycontact: item.primarycontact,
                alternatecontact: item.alternatecontact,
                typeofstay: item.typeofstay,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            addresscomprehensive
                .save(addresscomprehensive)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createAddressOnlineDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const addressonline = new AddressOnline({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "606efaece72ab301d6133f6f",
                fulladdwithpin: item.fulladdwithpin,
                landmark: item.landmark,
                pin: item.pin,
                city: item.city,
                typeofaddress: item.typeofaddress,
                tenure: item.tenure,
                primarycontact: item.primarycontact,
                alternatecontact: item.alternatecontact,
                typeofstay: item.typeofstay,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            addressonline.save(addressonline)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })


        })
    }
    let createAddressTelephoneDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const addresstelephone = new AddressTelephone({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "605449a546251ab860829fc0",
                address: item.address,
                landmark: item.landmark,
                pin: req.item.pin,
                city: item.city,
                typeofaddress: item.typeofaddress,
                tenureofstay: item.tenureofstay,
                primarycontact: item.primarycontact,
                alternatecontact: item.alternatecontact,
                typeofstay: item.typeofstay,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            addresstelephone.save(addresstelephone)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }
    let createBankStatementDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const bankstmt = new BankStmt({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: null,
                tenure: item.tenure,
                nameofbank: item.nameeofbank,
                transaction: item.transaction,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            bankstmt.save(bankstmt)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })


        })
    }
    let createCourtRecordDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const courtrecord = new CourtRecord({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "602f7257008606c587b934ca",
                addresswithpin: item.addresswithpin,
                pin: item.pin,
                city: item.city,
                typeofaddress: item.typeofaddress,
                tenure: item.tenure,
                status: "DE-COMPLETED",
                modifiedBy: null

            });
            courtrecord.save(courtrecord)
                .then(data => {
                    resolve(data)

                }
                )
                .catch(err => {
                    resolve(null)
                }
                )

        })
    }
    let createCreditCheckDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const creditcheck = new CreditCheck({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "602f73ce609eabc5e0d13e33",
                taxid: item.taxid,
                nameasperpan: item.nameasperpan,
                dateofbirth: item.dateofbirth,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            creditcheck.save(creditcheck)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }
    let createCreditEquifaxDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const creditcheck = new CreditCheck({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6065b9bbfdbfaea3c44aa5a5",
                pannumber: item.pannumber,
                panname: item.panname,
                dobofpan: item.dobofpan,
                gender: item.gender,
                fulladdress: item.fulladdress,
                contact: item.contact,
                altcontact: item.altcontact,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            creditcheck.save(creditcheck)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }
    let createCreditTransDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const creditcheck = new CreditCheck({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6065b92e2d6c05a39aba8258",
                pannumber: item.pannumber,
                nameasperpan: item.nameasperpan,
                dateofbirth: item.dateofbirth,
                gender: item.gender,
                fulladdress: item.fulladdress,
                contact: item.contact,
                altcontact: item.altcontact,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            creditcheck.save(creditcheck)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }
    let createCriminalRecordDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const criminalrecord = new CriminalRecord({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "602f72eb94a515c5aa3c209f",
                fulladdress: item.fulladdress,
                pin: item.pin,
                city: item.city,
                typeofaddress: item.typeofaddress,
                tenureofstay: item.tenureofstay,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            criminalrecord.save(criminalrecord)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createDirectorshipCheckDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const directroshipcheck = new DirectorshipCheck({
                case: req.body.case,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "606d620b6beffbc52a1fb0e7",
                directorname: item.directorname,
                dinnumber: item.dinnumber,
                dob: item.dob,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            directorshipcheck.save(directorshipcheck)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }
    let createDlCheckDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const dlcheck = new DlCheck({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6065f83b22c50dacc8d97933",
                dlnumber: item.dlnumber,
                nameperdl: item.nameperdl,
                dob: item.dob,
                issuedate: item.issuedate,
                status: "DE-COMPLETED",
                modifiedBy: null
            });

            dlcheck.save(dlcheck)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })

    }
    let createDrugTestFiveDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const drugtestfive = new DrugTestFive({
                case: case_id,
                personalDetailsData: personalDetails_id,
                client: client,
                subclient: subclient,
                component: "602f8e3243383ec9a72249c5",
                nameofemployee: item.nameofemployee,
                fulladdress: item.fulladdress,
                pin: item.pin,
                city: item.city,
                contact: item.contact,
                status: "DE-COMPLETED",
                modifiedBy: null
            });

        })
    }
    let createDrugTestSixDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const drugtestfive = new DrugTestFive({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6064914c73e66249830626e3",
                nameofemployee: item.nameofemployee,
                fulladdress: item.fulladdress,
                pin: item.pin,
                city: item.city,
                contact: item.contact,
                status: "DE-COMPLETED",
                modifiedBy: null
            });

        })
    }
    let createDrugTestSevenDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const drugtestfive = new DrugTestFive({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "60649a6b8259ac6f2c5198bc",
                nameofemploybee: item.nameofemployee,
                fulladdress: item.fulladdress,
                pin: item.pin,
                city: item.city,
                contactnumber: item.contact,
                status: "DE-COMPLETED",
                modifiedBy: null
            });

        })
    }


    let createEducationDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            let education = new Education({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetails: personalDetails_id,
                component: "602f6fcf3dcc71c537d43d87",
                nameofuniversity: item.nameofuniversity,
                nameofschool: item.nameofschool,
                cityofstudy: item.cityofstudy,
                typeofqualification: item.typeofqualification,
                qualification: item.qualification,
                specialization: item.specialization,
                rollnumber: item.rollnumber,
                yearofjoining: item.yearofjoining,
                yearofcompletion: item.yearofcompletion,
                marks: item.marks,
                status: "DE-COMPLETED"
            })
            if (req.body.status == 'DE-COMPLETED') {
                education.dataEntryCompletionDate = new Date()
            } else {
                education.insufficiencyComments = req.body.insufficiencyComments
            }
            education
                .save(education)
                .then(data => {
                    resolve(data)
                })

                .catch(err => {
                    resolve(null)
                })
        })
    }
    let createEducationAdvancedDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            let educationadvanced = new EducationAdvanced({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "60548d611f9391bcad4e9326",
                nameofuniverskty: item.nameofuniversity,
                nameofschool: req.item.nameofschool,
                cityofstudy: item.cityofstudy,
                typeofqualifiction: item.typeofqualifiction,
                qualification: item.qualification,
                specialization: item.specialization,
                rollnumber: item.rollnumber,
                yearofjoining: item.yearofjoining,
                yearofcompletion: item.yearofcompletion,
                marks: item.marks,
                status: item.status,
                modifiedBy: null
            });
            educationadvanced.save(educationadvanced)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(nul)
                })

        })
    }
    let createEducationComprehensiveDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const obj = new educationcomprehensive({
                case: case_id,
                personalDetailsData: personalDetails_id,
                client: client,
                subclient: subclient,
                component: "60547c9e779669b9d9dc084b",
                nameofuniversity: item.nameofuniversity,
                nameofschool: item.nameofschool,
                cityofstudy: item.cityofstudy,
                typeofqualification: item.typeofqualification,
                qualification: item.qualification,
                specialization: item.specialization,
                rollnumber: item.rollnumber,
                yearofjoining: item.yearofjoining,
                yearofcompletion: item.yearofcompletion,
                marks: item.marks,
                status: "DE-COMPLETED",
                modifiedBy: null
            });


        })
    }
    let createEmploymentAdvancedDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const empadvance = new EmpAdvance({
                case: case_id,
                personalDetailsData: personalDetails_id,
                client: client,
                subclient: subclient,
                component: "6065bf15565ec4a48601926c",
                nameofemployer: item.nameofemployer,
                branch: item.branch,
                deputedto: item.deputedto,
                empstatus: item.empstatus,
                empid: req.item.empid,
                doj: item.doj,
                lwd: item.lwd,
                designation: item.designation,
                remuneration: item.remuneration,
                reportingmgr: item.reportingmgr,
                reasonforleaving: item.reasonforleaving,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            empadvance.save(empadvance)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createEmploymentBasicDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const empbasic = new EmpBasic({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6065c2b9a8dac8a52a0486df",
                nameofemployer: item.nameofemployer,
                branch: item.branch,
                deputedto: item.deputedto,
                empstatus: item.empstatus,
                empid: item.empid,
                doj: item.doj,
                lwd: item.lwd,
                designation: item.designation,
                reportingmgr: item.reportingmgr,
                reasonforleaving: item.reasonforleaving,
                nameofrespond: item.nameofrespond,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            empbasic.save(empbasic)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createEmploymentDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const employment = new Employment({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "602f6d64dbb237c4d6072116",
                nameofemployer: item.nameofemployer,
                branch: item.branch,
                deputedto: item.deputedto,
                empstatus: item.empstatus,
                empid: item.empid,
                doj: item.doj,
                lwd: item.lwd,
                designation: item.designation,
                remuneration: item.remuneration,
                reportingmgr: item.reportingmgr,
                reasonforleaving: item.reasonforleaving,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            employment.save(employment)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createFacisL3Details = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const facisl3 = new FacisL3({
                case: case_id,
                personalDetailsData: personalDetails_id,
                client: client,
                subclient: subclient,
                component: "606581488e04dc97fea0e433",
                applicantname: item.applicantname,
                dateofbirth: item.dateofbirth,
                stcode: item.stcode,
                status: "DE-COMPLETED",
                modifiedBy: "null"
            });
            facisl3.save(facisl3)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })
        })
    }
    let createGapVfnDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const gapvfn = new GapVfn({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "606b0ee40fe1085f834a1ec4",
                tenureofgap: item.tenureofgap,
                reasonforgap: item.reasonforgap,
                address: item.address,
                PIN: item.PIN,
                CITY: item.CITY,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            gapvfn.save(gapvfn)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createGlobalDatabaseDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const globaldatabase = new GlobalDatabase({
                case: case_id,
                personalDetailsData: personalDetails_id,
                component: "602f74a0517c70c616f9ba39",
                searchname: item.searchname,
                dob: item.dob,
                gender: item.gender,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            globaldatabase.save(globaldatabase)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createIdentityDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const identity = new Identity({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "602f735df57438c5c52d1f60",
                typeofid: item.typeofid,
                nameasperid: item.nameasperid,
                idnumber: item.idnumber,
                issuedby: item.issuedby,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            identity.save(identity)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createOfacDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const ofac = new Ofac({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "60680eb5182170f43f510e0f",
                candname: item.candname,
                ofac: item.ofac,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            ofac.save(ofac)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })


        })
    }
    let createPassportDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const passport = new Passport({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6030c643af7247e81034b6e3",
                givenname: item.givenname,
                lastname: item.lastname,
                issuecountry: item.issuecountry,
                nationality: item.nationality,
                passportnumber: item.passportnumber,
                expirydate: item.expirydate,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            passport.save(passport)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createPsychometricTestDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const psychometric = new Psychometric({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6070071137820e23914a665a",
                name: item.name,
                emailid: item.emailid,
                contact: item.contact,
                gender: item.gender,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            psychometric.save(psychometric)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createRefBasicDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const refbasic = new RefBasic({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "606c570839276591c887105b",
                name: item.name,
                designation: item.designation,
                contact: item.contact,
                association: item.association,
                time: item.time,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            refbasic.save(refbasic)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createReferenceDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const reference = new Reference({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "602f753e9154edc63013c0bd",
                nameofreference: item.nameofreference,
                designation: item.designation,
                contactdetails: item.contactdetails,
                associationwithcandidate: item.associationwithcandidate,
                timerefereceknown: item.timerefereceknown,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            reference.save(reference)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createSiteCheckDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const sitecheck = new SiteCheck({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "607406e273e0903a1c248584",
                name: item.name,
                fulladdress: item.fulladdress,
                pin: item.pin,
                city: item.city,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            sitechec.save(sitecheck)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createSocialMediaDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const socialmedia = new SocialMedia({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "602f73e9d61734c5fac5587a",
                searchname: item.searchname,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            socialmedia.save(socialmedia)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createVddAdvanceDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const vddadvance = new VddAdvance({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6065e4a406c5aaa58e0a463f",
                companyname: item.companyname,
                regdadd: item.regdadd,
                cin: item.cin,
                pan: item.pan,
                gst: item.gst,
                status: "DE-COMPLETED",
                modifiedBy: null
            });
            vddadvance.save(vddadvance)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    resolve(null)
                })

        })
    }
    let createVoterIdDetails = function (case_id, client, subclient, personalDetails_id, item) {
        return new Promise((resolve, reject) => {
            const voterid = new VoterId({
                case: case_id,
                client: client,
                subclient: subclient,
                personalDetailsData: personalDetails_id,
                component: "6065fb5522c50dacc8d9795f",
                epicnumber: item.epicnumber,
                epicname: item.epicname,
                state: item.state,
                status: "DE-COMPLETED",
                modifiedBy: null
            });

        })
    }
    let validateAddressDetails = function (item) {
        return new Promise((resolve, reject) => {
            console.log("Checking item ", item)
            if (!item.address) {
                resolve({ valid: false, message: "Full Address with PIN required" })
            }
            if (!item.pin) {
                resolve({ valid: false, message: 'PIN required for address ' })
            }
            if (!item.city) {
                resolve({ valid: false, message: 'City Required required for address' })
            }
            if (!item.typeofaddress) {
                resolve({ valid: false, message: 'Type of Address required for address' })
            }
            if (!item.tenureofstay) {
                resolve({ valid: false, message: 'Tenure of stay required for address' })
            }
            if (!item.primarycontact) {
                resolve({ valid: false, message: 'Primary Contact required for address' })
            }
            resolve({ valid: true, message: '' })

        })

    }
    let validateEducationDetails = function (item) {
        return new Promise((resolve, reject) => {
            if (!item.nameofuniversity) {
                resolve({ valid: false, message: 'Name of University / Board required' })
            }
            if (!item.nameofschool) {
                resolve({ valid: false, message: 'Name of Institute / College / School required' })
            }
            if (!item.cityofstudy) {
                resolve({ valid: false, message: 'City of Study required' })
            }
            if (!item.typeofqualification) {
                resolve({ valid: false, message: 'Type of Qualification required' })
            }
            if (!item.qualification) {
                resolve({ valid: false, message: 'Qualification Attained required' })
            }
            if (!item.specialization) {
                resolve({ valid: false, message: 'Specialization required' })
            }
            if (!item.rollnumber) {
                resolve({ valid: false, message: 'Roll / Regd Number required' })
            }
            if (!item.yearofjoining) {
                resolve({ valid: false, message: 'Year of Joining (mmm-yy) required' })
            }
            if (!item.yearofcompletion) {
                resolve({ valid: false, message: 'Year of Completion (mmm-yy) required' })
            }
            if (!item.marks) {
                resolve({ valid: false, message: 'Marks / Division / %age / CGPA required' })
            }
            resolve({ valid: true, message: '' })

        })
    }
    let validateEmploymentDetails = function (item) {
        return new Promise((resolve, reject) => {
            if (!item.nameofemployer) {
                resolve({ valid: false, message: 'Name of the Employer required' })
            }
            if (!item.branch) {
                resolve({ valid: false, message: 'Branch / City required' })
            }
            if (!item.empstatus) {
                resolve({ valid: false, message: 'Employment Status required' })
            }
            if (!item.empid) {
                resolve({ valid: false, message: 'Employee ID required' })
            }
            if (!item.doj) {
                resolve({ valid: false, message: 'Date of Joining (DD-MMM-YY) required' })
            }
            if (!item.lwd) {
                resolve({ valid: false, message: 'Last Working Day (DD-MMM-YY) required' })
            }
            if (!item.designation) {
                resolve({ valid: false, message: 'Designation required' })
            }
            if (!item.reportingmgr) {
                resolve({ valid: false, message: 'Reporting Manager (Name & Contact) required' })
            }
            if (!item.reasonforleaving) {
                resolve({ valid: false, message: 'Reason for Leaving required' })
            }
            resolve({ valid: true, message: '' })
        })
    }
    const Updatenumberofchecks = (case_id, checkName) => {

        Case
            .findOne({ _id: case_id })
            .then(caseData => {
                let checksEntered = 0
                if (caseData.numberOfChecksEntered != null) {
                    checksEntered = caseData.numberOfChecksEntered
                }
                checksEntered = checksEntered + 1
                Case
                    .findOneAndUpdate({ _id: case_id }, { numberOfChecksEntered: checksEntered })
                    .then(caseUpdateData => {
                    })
                    .catch(caseUpdateErr => {
                    })

            })
            .catch(caseErr => {
                console.log("Error in saving case", caseErr)
            })
        Case
            .update({ _id: case_id }, { $push: { actualComponents: checkName } })

            .then(data => {
                console.log("Updated the case ", data)
            })
            .catch(err => {
                console.log("Error updating case ", data.caseId)
            })

        //            res.json(data)

    }

    start()
    async function start() {
        let validData = true
        if (!req.body.candidateName) {
            validData = false
            res.status(400).json({ message: "Candidate name Cannot be empty" });
        }
        if (!req.body.gender) {
            validData = false
            res.status(400).json({ message: "Gender cannot be empty" });
        }
        if (!req.body.dateofbirth) {
            validData = false
            res.status(400).json({ message: "Date of birth cannot be empty" })
        }
        // let componentsToCheck = req.body.componentsToCheck
        // console.log("components to check size ",componentsToCheck.length)	    
        // for(let i=0; i < componentsToCheck.length;i++){
        // 	let item = componentsToCheck[i]
        // console.log("Let me try the component",item.componentName)    
        /*	switch(item.componentName){    
                 case 'address':
                  if(validData){		
                         console.log("About to validate address details")
                 let value  = await validateAddressDetails(item)
                 validData = value.valid
                 let message = value.message     
                 if(!validData){
                        res.status(400).json({message:message + " in component " + (i+1)})		 
                 }     
                      }
                      break
                 case 'addresscomprehensive':
                      if(validData){
                         console.log("About to validate address comprehensive details")
                         let value  = await validateAddressComprehensiveDetails(item)
                         validData = value.valid
                         let message = value.message
                         if(!validData){
                            res.status(400).json({message:message + " in component " + (i+1)})
                         }
                      }
                      break
                 case 'addressonline':
                      if(validData){
                         console.log("About to validate address online details")
                         let value  = await validateAddressOnlineDetails(item)
                         validData = value.valid
                         let message = value.message
                         if(!validData){
                            res.status(400).json({message:message + " in component " + (i+1)})
                         }
                      }
                      break
                 case 'addresstelephone':
                      if(validData){
                         console.log("About to validate address telephone details")
                         let value  = await validateAddressTelephoneDetails(item)
                         validData = value.valid
                         let message = value.message
                         if(!validData){
                            res.status(400).json({message:message + " in component " + (i+1)})
                         }
                      }
                      break
                	
                 case 'education':
                  if(validData){		
                     let value = await validateEducationDetails(item)
                 validData = value.valid
                 let message = value.message
                 if(!validData){
                        res.status(400).json({message:message + " in component " + (i+1)})		 
                 }     
                  }
                  console.log("In education validation")		
                  break
             case 'employment':
                  if(validData){
                 let value = await ploymentDetails(item)     
                 validData = value.valid
                 let message = value.message
                 if(!validData){
                       res.status(400).json({message:message + " in component " + (i+1)})		 
                 }     
                  }		
                      console.log("in employment validation")	
                  break
        
             default:
                  validData = false		
            }*/

        // }	    
        let client_id = await findClient()
        let subclient_id = await findSubclient(client_id)
        if (client_id != null && subclient_id != null) {
            let currDate = moment();
            //    console.log('Case Id Searching for is ',currDate.format('YYYY')+currDate.format('MM')+currDate.format('DD'));
            //    let findString =`${currDate.format('YYYY')}${currDate.format('MM')}${currDate.format('DD')}.*`;
            if (validData) {
                let findString = `${currDate.format('YY')}${currDate.format('MM')}${currDate.format('DD')}.*`;
                console.log('find string is ', findString);
                Case
                    .find({ caseId: { "$regex": findString, "$options": "i" } })
                    .then(cases => {
                        let caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'A0001' + 'B';
                        if (cases.length == 0) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'A0001' + 'B';
                        } else if (cases.length > 0 < 9999) {
                            console.log("in cases between 0 to 9999");
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'A' + ("0000" + (cases.length + 1)).slice(-4) + 'B';
                            console.log("Case Id is ", caseId);
                        } else if (cases.length >= 9999 < 19998) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'B' + ("0000" + (cases.length - 9999 + 1)).slice(4) + 'B';
                        } else if (cases.length >= 19998 < 29997) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'C' + cases.length + 1 + 'B';
                        } else if (cases.length >= 29997 < 39996) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'D' + cases.length + 1 + 'B';
                        } else if (cases.length >= 39996 < 49995) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'E' + cases.length + 1 + 'B';
                        } else if (cases.length >= 49995 < 59994) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'F' + cases.length + 1 + 'B';
                        } else if (cases.length >= 59994 < 69993) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'G' + cases.length + 1 + 'B';
                        } else if (cases.length >= 69993 < 79992) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'H' + cases.length + 1 + 'B';
                        } else if (cases.length >= 79992 < 89991) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'I' + cases.length + 1 + 'B';
                        } else if (cases.length >= 89991 < 99990) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'J' + cases.length + 1 + 'B';
                        } else if (cases.length >= 99990 < 109989) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'K' + cases.length + 1 + 'B';
                        } else if (cases.length >= 109989 < 110988) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'L' + cases.length + 1 + 'B';
                        } else if (cases.length >= 110988 < 120987) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'M' + cases.length + 1 + 'B';
                        } else if (cases.length >= 120987 < 130986) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'N' + cases.length + 1 + 'B';
                        } else if (cases.length >= 130986 < 140985) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'O' + cases.length + 1 + 'B';
                        } else if (cases.length >= 140985 < 150984) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'P' + cases.length + 1 + 'B';
                        } else if (cases.length >= 150984 < 160983) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'Q' + cases.length + 1 + 'B';
                        } else if (cases.length >= 160983 < 170982) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'R' + cases.length + 1 + 'B';
                        } else if (cases.length >= 170982 < 180981) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'S' + cases.length + 1 + 'B';
                        } else if (cases.length >= 180981 < 190980) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'T' + cases.length + 1 + 'B';
                        } else if (cases.length >= 190980 < 200979) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'U' + cases.length + 1 + 'B';
                        } else if (cases.length >= 200979 < 210978) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'V' + cases.length + 1 + 'B';
                        } else if (cases.length >= 210978 < 220977) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'W' + cases.length + 1 + 'B';
                        } else if (cases.length >= 220977 < 230976) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'X' + cases.length + 1 + 'B';
                        } else if (cases.length >= 230976 < 240975) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'Y' + cases.length + 1 + 'B';
                        } else if (cases.length >= 240975 < 250974) {
                            caseId = currDate.format('YY') + currDate.format('MM') + currDate.format('DD') + 'Z' + cases.length + 1 + 'B';
                        }


                        //        console.log('no case found and hence the case id is');
                        //        caseId = (parseInt(caseId,10) + 1).toString();
                        console.log(caseId)
                        console.log('got the last case id and now creating the batch');
                        createCase(caseId);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the case"
                        })
                    })
            }
            function createCase(caseId) {
                console.log('about to create the case body is ', req.body);
                let intTat = req.body.tat - 1;
                console.log("moment is ", moment().add(intTat, 'days'));

                //        console.log("intTat is ",intTat);
                caseToCreate = new Case({
                    caseId: caseId,
                    client: client_id,
                    subclient: subclient_id,
                    candidateName: req.body.candidateName,
                    employeeId: req.body.employeeId,
                    initiationDate: new Date(),
                    tatEndDate: moment().add(intTat, 'days').toDate(),
                    package: req.body.package,
                    profile: req.body.profile,
                    status: "DE-COMPLETED",
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
                if (req.body.batch) {
                    caseToCreate.batch = req.body.batch
                }
                caseToCreate
                    .save(caseToCreate)
                    .then(async data => {
                        console.log("created case: ", data);
                        //            let caseZipFile = req.files.caseZipFile;
                        // caseHistory.create(data._id,null,null,'Case Initiation','CASE-INITIATED','Case Initiated',null,null,null,null)
                        if (req.files != null) {
                            console.log("Files  is not null ", req.files)
                            let caseZipFile = req.files.caseZipFile;
                            caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, null)
                            caseZipFile.mv(`/REPO_STORAGE/case_uploads/${caseId}/` + caseZipFile.name, function (err) {
                                if (err) {
                                    console.log("Error while  moving the file ", err)
                                    res.status(500).send(err)
                                }
                                return res.json(data);
                            })
                        }
                        else {
                            console.log("Files is null")
                            if (req.body.cde == true) {
                                generateAuthenticationToken()
                            }
                            let personalDetails = await createPersonalDetailsData(data._id)
                            console.log("Personal Details:", personalDetails)
                            let componentsToCheck = req.body.componentsToCheck
                            if (componentsToCheck.length > 0) {
                                for (let i = 0; i < componentsToCheck.length; i++) {
                                    let item = componentsToCheck[i]
                                    switch (item.componentName) {
                                        case 'address':
                                            let addressCheck = await createAddressDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let addressDetails = new Array()
                                            addressDetails.push(addressCheck)
                                            data.addressDetails == null ? data.addressDetails = addressDetails : data.addressDetails.push(addressCheck);

                                            Updatenumberofchecks(data._id, "address");
                                            break
                                        case 'addresscomprehensive':
                                            let addresscomprehensiveCheck = await createAddressComprehensiveDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let addresscomprehensiveDetails = new Array()
                                            addresscomprehensiveDetails.push(addresscomprehensiveCheck)
                                            data.addresscomprehensiveDetails == null ? data.addresscomprehensiveDetails = addresscomprehensiveDetails : data.addresscomprehensiveDetails.push(addresscomprehensiveCheck);

                                            Updatenumberofchecks(data._id, "addresscomprehensive");

                                            break
                                        case 'addressonline':
                                            let addressonlineCheck = await createAddressOnlineDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let addressonlineDetails = new Array()
                                            addressonlineDetails.push(addressonlineCheck)
                                            data.addressonlineDetails == null ? data.addressonlineDetails = addressonlineDetails : data.addressonlineDetails.push(addressonlineCheck);

                                            Updatenumberofchecks(data._id, "addressonline");

                                            break
                                        case 'addresstelephone':
                                            let addresstelephoneCheck = await createAddressTelephoneDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let addresstelephoneDetails = new Array()
                                            addresstelephoneDetails.push(addresstelephoneCheck)
                                            data.addresstelephoneDetails == null ? data.addresstelephoneDetails = addresstelephoneDetails : data.addresstelephoneDetails.push(addresstelephoneCheck);

                                            Updatenumberofchecks(data._id, "addresstelephone");

                                            break
                                        case 'bankstmt':
                                            let bankstmtCheck = await createBankStatementDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let bankstmtDetails = new Array()
                                            bankstmtDetails.push(bankstmtCheck)
                                            data.bankstmtDetails == null ? data.bankstmtDetails = bankstmtDetails : data.bankstmtDetails.push(bankstmtCheck);

                                            Updatenumberofchecks(data._id, "bankstmt");

                                            break
                                        case 'courtrecord':
                                            let courtrecordCheck = await createCourtRecordDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let courtrecordDetails = new Array()
                                            courtrecordDetails.push(courtrecordCheck)
                                            data.courtrecordDetails == null ? data.courtrecordDetails = courtrecordDetails : data.courtrecordDetails.push(courtrecordCheck);

                                            Updatenumberofchecks(data._id, "courtrecord");
                                            break
                                        case 'creditcheck':
                                            let creditcheckCheck = await createCreditCheckDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let creditDetails = new Array()
                                            creditDetails.push(creditcheckCheck)
                                            data.creditDetails == null ? data.creditDetails = creditDetails : data.creditDetails.push(creditcheckCheck);

                                            Updatenumberofchecks(data._id, "creditcheck");

                                            break
                                        case 'creditequifax':
                                            let creditequifaxCheck = await createCreditEquifaxDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let creditequifaxDetails = new Array()
                                            creditequifaxDetails.push(creditequifaxCheck)
                                            data.creditequifaxDetails == null ? data.creditequifaxDetails = creditequifaxDetails : data.creditequifaxDetails.push(creditequifaxCheck);

                                            Updatenumberofchecks(data._id, "creditequifax");

                                            break
                                        case 'credittrans':
                                            let credittransCheck = await createCreditTransDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let credittransDetails = new Array()
                                            credittransDetails.push(credittransCheck)
                                            data.credittransDetails == null ? data.credittransDetails = credittransDetails : data.credittransDetails.push(credittransCheck);

                                            Updatenumberofchecks(data._id, "credittrans");

                                            break
                                        case 'criminalrecord':
                                            let criminalrecordCheck = await createCriminalRecordDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let criminalrecordDetails = new Array()
                                            criminalrecordDetails.push(criminalrecordCheck)
                                            data.criminalrecordDetails == null ? data.criminalrecordDetails = criminalrecordDetails : data.criminalrecordDetails.push(criminalrecordCheck);

                                            Updatenumberofchecks(data._id, "criminalrecord");

                                            break
                                        case 'directroshipcheck':
                                            let directroshipcheckCheck = await createDirectorshipCheckDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let directroshipcheckDetails = new Array()
                                            directroshipcheckDetails.push(directroshipcheckCheck)
                                            data.directroshipcheckDetails == null ? data.directroshipcheckDetails = directroshipcheckDetails : data.directroshipcheckDetails.push(directroshipcheckCheck);

                                            Updatenumberofchecks(data._id, "directroshipcheck");

                                            break
                                        case 'dlcheck':
                                            let dlcheckCheck = await createDlCheckDetails(data._id, data.client, data.subclient, personaDetails._id, item)
                                            let dlcheckDetails = new Array()
                                            dlcheckDetails.push(dlcheckCheck)
                                            data.dlcheckDetails == null ? data.dlcheckDetails = dlcheckDetails : data.dlcheckDetails.push(dlcheckCheck);

                                            Updatenumberofchecks(data._id, "dlcheck");

                                            break
                                        case 'drugtestfive':
                                            let drugtestfiveCheck = await createDrugTestFiveDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let drugtestfiveDetails = new Array()
                                            drugtestfiveDetails.push(drugtestfiveCheck)
                                            data.drugtestfiveDetails == null ? data.drugtestfiveDetails = drugtestfiveDetails : data.drugtestfiveDetails.push(drugtestfiveCheck);

                                            Updatenumberofchecks(data._id, "drugtestfive");

                                            break
                                        case 'drugtestsix':
                                            let drugtestsixCheck = await createDrugTestSixDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let drugtestsixDetails = new Array()
                                            drugtestsixDetails.push(drugtestsixCheck)
                                            data.drugtestsixDetails == null ? data.drugtestsixDetails = drugtestsixDetails : data.drugtestsixDetails.push(drugtestsixCheck);

                                            Updatenumberofchecks(data._id, "drugtestsix");

                                            break
                                        case 'drugtestseven':
                                            let drugtestsevenCheck = await createDrugTestSevenDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let drugtestsevenDetails = new Array()
                                            drugtestsevenDetails.push(drugtestsevenCheck)
                                            data.drugtestsevenDetails == null ? data.drugtestsevenDetails = drugtestsevenDetails : data.drugtestsevenDetails.push(drugtestsevenCheck);

                                            Updatenumberofchecks(data._id, "drugtestseven");

                                            break
                                        case 'drugtesteight':
                                            let drugtesteightCheck = await createDrugTestEightDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let drugtesteightDetails = new Array()
                                            drugtesteightDetails.push(drugtesteightCheck)
                                            data.drugtesteightDetails == null ? data.drugtesteightDetails = drugtesteightDetails : data.drugtesteightDetails.push(drugtesteightCheck);

                                            Updatenumberofchecks(data._id, "drugtesteight");

                                            break
                                        case 'drugtestnine':
                                            let drugtestnineCheck = await createDrugTestNineDetails(data._id, data.client, data.subclient, personalDetail._id, item)
                                            let drugtestnineDetails = new Array()
                                            drugtestnineDetails.push(drugtestnineCheck)
                                            data.drugtestnineDetails == null ? data.drugtestnineDetails = drugtestnineDetails : data.drugtestnineDetails.push(drugtestnineCheck);

                                            Updatenumberofchecks(data._id, "drugtestnine");

                                            break
                                        case 'drugtestten':
                                            let drugtesttenCheck = await createDrugTestTenDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let drugtesttenDetails = new Array()
                                            drugtesttenDetails.push(drugtesttenCheck)
                                            data.drugtesttenDetails == null ? data.drugtesttenDetails = drugtesttenDetails : data.drugtesttenDetails.push(drugtesttenCheck);

                                            Updatenumberofchecks(data._id, "drugtestnine");

                                            break
                                        case 'education':
                                            let educationCheck = await createEducationDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let educationDetails = new Array()
                                            educationDetails.push(educationCheck)
                                            data.educationDetails == null ? data.educationDetails = educationDetails : data.educationDetails.push(educationCheck);

                                            Updatenumberofchecks(data._id, "education");


                                            break
                                        case 'educationadvanced':
                                            let educationadvancedCheck = await createEducationAdvancedDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let educationadvancedDetails = new Array()
                                            educationadvancedDetails.push(educationadvancedCheck)
                                            data.educationadvancedDetails == null ? data.educationadvancedDetails = educationadvancedDetails : data.educationadvancedDetails.push(educationadvancedCheck);

                                            Updatenumberofchecks(data._id, "educationadvanced");

                                            break
                                        case 'educationcomprehensive':
                                            let educationcomprehensiveCheck = await createEducationComprehensiveDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let educationcomprehensiveDetails = new Array()
                                            educationcomprehensiveDetails.push(educationcomprehensiveCheck)
                                            data.educationcomprehensiveDetails == null ? data.educationcomprehensiveDetails = educationcomprehensiveDetails : data.educationcomprehensiveDetails.push(educationcomprehensiveCheck);

                                            Updatenumberofchecks(data._id, "educationcomprehensive");

                                            break
                                        case 'empadvance':
                                            let empadvanceCheck = await createEmploymentAdvancedDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let empadvanceDetails = new Array()
                                            empadvanceDetails.push(empadvanceCheck)
                                            data.empadvanceDetails == null ? data.empadvanceDetails = empadvanceDetails : data.empadvanceDetails.push(empadvanceCheck);

                                            Updatenumberofchecks(data._id, "empadvance");

                                            break
                                        case 'empbasic':
                                            let empbasicCheck = await createEmploymentBasicDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let empbasicDetails = new Array()
                                            empbasicDetails.push(empbasicCheck)
                                            data.empbasicDetails == null ? data.empbasicDetails = empbasicDetails : data.empbasicDetails.push(empbasicCheck);

                                            Updatenumberofchecks(data._id, "empbasic");

                                            break
                                        case 'employment':
                                            let employmentCheck = await createEmploymentDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let employmentDetails = new Array()
                                            employmentDetails.push(employmentCheck)
                                            data.employmentDetails == null ? data.employmentDetails = employmentDetails : data.employmentDetails.push(employmentCheck);

                                            Updatenumberofchecks(data._id, "employment");

                                            break
                                        case 'facisl3':
                                            let facisl3Check = await createFacisL3Details(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let facisl3Details = new Array()
                                            facisl3Details.push(facisl3Check)
                                            data.facisl3Details == null ? data.facisl3Details = facisl3Details : data.facisl3Details.push(facisl3Check);

                                            Updatenumberofchecks(data._id, "facisl3");

                                            break
                                        case 'gapvfn':
                                            let gapvfnCheck = await createGapVfnDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let gapvfnDetails = new Array()
                                            gapvfnDetails.push(gapvfnCheck)
                                            data.gapvfnDetails == null ? data.gapvfnDetails = gapvfnDetails : data.gapvfnDetails.push(gapvfnCheck);

                                            Updatenumberofchecks(data._id, "gapvfn");

                                            break
                                        case 'globaldatabase':
                                            let globaldatabaseCheck = await createGlobalDatabaseDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let globaldatabaseDetails = new Array()
                                            globaldatabaseDetails.push(globaldatabaseCheck)
                                            data.globaldatabaseDetails == null ? data.globaldatabaseDetails = globaldatabaseDetails : data.globaldatabaseDetails.push(globaldatabaseCheck);

                                            Updatenumberofchecks(data._id, "globaldatabase");

                                            break
                                        case 'identity':
                                            let identityCheck = await createIdentityDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let identityDetails = new Array()
                                            identityDetails.push(identityCheck)
                                            data.identityDetails == null ? data.identityDetails = identityDetails : data.identityDetails.push(identityCheck);

                                            Updatenumberofchecks(data._id, "identity");

                                            break
                                        case 'ofac':
                                            let ofacCheck = await createOfacDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let ofacDetails = new Array()
                                            ofacDetails.push(ofacCheck)
                                            data.ofacDetails == null ? data.ofacDetails = ofacDetails : data.ofacDetails.push(ofacCheck);

                                            Updatenumberofchecks(data._id, "ofac");

                                            break
                                        case 'passport':
                                            let passportCheck = await createPassportDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let passportDetails = new Array()
                                            passportDetails.push(passportCheck)
                                            data.passportDetails == null ? data.passportDetails = passportDetails : data.passportDetails.push(passportCheck);

                                            Updatenumberofchecks(data._id, "passport");

                                            break
                                        case 'physostan':
                                            let physostanCheck = await createPsychometricTestDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let physostanDetails = new Array()
                                            physostanDetails.push(physostanCheck)
                                            data.physostanDetails == null ? data.physostanDetails = physostanDetails : data.physostanDetails.push(physostanCheck);

                                            Updatenumberofchecks(data._id, "physostan");

                                            break
                                        case 'refbasic':
                                            let refbasicCheck = await createRefBasicDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let refbasicDetails = new Array()
                                            refbasicDetails.push(refbasicCheck)
                                            data.refbasicDetails == null ? data.refbasicDetails = refbasicDetails : data.refbasicDetails.push(refbasicCheck);

                                            Updatenumberofchecks(data._id, "refbasic");

                                            break
                                        case 'reference':
                                            let referenceCheck = await createReferenceDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let referenceDetails = new Array()
                                            referenceDetails.push(referenceCheck)
                                            data.referenceDetails == null ? data.referenceDetails = referenceDetails : data.referenceDetails.push(referenceCheck);

                                            Updatenumberofchecks(data._id, "reference");

                                            break
                                        case 'sitecheck':
                                            let sitecheckCheck = await createSiteCheckDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let sitecheckDetails = new Array()
                                            sitecheckDetails.push(sitecheckCheck)
                                            data.sitecheckDetails == null ? data.sitecheckDetails = sitecheckDetails : data.sitecheckDetails.push(sitecheckCheck);

                                            Updatenumberofchecks(data._id, "sitecheck");

                                            break
                                        case 'socialmedia':
                                            let socialmediaCheck = await createSocialMediaDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let socialmediaDetails = new Array()
                                            socialmediaDetails.push(socialmediaCheck)
                                            data.socialmediaDetails == null ? data.socialmediaDetails = socialmediaDetails : data.socialmediaDetails.push(socialmediaCheck);

                                            Updatenumberofchecks(data._id, "socialmedia");

                                            break
                                        case 'vddadvance':
                                            let vddadvanceCheck = await createVddAdvanceDetails(data._id, data.client, data.subclient, personalDetails._id, item)
                                            let vddadvanceDetails = new Array()
                                            vddadvanceDetails.push(vddadvanceCheck)
                                            data.vddadvanceDetails == null ? data.vddadvanceDetails = vddadvanceDetails : data.vddadvanceDetails.push(vddadvanceCheck);

                                            Updatenumberofchecks(data._id, "vddadvance");

                                            break
                                        case 'voterid':
                                            let voteridCheck = await createVoterIdDetails(data._id, data.cient, data.subclient, personalDetails._id, item)
                                            let voteridDetails = new Array()
                                            voteridDetails.push(voteridCheck)
                                            data.voteridDetails == null ? data.voteridDetails = voteridDetails : data.voteridDetails.push(voteridCheck);

                                            Updatenumberofchecks(data._id, "voterid");

                                            break
                                        default:
                                            res.status(500).json({ message: "Unknown Check" })

                                    }
                                }
                            }
                            res.json(data)
                        }

                    })
                // csgrdgrdhgvdhdh
            }
        } else {
            res.status(400).json({
                message: "Client / Subclient not found client _id is " + client_id + " subclient_id is " + subclient_id
            })
        }
    }


};




