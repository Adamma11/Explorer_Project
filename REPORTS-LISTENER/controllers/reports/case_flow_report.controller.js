const Case  = require('../../models/uploads/case.model')
const ExcelJS = require('exceljs')
const moment = require('moment')
const DefaultCalendar = require('../../models/administration/default_calendar.model')
exports.getCaseFlowReport = (req,res)=>{
    const workBook = new  ExcelJS.Workbook()
    console.log("Workbook constructed")
    const sheet = workBook.addWorksheet('Case Flow')
    console.log("Sheet added")
    let headerRow = sheet.addRow(["Client","Branch","CAM","Cases Received","Active Insuff","WIP Cases","WIP Beyond TAT","WIP Within TAT","Cases Completed","Completed Beyond TAT","Completed Within TAT"])
    headerRow.commit()	
 let  getNumberOfHolidaysBetweenDates = function(date1,date2){
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
        while(date1 < date2){
           if(date1.getDay() == 0 || date1.getDay()== 6){
//            console.log("Adding 1 to count")
              count ++
           }
           date1.setDate(date1.getDate()+1)
        }
        resolve(count)
    })
 }
	
let prepareReport = function(){
 return new Promise((resolve,reject)=>{  	
    Case
    .find({initiationDate:{$gte:req.query.fromDate,$lte:req.query.toDate}})
    .lean()	 
    .sort({client:1,subclient:1})	
    .populate({path:'subclient',populate:{path:'branch',populate:{path:'cam'}}})
    .populate({path:'client'})	 
    .then(async data=>{
	let clientId = ""
	let subclientId = ""
	let clientName = ""
	let branch = "" 
	let cam = ""    
	let casesReceived = 0
	let activeInsuff = 0
	let wipCases = 0
	let wipBeyondTat = 0
	let wipWithinTat = 0
	let casesCompleted = 0;
	let casesCompletedBeyondTat = 0;
	let casesCompletedWithinTat = 0;   
	let tatDays = 0;
//	let initiationDate=null
//	let completionDate=null;    
	for(let i=0; i < data.length;i++){
           let item = data[i]
//	   console.log("In Case Flow Report Item is ",item)	
//	   casesReceived = casesReceived + 1	
           if(i==0){
              clientId = item.subclient.client._id
              subclientId = item.subclient._id
	      clientName = item.client.name
	      subclientName = item.subclient.name
	      branch = item.subclient.branch.name
	      if(item.subclient.branch.cam != null){	   
                cam = item.subclient.branch.cam.name	   
	      }	      
	   }		
	   if(item.subclient.client._id.toString() != clientId.toString() && item.subclient._id.toString() != subclientId.toString()){
              let detailRow1 = sheet.addRow([clientName,branch,cam,casesReceived,activeInsuff,wipCases,wipBeyondTat,wipWithinTat,casesCompleted,casesCompletedBeyondTat,casesCompletedWithinTat])		   
	      detailRow1.commit()	   
              clientId = item.subclient.client._id
	      subclientId = item.subclient._id	  
	      clientName = item.client.name
	      sublcientName = item.subclient.name
	      branch = item.subclient.branch.name
	      if(item.subclient.branch.can != null){	   
                  cam = item.subclient.branch.cam.name		   
	      }	      
	      casesReceived = 0;
	      activeInsuff = 0;
	      wipCases = 0;
	      wipBeyondTat = 0
	      wipWithinTat = 0
	      casesCompleted = 0
	      casesCompletedBeyondTat = 0
	      casesCompletedWithinTat = 0	   
	      if(item.statusi=="OUTPUTQC-ACCEPTED"){
	        casesCompleted = casesCompleted + 1	     
		let initiationDate = item.initiationDate
		let completionDate = item.outputqcCompletionDate
		let tatEndDate = item.tatEndDate      
		let actualDaysTaken = moment(completionDate).diff(initiationDate,'days')
	        let holidays = await getNumberOfHolidaysBetweenDates(initiationDate,completionDate)	      
		let weekends = await getNumberOfWeekends(initiationDate,completionDate)
		let insuffDays = 0
		if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
	           insuffDays =  moment(item.lastInsufficiencyClearedDate).diff(item.firstInsufficiencyRaisedDate,'days')		
		}
	        let calculatedTatEndDate = moment(item.tatEndDate).add((holidays+weekends+insuffDays),'days')
		if(completionDate > calculatedTatEndDate){
		   casesCompletedBeyondTat = casesCompletedBeyondTat + 1	
		}else{
		   casesCompletedWithinTat = caseCompletedWithinTat + 1	
		}      
		      
	      }	   
	      else if(item.firstInsufficiencyRaisedDate != null && item.lastInsufficiencyClearedDate == null){
		activeInsuff = activeInsuff + 1      
	      }else{
		wipCases = wipCases + 1      
                let initiationDate = item.initiationDate
                let completionDate = new Date()
                let tatEndDate = item.tatEndDate
                let actualDaysTaken = moment(completionDate).diff(initiationDate,'days')
                let holidays = await getNumberOfHolidaysBetweenDates(initiationDate,completionDate)
                let weekends = await getNumberOfWeekends(initiationDate,completionDate)
                let insuffDays = 0
                if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                   insuffDays =  moment(item.lastInsufficiencyClearedDate).diff(item.firstInsufficiencyRaisedDate,'days')
                }
                let calculatedTatEndDate = moment(item.tatEndDate).add((holidays+weekends+insuffDays),'days')
                if(completionDate > calculatedTatEndDate){
                   wipBeyondTat = wipBeyondTat + 1
                }else{
                   wipWithinTat = wipWithinTat + 1
                }
		      
	      }
	      casesReceived = casesReceived + 1	   
	   }else{
//              casesReceived = casesReceived + 1;
              if(item.status=="OUTPUTQC-ACCEPTED"){
                casesCompleted = casesCompleted + 1
                let initiationDate = item.initiationDate
                let completionDate = item.outputqcCompletionDate
                let tatEndDate = item.tatEndDate
                let actualDaysTaken = moment(completionDate).diff(initiationDate,'days')
                let holidays = await getNumberOfHolidaysBetweenDates(initiationDate,completionDate)
                let weekends = await getNumberOfWeekends(initiationDate,completionDate)
                let insuffDays = 0
                if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                   insuffDays =  moment(item.lastInsufficiencyClearedDate).diff(item.firstInsufficiencyRaisedDate,'days')
                }
                let calculatedTatEndDate = moment(item.tatEndDate).add((holidays+weekends+insuffDays),'days')
                if(completionDate > calculatedTatEndDate){
                   casesCompletedBeyondTat = casesCompletedBeyondTat + 1
                }else{
                   casesCompletedWithinTat = casesCompletedWithinTat + 1
                }
		      
              }
              else if(item.firstInsufficiencyRaisedDate != null && item.lastInsufficiencyClearedDate == null){
                activeInsuff = activeInsuff + 1
              }else{
                wipCases = wipCases + 1
                let initiationDate = item.initiationDate
                let completionDate = new Date()
                let tatEndDate = item.tatEndDate
                let actualDaysTaken = moment(completionDate).diff(initiationDate,'days')
                let holidays = await getNumberOfHolidaysBetweenDates(initiationDate,completionDate)
                let weekends = await getNumberOfWeekends(initiationDate,completionDate)
                let insuffDays = 0
                if(item.insufficiencyRaisedDate != null && item.insufficiencyClearedDate != null){
                   insuffDays =  moment(item.lastInsufficiencyClearedDate).diff(item.firstInsufficiencyRaisedDate,'days')
                }
                let calculatedTatEndDate = moment(item.tatEndDate).add((holidays+weekends+insuffDays),'days')
                if(completionDate > calculatedTatEndDate){
                   wipBeyondTat = wipBeyondTat + 1
                }else{
                   wipWithinTat = wipWithinTat + 1
                }
		      
              }
              clientId = item.subclient.client._id
              subclientId = item.subclient._id
              casesReceived = casesReceived + 1;
/*              if(item.status="OUTPUTQC-ACCEPTED"){
                casesCompleted = casesCompleted + 1
              }
              else if(lastInsuffRaisedDate != null && lastInsuffClearedDate == null){
                activeInsuff = activeInsuff + 1
              }else{
                wipCases = wipCases + 1
	      }    */

	   } 	
	}    
       resolve()	    
    })	
    .catch(err=>{
       console.log("Error in case flow  report",err)	    
       reject()	    
    })	
  })
}
startReport()
async function startReport(){
    try{	
      let rep = await prepareReport() 	
      console.log("Setting Headers")
      res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
      res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "case_flow.xlsx"
      )
        const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/case_flow_${req.user.user_id}.xlsx`);
        await workBook.xlsx.write(fileStream);
//      sheet.commit()
//      workBook.commit()
        await new Promise(resolve => setTimeout(resolve, 20000));
            res.download(`/REPO_STORAGE/tmp_tl_tracker/case_flow_${req.user.user_id}.xlsx`,(err)=>{
                if(err){
                  res.status(500).send({
                      message:"Could not download  the file"
                  })
                }
            })
	    
//      console.log("About to return WorkBook")
//      return workBook.xlsx.write(res)
//      .then(function(){
//          res.status(200).send()
//      })
    }catch(err){
	console.log("Error in Case Flow Report ",err)    
	res.status(500).send({
	   message: 'Error in Case Flow Report'	
	})
    }


  }
}


