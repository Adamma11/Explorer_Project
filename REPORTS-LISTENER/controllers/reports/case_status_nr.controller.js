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
const fs = require('fs')


exports.getCaseStatusReport = (req,res)=>{
 let colorMasterDetails = new Array()

 	
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
    let ar = sheet.addRow(["Case Id","Candidate Name","Candidate Id","Client","Subclient","Profile Name","Initiation Date","Insuff. Raised Date","Insuff. Cleared Date","TAT End Date","Status","Grade","Closure Type","Completion Date","TAT Days","Actual Days Taken","Ref","Check 1 - Name","Check 1 - Field 1","Check 1 - Field 2","Check 1 - Field 3","Check 1 - Status","Check 1 - Completion Date","Check 1 - Color Code","Check 2 - Name","Check 2 - Field 1","Check 2 - Field 2","Check 2 - Field 3","Check 2 - Status","Check 2 - Completion Date","Check 2 - Color Code","Check 3 - Name","Check 3 - Field 1","Check 3 - Field 2","Check 3 - Field 3","Check 3 - Status","Check 3 - Completion Date","Check 3 - Color Code","Check 4 - Name","Check 4 - Field 1","Check 4 - Field 2","Check 4 - Field 3","Check 4 - Status","Check 4- Completion Date","Check 4 - Color Code","Check 5 - Name","Check 5 - Field 1","Check 5 - Field 2","Check 5 - Field 3","Check 5 - Status","Check 5 - Completion Date","Check 5 - Color Code","Check 6 - Name","Check 6 - Field 1","Check 6 - Field 2","Check 6 - Field 3","Check 6 - Status","Check 6 - Completion Date","Check 6 - Color Code","Check 7 - Name","Check 7 - Field 1","Check 7 - Field 2","Check 7 - Field 3","Check 7 - Status","Check 7 - Completion Date","Check 7 - Color Code","Check 8 - Name","Check 8 - Field 1","Check 8 - Field 2","Check 8 - Field 3","Check 8 - Status","Check 8 - Completion Date","Check 8 - Color Code","Check 9 - Name","Check 9 - Field 1","Check 9 - Field 2","Check 9 - Field 3","Check 9 - Status","Check 9 - Completion Date","Check 9 - Color Code","Check 10 - Name","Check 10 - Field 1","Check 10 - Field 2","Check 10 - Field 3","Check 10 - Status","Check 10 - Completion Date","Check 10 - Color Code","Check 10 - Name","Check 11 - Field 1","Check 11 - Field 2","Check 11 - Field 3","Check 11 - Status","Check 11 - Completion Date","Check 11 - Color Code","Check 12 - Name","Check 12 - Field 1","Check 12 - Field 2","Check 12 - Field 3","Check 12 - Status","Check 12 - Completion Date","Check 12 - Color Code","Check 13 - Name","Check 13 - Field 1","Check 13 - Field 2","Check 13 - Field 3","Check 13 - Status","Check 13 - Completion Date","Check 13 - Color Code","Check 14 - Name","Check 14 - Field 1","Check 14 - Field 2","Check 14 - Field 3","Check 14 - Status","Check 14 - Completion Date","Check 14 - Color Code","Check 15 - Name","Check 15 - Field 1","Check 15 - Field 2","Check 15 - Field 3","Check 15 - Status","Check 15 - Completion Date","Check 15 - Color Code","Check 16 - Name","Check 16 - Field 1","Check 16 - Field 2","Check 16 - Field 3","Check 16 - Status","Check 16 - Completion Date","Check 16 - Color Code","Check 17 - Name","Check 17 - Field 1","Check 17 - Field 2","Check 17 - Field 3","Check 17 - Status","Check 17 - Completion Date","Check 17 - Color Code" ,"Check 18 - Name","Check 18 - Field 1","Check 18 - Field 2","Check 18 - Field 3","Check 18 - Status","Check 18 - Completion Date","Check 18 - Color Code","Check 19 - Name","Check 19 - Field 1","Check 19 - Field 2","Check 19 - Field 3","Check 19 - Status","Check 19 - Completion Date","Check 19 - Color Code","Check 20 - Name","Check 20 - Field 1","Check 20 - Field 2","Check 20 - Field 3","Check 20 - Status","Check 20 - Completion Date","Check 20 - Color Code"])
     

    ar.commit()
/*    CellRange range = worksheet.Range["A2:A100"];
    Formatting rangeFormatting = range.BeginUpdateFormatting();
    rangeFormatting.Font.Color = Color.Blue;
    rangeFormatting.Fill.BackgroundColor = Color.LightBlue;
    rangeFormatting.Fill.PatternType = PatternType.LightHorizontal;
    rangeFormatting.Fill.PatternColor = Color.Violet;
    range.EndUpdateFormatting(rangeFormatting);    */
  //  console.log("date from and to are ",req.query.dateFrom)
    let query = {status:{$ne:'OUTPUTQC-ACCEPTED'}}
    if(req.query.reportfor == 'PENDING'){
      query = {status:{$ne:'OUTPUTQC-ACCEPTED'}}	    
    }
    if(req.query.reportfor == 'COMPLETED'){
      query = {status:"OUTPUTQC-ACCEPTED",outputqcCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo+"T23:59:59.999Z"}}	    
    }	   
    if(req.query.reportfor == 'INITIATION-DATE'){
      query = {initiationDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo+"T23:59:59.999Z"}}	    
    }	    
    if(req.query.reportFor == 'CLIENT'){
      query = {client:req.query.client}	    
    }	    
    let query1 = {user:req.user.user_id}
    if(req.params.client_id !="-"){
        query1 = {user:req.user.user_id,client:req.params.client_id}
    }



//    let query = {status:{$ne:'OUTPUTQC-ACCEPTED'}}
    let getSubclientsForTheUser = function(){
        return new Promise((resolve,reject)=>{
            UserSubclientAccess
            .find(query1,{_id:0,subclient:1})
            .then(data=>{
//                console.log("subclients are ",data);
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
//	console.log("Trying to fetch employment details for case status report for the case ")    
        return new Promise((resolve,reject)=>{
            employment
            .find({case:acase})
	    .lean()	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""             
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
	           if(details != ""){
                	details = details + "^" + (item.component != null ? item.component.displayName:"Employment")	   
	           }else{
			details = (item.component != null ? item.component.displayName:"Employment")   
	           }		   
                   details = details + "^" + item.empstatus + "^" + item.nameofemployer + "^" + item.branch + "^" + ((item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status  == "MENTOR-REVIEW-ACCEPTED" || item.status=='OUTPUTQC-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
//	           sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])		
		})
		resolve(details)    
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                   let details = ""
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
		      if(details != ""){
			 details  = details + "^" + (item.component != null ? item.component.displayName:"Employment - Basic")      
		      }else{
			 details  = (item.component != null ? item.component.displayName:"Employment - Basic")     
		      }	      
		      details = details  + "^" + item.empstatus + "^" + item.nameofemployer + "^" + item.branch + "^" + ((item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status  == "MENTOR-REVIEW-ACCEPTED" || item.status =='OUTPUTQC-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")	   
//                       sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
                })
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
            .populate({path:'personalDetailsData'})		
            .then(data=>{
		let details = ""    
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
                   if(details != ""){
                      details  = details + "^" + (item.component != null ? item.component.displayName:"Employment - Advanced")
                   }else{
                      details  = item.component != null ? item.component.displayName:"Employment - Advanced"
                   }
                   details = details  + "^" + item.empstatus + "^" + item.nameofemployer + "^" + item.branch + "^" + ((item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status=='OUTPUTQC-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status  == "OUTPUTQC-ACCEPTED" || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployer,item.branch,item.deputedto,item.empstatus,item.empid,item.doj,item.lwd,item.designation,item.reportingmgr,item.reasonforleaving])
                })


                resolve(details)
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
	    .lean()	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})
            .then(data=>{
		 let details = ""   
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
                   if(details != ""){
                      details  = details + "^" + (item.component != null ? item.component.displayName:"Education")
                   }else{
                      details  = (item.component != null ? item.component.displayName:"Education")
                   }
                   details = details  + "^" + item.nameofuniversity + "^" + item.qualification + "^" + item.specialization + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status =='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			 
//                   sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })    

                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'}) 	
	    .populate({path:'personalDtailsData'})	
            .then(data=>{
		 let details  = ""   
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
                   if(details != ""){
                      details  = details + "^" + (item.component != null ? item.component.displayName:"Education - Advanced")
                   }else{
                      details  = item.component != null ? item.component.displayName:"Education - Advanced"
                   }
                   details = details  + "^" + item.nameofuniverskty + "^" + item.qualification + "^" + item.specialization + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			 
//                   sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofuniverskty,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })


                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""
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
                   if(details != ""){
                      details  = details + "^" + (item.component != null ?item.component.displayName:"Education - Comprehensive")
                   }else{
                      details  = item.component != null ? item.component.displayName:"Education - Comprehensive"
                   }
                   details = details  + "^" + item.nameofuniversity + "^" + item.qualification + "^" + item.specialization + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status  == "OUTPUTQC-ACCEPTED" || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofuniversity,item.nameofschool,item.cityofstudy,item.typeofqualification,item.qualification,item.specialization,item.rollnumber,item.yearofjoining,item.yearofcompletion,item.marks])
                })

                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""		
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
		   let componentDisplayName = "Address Verification - Advanced"	
		   if(item.component != null){
	             componentDisplayName = item.component.displayName		   
                   }			  
                   let contactNumber=""			
	           if(item.personalDetails != null){
	              contactNumber = item.personalDetails.mobilename		   
                   } 			   
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.address + "^" + item.pin + "^" + item.city + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTE')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + (item.status  == "OUTPUTQC-ACCEPTED" ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")


//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact,contactNumber])
                })


                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details = ""    
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
		   let componentDisplayName = "Address Verification - Comprehensive"	
		   if(item.component != null){
		     componentDisplayNane = item.component.displayName	   
	           }		 
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status  == "OUTPUTQC-ACCEPTED" || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.fulladdress,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })
    


                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""
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
                   let componentDisplayName = "Address Check - Online"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.fulladdresswithpin + "^" + item.pin + "^" + item.city + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status== 'MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status  == "OUTPUTQC-ACCEPTED" || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.fulladdresswithpin,item.landmark,item.pin,item.city,item.typeofaddress,item.tenure,item.primarycontact,item.alternatecontact])
                })



                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details  = ""
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
                   let componentDisplayName = "Address Check - Telephonic"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }

                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.address + "^" + item.pin + "^" + item.city + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status  == "OUTPUTQC-ACCEPTED" || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([item.component.displayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.address,item.landmark,item.pin,item.city,item.typeofaddress,item.tenureofstay,item.primarycontact,item.alternatecontact])
                })
    

                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
            .populate({path:'personalDetailsData'})		
            .then(data=>{
                let details = ""
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
                   let componentDisplayName = "Court Record Check - Online"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.addresswithpin + "^" + item.pin + "^" + item.city + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")


//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.addresswithpin,item.pin,item.city,item.typeofaddress,item.tenure])
                })
		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details  = ""    
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
                   let componentDisplayName = "Criminal Record Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.fulladdress + "^" + item.pin + "^" + item.city + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.fulladdress,item.pin,item.city,item.typeofaddress,item.tenureofstay])
                })
		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details  = ""    
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
                   let componentDisplayName = "Reference Check - Advanced"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.nameofreference + "^" + item.designation + "^" + item.contactdetails + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofreference,item.deisgnation,item.contactdetails])
                })


                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
               let details = ""
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
                   let componentDisplayName = "Reference Check - Basic"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.name + "^" + item.designation + "^" + item.contact + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
		       
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.name,item.designation,item.contact])
                })
    

                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details  = ""    
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
                   let componentDisplayName = "Identity Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.typeofid + "^" + item.idnumber + "^" + item.issuedby + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.typeofid,item.nameasperid,item.idnumber,item.issuedby])
                })

		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details = ""    
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
                   let componentDisplayName = "Credit Check - Basic"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.taxid + "^" + item.dateofbirth + "^" + item.issuedby + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.taxid,item.nameasperpan,item.dateofbirth,item.issuedby])
                })



                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
               let details  = ""
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
                   let componentDisplayName = "Credit Check - TransUnion"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.pannumber + "^" + item.dateofbirth + "^" + item.issuedby + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.pannumber,item.nameasperpan,item.dateofbirth,item.issuedby])
                })
    


                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""
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
                   let componentDisplayName = "Credit Check - Equifax"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.pannumber + "^" + item.dobofpan + "^" + item.contact + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.pannumber,item.panname,item.dobofpan,item.gender,item.fulladdress,item.contact,item.altcontact])
                })
		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
               let details  = ""
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
                   let componentDisplayName = "Global Database Search"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.searchname + "^" + "-" + "^" + "-" + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.searchname])
                })
 		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details  = ""    
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
                   let componentDisplayName = "Drug Test - 5 Panel"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.nameofemployee + "^" + item.fulladdress + "^" + item.contact + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
                })
 

                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details = ""    
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
                   let componentDisplayName = "Drug Test - 6 Panel"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.nameofemployee + "^" + item.fulladdress + "^" + item.contact + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployee,item.fulladdress,item.pin,item.city,item.contact])
                })


                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'}) 	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details  = ""
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
                   let componentDisplayName = "Drug Test - 7 Panel"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.nameofemploybee + "^" + item.fulladdress + "^" + item.contactnumber + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemploybee,item.fulladdress,item.pin,item.city,item.contactnumber])
                })

		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details = ""   
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
                   let componentDisplayName = "Drug Test - 8  Panel"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.nameofemployee + "^" + item.address  + "^" + item.contact + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployee,item.address,item.pin,item.city,item.contact])
                })

                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""
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
                   let componentDisplayName = "Drug Test - 9 Panel"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.fulladdress + "^" + item.city + "^" + item.contact + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.consent,item.fulladdress,item.pin,item.city,item.contact])
                })
		    
		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""
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
                   let componentDisplayName = "Drug Test - 10 Panel"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.nameofemployee + "^" + item.address + "^" + item.contact + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.nameofemployee,item.address,item.pin,item.city,item.contact])
                })
		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details = ""
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
                   let componentDisplayName = "Driving License Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.nameasperdl + "^" + item.issueddate + "^" + item.dlvalid + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
		   	
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.dlnumber,item.nameperdl,item.dob,item.issuedate,item.dlvalid])
                })

		    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""
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
                   let componentDisplayName = "Directorship Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.direcotorname + "^" + item.dinnumber + "^" + item.dob + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED') ? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.directorname,item.dinnumber,item.dob,item.verifiedon])
                })
    

                resolve(details)
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
            .lean()		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                 let details  = ""
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
                   let componentDisplayName = "Voter ID Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.epicnumber + "^" + item.fulladdress + "^" + item.contactnumber + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			 
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.epicnumber,item.epicname,item.fulladdress,item.pin,item.city,item.contactnumber])
                })
   

                resolve(details)
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
            .lean()		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details  = ""
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
                   let componentDisplayName = "Vendor Due Dilligence - Advanced"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.companyname + "^" + item.regdadd + "^" + item.pan + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" +  ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"")+ "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.companyname,item.regdadd,item.cin,item.pan,item.gst])
                })
    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""		
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
                   let componentDisplayName = "Bank Statement Verification"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.nameofbank + "^" + item.tenure + "^" + item.transaction + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" +  ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  (item.mentorReviewCompletionDate !=null ? moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):""):"")+ "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade !=null ? getColorCodeName(item.grade):"Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.tenure,item.nameofbank,item.transaction])
                })
    

                resolve(details)
            })
            .catch(err=>{
		console.log("Error in bank statement details",err)    
                reject()
            })
        })

    }    
    let getSiteCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            sitecheck
            .find({case:acase})
            .lean()		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""
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
                   let componentDisplayName = "Site Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.name + "^" + item.fulladdress + "^" + item.city + "^" + ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" +  ((item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"")+ "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.name,item.fulladdress,item.pin,item.city])
                })
    

                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = ""
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
                   let componentDisplayName = "Psychometric Standard"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.name + "^" + item.emailid + "^" + item.contact + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" +  ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"")+ "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.name,item.emailid,item.contact,item.gender])
                })
    
                resolve(details)
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
            .lean()		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let details = "" 
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
                   let componentDisplayName = "Social Media Search"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.searchname + "^" + "-" + "^" + "-" + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" +  ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"")+ "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
  //                 sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.searchname])
                })
		    
                resolve(details)
            })
            .catch(err=>{
                reject()
            })
        })

    }        

    let getFacisl3Details = function(acase){
        return new Promise((resolve,reject)=>{
            facisl3
            .find({case:acase})
            .lean()		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
                let  details = ""
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
                   let componentDisplayName = "FACIS L3 Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.applicantname + "^" + item.dateofbirth + "^" + item.stcode + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.applicantname,item.dateofbirth,item.stcode])
                })
    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details = ""    
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
                   let componentDisplayName = "OFAC Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.candname + "^" + item.ofac + "^" + "-" + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : ""):"Green")
			
 //                  sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.candname,item.ofac])
                })
 

                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details = ""    
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
                   let componentDisplayName = "GAP Verification"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.tenureofgap + "^" + item.resonforgap + "^" + item.address + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade != null ? getColorCodeName(item.grade) : "Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.tenureofgap,item.reasonforgap,item.address,item.PIN,item.CITY])
                })
    
                resolve(details)
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
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
	    .populate({path:'component'})	
	    .populate({path:'personalDetailsData'})	
            .then(data=>{
		let details = ""    
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
                   let componentDisplayName = "Passport Check"
                   if(item.component != null){
                     componentDisplayNane = item.component.displayName
                   }
                   if(details != ""){
                      details  = details + "^" + componentDisplayName
                   }else{
                      details  = componentDisplayName
                   }
                   details = details  + "^" + item.givenname + "^" + item.lastname + "^" + item.passportnumber + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? "Completed" :(item.status.substring(0,5) == "INSUF" ? "Insufficiency" : "In Progress")) + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')?  moment(item.mentorReviewCompletionDate).format('DD-MMM-YYYY'):"") + "^" + ( (item.status == 'OUTPUTQC-ACCEPTED' || item.status=='MENTOR-REVIEW-ACCEPTED')? (item.grade !=null ? getColorCodeName(item.grade):"Green"):"")
			
//                   sheet.addRow([componentDisplayName,item.status,item.case.initiationDate,item.case.tatEndDate,verifier,fe,vendor,item.givenname,item.lastname,item.issuecountry,item.nationality,item.passportnumber,item.expirydate])
                })
 

                resolve(details)
            })
            .catch(err=>{
                reject()
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
            let item = casesForUser[i]
//		console.log("Case Id being processed is ",item.caseId)
//		console.log("About to get employment details")
//		console.log(item.actualComponents);	
	    try{
		let personalDetails = await getPersonalDetails(item._id)
                let employmentDetails = item.actualComponents.includes("employment")? await getEmploymentDetails(item._id):""
                let empbasicDetails = item.actualComponents.includes("empbasic")? await getEmpBasicDetails(item._id):""
                let empadvanceDetails = item.actualComponents.includes("empadvance")? await getEmpAdvanceDetails(item._id):""
                let educationDetails = item.actualComponents.includes("education" )? await getEducationDetails(item._id):""
                let educationAdvancedDetails = item.actualComponents.includes("educationadvanced")? await getEducationAdvancedDetails(item._id):""
                let educationComprehensiveDetails = item.actualComponents.includes("educationcomprehensive")? await getEducationComprehensiveDetails(item._id):""
                let addressDetails = item.actualComponents.includes("address")? await getAddressDetails(item._id):""
                let addressComprehensiveDetails = item.actualComponents.includes("addresscomprehensive")? await getAddressComprehensiveDetails(item._id):""
                let addressOnlineDetails = item.actualComponents.includes("addressonline") ? await getAddressOnlineDetails(item._id):""
                let addressTelephoneDetails = item.actualComponents.includes("addresstelephone")? await getAddressTelephoneDetails(item._id):""
                let courtRecordDetails = item.actualComponents.includes("courtrecord")? await getCourtRecordDetails(item._id):""
                let criminalRecordDetails = item.actualComponents.includes("criminalrecord")? await getCriminalRecordDetails(item._id):""
                let referenceRecordDetails = item.actualComponents.includes("reference")? await getReferenceDetails(item._id):""
                let refBasicDetails = item.actualComponents.includes("refbasic")?await getRefBasicDetails(item._id):""
                let identityDetails = item.actualComponents.includes("identity") ? await getIdentityDetails(item._id):""
                let creditCheckDetails = item.actualComponents.includes("creditcheck") ? await getCreditCheckDetails(item._id):""
                let credittransDetails = item.actualComponents.includes("credittrans")? await getCreditTransDetails(item._id):""
                let creditEquifaxDetails = item.actualComponents.includes("creditequifax")? await getCreditEquifaxDetails(item._id):""
                let globaldatabaseDetails = item.actualComponents.includes("globaldatabase")? await getGlobaldatabaseDetails(item._id):""
                let drugtestfiveDetails = item.actualComponents.includes("drugtestfive") ? await getDrugTestFiveDetails(item._id):""
                let drugtestsixDetails = item.actualComponents.includes("drugtestsix")? await getDrugTestSixDetails(item._id):""
                let drugtestsevenDetails = item.actualComponents.includes("drugtestseven")? await getDrugTestSevenDetails(item._id):""
                let drugtesteightDetails = item.actualComponents.includes("drugtesteight") ? await getDrugTestEightDetails(item._id):""
                let drugtestnineDetails = item.actualComponents.includes("drugtestnine")? await getDrugTestNineDetails(item._id):""
                let drugtesttenDetails = item.actualComponents.includes("drugtestten")? await getDrugTestTenDetails(item._id):""
                let dlCheckDetails = item.actualComponents.includes("dlcheck")? await getDlCheckDetails(item._id):""
                let directorshipCheckDetails = item.actualComponents.includes("directorshipcheck") ? await getDirectorshipCheckDetails(item._id):""
                let voterIdDetails = item.actualComponents.includes("voterid")? await getVoterIdDetails(item._id):""
                let vddAdvanceDetails = item.actualComponents.includes("vddadvance")? await getVddAdvanceDetails(item._id):""
                let bankStmtDetails = item.actualComponents.includes("bankstmt")? await getBankStmtDetails(item._id):""
                let siteCheckDetails = item.actualComponents.includes("sitecheck")? await getSiteCheckDetails(item._id):""
                let psychometricDetails = item.actualComponents.includes("physostan")? await getPsychometricDetails(item._id):""
                let socialmediaCheckDetails = item.actualComponents.includes("socialmedia")? await getSocialMediaDetails(item._id):""
                let facisl3Details = item.actualComponents.includes("facisl3")? await getFacisl3Details(item._id):""
                let ofacDetails = item.actualComponents.includes("ofac")? await getOfacDetails(item._id):""
                let gapvfnDetails = item.actualComponents.includes("gapffn")? await getGapVfnDetails(item._id):""
                let passportDetails = item.actualComponents.includes("passport")? await getPassportDetails(item._id):""
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
		rowValues[1]=personalDetails == null ? item.candidateName:personalDetails.candidatename
		rowValues[2]=personalDetails == null ? "" : personalDetails.empid
		rowValues[3]=item.subclient.client.name
		rowValues[4]=item.subclient.name
		rowValues[5]=""
//		console.log("initiation date being set is ",item.initiationDate)
		rowValues[6]=moment(item.initiationDate).format("DD-MMM-YYYY")
		rowValues[7]=item.firstInsufficiencyRaisedDate == null ? "":moment(item.firstInsufficiencyRaisedDate).format("DD-MMM-YYYY")
		rowValues[8]=item.lastInsufficiencyClearedDate == null ? "":moment(item.lastInsufficiencyClearedDate).format("DD-MMM-YYYY")
		rowValues[9]=moment(item.tatEndDate).add((numberOfHolidays + numberOfWeekends + numberOfInsuffDays + 1),'days').format("DD-MMM-YYYY")
		rowValues[10]=item.status == "OUTPUTQC-ACCEPTED" ? "Completed" : "In Progress"
		rowValues[11]=item.status == "OUTPUTQC-ACCEPTED" ? (item.grade != null ? getColorCodeName(item.grade):""):""
		rowValues[12]=item.reportType != null ? item.reportType:""
		rowValues[13]=item.outputqcCompletionDate
		rowValues[14]=tatDays
		rowValues[15]=actualDaysTaken - numberOfHolidays - numberOfWeekends - numberOfInsuffDays + 1
		rowValues[16]=item._id   
		
		let  colCount = 16;
//		console.log("Case related details have been processed")
//  employment details pringing
		if(employmentDetails != ""){
                   let employmentDetailsArr = employmentDetails.split("^")		
     	           for(let j=0;j < employmentDetailsArr.length;j++){
                     colCount = colCount + 1;		
		     rowValues[colCount]=employmentDetailsArr[j] 	
		   }
		}
// employment basi , details  pringing	
//		console.log("empbaisDetails is ",empbasicDetails)
		if(empbasicDetails != ""){
                  let empbasicDetailsArr = empbasicDetails.split("^")
//		  console.log("Length of empbasicDetailsArr is",empbasicDetailsArr.length," it contains ",empbasicDetails.Arr)  	
                  for(let j=0; j < empbasicDetailsArr.length;j++){
//		     console.log("Incrementing col count in emp basic")	
		     colCount = colCount + 1;
		     rowValues[colCount] = empbasicDetailsArr[j]	
	          }		
		}	
// emp advance, deails printing
//		console.log("trying to pring emp advance")
		if(empadvanceDetails != ""){
                   let empadvanceDetailsArr = empadvanceDetails.split("^")
                   for(let j=0;j < empadvanceDetailsArr.length;j++){
//		     console.log("Incremebting col count in emp advanced")	
                     colCount = colCount + 1;
                     rowValues[colCount]=empadvanceDetailsArr[j]
                   }
		}	
// education deails printing
//		console.log("thring to print education details")
		if(educationDetails != ""){
                   let educationDetailsArr = educationDetails.split("^")
		   for(let j=0;j < educationDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=educationDetailsArr[j]
                   }
		}	

// education advanced deails printing
//		console.log("tryting to pring education advanced")
		if(educationAdvancedDetails != ""){
                    let educationAdvancedDetailsArr = educationAdvancedDetails.split("^")
                    for(let j=0;j < educationAdvancedDetailsArr.length;j++){
                      colCount = colCount + 1;
                      rowValues[colCount]=educationAdvancedDetailsArr[j]
                    }
		}	

// education comprehensivedeails printing
//		console.log("trying to pring education comprehensive")
		if(educationComprehensiveDetails != ""){
                   let educationComprehensiveDetailsArr = educationComprehensiveDetails.split("^")
                   for(let j=0;j < educationComprehensiveDetailsArr.length;j++){
                      colCount = colCount + 1;
                      rowValues[colCount]=educationComprehensiveDetailsArr[j]
                   }
		}	

// address details printing
//		console.log("trying to print address details") 
		if(addressDetails != ""){
                   let addressDetailsArr = addressDetails.split("^")
                   for(let j=0;j < addressDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=addressDetailsArr[j]
                   }
		}	

// address comprehensive printing
		if(addressComprehensiveDetails !=""){
                   let addressComprehensiveDetailsArr = addressComprehensiveDetails.split("^")
                   for(let j=0;j < addressComprehensiveDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=addressComprehensiveDetailsArr[j]
                   }
		}	

// address online printing
		if(addressOnlineDetails != ""){
                   let addressOnlineDetailsArr = addressOnlineDetails.split("^")
                   for(let j=0;j < addressOnlineDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=addressOnlineDetailsArr[j]
                  }
		}	
// address telephone printing
		if(addressTelephoneDetails !=""){
                   let addressTelephoneDetailsArr = addressTelephoneDetails.split("^")
                   for(let j=0;j < addressTelephoneDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=addressTelephoneDetailsArr[j]
                   }
		}	

// court recorde printing
		if(courtRecordDetails != ""){
                   let courtRecordDetailsArr = courtRecordDetails.split("^")
                   for(let j=0;j < courtRecordDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=courtRecordDetailsArr[j]
                   }
		}	
//		console.log("Printing criminal records")
// criminal recorde printing
		if(criminalRecordDetails != ""){
                   let criminalRecordDetailsArr = criminalRecordDetails.split("^")
                   for(let j=0;j < criminalRecordDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=criminalRecordDetailsArr[j]
                   }
		}	
//		console.log("Pringing reference record")
// reference record printing
		if(referenceRecordDetails != ""){
                   let referenceRecordDetailsArr = referenceRecordDetails.split("^")
                   for(let j=0;j < referenceRecordDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=referenceRecordDetailsArr[j]
                   }
		}	
//		console.log("Printing reference basic")
// refbasic record printing
		if(refBasicDetails  != ""){
                   let refBasicDetailsArr = refBasicDetails.split("^")
                   for(let j=0;j < refBasicDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=refBasicDetailsArr[j]
                   }
		}	
//                console.log("Printing identity details")
// identity record printing
		if(identityDetails != ""){ 
                   let identityDetailsArr = identityDetails.split("^")
                   for(let j=0;j < identityDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=identityDetailsArr[j]
                   }
		}	

//		console.log("Pringing credit check")
	
// credit check record printing
		if(creditCheckDetails != ""){
                   let creditCheckDetailsArr = creditCheckDetails.split("^")
                   for(let j=0;j < creditCheckDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=creditCheckDetailsArr[j]
                   }
		}	
//		console.log("Printing cerdittrans")
// credit transunion record printing
		if(credittransDetails != ""){
                   let credittransDetailsArr = credittransDetails.split("^")
                   for(let j=0;j < credittransDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=credittransDetailsArr[j]
                   }
	        }		
//                console.log("Printing credit equifax")
// credit equifax record printing
		if(creditEquifaxDetails != ""){
                   let creditEquifaxDetailsArr = creditEquifaxDetails.split("^")
                   for(let j=0;j < creditEquifaxDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=creditEquifaxDetailsArr[j]
                  }
		}	
//                console.log("Printing global database")
// globaldatabase equifax record printing
		if(globaldatabaseDetails != ""){ 
                   let globaldatabaseDetailsArr = globaldatabaseDetails.split("^")
                   for(let j=0;j < globaldatabaseDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=globaldatabaseDetailsArr[j]
                   }
		}	
//	        console.log("Printing drugtestfive")
// drugtestfive record printing
		if(drugtestfiveDetails != ""){
                   let drugtestfiveDetailsArr = drugtestfiveDetails.split("^")
                   for(let j=0;j < drugtestfiveDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=drugtestfiveDetailsArr[j]
                   }
		}	
//	        console.log("Printing drugtestsix")
// drugtestsix record printing
		if(drugtestsixDetails != ""){
                   let drugtestsixDetailsArr = drugtestsixDetails.split("^")
                   for(let j=0;j < drugtestsixDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=drugtestsixDetailsArr[j]
                   }
		}	
//                console.log("Printing drugtestseven")
// drugtestseven record printing
		if(drugtestsevenDetails != ""){
                   let drugtestsevenDetailsArr = drugtestsevenDetails.split("^")
                   for(let j=0;j < drugtestsevenDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=drugtestsevenDetailsArr[j]
                   }
		}	
//		console.log("Printing drugtesteight")
// drugtesteight record printing
		if(drugtesteightDetails != ""){
                   let drugtesteightDetailsArr = drugtesteightDetails.split("^")
                   for(let j=0;j < drugtesteightDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=drugtesteightDetailsArr[j]
                   }
		}	
//                console.log("Printing drugtestnine")
// drugtestnine record printing
		if(drugtestnineDetails != ""){
                   let drugtestnineDetailsArr = drugtestnineDetails.split("^")
                   for(let j=0;j < drugtestnineDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=drugtestnineDetailsArr[j]
                   }
		}	
//		console.log("Printing drugtestten")
// drugtestten record printing
		if(drugtesttenDetails != ""){
                   let drugtesttenDetailsArr = drugtesttenDetails.split("^")
                   for(let j=0;j < drugtesttenDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=drugtesttenDetailsArr[j]
                   }
		}	
//		console.log("Printing dl check")
// dlcheck record printing
		if(dlCheckDetails != ""){
                   let dlCheckDetailsArr = dlCheckDetails.split("^")
                   for(let j=0;j < dlCheckDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=dlCheckDetailsArr[j]
                   }
		}	
//                console.log("Printing dirctorshipcheck")
// directorship check record printing
		if(directorshipCheckDetails != ""){
                   let directorshipCheckDetailsArr = directorshipCheckDetails.split("^")
                   for(let j=0;j < directorshipCheckDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=directorshipCheckDetailsArr[j]
                   }
		}	
//                console.log("Printing voter id details")
// voterid record printing
		if(voterIdDetails != ""){
                   let voterIdDetailsArr = voterIdDetails.split("^")
                   for(let j=0;j < voterIdDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=voterIdDetailsArr[j]
                   }
		}	
//                console.log("Printing vdd advance")
// vdd advance record printing
		if(vddAdvanceDetails != ""){
                   let vddAdvanceDetailsArr = vddAdvanceDetails.split("^")
                   for(let j=0;j < vddAdvanceDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=vddAdvanceDetailsArr[j]
                   }
		}	
//		console.log("Printing bankstmt")
// bank stmt record printing
		if(bankStmtDetails  != ""){
                   let bankStmtDetailsArr = bankStmtDetails.split("^")
                   for(let j=0;j < bankStmtDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=bankStmtDetailsArr[j]
                   }
		}	
//		console.log("Printing sit check")
// site check record printing
		if(siteCheckDetails != ""){ 
                   let siteCheckDetailsArr = siteCheckDetails.split("^")
                   for(let j=0;j < siteCheckDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=siteCheckDetailsArr[j]
                   }
		}	
//                console.log("Printing psychometric details")
// psychometric record printing
		if(psychometricDetails != ""){
                   let psychometricDetailsArr = psychometricDetails.split("^")
                   for(let j=0;j < psychometricDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=psychometricDetailsArr[j]
                   }
		}	
//                console.log("Printing social media check")
// social media check record printing
		if(socialmediaCheckDetails != ""){
                   let socialmediaCheckDetailsArr = socialmediaCheckDetails.split("^")
                   for(let j=0;j < socialmediaCheckDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=socialmediaCheckDetailsArr[j]
                   }
		}	
//		console.log("Printing facisl3")
// facisl3 record printing
		if(facisl3Details != ""){
                   let facisl3DetailsArr = facisl3Details.split("^")
                   for(let j=0;j < facisl3DetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=facisl3DetailsArr[j]
                   }
		}	
//                console.log("Printing dl check")
// ofac record printing
		if(ofacDetails != ""){
                   let ofacDetailsArr = dlCheckDetails.split("^")
                   for(let j=0;j < ofacDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=ofacDetailsArr[j]
                   }
		}	
//                console.log("Printing gapvfn")
// gapvfn record printing
		if(gapvfnDetails != ""){
                   let gapvfnDetailsArr = gapvfnDetails.split("^")
                   for(let j=0;j < gapvfnDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=gapvfnDetailsArr[j]
                   }
		}	
//		console.log("Printing passport")
// passport record printing
		if(passportDetails != ""){
                   let passportDetailsArr = passportDetails.split("^")
                   for(let j=0;j < passportDetailsArr.length;j++){
                     colCount = colCount + 1;
                     rowValues[colCount]=passportDetailsArr[j]
                   }
		}	
		
                console.log("case added to report ",item.caseId)
		let rw = sheet.addRow(rowValues)
		rw.commit()    
	    }catch(err){
		console.log("Error in generating Case report",err)    
	    }

        }
         
//	console.log("Setting Headers")    
/*        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )*/
        const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/case_status_report_${req.user.user_id}.xlsx`);	    
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",		
            "Content-Disposition",
            "attachment; filename=" + "case_status_report.xlsx"
        )
        await workBook.xlsx.write(fileStream);	  
	await new Promise(resolve => setTimeout(resolve, 5000));    
            res.download(`/REPO_STORAGE/tmp_tl_tracker/case_status_report_${req.user.user_id}.xlsx`,(err)=>{
                if(err){
                  res.status(500).send({
                      message:"Could not download  the file"
                  })
                }
            })
	    
/*	console.log("About to return WorkBook")    
        return workBook.xlsx.write(res)
        .then(function(){
            res.status(200).end()
        })    */
//        res.json({message:"Successful"})
    }
}
 
