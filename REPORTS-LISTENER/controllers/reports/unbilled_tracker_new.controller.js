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
const ClientContract = require('../../models/administration/client_contract.model')
const ClientContractPackage = require('../../models/administration/client_contract_package.model')
const ClientContractComponent = require('../../models/administration/client_contract_component.model')
const moment = require('moment')


exports.getUnbilledTracker = (req,res)=>{
 let colorMasterDetails = new Array()
 let totalForTheCase = 0
 	
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
    sheet.addRow(["Case Id","Candidate Name","Candidate Id","Client","Subclient","Branch","Profile Name","Initiation Date","Color","Closure Type","Completion Date","Total Price"])

/*    CellRange range = worksheet.Range["A2:A100"];
    Formatting rangeFormatting = range.BeginUpdateFormatting();
    rangeFormatting.Font.Color = Color.Blue;
    rangeFormatting.Fill.BackgroundColor = Color.LightBlue;
    rangeFormatting.Fill.PatternType = PatternType.LightHorizontal;
    rangeFormatting.Fill.PatternColor = Color.Violet;
    range.EndUpdateFormatting(rangeFormatting);    */
  //  console.log("date from and to are ",req.query.dateFrom)
/*    let query = {status:{$ne:'OUTPUTQC-ACCEPTED'}}
    if(req.query.reportfor == 'PENDING'){
      query = {status:{$ne:'OUTPUTQC-ACCEPTED'}}	    
    }
    if(req.query.reportfor == 'COMPLETED'){*/
      let query = {status:"OUTPUTQC-ACCEPTED",invoiceDate:null}	    
/*    }	   
    if(req.query.reportfor == 'INITIATION-DATE'){
      query = {initiationDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}}	    
    }	    
    if(req.query.reportFor == 'CLIENT'){
      query = {client:req.query.client}	    
    }	    */
    let query1 = {user:req.user.user_id}
/*    if(req.params.client_id !="-"){
        query1 = {user:req.user.user_id,client:req.params.client_id}
    }*/



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
            .populate({path:'subclient',populate:{path:'client'},populate:{path:'branch'}})
	    .populate({path:'client'})	
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
    let getClientContractComponentDetails  = function(clientContract,component){
        return new Promise((resolve,reject)=>{
	   ClientContractComponent
	   .findOne({clientContract:clientContract,component:component})	
	   .then(data=>{
	      console.log("Client contract component details are ....",data)	   
	      if(data != null){	   
	        resolve(data)	   
	      }else{
		resolve(null)      
	      }	      
	   })
           .catch(err=>{
	      console.log("Error reading client contract component details..........",err)	   
	      resolve(null)	   
	   })		
	})	    
    }
    let getRelevantContract = function(acase){
       return new Promise((resolve,reject)=>{
          ClientContract
	  .findOne({client:acase.subclient.client._id,effectiveDate:{$lte:acase.initiationDate},expiryDate:{$gte:acase.initiationDate}})    
	  .then(data=>{
//             console.log("Client is ",acase.subclient.client)		  
	     console.log("contract data  is ",data)	  
             resolve(data)		  
	  })     
	  .catch(err=>{
             console.log("Error in getting the client contract",err)		  
             reject(null)		  
	  })     
       })	    
    }
    let getPackagePrice = function(contractDetails,apackage){
       return new Promise((resolve,reject)=>{
	 if(contractDetails != null){      
            ClientContractPackage
	    .findOne({clientContract:contractDetails._id,_id:apackage})      
	    .then(data=>{
               if(data != null){		 
                  resolve(data.price)		 
	       }else{
	          resolve(0)	    
	       }

	    })      
	    .catch(err=>{
               resolve(0)		 
	    })     
	 }else{
            resolve(0)		 
	 }
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
	    totalForTheCase = 0	
            let item = casesForUser[i]
//		console.log("Case Id being processed is ",item.caseId)
//		console.log("About to get employment details")
	    try{
		let contractDetails = await getRelevantContract(item)
                console.log("Got contract details")		    
		let packagePrice = await getPackagePrice(contractDetails,item.package)    
		console.log("Got packge price")    
		let personalDetails = await getPersonalDetails(item._id)
		console.log("got Personal details")    
//		console.log("About to get passport details for case status")
		let rowValues = []
//		let completionDateForCalculation  = item.outputqcCompletionDate != null ? moment(item.outputqcCompletionDate) : moment(Date.now())
//		let startDate = new Date(item.initiationDate.getTime())
//		let actualDaysTaken = completionDateForCalculation.diff(startDate,'days')
//		let tatEndDateForCalculation = moment(item.tatEndDate)
//		let tatDays = tatEndDateForCalculation.diff(startDate,'days')
//		let numberOfHolidays = await getNumberOfHolidaysBetweenDates(startDate,tatEndDateForCalculation)
//		startDate = new Date(item.initiationDate.getTime())
//		let numberOfWeekends = await getNumberOfWeekends(startDate,item.tatEndDate)

//		console.log("Number of Holidays is " + numberOfHolidays)
//		console.log("Number of Weekdnds is " + numberOfWeekends)
//		let numberOfInsuffDays =0;
//		console.log("First insuff raised date",item.firstInsufficiencyRaisedDate)
//		console.log("Last insuff cleared date",item.lastInsufficiencyClearedDate)
//		if(item.firstInsufficiencyRaisedDate != null && item.lastInsufficiencyClearedDate != null){
//	          console.log("Not  Null----calculating number of insusff days")		
//		  numberOfInsuffDays = moment(item.lastInsufficiencyClearedDate).diff(item.firstInsufficiencyRaisedDate,'days')	
//		  console.log("Calculated number  of insuff days ",numberOfInsuffDays)	
//		}
//		console.log("Number of Insuff days",numberOfInsuffDays)
//		if(numberOfInsuffDays > 0){
//		  console.log("Number of insuff days ",numberOfInsuffDays)	
//		}
		rowValues[0]=item.caseId
		rowValues[1]=personalDetails == null ? item.candidateName:personalDetails.candidatename
		rowValues[2]=personalDetails == null ? "" : personalDetails.empid
		rowValues[3]=item.client.name
		rowValues[4]=item.subclient.name
		rowValues[5]=item.subclient.branch != null ? item.subclient.branch.name:""
		rowValues[6]=""    
//		console.log("initiation date being set is ",item.initiationDate)
		rowValues[7]=moment(item.initiationDate).format("DD-MMM-YYYY")
		rowValues[8]=item.status == "OUTPUTQC-ACCEPTED" ? (item.grade != null ? getColorCodeName(item.grade):""):""
		rowValues[9]=item.reportType != null ? item.reportType:""
		rowValues[10]=item.outputqcCompletionDate
		rowValues[11]=totalForTheCase    
		
		let  colCount = 11;
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
 
