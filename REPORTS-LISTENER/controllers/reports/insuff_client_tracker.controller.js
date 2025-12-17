const Component = require('../../models/administration/component.model');
const ComponentField = require('../../models/administration/component_field.model');
const UserSubclientAccess = require('../../models/administration/user_subclient_access.model')
const ExcelJS = require('exceljs');
const UserRole = require('../../models/administration/user_role.model');
const ComponentAccess = require('../../models/administration/component_access.model')
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
const addresstelephone = require('../../models/data_entry/addresstelephone.model');
const addressonline = require('../../models/data_entry/addressonline.model');
const addresscomprehensive = require('../../models/data_entry/addresscomprehensive.model');
const educationcomprehensive = require('../../models/data_entry/educationcomprehensive.model');
const educationadvanced = require('../../models/data_entry/educationadvanced.model');
const drugtestsix =require('../../models/data_entry/drugtestsix.model');
const drugtestseven = require('../../models/data_entry/drugtestseven.model');
const drugtesteight = require('../../models/data_entry/drugtesteight.model');
const drugtestnine = require('../../models/data_entry/drugtestnine.model');
const facisl3 = require('../../models/data_entry/facisl3.model');
const credittrans = require('../../models/data_entry/credittrans.model');
const creditequifax = require('../../models/data_entry/creditequifax.model');
const empadvance = require('../../models/data_entry/empadvance.model');
const empbasic = require('../../models/data_entry/empbasic.model');
const vddadvance = require('../../models/data_entry/vddadvance.model');
const dlcheck =  require('../../models/data_entry/dlcheck.model');
const voterid = require('../../models/data_entry/voterid.model');
const ofac = require('../../models/data_entry/ofac.model');
const physostan = require('../../models/data_entry/physostan.model')
const gapvfn = require('../../models/data_entry/gapvfn.model')
const sitecheck = require('../../models/data_entry/sitecheck.model')
const bankstmt = require('../../models/data_entry/bankstmt.model')
const directorshipcheck = require('../../models/data_entry/directorshipcheck.model')
const PersonalDetailsData = require ('../../models/data_entry/personal_details_data.model')
const moment = require('moment')
exports.getInsuffForClientReport = (req,res)=>{
    const workBook = new  ExcelJS.Workbook()
    console.log("Workbook constructed")	
    const sheet = workBook.addWorksheet('Vendor Tracker')
    sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Employee ID","Component","Insuff Raised Date","No. of Days","Entity Details","Insuff Comments"])
    console.log("Added  the header row to the sheet")	
//    let query = {$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]} 
    console.log("Query Constructed")	
//    let vend = ""	   

    let query = {$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]}	
    let subclientList = new Array()
    let getSubclientsForTheUser = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess
            .find({user:req.user.user_id},{_id:0,subclient:1})
            .then(data=>{
		console.log("Subclient list being filled ",data)   
		    
		subclientList = data    
                resolve(true);
            })
            .catch(err=>{
		console.log("Error in getting vendor for the user",err)    
                resolve(true)     
            })            
        })
    }
 let getReqArray = function(userSubclientData,data){
     return new Promise((resolve,reject)=>{
         let reqData = new Array()
         for(let i=0; i < data.length;i++){
            let insuffData = data[i]
            for(let j=0; j < userSubclientData.length;j++){
               let subclientData = userSubclientData[j]
               if(insuffData.case.subclient._id.toString() == subclientData.subclient.toString()){
                  reqData.push(insuffData)
                  break
               }
            }
         }
         resolve(reqData)
     })
}
   	
    let foundInSubclientList = function(subclient){
      return new Promise((resolve,reject)=>{
	subclientList.forEach(item=>{
           console.log("Subclient String is ",subclient.toString())
	   console.log("item.subclient.toString is ",item.subclient.toString())	
	   if(subclient.toString() == item.subclient.toString()){
	     resolve(true)	   
	   }	
	})
	resolve(false)      
      })	    
    }	
//    let query = {$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vend,status:'VERIFIER-REJECTED'}]}
    let getEmploymentDetails = function(){
        console.log("In Employment Details")	   
	console.log("Subclient list inside employment details is",subclientList.length)    
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 employment
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
		.populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofemployer,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)			
                   
                })
                .catch(err=>{
		    resolve(true)	
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
         })

    }
    let getEmpBasicDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 empbasic
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofemployer,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }    
    let getEmpAdvanceDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 empadvance
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofemployer,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })

		
        })

    } 
    
    let getEducationDetails = function(){
	console.log("In education details of tl pending")    
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 education
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofuniversity,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })
		
    }     
    let getEducationAdvancedDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 educationadvanced
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofuniverskty,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }     
    let getEducationComprehensiveDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 educationcomprehensive
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofuniversity,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }     
    let getAddressDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 address
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.address,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })

               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }         
    let getAddressComprehensiveDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 addresscomprehensive
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.fulladdress,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }             
    let getAddressOnlineDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 addressonline
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.fulladdwithpin,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                 
    let getAddressTelephoneDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 addresstelephone
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.address,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                 
    let getCourtRecordDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 courtrecord
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.addresswithpin,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                     
    let getCriminalRecordDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 criminalrecord
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.fulladdress,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                         
    let getReferenceDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 reference
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofreference,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                         
    let getRefBasicDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 refbasic
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.name,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                        
    
    let getIdentityDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 identity
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.typeofid,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                            
    let getCreditCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 creditcheck
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.taxid,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                                
    let getCreditTransDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 credittrans
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.pannumber,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                                
    let getCreditEquifaxDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 creditequifax
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.pannumber,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                                    

    let getGlobaldatabaseDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 globaldatabase
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.searchname,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                                        

    let getDrugTestFiveDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 drugtestfive
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofemployee,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                                            
    let getDrugTestSixDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 drugtestsix
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofemployee,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                  
    
    let getDrugTestSevenDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 drugtestseven
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofemploybee,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                    
    let getDrugTestEightDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 drugtesteight
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofemployee,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }
    let getDrugTestNineDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 drugtestnine
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.consent,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }    

    let getDrugTestTenDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 drugtestten
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.nameofemployee,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }        
    let getDlCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 dlcheck
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.dlnumber,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }            
    let getDirectorshipCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 directorshipcheck
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }            

    let getVoterIdDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 voterid
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.epicnumber,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }
    
    let getVddAdvanceDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 vddadvance
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.companyname,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }    
    let getBankStmtDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 bankstmt
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.tenure,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }    
    let getSiteCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 sitecheck
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.fulladdress,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }    
    let getPsychometricDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 physostan
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.name,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }    

    let getSocialMediaDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 socialmedia
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.searchname,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }        

    let getFacisl3Details = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 facisl3
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.applicantname,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }            
    let getOfacDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 ofac
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.candname,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }        

    let getGapVfnDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                 gapvfn
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.tenureofgap,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }            
    let getPassportDetails = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess.find({user:req.user.user_id})
              .then(userSubclientData=>{
                passport
                .find({$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:'INSUF-1-CLEARANCE-REJECTED'},{status:'INSUF-2-CLEARANCE-REJECTED'}]})
                .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
                .populate({path:'component'})
                .then(async data=>{
                   let reqArray = await getReqArray(userSubclientData,data)
                   reqArray.forEach(item=>{
                    const insuffDays = moment(new Date()).diff(moment(new Date(item.insufficiencyRaisedDate)), 'days')
                      sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.case.employeeId,item.component.displayName,item.insufficiencyRaisedDate,insuffDays,item.passportnumber,item.insufficiencyComments])
//                 }
                   })
                   reslove(true)

                })
                .catch(err=>{
                    resolve(true)
                    message:err.message || 'Some error while retrieving address for cases'
                   })
               })
//             })
            .catch(err=>{
              res.status(500).json({
              message:err.message || 'Some error while retrieving address for cases'
             })
          })
		
        })

    }                
    prepareReport()
    async function prepareReport(){
	await getSubclientsForTheUser()   
	console.log("Subclient list is.......",subclientList.length)    
        let employmentDetails = await getEmploymentDetails()
        let empbasicDetails = await getEmpBasicDetails()
        let empadvanceDetails = await getEmpAdvanceDetails()
        let educationDetails = await getEducationDetails()
        let educationAdvancedDetails = await getEducationAdvancedDetails()
        let educationComprehensiveDetails = await getEducationComprehensiveDetails()
        let addressDetails = await getAddressDetails()
        let addressComprehensiveDetails = await getAddressComprehensiveDetails()
        let addressOnlineDetails = await getAddressOnlineDetails()
        let addressTelephoneDetails = await getAddressTelephoneDetails()
        let courtRecordDetails = await getCourtRecordDetails()
        let criminalRecordDetails = await getCriminalRecordDetails()
        let referenceRecordDetails = await getReferenceDetails()
        let refBasicDetails = await getRefBasicDetails()
        let identityDetails = await getIdentityDetails()
        let creditCheckDetails = await getCreditCheckDetails()
        let credittransDetails = await getCreditTransDetails()
        let creditEquifaxDetails = await getCreditEquifaxDetails()
        let globaldatabaseDetails = await getGlobaldatabaseDetails()
        let drugtestfiveDetails = await getDrugTestFiveDetails()
        let drugtestsixDetails = await getDrugTestSixDetails()
        let drugtestsevenDetails = await getDrugTestSevenDetails()
        let drugtesteightDetails = await getDrugTestEightDetails()
        let drugtestnineDetails = await getDrugTestNineDetails()
        let drugtesttenDetails = await getDrugTestTenDetails()
        let dlCheckDetails = await getDlCheckDetails()
        let directorshipCheckDetails = await getDirectorshipCheckDetails()
        let voterIdDetails = await getVoterIdDetails()
        let vddAdvanceDetails = await getVddAdvanceDetails()
        let dlBankStmtDetails = await getBankStmtDetails()
        let siteCheckDetails = await getSiteCheckDetails()
        let psychometricDetails = await getPsychometricDetails()
        let socialmediaCheckDetails = await getSocialMediaDetails()
        let facisl3Details = await getFacisl3Details()
        let ofacDetails = await getOfacDetails()
        let gapvfnDetails = await getGapVfnDetails()
        let passportDetails = await getPassportDetails()

     
	console.log("Setting Headers")    
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "vendor_tracker.xlsx"
        )
	console.log("About to return WorkBook")    
        return workBook.xlsx.write(res)
        .then(function(){
            res.status(200).end()
        })    
//        res.json({message:"Successful"})
    }

 }
