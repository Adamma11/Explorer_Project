const Vendor = require('../../models/administration/vendor.model')
const Component = require('../../models/administration/component.model');
const fs = require('fs')
const ComponentField = require('../../models/administration/component_field.model');
const ExcelJS = require('exceljs');
const UserRole = require('../../models/administration/user_role.model');
const ComponentAccess = require('../../models/administration/component_access.model')
const ColorMaster = require('../../models/administration/color_master.model')
const User = require('../../models/administration/user.model')
const employment = require('../../models/data_entry/employment.model')
const education = require('../../models/data_entry/education.model');
const address = require('../../models/data_entry/address.model');
const courtrecord = require('../../models/data_entry/courtrecord.model');
const criminalrecord = require('../../models/data_entry/criminalrecord.model');
const identity = require('../../models/data_entry/identity.model');
const creditcheck = require('../../models/data_entry/creditcheck.model');
const socialmedia = require('../../models/data_entry/socialmedia.model');
const globaldatabase = require('../../models/data_entry/globaldatabase.model');
const reference = require('../../models/data_entry/reference.model');
const refbasic = require('../../models/data_entry/refbasic.model');
const drugtestfive = require('../../models/data_entry/drugtestfive.model');
const drugtestten = require('../../models/data_entry/drugtestten.model');
const passport = require('../../models/data_entry/passport.model');
const uan = require('../../models/data_entry/uan.model');
const addressbusiness = require('../../models/data_entry/addressbusiness.model');
const addresstelephone = require('../../models/data_entry/addresstelephone.model');
const addressonline = require('../../models/data_entry/addressonline.model');
const addresscomprehensive = require('../../models/data_entry/addresscomprehensive.model');
const educationcomprehensive = require('../../models/data_entry/educationcomprehensive.model');
const educationadvanced = require('../../models/data_entry/educationadvanced.model');
const drugtestsix = require('../../models/data_entry/drugtestsix.model');
const drugtestseven = require('../../models/data_entry/drugtestseven.model');
const drugtesteight = require('../../models/data_entry/drugtesteight.model');
const drugtestnine = require('../../models/data_entry/drugtestnine.model');
const facisl3 = require('../../models/data_entry/facisl3.model');
const credittrans = require('../../models/data_entry/credittrans.model');
const creditequifax = require('../../models/data_entry/creditequifax.model');
const empadvance = require('../../models/data_entry/empadvance.model');
const empbasic = require('../../models/data_entry/empbasic.model');
const vddadvance = require('../../models/data_entry/vddadvance.model');
const dlcheck = require('../../models/data_entry/dlcheck.model');
const voterid = require('../../models/data_entry/voterid.model');
const ofac = require('../../models/data_entry/ofac.model');
const physostan = require('../../models/data_entry/physostan.model')
const gapvfn = require('../../models/data_entry/gapvfn.model')
const sitecheck = require('../../models/data_entry/sitecheck.model')
const bankstmt = require('../../models/data_entry/bankstmt.model')
const directorshipcheck = require('../../models/data_entry/directorshipcheck.model')
const ClientContractProfile = require('../../models/administration/client_contract_profile.model')
const ClientContractPackage = require('../../models/administration/client_contract_package.model')
const DefaultCalendar = require('../../models/administration/default_calendar.model')
const moment = require('moment')
exports.getTLTrackerReport = (req, res) => {
  console.log("In TL Tracker Report...")
  console.log("Report type required is ...................................................", req.query.reportType)
  //    const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${req.user.user_id}.xlsx`);	
  const workBook = new ExcelJS.Workbook()
  //    const workBook = new ExcelJs.stream.xlsx.WorkbookWriter({ stream: fileStream,}); 
  console.log("Workbook constructed")
  const sheet = workBook.addWorksheet('TL Pending')
  console.log("Sheet added")
  let addedRow = sheet.addRow(["Case Id", "Candidate Name", "Client", "Subclient", "Branch", "Father's Name", "Date of Birth", "Mobile Number", "Component", "Status", "Initiation Date", "INSUF Raised Deate", "INSUFF Cleared Date", "TAT End Date", "Verifier", "FE", "Vendor", "DE Completion Date", "Input QC CompletionDate", "VerificationCompletionDate", "Verified By", "Mentor Review Completion Date", "Mentor Review Completed By", "Output QC Completion Date", "Output QC Completed By", "Grading Color", "Field 1", "Field 2", "Field 3", "Field 4", "Field 5", "Field 6", "Field 7", "Field 8", "Field 9", "Field 10", "Grading Comments", "Mode", "Email ID of Respondent","Contact of Respondent"])
  addedRow.commit()
  let query = ""
  if (req.query.reportType == 'PENDING') {
    query = { $and: [{ status: { $ne: "MENTOR-REVIEW-ACCEPTED" } }, { status: { $ne: "OUTPUTQC-ACCEPTED" } }] }
    //	query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"}}]}
  }
  //    let query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"}}]}
  if (req.query.reportType == 'COMPLETED') {
    query = { $and: [{ $or: [{ status: 'MENTOR-REVIEW-ACCEPTED' }, { status: 'OUTPUTQC-ACCEPTED' }] }, { mentorReviewCompletionDate: { $gte: req.query.dateFrom, $lte: req.query.dateTo + "T23:59:59.999Z" } }] }
  }
  console.log("Query being applied is ", query)
  let getRolesForTheUser = function () {
    return new Promise((resolve, reject) => {
      UserRole
        .find({ user: req.user.user_id }, { _id: 0, role: 1 })
        .then(data => {
          console.log("roles are ", data);
          resolve(data);
        })
        .catch(err => {
          resolve()
        })
    })
  }
  /*    let getPersonalDetails = function(caseDetails){
    return new Promise((resolve,reject)=>{
      personaldetailsdata.find({case:caseDetails._id}) 
      .then(data=>{
        resolve(data)
      }) 
      .catch(err=>{
        resolve(null)
      })
      
    })
    
  }*/

  let getComponentsForRoles = function (roles) {
    return new Promise((resolve, reject) => {
      ComponentAccess
        .find({ $or: roles })
        .populate({ path: 'component' })
        .then(data => {
          let uniqueComponents = new Array()
          data.forEach(item => {
            let found = false;
            for (let i = 0; i < uniqueComponents.length; i++) {
              if (item.component.toString() == uniqueComponents[i].component.toString()) {
                found = true
                break
              }
            }
            if (!found) {
              console.log("Not found and hence adding")
              uniqueComponents.push(item)
            }
          })
          resolve(uniqueComponents);
        })
        .catch(err => {
          resolve()
        })
    })
  }
  let getGradingColor = function (color) {
    return new Promise((resolve, reject) => {
      if (color == null || color == "") {
        resolve(null)
      } else {
        ColorMaster
          .findOne({ _id: color })
          .then(data => {
            resolve(data.name)
          })
          .catch(err => {
            console.log("Grading color err", err)
            resolve(null)
          })
      }
    })
  }
  let getTatDaysFromProfile = function (profile_id) {
    return new Promise((resolve, reject) => {
      ClientContractProfile
        .findOne({ _id: profile_id })
        .then(data => {
          resolve(data.tat)
        })
        .catch(err => {
          resolve(0)
        })
    })
  }
  let getTatDaysFromPackage = function (package_id) {
    return new Promise((resolve, reject) => {
      ClientContractPackage
        .findOne({ _id: package_id })
        .then(data => {
          resolve(data.tat)
        })
        .catch(err => {
          resolve(0)
        })
    })
  }
  let getNumberOfHolidaysBetweenDates = function (date1, date2) {
    return new Promise((resolve, reject) => {
      let clonedDate1 = new Date(date1.toDate())
      let clonedDate2 = new Date(date2.toDate())
      DefaultCalendar
        .count({ date: { $gte: clonedDate1, $lte: clonedDate2 } })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          resolve(0)
        })
    })
  }
  let getNumberOfWeeklyOffDaysBetweenDates = function (date1, date2) {
    return new Promise((resolve, reject) => {
      let clonedDate1 = new Date(date1.toDate())
      let clonedDate2 = new Date(date2.toDate())
      let count = 0
      while (clonedDate1 < clonedDate2) {
        if (clonedDate1.getDay() == 6 || clonedDate1.getDay() == 0) {
          count = count + 1
        }
        clonedDate1.setDate(clonedDate1.getDate() + 1)
      }
      resolve(count)
    })
  }
  let getFinalDateUsingHolidaysAndWeeklyOff = function (date) {
    return new Promise((resolve, reject) => {
      let count = 0
      let clonedDate = new Date(date)
      if (clonedDate.getDay() == 6 || clonedDate.getDay() == 0) {
        clonedDate.setDate(clonedDate.getDate() + 1)
        count = count + 1
      } else {
        DefaultCalendar
          .count({ date: clonedDate })
          .then(data => {
            clonedDate.setDate(clonedDate.getDate() + 1)
            count = count + 1
          })
          .catch(err => {
            clonedDate.setDate(clonedDate.getDate() + 0)
          })
      }
      resolve(moment(clonedDate))
    })
  }
  let isHoliday = function (date) {
    return new Promise((resolve, reject) => {
      DefaultCalendar
        .count({ date: date.toDate() })
        .then(data => {
          if (data > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch(err => {
          resolve(false)
        })
    })
  }
  let isWeeklyOff = function (date) {
    return new Promise((resolve, reject) => {
      let clonedDate = new Date(date)
      if (clonedDate.getDay() == 6 || clonedDate.getDay() == 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  let getEmploymentDetails = function () {
    return new Promise((resolve, reject) => {
      employment
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }
            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), finalTatEndDate.format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofemployer, item.branch, item.deputedto, item.empstatus, item.empid, item.doj, item.lwd, item.designation, item.reportingmgr, item.reasonforleaving, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }
          resolve(true)
        })
        .catch(err => {
          //		console.log("Error in writing tl pending for employment",err)    
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getEmpBasicDetails = function () {
    return new Promise((resolve, reject) => {
      empbasic
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              i

              vendor = item.allocatedToVendor.name
            }
            let componentDisplayName = "Employment - Basic"
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }
            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofemployer, item.branch, item.deputedto, item.empstatus, item.empid, item.doj, item.lwd, item.designation, item.reportingmgr, item.reasonforleaving, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }
          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getEmpAdvanceDetails = function () {
    return new Promise((resolve, reject) => {
      empadvance
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }


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
            let componentDisplayName = "Employment - Advanced"
            if (item.component != null) {
              componentDisplayName = item.component.displayName
            }

            let verificationCompletionDate = null
            let mentorReviewCompletionDate = null
            let mentorReviewCompletedBy = null
            let outputqcCompletionDate = null
            let outputqcCompletedBy = null
            let gradingColor = null

            let fathersName = ""
            let dateOfBirth = null
            let mobileNumber = ""
            if (item.personalDetailsData != null) {
              fathersName = item.personalDetailsData.fathername
              dateOfBirth = item.personalDetailsData.dateofbirth
              mobileNumber = item.personalDetailsData.mobilename
            }

            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofemployer, item.branch, item.deputedto, item.empstatus, item.empid, item.doj, item.lwd, item.designation, item.reportingmgr, item.reasonforleaving, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getEducationDetails = function () {
    console.log("In education details of tl pending")
    return new Promise((resolve, reject) => {
      education
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          console.log("go the education details.............................", data.length)
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofuniversity, item.nameofschool, item.cityofstudy, item.typeofqualification, item.qualification, item.specialization, item.rollnumber, item.yearofjoining, item.yearofcompletion, item.marks, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }

          resolve(true)
        })
        .catch(err => {
          console.log("Error in tl pending education listing ", err)
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getEducationAdvancedDetails = function () {
    console.log("In Education Advanced Details")
    return new Promise((resolve, reject) => {
      educationadvanced
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          //		 console.log("Data for Education Advacned in TL Tracker is..............",data)   
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Education Advanced"
            if (item.component != null) {
              componentDisplayName = item.component.displayName
            }
            let verificationCompletionDate = null
            let mentorReviewCompletionDate = null
            let mentorReviewCompletedBy = null
            let outputqcCompletionDate = null
            let outputqcCompletedBy = null
            let gradingColor = null

            let fathersName = ""
            let dateOfBirth = null
            let mobileNumber = ""
            if (item.personalDetailsData != null) {
              fathersName = item.personalDetailsData.fathername
              dateOfBirth = item.personalDetailsData.dateofbirth
              mobileNumber = item.personalDetailsData.mobilename
            }

            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }
            //                   console.log("In Education Advanced......adding to tracker",item.case.caseId)        
            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofuniverskty, item.nameofschool, item.cityofstudy, item.typeofqualification, item.qualification, item.specialization, item.rollnumber, item.yearofjoining, item.yearofcompletion, item.marks, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
            //                  console.log("Added data to sheet",item.case.caseId)			 
          }
          console.log("Resolving data in education advanced")

          resolve(true)
        })
        .catch(err => {
          //		console.log("Error in Education Advanced",err)    
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getEducationComprehensiveDetails = function () {
    return new Promise((resolve, reject) => {
      educationcomprehensive
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompetedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          console.log("Length of Education Comprehensive in TL Pending is ", data.length)
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Education Comprehensive"
            if (item.component != null) {
              componentDisplayName = item.component.displayName
            }
            //                   if(item.case == null){
            console.log("Item case for education comprehensive is null", item);
            //		   } 		

            let verificationCompletionDate = null
            let mentorReviewCompletionDate = null
            let mentorReviewCompletedBy = null
            let outputqcCompletionDate = null
            let outputqcCompletedBy = null
            let gradingColor = null

            let fathersName = ""
            let dateOfBirth = null
            let mobileNumber = ""
            if (item.personalDetailsData != null) {
              fathersName = item.personalDetailsData.fathername
              dateOfBirth = item.personalDetailsData.dateofbirth
              mobileNumber = item.personalDetailsData.mobilename
            }

            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }


            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofuniversity, item.nameofschool, item.cityofstudy, item.typeofqualification, item.qualification, item.specialization, item.rollnumber, item.yearofjoining, item.yearofcompletion, item.marks, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }



          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          //		conole.log("I education comprehensive error",err)    
          resolve(true)
        })
    })

  }

  let getUserName = function (user_id) {
    return new Promise((resolve, reject) => {
      console.log("Trying to get user name for id ", user_id)
      User
        .findOne({ _id: user_id })
        .then(data => {
          if (data != null) {
            console.log("Got user name", data.name)
          } else {
            console.log("Name null for ", user_id)
          }
          resolve(data.name)
        })
        .catch(err => {
          console.log("Error in getting user name ", err)
          resolve(user_id)
        })
    })
  }
  let getAddressDetails = function () {
    return new Promise((resolve, reject) => {
      address
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        //            .populate({path:'verificationAllocatedTo'})
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          console.log("in address component for tl pending ", data.length)
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

            let verifier = ""
            if (item.verificationAllocatedTo != null) {
              //                     verifier = item.verificationAllocatedTo.name
              verifier = await getUserName(item.verificationAllocatedTo)
            }
            let fe = ""
            if (item.allocatedToFE != null) {
              fe = item.allocatedToFE.name
            }
            let vendor = ""
            if (item.allocatedToVendor != null) {
              vendor = item.allocatedToVendor.name
            }
            let componentDisplayName = "Address Verification - Advanced"
            if (item.component != null) {
              componentDisplayName = item.component.displayName
            }
            let contactNumber = ""
            /*	           if(item.personalDetailsData != null){
              contactNumber = item.personalDetailsData.mobilename		   
            } 			   */

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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.address, item.landmark, item.pin, item.city, item.typeofaddress, item.tenureofstay, item.primarycontact, item.alternatecontact, contactNumber, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          //		console.log("Error in address component ",err)    
          resolve(true)
        })
    })

  }
  let getAddressComprehensiveDetails = function () {
    return new Promise((resolve, reject) => {
      console.log("About to get Address Comprehensive Details #############################################################################")
      addresscomprehensive
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          console.log("In address comprehensive for tl pending ######################################################################## ", data.length)
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Address Verification - Comprehensive"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
            }
            let verificationCompletionDate = null
            let mentorReviewCompletionDate = null
            let mentorReviewCompletedBy = null
            let outputqcCompletionDate = null
            let outputqcCompletedBy = null
            let gradingColor = null

            let fathersName = ""
            let dateOfBirth = null
            let mobileNumber = ""
            if (item.personalDetailsData != null) {
              fathersName = item.personalDetailsData.fathername
              dateOfBirth = item.personalDetailsData.dateofbirth
              mobileNumber = item.personalDetailsData.mobilename
            }

            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }
            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, item.component.displayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.fulladdress, item.landmark, item.pin, item.city, item.typeofaddress, item.tenureofstay, item.primarycontact, item.alternatecontact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing address comprehensive ", err)
          resolve(true)
        })
    })

  }
  let getAddressOnlineDetails = function () {
    return new Promise((resolve, reject) => {
      addressonline
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          //                console.log("In address online for tl tracker ##########################################################",data.length)
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            //		   console.log("In address online for tl tracker",data.length)
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
            }
            let verificationCompletionDate = null
            let mentorReviewCompletionDate = null
            let mentorReviewCompletedBy = null
            let outputqcCompletionDate = null
            let outputqcCompletedBy = null
            let gradingColor = null

            let fathersName = ""
            let dateOfBirth = null
            let mobileNumber = ""
            if (item.personalDetailsData != null) {
              fathersName = item.personalDetailsData.fathername
              dateOfBirth = item.personalDetailsData.dateofbirth
              mobileNumber = item.personalDetailsData.mobilename
            }

            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }
            //                  console.log("About to add the addressonline row to sheet")			
            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, item.component.displayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.fulladdwithpin, item.landmark, item.pin, item.city, item.typeofaddress, item.tenure, item.primarycontact, item.alternatecontact, item._id, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            //                  let ar = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,fathersName,dateOfBirth,mobileNumber,item.component.displayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? item.case.initiationDate:item.insufficiencyRaisedDate,item.insufficiencyClearedDate])
            ar.commit()
            //		  console.log("Addredd  the addressonline row to sheet")	
          }

          console.log("Written all addressonline records ##############################################################################")

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing addressonline in tl pending ##############################################################", err)
          reject()
        })
    })

  }
  let getAddressTelephoneDetails = function () {
    return new Promise((resolve, reject) => {
      addresstelephone
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {

          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Address Check - Telephonic"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
            }
            let verificationCompletionDate = null
            let mentorReviewCompletionDate = null
            let mentorReviewCompletedBy = null
            let outputqcCompletionDate = null
            let outputqcCompletedBy = null
            let gradingColor = null

            let fathersName = ""
            let dateOfBirth = null
            let mobileNumber = ""
            if (item.personalDetailsData != null) {
              fathersName = item.personalDetailsData.fathername
              dateOfBirth = item.personalDetailsData.dateofbirth
              mobileNumber = item.personalDetailsData.mobilename
            }

            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, item.component.displayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.address, item.landmark, item.pin, item.city, item.typeofaddress, item.tenureofstay, item.primarycontact, item.alternatecontact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getCourtRecordDetails = function () {
    return new Promise((resolve, reject) => {
      courtrecord
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {

          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Court Record Check - Online"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.addresswithpin, item.pin, item.city, item.typeofaddress, item.tenure, item._id, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          console.log("Error in court record check for tl pending ", err)
          resolve(true)
        })
    })

  }
  let getCriminalRecordDetails = function () {
    return new Promise((resolve, reject) => {
      criminalrecord
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.fulladdress, item.pin, item.city, item.typeofaddress, item.tenureofstay, item._id, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          console.log("Error in criminal check for tl pending", err)
          resolve(true)
        })
    })

  }
  let getReferenceDetails = function () {
    return new Promise((resolve, reject) => {
      reference
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompetedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {

          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Reference Check - Advanced"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofreference, item.deisgnation, item.contactdetails, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getRefBasicDetails = function () {
    return new Promise((resolve, reject) => {
      refbasic
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {

          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Reference Check - Basic"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.name, item.designation, item.contact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getIdentityDetails = function () {
    return new Promise((resolve, reject) => {
      identity
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.typeofid, item.nameasperid, item.idnumber, item.issuedby, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          }


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getCreditCheckDetails = function () {
    return new Promise((resolve, reject) => {
      creditcheck
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedby' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {
          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.taxid, item.nameasperpan, item.dateofbirth, item.issuedby, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })



          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getCreditTransDetails = function () {
    return new Promise((resolve, reject) => {
      credittrans
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Credit Check - TransUnion"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.pannumber, item.nameasperpan, item.dateofbirth, item.issuedby, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })



          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getCreditEquifaxDetails = function () {
    return new Promise((resolve, reject) => {
      creditequifax
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })

        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.pannumber, item.panname, item.dobofpan, item.gender, item.fulladdress, item.contact, item.altcontact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()

          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getGlobaldatabaseDetails = function () {
    return new Promise((resolve, reject) => {
      globaldatabase
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Global Database Search"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.searchname, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getDrugTestFiveDetails = function () {
    return new Promise((resolve, reject) => {
      drugtestfive
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })

        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {
          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofemployee, item.fulladdress, item.pin, item.city, item.contact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getDrugTestSixDetails = function () {
    return new Promise((resolve, reject) => {
      drugtestsix
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {
          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofemployee, item.fulladdress, item.pin, item.city, item.contact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getDrugTestSevenDetails = function () {
    return new Promise((resolve, reject) => {
      drugtestseven
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofemploybee, item.fulladdress, item.pin, item.city, item.contactnumber, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getDrugTestEightDetails = function () {
    return new Promise((resolve, reject) => {
      drugtesteight
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Drug Test - 8  Panel"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofemployee, item.address, item.pin, item.city, item.contact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getDrugTestNineDetails = function () {
    return new Promise((resolve, reject) => {
      drugtestnine
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })

        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.consent, item.fulladdress, item.pin, item.city, item.contact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getDrugTestTenDetails = function () {
    return new Promise((resolve, reject) => {
      drugtestten
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.nameofemployee, item.address, item.pin, item.city, item.contact, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getDlCheckDetails = function () {
    return new Promise((resolve, reject) => {
      dlcheck
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Driving License Check"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
            }
            let uniqueId = ""
            if (item.personalDetailsData != null) {
              uniqueId = item.personalDetailsData.uniqueid
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            //		   let pan = ""
            //		   if(item.personalDetailsData != null){
            //		       pan = personalDetailsData.uniqueid	   
            //		   }
            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.dlnumber, item.nameperdl, item.dob, item.issuedate, item.dlvalid, uniqueId, item.case._id, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getDirectorshipCheckDetails = function () {
    return new Promise((resolve, reject) => {
      directorshipcheck
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.directorname, item.dinnumber, item.dob, item.verifiedon, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getVoterIdDetails = function () {
    return new Promise((resolve, reject) => {
      voterid
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Voter ID Check"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.epicnumber, item.epicname, item.fulladdress, item.pin, item.city, item.contactnumber, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })



          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getVddAdvanceDetails = function () {
    return new Promise((resolve, reject) => {
      vddadvance
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Vendor Due Dilligence - Advanced"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.companyname, item.regdadd, item.cin, item.pan, item.gst, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getBankStmtDetails = function () {
    return new Promise((resolve, reject) => {
      bankstmt
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Bank Statement Verification"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.tenure, item.nameofbank, item.transaction, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getSiteCheckDetails = function () {
    return new Promise((resolve, reject) => {
      sitecheck
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.name, item.fulladdress, item.pin, item.city, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(data)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getPsychometricDetails = function () {
    return new Promise((resolve, reject) => {
      physostan
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.name, item.emailid, item.contact, item.gender, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getSocialMediaDetails = function () {
    return new Promise((resolve, reject) => {
      socialmedia
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Social Media Search"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.searchname, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getFacisl3Details = function () {
    return new Promise((resolve, reject) => {
      facisl3
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {

          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "FACIS L3 Check"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.applicantname, item.dateofbirth, item.stcode, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getOfacDetails = function () {
    return new Promise((resolve, reject) => {
      ofac
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })

        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {
          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "OFAC Check"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.candname, item.ofac, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }

  let getGapVfnDetails = function () {
    return new Promise((resolve, reject) => {
      gapvfn
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {
          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "GAP Verification"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.tenureofgap, item.reasonforgap, item.address, item.PIN, item.CITY, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })

          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getPassportDetails = function () {
    return new Promise((resolve, reject) => {
      passport
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {
          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Passport Check"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.givenname, item.lastname, item.issuecountry, item.nationality, item.passportnumber, item.expirydate, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getUanDetails = function () {
    return new Promise((resolve, reject) => {
      uan
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(data => {
          data.forEach(async item => {
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

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
            let componentDisplayName = "Passport Check"
            if (item.component != null) {
              componentDisplayNane = item.component.displayName
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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.uan, item.candidatename, item.companyname, item.doj, item.doe, item.gradingComments, item.mode, item.emailofrespondentRhs, item.contactofrespondRhs])
            ar.commit()
          })


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          resolve(true)
        })
    })

  }
  let getAddressBusinessDetails = function () {
    return new Promise((resolve, reject) => {
      addressbusiness
        .find(query)
        .lean()
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'client' } } })
        .populate({ path: 'case', populate: { path: 'subclient', populate: { path: 'branch' } } })
        .populate({ path: 'case', populate: { path: 'outputqcCompletedBy' } })
        .populate({ path: 'verificationAllocatedTo' })
        .populate({ path: 'mentorReviewCompletedBy' })
        .populate({ path: 'allocatedToFE' })
        .populate({ path: 'allocatedToVendor' })
        .populate({ path: 'component' })
        .populate({ path: 'personalDetailsData' })
        .then(async data => {
          console.log("in address component for tl pending ", data.length)
          for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let tatEndDate = item.case.tatEndDate
            let tatDays = 0
            if (item.case.profile != null) {
              tatDays = await getTatDaysFromProfile(item.case.profile)
            } else if (item.case.package != null) {
              tatDays = await getTatDaysFromPackage(item.case.package)
            } else {
              let initDateMoment = moment(item.case.initiationDate)
              let tatEndDateMoment = moment(item.case.tatEndDate)
              tatDays = tatEndDateMoment.diff(initDateMoment, 'days')
            }
            let insuffDays = 0
            if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null) {
              if (item.insufficiencyRaisedDate > item.insufficiencyClearedDate) {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
              } else {
                insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
              }
            } else if (item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null) {
              insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
            } else if (item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null) {
              insuffDays = moment(new Date(item.insufficiencyClearedDate)).diff(moment(new Date(item.case.initiationDate)), 'days')
            }
            let tempInitDateMoment = moment(new Date(item.case.initiationDate)).add('days', insuffDays)
            let tempTatEndDateMoment1 = moment(new Date(tempInitDateMoment.toDate())).add('days', tatDays)
            let numberOfHolidaysBetweenDates = await getNumberOfHolidaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment1)
            let tempTatEndDateMoment2 = tempTatEndDateMoment1.add('days', numberOfHolidaysBetweenDates)
            let numberOfWeeklyOffsBetweenDates = await getNumberOfWeeklyOffDaysBetweenDates(moment(new Date(tempInitDateMoment.toDate())), tempTatEndDateMoment2)
            let finalTatEndDate = tempTatEndDateMoment2.add('days', numberOfWeeklyOffsBetweenDates)
            while (true) {
              if (await isHoliday(finalTatEndDate) || await isWeeklyOff(finalTatEndDate)) {
                finalTatEndDate = finalTatEndDate.add('days', 1)
              } else {
                break
              }
            }

            let verifier = ""
            if (item.verificationAllocatedTo != null) {
              //                     verifier = item.verificationAllocatedTo.name
              verifier = await getUserName(item.verificationAllocatedTo)
            }
            let fe = ""
            if (item.allocatedToFE != null) {
              fe = item.allocatedToFE.name
            }
            let vendor = ""
            if (item.allocatedToVendor != null) {
              vendor = item.allocatedToVendor.name
            }
            let componentDisplayName = "Address Verification - Advanced"
            if (item.component != null) {
              componentDisplayName = item.component.displayName
            }
            let contactNumber = ""
            /*               if(item.personalDetailsData != null){
              contactNumber = item.personalDetailsData.mobilename
            }                        */

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
            if (item.status == 'OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED') {
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
              if (item.grade != null) {
                gradingColor = await getGradingColor(item.grade)
              }
            }

            let ar = sheet.addRow([item.case.caseId, item.case.candidateName, item.case.subclient.client.name, item.case.subclient.name, item.case.subclient.branch.name, fathersName, dateOfBirth, mobileNumber, componentDisplayName, item.status, item.case.initiationDate, item.insufficiencyRaisedDate > item.insufficiencyClearedDate ? moment(item.case.initiationDate).format("DD-MMM-YYYY") : item.insufficiencyRaisedDate == null ? "" : moment(item.insufficiencyRaisedDate).format("DD-MMM-YYYY"), item.insufficiencyClearedDate == null ? "" : moment(item.insufficiencyClearedDate).format("DD-MMM-YYYY"), moment(finalTatEndDate).format('DD-MMM-YYYY'), verifier, fe, vendor, item.dataEntryCompletionDate != null ? moment(item.dataEntryCompletionDate).format('DD-MMM-YYYY') : "", item.inputqcCompletionDate != null ? moment(item.inputqcCompletionDate).format('DD-MMM-YYYY') : "", verificationCompletionDate, verifier, mentorReviewCompletionDate, mentorReviewCompletedBy, outputqcCompletionDate, outputqcCompletedBy, gradingColor, item.address, item.landmark, item.pin, item.city, item.typeofaddress, item.tenureofstay, item.primarycontact, item.alternatecontact, contactNumber, item.gradingComments, item.mode, , item.contactofrespondRhs,])
            ar.commit()
          }


          resolve(true)
        })
        .catch(err => {
          console.log("Error Writing tl pending ", err)
          //              console.log("Error in address component ",err)
          resolve(true)
        })
    })
  }
  prepareReport()
  async function prepareReport() {
    try {
      let userRoles = await getRolesForTheUser()
      console.log("Got roles");
      let componentsForUser = await getComponentsForRoles(userRoles)
      console.log("Got Components for user ", componentsForUser);
      // for each component get checks which are pending with details
      for (i = 0; i < componentsForUser.length; i++) {
        let item = componentsForUser[i]
        if (item.component.name == "employment") {
          let employmentDetails = await getEmploymentDetails()
          console.log("Added employment details")
        } else if (item.component.name == "empbasic") {
          let empbasicDetails = await getEmpBasicDetails()
          console.log("Added empbasic details")
        } else if (item.component.name == 'empadvance') {
          let empadvanceDetails = await getEmpAdvanceDetails()
          console.log("Added empadvance details")
        } else if (item.component.name == 'education') {
          let educationDetails = await getEducationDetails()
          console.log("Added education details")
        } else if (item.component.name == 'educationadvanced') {
          let educationAdvancedDetails = await getEducationAdvancedDetails()
          console.log("Added Education advanced details")
        } else if (item.component.name == "educationcomprehensive") {
          let educationComprehensiveDetails = await getEducationComprehensiveDetails()
          console.log("Added education comprehensive details")
        } else if (item.component.name == 'address') {
          let addressDetails = await getAddressDetails()
          console.log("Added address details")
        } else if (item.component.name == 'addresscomprehensive') {
          let addressComprehensiveDetails = await getAddressComprehensiveDetails()
          console.log("Added address comprehensive details")
        } else if (item.component.name == 'addressonline') {
          let addressOnlineDetails = await getAddressOnlineDetails()
          console.log("Added address online details")
        } else if (item.component.name == 'addresstelephone') {
          let addressTelephoneDetails = await getAddressTelephoneDetails()
          console.log("Added address telephone details")
        } else if (item.component.name == 'courtrecord') {
          let courtRecordDetails = await getCourtRecordDetails()
          console.log("Added court record details")
        } else if (item.component.name == 'criminalrecord') {
          let criminalRecordDetails = await getCriminalRecordDetails()
          console.log("Added criminal record details")
        } else if (item.component.name == 'reference') {
          let referenceRecordDetails = await getReferenceDetails()
          console.log("Added refrence details")
        } else if (item.component.name == 'refbasic') {
          let refBasicDetails = await getRefBasicDetails()
          console.log("Added ref baic details")
        } else if (item.component.name == 'identity') {
          let identityDetails = await getIdentityDetails()
          console.log("Added identity details")
        } else if (item.component.name == 'creditcheck') {
          let creditCheckDetails = await getCreditCheckDetails()
          console.log("Added credit check details")
        } else if (item.component.name == 'credittrans') {
          let credittransDetails = await getCreditTransDetails()
          console.log("Added credit trans details")
        } else if (item.component.name == 'creditequifax') {
          let creditEquifaxDetails = await getCreditEquifaxDetails()
          console.log("Added credit equifax details")
        } else if (item.component.name == 'globaldatabase') {
          let globaldatabaseDetails = await getGlobaldatabaseDetails()
          console.log("Added global database details")
        } else if (item.component.name == 'drugtestfive') {
          let drugtestfiveDetails = await getDrugTestFiveDetails()
          console.log("Added drug test five details")
        } else if (item.component.name == 'drugtestsix') {
          let drugtestsixDetails = await getDrugTestSixDetails()
          console.log("Added drug test six details")
        } else if (item.component.name == 'drugtestseven') {
          let drugtestsevenDetails = await getDrugTestSevenDetails()
          console.log("Added drug test seven detail")
        } else if (item.component.name == 'drugtesteight') {
          let drugtesteightDetails = await getDrugTestEightDetails()
          console.log("Added drug test eight details")
        } else if (item.component.name == 'drugtestnine') {
          let drugtestnineDetails = await getDrugTestNineDetails()
          console.log("Added drug test nine details")
        } else if (item.component.name == 'drugtestten') {
          let drugtesttenDetails = await getDrugTestTenDetails()
          console.log("Added drug test ten details")
        } else if (item.component.name == 'dlcheck') {
          let dlCheckDetails = await getDlCheckDetails()
          console.log("Added dl check cetails")
        } else if (item.component.name == 'directorshipcheck') {
          let directorshipCheckDetails = await getDirectorshipCheckDetails()
          console.log("Added directorship check details")
        } else if (item.component.name == 'voterid') {
          let voterIdDetails = await getVoterIdDetails()
          console.log("Added voter id details")
        } else if (item.component.name == 'vddadvance') {
          let vddAdvanceDetails = await getVddAdvanceDetails()
          console.log("Added vdd advance details")
        } else if (item.component.name == 'bankstmt') {
          let dlBankStmtDetails = await getBankStmtDetails()
          console.log("Added bank statement details")
        } else if (item.component.name == 'sitecheck') {
          let siteCheckDetails = await getSiteCheckDetails()
          console.log("Added sit check details")
        } else if (item.component.name == 'physostan') {
          let psychometricDetails = await getPsychometricDetails()
          console.log("Added psychometric details")
        } else if (item.component.name == 'socialmedia') {
          let socialmediaCheckDetails = await getSocialMediaDetails()
        } else if (item.component.name == 'facisl3') {
          let facisl3Details = await getFacisl3Details()
        } else if (item.component.name == 'ofac') {
          let ofacDetails = await getOfacDetails()
        } else if (item.component.name == 'gapvfn') {
          let gapvfnDetails = await getGapVfnDetails()
        } else if (item.component.name == 'passport') {
          let passportDetails = await getPassportDetails()
        } else if (item.component.name == 'uan') {
          let uanDetails = await getUanDetails()
        } else if (item.component.name == 'addressbusiness') {
          let addressBusinessDetails = await getAddressBusinessDetails()
        }
      }
    } catch (err) {
      console.log("Error in tl pending is ", err)
    }
    console.log("Setting Headers")
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tl_tracker.xlsx"
    )
    console.log("About to return WorkBook")
    const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${req.user.user_id}.xlsx`);
    await workBook.xlsx.write(fileStream);
    //	sheet.commit()
    //	workBook.commit()    
    await new Promise(resolve => setTimeout(resolve, 20000));
    res.download(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${req.user.user_id}.xlsx`, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download  the file"
        })
      }
    })


    /*       return workBook.xlsx.write(res)
    .then(function(){
      res.status(200).end()
    })    */
    //        res.json({message:"Successful"})
  }

}

