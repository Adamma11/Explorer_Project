const fs =require('fs');
const moment = require('moment');
const path = require('path');
const docx = require('docx');
const { FootNoteReferenceRunAttributes, TextRun } = require('docx');
const { resolve } = require('path');
const ColorMaster = require('../../models/administration/color_master.model')
const ClientContractPackage = require('../../models/administration/client_contract_package.model')
const ClientContractProfile = require('../../models/administration/client_contract_profile.model')
const Case = require('../../models/uploads/case.model');
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')
const User = require('../../models/administration/user.model')
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
//const socialmedia = require('../../models/data_entry/socialmedia.model')
//const pdf2img = require('pdf2img');
const pdf2img = require('pdf2img-promises');
const isPDF = require('is-pdf-valid')
const axios = require('axios')
//const allJpegs = new Array()

exports.convertPdfsToJpgs  = (req,res)=>{
console.log("Calling  the server for reports")	
axios.get('http://localhost:6000/converttojpg?caseId='+req.params.caseId+"&token=8f51ywtmahia7tgtzvfvj6blbfjles")
     .then(response=>{
//        console.log("Response from converter is ",response)
        if(response.status == '200'){
          console.log("Converted sucessfully")
          res.json({message:'SUCCESS'})
        }else{
          console.log("Error from converter")
          res.status(500).json({message:'FAILURE'})
        }
     })
     .catch(err=>{
        console.log("Error Calling the report server .................................................................. ",err)
        res.status(500).json({message:'Error Converting'})
     })
	

/*const allJpegs = new Array()
let currentCaseId = ""
let reqCaseId = req.params.caseId	
 let getCaseDetails = function(){
    return new Promise((resolve,reject)=>{	 
       Case
       .findOne({caseId:req.params.caseId})
       .populate({path:'subclient',populate:{path:'client',populate:{path:'cam'}}})	    
       .then(data=>{
          resolve(data)     	 
       })
       .catch(err=>{
          reject()	    
      })
   }) 	    
 }	 

 let getEmploymentDetails = function(acase){
        console.log("Trying to fetch employment details for case status report for the case ")
        return new Promise((resolve,reject)=>{
            employment
            .find({case:acase})
	    .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
		for(let i=0; i < data.length;i++){
	          let item = data[i]		
                  let det  = ({
		     checkName:"Employment",
		     checkType:item.empstatus,
		     briefDetails:item.nameofemployer,
		     grade:item.grade	  
		  })
                  if(req.params.caseId ==item.case.caseId){			
   		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/employment/" + item._id + "/proofofwork")
		  await new Promise(resolve => setTimeout(resolve, 10000));	
		  }
		}    

                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Employment",
                     checkType:item.empstatus,
                     briefDetails:item.nameofemployer,
                     grade:item.grade
                  })
		  if(req.params.caseId == item.case.caseId){     
                    await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/empbasic/" + item._id + "/proofofwork")		       
                    await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
                }
                resolve(data)
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
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Employment",
                     checkType:item.empstatus,
                     briefDetails:item.nameofemployer,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/empadvance/" + item._id + "/proofofwork")     
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
                }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }


   let getEducationDetails = function(acase){
        console.log("In education details of tl pending")
        return new Promise((resolve,reject)=>{
            education
            .find({case:acase})
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Education",
                     checkType:"",
                     briefDetails:item.nameofuniversity,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/education/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
                }
                resolve(data)
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
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDtailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Education",
                     checkType:"",
                     briefDetails:item.nameofuniverskty,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/educationadvanced/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
                }
		    
                resolve(data)
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
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Education",
                     checkType:"",
                     briefDetails:item.nameofuniversity,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/educationcomprehensive/" + item._id + "/proofofwork")    
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
                }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Address",
                     checkType:item.typeofaddress,
                     briefDetails:item.address,
                     grade:item.grade
                  })
		  console.log("Sending for creating the jpgs of address")    
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/address/" + item._id + "/proofofwork")     
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
                }
		    
                resolve(data)
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
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0;i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Address",
                     checkType:item.typeofaddress,
                     briefDetails:item.fulladdress,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/addresscomprehensive/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
                }

                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Address",
                     checkType:item.typeofaddress,
                     briefDetails:item.fulladdwithpin,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/addressonline/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
                }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Address",
                     checkType:item.typeofaddress,
                     briefDetails:item.address,
                     grade:item.grade
                  })
		  if(req.params.caseId == item.case.caseId){     
   		     await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/addresstelephone/" + item._id + "/proofofwork")     
		     await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
                }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Court Record",
                     checkType:item.typeofaddress,
                     briefDetails:item.addresswithpin,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
          	  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/courtrecord/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000)); 
		  }
                }
		    
                resolve(data)
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
            .populate({path:'case'})	
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		 let item = data[i]    
                  let det = ({
                     checkName:"Criminal Record",
                     checkType:item.typeofaddress,
                     briefDetails:item.fulladdress,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/criminalrecord/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
     
                }
	    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i  < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Reference",
                     checkType:"",
                     briefDetails:item.nameofreference,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/reference/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
	       }	    
               resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Reference",
                     checkType:"",
                     briefDetails:item.name,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/refbasic/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Identity Check",
                     checkType:"",
                     briefDetails:item.typeofid,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/identity/" + item._id + "/proofofwork")    
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Credit Check",
                     checkType:"",
                     briefDetails:item.nameasperpan,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/creditcheck/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Credit Check",
                     checkType:"",
                     briefDetails:item.nameasperpan,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/credittrans/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]      
                  let det = ({
                     checkName:"Credit Check",
                     checkType:"",
                     briefDetails:item.panname,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/creditequifax/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0;i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Global Database",
                     checkType:"",
                     briefDetails:item.searchname,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		     await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/globaldatabase/" + item._id + "/proofofwork")     
		     await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Drug Test - 5 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestfive/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0;i < data.length;i++){
		  let item = data[i]      
                  let det = ({
                     checkName:"Drug Test - 6 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestsix/" + item._id + "/proofofwork")     
		  await new Promise(resolve => setTimeout(resolve, 10000));     
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
                  let det = ({
                     checkName:"Drug Test - 7 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestseven/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }

               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Drug Test - 8 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtesteight/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
		       
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Drug Test - 9 Panel",
                     checkType:"",
                     briefDetails:"",
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestnine/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
		       
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Drug Test - 10 Panel",
                     checkType:"",
                     briefDetails:item.nameofemployee,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
		  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/drugtestten/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
		       
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"DL Check",
                     checkType:"",
                     briefDetails:item.dlnumber,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/dlcheck/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
		       
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Directorship Check",
                     checkType:"",
                     briefDetails:item.dinnumber,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/directorshipcheck/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	

    let getVoterIdDetails = function(acase){
	console.log("in voter id details")    
        return new Promise((resolve,reject)=>{
            voterid
            .find({case:acase})
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
	       console.log("Voter  id data is ",data)	    
               for(let i=0;i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Voter Id Details",
                     checkType:"",
                     briefDetails:item.epicnumber,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/voterid/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
               }
	       resolve(data)	    
            })
            .catch(err=>{
		console.log("Error in reading voter id details ",err)    
                reject()
            })
        })

    }

        let getVddAdvanceDetails = function(acase){
        return new Promise((resolve,reject)=>{
            vddadvance
            .find({case:acase})
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Vendor Due Deiligence",
                     checkType:"",
                     briefDetails:item.companyname,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/vddadvance/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Bank Statement",
                     checkType:"",
                     briefDetails:item.nameofbank,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/vddadvance/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));
		  }
		       
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
	
    let getSiteCheckDetails = function(acase){
        return new Promise((resolve,reject)=>{
            sitecheck
            .find({case:acase})
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Site Check",
                     checkType:"",
                     briefDetails:item.name,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/sitecheck/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Psychometric Check",
                     checkType:"",
                     briefDetails:item.name,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/physostan/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }	  
               }
		    
		resolve(data)    
	     })	    
            .catch(err=>{
                reject()
            })
        })
		
    }

    let getSocialMediaDetails = function(acase){
        return new Promise((resolve,reject)=>{
            console.log("In Social Media Details for case")		
            socialmedia
            .find({case:acase})
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
                  let det = ({
                     checkName:"Social Media",
                     checkType:"",
                     briefDetails:item.searchname,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/socialmedia/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
               }
		    
                resolve(data)
            })
            .catch(err=>{
		console.log("Error in social media",err)    
                reject()
            })
        })
    }

    let getFacisl3Details = function(acase){
        return new Promise((resolve,reject)=>{
            facisl3
            .find({case:acase})
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Facis L3",
                     checkType:"",
                     briefDetails:item.applicantname,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/facisl3/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"OFAC",
                     checkType:"",
                     briefDetails:item.candname,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/ofac/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Gap",
                     checkType:"",
                     briefDetails:item.address,
                     grade:item.grade
                  })
		  if(req.params.caseId ==item.case.caseId){     
                  await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/gapvfn/" + item._id + "/proofofwork")
                  await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
               }
		    
                resolve(data)
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
            .populate({path:'case'})		
            .populate({path:'verificationAllocatedTo'})
            .populate({path:'allocatedToFE'})
            .populate({path:'allocatedToVendor'})
            .populate({path:'component'})
            .populate({path:'personalDetailsData'})
            .then(async data=>{
               for(let i=0; i < data.length;i++){
		  let item = data[i]     
                  let det = ({
                     checkName:"Passport",
                     checkType:"",
                     briefDetails:item.passportnumber,
                     grade:item.grade
                  })
		   if(req.params.caseId ==item.case.caseId){    
                     await createJpgs("/REPO_STORAGE/case_uploads/" + item.case.caseId + "/passport/" + item._id + "/proofofwork")
                     await new Promise(resolve => setTimeout(resolve, 10000));		       
		  }
               }
		    
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })

    }
    let getLoaDetails = function(caseDetails){
       return new Promise((resolve,reject)=>{
          console.log("about to create loa jpgs")
	  if(req.params.caseId == caseDetails.caseId){     
             createJpgs("/REPO_STORAGE/case_uploads/"+ caseDetails.caseId + "/loa")
             console.log("created loa jpgs")
	  }
//          await new Promise(resolve => setTimeout(resolve,10000))
          resolve()
       })
    }


   
   async function createJpgs(filePath){
//     return new  Promise((resolve,reject)=>{
      if(filePath.search(req.params.caseId) != -1){  
        if(fs.existsSync(filePath)){
            let  files = fs.readdirSync(filePath)
             for(let i=0 ; i < files.length;i++){
                if(path.extname(files[i]) != ".jpg"){
                  let input = filePath + "/" + files[i]
                  let output = files[i].replace("'","")
                  console.log("File being considered for conversion",input)
		  const testFile = fs.readFileSync(input) 	
                  if(isPDF(testFile)){
                     await doActualConversion(input,output,filePath)
//                     await new Promise(resolve => setTimeout(resolve, 10000));			  
                  }
		
                }
             }
	}
      }
   }

   function doActualConversion(input,output,filePath){
     return new Promise((resolve,reject)=>{
       console.log("In actual conversion file to convert is ",input)
        console.log("Case Id Found " ,filePath.search(currentCaseId),"Case id is ",currentCaseId)
        if(filePath.search(req.params.caseId) != -1){
           let converter = new pdf2img()
           converter.on(output,(msg)=>{
             console.log('Received : ',input," output is ",output," message is ",msg)
           })
              converter.setOptions({
              type:'jpg',
              size:1024,
              density:600,
              outputdir:filePath + "/",
              outputname:output,
              page:null,
              quality:100
              });
              converter.convert(input)
              .then(info=>{
		allJpegs.push(filePath)      
                resolve(true)
              })
              .catch(err=>{
                  resolve(false)
              })
        }
//        resolve(true)
     })
   }
	*/

/*   function doActualConversion(input,output,filePath){
     return new Promise((resolve,reject)=>{
       console.log("In actual conversion file to convert is ",input)
       if(filePath.search(req.params.caseId) != -1){
	console.log("Current Case Id is Same and hence writing the annexure")       
        pdf2img.setOptions({
            type:'jpg',
            size:1024,
            density:600,
            outputdir:filePath + "/",
            outputname:output,
            page:null,
            quality:100
        });
        pdf2img.convert(input,function(err,info){
            if(err){
              reject(false)
              console.log('error covnerting',err)
            }else{
              allJpegs.push(filePath)		    
              resolve(true)
              console.log('converted successfully',info)
            }
        })
       }else{
	 console("Current Case Id is not same ")
	 resolve(true)      
       }
     })
   }*/


/*    createReport() 
    async function createReport(){
//	try{    
	console.log("About to get case details")    
        let caseDetails = await getCaseDetails()
	currentCaseId = caseDetails.caseId    
        console.log("got case details")		
        let addressDetails = await getAddressDetails(caseDetails._id)
        let addressComprehensiveDetails = await getAddressComprehensiveDetails(caseDetails._id)
        let addressOnlineDetails = await getAddressOnlineDetails(caseDetails._id)
        let addressTelephoneDetails = await getAddressTelephoneDetails(caseDetails._id)
        let courtRecordDetails = await getCourtRecordDetails(caseDetails._id)
        let criminalRecordDetails = await getCriminalRecordDetails(caseDetails._id)
        let educationDetails = await getEducationDetails(caseDetails._id)
        let educationAdvancedDetails = await getEducationAdvancedDetails(caseDetails._id)
        let educationComprehensiveDetails = await getEducationComprehensiveDetails(caseDetails._id)
        let employmentDetails = await getEmploymentDetails(caseDetails._id)
        let empbasicDetails = await getEmpBasicDetails(caseDetails._id)
        let empadvanceDetails = await getEmpAdvanceDetails(caseDetails._id)
        let referenceRecordDetails = await getReferenceDetails(caseDetails._id)
        let refBasicDetails = await getRefBasicDetails(caseDetails._id)
        let identityDetails = await getIdentityDetails(caseDetails._id)
        let creditCheckDetails = await getCreditCheckDetails(caseDetails._id)
        let credittransDetails = await getCreditTransDetails(caseDetails._id)
        let creditEquifaxDetails = await getCreditEquifaxDetails(caseDetails._id)
        let globaldatabaseDetails = await getGlobaldatabaseDetails(caseDetails._id)
        let drugtestfiveDetails = await getDrugTestFiveDetails(caseDetails._id)
        let drugtestsixDetails = await getDrugTestSixDetails(caseDetails._id)
        let drugtestsevenDetails = await getDrugTestSevenDetails(caseDetails._id)
        let drugtesteightDetails = await getDrugTestEightDetails(caseDetails._id)
        let drugtestnineDetails = await getDrugTestNineDetails(caseDetails._id)
        let drugtesttenDetails = await getDrugTestTenDetails(caseDetails._id)
        let dlCheckDetails = await getDlCheckDetails(caseDetails._id)
        let directorshipCheckDetails = await getDirectorshipCheckDetails(caseDetails._id)
        let voterIdDetails = await getVoterIdDetails(caseDetails._id)
        let vddAdvanceDetails = await getVddAdvanceDetails(caseDetails._id)
        let bankStmtDetails = await getBankStmtDetails(caseDetails._id)
        let siteCheckDetails = await getSiteCheckDetails(caseDetails._id)
        let psychometricDetails = await getPsychometricDetails(caseDetails._id)
//        let socialmediaCheckDetails = await getSocialMediaDetails(caseDetails._id)
        let facisl3Details = await getFacisl3Details(caseDetails._id)
        let ofacDetails = await getOfacDetails(caseDetails._id)
        let gapvfnDetails = await getGapVfnDetails(caseDetails._id)
        let passportDetails = await getPassportDetails(caseDetails._id)
//	let loaDetails = await getLoaDetails(caseDetails)    
        console.log("Passport details got")		
	console.log("All details  got")   
	console.log("Response to be sent")	
        res.json({message:"SUCCESS",jpegsToDelete:allJpegs})

        
    }*/
    

      

    
}

