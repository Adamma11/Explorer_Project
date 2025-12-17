const UserSubclientAccess = require('../../models/administration/user_subclient_access.model');
const Case = require('../../models/uploads/case.model');
const PersonalDetails = require('../../models/data_entry/personal_details_data.model')
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



exports.updateCaseStatus = (req,res)=>{

//    console.log("In Case Status Report...")
    const workBook = new  ExcelJS.Workbook()
//    console.log("Workbook constructed")
    const sheet = workBook.addWorksheet('Insuff Update List')
	

    let firstInsufficiencyRaisedDate = null
    let lastInsufficiencyClearedDate = null;

    let getAllCases = function(){
	return new Promise((resolve,reject)=>{
          Case
	  .find()
	  .sort({caseId:1})
	  .skip(8000)	
	  .limit(8000) 	
          .then(data=>{
	    resolve(data)	  
	  })		
	  .catch(err=>{
	    reject()	  
	  })	
	})    
    }	    

    function updateInsuffDates(itemInsufficiencyRaisedDate,itemInsufficiencyClearedDate){
	 return new Promise((resolve,reject)=>{   
         if(itemInsufficiencyRaisedDate != null){
 //           console.log("First insuuficiency raised date being upldated with ",itemInsufficiencyRaisedDate)		 
            if(firstInsufficiencyRaisedDate == null){
	       firstInsufficiencyRaisedDate = new Date(itemInsufficiencyRaisedDate.getTime())	    
            }else if(itemInsufficiencyRaisedDate < firstInsufficiencyRaisedDate){
               firstInsufficiencyRaisedDate = new Date(itemInsufficiencyRaisedDate.getTime())
            }
         }
         if(itemInsufficiencyClearedDate != null){
            if(lastInsufficiencyClearedDate == null){
	      lastInsufficiencyClearedDate = new Date(itemInsufficiencyClearedDate.getTime())	    
            }else if(itemInsufficiencyClearedDate > lastInsufficiencyClearedDate){
               lastInsufficiencyClearedDate = new Date(itemInsufficiencyClearedDate.getTime())
            }
         }
	  resolve()	 
	 })	 
 	    
    }	    
    let getEmploymentDetails = function(acase){
//	console.log("Trying to fetch employment details for case status report for the case ")    
        return new Promise((resolve,reject)=>{
            employment
            .find({case:acase})
            .then(data=>{
		data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)	  
		})    
		resolve()    
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
	    .then(data=>{	
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
            })
            .catch(err=>{
                reject()
            })
        })

    } 
    
    let getEducationDetails = function(acase){
//	console.log("In education details of tl pending")    
        return new Promise((resolve,reject)=>{
            education
            .find({case:acase})
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
 
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
	    .then(data=>{	
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                 await  updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
            })
            .catch(err=>{
                reject()
            })
        })

    }            

    let getVoterIdDetails = function(acase){
        return new Promise((resolve,reject)=>{
            voterid
            .find({case:acase})
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
            })
            .catch(err=>{
                reject()
            })
        })

    }
    
    let getVddAdvanceDetails = function(acase){
        return new Promise((resolve,reject)=>{
            vddadvance
            .find({case:acase})
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
            })
            .catch(err=>{
                reject()
            })
        })

    }    

    let getSocialMediaDetails = function(acase){
        return new Promise((resolve,reject)=>{
            socialmedia
            .find({case:acase})
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		console.log("about to resolve social media")    
                resolve()
            })
            .catch(err=>{
		console.log("Error in social media",err)    
                reject()
            })
        })

    }        

    let getFacisl3Details = function(acase){
        return new Promise((resolve,reject)=>{
            facisl3
            .find({case:acase})
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
            .then(data=>{
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
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
	    .then(data=>{	
                data.forEach(async item=>{
                  await updateInsuffDates(item.insufficiencyRaisedDate,item.insufficiencyClearedDate)
                })
		    
                resolve()
            })
            .catch(err=>{
                reject()
            })
        })

    }
    let updateCase = function(acase){
       return new Promise((resolve,reject)=>{
	  Case
	  .findOneAndUpdate({_id:acase},{firstInsufficencyRaisedDate:firstInsuranceRaisedDate,lastInsufficiencyClearedDate:lastInsufficiencyClearedDate})    
	  .then(data=>{
	    resolve(data)	  
	  })     
	  .catch(err=>{
            reject()		  
	  })     
       })	    
    }	    
    startUpdating()
    async function startUpdating(){
        let cases = await getAllCases()
        console.log("Got Components for user ");
        // for each component get checks which are pending with details
        for(let i=0; i < cases.length;i++){
                let item = cases[i]
		console.log("About to get employment details")
                let employmentDetails = await getEmploymentDetails(item._id)
		console.log("About to get emp basic details")
                let empbasicDetails = await getEmpBasicDetails(item._id)
		console.log("About to get emp advance")
                let empadvanceDetails = await getEmpAdvanceDetails(item._id)
		console.log("About to get education details")	
                let educationDetails = await getEducationDetails(item._id)
		console.log("About to get education advanced details")	
                let educationAdvancedDetails = await getEducationAdvancedDetails(item._id)
		console.log("About to get education comprehensive")	
                let educationComprehensiveDetails = await getEducationComprehensiveDetails(item._id)
		console.log("about to get address details")	
                let addressDetails = await getAddressDetails(item._id)
		console.log("About to get address comprehensive")	
                let addressComprehensiveDetails = await getAddressComprehensiveDetails(item._id)
		console.log("about to get address online")	
                let addressOnlineDetails = await getAddressOnlineDetails(item._id)
	        console.log("about to get address telephone")		
                let addressTelephoneDetails = await getAddressTelephoneDetails(item._id)
		console.log("about to get court record details")
                let courtRecordDetails = await getCourtRecordDetails(item._id)
		console.log("about to get criminal record")
                let criminalRecordDetails = await getCriminalRecordDetails(item._id)
		console.log("about to get reference record")
                let referenceRecordDetails = await getReferenceDetails(item._id)
		console.log("about to get ref basic")
                let refBasicDetails = await getRefBasicDetails(item._id)
		console.log("about to get identity")
                let identityDetails = await getIdentityDetails(item._id)
		console.log("about to get credit")
                let creditCheckDetails = await getCreditCheckDetails(item._id)
	        console.log("about to get credit trans")	
                let credittransDetails = await getCreditTransDetails(item._id)
		console.log("about to get credit equifax")
                let creditEquifaxDetails = await getCreditEquifaxDetails(item._id)
		console.log("about to get global database")
                let globaldatabaseDetails = await getGlobaldatabaseDetails(item._id)
		console.log("about to get drugn five")
                let drugtestfiveDetails = await getDrugTestFiveDetails(item._id)
		console.log("about to get drug 6")
                let drugtestsixDetails = await getDrugTestSixDetails(item._id)
		console.log("about to get drun 7")
                let drugtestsevenDetails = await getDrugTestSevenDetails(item._id)
		console.log("about to get dru 8")
                let drugtesteightDetails = await getDrugTestEightDetails(item._id)
		console.log("about to get drug 9")	
                let drugtestnineDetails = await getDrugTestNineDetails(item._id)
		console.log("about to get drun 10")
                let drugtesttenDetails = await getDrugTestTenDetails(item._id)
		console.log("about to get dl check")
                let dlCheckDetails = await getDlCheckDetails(item._id)
		console.log("about to get directorhsip check")
                let directorshipCheckDetails = await getDirectorshipCheckDetails(item._id)
		console.log("about to get voter id")
                let voterIdDetails = await getVoterIdDetails(item._id)
		console.log("about to get vdd advance")
                let vddAdvanceDetails = await getVddAdvanceDetails(item._id)
		console.log("about to get bank statement")
                let bankStmtDetails = await getBankStmtDetails(item._id)
		console.log("about to get sit check")
                let siteCheckDetails = await getSiteCheckDetails(item._id)
		console.log("about go get psychometric test")
                let psychometricDetails = await getPsychometricDetails(item._id)
		console.log("about to get social media")
                let socialmediaCheckDetails = await getSocialMediaDetails(item._id)
		console.log("got social media",socialmediaCheckDetails)
		console.log("about to get facis13")
                let facisl3Details = await getFacisl3Details(item._id)
		console.log("about to get ofac")
                let ofacDetails = await getOfacDetails(item._id)
		console.log("about to get gap")
                let gapvfnDetails = await getGapVfnDetails(item._id)
		console.log("about to get passport")
                let passportDetails = await getPassportDetails(item._id)
//		let updatedCase = await updateCase(item._id)
                console.log("writing the row for case id",item.caseId);
		console.log((i+1) + " of " + cases.length + " written ")
		console.log('writing first insufficiency raised date ',firstInsufficiencyRaisedDate)
		console.log('writing last insufficiency cleared date ',lastInsufficiencyClearedDate)
		sheet.addRow([item.caseId,item.candidateName,firstInsufficiencyRaisedDate,lastInsufficiencyClearedDate]);

                firstInsufficiencyRaisedDate = null
		lastInsufficiencyClearedDate = null
        }
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "insuff_update_statement.xlsx"
        )
        console.log("About to return WorkBook")
        return workBook.xlsx.write(res)
        .then(function(){
            res.status(200).end()
        })


    }

 }
