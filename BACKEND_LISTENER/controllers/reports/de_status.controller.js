const Case = require('../../models/uploads/case.model');
const ExcelJS = require('exceljs');

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
    sheet.addRow(["Case Id","Candidate Name","Client","Subclient","Initiation Date","Allocation Date","Completion Date","Allocated To"])
	
    console.log("In DE Status......",req.query.fromDate)	
    let getCases = function(){
	console.log("Getting cases for DE Status Report")   
	console.log("From and to dates are ",req.query.fromDate,req.query.toDate)    
        return new Promise((resolve,reject)=>{
            Case
	    .find({initiationDate:{$gte:req.query.fromDate,$lte:req.query.toDate}})
            .populate({path:'subclient',populate:{path:'client'}})
	    .populate({path:'dataEntryAllocatedTo'})	
            .then(data=>{
		console.log("Initiated Cases for DE Status report ",data.length)    
		data.forEach(item=>{    
		     let allocatedTo = ""
		     if(item.dataEntryAllocatedTo != null){
		       allocatedTo = item.dataEntryAllocatedTo.name	     
		     }
		     let allocationDate = item.initiationDate
		     if(item.dataEntryAllocationDate != null){
		       allocationDate = item.dataEntryAllocationDate	     
		     }	
    	             sheet.addRow([item.caseId,item.candidateName,item.subclient.client.name,item.subclient.name,item.initiationDate,allocationDate,item.dataEntryCompletionDate,allocatedTo])    
		})
		    
//		console.log("case list size is ",data.length)    
                resolve();
            })

            .catch(err=>{
		console.log("Error in getting the cases for the subclients",err)    
                reject()     
            })            
        })
    }   
    prepareReport()
    async function prepareReport(){
	console.log("Will call the get status now")    
        let cases = await getCases()
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
 
