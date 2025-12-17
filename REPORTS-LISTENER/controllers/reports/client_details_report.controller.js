const Client = require('../../models/administration/client.model')
const ClientContract = require('../../models/administration/client_contract.model')
const ClientAnalysisCode = require('../../models/administration/client_analysis_code.model')
const AnalysisType = require('../../models/masters/analysis_type.model')
const AnalysisCode = require('../../models/masters/analysis_code.model')
const mongoose = require('mongoose')
const ExcelJS = require('exceljs')
const fs = require('fs')
const moment = require('moment')

exports.writeClientDetails = (req,res)=>{
    let headerRowValues = []	
    let rowValues = []	
    let rowValuesCount = 0	
    let allAnalysisCodes = []	
    let analysisTypes = []	
    const workBook = new  ExcelJS.Workbook()
    console.log("Workbook constructed")
    const sheet = workBook.addWorksheet('TL Pending')
    const day = new Date()
	
    let addClientDetails = function(clientDocs){
	return new Promise((resolve,reject)=>{
            clientDocs.forEach(async item=>{
		console.log("About  to add ",item.name)    
		rowValues = []
		rowValues[0] = item.name
		rowValues[1] = item.clientContractDetails.length > 0 ? moment(item.clientContractDetails[item.clientContractDetails.length -1].agreementDate).format("DD-MMM-YYYY"):""
		rowValues[2] = item.clientContractDetails.length > 0 ? moment(item.clientContractDetails[item.clientContractDetails.length -1].effectiveDate).format("DD-MMM-YYYY"):""  
		rowValues[3] = item.clientContractDetails.length > 0 ? moment(item.clientContractDetails[item.clientContractDetails.length -1].expiryDate).format("DD-MMM-YYYY"):""   
		rowValues[4] = item.clientContractDetails.length > 0 ? moment(item.clientContractDetails[item.clientContractDetails.length -1].retentationDate).format("DD-MMM-YYYY"):""   
		rowValues[5] = moment(item.clientContractDetails[item.clientContractDetails.length -1].expiryDate).diff(day,'days')
		rowValues[6] = item.contactPerson  
		rowValues[7] = item.telephone
		rowValues[8] = item.email   
		rowValuesCount = 9
		addAnalysisCode(item.clientAnalysisCodeDetails)    
//                let dr = sheet.addRow([item.name,item.clientContractDetails.length > 0 ? moment(item.clientContractDetails[item.clientContractDetails.length -1].effectiveDate).format("DD-MMM-YYYY"):"",item.clientContractDetails.length > 0 ? moment(item.clientContractDetails[item.clientContractDetails.length -1].expiryDate).format("DD-MMM-YYYY"):"" ])
		let dr = sheet.addRow(rowValues)  
                 dr.commit()
            })
           resolve(true)
	})    
    } 	
    let addAnalysisTypes = function(){
	return new Promise((resolve,reject)=>{
	   let headerRowValueCount = 9	
	   AnalysisType
           .find()
	   .sort({_id:1}) 	
	   .then(data=>{
	       data.forEach(item=>{
		  headerRowValues[headerRowValueCount++] = item.name     
	       })
	       analysisTypes = data	   
	       resolve(true)	   
	   })
	   .catch(err=>{
	      resolve(false)	   
	   })	
	})    
    }
    let readAllAnalysisCodes = function(){
	return new Promise((resolve,reject)=>{
           AnalysisCode
	   .find()
	   .sort({analysisType:1})	
           .then(data=>{
              resolve(data)
	   })		
	   .catch(err=>{
	      resolve(null)	   
	   })	
	})    
    }	
    let addAnalysisCode = function(analysisCodes){
	return new Promise((resolve,reject)=>{
          rowValuesCount = 9		
	  analysisTypes.forEach(analysisTypeItem=>{
             let found = false
	     let foundValue = ""	  
	     for(let i=0; i < analysisCodes.length;i++){
		item = analysisCodes[i]
//		console.log("Item Analysis Type ",item.analysisType)     
//		console.log("All Analysis Code Analysis Type is ",allAnalysisCodeItem.analysisType)     
		if(analysisTypeItem._id.toString() == item.analysisType.toString()){
		  if(item.analysisCode != null){
	            for(let j=0; j < allAnalysisCodes.length;j++){		  
		       let allAnalysisCodeItem = allAnalysisCodes[j]	    
		       if(allAnalysisCodeItem._id.toString()== item.analysisCode.toString()){	  
     	                  foundValue = allAnalysisCodeItem.name
	                  found = true
		          break
		       }
		    }
	            if(found==true){
		      break	    
		    }		  
		  }else{
		    found = false
	            break		  
		  }
		}     
	     }
	     if(found==true){
//		console.log("adding analysis code ",foundValue," ",allAnalysisCodeItem.analysisType)     
		rowValues[rowValuesCount++] = foundValue     
	     }else{
		rowValues[rowValuesCount++] = ""     
	     }	  
	  })
	  resolve(true)	
	})    
    }	
    writeReport()
    async function writeReport(){	
      allAnalysisCodes = await readAllAnalysisCodes() 
      let clientDocs = await Client.aggregate([
	  {
	     $lookup:{
		     from:"clientcontracts",
		     localField:"_id",
		     foreignField:"client",
		     as:"clientContractDetails"
	     }
	  }, 	  
	  {	  
	     $lookup:{
		     from:"clientanalysiscodes",
		     localField:"_id",
		     foreignField:"client",
		     as:"clientAnalysisCodeDetails",
	     }	  
	  }    
      ])
       headerRowValues[0] = "Client"
       headerRowValues[1] = "Contract Agreement Date"
       headerRowValues[2] = "Contract Start Date"
       headerRowValues[3] = "Contract Expiry Date"
       headerRowValues[4] = "Contract Retention Period"
       headerRowValues[5] = "Days-Left"
       headerRowValues[6] = "Contact Person"
       headerRowValues[7] = "Telephone"
       headerRowValues[8] = "Email"	    
       await addAnalysisTypes()	    
       let addedRow = sheet.addRow(headerRowValues)
       addedRow.commit()
       await addClientDetails(clientDocs)	    
       console.log("Added items")	    
       const fileStream = fs.createWriteStream(`/REPO_STORAGE/tmp_tl_tracker/client_details_report_${req.user.user_id}.xlsx`);
       console.log("File Stream Created")	    
       await workBook.xlsx.write(fileStream);	    
       console.log("Writing File Stream") 	    
//       await new Promise(resolve => setTimeout(resolve, 20000));
       res.download(`/REPO_STORAGE/tmp_tl_tracker/client_details_report_${req.user.user_id}.xlsx`,(err)=>{
          if(err){
	      console.log("Error in downloading the file")	  
              res.status(500).send({
                 message:"Could not download  the file"
              })
          }
       })
	    
	    
    }	      
}
