const Case = require('../../models/uploads/case.model');
const UserSubclientAccesses = require("../../models/administration/user_subclient_access.model");
const ComponentAccesses = require("../../models/administration/component_access.model");
const UserRoles = require("../../models/administration/user_role.model");
const User = require('../../models/administration/user.model');
const Component = require("../../models/administration/component.model");
const fs = require('fs');
const path = require('path');
const { Types } = require('mongoose');
const case_historyModel = require('../../models/data_entry/case_history.model');
const mailSend = require('../mails/send_mail.controller')
const client_contractModel = require('../../models/administration/client_contract.model');



async function subclinentsAssignedToTheUser(userId) {
    const userSubclientAccesses = await UserSubclientAccesses.find(
        { user: userId },
        { client: 1, subclient: 1, _id: 0 }
    ).lean();

    return userSubclientAccesses;
}

function getStartDateOfTheCurrentMonthWithTime0() {
    const today = new Date();
    return new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
}

async function calculateInsuffChecksCount(initiatedCases, res) {
    let insuffChecksCount = 0;
    initiatedCases.forEach((initiatedCase) => {

        const uniqueActualComponents = Array.from(new Set(initiatedCase.actualComponents))

        const isUnderInsuff = uniqueActualComponents.some(async (actualComponent) => {

            let pathToModel = `../../models/data_entry/${actualComponent}.model`
            if (!fs.existsSync(path.join(__dirname, pathToModel.concat(".js")))) {
                console.log("Error : path doesn't exist", pathToModel);
                // return res.status(500).json({error:"Internal Server Error"})
                throw new Error("Internal Server Error");
            }
            const Model = require(pathToModel);

            const checkCount = await Model.countDocuments({ case: initiatedCase._id, status: { $in: ["INSUF-1-REQ-ACCEPTED", "INSUF-2-REQ-ACCEPTED"] } }).lean();

            if (checkCount > 0) {
                return true;
            }
            return false;

        })

        if (isUnderInsuff) {
            insuffChecksCount++;
        }


    })

    return insuffChecksCount;
}

async function calculateInsuffChecksCount(initiatedCases, res) {
    try {
        let insuffCasesCount = 0;

        // Process each initiated case
        for (const initiatedCase of initiatedCases) {
            const uniqueActualComponents = Array.from(new Set(initiatedCase.actualComponents));


            for (const actualComponent of uniqueActualComponents) {
                let pathToModel = `../../models/data_entry/${actualComponent}.model`;
                const modelPath = path.join(__dirname, pathToModel.concat(".js"));

                if (!fs.existsSync(modelPath)) {
                    console.log("Error : path doesn't exist", pathToModel);
                    throw new Error("Internal Server Error");  // Throwing error to be caught by outer try-catch
                }

                const Model = require(modelPath);

                const checkCount = await Model.countDocuments({
                    case: initiatedCase._id,
                    status: { $in: ["INSUF-1-REQ-ACCEPTED", "INSUF-2-REQ-ACCEPTED"] }
                }).lean();

                if (checkCount > 0) {
                    insuffCasesCount++;
                    break;
                }

            }
        }

        return insuffCasesCount;
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
        // throw error;  // Re-throw error to stop execution if necessary
    }
}
async function getClientDashboardData(req, res) {
    try {
        //const userSubclientAccesses = await subclinentsAssignedToTheUser("606ab1d90fe1085f834a1888");
        const userSubclientAccesses = await subclinentsAssignedToTheUser(req.user.user_id);

        if (!userSubclientAccesses.length > 0) {
            return res.status(404).json({ message: "No subclients assigned to the user" })
        }

        const initiationDate = getStartDateOfTheCurrentMonthWithTime0();
        // console.log("initiationDate :",initiationDate);

        let query = {
            // initiationDate: { $gte: initiationDate },
            $or: userSubclientAccesses.map(access => ({
                client: access.client,
                subclient: access.subclient
            }))
        }

        const initiatedCases = await Case.find(query, { actualComponents: 1 }).lean();

        //insuff cases count
        const calculateInsuffCasesCountPromise = calculateInsuffChecksCount(initiatedCases, res);

        //initiated cases count
        const initiatedCasesCountPromise = Case.countDocuments(query).lean();

        //case completed count
        query.status = "OUTPUTQC-ACCEPTED";
        const completedCasesCountPromise = Case.countDocuments(query).lean();

        //case wip count
        query.status = "INPUTQC-ACCEPTED";
        const wipCasesCountPromise = Case.countDocuments(query).lean();

        delete query.status;

        query.tatEndDate = { $gte: new Date() }

        // const casesWithInTATCountPromise = Case.countDocuments(query).lean();

        query.tatEndDate = { $lt: new Date() }

        // const casesBeyondTATCountPromise = Case.countDocuments(query).lean();



        // 1-change-19Sep2025
        query.status = { $ne: "OUTPUTQC-COMPLETED" };
        delete query.tatEndDate;
        console.log(query,"0000000000000");

        const pendingCaseCountPromise = Case.countDocuments(query).lean();
        // 1-change-19Sep2025

        // Execute queries in parallel
        const [insuffCasesCount, initiatedCasesCount, completedCasesCount, wipCasesCount, pendingCaseCount] = await Promise.all([calculateInsuffCasesCountPromise, initiatedCasesCountPromise, completedCasesCountPromise, wipCasesCountPromise, pendingCaseCountPromise]);

        let clientExpiryDate = '';
        if (userSubclientAccesses.length > 0 && userSubclientAccesses[0].client) {
            let clientContractDetails = await client_contractModel.findOne({ client: userSubclientAccesses[0].client });
            clientExpiryDate = clientContractDetails.expiryDate
        }


        return res.status(200).json({ insuffCasesCount, initiatedCasesCount, completedCasesCount, wipCasesCount, casesWithInTATCount:0, casesBeyondTATCount:0, casesUnderHoldCount: 0, pendingCaseCount, clientExpiryDate });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}
// 16 10 25
/*async function getClientDashboardData(req, res) {
    try {
        //const userSubclientAccesses = await subclinentsAssignedToTheUser("606ab1d90fe1085f834a1888");
         const userSubclientAccesses =  await subclinentsAssignedToTheUser( req.user.user_id);        

        if (!userSubclientAccesses.length > 0) {
            return res.status(404).json({ message: "No subclients assigned to the user" })
        }

        const initiationDate = getStartDateOfTheCurrentMonthWithTime0();
        // console.log("initiationDate :",initiationDate);

        let query = {
            initiationDate: { $gte: initiationDate },
            $or: userSubclientAccesses.map(access => ({
                client: access.client,
                subclient: access.subclient
            }))
        }

        const initiatedCases = await Case.find(query, { actualComponents: 1 }).lean();

        //insuff cases count
        const calculateInsuffCasesCountPromise = calculateInsuffChecksCount(initiatedCases, res);

        //initiated cases count
        const initiatedCasesCountPromise = Case.countDocuments(query).lean();

        //case completed count
        query.status = "OUTPUTQC-ACCEPTED";
        const completedCasesCountPromise = Case.countDocuments(query).lean();

        //case wip count
        query.status = "INPUTQC-ACCEPTED";
        const wipCasesCountPromise = Case.countDocuments(query).lean();

        delete query.status;

        query.tatEndDate = { $gte: new Date() }

        const casesWithInTATCountPromise = Case.countDocuments(query).lean();

        query.tatEndDate = { $lt: new Date() }

        const casesBeyondTATCountPromise = Case.countDocuments(query).lean();

        // Execute queries in parallel
        const [insuffCasesCount, initiatedCasesCount, completedCasesCount, wipCasesCount, casesWithInTATCount, casesBeyondTATCount] = await Promise.all([calculateInsuffCasesCountPromise, initiatedCasesCountPromise, completedCasesCountPromise, wipCasesCountPromise, casesWithInTATCountPromise, casesBeyondTATCountPromise]);

let clientExpiryDate = '';
        if (userSubclientAccesses.length > 0 && userSubclientAccesses[0].client) {
            let clientContractDetails = await client_contractModel.findOne({ client: userSubclientAccesses[0].client });
            clientExpiryDate = clientContractDetails.expiryDate
        }
 
 
        return res.status(200).json({ insuffCasesCount:2, initiatedCasesCount:10, completedCasesCount:8, wipCasesCount:0, casesWithInTATCount:10, casesBeyondTATCount:0, casesUnderHoldCount: 0, pendingCaseCount  : 2 , clientExpiryDate });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}*/


async function getAnalystDashboardData(req, res) {
    try {
        // Get the initiation date
        const initiationDate = getStartDateOfTheCurrentMonthWithTime0();

        // Fetch user roles
       // const userRoles = await UserRoles.find({ user: "64ef2faa4afeb9c09bc99441" }, { role: 1, _id: 0 }).lean();
        const userRoles = await UserRoles.find({ user: req.user.user_id }, { role: 1, _id: 0 }).lean();


        const roles = userRoles.map(userRole => userRole.role);
        //  console.log("roles :",roles);

        const componentAccesses = await ComponentAccesses.aggregate([
            {
                $match: { role: { $in: roles } }
            },
            {
                $project: {
                    component: 1,
                }
            },
            {
                $lookup: {
                    from: "components",
                    localField: "component",
                    foreignField: "_id",
                    as: "component"
                }
            },
            {
                $unwind: "$component"
            },
            {
                $project: {
                    component: 1
                }
            },
            {
                $group: {
                    _id: "$component.name",
                }
            },
            {
                $project: {
                    _id: 0,
                    component: "$_id"
                }
            }
        ])

        // console.log("componentAccesses ::",componentAccesses);

        const componentPromises = componentAccesses.map(async (componentAccess) => {
            // console.log("componentAccess:",componentAccess.component);

            const pathToModel = `../../models/data_entry/${componentAccess.component}.model`;

            // Check if the model file exists
            // if (!fs.existsSync(path.join(__dirname, pathToModel.concat(".js")))) {
            //     console.log("Error: path doesn't exist", pathToModel);
            //     throw new Error("Internal Server Error");
            // }

            // Dynamically require the model
            const Model = require(pathToModel);

            // Perform the aggregation queries
            const [initiatedChecks, wipChecks, insuffChecks, checksWithinTAT, checksBeyondTAT, completedChecks, rejectedChecks] = await Promise.all([
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: Types.ObjectId(req.user.user_id),
                            status: "INPUTQC-ACCEPTED"
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                   /* {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },*/
                    {
                        $count: "initiatedChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: Types.ObjectId(req.user.user_id),
                            status: "INPUTQC-ACCEPTED",
                            stage: "WIP"
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "wipChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: Types.ObjectId(req.user.user_id),
                            status: { $in: ["INSUF-1-REQ-ACCEPTED", "INSUF-2-REQ-ACCEPTED"] },
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "insuffChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: Types.ObjectId(req.user.user_id)
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate },
                            "case.tatEndDate": { $gte: new Date() }
                        }
                    },
                    {
                        $count: "checksWithinTATCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: Types.ObjectId(req.user.user_id)
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate },
                            "case.tatEndDate": { $lt: new Date() }
                        }
                    },
                    {
                        $count: "checksBeyondTATCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: Types.ObjectId(req.user.user_id),
                            status: { $in: ["VERIFICATION-COMPLETED", "OUTPUTQC-ACCEPTED", "MENTOR-REVIEW-ACCEPTED"] }
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "completedChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: Types.ObjectId(req.user.user_id),
                            status: { $in: ["OUTPUTQC-REJECTED", "MENTOR-REVIEW-REJECTED"] }
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "rejectedChecksCount"
                    }
                ])
            ]);

            // Return the counts
            return {
                initiatedChecksCount: initiatedChecks?.length ? initiatedChecks[0].initiatedChecksCount : 0,
                wipChecksCount: wipChecks?.length ? wipChecks[0].wipChecksCount : 0,
                insuffChecksCount: insuffChecks?.length ? insuffChecks[0].insuffChecksCount : 0,
                checksWithinTATCount: checksWithinTAT?.length ? checksWithinTAT[0].checksWithinTATCount : 0,
                checksBeyondTATCount: checksBeyondTAT?.length ? checksBeyondTAT[0].checksBeyondTATCount : 0,
                completedChecksCount: completedChecks?.length ? completedChecks[0].completedChecksCount : 0,
                rejectedChecksCount: rejectedChecks?.length ? rejectedChecks[0].rejectedChecksCount : 0
            };
        });
        const aggregatedCounts = await Promise.all(componentPromises).then(results => {
            // Combine all the role results
            return results.reduce((acc, result) => {
                acc.initiatedChecksCount += result.initiatedChecksCount;
                acc.wipChecksCount += result.wipChecksCount;
                acc.insuffChecksCount += result.insuffChecksCount;
                acc.checksWithinTATCount += result.checksWithinTATCount;
                acc.checksBeyondTATCount += result.checksBeyondTATCount;
                acc.completedChecksCount += result.completedChecksCount;
                acc.rejectedChecksCount += result.rejectedChecksCount;

                return acc;
            }, {
                initiatedChecksCount: 0,
                wipChecksCount: 0,
                insuffChecksCount: 0,
                checksWithinTATCount: 0,
                checksBeyondTATCount: 0,
                completedChecksCount: 0,
                rejectedChecksCount: 0
            });
        });

        aggregatedCounts.holdChecksCount = 0;
        // Return the final result
        return res.status(200).json(aggregatedCounts);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getTlDashboardData(req, res) {
    try {
        const initiationDate = getStartDateOfTheCurrentMonthWithTime0();


        const users = await User.find({ reportingManager: req.user.user_id, status: "ACTIVE" }).lean();
        const userIds = users.map(user => user._id);
        // console.log("userIds :",userIds);


        // Fetch user roles

        const userRoles = await UserRoles.aggregate([
            {
                $match: {
                    user: { $in: userIds },
                }
            },
            {
                $group: {
                    _id: "$role"
                }
            },
            {
                $project: {
                    _id: 0,
                    role: "$_id"
                }
            }
        ])

        const roles = userRoles.map(userRole => userRole.role);

        const componentAccesses = await ComponentAccesses.aggregate([
            {
                $match: { role: { $in: roles } }
            },
            {
                $project: {
                    component: 1,
                }
            },
            {
                $lookup: {
                    from: "components",
                    localField: "component",
                    foreignField: "_id",
                    as: "component"
                }
            },
            {
                $unwind: "$component"
            },
            {
                $project: {
                    component: 1
                }
            },
            {
                $group: {
                    _id: "$component.name",
                }
            },
            {
                $project: {
                    _id: 0,
                    component: "$_id"
                }
            }
        ])

        const componentPromises = componentAccesses.map(async (componentAccess) => {
            // console.log("componentAccess:",componentAccess.component);

            const pathToModel = `../../models/data_entry/${componentAccess.component}.model`;

            // Check if the model file exists
            // if (!fs.existsSync(path.join(__dirname, pathToModel.concat(".js")))) {
            //     console.log("Error: path doesn't exist", pathToModel);
            //     throw new Error("Internal Server Error");
            // }

            // Dynamically require the model
            const Model = require(pathToModel);

            // Perform the aggregation queries
            const [initiatedChecks, wipChecks, insuffChecks, checksWithinTAT, checksBeyondTAT, completedChecks, rejectedChecks, gradeWiseChecks] = await Promise.all([
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: { $in: userIds },
                            status: "INPUTQC-ACCEPTED"
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "initiatedChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: { $in: userIds },
                            status: "INPUTQC-ACCEPTED",
                            stage: "WIP"
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "wipChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: { $in: userIds },
                            status: { $in: ["INSUF-1-REQ-ACCEPTED", "INSUF-2-REQ-ACCEPTED"] },
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "insuffChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: { $in: userIds }
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate },
                            "case.tatEndDate": { $gte: new Date() }
                        }
                    },
                    {
                        $count: "checksWithinTATCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: { $in: userIds }
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate },
                            "case.tatEndDate": { $lt: new Date() }
                        }
                    },
                    {
                        $count: "checksBeyondTATCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: { $in: userIds },
                            status: { $in: ["VERIFICATION-COMPLETED", "OUTPUTQC-ACCEPTED", "MENTOR-REVIEW-ACCEPTED"] }
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "completedChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: { $in: userIds },
                            status: { $in: ["OUTPUTQC-REJECTED", "MENTOR-REVIEW-REJECTED"] }
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $count: "rejectedChecksCount"
                    }
                ]),
                Model.aggregate([
                    {
                        $match: {
                            verificationAllocatedTo: { $in: userIds },
                            grade: {
                                $in: [
                                    "602f8b3743383ec9a722496e",
                                    "602f8b3743383ec9a722496f",
                                    "602f8b3743383ec9a7224970"
                                ]
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: "cases",
                            localField: "case",
                            foreignField: "_id",
                            as: "case"
                        }
                    },
                    {
                        $unwind: "$case"
                    },
                    {
                        $match: {
                            "case.initiationDate": { $gte: initiationDate }
                        }
                    },
                    {
                        $addFields: {
                            grade: {
                                $toObjectId: "$grade"
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: "colormasters",
                            localField: "grade",
                            foreignField: "_id",
                            as: "grade"
                        }
                    },
                    {
                        $unwind: "$grade"
                    },
                    {
                        $group: {
                            _id: "$grade.name",
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            grade: "$_id",
                            count: 1,
                            _id: 0
                        }
                    }
                ])
            ]);

            if (gradeWiseChecks?.length) {
                console.log("gradeWiseChecks[0]", gradeWiseChecks[0]);

            }

            // Return the counts
            return {
                initiatedChecksCount: initiatedChecks?.length ? initiatedChecks[0].initiatedChecksCount : 0,
                wipChecksCount: wipChecks?.length ? wipChecks[0].wipChecksCount : 0,
                insuffChecksCount: insuffChecks?.length ? insuffChecks[0].insuffChecksCount : 0,
                checksWithinTATCount: checksWithinTAT?.length ? checksWithinTAT[0].checksWithinTATCount : 0,
                checksBeyondTATCount: checksBeyondTAT?.length ? checksBeyondTAT[0].checksBeyondTATCount : 0,
                completedChecksCount: completedChecks?.length ? completedChecks[0].completedChecksCount : 0,
                rejectedChecksCount: rejectedChecks?.length ? rejectedChecks[0].rejectedChecksCount : 0,
                gradeWiseChecksCount: gradeWiseChecks?.length ? gradeWiseChecks[0] : { count: 0, grade: 0 }
            };
        });
        const aggregatedCounts = await Promise.all(componentPromises).then(results => {
            // Combine all the role results
            return results.reduce((acc, result) => {
                acc.initiatedChecksCount += result.initiatedChecksCount;
                acc.wipChecksCount += result.wipChecksCount;
                acc.insuffChecksCount += result.insuffChecksCount;
                acc.checksWithinTATCount += result.checksWithinTATCount;
                acc.checksBeyondTATCount += result.checksBeyondTATCount;
                acc.completedChecksCount += result.completedChecksCount;
                acc.rejectedChecksCount += result.rejectedChecksCount;

                if (result?.gradeWiseChecksCount?.grade) {
                    if (result.gradeWiseChecksCount.grade === 'Green') {
                        acc.checksGradedAsGreenCount += result.gradeWiseChecksCount.count
                    } else if (result.gradeWiseChecksCount.grade === 'Red') {
                        acc.checksGradedAsRedCount += result.gradeWiseChecksCount.count
                    } else if (result.gradeWiseChecksCount.grade === 'Amber') {
                        acc.checksGradedAsAmberCount += result.gradeWiseChecksCount.count
                    }
                }



                return acc;
            }, {
                initiatedChecksCount: 0,
                wipChecksCount: 0,
                insuffChecksCount: 0,
                checksWithinTATCount: 0,
                checksBeyondTATCount: 0,
                completedChecksCount: 0,
                rejectedChecksCount: 0,
                checksGradedAsGreenCount: 0,
                checksGradedAsRedCount: 0,
                checksGradedAsAmberCount: 0

            });
        });

        aggregatedCounts.holdChecksCount = 0;
        // Return the final result
        return res.status(200).json(aggregatedCounts);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getQcDashboardData(req, res) {
    try {
        const initiationDate = getStartDateOfTheCurrentMonthWithTime0();
        const components = await Component.find({}, { name: 1, _id: 0 }).lean();

        // Create an array of promises to handle asynchronous operations
        const promises = components.map(async (component) => {
            const pathToModel = `../../models/data_entry/${component.name}.model`;

            if (!fs.existsSync(path.join(__dirname, pathToModel.concat(".js")))) {
                return {
                    checksInInterimQc: 0,
                    checksCompletedInInterimQcMonthly: 0,
                    noOfChecksInFinalQc: 0,
                    checksCompletedInFinalQcMonthly: 0,
                    noOfChecksGradedAs: {
                        Green: 0,
                        Red: 0,
                        Amber: 0
                    },
                    checksRejectedInInterimQcMonthly:0,
                    checksRejectedInFinalQcMonthly:0
                };
            }

            const Model = require(pathToModel);

            // Collect the various promises
            const checksInInterimQcPromise = Model.countDocuments({verificationCompletionDate:{$gte:initiationDate},status:"VERIFICATION-COMPLETED"}).lean();

            const checksCompletedInInterimQcMonthlyPromise = Model.countDocuments({mentorReviewCompletionDate:{$gte:initiationDate}}).lean();

            const noOfChecksInFinalQcPromise = Model.aggregate([
                {
                    $match: {
                        status:"MENTOR-REVIEW-ACCEPTED",
                        mentorReviewCompletionDate:{$gte:initiationDate},
                        grade: {
                            $in: [
                                "602f8b3743383ec9a722496e",
                                "602f8b3743383ec9a722496f",
                                "602f8b3743383ec9a7224970"
                            ]
                        }
                    }
                },
                {
                    $lookup:{
                        from: 'cases',
                        localField: 'case',
                        foreignField: '_id',
                        as: 'case'
                    }
                },
                {
                    $unwind: "$case"
                },
                {
                    $match:{
                        "case.status":"MENTOR-REVIEW-ACCEPTED"
                    }
                },
                {
                    $count:"checksInFinalQc"
                }
            ]);

            const checksCompletedInFinalQcMonthlyPromise = Model.countDocuments({outputqcCompletionDate:{$gte:initiationDate}}).lean();

            const noOfChecksGradedAsPromise = Model.aggregate([
                {
                    $match:{
                        outputqcCompletionDate:{$gte:initiationDate},
                        status:"OUTPUTQC-ACCEPTED"
                    }
                },
                {
                    $lookup:{
                        from: 'cases',
                        localField: 'case',
                        foreignField: '_id',
                        as: 'case'
                    }
                },
                {
                    $unwind: "$case"
                },
                {
                    $match:{
                        "case.status":"OUTPUTQC-ACCEPTED"
                    }
                },
                {
                    $addFields: {
                        grade: {
                            $toObjectId: "$grade"
                        }
                    }
                },
                {
                    $lookup: {
                        from: "colormasters",
                        localField: "grade",
                        foreignField: "_id",
                        as: "grade"
                    }
                },
                {
                    $unwind: "$grade"
                },
                {
                    $group: {
                        _id: "$grade.name",
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        grade: "$_id",
                        count: 1,
                        _id: 0
                    }
                }
            ])

            const checksRejectedInInterimQcMonthlyPromise = Model.countDocuments({mentorReviewRejectionDate:{$gte:initiationDate}}).lean();
            const checksRejectedInFinalQcMonthlyPromise = Model.countDocuments({outputqcRejectionDate:{$gte:initiationDate}}).lean();


            // Wait for all promises to resolve
            const [checksInInterimQc, checksCompletedInInterimQcMonthly, noOfChecksInFinalQc, checksCompletedInFinalQcMonthly, noOfChecksGradedAs,checksRejectedInInterimQcMonthly,checksRejectedInFinalQcMonthly] = await Promise.all([
                checksInInterimQcPromise,
                checksCompletedInInterimQcMonthlyPromise,
                noOfChecksInFinalQcPromise,
                checksCompletedInFinalQcMonthlyPromise,
                noOfChecksGradedAsPromise,
                checksRejectedInInterimQcMonthlyPromise,
                checksRejectedInFinalQcMonthlyPromise
            ]);

            const result = {
                checksInInterimQc: checksInInterimQc || 0,
                checksCompletedInInterimQcMonthly: checksCompletedInInterimQcMonthly || 0,
                noOfChecksInFinalQc: (noOfChecksInFinalQc?.length ? noOfChecksInFinalQc[0].checksInFinalQc : 0),
                checksCompletedInFinalQcMonthly: checksCompletedInFinalQcMonthly || 0,
                noOfChecksGradedAs: {
                    Green: 0,
                    Red: 0,
                    Amber: 0
                },
                checksRejectedInInterimQcMonthly:checksRejectedInInterimQcMonthly||0,
                checksRejectedInFinalQcMonthly:checksRejectedInFinalQcMonthly||0
            };

            if(noOfChecksGradedAs?.length && noOfChecksGradedAs[0].grade){
                if(noOfChecksGradedAs[0].grade==='Green'){
                    result.noOfChecksGradedAs.Green+=noOfChecksGradedAs[0].count;
                }else if(noOfChecksGradedAs[0].grade==='Red'){
                    result.noOfChecksGradedAs.Red+=noOfChecksGradedAs[0].count;
                }else if(noOfChecksGradedAs[0].grade==='Amber'){
                    result.noOfChecksGradedAs.Amber+=noOfChecksGradedAs[0].count;
                }
            }

            return result;
        });

        // Execute all promises
        const results = await Promise.all(promises);

        // Aggregate results
        const aggregatedCounts = results.reduce((acc, result) => {
            acc.totalChecksInInterimQc += result.checksInInterimQc;
            acc.totalChecksCompletedInInterimQcMonthly += result.checksCompletedInInterimQcMonthly;
            acc.totalChecksInFinalQc += result.noOfChecksInFinalQc;
            acc.totalChecksCompletedInFinalQcMonthly += result.checksCompletedInFinalQcMonthly;
            acc.totalChecksGradedAsGreen += result.noOfChecksGradedAs.Green;
            acc.totalChecksGradedAsRed += result.noOfChecksGradedAs.Red;
            acc.totalChecksGradedAsAmber += result.noOfChecksGradedAs.Amber;
            acc.checksRejectedInInterimQcMonthly +=result.checksRejectedInInterimQcMonthly;
            acc.checksRejectedInFinalQcMonthly +=result.checksRejectedInFinalQcMonthly;
            return acc;
        }, {
            totalChecksInInterimQc: 0,
            totalChecksCompletedInInterimQcMonthly: 0,
            totalChecksInFinalQc: 0,
            totalChecksCompletedInFinalQcMonthly: 0,
            totalChecksGradedAsGreen: 0,
            totalChecksGradedAsRed: 0,
            totalChecksGradedAsAmber: 0,
            checksRejectedInInterimQcMonthly:0,
            checksRejectedInFinalQcMonthly:0
        });

        return res.status(200).json(aggregatedCounts);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function getInceptionDashboardData(req,res){
    try{
        const initiationDate = getStartDateOfTheCurrentMonthWithTime0();

       const checksInceptedPromise =  Case.countDocuments({initiationDate: { $gte: initiationDate },status:"INITIATED"});
       const checksAssignedPromise =  Case.countDocuments({initiationDate: { $gte: initiationDate },status:"INITIATED",$and:[{dataEntryAllocatedTo:{$exists:true}},{dataEntryAllocatedTo:{$ne:null}}]});
       const checksPendingAssignmentPromise =  Case.countDocuments({initiationDate: { $gte: initiationDate },status:"INITIATED",$or:[{dataEntryAllocatedTo:{$exists:false}},{dataEntryAllocatedTo:null}]});
       const checksUnderInceptionQcPromise =  Case.countDocuments({initiationDate: { $gte: initiationDate },status:{$in:["DE-COMPLETED","CDE-COMPLETED"]}});
       const checksUnderInceptionQcRejectedPromise =  Case.countDocuments({initiationDate: { $gte: initiationDate },status:"INPUTQC-REJECTED"});

      const [checksInceptedCount,checksAssignedCount,checksPendingAssignmentCount,checksUnderInceptionQcCount,checksUnderInceptionQcRejectedCount] = await Promise.all([checksInceptedPromise,checksAssignedPromise,checksPendingAssignmentPromise,checksUnderInceptionQcPromise,checksUnderInceptionQcRejectedPromise]);

      return res.status(200).json({checksInceptedCount,checksAssignedCount,checksPendingAssignmentCount,checksUnderInceptionQcCount,checksUnderInceptionQcRejectedCount})


    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

/*module.exports = {
    getClientDashboardData,
    getAnalystDashboardData,
    getTlDashboardData,
    getQcDashboardData,
    getInceptionDashboardData
};*/

/*async function caseHistoryNotification(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        // Get user access to subclients
        const userSubclientAccesses = await subclinentsAssignedToTheUser(userId);
        if (!userSubclientAccesses || userSubclientAccesses.length === 0) return res.json([]);

        // Step 1: Get all accessible Case IDs
        const accessibleCases = await Case.find({
            $or: userSubclientAccesses.map(access => {
                if (access.subclient) {
                    return { client: access.client, subclient: access.subclient };
                }
                return { client: access.client };
            })
        }).select("_id");

        const accessibleCaseIds = accessibleCases.map(c => c._id);

        if (accessibleCaseIds.length === 0) return res.json([]);

        // Step 2: Fetch last 10 CaseHistory for accessible cases
        const history = await case_historyModel.find({ case: { $in: accessibleCaseIds } })
            .sort({ date: -1 })       // newest first
            .limit(10)
            .populate("case", "caseId client subclient candidateName") // populate only needed fields
            .lean();

        res.json(history);

    } catch (err) {
        console.error("Error fetching case history:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}*/

async function caseHistoryNotification(req, res) {
    try {
        const userId = req.user?.user_id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        // Get user access to subclients
        const userSubclientAccesses = await subclinentsAssignedToTheUser(userId);
        if (!userSubclientAccesses || userSubclientAccesses.length === 0) return res.json([]);

        // Step 1: Get all accessible Case IDs
        const accessibleCases = await Case.find({
            $or: userSubclientAccesses.map(access => {
                if (access.subclient) {
                    return { client: access.client, subclient: access.subclient };
                }
                return { client: access.client };
            })
        }).select("_id");

        const accessibleCaseIds = accessibleCases.map(c => c._id);
        if (accessibleCaseIds.length === 0) return res.json([]);

        // Step 2: Fetch last 10 CaseHistory for accessible cases with filtered status
        const history = await case_historyModel.find({
            case: { $in: accessibleCaseIds },
            $or: [
                { status: "CASE-INITIATED" },
                { status: "OUTPUTQC-ACCEPTED" },
                //{ status: "MENTOR-REVIEW-ACCEPTED" },
                { status: { $regex: /^insuf/i } } // matches anything starting with "insuf" (case-insensitive)
            ]
        })
            .sort({ date: -1 })       // newest first
            .limit(10)
            .populate("case", "caseId client subclient candidateName") // populate only needed fields
            .lean();

        res.json(history);

    } catch (err) {
        console.error("Error fetching case history:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function caseHistoryById(req, res) {
    try {
        const caseId = req.params.caseId;
        const userId = req.user?.user_id;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        // Get user access to subclients
        const userSubclientAccesses = await subclinentsAssignedToTheUser(userId);
        if (!userSubclientAccesses || userSubclientAccesses.length === 0)
            return res.status(403).json({ message: "No access to any clients/subclients" });

        // Build access filter
        const accessFilter = userSubclientAccesses.map(access => {
            return access.subclient
                ? { client: access.client, subclient: access.subclient }
                : { client: access.client };
        });

        // 🔹 Step 1: Validate case belongs to user’s accessible clients/subclients
        const caseDoc = await Case.findOne({
            caseId: caseId,
            $or: accessFilter
        }).select("_id");

        if (!caseDoc) {
            return res.status(404).json({ message: "Case not found or not accessible" });
        }

        // 🔹 Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // 🔹 Step 2: Fetch paginated history entries
        const [history, total] = await Promise.all([
            case_historyModel
                .find({ case: caseDoc._id })
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit)
                .populate("case", "caseId client subclient candidateName")
                .lean(),
            case_historyModel.countDocuments({ case: caseDoc._id })
        ]);

        return res.json({
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            records: history
        });

    } catch (err) {
        console.error("Error fetching case history:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function finalMonthsCount(req, res) {
  try {
    // Define the start & end of your financial year (April 2025 → March 2026)
    const startDate = new Date("2025-04-01T00:00:00.000Z");
    const endDate = new Date("2026-03-31T23:59:59.999Z");

    // Fetch all cases that match status & fall in range
    const cases = await Case.find({
      status: "OUTPUTQC-ACCEPTED",
      initiationDate: { $gte: startDate, $lte: endDate },
    });

    // Create buckets for Apr 2025 → Mar 2026
    const months = [];
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(startDate.getMonth() + i);

      const label = monthDate.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      months.push({
        month: label,
        total: 0,
        withinTat: 0,
        beyondTat: 0,
        cases: [], // optional if you want details
      });
    }
 // Process cases
    cases.forEach((aCase) => {
      const initiationDate = new Date(aCase.initiationDate);
      const completionDate = new Date(aCase.outputqcCompletionDate);
      const tatEndDate = new Date(aCase.tatEndDate);

      // Which month bucket?
      const monthIndex =
        (completionDate.getFullYear() - startDate.getFullYear()) * 12 +
        (completionDate.getMonth() - startDate.getMonth());

      if (monthIndex >= 0 && monthIndex < 12) {
        const daysTaken = Math.ceil(
          (completionDate - initiationDate) / (1000 * 60 * 60 * 24)
        );

        months[monthIndex].total += 1;

        if (completionDate > tatEndDate) {
          months[monthIndex].beyondTat += 1;
        } else {
          months[monthIndex].withinTat += 1;
        }

        months[monthIndex].cases.push({
          caseId: aCase._id,
          initiationDate,
          completionDate,
          tatEndDate,
          daysTaken,
        });
      }
    });

    return res.json({ months });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function sendEmail  (req, res)  {
  try {
    const { to, subject, body } = req.body;

  let attachments = [];

    if (req.files && req.files.attachments) {
      const uploadedFiles = Array.isArray(req.files.attachments)
        ? req.files.attachments
        : [req.files.attachments]; // wrap single file into array

      attachments = uploadedFiles.map(file => ({
        filename: file.name,
        content: file.data,
      }));
    }
console.log(to, subject, body,"to, subject, body");
console.log(attachments,"attachments");

    // await mailSend.sendMail(to, subject, body, attachments);
    await mailSend.sendMail(to, subject, body, attachments);

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};





module.exports = {
    getClientDashboardData,
    getAnalystDashboardData,
    getTlDashboardData,
    getQcDashboardData,
    getInceptionDashboardData,
    finalMonthsCount,
    sendEmail,
    caseHistoryNotification,
    caseHistoryById
};
