const { workerData, parentPort } = require('worker_threads')
const fs = require('fs')
const ExcelJS = require('exceljs');

//console.log("About to write tl tracker ....... in worker thread",workerData.empDetails.length)
    const workBook = new  ExcelJS.Workbook()
    const sheet = workBook.addWorksheet('TL Pending')
    console.log("Sheet added")
    let addedRow = sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Father's Name","Date of Birth","Mobile Number","Component","Status","Initiation Date","TAT End Date","Verifier","FE","Vendor","VerificationCompletionDate","Verified By","Mentor Review Completion Date","Mentor Review Completed By","Output QC Completion Date","Output QC Completed By","Grading Color","Field 1","Field 2","Field 3","Field 4","Field 5","Field 6","Field 7","Field 8","Field 9","Field 10"])
    addedRow.commit()

let writeEmploymentDetails = function(){
   return new Promise((resolve,reject)=>{	
      workerData.empDetails.forEach(item=>{
//	 console.log("Writing case id ",item.case.caseId)     
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Employment"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//	  console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
	      
	      
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])  	
	 ar.commit()      
      })
      resolve(true)	   
   })
}
let writeEmpBasicDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.empBasicDetails.forEach(item=>{
//         console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Employment Basic"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//          console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
         ar.commit()	      
      })
      resolve(true)
   })
}		     
let writeEmpAdvanceDetails = function(){
   return new Promise((resolve,reject)=>{
      console.log("Size of  emp advance is ......................................................",workerData.empAdvanceDetails.length)	   
      workerData.empAdvanceDetails.forEach(item=>{
//         console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Employment Check - Advanced"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//          console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeEducationDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.educationDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Education Check - Basic"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//          console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeEducationAdvancedDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.educationAdvancedDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Education Check - Advanced"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//          console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofuniverskty,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeEducationComprehensiveDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.educationComprehensiveDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Education Check - Comprehensive"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//          console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
         ar.commit()
	      
      })
      resolve(true)
   })
}
		     

let writeAddressDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.addressDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
	  var ObjectId= require('mongoose').Types.ObjectId;
/*          if(!ObjectId.isValid(item.verificationAllocatedTo)){
             console.log("address has invalid object in verification allocated to .....",item.case.caseId)		  
	  }*/
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Address Check - Advanced"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//          console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeAddressComprehensiveDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.addressComprehensiveDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Address Check - Comprehensive"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//          console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.fulladdress,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
         ar.commit()
	      
      })
      resolve(true)
   })
}
let writeAddressOnlineDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.addressOnlineDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Address Check - Online"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
//          console.log("item.grad1 is ",item.grade1)
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.fulladdwithpin,item.landmark,item.pin,item.city,item.typeofaddress,item.tenure,item.primarycontact,item.alternatecontact,item._id])
         ar.commit()

      })
      resolve(true)
   })
}
let writeAddressTelephoneDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.addressTelephoneDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Address Check - Telephone"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
         ar.commit()
      })
      resolve(true)
   })
}
let writeCourtRecordDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.courtRecordDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Court Record Check"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
	 if(item.case != null){     
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.addresswithpin,item.pin,item.city,item.typeofaddress,item.tenure])
         ar.commit()
	 }
	      
      })
      resolve(true)
   })
}
let writeCriminalRecordDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.criminalRecordDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Criminal Record Check"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.fulladdress,item.pin,item.city,item.typeofaddress,item.tenureofstay,item._id])
         ar.commit()
	      
      })
      resolve(true)
   })
}
let writeReferenceDetails = function(){
   return new Promise((resolve,reject)=>{
      console.log("Size of reference details is ",workerData.referenceDetails.length)	   
      workerData.referenceDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Reference - Advanced"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofreference,item.deisgnation,item.contactdetails])
         ar.commit()
	      
      })
      resolve(true)
   })
}
let writeRefBasicDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.refBasicDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Reference - Basic"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.name,item.designation,item.contact])
         ar.commit()
	      
      })
      resolve(true)
   })
}
let writeIdentityDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.identityDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Identity Check"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.typeofid,item.nameasperid,item.idnumber,item.issuedby])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeCreditCheckDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.creditCheckDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Credit Check - Basic"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.taxid,item.nameasperpan,item.dateofbirth,item.issuedby])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeCreditTransDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.creditTransDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Credit Check - Transunion"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.pannumber,item.nameasperpan,item.dateofbirth,item.issuedby])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeCreditEquifaxDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.creditEquifaxDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Credit Check - Equifax"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.pannumber,item.panname,item.dobofpan,item.gender,item.fulladdress,item.contact,item.altcontact])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeGlobalDatabaseDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.globalDatabaseDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Global Database"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.searchname])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeDrugTestFiveDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.drugTestFiveDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Drug Test - 5 Panel"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeDrugTestSixDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.drugTestSixDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Drug Test - 6 Panel"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeDrugTestSevenDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.drugTestSevenDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Drug Test - 7 Panel"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemploybee,item.fulladdress,item.pin,item.city,item.contactnumber])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeDrugTestEightDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.drugTestEightDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Drug Test - 8 Panel"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployee,item.address,item.pin,item.city,item.contact])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeDrugTestNineDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.drugTestNineDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Drug Test - 9 Panel"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.consent,item.fulladdress,item.pin,item.city,item.contact])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeDrugTestTenDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.drugTestTenDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Drug Test - 10 Panel"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployee,item.address,item.pin,item.city,item.contact])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeDlCheckDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.dlCheckDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "DL Check"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.dlnumber,item.nameperdl,item.dob,item.issuedate,item.dlvalid])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeDirectorshipCheckDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.directorshipCheckDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Directorship Check"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.directorname,item.dinnumber,item.dob,item.verifiedon])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeVoterIdDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.voterIdDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Voter Id"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.epicnumber,item.epicname,item.fulladdress,item.pin,item.city,item.contactnumber])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeVddAdvancedDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.vddAdvancedDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "VDD Advanced"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.companyname,item.regdadd,item.cin,item.pan,item.gst])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeBankStmtDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.bankStmtDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Bank Statement"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.tenure,item.nameofbank,item.transaction])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeSiteCheckDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.siteCheckDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Site Check"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.name,item.fulladdress,item.pin,item.city])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writePsychometricDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.psychometricDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Psychometric Standard"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.name,item.emailid,item.contact,item.gender])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeSocialMediaCheckDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.socialMediaCheckDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Social Media"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.searchname])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeFacisL3Details = function(){
   return new Promise((resolve,reject)=>{
      workerData.facisL3Details.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "FACIS L3"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.applicantname,item.dateofbirth,item.stcode])
         ar.commit()	      
      })
      resolve(true)
   })
}
		  
		  
let writeOfacDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.ofacDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "OFAC"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.candname,item.ofac])
         ar.commit()	      
      })
      resolve(true)
   })
}
let writeGapVfnDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.gapvfnDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Gap Verification"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
	 if(item.case != null){     
         let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.client != null ? item.case.client.name:"",item.case.subclient != null ? item.case.subclient.name:"" ,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.tenureofgap,item.reasonforgap,item.address,item.PIN,item.CITY])
         ar.commit()	      
	 }
      })
      resolve(true)
   })
}
		  
let writePassportDetails = function(){
   return new Promise((resolve,reject)=>{
      workerData.passportDetails.forEach(item=>{
  //       console.log("Writing case id ",item.case.caseId)
          let verifier = ""
          if(item.verificationAllocatedTo != null){
             verifier = item.verificationAllocatedTo.name
          }
          let fe = ""
          if(item.allocatedToFE != null){
             fe = item.allocatedToFE.name
          }
          let vendor=""
          if(item.allocatedToVendor != null){
             vendor = item.allocatedToVendor.name
          }
          let componentDisplayName = "Passport"
          if(item.component != null){
            componentDisplayName = item.component.displayName
          }
          let fathersName = ""
          let dateOfBirth = null
          let mobileNumber = ""
          if(item.personalDetailsData != null){
             fathersName = item.personalDetailsData.fathername
             dateOfBirth = item.personalDetailsData.dateofbirth
             mobileNumber = item.personalDetailsData.mobilename
          }
          let verificationCompletionDate = null
          let mentorReviewCompletionDate = null
          let mentorReviewCompletedBy = null
          let outputqcCompletionDate = null
          let outputqcCompletedBy = null
          let gradingColor = null
          if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
             verificationCompletionDate = item.verificationCompletionDate
             mentorReviewCompletionDate = item.mentorReviewCompletionDate
             mentorReviewCompletedBy = item.mentorReviewCompletedBy
             outputqcCompletionDate = item.outputqcCompletionDate
             if(item.case.outputqcCompletedBy != null){
                outputqcCompletedBy = item.case.outputqcCompletedBy.name
             }
             if(item.mentorReviewCompletedBy != null){
                mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
             }
             if(item.grade1 != null){
                gradingColor = item.grade1.name
             }
         }
         let ar =  sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.givenname,item.lastname,item.issuecountry,item.nationality,item.passportnumber,item.expirydate])
         ar.commit()	      
      })
      resolve(true)
   })
}
		  

writeReport()
async function writeReport(){
   console.log("About to write employment details")	
   await writeEmploymentDetails();	
   await writeEmpBasicDetails();
   await writeEmpAdvanceDetails();
   await writeEducationDetails();
   await writeEducationAdvancedDetails();
   await writeEducationComprehensiveDetails();	
   await writeAddressDetails();
   await writeAddressComprehensiveDetails();
   await writeAddressOnlineDetails();	
   await writeAddressTelephoneDetails();
   await writeCourtRecordDetails();
   await writeCriminalRecordDetails();
   await writeReferenceDetails();
   await writeRefBasicDetails();
   await writeIdentityDetails();
   await writeCreditCheckDetails();
   await writeCreditTransDetails();
   await writeCreditEquifaxDetails();
   await writeGlobalDatabaseDetails();
   await writeDrugTestFiveDetails();
   await writeDrugTestSixDetails();
   await writeDrugTestSevenDetails();
   await writeDrugTestEightDetails();
   await writeDrugTestNineDetails();
   await writeDrugTestTenDetails();
   await writeDlCheckDetails();
   await writeDirectorshipCheckDetails();
   await writeVoterIdDetails();
   await writeVddAdvancedDetails();
   await writeBankStmtDetails();
   await writeSiteCheckDetails();
   await writePsychometricDetails();
   await writeSocialMediaCheckDetails()
   await writeFacisL3Details();
   await writeOfacDetails();
   await writeGapVfnDetails();
   await writePassportDetails();	
   console.log("Written employment details")	
   const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${workerData.userId}.xlsx`);
   workBook.xlsx.write(fileStream);
   await new Promise(resolve => setTimeout(resolve,60000));	
   console.log("Work Book Written and now returning back")
   console.log("Sending the postmessage to parent")	
   parentPort.postMessage({status:"Done"})
}
