const Component = require('../../models/administration/component.model');
const ComponentField = require('../../models/administration/component_field.model');
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
const uan = require('../../models/data_entry/uan.model');
const addresstelephone = require('../../models/data_entry/addresstelephone.model');
const addressonline = require('../../models/data_entry/addressonline.model');
const addresscomprehensive = require('../../models/data_entry/addresscomprehensive.model');
const addressbusiness = require('../../models/data_entry/addressbusiness.model');
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

exports.getAnalystTrackerReport = (req,res)=>{
    console.log("In analyst Tracker Report...")	
    const workBook = new  ExcelJS.Workbook()
    console.log("Workbook constructed")	
    const sheet = workBook.addWorksheet('TL Pending')
    console.log("Sheet added")	
    sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Date of Birth","Father's Name","Contact Number","Component","Status","Initiation Date","TAT End Date","Verifier","FE","Vendor","Field 1","Field 2","Field 3","Field 4","Field 5","Field 6","Field 7","Field 8","Field 9","Field 10"])
    let query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED",$ne:"OUTPUTQC-ACCEPTED"}},{verificationAllocatedTo:req.user.user_id}]}

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
	

    let getRolesForTheUser = function(){
        return new Promise((resolve,reject)=>{
            UserRole
            .find({user:req.user.user_id},{_id:0,role:1})
            .then(data=>{
                console.log("roles are ",data);
                resolve(data);
            })
            .catch(err=>{
                reject()     
            })            
        })
    }  

    let getComponentsForRoles = function(roles){
        return new Promise((resolve,reject)=>{
            ComponentAccess
            .find({$or:roles})
            .populate({path:'component'})
            .then(data=>{
                let uniqueComponents = new Array()
                data.forEach(item=>{
                    let found = false;
                    for(let i = 0; i < uniqueComponents.length;i++){
                        if(item.component.toString() == uniqueComponents[i].component.toString()){
                            found = true
                            break
                        }
                    }
                    if(!found){
                        uniqueComponents.push(item)
                    }
                })
                resolve(uniqueComponents);
            })
            .catch(err=>{
                reject()     
            })            
        })
    }    
    let getEmploymentDetails = function(){
        return new Promise((resolve,reject)=>{
            employment
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
             
		data.forEach(item=>{
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
	           }		   
	           sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])		
		})
		resolve(data)    
            })
            .catch(err=>{
		console.log("Error in writing tl pending for employment",err)    
                reject()
            })
        })

    }
    let getEmpBasicDetails = function(){
        return new Promise((resolve,reject)=>{
            empbasic
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                   data.forEach(item=>{
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
                      }
			   
                       sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
                })
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    
    let getEmpAdvanceDetails = function(){
        return new Promise((resolve,reject)=>{
            empadvance
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
            .populate({path:'personalDetailsData'})		
            .then(data=>{
                data.forEach(async item=>{
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



                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    } 
    
    let getEducationDetails = function(){
	console.log("In education details of tl pending")    
        return new Promise((resolve,reject)=>{
            education
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
            .then(data=>{
	         console.log("go the education details.............................",data.length)	
		 data.forEach(async item=>{
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

			 
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })    

                resolve(data)
            })
            .catch(err=>{
		console.log("Error in tl pending education listing ",err)    
                reject()
            })
        })

    }     
    let getEducationAdvancedDetails = function(){
        return new Promise((resolve,reject)=>{
            educationadvanced
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'}) 	
	    .populate({path:'personalDtailsData'})	
            .then(data=>{
                 data.forEach(async item=>{
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

			 
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofuniverskty,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }     
    let getEducationComprehensiveDetails = function(){
        return new Promise((resolve,reject)=>{
            educationcomprehensive
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }     
    let getAddressDetails = function(){
        return new Promise((resolve,reject)=>{
            address
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                console.log("in address component for tl pending ",data.length)		
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact,contactNumber])
                })


                resolve(data)
            })
            .catch(err=>{
		console.log("Error in address component ",err)    
                reject()
            })
        })

    }         
    let getAddressComprehensiveDetails = function(){
        return new Promise((resolve,reject)=>{
            addresscomprehensive
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                console.log("In address comprehensive for tl pending ",data.length)
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.fulladdress,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })
    


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }             
    let getAddressOnlineDetails = function(){
        return new Promise((resolve,reject)=>{
            addressonline
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.fulladdwithpin,item.landmark,item.pin,item.city,item.typeofaddress,item.tenure,item.primarycontact,item.alternatecontact])
                })



                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                 
    let getAddressTelephoneDetails = function(){
        return new Promise((resolve,reject)=>{
            addresstelephone
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                 
    let getCourtRecordDetails = function(){
        return new Promise((resolve,reject)=>{
            courtrecord
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
            .populate({path:'personalDetailsData'})		
            .then(data=>{

                data.forEach(async item=>{
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
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.addresswithpin,item.pin,item.city,item.typeofaddress,item.tenure])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		console.log("Error in court record check for tl pending ",err)    
                reject()
            })
        })

    }                     
    let getCriminalRecordDetails = function(){
        return new Promise((resolve,reject)=>{
            criminalrecord
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.fulladdress,item.pin,item.city,item.typeofaddress,item.tenureofstay])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		console.log("Error in criminal check for tl pending",err)    
                reject()
            })
        })

    }                         
    let getReferenceDetails = function(){
        return new Promise((resolve,reject)=>{
            reference
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofreference,item.deisgnation,item.contactdetails])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                         
    let getRefBasicDetails = function(){
        return new Promise((resolve,reject)=>{
            refbasic
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

               data.forEach(async item=>{
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

		       
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.name,item.designation,item.contact])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                        
    
    let getIdentityDetails = function(){
        return new Promise((resolve,reject)=>{
            identity
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.typeofid,item.nameasperid,item.idnumber,item.issuedby])
                })

		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                            
    let getCreditCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            creditcheck
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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


                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.taxid,item.nameasperpan,item.dateofbirth,item.issuedby])
                })



                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                
    let getCreditTransDetails = function(){
        return new Promise((resolve,reject)=>{
            credittrans
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
               
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.pannumber,item.nameasperpan,item.dateofbirth,item.issuedby])
                })
    


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                
    let getCreditEquifaxDetails = function(){
        return new Promise((resolve,reject)=>{
            creditequifax
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.pannumber,item.panname,item.dobofpan,item.gender,item.fulladdress,item.contact,item.altcontact])
                })
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                    

    let getGlobaldatabaseDetails = function(){
        return new Promise((resolve,reject)=>{
            globaldatabase
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.searchname])
                })
 		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                        

    let getDrugTestFiveDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestfive
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
                })
 

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                                            
    let getDrugTestSixDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestsix
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                  
    
    let getDrugTestSevenDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestseven
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'}) 	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemploybee,item.fulladdress,item.pin,item.city,item.contactnumber])
                })

		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }                    
    let getDrugTestEightDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtesteight
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		   
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployee,item.address,item.pin,item.city,item.contact])
                })

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
    let getDrugTestNineDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestnine
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.consent,item.fulladdress,item.pin,item.city,item.contact])
                })
		    
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    

    let getDrugTestTenDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestten
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployee,item.address,item.pin,item.city,item.contact])
                })
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }        
    let getDlCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            dlcheck
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		
                data.forEach(async item=>{
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

			
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.dlnumber,item.nameperdl,item.dob,item.issuedate,item.dlvalid])
                })

		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }            
    let getDirectorshipCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            directorshipcheck
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
 
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.directorname,item.dinnumber,item.dob,item.verifiedon])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }            

    let getVoterIdDetails = function(){
        return new Promise((resolve,reject)=>{
            voterid
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                 data.forEach(async item=>{
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

			 
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.epicnumber,item.epicname,item.fulladdress,item.pin,item.city,item.contactnumber])
                })
   

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
    
    let getVddAdvanceDetails = function(){
        return new Promise((resolve,reject)=>{
            vddadvance
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.companyname,item.regdadd,item.cin,item.pan,item.gst])
                })
    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    
    let getBankStmtDetails = function(){
        return new Promise((resolve,reject)=>{
            bankstmt
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.tenure,item.nameofbank,item.transaction])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    
    let getSiteCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            sitecheck
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.name,item.fulladdress,item.pin,item.city])
                })
    

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    
    let getPsychometricDetails = function(){
        return new Promise((resolve,reject)=>{
            physostan
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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
                  
                   
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.name,item.emailid,item.contact,item.gender])
                })
    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }    

    let getSocialMediaDetails = function(){
        return new Promise((resolve,reject)=>{
            socialmedia
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.searchname])
                })
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }        

    let getFacisl3Details = function(){
        return new Promise((resolve,reject)=>{
            facisl3
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{

                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.applicantname,item.dateofbirth,item.stcode])
                })
    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }            
    let getOfacDetails = function(){
        return new Promise((resolve,reject)=>{
            ofac
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.candname,item.ofac])
                })
 

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }        

    let getGapVfnDetails = function(){
        return new Promise((resolve,reject)=>{
            gapvfn
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.tenureofgap,item.reasonforgap,item.address,item.PIN,item.CITY])
                })
    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }            
    let getPassportDetails = function(){
        return new Promise((resolve,reject)=>{
            passport
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                data.forEach(async item=>{
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

			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.givenname,item.lastname,item.issuecountry,item.nationality,item.passportnumber,item.expirydate])
                })
 

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }           
    let getAddressBusinessDetails = function(){
        return new Promise((resolve,reject)=>{
            addressbusiness
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(data=>{

                data.forEach(async item=>{
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
                   let componentDisplayName = "Address Check - Business"
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


                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })


                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

	let getUanDetails = function(){
        return new Promise((resolve,reject)=>{
            uan
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(data=>{
                data.forEach(async item=>{
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


                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,dateOfBirth,fathersName,contactNumber,componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.uan,item.candidatename,item.companyname,item.doj,item.doe])
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
        let userRoles = await getRolesForTheUser()
        console.log("Got roles");
        let componentsForUser = await getComponentsForRoles(userRoles)
        console.log("Got Components for user ",componentsForUser);
        // for each component get checks which are pending with details
        for(i=0; i < componentsForUser.length;i++){
            let item = componentsForUser[i]
            if(item.component.name == "employment"){
                let employmentDetails = await getEmploymentDetails()
		console.log("Added employment details")    
            }else if(item.component.name == "empbasic"){
                let empbasicDetails = await getEmpBasicDetails()
		console.log("Added empbasic details")    
            }else if(item.component.name == 'empadvance'){
                let empadvanceDetails = await getEmpAdvanceDetails()
		console.log("Added empadvance details")    
            }else if(item.component.name == 'education'){
                let educationDetails = await getEducationDetails()
            }else if(item.component.name == 'educationadvanced'){
                let educationAdvancedDetails = await getEducationAdvancedDetails()
            }else if(item.component.name == "educationcomprehensive"){
                let educationComprehensiveDetails = await getEducationComprehensiveDetails()
            }else if(item.component.name == 'address'){
                let addressDetails = await getAddressDetails()
            }else if(item.component.name == 'addresscomprehensive'){
                let addressComprehensiveDetails = await getAddressComprehensiveDetails()
            }else if(item.component.name == 'addressonline'){
                let addressOnlineDetails = await getAddressOnlineDetails()
            }else if(item.component.name == 'addresstelephone'){
                let addressTelephoneDetails = await getAddressTelephoneDetails()
            }else if(item.component.name == 'courtrecord'){
                let courtRecordDetails = await getCourtRecordDetails()
            }else if(item.component.name == 'criminalrecord'){
                let criminalRecordDetails = await getCriminalRecordDetails()
            }else if(item.component.name == 'reference'){
                let referenceRecordDetails = await getReferenceDetails()
            }else if(item.component.name == 'refbasic'){
                let refBasicDetails = await getRefBasicDetails()
            }else if(item.component.name == 'identity'){
                let identityDetails = await getIdentityDetails()
            }else if(item.component.name == 'creditcheck'){
                let creditCheckDetails = await getCreditCheckDetails()
            }else if(item.component.name == 'credittrans'){
                let credittransDetails = await getCreditTransDetails()
            }else if(item.component.name == 'creditequifax'){
                let creditEquifaxDetails = await getCreditEquifaxDetails()
            }else if(item.component.name == 'globaldatabase'){
                let globaldatabaseDetails = await getGlobaldatabaseDetails()
            }else if(item.component.name == 'drugtestfive'){
                let drugtestfiveDetails = await getDrugTestFiveDetails()
            }else if(item.component.name == 'drugtestsix'){
                let drugtestsixDetails = await getDrugTestSixDetails()
            }else if(item.component.name == 'drugtestseven'){
                let drugtestsevenDetails = await getDrugTestSevenDetails()
            }else if(item.component.name == 'drugtesteight'){
                let drugtesteightDetails = await getDrugTestEightDetails()
            }else if(item.component.name == 'drugtestnine'){
                let drugtestnineDetails = await getDrugTestNineDetails()
            }else if(item.component.name == 'drugtestten'){
                let drugtesttenDetails = await getDrugTestTenDetails()
            }else if(item.component.name == 'dlcheck'){
                let dlCheckDetails = await getDlCheckDetails()
            }else if(item.component.name == 'directorshipcheck'){
                let directorshipCheckDetails = await getDirectorshipCheckDetails()
            }else if(item.component.name == 'voterid'){
                let voterIdDetails = await getVoterIdDetails()
            }else if(item.component.name == 'vddadvance'){
                let vddAdvanceDetails = await getVddAdvanceDetails()
            }else if(item.component.name == 'bankstmt'){
                let dlBankStmtDetails = await getBankStmtDetails()
            }else if(item.component.name == 'sitecheck'){
                let siteCheckDetails = await getSiteCheckDetails()
            }else if(item.component.name == 'physostan'){
                let psychometricDetails = await getPsychometricDetails()
            }else if(item.component.name == 'socialmedia'){
                let socialmediaCheckDetails = await getSocialMediaDetails()
            }else if(item.component.name == 'facisl3'){
                let facisl3Details = await getFacisl3Details()
            }else if(item.component.name == 'ofac'){
                let ofacDetails = await getOfacDetails()
 	    }else if(item.component.name == 'addressbusiness'){
                let addressBusinessDetails = await getAddressBusinessDetails()
            }else if(item.component.name == 'gapvfn'){
                let gapvfnDetails = await getGapVfnDetails()
            }else if(item.component.name == 'passport'){
                let passportDetails = await getPassportDetails()
            }else if(item.component.name == 'uan'){
                let uanDetails = await getUanDetails()
            }		

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
        return workBook.xlsx.write(res)
        .then(function(){
            res.status(200).end()
        })    
//        res.json({message:"Successful"})
    }

 }
