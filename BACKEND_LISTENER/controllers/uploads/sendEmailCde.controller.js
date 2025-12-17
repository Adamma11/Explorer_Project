const Case = require('../../models/uploads/case.model');
const moment = require("moment")
const nodemailer = require("nodemailer")
const CdePassword = require("../../models/administration/cde_password.model");
const client_contract_packageModel = require('../../models/administration/client_contract_package.model');
const client_contract_profileModel = require('../../models/administration/client_contract_profile.model');
const mongoose = require('mongoose');
const clientModel = require('../../models/administration/client.model');
const subclientModel = require('../../models/administration/subclient.model');
const { sendEmail } = require('../../shared/sendEmail');
const user_subclient_access = require('../../models/administration/user_subclient_access.model');
exports.sendEmailCde = async (req, res) => {

    try {

        console.log(req.user)
        let client = await clientModel.findOne({ name: req.body.client })
        client = client._id
        let subclient = await subclientModel.findOne({ $and: [{ name: req.body.subclient }, { client: client }] })
        console.log(subclient)
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

    if (!req.body.client) {
        res.status(400).json({ message: "Client Cannot be empty" });

    }
    if (!req.body.subclient) {
        res.status(400).json({ message: "Subclient Cannot be empty" });
    }
    if (!req.body.candidateName) {
        res.status(400).json({ message: "Candidate name Cannot be empty" });
    }
    if (!req.body.candidateEmail) {
        res.status(400).json({ message: "Candidate email Cannot be empty" });
    }
    let currDate = moment();
    //    console.log('Case Id Searching for is ',currDate.format('YYYY')+currDate.format('MM')+currDate.format('DD'));
    //    let findString =`${currDate.format('YYYY')}${currDate.format('MM')}${currDate.format('DD')}.*`; 
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


    async function createCase(caseId) {
        console.log('about to create the case body is ', req.body);
        let intTat = req.body.tat - 1;
        console.log("moment is ", moment().add(intTat, 'days'));

        const clientData = await clientModel.findOne({ name: req.body.client })
        const client = mongoose.Types.ObjectId(clientData._id)

        const subclientData = await subclientModel.findOne({ $and: [{ client: client }, { name: req.body.subclient }] })
        const subclient = mongoose.Types.ObjectId(subclientData._id)

        const packageData = await client_contract_packageModel.findOne({ name: req.body.package }) || null
        const profileData = await client_contract_profileModel.findOne({ name: req.body.profile }) || null



        if (!clientData || !subclientData) {
            return res.status(400).json({ message: "Client or subclient is invalid." })
        }

        if (String(subclientData.client) != String(clientData._id)) {
            return res.status(400).json({ message: "Client and Subclient doesn't match." })
        }



        console.log("subclient", subclient)
        const profile = profileData ? mongoose.Types.ObjectId(profileData._id) : null
        const package = packageData ? mongoose.Types.ObjectId(packageData._id) : null

        //        console.log("intTat is ",intTat);
        caseToCreate = new Case({
            caseId: caseId,
            client: client,
            subclient: subclient,
            candidateName: req.body.candidateName,
            initiationDate: new Date(),
            tatEndDate: moment().add(intTat, 'days').toDate(),
            package: package,
            profile: profile,
            status: req.body.status,
            candidateEmail: req.body.candidateEmail,
            cde: req.body.cde,
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
        let randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
        caseToCreate
            .save(caseToCreate)
            .then(data => {
                console.log("created case");
                //    let caseZipFile = req.files.caseZipFile;
                // caseHistory.create(data._id, null, null, 'Case Initiation', 'CASE-INITIATED', 'Case Initiated', null, null, null, req.user.user_id)
                // const accessToken = generateCdeToken({ caseId: data.caseId }, "ACCESS")

                CdePassword.deleteOne({ caseId: caseId })
                    .then(async cdePassword => {
                        savePassword();
                        const emailConfig = {
                            to: req.body.candidateEmail,
                            subject: "Welcome to Explorer (Powered by Adamma)",
                            text: "Dear " + req.body.candidateName + ",\n\n" + "Greetings from Adamma!\n\n" +
                                "We are the authorized background verification partner of Test Client. As part of the joining requirement, we request you to kindly provide information / documents that is required to complete your verification.\n\nYou may please use the below credentials to furnish the required information:\n\n" +
                                "URL:\thttp://172.16.16.46//cde/\nUser Id:\t" + caseId + "\nPassword:\t" + randPassword + "\n\n" +
                                "Please do not reply to this email as this is a system generated email.\n\n" +
                                "Thank you,\n" + "Team Explorer"
                        }

                        try {

                            const emailResponse = await sendEmail(emailConfig, data)

                            res.json( emailResponse )

                        } catch (e) {

                            res.status(500).json({ message: "Error sending Email." })

                        }

                    })
            })
            .catch(err => {
                console.log("error creating the case ", err.message);
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the case"
                })
            })
        // console.log("Here is  the token for the candidate", accessToken)

        function savePassword() {
            const cdePassword = new CdePassword({
                caseId: caseId,
                password: randPassword
            })
            cdePassword.save(cdePassword)


        }

    }
}
