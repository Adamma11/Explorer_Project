const address = require('../../models/data_entry/address.model')
const express = require('express');
const fs = require('fs');
const path = require('path')

exports.findChecksAllocatedToMe = (req,res)=>{
   console.log("about to get checks for user ",req.user.user_id)	
   let checksAllocated = []

   let getPhotographs = (caseId,componentName,_id)=>{
       return new Promise((resolve,reject)=>{
	 console.log("Trying to fetch photographs....")      
	 let photographs = [];
         let files = new Array()
         let filePath='/REPO_STORAGE/case_uploads/' + caseId + '/' + componentName + "/" + _id + '/proofofwork'
         if(fs.existsSync(filePath)){
           console.log("Path found")		 
           fs.readdirSync(filePath).forEach(file=>{
	     console.log("File  name is ",file)	   
             if(path.extname(file)==='.file'){
		console.log("EXTNAME is File")     
	        const data = fs.readFileSync(filePath+"/"+file)
		photographs.push(data)     
	     }             
           })
         }
         resolve(photographs)		 
       })	   
   }	
   let findAddressChecksAllocated = ()=>{
       return new Promise((resolve,reject)=>{	   
           address.find({$or:[{status:"ALLOCATED-TO-FE"},{status:"VERIFIER-REJECTED-FE"}],allocatedToFE:req.user.user_id})
	  .populate({path:'case'})
	  .populate({path:'case',populate:{path:'client'}})     
          .then(data=>{
//	      console.log("data is ",data)	  
	      data.forEach(async item=>{
	         let addressItem = ({
		    caseId:item.case.caseId,
	            case_id:item.case._id,
                    clientName:item.case.client.name,			 
	            componentname:'address',		 
	            _id:item._id,
		    candidateName:item.case.candidateName,
	            address:item.address,
	            pin:item.pin,
	            city:item.city,
	            checkType:'address',
	            status:'ALLOCATED-TO-FE',
	            addressType:item.typeofaddress,
		    tenureOfStay:item.tenureofstay,
		    primaryContact:item.primarycontact,
		    alternateContact:item.alternatecontact,
	            typeofstayRhs:item.typeofstayRhs,
		    nameofrespondentRhs:item.nameofrespondentRhs,
		    relationshipRhs:item.relationshipRhs,
		    contactRhs:item.contactRhs,
		    geotagRhs:item.geotagRhs,	
		    photographs: await getPhotographs(item.case.caseId,"address",item._id),	 
		    header:false	 
		 })
		 checksAllocated.push(addressItem)     
		      
	      })	  
	      resolve(true)	  
          })
          .catch(err=>{
	      console.log("Error fething address checks for fe ",err)	       
	      resolve(false)	  
          })	   
        })	   
   
   }	
   sendResponse()
   async function sendResponse(){
     console.log("Calling address checks")	   
     let got = await findAddressChecksAllocated()
//     console.log("got address checks",checksAllocated)	   
     res.json(checksAllocated) 	   
   
   }	

}




