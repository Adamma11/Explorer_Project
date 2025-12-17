const { zip, COMPRESSION_LEVEL } = require("zip-a-folder")
const fse = require('fs-extra');
const Case = require("../../models/uploads/case.model")
const casehistory = require("../data_entry/case_history.controller")
//const extract = require('extract-zip')
exports.compress = async (req, res) => {
    try {
        const caseIds = req.body.caseIds

        // Zipping folders, adding them to the original file and moving the file contents to a temp folder
        for (let i = 0; i < caseIds.length; i++) {
            try {

                // Check if the folder already contains a zip file, dont archive
                console.log("Attempting to archive folder: " + caseIds[i])
                const srcDir = `/REPO_STORAGE/case_uploads/${caseIds[i]}`;
                const destDir = `/REPO_STORAGE/case_uploads_temp/${caseIds[i]}`;

                const contents = fse.readdirSync(srcDir)
                console.log("conents:", contents)
                if (contents.length) {
                    if (contents[0].includes(".zip")) {
                        console.log("Cannot zip already archived")
                        continue
                    }
                }

                // If the folder does not contain zip file Copy Case Directory to temp folder
                console.log("Copying directory to: /REPO_STORAGE/case_uploads_temp/" + caseIds[i])
                fse.copySync(srcDir, destDir, { overwrite: true })


                // Compressing the file
                console.log("Compressing the file:" + caseIds[i])
                await zip(srcDir, `${srcDir}.zip`, { compression: COMPRESSION_LEVEL.medium });

                // Copying zip file to the original folder

                console.log("Copying zip file to the folder: ", srcDir)
                fse.removeSync(srcDir)
                fse.mkdirSync(srcDir)
                fse.moveSync(`/REPO_STORAGE/case_uploads/${caseIds[i]}.zip`, srcDir + `/${caseIds[i]}.zip`)

                // Updating Case and caseHistory
                const caseData = await Case.findOneAndUpdate({ caseId: caseIds[i] }, { archived: true, archivedOn: new Date() })
                if (caseData) {
                    casehistory.create(caseData._id, null, null, "Archived", "Archived", "Archived By", null, null, null, req.user.user_id)
                }

            } catch (err) {
                console.error(err)
                return res.status(500).json({ error: "Error archiving files due to an internal server error." })
            }

        }

        // After successfully zipping all the folder contents, deleting the folders from the temp file
        for (let i = 0; i < caseIds.length; i++) {
            const destDir = `/REPO_STORAGE/case_uploads_temp/${caseIds[i]}`;
            const contents = fse.readdirSync(destDir)

            if (!contents.length) {
                console.log("The directory " + destDir + " does not exist.")
                continue
            }
            console.log("Deleting folder from temp: " + caseIds[i])
            fse.removeSync(caseIds[i])
        }

        console.log("Files successfully archived and deleted from temp.")
        return res.json({ message: "All files archived successfully." })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Error archiving files due to an internal server error." })
    }


}


exports.decompress = async (req, res) => {

 

    try {

        const caseId = req.body.caseId

        const srcDir = `/REPO_STORAGE/case_uploads/${caseId}/`

        const srcZip = `/REPO_STORAGE/case_uploads/${caseId}/${caseId}.zip`;

        const destDir = `/REPO_STORAGE/case_uploads_temp/unarchived/`;

        console.log("Attempting to extract", srcZip)

        console.log(fse.pathExistsSync(srcZip))

        console.log(fse.pathExistsSync(srcDir))

        if (fse.pathExistsSync(srcDir) && fse.pathExistsSync(srcZip)) {

            await extract(srcZip, { dir: destDir + caseId })

            console.log("Extracted Successfully.")

 

            if (fse.readdirSync(destDir).length && fse.readdirSync(destDir).includes(caseId)) {

                console.log("Double checked, file extracted successfully.")

                fse.moveSync(`${destDir}/${caseId}`, srcDir, { overwrite: true })

                console.log("Moved file to", srcDir)

 

                res.json({ message: "Successfully unziped and moved to source folder." })

                const caseData = await Case.findOneAndUpdate({ caseId: caseId }, { archived: false, unArchivedOn: new Date(), unArchivedBy: req.user.user_id })

                if (caseData) {

                    casehistory.create(caseData._id, null, null, "UnArchived", "UnArchived", "UnArchived By", null, null, null, req.user.user_id)

                    return

                }

 

            } else {

                throw new Error("Some error occured while unzipping")

            }

        } else {

            console.log("File for caseId: " + caseId + " not found.")

            return res.status(400).json({ error: "File for caseId: " + caseId + " not found." })

        }

 

    } catch (err) {

        res.status(500).json(err)

    }

 

}
