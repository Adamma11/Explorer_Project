const { workerData, parentPort } = require('worker_threads')
const fs = require('fs')
const ExcelJS = require('exceljs');

exports.getInsuffForClientReport = (req,res)=>{
    const workBook = new  ExcelJS.Workbook()
    console.log("Workbook constructed")	
    const sheet = workBook.addWorksheet('Vendor Tracker')
    let addedRow = sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Component","Insuff Raised Date","Insuff Comments"])
    addedRow.commit()	

    let writeDetails = function(details){
        return new Promise((resolve,reject)=>{
           details.forEach(item=>{
           let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.component.displayName,item.insufficiencyRaisedDate,item.insufficiencyComments])
           ar.commit() 		   
	   }) 
	})
    }
    prepareReport()
    async function prepareReport(){
        let employmentDetails = await writeDetails(workerData.employmentDetails)
        let empbasicDetails = await writeDetails(workerData.empbasicDetails)
        let empadvanceDetails = await writeDetails(workerData.empadvanceDetails)
        let educationDetails = await writeDetails(workerData.educationDeails)
        let educationAdvancedDetails = await writeDetails(workerData.educationAdvancedDetails)
        let educationComprehensiveDetails = await writeDetails(workerData.educationComprehensiveDetails)
        let addressDetails = await writeDetails(workerData.addressDetails)
        let addressComprehensiveDetails = await writeDetails(workerData.addressComprehensiveDetails)
        let addressOnlineDetails = await writeDetails(workerData.addressOnlineDetails)
        let addressTelephoneDetails = await writeDetails(workerData.addressTelephoneDetails)
        let courtRecordDetails = await writeDetails(workerData.courtRecordDetails)
        let criminalRecordDetails = await writeDetails(workerData.criminalRecordDetails)
        let referenceRecordDetails = await writeDetails(workerData.referenceRecordDetails)
        let refBasicDetails = await writeDetails(workerData.refBasicDetails)
        let identityDetails = await writeDetails(workerData.identityDetails)
        let creditCheckDetails = await writeDetails(workerData.creditCheckDetails)
        let credittransDetails = await writeDetails(workerData.credittransDetails)
        let creditEquifaxDetails = await writeDetails(workerDeta.creditEquifaxDetails)
        let globaldatabaseDetails = await writeDetails(workerData.globaldatabaseDetails)
        let drugtestfiveDetails = await writeDetails(workerData.drugtestfiveDetails)
        let drugtestsixDetails = await writeDetails(workerData.drugtestsixDetails)
        let drugtestsevenDetails = await writeDetails(workerData.drugtestsevenDetails)
        let drugtesteightDetails = await writeDetails(workerData.drugtesteightDetails)
        let drugtestnineDetails = await writeDetails(workerData.drugtestnineDetails)
        let drugtesttenDetails = await writeDetails(workerData.drugtesttenDetails)
        let dlCheckDetails = await writeDetails(workerData.dlCheckDetails)
        let directorshipCheckDetails = await writeDetails(workerData.directorshipCheckDetails)
        let voterIdDetails = await writeDetails(workerData.voterIdDetails)
        let vddAdvanceDetails = await writeDetails(workerData.vddAdvanceDetails)
        let dlBankStmtDetails = await writeDetails(workerData.dlBankStmtDetails)
        let siteCheckDetails = await writeDetails(workerData.siteCheckDetails)
        let psychometricDetails = await writeDetails(workerData.psychometricDetails)
        let socialmediaCheckDetails = await writeDetails(workerData.socialmediaCheckDetails)
        let facisl3Details = await writeDetails(workerData.facisl3Details)
        let ofacDetails = await writeDetails(workerData.ofacDetails)
        let gapvfnDetails = await writeDetails(workerData.gapvfnDetails)
        let passportDetails = await writeDetails(workerData.passportDetails)
        const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/insuff_tracker_${workerData.userId}.xlsx`);
        workBook.xlsx.write(fileStream);
        parentPort.postMessage({status:"Done"})
     
    }

 }
