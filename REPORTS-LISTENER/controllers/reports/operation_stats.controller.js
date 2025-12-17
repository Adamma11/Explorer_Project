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
const ColorMaster = require('../../models/administration/color_master.model')
const User = require('../../models/administration/user.model')

exports.getOperationStats = (req,res)=>{
    let count = 0	
    let query = ""
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let date = "01"
    let monthString = ""	
    if(month < 10){
      monthString = "0" + month	    
    }else{
      monthString = month	    
    }	
    console.log("Year is ........",year)
    console.log("Month is .......",monthString)
    console.log("Date is ......",date)
    console.log("Report Type is ",req.query.reportType)
    console.log("Complete date is ",year+"-"+monthString+"-"+date)
    console.log("Request type os ",req.query.reportType)	
    if(req.query.reportType=='OPENING'){
      query = {initiationDate:{$lt:year + "-" + monthString + "-" + date},status:{$ne:'MENTOR-REVIEW-ACCEPTED'},status:{$ne:'OUTPUTQC-ACCEPTED'}} 
    }	
    if(req.query.reportType=='INITIATED'){
      query = {inputqcCompletionDate:{$gte:year + "-" + monthString + "-" + date}}
    }
    console.log("query to apply is ",query) 	
    if(req.query.reportType=='WIP'){
      query = {$and:[{status:{$ne:'INSUF-1-REQ-ACCEPTED'},status:{$ne:'INSUF-2-REQ-ACCEPTED'},status:{$ne:"INSUF-1-REQUEST"},status:{$ne:"INSUF-2-REQUEST"},status:{$ne:"INSUF-1-REQUEST-CLEARED"},status:{$ne:"INSUF-2-REQUEST-CLEARED"},status:{$ne:"INSUF-2-CLEARANCE-REJECTED"},status:{$ne:"INSUF-1-CLEARANCE-REJECTED"},status:{$ne:"OUTPUTQC-ACCEPTED"}}]}	    
    }	
//    let query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"}}]}
    if(req.query.reportType == 'COMPLETED'){
      query = {$or:[{status:'MENTOR-REVIEW-ACCEPTED',mentorReviewCompletionDate:{$gte:year + "-" + monthString + "-" + date}},{status:'OUTPUTQC-ACCEPTED',outputqcCompletionDate:{$gte:year + "-" + monthString + "-" + date}}]} 	    
    }
    if(req.query.reportType=='INSUF'){
      query = {$or:[{status:'INSUF-1-REQ-ACCEPTED'},{status:'INSUF-2-REQ-ACCEPTED'},{status:"INSUF-1-REQUEST"},{status:"INSUF-2-REQUEST"},{status:"INSUF-1-REQUEST-CLEARED"},{status:"INSUF-2-REQUEST-CLEARED"},{status:"INSUF-2-CLEARANCE-REJECTED"},{status:"INSUF-1-CLEARANCE-REJECTED"}]}	    
    }	
    console.log("Query to execute is ",query)	
    let getRolesForTheUser = function(){
        return new Promise((resolve,reject)=>{
            UserRole
            .find({user:req.user.user_id},{_id:0,role:1})
            .then(data=>{
//                console.log("roles are ",data);
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
    let getGradingColor = function (color){
	return new Promise((resolve,reject)=>{
	  ColorMaster
          .findOne({_id:color})
          .then(data=>{
	     resolve(data.name)	  
	  })
	  .catch(err=>{
	     reject(null)	  
	  })	
	})    
    }	
    let getEmploymentDetails = function(){
        return new Promise((resolve,reject)=>{
            employment
            .count(query)
            .then(data=>{
		console.log("Employment count is ",data)    
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
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject(0)
            })
        })

    }                
    prepareReport()
    async function prepareReport(){
	try{   
        let userRoles = await getRolesForTheUser()
//        console.log("Got roles");
        let componentsForUser = await getComponentsForRoles(userRoles)
//        console.log("Got Components for user ",componentsForUser);
//	let count = 0	
        // for each component get checks which are pending with details
//	count = 0	
        for(i=0; i < componentsForUser.length;i++){
            let item = componentsForUser[i]
            if(item.component.name == "employment"){
                count = count +  await getEmploymentDetails()
		console.log("Added employment details")    
            }else if(item.component.name == "empbasic"){
                count = count + await getEmpBasicDetails()
		console.log("Added empbasic details")    
            }else if(item.component.name == 'empadvance'){
                count = count + await getEmpAdvanceDetails()
		console.log("Added empadvance details")    
            }else if(item.component.name == 'education'){
                count = count + await getEducationDetails()
		console.log("Added education details")    
            }else if(item.component.name == 'educationadvanced'){
                count = count + await getEducationAdvancedDetails()
		console.log("Added Education advanced details")   
            }else if(item.component.name == "educationcomprehensive"){
                count = count +  await getEducationComprehensiveDetails()
		console.log("Added education comprehensive details")    
            }else if(item.component.name == 'address'){
                count  = count + await getAddressDetails()
		console.log("Added address details")    
            }else if(item.component.name == 'addresscomprehensive'){
                count = count + await getAddressComprehensiveDetails()
		console.log("Added address comprehensive details")    
            }else if(item.component.name == 'addressonline'){
                count = count +  await getAddressOnlineDetails()
		console.log("Added address online details")
            }else if(item.component.name == 'addresstelephone'){
                count = count +  await getAddressTelephoneDetails()
		console.log("Added address telephone details")    
            }else if(item.component.name == 'courtrecord'){
                count = count + await getCourtRecordDetails()
		console.log("Added court record details")    
            }else if(item.component.name == 'criminalrecord'){
                count  = count + await getCriminalRecordDetails()
		console.log("Added criminal record details")    
            }else if(item.component.name == 'reference'){
                count = count + await getReferenceDetails()
		console.log("Added refrence details")    
            }else if(item.component.name == 'refbasic'){
                count  = count + await getRefBasicDetails()
		console.log("Added ref baic details")    
            }else if(item.component.name == 'identity'){
                count = count +  await getIdentityDetails()
		console.log("Added identity details")    
            }else if(item.component.name == 'creditcheck'){
                count = count + await getCreditCheckDetails()
		console.log("Added credit check details")    
            }else if(item.component.name == 'credittrans'){
                count = count + await getCreditTransDetails()
		console.log("Added credit trans details")    
            }else if(item.component.name == 'creditequifax'){
                count = count + await getCreditEquifaxDetails()
		console.log("Added credit equifax details")    
            }else if(item.component.name == 'globaldatabase'){
                count = count +  await getGlobaldatabaseDetails()
		console.log("Added global database details")    
            }else if(item.component.name == 'drugtestfive'){
                count = count + await getDrugTestFiveDetails()
		console.log("Added drug test five details")    
            }else if(item.component.name == 'drugtestsix'){
                count = count + await getDrugTestSixDetails()
		console.log("Added drug test six details")    
            }else if(item.component.name == 'drugtestseven'){
                count = count +  await getDrugTestSevenDetails()
		console.log("Added drug test seven detail")    
            }else if(item.component.name == 'drugtesteight'){
                count = count + await getDrugTestEightDetails()
		console.log("Added drug test eight details")    
            }else if(item.component.name == 'drugtestnine'){
                count = count + await getDrugTestNineDetails()
		console.log("Added drug test nine details")    
            }else if(item.component.name == 'drugtestten'){
                count = count + await getDrugTestTenDetails()
		console.log("Added drug test ten details")    
            }else if(item.component.name == 'dlcheck'){
                count = count + await getDlCheckDetails()
		console.log("Added dl check cetails")    
            }else if(item.component.name == 'directorshipcheck'){
                count = count + await getDirectorshipCheckDetails()
		console.log("Added directorship check details")    
            }else if(item.component.name == 'voterid'){
                count = count + await getVoterIdDetails()
		console.log("Added voter id details")    
            }else if(item.component.name == 'vddadvance'){
                count = count +  await getVddAdvanceDetails()
		console.log("Added vdd advance details")    
            }else if(item.component.name == 'bankstmt'){
                count = count + await getBankStmtDetails()
		console.log("Added bank statement details")    
            }else if(item.component.name == 'sitecheck'){
                count = count + await getSiteCheckDetails()
		console.log("Added sit check details")    
            }else if(item.component.name == 'physostan'){
                count = count + await getPsychometricDetails()
		console.log("Added psychometric details")    
            }else if(item.component.name == 'socialmedia'){
                count = count + await getSocialMediaDetails()
            }else if(item.component.name == 'facisl3'){
                count = count + await getFacisl3Details()
            }else if(item.component.name == 'ofac'){
                count = count + await getOfacDetails()
            }else if(item.component.name == 'gapvfn'){
                count = count + await getGapVfnDetails()
            }else if(item.component.name == 'passport'){
                count = count + await getPassportDetails()
            }
        }
           res.json({count:count})		
	}catch(err){
            console.log("Error in tl pending is ",err)
	    res.status(500).json({
                 message:"Error Getting Count"
	    })	
	}
    }

 }
