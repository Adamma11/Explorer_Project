const UserSubclientAccess = require('../../models/administration/user_subclient_access.model');
const Case = require('../../models/uploads/case.model');
const PersonalDetails = require('../../models/data_entry/personal_details_data.model')
const DefaultCalendar = require('../../models/administration/default_calendar.model')
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
const moment = require('moment')


exports.getCasesWithoutOutputqcDate = (req,res)=>{
 let colorMasterDetails = new Array()
 let latestCompletionDate = null
 	
 let getColorMaster = function(){
   return new Promise((resolve,reject)=>{
      ColorMaster
      .find()
      .then(data=>{
        colorMasterDetails = data
        resolve(data)
      })
      .catch(err=>{
        reject()
      })
   })
 }
 let  getNumberOfHolidaysBetweenDates = function(date1,date2){
    return new Promise((resolve,reject)=>{	 
       DefaultCalendar
       .find({date:{$gte:date1,$lte:date2}}) 
       .then(data=>{
//	console.log("got holiday data",data)    
    	   if(data != null){
	      resolve(data.length);	
	   }else{
	      resolve(0)	
	   }     
       })
       .catch(err=>{
           resolve(0)	    
       })	 
    })	    
 }	
 let getNumberOfWeekends = function(date1,date2){
    return new Promise((resolve,reject)=>{
	let count = 0;    
	while(date1 < date2){
           if(date1.getDay() == 0 || date1.getDay()== 6){
//	      console.log("Adding 1 to count")	   
	      count ++	   
	   }	   
           date1.setDate(date1.getDate()+1)		
        }		
        resolve(count)
    })	 
 }	 
 function getColorCodeName(colorCode){
 //        console.log("In the function getcolorCodeName()")
         for(let i=0; i < colorMasterDetails.length;i++){
//            console.log("In color master ......checking for the colorCode sent " + colorCode)
//            console.log("In color master.......colorMasterDetails code is " + colorMasterDetails[i].colorCode)
            if(colorMasterDetails[i]._id.toString() == colorCode.toString()){
               return colorMasterDetails[i].name
            }
         }
         return "In Progress"

    }

    function getColorCode(colorCode){
        for(let i=0; i < colorMasterDetails.length;i++){
           if(colorMasterDetails[i]._id.toString() == colorCode.toString()){
               return colorMasterDetails[i].colorCode.substring(1,colorsMasterDetails[i].colorCode.length);
           }
        }
        return "";
    }



//    console.log("In Case Status Report...")	
    const workBook = new  ExcelJS.Workbook()
//    console.log("Workbook constructed")	
    const sheet = workBook.addWorksheet('TL Pending')
//    console.log("Sheet added")	
    sheet.addRow(["Case Id","Candidate Name","Latest Commpletion Date"])

    let query = {status:"OUTPUTQC-ACCEPTED",outputqcCompletionDate:null}	    
    let query1 = {user:req.user.user_id}


    let getSubclientsForTheUser = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess
            .find(query1,{_id:0,subclient:1})
            .then(data=>{
                resolve(data);
            })
            .catch(err=>{
                reject()     
            })            
        })
    }  

    let getCasesForSubclients = function(subclients){
        return new Promise((resolve,reject)=>{
            Case
	    .find({$and:[{$or:subclients},query]})
            .populate({path:'subclient',populate:{path:'client'}})
            .then(data=>{
/*                let uniqueComponents = new Array()
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
                })*/
		console.log("case list size is ",data.length)    
                resolve(data);
            })

            .catch(err=>{
		console.log("Error in getting the cases for the subclients",err)    
                reject()     
            })            
        })
    }   
    let getPersonalDetails = function(acase){
	return new Promise((resolve,reject)=>{
	   PersonalDetails
	   .findOne({case:acase})
           .then(data=>{
	      resolve(data)	   
	   })		
	   .catch(err=>{
	      reject()	   
	   })	
	})	
    }	    
    let getEmploymentDetails = function(acase){
        return new Promise((resolve,reject)=>{
            employment
            .find({case:acase})
            .then(data=>{
		data.forEach(item=>{    
  		   if(item.outputqcCompletionDate > latestCompletionDate){
		     latestCompletionDate = item.outputqcCompletionDate	
		   }       
		})	
		resolve(true)    
            })
            .catch(err=>{
		console.log("Error in writing tl pending for employment",err)    
                resolve(false)
            })
        })

    }
    let getEmpBasicDetails = function(acase){
        return new Promise((resolve,reject)=>{
            empbasic
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }		   	
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }    
    let getEmpAdvanceDetails = function(acase){
        return new Promise((resolve,reject)=>{
            empadvance
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    } 
    
    let getEducationDetails = function(acase){
        return new Promise((resolve,reject)=>{
            education
            .find({case:acase})
            .then(data=>{
		 data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			 
		 })
                resolve(true)
            })
            .catch(err=>{
		console.log("Error in tl pending education listing ",err)    
                reject(false)
            })
        })

    }     
    let getEducationAdvancedDetails = function(acase){
        return new Promise((resolve,reject)=>{
            educationadvanced
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }                  			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }     
    let getEducationComprehensiveDetails = function(acase){
        return new Promise((resolve,reject)=>{
            educationcomprehensive
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }     
    let getAddressDetails = function(acase){
        return new Promise((resolve,reject)=>{
            address
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
		console.log("Error in address component ",err)    
                reject(false)
            })
        })

    }         
    let getAddressComprehensiveDetails = function(acase){
        return new Promise((resolve,reject)=>{
            addresscomprehensive
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }             
    let getAddressOnlineDetails = function(acase){
        return new Promise((resolve,reject)=>{
            addressonline
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                 
    let getAddressTelephoneDetails = function(acase){
        return new Promise((resolve,reject)=>{
            addresstelephone
            .find({case:acase})
            .then(data=>{
		data.forEach(item=>{    
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }		    
                })    
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                 
    let getCourtRecordDetails = function(acase){
        return new Promise((resolve,reject)=>{
            courtrecord
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
	        })		
                resolve(true)
            })
            .catch(err=>{
		reject(false)    
	    })		
        })

    }
    let getCriminalRecordDetails = function(acase){
        return new Promise((resolve,reject)=>{
            criminalrecord
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
			
                })
		    
                resolve(true)
            })
            .catch(err=>{
		console.log("Error in criminal check for tl pending",err)    
                reject(false)
            })
        })

    }                         
    let getReferenceDetails = function(acase){
        return new Promise((resolve,reject)=>{
            reference
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                         
    let getRefBasicDetails = function(acase){
        return new Promise((resolve,reject)=>{
            refbasic
            .find({case:acase})
            .then(data=>{
               data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
		       
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                        
    
    let getIdentityDetails = function(acase){
        return new Promise((resolve,reject)=>{
            identity
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
			
		})
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                            
    let getCreditCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            creditcheck
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                                
    let getCreditTransDetails = function(acase){
        return new Promise((resolve,reject)=>{
            credittrans
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                                
    let getCreditEquifaxDetails = function(acase){
        return new Promise((resolve,reject)=>{
            creditequifax
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
		   	
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                                    

    let getGlobaldatabaseDetails = function(acase){
        return new Promise((resolve,reject)=>{
            globaldatabase
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
			
                })
 		    
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                                        

    let getDrugTestFiveDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestfive
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                                            
    let getDrugTestSixDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestsix
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }
			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                  
    
    let getDrugTestSevenDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestseven
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                    
    let getDrugTestEightDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtesteight
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }
    let getDrugTestNineDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestnine
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }    

    let getDrugTestTenDetails = function(acase){
        return new Promise((resolve,reject)=>{
            drugtestten
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
		    
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }        
    let getDlCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            dlcheck
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }            
    let getDirectorshipCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            directorshipcheck
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
    

                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }            

    let getVoterIdDetails = function(acase){
        return new Promise((resolve,reject)=>{
            voterid
            .find({case:acase})
            .then(data=>{
                 data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			 
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }
    
    let getVddAdvanceDetails = function(acase){
        return new Promise((resolve,reject)=>{
            vddadvance
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }    
    let getBankStmtDetails = function(acase){
        return new Promise((resolve,reject)=>{
            bankstmt
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
		console.log("Error in bank statement details",err)    
                reject(false)
            })
        })

    }    
    let getSiteCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            sitecheck
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }    
    let getPsychometricDetails = function(acase){
        return new Promise((resolve,reject)=>{
            physostan
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }    

    let getSocialMediaDetails = function(acase){
        return new Promise((resolve,reject)=>{
            socialmedia
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
		    
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }        

    let getFacisl3Details = function(acase){
        return new Promise((resolve,reject)=>{
            facisl3
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }            
    let getOfacDetails = function(acase){
        return new Promise((resolve,reject)=>{
            ofac
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }        

    let getGapVfnDetails = function(acase){
        return new Promise((resolve,reject)=>{
            gapvfn
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
    
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }            
    let getPassportDetails = function(acase){
        return new Promise((resolve,reject)=>{
            passport
            .find({case:acase})
            .then(data=>{
                data.forEach(item=>{
                   if(item.outputqcCompletionDate > latestCompletionDate){
                     latestCompletionDate = item.outputqcCompletionDate
                   }			
                })
                resolve(true)
            })
            .catch(err=>{
                reject(false)
            })
        })

    }                
    prepareReport()
    async function prepareReport(){
	await getColorMaster()    
        let userSubclients = await getSubclientsForTheUser()
  //      console.log("Got Subclients");
        let casesForUser = await getCasesForSubclients(userSubclients)
  //      console.log("Got Components for user ");
        // for each component get checks which are pending with details
        for(let i=0; i < casesForUser.length;i++){
	    latestCompletionDate = null	
            let item = casesForUser[i]
//		console.log("Case Id being processed is ",item.caseId)
//		console.log("About to get employment details")
	    try{		
		let personalDetails = await getPersonalDetails(item._id)
                let employmentDetails = await getEmploymentDetails(item._id)
                let empbasicDetails = await getEmpBasicDetails(item._id)
                let empadvanceDetails = await getEmpAdvanceDetails(item._id)
                let educationDetails = await getEducationDetails(item._id)
                let educationAdvancedDetails = await getEducationAdvancedDetails(item._id)
                let educationComprehensiveDetails = await getEducationComprehensiveDetails(item._id)
                let addressDetails = await getAddressDetails(item._id)
                let addressComprehensiveDetails = await getAddressComprehensiveDetails(item._id)
                let addressOnlineDetails = await getAddressOnlineDetails(item._id)
                let addressTelephoneDetails = await getAddressTelephoneDetails(item._id)
                let courtRecordDetails = await getCourtRecordDetails(item._id)
//		console.log("About to get criminal record for case status")
                let criminalRecordDetails = await getCriminalRecordDetails(item._id)
//		console.log("About to get reference details for case status")
                let referenceRecordDetails = await getReferenceDetails(item._id)
//		console.log("About to get ref basic for case status")
                let refBasicDetails = await getRefBasicDetails(item._id)
//		console.log("About to get identity details for case status")
                let identityDetails = await getIdentityDetails(item._id)
//		console.log("About to get credi check for case status")
                let creditCheckDetails = await getCreditCheckDetails(item._id)
//		console.log("About to get credit trans  for case status")
                let credittransDetails = await getCreditTransDetails(item._id)
//		console.log("About to get credit equifax for case status")
                let creditEquifaxDetails = await getCreditEquifaxDetails(item._id)
//		console.log("About to get globaldatabase check for case status")
                let globaldatabaseDetails = await getGlobaldatabaseDetails(item._id)
//		console.log("About to get drug test five for case status")
                let drugtestfiveDetails = await getDrugTestFiveDetails(item._id)
//		console.log("About to get drug test six for case status")
                let drugtestsixDetails = await getDrugTestSixDetails(item._id)
//		console.log("About to get drug test seven for case status")
                let drugtestsevenDetails = await getDrugTestSevenDetails(item._id)
//		console.log("About to get drug test eight for case status")
                let drugtesteightDetails = await getDrugTestEightDetails(item._id)
//		console.log("About to get drug test nine for case status")
                let drugtestnineDetails = await getDrugTestNineDetails(item._id)
//		console.log("About to get drug test ten for case status")
                let drugtesttenDetails = await getDrugTestTenDetails(item._id)
//		console.log("About to get dl check for case status")
                let dlCheckDetails = await getDlCheckDetails(item._id)
//		console.log("About to get dirctorship for case status")
                let directorshipCheckDetails = await getDirectorshipCheckDetails(item._id)
//		console.log("About to get voter id details for case status")
                let voterIdDetails = await getVoterIdDetails(item._id)
//		console.log("About to get vdd advance details for case status")
                let vddAdvanceDetails = await getVddAdvanceDetails(item._id)
//		console.log("About to get bank stmt for case status")
                let bankStmtDetails = await getBankStmtDetails(item._id)
//		console.log("About to get site check details for case status")
                let siteCheckDetails = await getSiteCheckDetails(item._id)
//		console.log("About to get psychometric details for case status")
                let psychometricDetails = await getPsychometricDetails(item._id)
//		console.log("About to get social media details for case status")
                let socialmediaCheckDetails = await getSocialMediaDetails(item._id)
//		console.log("About to get facisl l3 details for case status")
                let facisl3Details = await getFacisl3Details(item._id)
//		console.log("About to gat ofac details for case status")
                let ofacDetails = await getOfacDetails(item._id)
//		console.log("About to get gap vfn details for case status")
                let gapvfnDetails = await getGapVfnDetails(item._id)
//		console.log("About to get passport details for case status")
                let passportDetails = await getPassportDetails(item._id)
		let rowValues = []
		let completionDateForCalculation  = item.outputqcCompletionDate != null ? moment(item.outputqcCompletionDate) : moment(Date.now())
		let startDate = new Date(item.initiationDate.getTime())
		let actualDaysTaken = completionDateForCalculation.diff(startDate,'days')
		let tatEndDateForCalculation = moment(item.tatEndDate)
		let tatDays = tatEndDateForCalculation.diff(startDate,'days')
		let numberOfHolidays = await getNumberOfHolidaysBetweenDates(startDate,tatEndDateForCalculation)
		startDate = new Date(item.initiationDate.getTime())
		let numberOfWeekends = await getNumberOfWeekends(startDate,item.tatEndDate)

//		console.log("Number of Holidays is " + numberOfHolidays)
//		console.log("Number of Weekdnds is " + numberOfWeekends)
		let numberOfInsuffDays =0;
//		console.log("First insuff raised date",item.firstInsufficiencyRaisedDate)
//		console.log("Last insuff cleared date",item.lastInsufficiencyClearedDate)
		if(item.firstInsufficiencyRaisedDate != null && item.lastInsufficiencyClearedDate != null){
//	          console.log("Not  Null----calculating number of insusff days")		
		  numberOfInsuffDays = moment(item.lastInsufficiencyClearedDate).diff(item.firstInsufficiencyRaisedDate,'days')	
//		  console.log("Calculated number  of insuff days ",numberOfInsuffDays)	
		}
//		console.log("Number of Insuff days",numberOfInsuffDays)
//		if(numberOfInsuffDays > 0){
//		  console.log("Number of insuff days ",numberOfInsuffDays)	
//		}
		rowValues[0]=item.caseId
		rowValues[1]=item.candidateName
		rowValues[2]=latestCompletionDate
		
		let  colCount = 2;
                console.log("case added to report ",item.caseId)
		sheet.addRow(rowValues)
	    }catch(err){
		console.log("Error in generating Case report",err)    
	    }

        }
         
//	console.log("Setting Headers")    
/*        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )*/
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",		
            "Content-Disposition",
            "attachment; filename=" + "case_status_report.xlsx"
        )
	console.log("About to return WorkBook")    
        return workBook.xlsx.write(res)
        .then(function(){
            res.status(200).end()
        })    
//        res.json({message:"Successful"})
    }
}
 
