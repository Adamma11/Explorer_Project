const Case = require('../../models/uploads/case.model');
const address = require('../../models/data_entry/address.model')
const courtrecord = require('../../models/data_entry/courtrecord.model')
const educationcomprehensive = require('../../models/data_entry/educationcomprehensive.model')
const employment =  require('../../models/data_entry/employment.model')
const globaldatabase = require('../../models/data_entry/globaldatabase.model')
const identity = require('../../models/data_entry/identity.model')
const bankstmt = require('../../models/data_entry/bankstmt.model')
const creditcheck = require('../../models/data_entry/creditcheck.model')
const creditequifax = require('../../models/data_entry/creditequifax.model')
const credittrans = require('../../models/data_entry/credittrans.model')
const criminalrecord = require('../../models/data_entry/criminalrecord.model')
const education = require('../../models/data_entry/education.model')
const educationadvanced = require('../../models/data_entry/educationadvanced.model')
const empbasic = require('../../models/data_entry/empbasic.model')
const empadvance = require('../../models/data_entry/empadvance.model')
const passport = require('../../models/data_entry/passport.model')
const voterid = require('../../models/data_entry/voterid.model')
const vddadvance = require('../../models/data_entry/vddadvance.model')
const socialmedia =require('../../models/data_entry/socialmedia.model')
const sitecheck = require('../../models/data_entry/sitecheck.model')
const drugtestfive = require('../../models/data_entry/drugtestfive.model')
const drugtestsix =require('../../models/data_entry/drugtestsix.model')
const drugtestseven =require('../../models/data_entry/drugtestseven.model')
const drugtesteight = require('../../models/data_entry/drugtesteight.model')
const drugtestnine =require('../../models/data_entry/drugtestnine.model')
const drugtestten = require('../../models/data_entry/drugtestten.model')
const facisl3 = require('../../models/data_entry/facisl3.model')
const addresscomprehensive = require('../../models/data_entry/addresscomprehensive.model')
const addressonline = require('../../models/data_entry/addressonline.model')
const addresstelephone = require('../../models/data_entry/addresstelephone.model')
const gapvfn = require('../../models/data_entry/gapvfn.model')
const ofac = require('../../models/data_entry/ofac.model')
const physostan = require ('../../models/data_entry/physostan.model')
const refbasic = require('../../models/data_entry/refbasic.model')
const reference = require('../../models/data_entry/reference.model')
const directorshipcheck = require('../../models/data_entry/directorshipcheck.model')
const dlcheck = require('../../models/data_entry/dlcheck.model')
const ColorMaster = require('../../models/administration/color_master.model')
const user_subclient_access = require('../../models/administration/user_subclient_access.model');
const Components = require("../../models/administration/component.model")
const fs = require("fs")




exports.get = async (req, res)=>{

        // Restricting Access to Client Account Manager and Client User Roles

        try {
            const caseid = req.query.caseid
            const caseData = await Case.findOne({ caseId: caseid })
    
            let userSubclientAccessData = await user_subclient_access.findOne({$and:[{subclient: caseData.subclient},{user:req.user.user_id}]})
            //userSubclientAccessData = userSubclientAccessData.map((data) => {
            //    return String(data.user)
            //})
    
    
    
            if (!userSubclientAccessData) {
                return res.status(403).json({ message: "Forbidden" })
            }
    
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Error Fetching data"
            })
        }








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

    function getColorCodeName(colorCode){
                console.log("In the function getcolorCodeName()")
	    	console.log("Lenght of ColorMasterDetails",colorMasterDetails.length)
                for(let i=0; i < colorMasterDetails.length;i++){
                   console.log("In color master ......checking for the colorCode sent " + colorCode)
                   console.log("In color master.......colorMasterDetails code is " + colorMasterDetails[i].colorCode)
                   if(colorMasterDetails[i]._id.toString() == colorCode){
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


    let getAddressDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
             address
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let addressDetails = {}
                    addressDetails.component = "Address Advanced"
                    addressDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    addressDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(addressDetails)
                }        
                console.log("Adding address details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
  // CourtrecordDetails


    let getCourtrecordDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
             courtrecord
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let courtrecordDetails = {}
                    courtrecordDetails.component = "courtrecord "
                    courtrecordDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    //courtrecordDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    courtrecordDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(courtrecordDetails)
                }        
                console.log("Adding courtrecord details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

 // educationcomprehensiveDetails

    let geteducationcomprehensiveDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            educationcomprehensive
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let educationcomprehensiveDetails = {}
                    educationcomprehensiveDetails.component = "educationcomprehensive "
                    educationcomprehensiveDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    educationcomprehensiveDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(educationcomprehensiveDetails)
                }        
                console.log("Adding educationcomprehensive details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // employment

    let getemploymentDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            employment
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let employmentDetails = {}
                    employmentDetails.component = "employmentDetails "
                    employmentDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    employmentDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(employmentDetails)
                }        
                console.log("Adding employment details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // globaldatabaseDetails
    let getglobaldatabaseDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            globaldatabase
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let globaldatabaseDetails = {}
                    globaldatabaseDetails.component = "globaldatabaseDetails "
                    globaldatabaseDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    globaldatabaseDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(globaldatabaseDetails)
                }        
                console.log("Adding employment details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // identity
    let getidentityDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            identity
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let identityDetails = {}
                    identityDetails.component = "identityDetails "
                    identityDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    identityDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(identityDetails)
                }        
                console.log("Adding identity details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // bankstmt

    let getbankstmtDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            bankstmt
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let bankstmtDetails = {}
                    bankstmtDetails.component = "bankstmtDetails "
                    bankstmtDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    bankstmtDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(bankstmtDetails)
                }        
                console.log("Adding identity details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // creditcheck
    let getcreditcheckDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            creditcheck
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let creditcheckDetails = {}
                    creditcheckDetails.component = "creditcheckDetails "
                    creditcheckDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    creditcheckDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(creditcheckDetails)
                }        
                console.log("Adding creditcheck details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // creditequifax

    let getcreditequifaxDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            creditequifax
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let creditequifaxDetails = {}
                    creditequifaxDetails.component = "creditequifaxDetails "
                    creditequifaxDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    creditequifaxDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(creditequifaxDetails)
                }        
                console.log("Adding creditequifax details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // credittrans

    let getcredittransDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            credittrans
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let credittransDetails = {}
                    credittransDetails.component = "credittransDetails "
                    credittransDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    credittransDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(credittransDetails)
                }        
                console.log("Adding credittrans details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // criminalrecord

    let getcriminalrecordDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            criminalrecord
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let criminalrecordDetails = {}
                    criminalrecordDetails.component = "criminalrecordDetails "
                    criminalrecordDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                   // criminalrecordDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    criminalrecordDetails.gradingColor = "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(criminalrecordDetails)
                }        
                console.log("Adding criminalrecord details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // education
    let geteducationDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            education
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let educationDetails = {}
                    educationDetails.component = "educationDetails "
                    educationDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    educationDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(educationDetails)
                }        
                console.log("Adding education details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // educationadvance
    let geteducationadvancedDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            educationadvanced
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let educationadvancedDetails = {}
                    educationadvancedDetails.component = "educationadvancedDetails "
                    educationadvancedDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    educationadvancedDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(educationadvancedDetails)
                }        
                console.log("Adding educationadvanced details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // empbasic
    let getempbasicDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            empbasic
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let empbasicDetails = {}
                    empbasicDetails.component = "empbasicDetails "
                    empbasicDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    empbasicDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(empbasicDetails)
                }        
                console.log("Adding empbasic details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // empadvance
    let getempadvanceDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            empadvance
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let empadvanceDetails = {}
                    empadvanceDetails.component = "empadvanceDetails "
                    empadvanceDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    empadvanceDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(empadvanceDetails)
                }        
                console.log("Adding empadvance details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }




    // passport
    let getpassportDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            passport
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let passportDetails = {}
                    passportDetails.component = "passportDetails "
                    passportDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    passportDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(passportDetails)
                }        
                console.log("Adding passport details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // voterid
    let getvoteridDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            voterid
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let voteridDetails = {}
                    voteridDetails.component = "voteridDetails "
                    voteridDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    voteridDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(voteridDetails)
                }        
                console.log("Adding voterid details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // vddadvance
    let getvddadvanceDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            vddadvance
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let vddadvanceDetails = {}
                    vddadvanceDetails.component = "vddadvanceDetails "
                    vddadvanceDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    vddadvanceDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(vddadvanceDetails)
                }        
                console.log("Adding vddadvance details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // socialmedia
    let getsocialmediaDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            socialmedia
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let socialmediaDetails = {}
                    socialmediaDetails.component = "socialmediaDetails "
                    socialmediaDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    socialmediaDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(socialmediaDetails)
                }        
                console.log("Adding socialmedia details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // sitecheck
    let getsitecheckDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            sitecheck
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let sitecheckDetails = {}
                    sitecheckDetails.component = "sitecheckDetails "
                    sitecheckDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    sitecheckDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(sitecheckDetails)
                }        
                console.log("Adding sitecheck details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // drugtestfive
    let getdrugtestfiveDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            drugtestfive
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let drugtestfiveDetails = {}
                    drugtestfiveDetails.component = "drugtestfiveDetails "
                    drugtestfiveDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    drugtestfiveDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(drugtestfiveDetails)
                }        
                console.log("Adding drugtestfive details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }

    // drugtestsix
    let getdrugtestsixDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            drugtestsix
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let drugtestsixDetails = {}
                    drugtestsixDetails.component = "drugtestsixDetails "
                    drugtestsixDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    drugtestsixDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(drugtestsixDetails)
                }        
                console.log("Adding drugtestsix details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // drugtestseven
    let getdrugtestsevenDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            drugtestseven
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let drugtestsevenDetails = {}
                    drugtestsevenDetails.component = "drugtestsevenDetails "
                    drugtestsevenDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    drugtestsevenDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(drugtestsevenDetails)
                }        
                console.log("Adding drugtestseven details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // drugtesteight
    let getdrugtesteightDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            drugtesteight
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let drugtesteightDetails = {}
                    drugtesteightDetails.component = "drugtesteightDetails "
                    drugtesteightDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    drugtesteightDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(drugtesteightDetails)
                }        
                console.log("Adding drugtesteight details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // drugtestnine
    let getdrugtestnineDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            drugtestnine
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let drugtestnineDetails = {}
                    drugtestnineDetails.component = "drugtestnineDetails "
                    drugtestnineDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    drugtestnineDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(drugtestnineDetails)
                }        
                console.log("Adding drugtestnine details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // drugtestten
    let getdrugtesttenDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            drugtestten
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let drugtesttenDetails = {}
                    drugtesttenDetails.component = "drugtesttenDetails "
                    drugtesttenDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    drugtesttenDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(drugtesttenDetails)
                }        
                console.log("Adding drugtestten details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // facisl3
    let getfacisl3Details = (case_id)=>{
        return new Promise((resolve,reject)=>{
            facisl3
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let facisl3Details = {}
                    facisl3Details.component = "facisl3Details "
                    facisl3Details.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    facisl3Details.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(facisl3Details)
                }        
                console.log("Adding facisl3 details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // addresscomprehensive

    let getaddresscomprehensiveDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            addresscomprehensive
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let addresscomprehensiveDetails = {}
                    addresscomprehensiveDetails.component = "addresscomprehensiveDetails "
                    addresscomprehensiveDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    addresscomprehensiveDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(addresscomprehensiveDetails)
                }        
                console.log("Adding addresscomprehensive details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // addressonline
    let getaddressonlineDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            addressonline
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let addressonlineDetails = {}
                    addressonlineDetails.component = "addressonlineDetails "
                    addressonlineDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    addressonlineDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(addressonlineDetails)
                }        
                console.log("Adding addressonline details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // addresstelephone
    let getaddresstelephoneDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            addresstelephone
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let addresstelephoneDetails = {}
                    addresstelephoneDetails.component = "addresstelephoneDetails "
                    addresstelephoneDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    addresstelephoneDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(addresstelephoneDetails)
                }        
                console.log("Adding addresstelephone details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }


    // gapvfn
    let getgapvfnDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            gapvfn
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let gapvfnDetails = {}
                    gapvfnDetails.component = "gapvfnDetails "
                    gapvfnDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    gapvfnDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(gapvfnDetails)
                }        
                console.log("Adding gapvfn details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // ofac
    let getofacDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            ofac
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let ofacDetails = {}
                    ofacDetails.component = "ofacDetails "
                    ofacDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    ofacDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(ofacDetails)
                }        
                console.log("Adding ofac details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // physostan
    let getphysostanDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            physostan
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let physostanDetails = {}
                    physostanDetails.component = "physostanDetails "
                    physostanDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    physostanDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(physostanDetails)
                }        
                console.log("Adding physostan details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // refbasic
    let getrefbasicDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            refbasic
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let refbasicDetails = {}
                    refbasicDetails.component = "refbasicDetails "
                    refbasicDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    refbasicDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(refbasicDetails)
                }        
                console.log("Adding refbasic details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // reference
    let getreferenceDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            reference
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let referenceDetails = {}
                    referenceDetails.component = "referenceDetails "
                    referenceDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    referenceDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(referenceDetails)
                }        
                console.log("Adding reference details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // directorshipcheck

    let getdirectorshipcheckDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            directorshipcheck
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let directorshipcheckDetails = {}
                    directorshipcheckDetails.component = "directorshipcheckDetails "
                    directorshipcheckDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    directorshipcheckDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(directorshipcheckDetails)
                }        
                console.log("Adding directorshipcheck details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }
    // dlcheck

    let getdlcheckDetails = (case_id)=>{
        return new Promise((resolve,reject)=>{
            dlcheck
            .find({case:case_id})
            .then(data=>{
                let items = []
                for(let i=0; i < data.length;i++){
                    let item = data[i]
                    let dlcheckDetails = {}
                    dlcheckDetails.component = "dlcheckDetails "
                    dlcheckDetails.status = item.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending"
                    dlcheckDetails.gradingColor = item.status == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                    items.push(dlcheckDetails)
                }        
                console.log("Adding dlcheck details")    
                resolve(items)    
            })
            .catch(err=>{
                resolve(null)
            })
        })
    }












    let findCase = function(){
        let caseDetails = {}
        return new Promise((resolve,reject)=>{
            Case 
            .findOne({caseId:req.query.caseid})
            
            .then(async data=>{
                console.log("Case Details:", JSON.stringify(data))
/*                caseDetails._id = data._id;
                caseDetails.caseId = data.caseId;
                caseDetails._id = data._id;
                caseDetails.candidateName = data.candidateName;
                caseDetails.clientName = data.clientName;
                caseDetails.subclientName = data.subclientName;
                // componentDetails.displayName =data.displayName;*/
//                caseDetails.ComponentFields = data.ComponentFields;
		        await getColorMaster()
                let caseDetails = ({
                    _id : data.id,
                    caseId:data.caseId,
                    candidateName:data.candidateName,
                    clientName:data.clientName,
                    subclientName:data.subclientName,
		    status:data.status == "OUTPUTQC-ACCEPTED" ? "Completed" : "Pending",
                    addressDetails:data.actualComponents.includes('address') ? await getAddressDetails(data._id) :[],
                    // status:data.status == "OUTPUTQC-ACCEPTED" ? "Completed" :"Pending",
                    // grade:data.grade == "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : "",
                    courtrecordDetails: data.actualComponents.includes('courtrecord') ? await getCourtrecordDetails(data._id) :[],

                    educationcomprehensiveDetails: data.actualComponents.includes('educationcomprehensive') ? await geteducationcomprehensiveDetails(data._id) :[],

                    employmentDetails: data.actualComponents.includes('employment') ? await getemploymentDetails(data._id) :[],

                    globaldatabaseDetails: data.actualComponents.includes('globaldatabase') ? await getglobaldatabaseDetails(data._id) :[],

                    identityDetails: data.actualComponents.includes('identity') ? await getidentityDetails(data._id) :[],

                    bankstmtDetails: data.actualComponents.includes('bankstmt') ? await getbankstmtDetails(data._id) :[],

                    creditcheckDetails: data.actualComponents.includes('creditcheck') ? await getcreditcheckDetails(data._id) :[],

                    creditequifaxDetails: data.actualComponents.includes('creditequifax') ? await getcreditequifaxDetails(data._id) :[],

                    credittransDetails: data.actualComponents.includes('credittrans') ? await getcredittransDetails(data._id) :[],

                    criminalrecordDetails: data.actualComponents.includes('criminalrecord') ? await getcriminalrecordDetails(data._id) :[],
              
                    educationDetails: data.actualComponents.includes('education') ? await geteducationDetails(data._id) :[],

                    educationadvancedDetails: data.actualComponents.includes('educationadvanced') ? await geteducationadvancedDetails(data._id) :[],

                    empbasicDetails: data.actualComponents.includes('empbasic') ? await getempbasicDetails(data._id) :[],

                    empadvanceDetails: data.actualComponents.includes('empadvance') ? await getempadvanceDetails(data._id) :[],

                    passportDetails: data.actualComponents.includes('passport') ? await getpassportDetails(data._id) :[],

                    voteridDetails: data.actualComponents.includes('voterid') ? await getvoteridDetails(data._id) :[],

                    vddadvanceDetails: data.actualComponents.includes('vddadvance') ? await getvddadvanceDetails(data._id) :[],

                    socialmediaDetails: data.actualComponents.includes('socialmedia') ? await getsocialmediaDetails(data._id) :[],

                    sitecheckDetails: data.actualComponents.includes('sitecheck') ? await getsitecheckDetails(data._id) :[],

                    drugtestfiveDetails: data.actualComponents.includes('drugtestfive') ? await getdrugtestfiveDetails(data._id) :[],

                    drugtestsixDetails: data.actualComponents.includes('drugtestsix') ? await getdrugtestsixDetails(data._id) :[],

                    drugtestsevenDetails: data.actualComponents.includes('drugtestseven') ? await getdrugtestsevenDetails(data._id) :[],

                    drugtesteightDetails: data.actualComponents.includes('drugtesteight') ? await getdrugtesteightDetails(data._id) :[],

                    drugtestnineDetails: data.actualComponents.includes('drugtestnine') ? await getdrugtestnineDetails(data._id) :[],

                    drugtesttenDetails: data.actualComponents.includes('drugtestten') ? await getdrugtesttenDetails(data._id) :[],

                    facisl3Details: data.actualComponents.includes('facisl3') ? await getfacisl3Details(data._id) :[],

                    addresscomprehensiveDetails: data.actualComponents.includes('addresscomprehensive') ? await getaddresscomprehensiveDetails(data._id) :[],

                    addressonlineDetails: data.actualComponents.includes('addressonline') ? await getaddressonlineDetails(data._id) :[],

                    addresstelephoneDetails: data.actualComponents.includes('addresstelephone') ? await getaddresstelephoneDetails(data._id) :[],

                    gapvfnDetails: data.actualComponents.includes('gapvfn') ? await getgapvfnDetails(data._id) :[],

                    ofacDetails: data.actualComponents.includes('ofac') ? await getofacDetails(data._id) :[],

                    physostanDetails: data.actualComponents.includes('physostan') ? await getphysostanDetails(data._id) :[],

                    refbasicDetails: data.actualComponents.includes('refbasic') ? await getrefbasicDetails(data._id) :[],

                    referenceDetails: data.actualComponents.includes('reference') ? await getreferenceDetails(data._id) :[],

                    directorshipcheckDetails: data.actualComponents.includes('directorshipcheck') ? await getdirectorshipcheckDetails(data._id) :[],

                    dlcheckDetails: data.actualComponents.includes('dlcheck') ? await getdlcheckDetails(data._id) :[],



                    
                    
                })

                const keys = Object.keys(caseDetails)

                for (let i = 0; i < keys.length; i++) {

                    if (Array.isArray(caseDetails[keys[i]]) && caseDetails[keys[i]].length === 0) {

                        delete caseDetails[keys[i]]

                    }

                }






              res.json(caseDetails)
                resolve(null)
                
                
            })
            
            .catch(err=>{
                console.log("case not fount", err)
                resolve(null)
            })
        })
        
    }
    
    start()
    async function start (){
        
        
        findCase();
    }
    
    
    
};
/////////////////////////////////////////////////////////////////////////////////////////////
exports.getData = async (req, res) => {
    try {
        const caseid = req.query.caseid;
        const caseData = await Case.findOne({ caseId: caseid });

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        const userSubclientAccessData = await user_subclient_access.findOne({
            $and: [{ subclient: caseData.subclient }, { user: req.user.user_id }]
        });

        if (!userSubclientAccessData) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const colorMasterDetails = await ColorMaster.find();

        const getColorCodeName = (colorCode) => {
            const color = colorMasterDetails.find(color => color._id.toString() === colorCode);
            return color ? color.name : "In Progress";
        };

        const getColorCode = (colorCode) => {
            const color = colorMasterDetails.find(color => color._id.toString() === colorCode.toString());
            return color ? color.colorCode.substring(1) : "";
        };

        const getComponentsDetails = async (case_id, component) => {
            const model = require(`../../models/data_entry/${component}.model`);
            const data = await model.find({ case: case_id });
            // return data.map(item => ({
            //     component: component,
            //     status: item.status === "OUTPUTQC-ACCEPTED" ? "Completed" : "Pending",
            //     gradingColor: item.status === "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
            // }));
            let arr = []
            for (let item of data) {
                let obj = {
                    component: await getComponentName(component),
                    status: item.status === "OUTPUTQC-ACCEPTED" ? "Completed" : "Pending",
                    gradingColor: item.status === "OUTPUTQC-ACCEPTED" ? getColorCodeName(item.grade) : ""
                }
                arr.push(obj)
            }
            return arr
        };

        const findCase = async () => {
            const data = await Case.findOne({ caseId: caseid });

            if (!data) {
                throw new Error("Case not found");
            }

            const caseDetails = {
                _id: data.id,
                caseId: data.caseId,
                candidateName: data.candidateName,
                clientName: data.clientName,
                subclientName: data.subclientName,
		gradingColor: data.grade ? await getColorCodeName(data.grade) : "",
                status: data.status === "OUTPUTQC-ACCEPTED" ? "Completed" : "Pending",
            };

            //Looping through actual components 
            await Promise.all(data.actualComponents.map(async (component) => {
                caseDetails[`${component}Details`] = await getComponentsDetails(data._id, component);
            }));

            const keys = Object.keys(caseDetails);
            for (const key of keys) {
                if (Array.isArray(caseDetails[key]) && caseDetails[key].length === 0) {
                    delete caseDetails[key];
                }
            }
	
		if(data.reportDate){
			if(fs.existsSync(`/REPO_STORAGE/case_uploads/${data.caseId}/reports/FINAL`)){
				const fileName = fs.readdirSync(`/REPO_STORAGE/case_uploads/${data.caseId}/reports/FINAL`)[0]
				const base64 = fs.readFileSync(`/REPO_STORAGE/case_uploads/${data.caseId}/reports/FINAL/${fileName}`, {encoding: 'base64'})
				caseDetails.report = base64	
			}
		}

           /* if (data.subclient === "606d535ca683d2be0c01440e") {
                const keysToCheck = keys.filter(key => key.includes("Details")).filter(key => key.includes("globaldatabaseDetails") || key.includes("identityDetails") || key.includes("courtrecordDetails"));

                if (keysToCheck.length) {
                    caseDetails.preHireStatus = keysToCheck.some(key => caseDetails[key].some(item => item.gradingColor === "Red")) ? "Does not meet company requirements" :
                        keysToCheck.some(key => caseDetails[key].some(item => item.gradingColor !== "Green")) ? "Unable to Verify" : "Meets Company Requirements";

                    caseDetails.postHireStatus = keys.some(key => key.includes("Details") && caseDetails[key].some(item => item.gradingColor === "Red")) ? "Does not meet company requirements" :
                        keys.some(key => key.includes("Details") && caseDetails[key].some(item => item.gradingColor !== "Green")) ? "Unable to Verify" : "Meets Company Requirements";

                    if (caseDetails.preHireStatus !== "Meets Company Requirements") {
                        caseDetails.postHireStatus = "On Hold";
                    }
                } else {
                    caseDetails.preHireStatus = "Work In Progress";
                    caseDetails.postHireStatus = "Work In Progress";
                }

                if (data.status === "STOP-CASE") {
                    caseDetails.preHireStatus = "Stop/Cancel";
                    caseDetails.postHireStatus = "Stop/Cancel";
                }
            }*/

            return caseDetails;
        };

        const caseDetails = await findCase();
        return res.json(caseDetails);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error Fetching data" });
    }
};

async function getComponentName(component) {
    const compName = await Components.findOne({ name: component })
    return compName.displayName
}
