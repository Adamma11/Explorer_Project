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
const CaseHistory = require('../../models/data_entry/case_history.model')
const moment = require('moment')


exports.getRejectionReport = (req,res)=>{
    const workBook = new ExcelJS.stream.xlsx.WorkbookWriter({filename:`/REPO_STORAGE/tmp_tl_tracker/rejection_report_${req.user.user_id}.xlsx`})
    const sheet = workBook.addWorksheet('Rejection Report')	
    let ar = sheet.addRow(['Case Id','Candidate Name','Client','Subclient','Branch','Mentor Review','Output QC ','Date of Rejection','Component','Analyst','Rejected At','Reason for Rejection','DE-Completed'])
    ar.commit()
    let query = {status:"OUTPUTQC-REJECTED",outputqcCompletionDate:{$gte:req.query.dateFrom,$lte:req.query.dateTo+"T23:59:59.999Z"}}
    let getRelevantChecks  = function(){
        //      console.log("Trying to fetch employment details for case status report for the case ")
        return new Promise((resolve,reject)=>{
            CaseHistory
            .find({$and:[{date:{$gte:req.query.dateFrom,$lte:req.query.dateTo+"T23:59:59.999Z"}},{check:{$ne:null}},{$or:[{status:"OUTPUTQC-REJECTED"},{status:"MENTOR-REVIEW-REJECTED"},{status:"INPUTQC-REJECTED"}]}]})
            .populate({path:'case',populate:{path:'subclient'}})
            .populate({path:'case',populate:{path:'client'}})
	    .populate({path:'case',populate:{path:'subclient',populate:{path:'branch'}}})
	    .populate({path:'user'})
            .then(data=>{
                resolve(data)    
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Error Reading Case History"     
                })	    
            })
        })
    }
    let getAddressDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            address.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})	
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})	
            .then(data=>{
                console.log("found the check ",data)	   
                if(data != null){
                    let details = ({
                        component:"Address Advanced",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'OUTPUTQC-ACCEPTED'  ) ? data.case.outputqcCompletedBy.name:""				
                    })	       
                    resolve(details)      
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)	   
                resolve(null)	   
            })	
        })    
    }	
    let getAddressComprehensiveDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            addresscomprehensive.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Address Comprehensive",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",		
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'OUTPUTQC-ACCEPTED'  ) ? data.case.outputqcCompletedBy.name:""		
                        
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getAddressOnlineDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            addressonline.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Address Online",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    let getAddressTelephoneDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            addresstelephone.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Address Telephone",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getBankStatementDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            bankstmt.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Bank Statement",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getCourtRecordDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            courtrecord.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Court Record",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getCreditCheckDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            creditcheck.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Credit Check - Basic",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getCreditEquifaxDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            creditequifax.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Credit Check - Equifax",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""			
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getCreditTransDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            credittrans.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Credit Check - Trans Union",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getCriminalRecordDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            criminalrecord.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Criminal Record",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getDirectorshipCheckDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            directorshipcheck.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Directorship Check",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                        
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getDlCheckDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            dlcheck.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"DL Check",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getDrugTestFiveDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            drugtestfive.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Drug Test - 5 Panels",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getDrugTestSixDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            drugtestsix.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Drug Test - 6 Panels",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getDrugTestSevenDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            drugtestseven.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Drug Test - 7 Panels",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getDrugTestEightDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            drugtesteight.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Drug Test - 8 Panels",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getDrugTestNineDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            drugtestnine.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Drug Test - 9 Panels",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getDrugTestTenDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            drugtestten.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Drug Test - 10 Panels",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getEducationDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            education.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Education Basic",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }

                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getEducationAdvancedDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            educationadvanced.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Education Advanced",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getEducationComprehensiveDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            educationcomprehensive.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Education Comprehensive",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    let getEmpAdvancedDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            empadvance.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Employment Advanced",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getEmpBasicDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            empbasic.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Employment Basic",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    let getEmploymentDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            employment.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Employment Comprehensive",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'OUTPUTQC-ACCEPTED' ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getFacisL3Details = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            facisl3.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Facis L3",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    let getGapVerificationDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            gapvfn.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Gap Verification",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getGlobaldatabaseDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            globaldatabase.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Global Database",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getIdentityDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            identity.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Identity",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getOfacDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            ofac.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"OFAC",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    let getPassportDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            passport.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Passport Check",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""		
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    let getPsychometricDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            physostan.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Psychometric - Standard",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    let getRefBasicDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            refbasic.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Reference - Basic",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    let getReferenceDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            reference.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Reference - Advanced",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getSiteCheckDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            sitecheck.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Site Check",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getSocialMediaDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            socialmedia.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Social Media",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getVddAdvancedDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            vddadvance.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Vendor Due Diligence - Advanced",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name ,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    let getVoterIdDetails = function(checkId,statusSent){
        return new Promise((resolve,reject)=>{
            voterid.findOne({_id:checkId})
            .populate({path:"verificationAllocatedTo"})
            .populate({path:"dataEntryAllocatedTo"})
            .populate({path:"mentorReviewCompletedBy"})
            .populate({path:'case',populate:{path:'outputqcCompletedBy'}})
            .then(data=>{
                console.log("found the check ",data)
                if(data != null){
                    let details = ({
                        component:"Voter Id",
                        allocatedToAnalyst:(statusSent == 'OUTPUTQC-REJECTED' || statusSent == 'MENTOR-REVIEW-REJECTED') ? data.verificationAllocatedTo.name : data.case.dataEntryAllocatedTo.name,
                        mentorReviewCompletedBy:data.mentorReviewCompletedBy !=null ? data.mentorReviewCompletedBy.name:"",	
                        outputqcCompletedBy:(statusSent == 'OUTPUTQC-REJECTED'  ) ? data.case.outputqcCompletedBy.name:""	
                    })
                    resolve(details)
                }else{
                    resolve(null)
                }
                
            })
            .catch(err=>{
                console.log("Error in getting address details ",err)
                resolve(null)
            })
        })
    }
    
    
    prepareReport()
    async function prepareReport(){
        let caseHistories = await getRelevantChecks()	   
        for(let i=0; i < caseHistories.length;i++){
            let item = caseHistories[i]
            let details = null
            details = (details == null) ? await getAddressDetails(item.check,item.status):details     
            details = (details == null) ? await getAddressComprehensiveDetails(item.check,item.status):details	       
            details = (details == null) ? await getAddressOnlineDetails(item.check,item.status):details	       
            details = (details == null) ? await getAddressTelephoneDetails(item.check,item.status):details	       
            details = (details == null) ? await getBankStatementDetails(item.check,item.status):details	      
            
            details = (details == null) ? await getCourtRecordDetails(item.check,item.status):details
            details = (details == null) ? await getCreditCheckDetails(item.check,item.status):details
            details = (details == null) ? await getCreditEquifaxDetails(item.check,item.status):details
            details = (details == null) ? await getCreditTransDetails(item.check,item.status):details
            details = (details == null) ? await getCriminalRecordDetails(item.check,item.status):details
            
            details = (details == null) ? await getDrugTestFiveDetails(item.check,item.status):details
            details = (details == null) ? await getDrugTestSixDetails(item.check,item.status):details
            details = (details == null) ? await getDrugTestSevenDetails(item.check,item.status):details
            details = (details == null) ? await getDrugTestEightDetails(item.check,item.status):details
            details = (details == null) ? await getDrugTestNineDetails(item.check,item.status):details
            
            details = (details == null) ? await getDrugTestTenDetails(item.check,item.status):details
            details = (details == null) ? await getDirectorshipCheckDetails(item.check,item.status):details
            details = (details == null) ? await getDlCheckDetails(item.check,item.status):details
            details = (details == null) ? await getEducationDetails(item.check,item.status):details
            details = (details == null) ? await getEducationAdvancedDetails(item.check,item.status):details
            
            details = (details == null) ? await getEducationComprehensiveDetails(item.check,item.status):details
            details = (details == null) ? await getEmpAdvancedDetails(item.check,item.status):details
            details = (details == null) ? await getEmpBasicDetails(item.check,item.status):details
            details = (details == null) ? await getEmploymentDetails(item.check,item.status):details
            details = (details == null) ? await getFacisL3Details(item.check,item.status):details
            
            details = (details == null) ? await getGapVerificationDetails(item.check,item.status):details
            details = (details == null) ? await getGlobaldatabaseDetails(item.check,item.status):details
            
            
            details = (details == null) ? await getIdentityDetails(item.check,item.status):details
            details = (details == null) ? await getOfacDetails(item.check,item.status):details
            details = (details == null) ? await getPassportDetails(item.check,item.status):details
            details = (details == null) ? await getPsychometricDetails(item.check,item.status):details
            details = (details == null) ? await getRefBasicDetails(item.check,item.status):details
            
            details = (details == null) ? await getReferenceDetails(item.check,item.status):details
            details = (details == null) ? await getSiteCheckDetails(item.check,item.status):details
            details = (details == null) ? await getSocialMediaDetails(item.check,item.status):details
            details = (details == null) ? await getVddAdvancedDetails(item.check,item.status):details
            details = (details == null) ? await getVoterIdDetails(item.check,item.status):details
            
            
            
            
            
            
            let dl = sheet.addRow([item.case.caseId,item.case.candidateName,item.case.client.name,item.case.subclient.name,item.case.subclient.branch.name,details != null ? details.mentorReviewCompletedBy:"",details != null ? details.outputqcCompletedBy:"",moment(item.date).format("DD-MMM-YYYY"),details != null ? details.component:"",details != null ? details.allocatedToAnalyst:"",item.status,item.remarks,item.user.name])      
            dl.commit()      
        } 
        
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition",
            "attachment; filename=" + "case_status_report.xlsx"
            )
            sheet.commit()
            workBook.commit()
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log("About to download the file")
            res.download(`/REPO_STORAGE/tmp_tl_tracker/rejection_report_${req.user.user_id}.xlsx`,(err)=>{
                if(err){
                    res.status(500).send({
                        message:"Could not download  the file"
                    })
                }
            })
            
        }	
        
    }
    
