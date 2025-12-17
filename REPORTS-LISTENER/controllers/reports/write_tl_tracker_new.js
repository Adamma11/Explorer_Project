const { workerData, parentPort } = require('worker_threads')
const fs = require('fs')
//const ExcelJS = require('exceljs');

//console.log("About to write tl tracker ....... in worker thread",workerData.empDetails.length)
//    const workBook = new  ExcelJS.Workbook()
//    const sheet = workBook.addWorksheet('TL Pending')
//    console.log("Sheet added")
//

let getStream = function () {
   return new Promise((resolve, reject) => {
      if (fs.existsSync(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${workerData.userId}.csv`)) {
         fs.unlinkSync(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${workerData.userId}.csv`);
      }
      resolve(fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${workerData.userId}.csv`))
   })
}
let writeHeaderDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      let sepRow = "sep=^" + "\n"
      tlTracker.write(sepRow)
      let headerRow = "Case Id" + "^" + "Candidate Name" + "^" + "Client" + "^" + "Subclient" + "^" + "Father's Name" + "^" + "Date of Birth" + "^" + "Mobile Number" + "^" + "Component" + "^" + "Status" + "^" + "Initiation Date" + "^" + "TAT End Date" + "^" + "Verifier" + "^" + "FE" + "^" + "Vendor" + "^" + "VerificationCompletionDate" + "^" + "Verified By" + "^" + "Mentor Review Completion Date" + "^" + "Mentor Review Completed By" + "^" + "Output QC Completion Date" + "^" + "Output QC Completed By" + "^" + "Grading Color" + "^" + "Field 1" + "^" + "Field 2" + "^" + "Field 3" + "^" + "Field 4" + "^" + "Field 5" + "^" + "Field 6" + "^" + "Field 7" + "^" + "Field 8" + "^" + "Field 9" + "^" + "Field 10" + "^" + "Field 11" + "^" + "Field 12" + "^" + "Field 13" + "\n"
      tlTracker.write(headerRow)
      console.log("Written header row")
      resolve(true)
   })

}

let writeEmploymentDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.empDetails.forEach(item => {
         //	 console.log("Writing case id ",item.case.caseId)    

         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Employment"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         let mode = null
         let emailofrespondentRhs = null
         let contactofrespondRhs = null


         //	  console.log("item.grad1 is ",item.grade1)
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            mode = item.mode
            emailofrespondentRhs = item.emailofrespondentRhs
            contactofrespondRhs = item.contactofrespondRhs
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofemployer + "^" + item.branch + "^" + item.deputedto + "^" + item.empstatus + "^" + item.empid + "^" + item.doj + "^" + item.lwd + "^" + item.designation + "^" + item.reportingmgr + "^" + item.reasonforleaving + "^" + item.mode + "^" + item.emailofrespondentRhs + "^" + item.contactofrespondRhs + "\n"

         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeEmpBasicDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      let tlTracker = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${workerData.userId}.csv`, { flags: 'a' })
      workerData.empBasicDetails.forEach(item => {
         //         console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Employment Basic"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofemployer + "^" + item.branch + "^" + item.deputedto + "^" + item.empstatus + "^" + item.empid + "^" + item.doj + "^" + item.lwd + "^" + item.designation + "^" + item.reportingmgr + "^" + item.reasonforleaving + "\n"

         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeEmpAdvanceDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      let tlTracker = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${workerData.userId}.csv`, { flags: 'a' })
      console.log("Size of  emp advance is ......................................................", workerData.empAdvanceDetails.length)
      workerData.empAdvanceDetails.forEach(item => {
         //         console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Employment Check - Advanced"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofemployer + "^" + item.branch + "^" + item.deputedto + "^" + item.empstatus + "^" + item.empid + "^" + item.doj + "^" + item.lwd + "^" + item.designation + "^" + item.reportingmgr + "^" + item.reasonforleaving + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeEducationDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.educationDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Education Check - Basic"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofuniversity + "^" + item.nameofschool + "^" + item.cityofstudy + "^" + item.typeofqualification + "^" + item.qualification + "^" + item.specialization + "^" + item.rollnumber + "^" + item.yearofjoining + "^" + item.yearofcompletion + "^" + item.marks + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeEducationAdvancedDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.educationAdvancedDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Education Check - Advanced"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofuniverskty + "^" + item.nameofschool + "^" + item.cityofstudy + "^" + item.typeofqualification + "^" + item.qualification + "^" + item.specialization + "^" + item.rollnumber + "^" + item.yearofjoining + "^" + item.yearofcompletion + "^" + item.marks + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeEducationComprehensiveDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.educationComprehensiveDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Education Check - Comprehensive"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofuniversity + "^" + item.nameofschool + "^" + item.cityofstudy + "^" + item.typeofqualification + "^" + item.qualification + "^" + item.specialization + "^" + item.rollnumber + "^" + item.yearofjoining + "^" + item.yearofcompletion + "^" + item.marks + "\n"
         tlTracker.write(ar, 'utf8')

      })
      resolve(true)
   })
}


let writeAddressDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.addressDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         var ObjectId = require('mongoose').Types.ObjectId;
         /*          if(!ObjectId.isValid(item.verificationAllocatedTo)){
                      console.log("address has invalid object in verification allocated to .....",item.case.caseId)		  
              }*/
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Address Check - Advanced"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.address + "^" + item.landmark + "^" + item.pin + "^" + item.city + "^" + item.typeofaddress + "^" + item.tenureofstay + "^" + item.primarycontact + "^" + item.alternatecontact + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeAddressComprehensiveDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.addressComprehensiveDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Address Check - Comprehensive"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + item.component.displayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.fulladdress + "^" + item.landmark + "^" + item.pin + "^" + item.city + "^" + item.typeofaddress + "^" + item.tenureofstay + "^" + item.primarycontact + "^" + item.alternatecontact + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeAddressOnlineDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.addressOnlineDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Address Check - Online"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + item.component.displayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.fulladdwithpin + "^" + item.landmark + "^" + item.pin + "^" + item.city + "^" + item.typeofaddress + "^" + item.tenure + "^" + item.primarycontact + "^" + item.alternatecontact + "^" + item._id + "\n"
         tlTracker.write(ar, 'utf8')

      })
      resolve(true)
   })
}
let writeAddressTelephoneDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.addressTelephoneDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Address Check - Telephone"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + item.component.displayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.address + "^" + item.landmark + "^" + item.pin + "^" + item.city + "^" + item.typeofaddress + "^" + item.tenureofstay + "^" + item.primarycontact + "^" + item.alternatecontact + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeCourtRecordDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.courtRecordDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Court Record Check"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         if (item.case != null) {
            let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.addresswithpin + "^" + item.pin + "^" + item.city + "^" + item.typeofaddress + "^" + item.tenure + "\n"
            tlTracker.write(ar, 'utf8')
         }

      })
      resolve(true)
   })
}
let writeCriminalRecordDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.criminalRecordDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Criminal Record Check"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "^" + item.typeofaddress + "^" + item.tenureofstay + "^" + item._id + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeReferenceDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      console.log("Size of reference details is ", workerData.referenceDetails.length)
      workerData.referenceDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Reference - Advanced"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofreference + "^" + item.deisgnation + "^" + item.contactdetails + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeRefBasicDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.refBasicDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Reference - Basic"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.name + "^" + item.designation + "^" + item.contact + "\n"
         tlTracker.write(ar, 'utf8')

      })
      resolve(true)
   })
}
let writeIdentityDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.identityDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Identity Check"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.typeofid + "^" + item.nameasperid + "^" + item.idnumber + "^" + item.issuedby + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeCreditCheckDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.creditCheckDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Credit Check - Basic"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.taxid + "^" + item.nameasperpan + "^" + item.dateofbirth + "^" + item.issuedby + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeCreditTransDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.creditTransDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Credit Check - Transunion"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.pannumber + "^" + item.nameasperpan + "^" + item.dateofbirth + "^" + item.issuedby + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeCreditEquifaxDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.creditEquifaxDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Credit Check - Equifax"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.pannumber + "^" + item.panname + "^" + item.dobofpan + "^" + item.gender + "^" + item.fulladdress + "^" + item.contact + "^" + item.altcontact + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeGlobalDatabaseDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.globalDatabaseDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Global Database"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.searchname + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeDrugTestFiveDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.drugTestFiveDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Drug Test - 5 Panel"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofemployee + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "^" + item.contact + "\n"

         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeDrugTestSixDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.drugTestSixDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Drug Test - 6 Panel"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofemployee + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "^" + item.contact + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeDrugTestSevenDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.drugTestSevenDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Drug Test - 7 Panel"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofemploybee + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "^" + item.contactnumber + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeDrugTestEightDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.drugTestEightDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Drug Test - 8 Panel"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofemployee + "^" + item.address + "^" + item.pin + "^" + item.city + "^" + item.contact + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeDrugTestNineDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.drugTestNineDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Drug Test - 9 Panel"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.consent + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "^" + item.contact + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeDrugTestTenDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.drugTestTenDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Drug Test - 10 Panel"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.nameofemployee + "^" + item.address + "^" + item.pin + "^" + item.city + "^" + item.contact + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeDlCheckDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.dlCheckDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "DL Check"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.dlnumber + "^" + item.nameperdl + "^" + item.dob + "^" + item.issuedate + "^" + item.dlvalid + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeDirectorshipCheckDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.directorshipCheckDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Directorship Check"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.directorname + "^" + item.dinnumber + "^" + item.dob + "^" + item.verifiedon + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeVoterIdDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.voterIdDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Voter Id"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.epicnumber + "^" + item.epicname + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "^" + item.contactnumber + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeVddAdvancedDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.vddAdvancedDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "VDD Advanced"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.companyname + "^" + item.regdadd + "^" + item.cin + "^" + item.pan + "^" + item.gst + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeBankStmtDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.bankStmtDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Bank Statement"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.tenure + "^" + item.nameofbank + "^" + item.transaction + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeSiteCheckDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.siteCheckDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Site Check"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.name + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writePsychometricDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.psychometricDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Psychometric Standard"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.name + "^" + item.emailid + "^" + item.contact + "^" + item.gender + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeSocialMediaCheckDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.socialMediaCheckDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Social Media"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.searchname + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeFacisL3Details = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.facisL3Details.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "FACIS L3"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.applicantname + "^" + item.dateofbirth + "^" + item.stcode + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}


let writeOfacDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.ofacDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "OFAC"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.candname + "^" + item.ofac + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}
let writeGapVfnDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.gapvfnDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Gap Verification"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         if (item.case != null) {
            let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.client != null ? item.case.client.name : "" + "^" + item.case.subclient != null ? item.case.subclient.name : "" + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.tenureofgap + "^" + item.reasonforgap + "^" + item.address + "^" + item.PIN + "^" + item.CITY + "\n"
            tlTracker.write(ar, 'utf8')
         }
      })
      resolve(true)
   })
}

let writePassportDetails = function (tlTracker) {
   return new Promise((resolve, reject) => {
      workerData.passportDetails.forEach(item => {
         //       console.log("Writing case id ",item.case.caseId)
         let verifier = ""
         if (item.verificationAllocatedTo != null) {
            verifier = item.verificationAllocatedTo.name
         }
         let fe = ""
         if (item.allocatedToFE != null) {
            fe = item.allocatedToFE.name
         }
         let vendor = ""
         if (item.allocatedToVendor != null) {
            vendor = item.allocatedToVendor.name
         }
         let componentDisplayName = "Passport"
         if (item.component != null) {
            componentDisplayName = item.component.displayName
         }
         let fathersName = ""
         let dateOfBirth = null
         let mobileNumber = ""
         if (item.personalDetailsData != null) {
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
         if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
            verificationCompletionDate = item.verificationCompletionDate
            mentorReviewCompletionDate = item.mentorReviewCompletionDate
            mentorReviewCompletedBy = item.mentorReviewCompletedBy
            outputqcCompletionDate = item.outputqcCompletionDate
            if (item.case.outputqcCompletedBy != null) {
               outputqcCompletedBy = item.case.outputqcCompletedBy.name
            }
            if (item.mentorReviewCompletedBy != null) {
               mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
            }
            if (item.grade1 != null) {
               gradingColor = item.grade1.name
            }
         }
         let ar = item.case.caseId + "^" + item.case.candidateName + "^" + item.case.subclient.client.name + "^" + item.case.subclient.name + "^" + fathersName + "^" + dateOfBirth + "^" + mobileNumber + "^" + componentDisplayName + "^" + item.status + "^" + item.case.initiationDate + "^" + item.case.tatEndDate + "^" + verifier + "^" + fe + "^" + vendor + "^" + verificationCompletionDate + "^" + verifier + "^" + mentorReviewCompletionDate + "^" + mentorReviewCompletedBy + "^" + outputqcCompletionDate + "^" + outputqcCompletedBy + "^" + gradingColor + "^" + item.givenname + "^" + item.lastname + "^" + item.issuecountry + "^" + item.nationality + "^" + item.passportnumber + "^" + item.expirydate + "\n"
         tlTracker.write(ar, 'utf8')
      })
      resolve(true)
   })
}


writeReport()
async function writeReport() {
   //   console.log("About to write employment details")
   let tlTracker = await getStream()
   console.log("About to wirte Header Details")
   await writeHeaderDetails(tlTracker)
   console.log("About to write employment details")
   await writeEmploymentDetails(tlTracker);
   console.log("about to write emp basic details")
   await writeEmpBasicDetails(tlTracker);
   console.log("about to write emp advance details")
   await writeEmpAdvanceDetails(tlTracker);
   console.log("about to write education details")
   await writeEducationDetails(tlTracker);
   await writeEducationAdvancedDetails(tlTracker);
   await writeEducationComprehensiveDetails(tlTracker);
   await writeAddressDetails(tlTracker);
   await writeAddressComprehensiveDetails(tlTracker);
   await writeAddressOnlineDetails(tlTracker);
   await writeAddressTelephoneDetails(tlTracker);
   await writeCourtRecordDetails(tlTracker);
   await writeCriminalRecordDetails(tlTracker);
   await writeReferenceDetails(tlTracker);
   await writeRefBasicDetails(tlTracker);
   await writeIdentityDetails(tlTracker);
   await writeCreditCheckDetails(tlTracker);
   await writeCreditTransDetails(tlTracker);
   await writeCreditEquifaxDetails(tlTracker);
   await writeGlobalDatabaseDetails(tlTracker);
   await writeDrugTestFiveDetails(tlTracker);
   await writeDrugTestSixDetails(tlTracker);
   await writeDrugTestSevenDetails(tlTracker);
   await writeDrugTestEightDetails(tlTracker);
   await writeDrugTestNineDetails(tlTracker);
   await writeDrugTestTenDetails(tlTracker);
   await writeDlCheckDetails(tlTracker);
   await writeDirectorshipCheckDetails(tlTracker);
   await writeVoterIdDetails(tlTracker);
   await writeVddAdvancedDetails(tlTracker);
   await writeBankStmtDetails(tlTracker);
   await writeSiteCheckDetails(tlTracker);
   await writePsychometricDetails(tlTracker);
   await writeSocialMediaCheckDetails(tlTracker)
   await writeFacisL3Details(tlTracker);
   await writeOfacDetails(tlTracker);
   await writeGapVfnDetails(tlTracker);
   await writePassportDetails(tlTracker);
   console.log("Written employment details")
   //   const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${workerData.userId}.xlsx`);
   //   workBook.xlsx.write(fileStream);
   await new Promise(resolve => setTimeout(resolve, 60000));
   console.log("Work Book Written and now returning back")
   console.log("Sending the postmessage to parent")
   parentPort.postMessage({ status: "Done" })
}
