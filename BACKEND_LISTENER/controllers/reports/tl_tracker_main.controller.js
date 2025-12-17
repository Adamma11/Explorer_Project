const { Worker } = require('worker_threads')
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
const mongoose = require('mongoose')

console.log("Got the data from tl tracker main.......will start the report now")

exports.getTLTrackerReport = (req,res)=>{
    let query = ""
    if(req.query.reportType=='PENDING'){
      query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"}}]}	    
    }	
    if(req.query.reportType == 'COMPLETED'){
      query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}}]} 	    
    }
    console.log("Query being applied is ",query)	
    let getRolesForTheUser = function(){
        return new Promise((resolve,reject)=>{
	    console.log("User Role is ",UserRole)	
            UserRole
            .find({user:req.user.user_id},{_id:0,role:1})
            .then(data=>{
                console.log("roles are ",data);
                resolve(data);
            })
            .catch(err=>{
		console.log("Error getting roles  for the  user",err)    
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
                        if(item.component._id.toString() == uniqueComponents[i]._id.toString()){
                            found = true
                            break
                        }
                    }
                    if(!found){
			console.log("Not found and hence adding")    
                        uniqueComponents.push(item.component._id)
                    }
                })
                resolve(uniqueComponents);
            })
            .catch(err=>{
                reject()     
            })            
        })
    }    
    let getGradingColor = function (color){
	return new Promise((resolve,reject)=>{
        if(color==null || color==""){
           reject(null)		
	}else{		
	  ColorMaster
          .findOne({_id:color})
          .then(data=>{
	     resolve(data.name)	  
	  })
	  .catch(err=>{
             console.log("Grading color err",err)		  
	     reject(null)	  
	  })
	}	
	})    
    }	
    let getEmploymentDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            employment
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
	    .populate({path:'mentorReviewCompletedBy'})	
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
		resolve(data)    
            })
            .catch(err=>{
                console.log("Error Writing tl pending ",err)		    
                resolve(true)
            })
        })

    }
    let getEmpBasicDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            empbasic
            .find(query)
	    .lean() 	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
	    .populate({path:'mentorReviewCompletedBy'})	
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }    
    let getEmpAdvanceDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            empadvance
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
            .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    } 
    
    let getEducationDetails = function(componentsForUser){
	console.log("In education details of tl pending")   
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            education
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		console.log("Error in tl pending education listing ",err)    
		 console.log("Error Writing tl pending ",err)
                resolve(true)
            })
        })

    }     
    let getEducationAdvancedDetails = function(componentsForUser){
	console.log("In Education Advanced Details")   
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            educationadvanced
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'}) 	
	    .populate({path:'personalDtailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		console.log("Error Writing tl pending ",err)		
                resolve(true)
            })
        })

    }     
    let getEducationComprehensiveDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            educationcomprehensive
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompetedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
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
    let getAddressDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            address
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		console.log("Error in address details ",err)    
                resolve(true)
            })
        })

    }         
    let getAddressComprehensiveDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            addresscomprehensive
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
		console.log("About to return address data")    
                resolve(data)
            })
            .catch(err=>{
		console.log('Error in address data',err)    
                resolve(true)
            })
        })

    }             
    let getAddressOnlineDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            addressonline
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject(true)
            })
        })

    }                 
    let getAddressTelephoneDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            addresstelephone
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
	         console.log("Error Writing tl pending ",err)	    
                resolve(true)
            })
        })

    }                 
    let getCourtRecordDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            courtrecord
            .find(query)
            .lean()		
	    .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})	
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
            .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
		console.log("Error in court record check for tl pending ",err)    
                resolve(true)
            })
        })

    }                     
    let getCriminalRecordDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            criminalrecord
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
		console.log("Error in criminal check for tl pending",err)    
                resolve(true)
            })
        })

    }                         
    let getReferenceDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
	    console.log("about to read reference for tl tracker ########################")	
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            reference
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompetedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
		console.log("Reference data size in the main is #################################################### ",data.length)    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error reading reference daata")   
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                         
    let getRefBasicDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            refbasic
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                        
    
    let getIdentityDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            identity
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                            
    let getCreditCheckDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            creditcheck
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedby'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                                
    let getCreditTransDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            credittrans
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                                
    let getCreditEquifaxDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            creditequifax
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                                    

    let getGlobaldatabaseDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            globaldatabase
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                                        

    let getDrugTestFiveDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            drugtestfive
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                                            
    let getDrugTestSixDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            drugtestsix
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                  
    
    let getDrugTestSevenDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            drugtestseven
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'}) 	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }                    
    let getDrugTestEightDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            drugtesteight
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }
    let getDrugTestNineDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            drugtestnine
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }    

    let getDrugTestTenDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            drugtestten
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }        
    let getDlCheckDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            dlcheck
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }            
    let getDirectorshipCheckDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            directorshipcheck
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }            

    let getVoterIdDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            voterid
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }
    
    let getVddAdvanceDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            vddadvance
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }    
    let getBankStmtDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            bankstmt
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }    
    let getSiteCheckDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            sitecheck
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }    
    let getPsychometricDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            physostan
            .find(query)
	    .lean()  	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})
            .populate({path:'component'})		
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }    

    let getSocialMediaDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            socialmedia
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }        

    let getFacisl3Details = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            facisl3
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }            
    let getOfacDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            ofac
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }        

    let getGapVfnDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            gapvfn
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
	    .populate({path:'case',populate:{path:'client'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }            
    let getPassportDetails = function(componentsForUser){
        return new Promise((resolve,reject)=>{
            if(req.query.reportType=='PENDING'){
              query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"},component:{$in:componentsForUser}}]}
            }
            if(req.query.reportType == 'COMPLETED'){
              query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}},{component:{$in:componentsForUser}}]}
            }
		
            passport
            .find(query)
	    .lean()	
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
	    .populate({path:'grade1'})	
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                resolve(true)
            })
        })

    }               
    console.log("About to call prepare Report")
    let writeTracker = function(employmentDetails,empBasicDetails,empAdvanceDetails,
	                        educationDetails,educationAdvancedDetails,educationComprehensiveDetails,
                                addressDetails,addressComprehensiveDetails,addressOnlineDetails,addressTelephoneDetails,courtRecordDetails,criminalRecordDetails,referenceDetails,refBasicDetails,identityDetails,creditCheckDetails,creditTransDetails,creditEquifaxDetails,globalDatabaseDetails,drugTestFiveDetails,drugTestSixDetails,drugTestSevenDetails,drugTestEightDetails,drugTestNineDetails,drugTestTenDetails,dlCheckDetails,directorshipCheckDetails,voterIdDetails,vddAdvancedDetails,bankStmtDetails,siteCheckDetails,psychometricDetails,socialMediaCheckDetails,facisL3Details,ofacDetails,gapvfnDetails,passportDetails){
       return new Promise((resolve,reject)=>{
          let worker = new Worker(
              './controllers/reports/write_tl_tracker_new.js',{workerData:{empDetails:employmentDetails,empBasicDetails:empBasicDetails,empAdvanceDetails:empAdvanceDetails,                                                                       educationDetails:educationDetails,educationAdvancedDetails:educationAdvancedDetails,educationComprehensiveDetails:educationComprehensiveDetails,addressDetails:addressDetails,addressComprehensiveDetails:addressComprehensiveDetails,addressOnlineDetails:addressOnlineDetails,addressTelephoneDetails:addressTelephoneDetails,courtRecordDetails:courtRecordDetails,criminalRecordDetails:criminalRecordDetails,referenceDetails:referenceDetails,refBasicDetails:refBasicDetails,identityDetails:identityDetails,creditCheckDetails:creditCheckDetails,creditTransDetails:creditTransDetails,creditEquifaxDetails:creditEquifaxDetails,globalDatabaseDetails:globalDatabaseDetails,drugTestFiveDetails:drugTestFiveDetails,drugTestSixDetails:drugTestSixDetails,drugTestSevenDetails:drugTestSevenDetails,drugTestEightDetails:drugTestEightDetails,drugTestNineDetails:drugTestNineDetails,drugTestTenDetails:drugTestTenDetails,dlCheckDetails:dlCheckDetails,directorshipCheckDetails:directorshipCheckDetails,voterIdDetails:voterIdDetails,vddAdvancedDetails:vddAdvancedDetails,bankStmtDetails:bankStmtDetails,siteCheckDetails:siteCheckDetails,psychometricDetails:psychometricDetails,socialMediaCheckDetails:socialMediaCheckDetails,facisL3Details:facisL3Details,ofacDetails:ofacDetails,gapvfnDetails:gapvfnDetails,passportDetails:passportDetails,userId:req.user.user_id}});
          worker.on("message",resolve)     
       })	    
    }
    prepareReport()
    async function prepareReport(){
	try{
        let userRoles = await getRolesForTheUser()
        let componentsForUser = await getComponentsForRoles(userRoles)
	let employmentDetails  = new Array()
	let empBasicDetails  = new Array()
        let empAdvanceDetails = new Array()	
	let educationDetails = new Array()
	let educationAdvancedDetails = new Array()	
	let educationComprehensiveDetails = new Array()	
	let addressDetails = new Array()	
	let addressComprehensiveDetails = new Array()	
	let addressOnlineDetails = new Array()	
	let addressTelephoneDetails = new Array() 
	let courtRecordDetails = new Array()
	let criminalRecordDetails = new Array()
	let referenceDetails = new Array()
        let refBasicDetails = new Array()
	let identityDetails  = new Array()
	let creditCheckDetails = new Array()
        let creditTransDetails = new Array()
	let creditEquifaxDetails = new Array()
	let globalDatabaseDetails = new Array()
	let drugTestFiveDetails = new Array()	
	let drugTestSixDetails  = new Array()
	let drugTestSevenDetails = new Array()
	let drugTestEightDetails = new Array()
	let drugTestNineDetails = new Array()
	let drugTestTenDetails = new Array()
        let dlCheckDetails = new Array()
	let directorshipCheckDetails = new Array()	
	let voterIdDetails = new Array()
	let vddAdvancedDetails = new Array()	
	let bankStmtDetails = new Array()
	let siteCheckDetails = new Array()
	let psychometricDetails = new Array()
	let socialMediaCheckDetails = new Array()	
	let facisL3Details = new Array()
	let ofacDetails = new Array()
	let gapvfnDetails = new Array()
	let passportDetails = new Array()
        console.log("Components for user ",componentsForUser)		
//        for(i=0; i < componentsForUser.length;i++){
//            let item = componentsForUser[i]
//            if(item.component.name == "employment"){
                employmentDetails = await getEmploymentDetails(componentsForUser)
//            }else if(item.component.name == "empbasic"){
                empBasicDetails = await getEmpBasicDetails(componentsForUser)
//            }else if(item.component.name == 'empadvance'){
                empAdvanceDetails = await getEmpAdvanceDetails(componentsForUser)
//            }else if(item.component.name == 'education'){
                educationDetails = await getEducationDetails(componentsForUser)
//            }else if(item.component.name == 'educationadvanced'){
                educationAdvancedDetails = await getEducationAdvancedDetails(componentsForUser)
//            }else if(item.component.name == "educationcomprehensive"){
                educationComprehensiveDetails = await getEducationComprehensiveDetails(componentsForUser)
//            }else if(item.component.name == 'address'){
                addressDetails = await getAddressDetails(componentsForUser)
//            }else if(item.component.name == 'addresscomprehensive'){
                addressComprehensiveDetails = await getAddressComprehensiveDetails(componentsForUser)
//            }else if(item.component.name == 'addressonline'){
                addressOnlineDetails = await getAddressOnlineDetails(componentsForUser)
//            }else if(item.component.name == 'addresstelephone'){
                addressTelephoneDetails = await getAddressTelephoneDetails(componentsForUser)
//            }else if(item.component.name == 'courtrecord'){
                courtRecordDetails = await getCourtRecordDetails(componentsForUser)
//            }else if(item.component.name == 'criminalrecord'){
                criminalRecordDetails = await getCriminalRecordDetails(componentsForUser)
//            }else if(item.component.name == 'reference'){
                referenceDetails = await getReferenceDetails(componentsForUser)
//            }else if(item.component.name == 'refbasic'){
                refBasicDetails = await getRefBasicDetails(componentsForUser)
//            }else if(item.component.name == 'identity'){
                identityDetails = await getIdentityDetails(componentsForUser)
//            }else if(item.component.name == 'creditcheck'){
                creditCheckDetails = await getCreditCheckDetails(componentsForUser)
//            }else if(item.component.name == 'credittrans'){
                creditTransDetails = await getCreditTransDetails(componentsForUser)
//            }else if(item.component.name == 'creditequifax'){
                creditEquifaxDetails = await getCreditEquifaxDetails(componentsForUser)
//            }else if(item.component.name == 'globaldatabase'){
                globalDatabaseDetails = await getGlobaldatabaseDetails(componentsForUser)
//            }else if(item.component.name == 'drugtestfive'){
                drugTestFiveDetails = await getDrugTestFiveDetails(componentsForUser)
//            }else if(item.component.name == 'drugtestsix'){
                drugTestSixDetails = await getDrugTestSixDetails(componentsForUser)
//            }else if(item.component.name == 'drugtestseven'){
                drugTestSevenDetails = await getDrugTestSevenDetails(componentsForUser)
//            }else if(item.component.name == 'drugtesteight'){
                drugTestEightDetails = await getDrugTestEightDetails(componentsForUser)
//            }else if(item.component.name == 'drugtestnine'){
                drugTestNineDetails = await getDrugTestNineDetails(componentsForUser)
//            }else if(item.component.name == 'drugtestten'){
                drugTestTenDetails = await getDrugTestTenDetails(componentsForUser)
//            }else if(item.component.name == 'dlcheck'){
                dlCheckDetails = await getDlCheckDetails(componentsForUser)
//            }else if(item.component.name == 'directorshipcheck'){
                directorshipCheckDetails = await getDirectorshipCheckDetails(componentsForUser)
//            }else if(item.component.name == 'voterid'){
                voterIdDetails = await getVoterIdDetails(componentsForUser)
//            }else if(item.component.name == 'vddadvance'){
                 vddAdvancedDetails = await getVddAdvanceDetails(componentsForUser)
//            }else if(item.component.name == 'bankstmt'){
                 bankStmtDetails = await getBankStmtDetails(componentsForUser)
//            }else if(item.component.name == 'sitecheck'){
                 siteCheckDetails = await getSiteCheckDetails(componentsForUser)
//            }else if(item.component.name == 'physostan'){
                psychometricDetails = await getPsychometricDetails(componentsForUser)
//            }else if(item.component.name == 'socialmedia'){
                socialMediaCheckDetails = await getSocialMediaDetails(componentsForUser)
//            }else if(item.component.name == 'facisl3'){
                facisl3Details = await getFacisl3Details(componentsForUser)
//            }else if(item.component.name == 'ofac'){
                ofacDetails = await getOfacDetails(componentsForUser)
//            }else if(item.component.name == 'gapvfn'){
                gapvfnDetails = await getGapVfnDetails(componentsForUser)
//            }else if(item.component.name == 'passport'){
                passportDetails = await getPassportDetails(componentsForUser)
 //           }
//        }
	let result = await writeTracker(employmentDetails,empBasicDetails,empAdvanceDetails,
		                        educationDetails,educationAdvancedDetails,educationComprehensiveDetails,
	                                addressDetails,addressComprehensiveDetails,addressOnlineDetails,addressTelephoneDetails,
	                                courtRecordDetails,criminalRecordDetails,referenceDetails,refBasicDetails,identityDetails,creditCheckDetails,creditTransDetails,creditEquifaxDetails,globalDatabaseDetails,drugTestFiveDetails,drugTestSixDetails,drugTestSevenDetails,drugTestEightDetails,drugTestNineDetails,drugTestTenDetails,dlCheckDetails,directorshipCheckDetails,voterIdDetails,vddAdvancedDetails,bankStmtDetails,siteCheckDetails,psychometricDetails,socialMediaCheckDetails,facisL3Details,ofacDetails,gapvfnDetails,passportDetails);	
        console.log("tracker written and awaiting download and result is ",result)	
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "tl_tracker.xlsx"
        )
        res.download(`/REPO_STORAGE/tmp_tl_tracker/new_tl_tracker_${req.user.user_id}.csv`,(err)=>{
            if(err){
              res.status(500).send({
                  message:"Could not download  the file"
              })
            }
        })


	}catch(err){
            console.log("Error in tl pending is ",err)
	}
    }

 }
