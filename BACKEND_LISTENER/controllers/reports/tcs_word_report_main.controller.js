const { Worker } = require('worker_threads')
const fs =require('fs');
const moment = require('moment');
const path = require('path');
const ColorMaster = require('../../models/administration/color_master.model')
const ClientContractPackage = require('../../models/administration/client_contract_package.model')
const ClientContractProfile = require('../../models/administration/client_contract_profile.model')
const Case = require('../../models/uploads/case.model');
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const User = require('../../models/administration/user.model')
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
const pdf2img = require('pdf2img');
const isPDF = require('is-pdf-valid')

exports.tcsWordReport = (req,res)=>{
 let colorMasterDetails = new Array()
 let profileName = ""
 let execSumAddressDet = new Array()
 let execSumCourtRecordDet = new Array()
 let execSumCriminalRecordDet = new Array()	
 let execSumEduDet = new Array()
 let execSumEmpDet = new Array()
 let execSumReferenceDet = new Array()
 let execSumGlobalDatabaseDet = new Array()
 let execSumIdentityDet = new Array()	
 let execSumBankStmtDet = new Array()
 let execSumSocialMediaDet = new Array()
 let execSumDrugTestDet = new Array()
 let allJpegs = new Array()	
 	

 let execSumDet = new Array() 	
 let getColorMaster = function(){
   return new Promise((resolve,reject)=>{
      ColorMaster
      .find()
      .lean()	   
      .then(data=>{
	colorMasterDetails = data      
	resolve(data)      
      })
      .catch(err=>{
	reject()      
      })	   
   })	 
 }	 
 let getCamEmailId = function(camCode){
   return new Promise((resolve,reject)=>{
      User
      .findOne({_id:camCode})
      .lean()	   
      .then(data=>{
	 if(data != null){
	    resolve(data.userId)     
         }else{
	    reject(null)	 
	 }	 
      })	   
     .catch(err=>{
	 reject(null)    
     }) 	   
   })	 
 }	
 let getCaseDetails = function(){
    return new Promise((resolve,reject)=>{	 
       Case
       .findOne({caseId:req.params.caseId})
       .lean()	    
       .populate({path:'subclient',populate:{path:'client',populate:{path:'cam'}}})	    
       .then(data=>{
          resolve(data)     	 
       })
       .catch(err=>{
          reject()	    
      })
   }) 	    
 }	 

 let getPersonalDetailsFromDb = function(acase){
    return new Promise((resolve,reject)=>{
      PersonalDetailsData
      .findOne({case:acase})
      .lean()	    
      .then(data=>{
	 resolve(data)     
      })
      .catch(err=>{
	 reject()     
      })	    
    })	    
 }	
 function getPackageDetails(packageCode){
       ClientContractPackage
       .findOne({_id:packageCode})
       .lean()	 
       .then(data=>{
	 return data.name       
       })	    
       .catch(err=>{
	 return null      
       })	    
	 
 }	
function getProfileDetails(profileCode){
          console.log("Profile to find is ..................",profileCode)	 
          ClientContractProfile
          .findOne({_id:profileCode})
	  .lean()     
          .then(data=>{
	     console.log("Found profile and returning name ",data.name)     
	     return data.name
          })	    
          .catch(err=>{
	     return null
          })	 
 }	

 let getEmploymentDetails = function(acase){
        console.log("Trying to fetch employment details for case status report for the case ")
        return new Promise((resolve,reject)=>{
            employment
            .find({case:acase})
	    .lean()	
	    .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
		for(let i=0; i < data.length;i++){
	          let item = data[i]		
                  let det  = ({
		     checkName:"Employment",
		     checkType:item.empstatus,
		     briefDetails:item.nameofemployer,
		     grade:item.grade	  
		  })
//   		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/employment/" + item._id + "/proofofwork",req.user.user_id)
//		  await new Promise(resolve => setTimeout(resolve, 10000));	
		  execSumDet.push(det)	
	          execSumEmpDet.push(det)		
		}    

                resolve(data)
            })
            .catch(err=>{
                console.log("Error in writing tl pending for employment",err)
                reject()
            })
        })

    }


    let getEmpBasicDetails = function(acase){
        return new Promise((resolve,reject)=>{
            empbasic
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Employment",
                     checkType:item.empstatus,
                     briefDetails:item.nameofemployer,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/empbasic/" + item._id + "/proofofwork",req.user.user_id)		       
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  execSumDet.push(det)   
                  execSumEmpDet.pus(det)
                }
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }


   let getEmpAdvanceDetails = function(acase){
        return new Promise((resolve,reject)=>{
            empadvance
            .find({case:acase})
            .lean()		
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Employment",
                     checkType:item.empstatus,
                     briefDetails:item.nameofemployer,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/empadvance/" + item._id + "/proofofwork",req.user.user_id)     
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
                  execSumEmpDet.push(det)		       
                }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }


   let getEducationDetails = function(acase){
        console.log("In education details of tl pending")
        return new Promise((resolve,reject)=>{
            education
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Education",
                     checkType:"",
                     briefDetails:item.nameofuniversity,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/education/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
                  execSumEduDet.push(det)
                }
                resolve(data)
            })
            .catch(err=>{
                console.log("Error in tl pending education listing ",err)
                reject()
            })
        })

   }


   let getEducationAdvancedDetails = function(acase){
        return new Promise((resolve,reject)=>{
            educationadvanced
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDtailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Education",
                     checkType:"",
                     briefDetails:item.nameofuniverskty,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/educationadvanced/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
		  execSumEduDet.push(det)     
                }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

    let getEducationComprehensiveDetails = function(acase){
        return new Promise((resolve,reject)=>{
            educationcomprehensive
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Education",
                     checkType:"",
                     briefDetails:item.nameofuniversity,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/educationcomprehensive/" + item._id + "/proofofwork",req.user.user_id)    
//                  await new Promise(resolve => setTimeout(resolve, 10000));
                  execSumDet.push(det)
		  execSumEduDet.push(det)     
                }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

    let getAddressDetails = function(acase){
        return new Promise((resolve,reject)=>{
            address
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Address",
                     checkType:item.typeofaddress,
                     briefDetails:item.address,
                     grade:item.grade
                  })
		  console.log("Sending for creating the jpgs of address")     
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/address/" + item._id + "/proofofwork",req.user.user_id)     
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
		  execSumAddressDet.push(det)     
                }
		    
                resolve(data)
            })
            .catch(err=>{
                console.log("Error in address component ",err)
                reject()
            })
        })

   }


      let getAddressComprehensiveDetails = function(acase){
        return new Promise((resolve,reject)=>{
            addresscomprehensive
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0;i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Address",
                     checkType:item.typeofaddress,
                     briefDetails:item.fulladdress,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/addresscomprehensive/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
		  execSumAddressDet.push(det)     
                }

                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }


     let getAddressOnlineDetails = function(acase){
        return new Promise((resolve,reject)=>{
            addressonline
            .find({case:acase})
	    .lean() 	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Address",
                     checkType:item.typeofaddress,
                     briefDetails:item.fulladdwithpin,
                     grade:item.grade
                  })
		  console.log("Trying to convert address online pdfs.........")     
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/addressonline/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
		  execSumAddressDet.push(det)     
                }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
            

    let getAddressTelephoneDetails = function(acase){
        return new Promise((resolve,reject)=>{
            addresstelephone
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Address",
                     checkType:item.typeofaddress,
                     briefDetails:item.address,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/addesstelephone/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
		  execSumAddressDet.push(det)     
                }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	

 let getCourtRecordDetails = function(acase){
        return new Promise((resolve,reject)=>{
            courtrecord
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Court Record",
                     checkType:item.typeofaddress,
                     briefDetails:item.addresswithpin,
                     grade:item.grade
                  })
//          	  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/courtrecord/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
		  execSumCourtRecordDet.push(det)     
                }
		    
                resolve(data)
            })
            .catch(err=>{
                console.log("Error in court record check for tl pending ",err)
                reject()
            })
        })

    }

     let getCriminalRecordDetails = function(acase){
        return new Promise((resolve,reject)=>{
            criminalrecord
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		 let item = data[i]    
                  let det = ({
                     checkName:"Criminal Record",
                     checkType:item.typeofaddress,
                     briefDetails:item.fulladdress,
                     grade:item.grade
                  })
                  execSumDet.push(det)
                  execSumCriminalRecordDet.push(det)		       
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/criminalrecord/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));
     
                }
	    
                resolve(data)
            })
            .catch(err=>{
                console.log("Error in criminal check for tl pending",err)
                reject()
            })
        })

    }
	
     let getReferenceDetails = function(acase){
        return new Promise((resolve,reject)=>{
            reference
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i  < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Reference",
                     checkType:"",
                     briefDetails:item.nameofreference,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/reference/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
//     		  execSumDet.push(det)
		  execSumReferenceDet.push(det)
	       }	    
               resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	
     let getRefBasicDetails = function(acase){
        return new Promise((resolve,reject)=>{
            refbasic
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Reference",
                     checkType:"",
                     briefDetails:item.name,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/refbasic/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
    
    let getIdentityDetails = function(acase){
        return new Promise((resolve,reject)=>{
            identity
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Identity Check",
                     checkType:"",
                     briefDetails:item.typeofid,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/identity/" + item._id + "/proofofwork",req.user.user_id)    
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
//                  execSumDet.push(det)
		    execSumIdentityDet.push(det)   
               }
		    
                resolve(data)
            })
            .catch(err=>{
               reject()
		    
            })
        })

    }

    let getCreditCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            creditcheck
            .find({case:acase})
	    .lean() 	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Credit Check",
                     checkType:"",
                     briefDetails:item.nameasperpan,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/creditcheck/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }	


    let getCreditTransDetails = function(acase){
        return new Promise((resolve,reject)=>{
            credittrans
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Credit Check",
                     checkType:"",
                     briefDetails:item.nameasperpan,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/credittrans/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

    let getCreditEquifaxDetails = function(acase){
        return new Promise((resolve,reject)=>{
            creditequifax
            .find({case:acase})
	    .lean() 	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]      
                  let det = ({
                     checkName:"Credit Check",
                     checkType:"",
                     briefDetails:item.panname,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/creditequifax/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	
    let getGlobaldatabaseDetails = function(acase){
        return new Promise((resolve,reject)=>{
            globaldatabase
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0;i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Global Database",
                     checkType:"",
                     briefDetails:item.searchname,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/globaldatabase/" + item._id + "/proofofwork",req.user.user_id)     
//		   await new Promise(resolve => setTimeout(resolve, 10000));     
//                  execSumDet.push(det)
                  execSumGlobalDatabaseDet.push(det)		       
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })
     }
	

    let getDrugTestFiveDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestfive
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Drug Test - 5 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestfive/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

    let getDrugTestSixDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestsix
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0;i < data.length;i++){
		  let item = data[i]      
                  let det = ({
                     checkName:"Drug Test - 6 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
//		  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestsix/" + item._id + "/proofofwork",req.user.user_id)     
//		  await new Promise(resolve => setTimeout(resolve, 10000));     
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

    let getDrugTestSevenDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestseven
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
                  let det = ({
                     checkName:"Drug Test - 7 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestseven/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));

                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }


    let getDrugTestEightDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtesteight
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Drug Test - 8 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtesteight/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));
		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

    let getDrugTestNineDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestnine
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Drug Test - 9 Panel",
                     checkType:"",
                     briefDetails:"",
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestnine/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));
		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

    let getDrugTestTenDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestten
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Drug Test - 10 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestten/" + item._id + "/proofofwork"),req.user.user_id
//                  await new Promise(resolve => setTimeout(resolve, 10000));
		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	
    let getDlCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            dlcheck
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"DL Check",
                     checkType:"",
                     briefDetails:item.dlnumber,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/dlcheck/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));
		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	
    let getDirectorshipCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            directorshipcheck
            .find({case:acase})
            .lean()		
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Directorship Check",
                     checkType:"",
                     briefDetails:item.dinnumber,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/directorshipcheck/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	

    let getVoterIdDetails = function(acase){
	console.log("in voter id details")    
        return new Promise((resolve,reject)=>{
            voterid
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
	       console.log("Voter  id data is ",data)	    
               for(let i=0;i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Voter Id Details",
                     checkType:"",
                     briefDetails:item.epicnumber,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/voterid/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));
                  execSumDet.push(det)
               }
	       resolve(data)	    
            })
            .catch(err=>{
		console.log("Error in reading voter id details ",err)    
                reject()
            })
        })

    }

        let getVddAdvanceDetails = function(acase){
        return new Promise((resolve,reject)=>{
            vddadvance
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Vendor Due Deiligence",
                     checkType:"",
                     briefDetails:item.companyname,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/vddadvance/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }

    let getBankStmtDetails = function(acase){
        return new Promise((resolve,reject)=>{
            bankstmt
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Bank Statement",
                     checkType:"",
                     briefDetails:item.nameofbank,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/vddadvance/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));
		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	
    let getSiteCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            sitecheck
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Site Check",
                     checkType:"",
                     briefDetails:item.name,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/sitecheck/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
	    
                reject()
            })
        })

    }
    let getPsychometricDetails = function(acase){
        return new Promise((resolve,reject)=>{
            physostan
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Psychometric Check",
                     checkType:"",
                     briefDetails:item.name,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/physostan/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
               }
		    
		resolve(data)    
	     })	    
            .catch(err=>{
                reject()
            })
        })
		
    }

    let getSocialMediaDetails = function(acase){
        return new Promise((resolve,reject)=>{
            console.log('In Social Media')		
            socialmedia
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  console.log('Social Media size is ',data.length)    
		  let item = data[i]     
                  let det = ({
                     checkName:"Social Media",
                     checkType:"",
                     briefDetails:item.searchname,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/socialmedia/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumSocialMediaDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
		console.log('Error in social media detailsis ',err)    
                reject()
            })
        })
    }

    let getFacisl3Details = function(acase){
        return new Promise((resolve,reject)=>{
            facisl3
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Facis L3",
                     checkType:"",
                     briefDetails:item.applicantname,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/facisl3/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
	})
    }

    let getOfacDetails = function(acase){
        return new Promise((resolve,reject)=>{
            ofac
            .find({case:acase})
            .lean()		
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"OFAC",
                     checkType:"",
                     briefDetails:item.candname,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/ofac/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
		
    let getGapVfnDetails = function(acase){
        return new Promise((resolve,reject)=>{
            gapvfn
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Gap",
                     checkType:"",
                     briefDetails:item.address,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/gapvfn/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
		
    let getPassportDetails = function(acase){
        return new Promise((resolve,reject)=>{
            passport
            .find({case:acase})
	    .lean()	
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Passport",
                     checkType:"",
                     briefDetails:item.passportnumber,
                     grade:item.grade
                  })
//                  createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/passport/" + item._id + "/proofofwork",req.user.user_id)
//                  await new Promise(resolve => setTimeout(resolve, 10000));		       
                  execSumDet.push(det)
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
    let writeWordDocument = function(addressDetails,addressComprehensiveDetails,addressOnlineDetails,addressTelephoneDetails,courtRecordDetails,criminalRecordDetails,educationDetails,educationAdvancedDetails,educationComprehensiveDetails,employmentDetails,empbasicDetails,empadvanceDetails,referenceRecordDetails,refBasicDetails,identityDetails,creditCheckDetails,credittransDetails,creditEquifaxDetails,globaldatabaseDetails,drugtestfiveDetails,drugtestsixDetails,drugtestsevenDetails,drugtesteightDetails,drugtestnineDetails,drugtesttenDetails,dlCheckDetails,directorshipCheckDetails,voterIdDetails,vddAdvanceDetails,bankStmtDetails,siteCheckDetails,psychometricDetails,socialMediaDetails,facisl3Details,ofacDetails,gapvfnDetails,passportDetails,colorMasterDetails,camEmailId,caseDetails,personalDetailsFromDb,profileDetails,packageDetails,execSumAddressDet,execSumCourtRecordDet,execSumCriminalRecordDet,execSumEduDet,execSumEmpDet,execSumReferenceDet,execSumGlobalDatabaseDet,execSumIdentityDet,execSumBankStmtDet,execSumSocialMediaDet,execSumDrugTestDet){
        return new Promise((resolve,reject)=>{
           let worker = new Worker('./controllers/reports/write_tcs_word_report.js',{workerData:{addressDetails:addressDetails,addressComprehensiveDetails:addressComprehensiveDetails,addressOnlineDetails:addressOnlineDetails,addressTelephoneDetails:addressTelephoneDetails,courtRecordDetails:courtRecordDetails,criminalRecordDetails:criminalRecordDetails,educationDetails:educationDetails,educationAdvancedDetails:educationAdvancedDetails,educationComprehensiveDetails:educationComprehensiveDetails,employmentDetails:employmentDetails,empbasicDetails:empbasicDetails,empadvanceDetails:empadvanceDetails,referenceRecordDetails:referenceRecordDetails,refBasicDetails:refBasicDetails,identityDetails:identityDetails,creditCheckDetails:creditCheckDetails,credittransDetails:credittransDetails,creditEquifaxDetails:creditEquifaxDetails,globaldatabaseDetails:globaldatabaseDetails,drugtestfiveDetails:drugtestfiveDetails,drugtestsixDetails:drugtestsixDetails,drugtestsevenDetails:drugtestsevenDetails,drugtesteightDetails:drugtesteightDetails,drugtestnineDetails:drugtestnineDetails,drugtesttenDetails:drugtesttenDetails,dlCheckDetails:dlCheckDetails,directorshipCheckDetails:directorshipCheckDetails,voterIdDetails:voterIdDetails,vddAdvanceDetails:vddAdvanceDetails,bankStmtDetails:bankStmtDetails,siteCheckDetails:siteCheckDetails,socialMediaDetails:socialMediaDetails,psychometricDetails:psychometricDetails,facisl3Details:facisl3Details,ofacDetails:ofacDetails,gapvfnDetails:gapvfnDetails,passportDetails:passportDetails,colorMasterDetails:colorMasterDetails,camEmailId:camEmailId,caseDetails:caseDetails,personalDetailsFromDb:personalDetailsFromDb,profileName:profileDetails,packageName:packageDetails,execSumAddressDet:execSumAddressDet,execSumCourtRecordDet:execSumCourtRecordDet,execSumCriminalRecordDet:execSumCriminalRecordDet,execSumEduDet:execSumEduDet,execSumEmpDet:execSumEmpDet,execSumReferenceDet:execSumReferenceDet,execSumGlobalDatabaseDet:execSumGlobalDatabaseDet,execSumIdentityDet:execSumIdentityDet,execSumBankStmtDet:execSumBankStmtDet,execSumSocialMediaDet:execSumSocialMediaDet,execSumDrugTestDet:execSumDrugTestDet}})

        worker.on("message",resolve)

        })

    }
    prepareReport()
    async function prepareReport(){	
        let caseDetails = await getCaseDetails()
        let colorMasterDetails = await getColorMaster()
        let camEmailId = "defaultmail"
        if(caseDetails.subclient.cam != null){
           camEmailId = await getCamEmailId(caseDetails.subclient.cam)
        }
        let personalDetailsFromDb = await getPersonalDetailsFromDb(caseDetails._id)
        let addressDetails = await getAddressDetails(caseDetails._id)
        let addressComprehensiveDetails = await getAddressComprehensiveDetails(caseDetails._id)
        let addressOnlineDetails = await getAddressOnlineDetails(caseDetails._id)
        let addressTelephoneDetails = await getAddressTelephoneDetails(caseDetails._id)
        let courtRecordDetails = await getCourtRecordDetails(caseDetails._id)
        let criminalRecordDetails = await getCriminalRecordDetails(caseDetails._id)
        let educationDetails = await getEducationDetails(caseDetails._id)
        let educationAdvancedDetails = await getEducationAdvancedDetails(caseDetails._id)
        let educationComprehensiveDetails = await getEducationComprehensiveDetails(caseDetails._id)
        let employmentDetails = await getEmploymentDetails(caseDetails._id)
        let empbasicDetails = await getEmpBasicDetails(caseDetails._id)
        let empadvanceDetails = await getEmpAdvanceDetails(caseDetails._id)
        let referenceRecordDetails = await getReferenceDetails(caseDetails._id)
        let refBasicDetails = await getRefBasicDetails(caseDetails._id)
        let identityDetails = await getIdentityDetails(caseDetails._id)
        let creditCheckDetails = await getCreditCheckDetails(caseDetails._id)
        let credittransDetails = await getCreditTransDetails(caseDetails._id)
        let creditEquifaxDetails = await getCreditEquifaxDetails(caseDetails._id)
        let globaldatabaseDetails = await getGlobaldatabaseDetails(caseDetails._id)
        let drugtestfiveDetails = await getDrugTestFiveDetails(caseDetails._id)
        let drugtestsixDetails = await getDrugTestSixDetails(caseDetails._id)
        let drugtestsevenDetails = await getDrugTestSevenDetails(caseDetails._id)
        let drugtesteightDetails = await getDrugTestEightDetails(caseDetails._id)
        let drugtestnineDetails = await getDrugTestNineDetails(caseDetails._id)
        let drugtesttenDetails = await getDrugTestTenDetails(caseDetails._id)
        let dlCheckDetails = await getDlCheckDetails(caseDetails._id)
        let directorshipCheckDetails = await getDirectorshipCheckDetails(caseDetails._id)
        let voterIdDetails = await getVoterIdDetails(caseDetails._id)
        let vddAdvanceDetails = await getVddAdvanceDetails(caseDetails._id)
        let bankStmtDetails = await getBankStmtDetails(caseDetails._id)
        let siteCheckDetails = await getSiteCheckDetails(caseDetails._id)
        let psychometricDetails = await getPsychometricDetails(caseDetails._id)
        let socialMediaDetails = await getSocialMediaDetails(caseDetails._id)
        let facisl3Details = await getFacisl3Details(caseDetails._id)
        let ofacDetails = await getOfacDetails(caseDetails._id)
        let gapvfnDetails = await getGapVfnDetails(caseDetails._id)
        let passportDetails = await getPassportDetails(caseDetails._id)
        let result = await writeWordDocument(addressDetails,addressComprehensiveDetails,addressOnlineDetails,addressTelephoneDetails,courtRecordDetails,criminalRecordDetails,educationDetails,educationAdvancedDetails,educationComprehensiveDetails,employmentDetails,empbasicDetails,empadvanceDetails,referenceRecordDetails,refBasicDetails,identityDetails,creditCheckDetails,credittransDetails,creditEquifaxDetails,globaldatabaseDetails,drugtestfiveDetails,drugtestsixDetails,drugtestsevenDetails,drugtesteightDetails,drugtestnineDetails,drugtesttenDetails,dlCheckDetails,directorshipCheckDetails,voterIdDetails,vddAdvanceDetails,bankStmtDetails,siteCheckDetails,psychometricDetails,socialMediaDetails,facisl3Details,ofacDetails,gapvfnDetails,passportDetails,colorMasterDetails,camEmailId,caseDetails,personalDetailsFromDb,getProfileDetails(caseDetails.profile),getPackageDetails(caseDetails.package),execSumAddressDet,execSumCourtRecordDet,execSumCriminalRecordDet,execSumEduDet,execSumEmpDet,execSumReferenceDet,execSumGlobalDatabaseDet,execSumIdentityDet,execSumBankStmtDet,execSumSocialMediaDet,execSumDrugTestDet);	    

        console.log("Created Doc")
//        docx.Packer.toBuffer(doc).then(data=>{
//            fs.writeFileSync(`/REPO_STORAGE/tmp/${caseDetails.caseId}.docx`,data)      
//            console.log("File Written ---now will delete the jpegs")		
//	    console.log("Now downloading the file")
	    res.download(`/REPO_STORAGE/tmp/${caseDetails.caseId}.docx`,(err)=>{
		if(err){
		  console.log("Error Downloading ",err)	
	          res.status(500).send({
		      message:"Could not download  the file"	  
		  })      		
		}	
	    })
//        })
//        .catch(err=>{
//            res.status(500).json({
//                message:"Error"
//            })
//        })        
        
    

    }

    
}

