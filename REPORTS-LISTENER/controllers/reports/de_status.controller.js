const Case = require('../../models/uploads/case.model');
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
const ExcelJS = require('exceljs');
const mongoose = require('mongoose')

//    const workBook = new ExcelJS.Workbook()
//    console.log("Workbook constructed")
//    const sheet = workBook.addWorksheet('DE Status')
//    console.log("Sheet added")
//    sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Initiation Date","Allocation Date","Completion Date","Allocated To"])

exports.getDataEntryStatusReport = (req,res)=>{
    const workBook = new ExcelJS.Workbook()
//    console.log("Workbook constructed")
    const sheet = workBook.addWorksheet('DE Status')
//    console.log("Sheet added")
    sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Initiation Date","Allocation Date","Completion Date","Allocated To","Number of Components"])
	
    console.log("In DE Status......",req.query.fromDate)	
    let getCases = function(){
	console.log("Getting cases for DE Status Report")   
	console.log("From and to dates are ",req.query.fromDate,req.query.toDate)    
        return new Promise((resolve,reject)=>{
/*	let docs = await Case.aggregate([
            {$match:{dataEntryCompletionDate:{$gte:req.query.fromDate,$lte:req.query.toDate+"T23:59:59.999Z"}}}		
	])	*/
//	console.log("Number of documents",docs.length)	
//        let cases = new Array()
            Case
	    .find({dataEntryCompletionDate:{$gte:req.query.fromDate,$lte:req.query.toDate+"T23:59:59.999Z"}})
            .populate({path:'subclient',populate:{path:'client'}})
	    .populate({path:'dataEntryAllocatedTo'})	
            .then(data=>{
//		console.log("Data  is ",data)    
		for(let i=0;i < data.length;i++){    
	             let item = data[i]; 		
		     let componentCount = 0;	
		     let allocatedTo = ""
		     if(item.dataEntryAllocatedTo != null){
		       allocatedTo = item.dataEntryAllocatedTo.name	     
		     }
		     let allocationDate = item.initiationDate
		     if(item.dataEntryAllocationDate != null){
		       allocationDate = item.dataEntryAllocationDate	     
		     }	
//		     console.log("Item is ",item)	
/*		     componentCount = componentCount + await getAddressCount(item._id)	
                     componentCount = componentCount + await getAddressComprehensiveCount(item._id)
                     componentCount = componentCount + await getAddressOnlineCount(item._id)
                     componentCount = componentCount + await getAddressTelephoneCount(item._id)
                     componentCount = componentCount + await getBankStmtCount(item._id)
                     componentCount = componentCount + await getCourtRecordCount(item._id)
                     componentCount = componentCount + await getCreditCheckCount(item._id)
                     componentCount = componentCount + await getCreditEquifaxCount(item._id)
                     componentCount = componentCount + await getCreditTransCount(item._id)
                     componentCount = componentCount + await getCriminalRecordCount(item._id)
                     componentCount = componentCount + await getDlCheckCount(item._id)
                     componentCount = componentCount + await getDirectorshipCheckCount(item._id)
                     componentCount = componentCount + await getDrugTestFiveCount(item._id)
                     componentCount = componentCount + await getDrugTestSixCount(item._id)
                     componentCount = componentCount + await getDrugTestSevenCount(item._id)
                     componentCount = componentCount + await getDrugTestEightCount(item._id)
                     componentCount = componentCount + await getDrugTestNineCount(item._id)
                     componentCount = componentCount + await getDrugTestTenCount(item._id)
                     componentCount = componentCount + await getEducationCount(item._id)
                     componentCount = componentCount + await getEducationAdvancedCount(item._id)
                     componentCount = componentCount + await getEducationComprehensiveCount(item._id)
                     componentCount = componentCount + await getEmpAdvanceCount(item._id)
                     componentCount = componentCount + await getEmpBasicCount(item._id)
                     componentCount = componentCount + await getEmploymentCount(item._id)
                     componentCount = componentCount + await getFacisL3Count(item._id)
                     componentCount = componentCount + await getGlobalDatabaseCount(item._id)
                     componentCount = componentCount + await getGapVfnCount(item._id)
                     componentCount = componentCount + await getIdentityCount(item._id)
                     componentCount = componentCount + await getOfacCount(item._id)
                     componentCount = componentCount + await getPassportCount(item._id)
                     componentCount = componentCount + await getPsychometricStandardCount(item._id)
                     componentCount = componentCount + await getRefBasicCount(item._id)
                     componentCount = componentCount + await getReferenceCount(item._id)
                     componentCount = componentCount + await getSiteCheckCount(item._id)
                     componentCount = componentCount + await getSocialMediaCount(item._id)
                     componentCount = componentCount + await getVddAdvanceCount(item._id)
                     componentCount = componentCount + await getVoterIdCount(item._id)			
		     Case
		     .findOneAndUpdate({_id:item._id},{numberOfChecksEntered:componentCount})
	             .then(caseData=>{
		     })
		     .catch(err=>{
		       console.log("Error updating the number of checks entered",err)	     
		     })	*/

    	             sheet.addRow([item.caseId,item.candidateName,item.subclient.client.name,item.subclient.name,item.initiationDate,allocationDate,item.dataEntryCompletionDate,allocatedTo,item.numberOfChecksEntered])    
		}
		    
//		console.log("case list size is ",data.length)    
                resolve(true);
            })

            .catch(err=>{
		console.log("Error in getting the cases for the subclients",err)    
                reject(false)     
            })            
        })
    }
    let getAddressCount = function(case_id){
       return new Promise((resolve,reject)=>{
         address
	.count({case:case_id})
	.then(data=>{
	   console.log("Count of address is ",data)	
	   resolve(data) 	
	})       
	.catch(err=>{
	   resolve(0)	
	})       
       })
    }	    
    let getAddressComprehensiveCount = function(case_id){
       return new Promise((resolve,reject)=>{
         addresscomprehensive
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
       })
    }
    let getAddressOnlineCount = function(case_id){
       return new Promise((resolve,reject)=>{
        addressonline
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
       })
    }
    let getAddressTelephoneCount = function(case_id){
       return new Promise((resolve,reject)=>{
         addresstelephone
        .count({case:case_id})
        .then(data=>{
           resolve(data)
	})
        .catch(err=>{
           resolve(0)
        })
       })
    }
	
    let getBankStmtCount = function(case_id){
       return new Promise((resolve,reject)=>{	       
         bankstmt
        .count({case:case_id})
        .then(data=>{
           resolve(data)
	})
        .catch(err=>{
           resolve(0)
        })
       })
    }
    let getCourtRecordCount = function(case_id){
       return new Promise((resolve,reject)=>{
         courtrecord
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
       })
    }	    
    let getCreditCheckCount = function(case_id){
       return new Promise((resolve,reject)=>{
         creditcheck
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0);
        })
      })
    }
    let getCreditEquifaxCount = function(case_id){
       return new Promise((resolve,reject)=>{
         creditequifax
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getCreditTransCount = function(case_id){
       return new Promise((resolve,reject)=>{
         credittrans
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getCriminalRecordCount = function(case_id){
       return new Promise((resolve,reject)=>{
         criminalrecord
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getDirectorshipCheckCount = function(case_id){
       return new Promise((resolve,reject)=>{
         directorshipcheck
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getDlCheckCount = function(case_id){
       return new Promise((resolve,reject)=>{
         dlcheck
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getDrugTestFiveCount = function(case_id){
       return new Promise((resolve,reject)=>{
         drugtestfive
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getDrugTestSixCount = function(case_id){
       return new Promise((resolve,reject)=>{
         drugtestsix
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getDrugTestSevenCount = function(case_id){
       return new Promise((resolve,reject)=>{
         drugtestseven
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getDrugTestEightCount = function(case_id){
       return new Promise((resolve,reject)=>{
         drugtesteight
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getDrugTestNineCount = function(case_id){
       return new Promise((resolve,reject)=>{
         drugtestnine
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }

    let getDrugTestTenCount = function(case_id){
       return new Promise((resolve,reject)=>{
         drugtestten
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getEducationCount = function(case_id){
       return new Promise((resolve,reject)=>{
         education
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getEducationAdvancedCount = function(case_id){
       return new Promise((resolve,reject)=>{
         educationadvanced
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getEducationComprehensiveCount = function(case_id){
       return new Promise((resolve,reject)=>{
         educationcomprehensive
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getEmpAdvanceCount = function(case_id){
       return new Promise((resolve,reject)=>{
         empadvance
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getEmpBasicCount = function(case_id){
       return new Promise((resolve,reject)=>{
         empbasic
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getEmploymentCount = function(case_id){
       return new Promise((resolve,reject)=>{
         employment
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getFacisL3Count = function(case_id){
       return new Promise((resolve,reject)=>{
         facisl3
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getGlobalDatabaseCount = function(case_id){
       return new Promise((resolve,reject)=>{
         globaldatabase
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getGapVfnCount = function(case_id){
       return new Promise((resolve,reject)=>{
         gapvfn
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getIdentityCount = function(case_id){
       return new Promise((resolve,reject)=>{
         identity
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getOfacCount = function(case_id){
       return new Promise((resolve,reject)=>{
         ofac
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getPassportCount = function(case_id){
       return new Promise((resolve,reject)=>{
         passport
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getPsychometricStandardCount = function(case_id){
       return new Promise((resolve,reject)=>{
         physostan
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getRefBasicCount = function(case_id){
       return new Promise((resolve,reject)=>{
         refbasic
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getReferenceCount = function(case_id){
       return new Promise((resolve,reject)=>{
         reference
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getSiteCheckCount = function(case_id){
       return new Promise((resolve,reject)=>{
         sitecheck
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getSocialMediaCount = function(case_id){
       return new Promise((resolve,reject)=>{
         socialmedia
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getVddAdvanceCount = function(case_id){
       return new Promise((resolve,reject)=>{
         vddadvance
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    let getVoterIdCount = function(case_id){
       return new Promise((resolve,reject)=>{
         voterid
        .count({case:case_id})
        .then(data=>{
           resolve(data)
        })
        .catch(err=>{
           resolve(0)
        })
      })
    }
    
    prepareReport()
    async function prepareReport(){
	console.log("Will call the get status now ",req.query.fromDate)    
        let cases = await getCases()
/*	console.log("Case contains ",cases[0])    
	console.log("First Case",cases[0]._id)
	console.log("Last Case ",cases[(cases.length)-1]._id)    
	let filter = {_id:{$in:cases}}    
        let docs = await Case.aggregate()
		    .match(filter)
	            .lookup({from:"addresses",localField:"_id",foreignField:"case",as:"addresses"}) 
	            .lookup({from:"addresscomprehensives",localField:"_id",foreignField:"case",as:"addresscomprehensives"})
	            .lookup({from:"addressonlines",localField:"_id",foreignField:"case",as:"addressonlines"})
	            .lookup({from:"addresstelephones",localField:"_id",foreignField:"case",as:"addresstelephones"})
	            .lookup({from:"clients",localField:"client",foreignField:"_id",as:"clientdetails"})
	            .lookup({from:"subclients",localField:"subclient",foreignField:"_id",as:"subclientdetails"}) */
	
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",		
            "Content-Disposition",
            "attachment; filename=" + "de_status_report.xlsx"
        )
	console.log("About to return WorkBook")    
        return workBook.xlsx.write(res)
        .then(function(){
            res.status(200).end()
        })    
//        res.json({message:"Successful"})
    }
}
 
