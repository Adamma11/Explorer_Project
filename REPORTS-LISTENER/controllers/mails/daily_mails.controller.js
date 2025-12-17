const SubclientNotification = require('../../models/administration/subclient_notification.model')
const UserSubclientAccess = require('../../models/administration/user_subclient_access.model')
const Case = require('../../models/uploads/case.model')
const sendMail = require('send_mail.controller')
const nodemailer = require('nodemailer')

SubclientNotification
.find({frequency:'DAILY'},triggerStatus:"OUTPUTQC-ACCEPTED")
.sort({subclient:1})
.populate({path:'template'},{path:'subclient'})
.then(data=>{
   let today = new Date()
   let startDate = today.getFullYear()+"-"+(today.getMonth()+1) > 9 ? (today.getMonth()+1): ("0" + (today.getMonth()+1)) + "-" + (today.getDate()) > 9 ? (today.getDate()): ("0" + (today.getDate())) + "T00:00:00.000Z"

   let endDate = today.getFullYear()+"-"+(today.getMonth()+1) > 9 ? (today.getMonth()+1): ("0" + (today.getMonth()+1)) + "-" + (today.getDate()) > 9 ? (today.getDate()): ("0" + (today.getDate())) + "T23:59:59.999Z"	
   let htmlString = "<table><tr><td>Case Id</td><td>Candidate Name</td><td>Completion Date</td><td>Report Type</td></tr>"
   if(data != null){
     let subclient = ""	   
     for(let i=0; i < data.length;i++){
       let item = data[i]
       if(i==0){
	 subclient = item.subclient._id       
       }
       if(subclient != item.subclient._id){
	 sendMail(mailAddresses,subjectString,htmlString)      
         htmlString = "<table><tr><td>Case Id</td><td>Candidate Name</td><td>Completion Date</td><td>Report Type</td></tr>"       
       }	     
       Case
       .find({outputqcCompletionDate:{$gte:ISODate(startDate),$lte:ISODate(endDate)},subclient:item.subclient._id})	     
       .then(caseData=>{
          for(let j=0;j < caseData.length;j++){
	     let caseDataItem  = caseData[j]
	     htmlString = htmlString + "<tr><td>" + caseDataItem.caseId + "</td>"	  
             htmlString = htmlString + "<td>" + caseDataItem.candidateName + "</td>"
             htmlString = htmlString + "<td>" + caseDataItem.outputqcCompletionDate + "</td>"
	     htmlString = htmlString + "<td>" + caseDataItem.reportType + "</td></tr>"	  
	  }      
       })
       .catch(err=>{
	       
       })	    
     } 	   
   }	   
})
.catch(err={
  console.log('Error sending daily mails')	
})

