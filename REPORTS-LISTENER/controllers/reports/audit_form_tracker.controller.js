//const AuditForm = require("../../models/masters/auditForm.model")
const User = require("../../models/administration/user.model")
const xlsx = require("xlsx")

const path = require("path")
const fs = require("fs")

exports.downloadAuditFormTracker = async (req, res) => {
    try {
        const auditFormData = await AuditForm.find({})

        // console.log(auditFormData)
        const finalData = new Array()
        for (let i = 0; i < auditFormData.length; i++) {
            const item = auditFormData[i]
            const user = await User.findOne({ _id: item.modifiedBy })

            finalData[i] = {
                _id: `ObjectId(${item._id})`,
                modifiedOn: item.modifiedOn,
                branch: item.branch,
                componentType: item.componentType,
                client: item.client,
                caseId: item.caseId,
                digitizedRecordDate: item.digitizedRecordDate,
                analyst: item.analyst,
                employer: item.employer,
                parameter1: item.parameter1,
                parameter2: item.parameter2,
                parameter3: item.parameter3,
                parameter4: item.parameter4,
                parameter5: item.parameter5,
                status: item.status,
                compilance: item.compilance,
                error: item.error,
                secondaryError: item.secondaryError,
                tertiaryError: item.tertiaryError,
                errorcategory: item.errorcategory,
                severity: item.severity,
                comment: item.comment,
                modifiedBy: user.name
            }
        }

        console.log(finalData)
        const newWB = xlsx.utils.book_new()
        const newWS = xlsx.utils.json_to_sheet(finalData)
        xlsx.utils.book_append_sheet(newWB, newWS, "Audit Form")
        xlsx.writeFile(newWB, path.join("/tmp", "Audit_Form.xlsx"))
        res.download(path.join("/tmp", "Audit_Form.xlsx"))
        setTimeout(() => {
            var filePath = path.join("/tmp", "Audit_Form.xlsx");
            fs.unlinkSync(filePath);
            console.log("file deleted")
        }, 2000)


    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Could not get audit form tracker due to an internal server error: " + err })
    }

}
