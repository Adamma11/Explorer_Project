const path = require('path');
const fs = require('fs');
const Case = require('../../models/uploads/case.model');
const componentModel = require('../../models/administration/component.model');
const ColorMaster = require('../../models/administration/color_master.model')
const user_subclient_access = require('../../models/administration/user_subclient_access.model');


exports.get = async (req, res) => {
    try {
        const caseid = req.query.caseid;
        const caseData = await Case.findOne({caseId: caseid });
        let userSubclientAccessData = await user_subclient_access.findOne({
            $and: [
                { subclient: caseData.subclient },
                { user: req.user.user_id }
            ]
        });

        if (!userSubclientAccessData) {
            return res.status(403).json({ message: "Forbidden" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error Fetching data"
        });
    }

    let colorMasterDetails = [];
    let componentDisplayMap = {};
    const COMPONENT_STATUS_CONFIG = {
        courtrecord: ["OUTPUTQC-ACCEPTED", "MENTOR-REVIEW-ACCEPTED"],
        globaldatabase: ["OUTPUTQC-ACCEPTED", "MENTOR-REVIEW-ACCEPTED"],
        identity: ["OUTPUTQC-ACCEPTED", "MENTOR-REVIEW-ACCEPTED"],
    };

    try {
        colorMasterDetails = await ColorMaster.find();
        const components = await componentModel.find();
        components.forEach(comp => {
            componentDisplayMap[comp.name] = comp.displayName;
        });
    } catch (err) {
        console.log("Error fetching metadata", err);
        return res.status(500).json({ message: "Error initializing data" });
    }

    function getColorCodeName(colorCode) {
        if (!colorCode) return "In Progress";
        const color = colorMasterDetails.find(c => 
            c._id.toString() === colorCode.toString()
        );
        return color ? color.name : "In Progress";
    }

    function getStatus(item, componentName) {
        const validStatuses = COMPONENT_STATUS_CONFIG[componentName] || ["OUTPUTQC-ACCEPTED"];
        return validStatuses.includes(item.status) ? "Completed" : "Pending";
    }

    async function getComponentDetails(componentName, caseId) {
        try {
            const modelPath = `../../models/data_entry/${componentName}.model`;
            const model = require(modelPath);
            const data = await model.find({ case: caseId });

            return data.map(item => ({
                _id: item._id,  
                component: componentDisplayMap[componentName] || componentName,
                status: getStatus(item, componentName),
                gradingColor: getStatus(item, componentName) === "Completed" 
                    ? getColorCodeName(item.grade) 
                    : ""
            }));
        } catch (err) {
            console.error(`Error processing ${componentName}:`, err);
            return [];
        }
    }

    try {
        const caseData = await Case.findOne({ caseId: req.query.caseid });
        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        const componentPromises = caseData.actualComponents.map(comp => 
            getComponentDetails(comp, caseData._id)
        );

        const componentResults = await Promise.all(componentPromises);
        
        let caseDetails = {
            _id: caseData.id,
            caseId: caseData.caseId,
            candidateName: caseData.candidateName,
            clientName: caseData.clientName,
            subclientName: caseData.subclientName,
            status: caseData.status === "OUTPUTQC-ACCEPTED" ? "Completed" : "Pending",
        };

        caseData.actualComponents.forEach((comp, index) => {
            caseDetails[`${comp}Details`] = componentResults[index];
        });

        if (caseData.status === "STOP-CASE") {
            caseDetails.status = "STOP-CASE";
        }

        if (caseData.subclient === "606d535ca683d2be0c01440e") {
          console.log("Adding Post Hire Status and Pre Hire Status...");
          keys = Object.keys(caseDetails);
          let keysToCheck = keys.filter((key) => key.includes("Details"));
          console.log(keysToCheck);
          // If GlobalDb, Identity, courtrecord Details grading color are green, set the pre hire status as green

          keysToCheck = keysToCheck.filter(
            (key) =>
              key.includes("globaldatabaseDetails") ||
              key.includes("identityDetails") ||
              key.includes("courtrecordDetails")
          );
          if (
            !(
              keysToCheck.includes("globaldatabaseDetails") ||
              keysToCheck.includes("identityDetails") ||
              keysToCheck.includes("courtrecordDetails")
            )
          ) {
            keysToCheck = [];
          }
          console.log("Pre hire keys to check : ", keysToCheck);
          if (!keysToCheck.length) {
            caseDetails["preHireStatus"] = "Work In Progress";
          } else {
            keysToCheck.forEach((key) => {
              const currentKey = caseDetails[key];
              for (let i = 0; i < currentKey.length; i++) {
                if (currentKey[i].gradingColor) {
                  if (currentKey[i].gradingColor != "Green") {
                    if (currentKey[i].gradingColor == "Red") {
                      caseDetails.preHireStatus =
                        "Does not meet company requirements";
                      break;
                    } else {
                      caseDetails.preHireStatus = "Unable to Verify";
                      break;
                    }
                  }
                } else {
                  caseDetails.preHireStatus = "Work In Progress";
                  break;
                }
              }

              caseDetails["preHireStatus"] = caseDetails["preHireStatus"]
                ? caseDetails.preHireStatus
                : "Meets Company Requirements";
            });
          }

          // If all component gradingColor are green, set the post hire status as green, else least grading color.

          keys = Object.keys(caseDetails);
          keysToCheck = keys.filter((key) => key.includes("Details"));
          console.log("Post hire keys to check : ", keysToCheck);
          if (
            !keysToCheck.length &&
            caseDetails["preHireCheck"] === "Meets Company Requirements"
          ) {
            caseDetails["postHireStatus"] = "Meets Company Requirements";
          }

          keysToCheck.forEach((key) => {
            const currentKey = caseDetails[key];
            for (let i = 0; i < currentKey.length; i++) {
              if (currentKey[i].gradingColor) {
                if (currentKey[i].gradingColor != "Green") {
                  if (currentKey[i].gradingColor == "Red") {
                    caseDetails.postHireStatus =
                      "Does not meet company requirements";
                    break;
                  } else {
                    caseDetails.postHireStatus = "Unable to Verify";
                    break;
                  }
                }
              } else {
                caseDetails.postHireStatus = "Work In Progress";
                break;
              }
            }

            caseDetails["postHireStatus"] = caseDetails["postHireStatus"]
              ? caseDetails.postHireStatus
              : "Meets Company Requirements";
          });

          if (caseDetails["preHireStatus"] !== "Meets Company Requirements") {
            caseDetails["postHireStatus"] = "On Hold";
          }

          if (data.status == "STOP-CASE") {
            caseDetails["preHireStatus"] = "Stop/Cancel";
            caseDetails["postHireStatus"] = "Stop/Cancel";
          }

          console.log("Added Post Hire and pre hire statuses");
        }

        if (caseData.client === "6062fdcb73e66249830625ee" && 
            (caseData.reportDate || caseData.reportType === "FINAL")) {
            const finalReportPath = `/cvws_new_uploads/case_uploads/${caseData.caseId}/reports/FINAL`;
            if (fs.existsSync(finalReportPath)) {
                const finalReport = fs.readdirSync(finalReportPath)[0];
                const finalReportBase64 = fs.readFileSync(
                    `${finalReportPath}/${finalReport}`, 
                    'base64'
                );
                caseDetails.finalReport = finalReportBase64;
            }
        }

        Object.keys(caseDetails).forEach(key => {
            if (Array.isArray(caseDetails[key]) && caseDetails[key].length === 0) {
                delete caseDetails[key];
            }
        });

        return res.json(caseDetails);

    } catch (err) {
        console.error("Error processing case:", err);
        return res.status(500).json({ message: "Error processing case data" });
    }
};
