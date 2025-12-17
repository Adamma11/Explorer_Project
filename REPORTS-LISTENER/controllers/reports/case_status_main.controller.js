const UserSubclientAccess = require('../../models/administration/user_subclient_access.model');
const Case = require('../../models/uploads/case.model');
const PersonalDetails = require('../../models/data_entry/personal_details_data.model')
const DefaultCalendar = require('../../models/administration/default_calendar.model')
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


  //  console.log("date from and to are ",req.query.dateFrom)
/*    let query = {status:{$ne:'OUTPUTQC-ACCEPTED'}}
    if(req.query.reportfor == 'PENDING'){
      query = {status:{$ne:'OUTPUTQC-ACCEPTED'}}	    
    }
    if(req.query.reportfor == 'COMPLETED'){
      query = {status:"OUTPUTQC-ACCEPTED",outputqcCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}}	    
    }	   
    if(req.query.reportfor == 'INITIATION-DATE'){
      query = {initiationDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}}	    
    }	    
    if(req.query.reportFor == 'CLIENT'){
      query = {client:req.query.client}	    
    }	  */  
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
    let getCasesForSubclientsNotRequired = function(subclients){
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
    prepareReport()
      async function prepareReport(){
        let userSubclients = await getSubclientsForTheUser()	      
        let query = {status:{$ne:'OUTPUTQC-ACCEPTED'}}
        if(req.query.reportfor == 'PENDING'){
          query = {status:{$ne:'OUTPUTQC-ACCEPTED'},subclient:{$or:userSubclients}}
        }
        if(req.query.reportfor == 'COMPLETED'){
          query = {status:"OUTPUTQC-ACCEPTED",outputqcCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}}
        }
        if(req.query.reportfor == 'INITIATION-DATE'){
          query = {initiationDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo},subclient:{$or:userSubclients}}
        }
        if(req.query.reportFor == 'CLIENT'){
          query = {client:req.query.client}
        }
/*        let query1 = {user:req.user.user_id}
        if(req.params.client_id !="-"){
          query1 = {user:req.user.user_id,client:req.params.client_id}
        }*/


	await getColorMaster()    
	console.log("about to do match based on query")  
	let docs = await Case.aggregate()
	    .match({$and:[{status:"OUTPUTQC-ACCEPTED"},{outputqcCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo}}]})
	console.log("Got the docs",docs.length)      
/*	docs.forEach(item=>{
            console.log(item.caseId)		
	})    */
         
    }
}
 
