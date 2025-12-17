const Component = require('../../models/administration/component.model');
const ComponentField = require('../../models/administration/component_field.model');
const UserVendorAccess = require('../../models/administration/user_vendor_access.model')
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

exports.getVendorTrackerReport = (req,res)=>{
    console.log("In vendor Tracker Report...")	
    console.log("In vendor tracker again......")	
    const workBook = new  ExcelJS.Workbook()
    console.log("Workbook constructed")	
    const sheet = workBook.addWorksheet('Vendor Tracker')
    console.log("Sheet added")	
    sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Date of Birth","Father's Name","Contact Number","Component","Status","Field 1","Field 2","Field 3","Field 4","Field 5","Field 6","Field 7","Field 8","Field 9","Field 10"])
    console.log("Added  the header row to the sheet")	
//    let query = {$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]} 
    console.log("Query Constructed")	
//    let vend = ""	
    let getVendorForTheUser = function(){
        return new Promise((resolve,reject)=>{
            UserVendorAccess
            .findOne({user:req.user.user_id})
            .then(data=>{
                console.log("Got the Vendor ",data);
                resolve(data.vendor);
            })
            .catch(err=>{
		console.log("Error in getting vendor for the user",err)    
                reject()     
            })            
        })
    }
    let readPersonalDetails  = function(acase){
       return new Promise((resolve,reject)=>{
	  PersonalDetailsData
	  .findOne({case:acase})
	  .then(data=>{
	     resolve(data)	  
	  })
          .catch(err=>{
	     reject(null)	  
	  })		  
       })	    
    }	
//    let query = {$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vend,status:'VERIFIER-REJECTED'}]}
    let getEmploymentDetails = function(vendor){
        console.log("In Employment Details")	    
        return new Promise((resolve,reject)=>{
            employment
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                console.log("Got Data for employment ",data)
		data.forEach(async item=>{
		   let dateOfBirth = ""
		   let fathersName = ""
		   let contactNumber = ""	
		   if(item.personalDetailsData != null){
		     if(item.personalDetailsData.dateofbirth != null){
		       dateOfBirth = item.personalDetailsData.dateofbirth	     
		     }	     
		     if(item.personalDetailsData.fathername != null){
		       fathersName = item.personalDetailsData.fathername	     
		     }	   
		     if(item.personalDetailsData.mobilename != null){
		       contactNumber = item.personalDetailsData.mobilename	     
		     }	   
	           }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }
		   
	           sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])		
		})
		resolve(data)    
            })
            .catch(err=>{
		console.log("Error in writing pending for employment",err)    
                reject()
            })
        })

    }
    let getEmpBasicDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            console.log("Inside Emp basic ") 		
            empbasic
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                   data.forEach(async item=>{
                       let dateOfBirth = ""
                       let fathersName = ""
                       let contactNumber = ""
                       if(item.personalDetailsData != null){
                         if(item.personalDetailsData.dateofbirth != null){
                           dateOfBirth = item.personalDetailsData.dateofbirth
                         }
                         if(item.personalDetailsData.fathername != null){
                           fathersName = item.personalDetailsData.fathername
                         }
                         if(item.personalDetailsData.mobilename != null){
                           contactNumber = item.personalDetailsData.mobilename
                         }
                      }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			   
                       sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
                })
                resolve(data)
            })
            .catch(err=>{
		console.log("Error in employment basic ",err)    
                reject()
            })
        })

    }    
    let getEmpAdvanceDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            empadvance
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
            .populate({path:'personalDetailsData'})		
            .then(data=>{
                data.forEach(async item=>{
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }



                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    } 
    
    let getEducationDetails = function(vendor){
	console.log("In education details of tl pending")    
        return new Promise((resolve,reject)=>{
            education
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
            .then(data=>{
	         console.log("go the education details.............................",data.length)	
		 data.forEach(async item=>{
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			 
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })    

                resolve(data)
            })
            .catch(err=>{
		console.log("Error in tl pending education listing ",err)    
                reject()
            })
        })

    }     
    let getEducationAdvancedDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            educationadvanced
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'}) 	
	    .populate({path:'personalDtailsData'})	
            .then(data=>{
                 data.forEach(async item=>{
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			 
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.nameofuniverskty,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }     
    let getEducationComprehensiveDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            educationcomprehensive
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }     
    let getAddressDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            address
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                console.log("in address component for tl pending ",data.length)		
                data.forEach(async item=>{
		   let componentDisplayName = "Address Verification - Advanced"	
		   if(item.component != null){
	             componentDisplayName = item.component.displayName		   
                   }			  
/*                   let contactNumber=""			
	           if(item.personalDetails != null){
	              contactNumber = item.personalDetails.mobilename		   
                   } 			   */
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact,contactNumber])
                })


                resolve(data)
            })
            .catch(err=>{
		console.log("Error in address component ",err)    
                reject()
            })
        })

    }         
    let getAddressComprehensiveDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            addresscomprehensive
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                console.log("In address comprehensive for tl pending ",data.length)
                data.forEach(async item=>{
		   let componentDisplayName = "Address Verification - Comprehensive"	
		   if(item.component != null){
		     componentDisplayNane = item.component.displayName	   
	           }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.fulladdress,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })
    


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }             
    let getAddressOnlineDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            addressonline
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Address Check - Online"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.fulladdresswithpin,item.landmark,item.pin,item.city,item.typeofaddress,item.tenure,item.primarycontact,item.alternatecontact])
                })



                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                 
    let getAddressTelephoneDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            addresstelephone
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                
                data.forEach(async item=>{
                   let componentDisplayName = "Address Check - Telephonic"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                 
    let getCourtRecordDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            courtrecord
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
            .populate({path:'personalDetailsData'})		
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Court Record Check - Online"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
	             let personalDetailsData = await readPersonalDetails(item.case._id)
		     if(personalDetailsData != null){
		       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
		       contactNumber = personalDetailsData.mobilename	     
		     } 	   
		   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.addresswithpin,item.pin,item.city,item.typeofaddress,item.tenure])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		console.log("Error in court record check for tl pending ",err)    
                reject()
            })
        })

    }                     
    let getCriminalRecordDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            criminalrecord
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "Criminal Record Check"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.fulladdress,item.pin,item.city,item.typeofaddress,item.tenureofstay])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		console.log("Error in criminal check for tl pending",err)    
                reject()
            })
        })

    }                         
    let getReferenceDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            reference
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "Reference Check - Advanced"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.nameofreference,item.deisgnation,item.contactdetails])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                         
    let getRefBasicDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            refbasic
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

               data.forEach(async item=>{
                   let componentDisplayName = "Reference Check - Basic"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

		       
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.name,item.designation,item.contact])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                        
    
    let getIdentityDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            identity
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "Identity Check"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.typeofid,item.nameasperid,item.idnumber,item.issuedby])
                })

		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                            
    let getCreditCheckDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            creditcheck
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "Credit Check - Basic"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }


                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.taxid,item.nameasperpan,item.dateofbirth,item.issuedby])
                })



                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                
    let getCreditTransDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            credittrans
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
               
                data.forEach(async item=>{
                   let componentDisplayName = "Credit Check - TransUnion"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.pannumber,item.nameasperpan,item.dateofbirth,item.issuedby])
                })
    


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                
    let getCreditEquifaxDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            creditequifax
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Credit Check - Equifax"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.pannumber,item.panname,item.dobofpan,item.gender,item.fulladdress,item.contact,item.altcontact])
                })
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                    

    let getGlobaldatabaseDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            globaldatabase
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Global Database Search"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.searchname])
                })
 		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                        

    let getDrugTestFiveDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            drugtestfive
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "Drug Test - 5 Panel"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
                })
 

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                            
    let getDrugTestSixDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            drugtestsix
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "Drug Test - 6 Panel"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                  
    
    let getDrugTestSevenDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            drugtestseven
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'}) 	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Drug Test - 7 Panel"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.nameofemploybee,item.fulladdress,item.pin,item.city,item.contactnumber])
                })

		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                    
    let getDrugTestEightDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            drugtesteight
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		   
                data.forEach(async item=>{
                   let componentDisplayName = "Drug Test - 8  Panel"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.nameofemployee,item.address,item.pin,item.city,item.contact])
                })

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
    let getDrugTestNineDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            drugtestnine
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Drug Test - 9 Panel"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.consent,item.fulladdress,item.pin,item.city,item.contact])
                })
		    
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    

    let getDrugTestTenDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            drugtestten
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Drug Test - 10 Panel"
                   if(item.component != null){
                     componentDisplayNmne = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.nameofemployee,item.address,item.pin,item.city,item.contact])
                })
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }        
    let getDlCheckDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            dlcheck
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		
                data.forEach(async item=>{
                   let componentDisplayName = "Driving License Check"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.dlnumber,item.nameperdl,item.dob,item.issuedate,item.dlvalid])
                })

		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }            
    let getDirectorshipCheckDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            directorshipcheck
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
 
                data.forEach(async item=>{
                   let componentDisplayName = "Directorship Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.directorname,item.dinnumber,item.dob,item.verifiedon])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }            

    let getVoterIdDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            voterid
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                 data.forEach(async item=>{
                   let componentDisplayName = "Voter ID Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			 
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.epicnumber,item.epicname,item.fulladdress,item.pin,item.city,item.contactnumber])
                })
   

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
    
    let getVddAdvanceDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            vddadvance
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Vendor Due Dilligence - Advanced"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.companyname,item.regdadd,item.cin,item.pan,item.gst])
                })
    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    
    let getBankStmtDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            bankstmt
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		
                data.forEach(async item=>{
                   let componentDisplayName = "Bank Statement Verification"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.tenure,item.nameofbank,item.transaction])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    
    let getSiteCheckDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            sitecheck
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Site Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.name,item.fulladdress,item.pin,item.city])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    
    let getPsychometricDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            physostan
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Psychometric Standard"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.name,item.emailid,item.contact,item.gender])
                })
    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    

    let getSocialMediaDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            socialmedia
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "Social Media Search"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.searchname])
                })
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }        

    let getFacisl3Details = function(vendor){
        return new Promise((resolve,reject)=>{
            facisl3
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
                   let componentDisplayName = "FACIS L3 Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.applicantname,item.dateofbirth,item.stcode])
                })
    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }            
    let getOfacDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            ofac
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "OFAC Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.candname,item.ofac])
                })
 

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }        

    let getGapVfnDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            gapvfn
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "GAP Verification"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.tenureofgap,item.reasonforgap,item.address,item.PIN,item.CITY])
                })
    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }            
    let getPassportDetails = function(vendor){
        return new Promise((resolve,reject)=>{
            passport
            .find({$or:[{allocatedToVendor:vendor,status:"ALLOCATED-TO-VENDOR"},{allocatedToVendor:vendor,status:'VERIFIER-REJECTED'}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
                   let componentDisplayName = "Passport Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   let dateOfBirth = ""
                   let fathersName = ""
                   let contactNumber = ""
                   if(item.personalDetailsData != null){
                     if(item.personalDetailsData.dateofbirth != null){
                       dateOfBirth = item.personalDetailsData.dateofbirth
                     }
                     if(item.personalDetailsData.fathername != null){
                       fathersName = item.personalDetailsData.fathername
                     }
                     if(item.personalDetailsData.mobilename != null){
                       contactNumber = item.personalDetailsData.mobilename
                     }
                   }else{
                     let personalDetailsData = await readPersonalDetails(item.case._id)
                     if(personalDetailsData != null){
                       dateOfBirth = personalDetailsData.dateofbirth
                       fathersName = personalDetailsData.fathername
                       contactNumber = personalDetailsData.mobilename
                     }
                   }

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.givenname,item.lastname,item.issuecountry,item.nationality,item.passportnumber,item.expirydate])
                })
 

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                
    prepareReport()
    async function prepareReport(){
	console.log("About to get the vendor")    
        let vendor = await getVendorForTheUser()
	console.log("Got the vendor")    
        let employmentDetails = await getEmploymentDetails(vendor)
	console.log("Got employment details")    
        let empbasicDetails = await getEmpBasicDetails(vendor)
	console.log("got employment basic details")    
        let empadvanceDetails = await getEmpAdvanceDetails(vendor)
	console.log("got employment advanced details")    
        let educationDetails = await getEducationDetails(vendor)
	console.log("got educationd details")    
        let educationAdvancedDetails = await getEducationAdvancedDetails(vendor)
	console.log("got education advanced details")    
        let educationComprehensiveDetails = await getEducationComprehensiveDetails(vendor)
	console.log("got employment comprehensive details")    
        let addressDetails = await getAddressDetails(vendor)
        let addressComprehensiveDetails = await getAddressComprehensiveDetails(vendor)
        let addressOnlineDetails = await getAddressOnlineDetails(vendor)
        let addressTelephoneDetails = await getAddressTelephoneDetails(vendor)
        let courtRecordDetails = await getCourtRecordDetails(vendor)
        let criminalRecordDetails = await getCriminalRecordDetails(vendor)
        let referenceRecordDetails = await getReferenceDetails(vendor)
        let refBasicDetails = await getRefBasicDetails(vendor)
        let identityDetails = await getIdentityDetails(vendor)
        let creditCheckDetails = await getCreditCheckDetails(vendor)
        let credittransDetails = await getCreditTransDetails(vendor)
        let creditEquifaxDetails = await getCreditEquifaxDetails(vendor)
        let globaldatabaseDetails = await getGlobaldatabaseDetails(vendor)
        let drugtestfiveDetails = await getDrugTestFiveDetails(vendor)
        let drugtestsixDetails = await getDrugTestSixDetails(vendor)
        let drugtestsevenDetails = await getDrugTestSevenDetails(vendor)
        let drugtesteightDetails = await getDrugTestEightDetails(vendor)
        let drugtestnineDetails = await getDrugTestNineDetails(vendor)
        let drugtesttenDetails = await getDrugTestTenDetails(vendor)
        let dlCheckDetails = await getDlCheckDetails(vendor)
        let directorshipCheckDetails = await getDirectorshipCheckDetails(vendor)
        let voterIdDetails = await getVoterIdDetails(vendor)
        let vddAdvanceDetails = await getVddAdvanceDetails(vendor)
        let dlBankStmtDetails = await getBankStmtDetails(vendor)
        let siteCheckDetails = await getSiteCheckDetails(vendor)
        let psychometricDetails = await getPsychometricDetails(vendor)
        let socialmediaCheckDetails = await getSocialMediaDetails(vendor)
        let facisl3Details = await getFacisl3Details(vendor)
        let ofacDetails = await getOfacDetails(vendor)
        let gapvfnDetails = await getGapVfnDetails(vendor)
        let passportDetails = await getPassportDetails(vendor)

     
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
