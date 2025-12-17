const CaseHistory = require('../../models/data_entry/case_history.model')
const moment = require('moment')
const express = require('express')
const Case = require('../../models/uploads/case.model')
const xlsx = require('xlsx')
const path = require('path')
const fs = require('fs')
exports.create = (acase,component,check,operation,status,remarks,allocatedToVendor,allocatedToFe,allocatedToVerifier,user)=>{
    const caseHistory = new CaseHistory({
        case:acase,
        component:component,
	check:check,    
        operation:operation,
	status:status,    
        remarks:remarks,
        allocatedToVendor:allocatedToVendor,        
	allocatedToFe:allocatedToFe,
	allocatedToVerifier:allocatedToVerifier,    
        user:user,
        date: moment(Date.now()).add(5,'hours').add(30,'minutes')
    })
    if(acase != null){	
      caseHistory
      .save(caseHistory)
      .then(data=>{
          return true
      })
      .catch(err=>{
    	console.log("Error creating",err)    
        return false
      })
    }else{
      return false	    
    }
}
exports.getCaseHistory = (req,res)=>{
   CaseHistory
   .find({case:req.params.case})
   .sort({date:1})
   .populate({path:'component'})	
   .populate({path:'allocatedToVendor'})	
   .populate({path:'allocatedToFe'})
   .populate({path:'allocatedToVerifier'})
   .populate({path:'user'})	
   .then(data=>{
      res.json(data)	   
   })	
   .catch(err=>{
      res.status(500).json({
	      message : 'Error retrieving Case History'     
      })	   
   })	

}
exports.getCheckHistory = (req,res)=>{
   console.log("In check history.........")	
   console.log("case is ",req.params.case)
   console.log("component is ",req.params.component)
   console.log("check is ",req.params.check)	
   CaseHistory
   .find({case:req.params.case,check:req.params.check})
   .sort({date:1})
   .populate({path:'component'})	
   .populate({path:'allocatedToVendor'})
   .populate({path:'allocatedToFe'})
   .populate({path:'allocatedToVerifier'})
   .populate({path:'user'})
   .then(data=>{
      res.json(data)
   })
   .catch(err=>{
      res.status(500).json({
              message : 'Error retrieving Case History'
      })
   })

}

//case full  history

exports.getCaseHistoryWithoutComponent = async (req, res) => {

   try {
      const case_id = req.params.case


      if (!case_id) {
         return res.status(404).json({ message: "Did not recieve Case ID." })
      }

      // Finding case history for the case ID

      console.log("Finding case history for the case ID:", case_id)
      const resultArray = new Array()

      const caseData = await Case.findOne({ _id: case_id })
         .populate({ path: "interimReportUploadedBy" })

      // Case Initiation Date
      resultArray.push({ operation: "CASE INITIATED", date: caseData.initiationDate })

      // Data Entry Allocation Date

      // Getting d-e allocation

      const caseHistoryData = await CaseHistory.findOne({ case: caseData._id, operation: "Case Allocation" })

      if (caseHistoryData) {
         resultArray.push({ dataEntryAllocationDate: caseHistoryData.date })
      }

      // Data Entry Completion date
      if (caseData.dataEntryCompletionDate) {
         resultArray.push({ operation: "DATA ENTRY COMPLETED", date: caseData.dataEntryCompletionDate })

      }

      // Input QC completion date
      if (caseData.inputqcCompletionDate) {
         resultArray.push({ operation: "INPUT QC COMPLETED", date: caseData.inputqcCompletionDate })

      }

      // output qc allocation date
      if (caseData.outputqcAllocationDate) {
         resultArray.push({ operation: "OUTPUT QC ALLOCATED", date: caseData.outputqcAllocationDate })
      }

      // output qc completion date
      if (caseData.outputqcCompletionDate) {
         resultArray.push({ operation: "OUTPUT QC COMPLETED", date: caseData.outputqcCompletionDate })
      }

      // interim report uploaded by
      if (caseData.interimReportUploadedBy) {
         resultArray.push({ operation: "INTERIM REPORT UPLOADED BY", user: caseData.interimReportUploadedBy.name })
      }

      // interim report uploaded date
      if (caseData.interimReportDate) {
         resultArray.push({ operation: "INTERIM REPORT DATE", date: caseData.interimReportDate })
      }

      // final report uploaded date
      if (caseData.reportDate) {
         resultArray.push({ operation: "FINAL REPORT DATE", date: caseData.reportDate })
      }

      return res.json(resultArray)

   } catch (err) {
      console.log(err)

      return res.status(500).json({ error: "Could not fetch case history data due to an internal error." })
   }
}
//new 06-jan-23
exports.exportCaseHistory = async (req, res) => {

   try {

      const dateFrom = req.query.fromDate

      const dateTo = req.query.toDate

      // Quering for the case data in the provided date range

      console.log(req.query)

      const caseData = await Case.find({ initiationDate: { $gte: dateFrom, $lte: dateTo } })

      console.log("caseData:", caseData)

      // If no case data return error 404.

 

      if (!caseData) {

         return res.status(404).json({ message: "Could not find case data." })

      }

 

      const resultData = new Array()

 

      for (let i = 0; i < caseData.length; i++) {

         const item = caseData[i]

 

         // Adding required data to convert to xlsx

 

         resultData[i] = {

            "Case ID": item.caseId,

            "Initiation Date": item.initiationDate,

            "Data Entry Allocation Date": item.dataEntryAllocationDate,

            "Data Entry Completion Date": item.dataEntryCompletionDate,

            "Input QC Completion": item.inputqcCompletionDate,

            "Verification Allocation Date": item.verificationAllocationDate,

            "Verification Completion Date": item.verificationCompletionDate,

            "Mentor Review Accepted Date": item.mentorReviewAcceptedDate,

            "OutputQC Allocation Date": item.outputqcAllocationDate,

            "OutputQC Completion Date": item.outputqcCompletionDate,

            "Report Uploaded Date": item.reportDate,

            "Components to Check": item.componentsToCheck == null ? "" : item.componentsToCheck.map(component => component.componentName).toString(),

            "Number of Components": item.componentsToCheck == null ? 0 : item.componentsToCheck.length

         }

      }

 

      // Writing to XLSX

 

      const newWB = xlsx.utils.book_new()

      const newWS = xlsx.utils.json_to_sheet(resultData)

      xlsx.utils.book_append_sheet(newWB, newWS, "Case Data")

      xlsx.writeFile(newWB, path.join("/REPO_STORAGE/tmp_tl_tracker", "Case_Data.xlsx"))

 

      res.download(path.join("/REPO_STORAGE/tmp_tl_tracker", "Case_Data.xlsx"))

      // Deleting the file

 

      setTimeout(() => {

         var filePath = path.join("/REPO_STORAGE/tmp_tl_tracker", "Case_Data.xlsx");

         fs.unlinkSync(filePath);

         console.log("file deleted")

      }, 4000)

 

   } catch (err) {

      console.log(err)

      res.status(500).json({ error: "Could not download xlsx file." })

   }

}