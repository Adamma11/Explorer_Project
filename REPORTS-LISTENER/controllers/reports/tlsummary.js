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

exports.gettlsummaryTrackerReport = (req, res) => {
  console.log("In TL Tracker Report...")
  console.log("Report type required is ...................................................", req.query.reportType)
  //    const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${req.user.user_id}.xlsx`);	
  const workBook = new ExcelJS.Workbook()
  //    const workBook = new ExcelJs.stream.xlsx.WorkbookWriter({ stream: fileStream,}); 
  console.log("Workbook constructed")
  const sheet = workBook.addWorksheet('TL Pending')
  console.log("Sheet added")
  let addedRow = sheet.addRow(["COMPONENT NAME","COUNT"])
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

  let getEmploymentDetails = function(){
    return new Promise((resolve,reject)=>{
        employment
        .count(query)
        .then(data=>{
    console.log("Employment count is ",data)    
    let ar = sheet.addRow(["Employment Verification - Comprehensive" ,data])
    ar.commit() 
    resolve(data)    
        })
        .catch(err=>{
//		console.log("Error in writing tl pending for employment",err)    
            console.log("Error Writing tl pending ",err)		    
            reject(0)
        })
    })

}
let getEmpBasicDetails = function(){
    return new Promise((resolve,reject)=>{
        empbasic
        .count(query)
        .then(data=>{
    console.log("Emp basic count is ",data)  
    let ar = sheet.addRow(["Education Verification - Basic" ,data])
    ar.commit()   
            resolve(data)
        })
        .catch(err=>{
    console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}    
let getEmpAdvanceDetails = function(){
    return new Promise((resolve,reject)=>{
        empadvance
        .count(query)
        .then(data=>{
    console.log("Emp advanced count is ",data)   
    let ar = sheet.addRow(["Employment Verification - Advanced" ,data])
    ar.commit() 
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

} 

let getEducationDetails = function(){
console.log("In education details of tl pending")    
    return new Promise((resolve,reject)=>{
        education
        .count(query)
        .then(data=>{
    console.log("Education count is ",data)
    let ar = sheet.addRow(["Education Verification - Basic" ,data])
    ar.commit()     
            resolve(data)
        })
        .catch(err=>{
//		console.log("Error in tl pending education listing ",err)    
     console.log("Error Writing tl pending ",err)
            reject(0)
        })
    })

}     
let getEducationAdvancedDetails = function(){
console.log("In Education Advanced Details")    
    return new Promise((resolve,reject)=>{
        educationadvanced
        .count(query)
        .then(data=>{
    console.log("Education advanced count is ",data)    
    let ar = sheet.addRow(["Education Verification - Advanced" ,data])
    ar.commit()   
            resolve(data)
        })
        .catch(err=>{
//		console.log("Error in Education Advanced",err)    
     console.log("Error Writing tl pending ",err)		
            reject(0)
        })
    })

}     
let getEducationComprehensiveDetails = function(){
    return new Promise((resolve,reject)=>{
        educationcomprehensive
        .count(query)
        .then(data=>{
    console.log("Education comprehensive count is ",data)    
    let ar = sheet.addRow(["Education Verification - Comprehensive" ,data])
    ar.commit() 
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
//		conole.log("I education comprehensive error",err)    
            reject(0)
        })
    })

}     

let getUserName = function(user_id){
   return new Promise((resolve,reject)=>{
  console.log("Trying to get user name for id ",user_id)     
  User
  .findOne({_id:user_id})
  .then(data=>{
         if(data != null){		  
            console.log("Got user name",data.name)
     }else{
    console.log("Name null for ",user_id)     
     }	     
     resolve(data.name)	  
  })     
  .catch(err=>{
         console.log("Error in getting user name ",err)		  
     reject(user_id)	  
  })     
   })	    
}	
let getAddressDetails = function(){
    return new Promise((resolve,reject)=>{
        address
        .count(query)
        .then(data=>{
    console.log("Address count is ",data) 
    let ar = sheet.addRow(["Address Verification - Advanced" ,data])
    ar.commit()    
            resolve(data)
        })
        .catch(err=>{
            console.log("Error Writing tl pending ",err)		    
//		console.log("Error in address component ",err)    
            reject(0)
        })
    })

}         
let getAddressComprehensiveDetails = function(){
    return new Promise((resolve,reject)=>{
        addresscomprehensive
        .count(query)
        .then(data=>{
    console.log("Address comprehensive count is ",data)  
    let ar = sheet.addRow(["Address Verification - Comprehensive" ,data])
    ar.commit()      
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}             
let getAddressOnlineDetails = function(){
    return new Promise((resolve,reject)=>{
        addressonline
        .count(query)
        .then(data=>{
    console.log("Address online count is ",data)    
    let ar = sheet.addRow(["Address Check - Online" ,data])
    ar.commit() 
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                 
let getAddressTelephoneDetails = function(){
    return new Promise((resolve,reject)=>{
        addresstelephone
        .count(query)
        .then(data=>{
    console.log("Address Telephone Count is ",data)   
    let ar = sheet.addRow(["Address Check - Telephonic" ,data])
    ar.commit()  
            resolve(data)
        })
        .catch(err=>{
         console.log("Error Writing tl pending ",err)	    
            reject(0)
        })
    })

}                 
let getCourtRecordDetails = function(){
console.log("In Court Record , query is ",query)    
    return new Promise((resolve,reject)=>{
        courtrecord
        .count(query)
        .then(data=>{
    console.log("Court record count  is ",data)    
    let ar = sheet.addRow(["Court Record Check - Online" ,data])
    ar.commit() 
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
    console.log("Error in court record check for tl pending ",err)    
            reject(0)
        })
    })

}                     
let getCriminalRecordDetails = function(){
    return new Promise((resolve,reject)=>{
        criminalrecord
        .count(query)
        .then(data=>{
    console.log("Criminal Record count is ",data)    
    let ar = sheet.addRow(["Criminal Record Check" ,data])
    ar.commit() 
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
    console.log("Error in criminal check for tl pending",err)  
      
            reject(0)
        })
    })

}                         
let getReferenceDetails = function(){
    return new Promise((resolve,reject)=>{
        reference
        .count(query)
        .then(data=>{
    console.log("Reference Count is ",data)  
    let ar = sheet.addRow(["Reference Check - Advanced" ,data])
    ar.commit()   
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                         
let getRefBasicDetails = function(){
    return new Promise((resolve,reject)=>{
        refbasic
        .count(query)
        .then(data=>{
    console.log("Ref basic count is ",data)  
    let ar = sheet.addRow(["Reference Check - Basic" ,data])
    ar.commit()    
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                        

let getIdentityDetails = function(){
    return new Promise((resolve,reject)=>{
        identity
        .count(query)
        .then(data=>{
    console.log("Identity Count is ",data)   
    let ar = sheet.addRow(["Identity Check" ,data])
    ar.commit()   
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                            
let getCreditCheckDetails = function(){
    return new Promise((resolve,reject)=>{
        creditcheck
        .count(query)
        .then(data=>{
        let ar = sheet.addRow(["Credit Check - Basic" ,data])
        ar.commit()  
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                                
let getCreditTransDetails = function(){
    return new Promise((resolve,reject)=>{
        credittrans
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Credit Check - TransUnion" ,data])
          ar.commit()  
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                                
let getCreditEquifaxDetails = function(){
    return new Promise((resolve,reject)=>{
        creditequifax
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Credit Check - Equifax" ,data])
          ar.commit()  
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                                    

let getGlobaldatabaseDetails = function(){
    return new Promise((resolve,reject)=>{
        globaldatabase
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Global Database Search" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                                        

let getDrugTestFiveDetails = function(){
    return new Promise((resolve,reject)=>{
        drugtestfive
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Drug Test - 5 Panel" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                                            
let getDrugTestSixDetails = function(){
    return new Promise((resolve,reject)=>{
        drugtestsix
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Drug Test 6 Panel" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                  

let getDrugTestSevenDetails = function(){
    return new Promise((resolve,reject)=>{
        drugtestseven
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Drug Test 7 Panel" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}                    
let getDrugTestEightDetails = function(){
    return new Promise((resolve,reject)=>{
        drugtesteight
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Drug Test 8 Panel" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}
let getDrugTestNineDetails = function(){
    return new Promise((resolve,reject)=>{
        drugtestnine
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Drug Test 9 Panel" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}    

let getDrugTestTenDetails = function(){
    return new Promise((resolve,reject)=>{
        drugtestten
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Drug Test 10 Panel" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}        
let getDlCheckDetails = function(){
    return new Promise((resolve,reject)=>{
        dlcheck
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Driving License Check" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}            
let getDirectorshipCheckDetails = function(){
    return new Promise((resolve,reject)=>{
        directorshipcheck
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Directorship Check" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}            

let getVoterIdDetails = function(){
    return new Promise((resolve,reject)=>{
        voterid
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Voter ID Check" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}

let getVddAdvanceDetails = function(){
    return new Promise((resolve,reject)=>{
        vddadvance
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Vendor Due Diligence" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}    
let getBankStmtDetails = function(){
    return new Promise((resolve,reject)=>{
        bankstmt
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Bank Statement Verification" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}    
let getSiteCheckDetails = function(){
    return new Promise((resolve,reject)=>{
        sitecheck
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Site Check" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}    
let getPsychometricDetails = function(){
    return new Promise((resolve,reject)=>{
        physostan
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Psychometric Standard" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}    

let getSocialMediaDetails = function(){
    return new Promise((resolve,reject)=>{
        socialmedia
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Social Media Search" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}        

let getFacisl3Details = function(){
    return new Promise((resolve,reject)=>{
        facisl3
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["FACIS L3 Check" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}            
let getOfacDetails = function(){
    return new Promise((resolve,reject)=>{
        ofac
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["OFAC Check" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}        

let getGapVfnDetails = function(){
    return new Promise((resolve,reject)=>{
        gapvfn
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["GAP Verification" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
        })
    })

}            
let getPassportDetails = function(){
    return new Promise((resolve,reject)=>{
        passport
        .count(query)
        .then(data=>{
          let ar = sheet.addRow(["Passport Check" ,data])
          ar.commit()
            resolve(data)
        })
        .catch(err=>{
     console.log("Error Writing tl pending ",err)    
            reject(0)
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

