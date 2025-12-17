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
const ClientContract = require('../../models/administration/client_contract.model')
const ClientContractComponent = require('../../models/administration/client_contract_component.model')
const ClientContractProfile = require('../../models/administration/client_contract_profile.model') 
const DefaultCalendar = require('../../models/administration/default_calendar.model')
const moment = require('moment')
const fs =require('fs')

exports.getTLTrackerReport = (req,res)=>{
    console.log("In TL Tracker Report...")	
    console.log("Report type required is ...................................................",req.query.reportType)	
    const workBook = new  ExcelJS.Workbook()
    console.log("Workbook constructed")	
    const sheet = workBook.addWorksheet('TL Pending')
    console.log("Sheet added")	
    let headerRow = sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Component","Status","Initiation Date","Insuff Raised Date","Insuff Cleared Date","TAT End Date","Verifier","FE","Vendor","VerificationCompletionDate","Verified By","Mentor Review Completion Date","Mentor Review Completed By","Output QC Completion Date","Output QC Completed By","Grading Color","Field 1","Field 2","Field 3","Field 4","Field 5","Field 6","Field 7","Field 8","Field 9","Field 10"])
   headerRow.eachCell((cell, number) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { argb: 'FF0000FF' }
  }
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  });	
    let query = ""
    if(req.query.reportType=='PENDING'){
      query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"}}]}	    
    }	
//    let query = {$and:[{status:{$ne:"MENTOR-REVIEW-ACCEPTED"},status:{$ne:"OUTPUTQC-ACCEPTED"}}]}
    if(req.query.reportType == 'COMPLETED'){
      query = {$and:[{$or:[{status:'MENTOR-REVIEW-ACCEPTED'},{status:'OUTPUTQC-ACCEPTED'}]},{mentorReviewCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}}]} 	    
    }
//    console.log("Query being applied is ",query)	
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
    let getTatDays = function(client,initiationDate,component,profile){
        return new Promise((resolve,reject)=>{
//           console.log("Trying to get TAT days")	
           if(profile == null){   
   	       ClientContract
               .findOne({client:client,effectiveDate:{$lte:initiationDate},expiryDate:{$gte:initiationDate}})	
	       .then(data=>{
	          if(data != null){
                    ClientContractComponent
		    .findOne({clientContract:data._id,component:component})
		    .then(clientContractComponentData=>{
		       if(clientContractComponentData != null){	
 	                  resolve(clientContractComponentData.tat)		
	               }else{
		          resolve(0)	   
		       }		   
		    })
		    .catch(err=>{
//		       console.log("Error finding client contract component ",component)	
	               resolve(0)		
		    })      
	          }else{
		    resolve(0)	  
		  }   	   
	       })
               .catch(err=>{
                  console.log("Error finding client contract")		   
	          resolve(0)	   
	       })
	   }else{
              ClientContractProfile
              .findOne({_id:profile})
	      .then(data=>{
		 if(data != null){
	           resolve(data.tat)		 
		 }else{
		   resolve(0) 	 
		 }      
	      })
	      .catch(err=>{
		 resolve(0)     
	      })	   
	   }	   
	}) 	    
    }
    let getHolidays = function(date1,date2){
	return new Promise((resolve,reject)=>{
          DefaultCalendar
         .find({date:{$gte:date1,$lte:date2}})
         .then(data=>{
//      console.log("got holiday data",data)
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
	   let cDate1 = new Date(date1)
	   let cDate2 = new Date(date2)    
           while(cDate1 < cDate2){
              if(cDate1.getDay() == 0 || cDate2.getDay()== 6){
//            console.log("Adding 1 to count")
                 count ++
              }
              cDate1.setDate(cDate1.getDate()+1)
           }
           resolve(count)
       })
    }
	
    let differenceInDays = function(startDate,endDate){
      return new Promise((resolve,reject)=>{
	      
      })	    
    }	
    let getEmploymentDetails = function(){
        return new Promise((resolve,reject)=>{
            employment
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
	    .populate({path:'mentorReviewCompletedBy'})	
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
		   let componentDisplayName = "Employment"    	
		   if(item.component != null){
		     componentDisplayName = item.component.displayName	   
	           }		  
	           let verificationCompletionDate = null
		   let mentorReviewCompletionDate = null
		   let mentorReviewCompletedBy = null	
	           let outputqcCompletionDate = null
		   let outputqcCompletedBy = null 	
		   let gradingColor = null	
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
		   	
		   if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
	             verificationCompletionDate = item.verificationCompletionDate
		     mentorReviewCompletionDate = item.mentorReviewCompletionDate
		     mentorReviewCompletedBy = item.mentorReviewCompletedBy
		     outputqcCompletionDate = item.outputqcCompletionDate
		     if(item.case.outputqcCompletedBy != null){	  
      		        outputqcCompletedBy = item.case.outputqcCompletedBy.name	   
		     }	     
		     if(item.mentorReviewCompletedBy != null){
			mentorReviewCompletedBy = item.mentorReviewCompletedBy.name     
		     }	   
	             if(item.grade != null){
			gradingColor = await getGradingColor(item.grade)     
		     }		   
		   }
/*		   let cannotCalculate = false	
		   let insuffDays = 0
		   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
		     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
		     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')	   
		     insuffDays = endDate.diff(startDate,'days')	
	           }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
		     cannotCalculate = true 	   
		   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
		     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
		     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
		     insuffDays = endDate.diff(startDate,'days')	   
		   }
	          		
		   let tempTatEndDate = moment(item.initiationDate).add((tatDays+insuffDays),'days').toDate()
		   let holidays = await getHolidays(item.case.initiationDate,tempTatEndDate)	
		   let weeklyOffs = await getNumberOfWeekends(item.case.initiationDate,tempTatEndDate)
	           tatDays = tatDays + holidays + weeklyOffs		
		   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
		   let insuffRaisedDate = null
		   let insuffClearedDate = null
		   if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
		       insuffRaisedDate = null
		       insuffClearedDate = null	   
		   }else if(item.insufficiencyRaisedDate > item.insufficiencyClearedDate){
		      insuffRaisedDate = null
		      insuffClearedDate = null	   
		   }else{
		      insuffRaisedDate = item.insufficiencyRaisedDate
		      insuffClearedDate = item.insufficiencyClearedDate	   
		   }	

                   let cannotCalculate = false
                   let insuffDays = 0
                   if(insuffRaisedDate != null && insuffClearedDate != null){
                     let startDate = moment(insuffRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insuffClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(insuffRaisedDate != null && insuffClearedDate == null){
                     cannotCalculate = true
                   }else if(insuffRaisedDate == null && insuffClearedDate != null){
//                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
//                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = 0
                   }

                   let tempTatEndDate = moment(item.case.initiationDate).add((tatDays+insuffDays),'days').toDate()
                   let holidays = await getHolidays(item.case.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.case.initiationDate,tempTatEndDate)
//                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add((tatDays+holidays+weeklyOffs+insuffDays),'days').format("DD-MMM-YYYY")
			

	           sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,insuffRaisedDate,insuffClearedDate,tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving,holidays,weeklyOffs,tatDays])		
		})
		resolve(data)    
            })
            .catch(err=>{
//		console.log("Error in writing tl pending for employment",err)    
                console.log("Error Writing tl pending ",err)		    
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
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
	    .populate({path:'mentorReviewCompletedBy'})	
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
                       if(item.allocatedToVendor != null){i

                         vendor = item.allocatedToVendor.name
                       }
                       let componentDisplayName = "Employment - Basic"
                       if(item.component != null){
                          componentDisplayName = item.component.displayName
                       }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			   
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			   
                   if(item.status=='MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let insuffRaisedDate = null
                   let insuffClearedDate = null
                   if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                       insuffRaisedDate = null
                       insuffClearedDate = null
                   }else if(item.insufficiencyRaisedDate > item.insufficiencyClearedDate){
                      insuffRaisedDate = null
                      insuffClearedDate = null
                   }else{
                      insuffRaisedDate = item.insufficiencyRaisedDate
                      insuffClearedDate = item.insufficiencyClearedDate
                   }

                   let cannotCalculate = false
                   let insuffDays = 0
                   if(insuffRaisedDate != null && insuffClearedDate != null){
                     let startDate = moment(insuffRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insuffClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(insuffRaisedDate != null && insuffClearedDate == null){
                     cannotCalculate = true
                   }else if(insuffRaisedDate == null && insuffClearedDate != null){
//                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
//                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = 0
                   }

                   let tempTatEndDate = moment(item.case.initiationDate).add(tatDays,'days').toDate()
                   let holidays = await getHolidays(item.case.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.case.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/

                   let cannotCalculate = false
                   let insuffDays = 0
                   if(insuffRaisedDate != null && insuffClearedDate != null){
                     let startDate = moment(insuffRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insuffClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(insuffRaisedDate != null && insuffClearedDate == null){
                     cannotCalculate = true
                   }else if(insuffRaisedDate == null && insuffClearedDate != null){
//                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
//                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = 0
                   }

                   let tempTatEndDate = moment(item.case.initiationDate).add(tatDays,'days').toDate()
                   let holidays = await getHolidays(item.case.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.case.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")

			   
			   
                       sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,insuffRaisedDate,insuffiClearedDate,tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
                })
                resolve(data)
            })
            .catch(err=>{
		console.log("Error Writing tl pending ",err)    
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
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'mentorReviewCompletedBy'})		
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
		   let componentDisplayName = "Employment - Advanced"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }	

                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs*/
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
                })


                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    } 
    
    let getEducationDetails = function(){
//	console.log("In education details of tl pending")    
        return new Promise((resolve,reject)=>{
            education
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'verificationAllocatedTo'})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
            .then(data=>{
//	         console.log("go the education details.............................",data.length)	
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
                    let componentDisplayName = "Employment"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }		

                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			 
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			 
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs*/
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
			 
			 
			 
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })    

                resolve(data)
            })
            .catch(err=>{
//		console.log("Error in tl pending education listing ",err)    
		 console.log("Error Writing tl pending ",err)
                reject()
            })
        })

    }     
    let getEducationAdvancedDetails = function(){
//	console.log("In Education Advanced Details")    
        return new Promise((resolve,reject)=>{
            educationadvanced
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'}) 	
	    .populate({path:'personalDtailsData'})	
            .then(data=>{
//		 console.log("Data for Education Advacned in TL Tracker is..............",data)   
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
		   let componentDisplayName = "Education Advanced"
	           if(item.component != null){
		     componentDisplayName = item.component.displayName	   
		   }		 
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			 
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			 
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs*/
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
			 
			 
//                   console.log("In Education Advanced......adding to tracker",item.case.caseId)        
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofuniverskty,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
//                  console.log("Added data to sheet",item.case.caseId)			 
                })
//                console.log("Resolving data in education advanced")

                resolve(data)
            })
            .catch(err=>{
//		console.log("Error in Education Advanced",err)    
		 console.log("Error Writing tl pending ",err)		
                reject()
            })
        })

    }     
    let getEducationComprehensiveDetails = function(){
        return new Promise((resolve,reject)=>{
            educationcomprehensive
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompetedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
//		console.log("Length of Education Comprehensive in TL Pending is ",data.length)    
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
                   let componentDisplayName = "Education Comprehensive"
                   if(item.component != null){
                     componentDisplayName = item.component.displayName
                   }
//                   if(item.case == null){
//		     console.log("Item case for education comprehensive is null",item);	   
//		   } 		

                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/


                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })



                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
//		conole.log("I education comprehensive error",err)    
                reject()
            })
        })

    }     

    let getUserName = function(user_id){
       return new Promise((resolve,reject)=>{
//	  console.log("Trying to get user name for id ",user_id)     
	  User
	  .findOne({_id:user_id})
	  .then(data=>{
             if(data != null){		  
//                console.log("Got user name",data.name)
	     }else{
//		console.log("Name null for ",user_id)     
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
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
//            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
//                console.log("in address component for tl pending ",data.length)		
                data.forEach(async item=>{
                   let verifier = ""
                   if(item.verificationAllocatedTo != null){
//                     verifier = item.verificationAllocatedTo.name
		       verifier = await getUserName(item.verificationAllocatedTo)
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
                   let contactNumber=""			
/*	           if(item.personalDetailsData != null){
	              contactNumber = item.personalDetailsData.mobilename		   
                   } 			   */

                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
            			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact,contactNumber])
                })


                resolve(data)
            })
            .catch(err=>{
                console.log("Error Writing tl pending ",err)		    
//		console.log("Error in address component ",err)    
                reject()
            })
        })

    }         
    let getAddressComprehensiveDetails = function(){
        return new Promise((resolve,reject)=>{
            addresscomprehensive
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
//                console.log("In address comprehensive for tl pending ",data.length)
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.component.displayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.fulladdress,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })
    


                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }             
    let getAddressOnlineDetails = function(){
        return new Promise((resolve,reject)=>{
            addressonline
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.component.displayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.fulladdwithpin,item.landmark,item.pin,item.city,item.typeofaddress,item.tenure,item.primarycontact,item.alternatecontact])
                })



                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                 
    let getAddressTelephoneDetails = function(){
        return new Promise((resolve,reject)=>{
            addresstelephone
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,item.component.displayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })
    

                resolve(data)
            })
            .catch(err=>{
	         console.log("Error Writing tl pending ",err)	    
                reject()
            })
        })

    }                 
    let getCourtRecordDetails = function(){
        return new Promise((resolve,reject)=>{
            courtrecord
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
/*                   let cannotCalculate = false
                   let insuffDays = 0
                   if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.insufficiencyRaisedDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }else if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate == null){
                     cannotCalculate = true
                   }else if(item.insufficiencyRaisedDate == null && item.insufficiencyClearedDate != null){
                     let startDate = moment(item.case.initiationDate,'YYYY-MM-DD')
                     let endDate = moment(item.insufficiencyClearedDate,'YYYY-MM-DD')
                     insuffDays = endDate.diff(startDate,'days')
                   }

                   let tempTatEndDate = moment(item.initiationDate).add(tatDays,'days')
                   let holidays = await getHolidays(item.initiationDate,tempTatEndDate)
                   let weeklyOffs = await getNumberOfWeekends(item.initiationDate,tempTatEndDate)
                   tatDays = tatDays + holidays + weeklyOffs + insuffDays
                   let tatEndDate = moment(item.case.initiationDate).add(tatDays,'days').format("DD-MMM-YYYY")*/
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatEndDate,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReivewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.addresswithpin,item.pin,item.city,item.typeofaddress,item.tenure,item._id])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
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
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.fulladdress,item.pin,item.city,item.typeofaddress,item.tenureofstay,item._id])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
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
	    .populate({path:'case',populate:{path:'outputqcCompetedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofreference,item.deisgnation,item.contactdetails])
                })


                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                         
    let getRefBasicDetails = function(){
        return new Promise((resolve,reject)=>{
            refbasic
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)		       
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)		       
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
		       
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.name,item.designation,item.contact])
                })
    

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                        
    
    let getIdentityDetails = function(){
        return new Promise((resolve,reject)=>{
            identity
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.typeofid,item.nameasperid,item.idnumber,item.issuedby])
                })

		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                            
    let getCreditCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            creditcheck
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedby'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReviewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.taxid,item.nameasperpan,item.dateofbirth,item.issuedby])
                })



                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                                
    let getCreditTransDetails = function(){
        return new Promise((resolve,reject)=>{
            credittrans
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.pannumber,item.nameasperpan,item.dateofbirth,item.issuedby])
                })
    


                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                                
    let getCreditEquifaxDetails = function(){
        return new Promise((resolve,reject)=>{
            creditequifax
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.pannumber,item.panname,item.dobofpan,item.gender,item.fulladdress,item.contact,item.altcontact])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                                    

    let getGlobaldatabaseDetails = function(){
        return new Promise((resolve,reject)=>{
            globaldatabase
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
	           let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)		
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.searchname])
                })
 		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                                        

    let getDrugTestFiveDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestfive
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
                })
 

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                                            
    let getDrugTestSixDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestsix
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
		   	
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
                })


                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                  
    
    let getDrugTestSevenDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestseven
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }

                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemploybee,item.fulladdress,item.pin,item.city,item.contactnumber])
                })

		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                    
    let getDrugTestEightDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtesteight
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployee,item.address,item.pin,item.city,item.contact])
                })

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }
    let getDrugTestNineDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestnine
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyCleredDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.consent,item.fulladdress,item.pin,item.city,item.contact])
                })
		    
		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }    

    let getDrugTestTenDetails = function(){
        return new Promise((resolve,reject)=>{
            drugtestten
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.nameofemployee,item.address,item.pin,item.city,item.contact])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }        
    let getDlCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            dlcheck
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                     componentDisplayNane = item.component.displayName
                   }
		   let uniqueId = ""
		   if(item.personalDetailsData != null){
	             uniqueId = item.personalDetailsData.uniqueid 		   
		   }	
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
//		   let pan = ""
//		   if(item.personalDetailsData != null){
//		       pan = personalDetailsData.uniqueid	   
//		   }
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.dlnumber,item.nameperdl,item.dob,item.issuedate,item.dlvalid,uniqueId,item.case._id])
                })

		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }            
    let getDirectorshipCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            directorshipcheck
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.directorname,item.dinnumber,item.dob,item.verifiedon])
                })
    

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }            

    let getVoterIdDetails = function(){
        return new Promise((resolve,reject)=>{
            voterid
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	 
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			 
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status == 'MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			 
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.epicnumber,item.epicname,item.fulladdress,item.pin,item.city,item.contactnumber])
                })
   

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }
    
    let getVddAdvanceDetails = function(){
        return new Promise((resolve,reject)=>{
            vddadvance
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.companyname,item.regdadd,item.cin,item.pan,item.gst])
                })
    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }    
    let getBankStmtDetails = function(){
        return new Promise((resolve,reject)=>{
            bankstmt
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.tenure,item.nameofbank,item.transaction])
                })
    

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }    
    let getSiteCheckDetails = function(){
        return new Promise((resolve,reject)=>{
            sitecheck
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}}) 	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.name,item.fulladdress,item.pin,item.city])
                })
    

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }    
    let getPsychometricDetails = function(){
        return new Promise((resolve,reject)=>{
            physostan
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.name,item.emailid,item.contact,item.gender])
                })
    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }    

    let getSocialMediaDetails = function(){
        return new Promise((resolve,reject)=>{
            socialmedia
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.searchname])
                })
		    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }        

    let getFacisl3Details = function(){
        return new Promise((resolve,reject)=>{
            facisl3
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.applicantname,item.dateofbirth,item.stcode])
                })
    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }            
    let getOfacDetails = function(){
        return new Promise((resolve,reject)=>{
            ofac
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReivewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.candname,item.ofac])
                })
 

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }        

    let getGapVfnDetails = function(){
        return new Promise((resolve,reject)=>{
            gapvfn
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReviewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
		   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)	
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.tenureofgap,item.reasonforgap,item.address,item.PIN,item.CITY])
                })
    
                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }            
    let getPassportDetails = function(){
        return new Promise((resolve,reject)=>{
            passport
            .find(query)
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
	    .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'mentorReviewCompletedBy'})		
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
                   let verificationCompletionDate = null
                   let mentorReviewCompletionDate = null
                   let mentorReviewCompletedBy = null
                   let outputqcCompletionDate = null
                   let outputqcCompletedBy = null
                   let gradingColor = null
//                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component)			
                   let tatDays = await getTatDays(item.case.subclient.client,item.case.initiationDate,item.component,item.case.profile)			
                   if(item.status=='OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED'){
                     verificationCompletionDate = item.verificationCompletionDate
                     mentorReviewCompletionDate = item.mentorReviewCompletionDate
                     mentorReviewCompletedBy = item.mentorReviewCompletedBy
                     outputqcCompletionDate = item.outputqcCompletionDate
                     if(item.case.outputqcCompletedBy != null){
                        outputqcCompletedBy = item.case.outputqcCompletedBy.name
                     }
                     if(item.mentorReviewCompletedBy != null){
                        mentorReviewCompletedBy = item.mentorReviewCompletedBy.name
                     }
                     if(item.grade != null){
                        gradingColor = await getGradingColor(item.grade)
                     }
                   }
			
                   sheet.addRow([item.case.caseId,item.case.candidateName,item.case.subclient.client.name,item.case.subclient.name,componentDisplayName,item.status,item.case.initiationDate,item.insufficiencyRaisedDate,item.insufficiencyClearedDate,tatDays,verifier,fe,vendor,verificationCompletionDate,verifier,mentorReviewCompletionDate,mentorReviewCompletedBy,outputqcCompletionDate,outputqcCompletedBy,gradingColor,item.givenname,item.lastname,item.issuecountry,item.nationality,item.passportnumber,item.expirydate])
                })
 

                resolve(data)
            })
            .catch(err=>{
		 console.log("Error Writing tl pending ",err)    
                reject()
            })
        })

    }                
    prepareReport()
    async function prepareReport(){
	try{   
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
		console.log("Added education details")    
            }else if(item.component.name == 'educationadvanced'){
                let educationAdvancedDetails = await getEducationAdvancedDetails()
		console.log("Added Education advanced details")   
            }else if(item.component.name == "educationcomprehensive"){
                let educationComprehensiveDetails = await getEducationComprehensiveDetails()
		console.log("Added education comprehensive details")    
            }else if(item.component.name == 'address'){
                let addressDetails = await getAddressDetails()
		console.log("Added address details")    
            }else if(item.component.name == 'addresscomprehensive'){
                let addressComprehensiveDetails = await getAddressComprehensiveDetails()
		console.log("Added address comprehensive details")    
            }else if(item.component.name == 'addressonline'){
                let addressOnlineDetails = await getAddressOnlineDetails()
		console.log("Added address online details")
            }else if(item.component.name == 'addresstelephone'){
                let addressTelephoneDetails = await getAddressTelephoneDetails()
		console.log("Added address telephone details")    
            }else if(item.component.name == 'courtrecord'){
                let courtRecordDetails = await getCourtRecordDetails()
		console.log("Added court record details")    
            }else if(item.component.name == 'criminalrecord'){
                let criminalRecordDetails = await getCriminalRecordDetails()
		console.log("Added criminal record details")    
            }else if(item.component.name == 'reference'){
                let referenceRecordDetails = await getReferenceDetails()
		console.log("Added refrence details")    
            }else if(item.component.name == 'refbasic'){
                let refBasicDetails = await getRefBasicDetails()
		console.log("Added ref baic details")    
            }else if(item.component.name == 'identity'){
                let identityDetails = await getIdentityDetails()
		console.log("Added identity details")    
            }else if(item.component.name == 'creditcheck'){
                let creditCheckDetails = await getCreditCheckDetails()
		console.log("Added credit check details")    
            }else if(item.component.name == 'credittrans'){
                let credittransDetails = await getCreditTransDetails()
		console.log("Added credit trans details")    
            }else if(item.component.name == 'creditequifax'){
                let creditEquifaxDetails = await getCreditEquifaxDetails()
		console.log("Added credit equifax details")    
            }else if(item.component.name == 'globaldatabase'){
                let globaldatabaseDetails = await getGlobaldatabaseDetails()
		console.log("Added global database details")    
            }else if(item.component.name == 'drugtestfive'){
                let drugtestfiveDetails = await getDrugTestFiveDetails()
		console.log("Added drug test five details")    
            }else if(item.component.name == 'drugtestsix'){
                let drugtestsixDetails = await getDrugTestSixDetails()
		console.log("Added drug test six details")    
            }else if(item.component.name == 'drugtestseven'){
                let drugtestsevenDetails = await getDrugTestSevenDetails()
		console.log("Added drug test seven detail")    
            }else if(item.component.name == 'drugtesteight'){
                let drugtesteightDetails = await getDrugTestEightDetails()
		console.log("Added drug test eight details")    
            }else if(item.component.name == 'drugtestnine'){
                let drugtestnineDetails = await getDrugTestNineDetails()
		console.log("Added drug test nine details")    
            }else if(item.component.name == 'drugtestten'){
                let drugtesttenDetails = await getDrugTestTenDetails()
		console.log("Added drug test ten details")    
            }else if(item.component.name == 'dlcheck'){
                let dlCheckDetails = await getDlCheckDetails()
		console.log("Added dl check cetails")    
            }else if(item.component.name == 'directorshipcheck'){
                let directorshipCheckDetails = await getDirectorshipCheckDetails()
		console.log("Added directorship check details")    
            }else if(item.component.name == 'voterid'){
                let voterIdDetails = await getVoterIdDetails()
		console.log("Added voter id details")    
            }else if(item.component.name == 'vddadvance'){
                let vddAdvanceDetails = await getVddAdvanceDetails()
		console.log("Added vdd advance details")    
            }else if(item.component.name == 'bankstmt'){
                let dlBankStmtDetails = await getBankStmtDetails()
		console.log("Added bank statement details")    
            }else if(item.component.name == 'sitecheck'){
                let siteCheckDetails = await getSiteCheckDetails()
		console.log("Added sit check details")    
            }else if(item.component.name == 'physostan'){
                let psychometricDetails = await getPsychometricDetails()
		console.log("Added psychometric details")    
            }else if(item.component.name == 'socialmedia'){
                let socialmediaCheckDetails = await getSocialMediaDetails()
            }else if(item.component.name == 'facisl3'){
                let facisl3Details = await getFacisl3Details()
            }else if(item.component.name == 'ofac'){
                let ofacDetails = await getOfacDetails()
            }else if(item.component.name == 'gapvfn'){
                let gapvfnDetails = await getGapVfnDetails()
            }else if(item.component.name == 'passport'){
                let passportDetails = await getPassportDetails()
            }
        }
	}catch(err){
            console.log("Error in tl pending is ",err)
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
	    
/*       workbook
	.xlsx
        .writeFile(`/REPO_STORAGE/tmp/tl_tracker.xlsx`)
	.then(()=>{
           res.download(`/REPO_STORAGE/tmp/tl_tracker.xlsx`,(err)=>{
             if(err){
               res.status(500).send({
                 message:"Could not download  the file"
               })
             }
           })
	})   
	.catch(err=>{
            console.log("Could not wirte file",err)
            res.status(500).send({
              message:"Could not download  the file"
            })
	})    */
//          res.download("")
//            res.json({message:"Successful"})
//        docx.Packer.toBlob(doc).then(data=>{
//            res.json(data)

/*        })
        .catch(err=>{
            res.status(500).json({
                message:"Error"
            })
        })    */
	    
//        res.json({message:"Successful"})
    }

 }
