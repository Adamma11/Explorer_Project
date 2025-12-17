const express = require('express');
/*const employment = require('../../models/data_entry/employment.model')
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
const uan = require('../../models/data_entry/uan.model');
const addresstelephone = require('../../models/data_entry/addresstelephone.model');
const addresscomprehensive = require('../../models/data_entry/addresscomprehensive.model');
const addressonline = require('../../models/data_entry/addressonline.model');
const educationcomprehensive = require('../../models/data_entry/educationcomprehensive.model');
const educationadvanced = require('../../models/data_entry/educationadvanced.model');
const drugtestsix = require('../../models/data_entry/drugtestsix.model');
const drugtestseven = require('../../models/data_entry/drugtestseven.model');
const drugtesteight = require('../../models/data_entry/drugtesteight.model');
const drugtestnine = require('../../models/data_entry/drugtestnine.model');
const facisl3 = require('../../models/data_entry/facisl3.model');
const credittrans = require('../../models/data_entry/credittrans.model');
const creditequifax = require('../../models/data_entry/creditequifax.model');
const empadvance = require('../../models/data_entry/empadvance.model');
const empbasic = require('../../models/data_entry/empbasic.model');
const vddadvance = require('../../models/data_entry/vddadvance.model');
const dlcheck = require('../../models/data_entry/dlcheck.model');
const voterid = require('../../models/data_entry/voterid.model');
const ofac = require('../../models/data_entry/ofac.model');
const directorshipcheck = require('../../models/data_entry/directorshipcheck.model')
const sitecheck = require('../../models/data_entry/sitecheck.model')
const physostan = require('../../models/data_entry/physostan.model')
const bankstmt = require('../../models/data_entry/bankstmt.model')
const gapvfn = require('../../models/data_entry/gapvfn.model')
const exitinterview = require('../../models/data_entry/exitinterview.model')*/
const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model');
const Case = require('../../models/uploads/case.model');
const UserVendorAccess = require('../../models/administration/user_vendor_access.model');
const fs = require('fs');
const pdf2img = require('pdf2img');
const merge = require('easy-pdf-merge')
const path = require('path');
const user_subclient_accessModel = require('../../models/administration/user_subclient_access.model');
const subclient = require("../../models/administration/subclient.model")
const sendMail = require("../mails/send_mail.controller");
const e = require('connect-timeout');
const { nextTick } = require('process');
const xlsx = require('xlsx')
const moment = require('moment')
const component_fieldModel = require('../../models/administration/component_field.model');
const Component = require("../../models/administration/component.model")

exports.getAllChecksForAVendor = (req, res) => {
    let page = req.query.pageCount
    let offSet = page * 100;
    console.log("About to get checks  for  the vendor");
    let findVendorForUser = function () {
        return new Promise((resolve, reject) => {
            UserVendorAccess
                .findOne({ user: req.user.user_id })
                .then(data => {
                    console.log("Got the vendor ", data.vendor);
                    resolve(data.vendor)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findemploymentList = function (vendor) {
        console.log("In employment");
        return new Promise((resolve, reject) => {
            employment
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .sort({ _id: 1 })
                .skip(offSet)
                .limit(100)
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findeducationList = function (vendor) {
        console.log("In education");
        return new Promise((resolve, reject) => {
            education
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVend: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .sort({ _id: 1 })
                .skip(offSet)
                .limit(100)
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findaddressList = function (vendor) {
        console.log("In address checking for vendor ", vendor);
        return new Promise((resolve, reject) => {
            address
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: "VERIFIER-REJECTED" }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcourtrecordList = function (vendor) {
        console.log("In court record");
        return new Promise((resolve, reject) => {
            courtrecord
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findcriminalrecordList = function (vendor) {
        console.log("In criminal record");
        return new Promise((resolve, reject) => {
            criminalrecord
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findidentityList = function (vendor) {
        return new Promise((resolve, reject) => {
            identity
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcreditcheckList = function (vendor) {
        return new Promise((resolve, reject) => {
            creditcheck
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetalsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findsocialmediaList = function (vendor) {
        return new Promise((resolve, reject) => {
            socialmedia
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findglobaldatabaseList = function (vendor) {
        return new Promise((resolve, reject) => {
            globaldatabase
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findreferenceList = function (vendor) {
        return new Promise((resolve, reject) => {
            reference
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestfiveList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestfive
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcolorblindnessList = function (vendor) {
        return new Promise((resolve, reject) => {
            colorblindness
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findexitinterviewList = function (vendor) {
        return new Promise((resolve, reject) => {
            exitinterview
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtesttenList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestten
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findpassportList = function (vendor) {
        return new Promise((resolve, reject) => {
            passport
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let finduanList = function (vendor) {
        return new Promise((resolve, reject) => {
            uan
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findaddresstelephoneList = function (vendor) {
        return new Promise((resolve, reject) => {
            addresstelephone
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findaddressonlineList = function (vendor) {
        console.log("In address online for vendor")
        return new Promise((resolve, reject) => {
            addressonline.find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    console.log("Got the data for addressonline for vendor", data);
                    resolve(data)
                })
                .catch(err => {
                    console.log("Addressonline error listing for vendor ", err)
                    reject()
                })
        })
    }

    let findaddresscomprehensiveList = function (vendor) {
        return new Promise((resolve, reject) => {
            addresscomprehensive
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findeducationcomprehensiveList = function (vendor) {
        return new Promise((resolve, reject) => {
            educationcomprehensive
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findeducationadvancedList = function (vendor) {
        return new Promise((resolve, reject) => {
            educationadvanced
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestsixList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestsix
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let finddrugtestsevenList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestseven
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtesteightList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtesteight
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'persosnalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestnineList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestnine
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findfacisl3List = function (vendor) {
        return new Promise((resolve, reject) => {
            facisl3
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatdToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findcredittransList = function (vendor) {
        return new Promise((resolve, reject) => {
            credittrans
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findcreditequifaxList = function (vendor) {
        return new Promise((resolve, reject) => {
            creditequifax
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findempadvanceList = function (vendor) {
        return new Promise((resolve, reject) => {
            empadvance
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findempbasicList = function (vendor) {
        return new Promise((resolve, reject) => {
            empbasic
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findvddadvanceList = function (vendor) {
        return new Promise((resolve, reject) => {
            vddadvance
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddlcheckList = function (vendor) {
        return new Promise((resolve, reject) => {
            dlcheck
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findvoteridList = function (vendor) {
        return new Promise((resolve, reject) => {
            voterid
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findofacList = function (vendor) {
        return new Promise((resolve, reject) => {
            ofac
                .find({ $or: [{ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { allocatedToVendor: vendor, status: 'VERIFIER-REJECTED' }] }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .populate({ path: 'personalDetailsData' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    /*    let getPersonalDetails  = new function(data){
            console.log("About to get personal details for  ",data);
            return new Promise((resolve,reject)=>{
                PersonalDetailsData
                .findOne({case:item.case._id})
                .then(personalDetailsData=>{   
                    data.forEach(item=>{                
                      item["dateofbirth"]=personalDetailsData.dateofbirth        
                      item["fathername"]=personalDetailsData.fathername                
                      item["mobilenumber"]=personalDetailsData.mobilename                        
                    })                                
                    resolve(data)
                })
                .catch(err=>{                
                  reject()                
                })                        
             })                                
        }    */
    prepareList();
    async function prepareList() {
        let vendor = await findVendorForUser()
        let employmentList = await findemploymentList(vendor)
        console.log("got employment lit for vendor");
        let educationList = await findeducationList(vendor)
        console.log("got education list for vendor")
        let addressList = await findaddressList(vendor)
        console.log("got address list for vendor")
        let courtrecordList = await findcourtrecordList(vendor)
        console.log("got court record list for vendor")
        let criminalrecordList = await findcriminalrecordList(vendor)
        console.log("got criminal record list for vendor")
        let identityList = await findidentityList(vendor)
        console.log("got identity list for vendor")
        let creditcheckList = await findcreditcheckList(vendor)
        console.log("got credit check list for vendor")
        let socialmediaList = await findsocialmediaList(vendor)
        console.log("got social medial kist for vendor")
        let globaldatabaseList = await findglobaldatabaseList(vendor)
        console.log("got globaldatabase list for vendor")
        let referenceList = await findreferenceList(vendor)
        console.log("got reference list for vendor")
        let drugtestfiveList = await finddrugtestfiveList(vendor)
        console.log("got the drug five list for vendor")
        let drugtesttenList = await finddrugtesttenList(vendor)
        console.log("got the drugten list for vendor")
        let passportList = await findpassportList(vendor)
        console.log("got the passport list for vendor")
        let uanList = await finduanList(vendor)
        console.log("got the uan list for vendor")
        let addresstelephoneList = await findaddresstelephoneList(vendor)
        console.log("got the address telephone list for vendor")
        let addressonlineList = await findaddressonlineList(vendor)
        console.log("got the address online list for vendor")
        let addresscomprehensiveList = await findaddresscomprehensiveList(vendor)
        let educationcomprehensiveList = await findeducationcomprehensiveList(vendor)
        let educationadvancedList = await findeducationadvancedList(vendor)
        let drugtestsixList = await finddrugtestsixList(vendor)
        let drugtestsevenList = await finddrugtestsevenList(vendor)
        let drugtesteightList = await finddrugtesteightList(vendor)
        let drugtestnineList = await finddrugtestnineList(vendor)
        let facisl3List = await findfacisl3List(vendor)
        let credittransList = await findcredittransList(vendor)
        let creditequifaxList = await findcreditequifaxList(vendor)
        let empadvanceList = await findempadvanceList(vendor)
        let empbasicList = await findempbasicList(vendor)
        let vddadvanceList = await findvddadvanceList(vendor)
        let dlcheckList = await finddlcheckList(vendor)
        let voteridList = await findvoteridList(vendor)
        let ofaList = await findofacList(vendor)
        let colorblindnessList = await findcolorblindnessList(vendor)
        let exitinterviewList = await findexitinterviewList(vendor)
        let combinedArray = [...employmentList, ...educationList, ...addressList, ...courtrecordList, ...criminalrecordList, ...identityList, ...creditcheckList, ...socialmediaList, ...globaldatabaseList, ...referenceList, ...drugtestfiveList, ...drugtesttenList, ...passportList, ...uanList, ...addresstelephoneList, ...addresscomprehensiveList, ...addressonlineList, ...educationcomprehensiveList, ...educationadvancedList, ...drugtestsixList, ...drugtestsevenList, ...drugtesteightList, ...drugtestnineList, ...facisl3List, ...credittransList, ...creditequifaxList, ...empadvanceList, ...empbasicList, ...vddadvanceList, ...dlcheckList, ...voteridList, ...ofaList, ...colorblindnessList, ...exitinterviewList]

        res.json(combinedArray);
        //	  res.json(addressonlineList)
    }

}

exports.getDetailsForCaseStatusReport = (req, res) => {
    let findemploymentList = function (case_id) {
        console.log("In employment");
        return new Promise((resolve, reject) => {
            employment
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findeducationList = function (case_id) {
        console.log("In education");
        return new Promise((resolve, reject) => {
            education
                .find({ case: case_id })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findaddressList = function (case_id) {
        return new Promise((resolve, reject) => {
            address
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcourtrecordList = function (case_id) {
        console.log("In court record");
        return new Promise((resolve, reject) => {
            courtrecord
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    console.log("Manjunath found the problem in court reocrds......", err)
                    reject()
                })
        })
    }

    let findcriminalrecordList = function (case_id) {
        console.log("In criminal record");
        return new Promise((resolve, reject) => {
            criminalrecord
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findidentityList = function (case_id) {
        return new Promise((resolve, reject) => {
            identity
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcreditcheckList = function (case_id) {
        return new Promise((resolve, reject) => {
            creditcheck
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findsocialmediaList = function (case_id) {
        return new Promise((resolve, reject) => {
            socialmedia
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findglobaldatabaseList = function (case_id) {
        return new Promise((resolve, reject) => {
            globaldatabase
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findreferenceList = function (case_id) {
        return new Promise((resolve, reject) => {
            reference
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestfiveList = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestfive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcolorblindnessList = function (case_id) {
        return new Promise((resolve, reject) => {
            colorblindness
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findexitinterviewList = function (case_id) {
        return new Promise((resolve, reject) => {
            exitinterview
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtesttenList = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestten
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findpassportList = function (case_id) {
        return new Promise((resolve, reject) => {
            passport
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let finduanList = function (case_id) {
        return new Promise((resolve, reject) => {
            uan
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findaddresstelephoneList = function (case_id) {
        return new Promise((resolve, reject) => {
            addresstelephone
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findaddresscomprehensiveList = function (case_id) {
        return new Promise((resolve, reject) => {
            addresscomprehensive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findeducationcomprehensiveList = function (case_id) {
        return new Promise((resolve, reject) => {
            educationcomprehensive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findeducationadvancedList = function (case_id) {
        return new Promise((resolve, reject) => {
            educationadvanced
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestsixList = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestsix
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let finddrugtestsevenList = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestseven
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtesteightList = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtesteight
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestnineList = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestnine
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findfacisl3List = function (case_id) {
        return new Promise((resolve, reject) => {
            facisl3
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findcredittransList = function (case_id) {
        return new Promise((resolve, reject) => {
            credittrans
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findcreditequifaxList = function (case_id) {
        return new Promise((resolve, reject) => {
            creditequifax
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findempadvanceList = function (case_id) {
        return new Promise((resolve, reject) => {
            empadvance
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findempbasicList = function (case_id) {
        return new Promise((resolve, reject) => {
            empbasic
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findvddadvanceList = function (case_id) {
        return new Promise((resolve, reject) => {
            vddadvance
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddlcheckList = function (case_id) {
        return new Promise((resolve, reject) => {
            dlcheck
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findvoteridList = function (case_id) {
        return new Promise((resolve, reject) => {
            voterid
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findofacList = function (case_id) {
        return new Promise((resolve, reject) => {
            ofac
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let prepareList = function (acase) {
        return new Promise((resolve, reject) => {
            Case
                .findOne({ _id: acase })
                .populate({ path: 'subclient' })
                .populate({ path: 'client' })
                .lean(true)
                .then(async caseData => {
                    console.log("In prepare list trying to get the checks for the case ", acase);
                    let employmentList = await findemploymentList(acase)
                    let educationList = await findeducationList(acase)
                    let addressList = await findaddressList(acase)
                    let courtrecordList = await findcourtrecordList(acase)
                    let criminalrecordList = await findcriminalrecordList(acase)
                    let identityList = await findidentityList(acase)
                    let creditcheckList = await findcreditcheckList(acase)
                    let socialmediaList = await findsocialmediaList(acase)
                    let globaldatabaseList = await findglobaldatabaseList(acase)
                    let referenceList = await findreferenceList(acase)
                    let drugtestfiveList = await finddrugtestfiveList(acase)
                    let drugtesttenList = await finddrugtesttenList(acase)
                    let passportList = await findpassportList(acase)
                    let uanList = await finduanList(acase)
                    let addresstelephoneList = await findaddresstelephoneList(acase)
                    let addresscomprehensiveList = await findaddresscomprehensiveList(acase)
                    let educationcomprehensiveList = await findeducationcomprehensiveList(acase)
                    let educationadvancedList = await findeducationadvancedList(acase)
                    let drugtestsixList = await finddrugtestsixList(acase)
                    let drugtestsevenList = await finddrugtestsevenList(acase)
                    let drugtesteightList = await finddrugtesteightList(acase)
                    let drugtestnineList = await finddrugtestnineList(acase)
                    let facisl3List = await findfacisl3List(acase)
                    let credittransList = await findcredittransList(acase)
                    let creditequifaxList = await findcreditequifaxList(acase)
                    let empadvanceList = await findempadvanceList(acase)
                    let empbasicList = await findempbasicList(acase)
                    let vddadvanceList = await findvddadvanceList(acase)
                    let dlcheckList = await finddlcheckList(acase)
                    let voteridList = await findvoteridList(acase)
                    let ofaList = await findofacList(acase)
                    let colorblindnessList = await findcolorblindnessList(acase)
                    let exitinterviewList = await findexitinterviewList(acase)
                    let combinedArray = [...employmentList, ...educationList, ...addressList, ...courtrecordList, ...criminalrecordList, ...identityList, ...creditcheckList, ...socialmediaList, ...globaldatabaseList, ...referenceList, ...drugtestfiveList, ...drugtesttenList, ...passportList, ...uanList, ...addresstelephoneList, ...addresscomprehensiveList, ...educationcomprehensiveList, ...educationadvancedList, ...drugtestsixList, ...drugtestsevenList, ...drugtesteightList, ...drugtestnineList, ...facisl3List, ...credittransList, ...creditequifaxList, ...empadvanceList, ...empbasicList, ...vddadvanceList, ...dlcheckList, ...voteridList, ...ofaList, ...colorblindnessList, ...exitinterviewList]
                    caseData.checks = combinedArray;
                    resolve(caseData);

                })
                .catch(err => {
                    console.log("Error in case staus report is.......", err);
                    res.status(500).json({
                        message: err.message
                    })
                })
        })
    }
    let cases = req.body.cases
    getCaseListWithDetails(cases)

    async function getCaseListWithDetails(cases) {
        try {
            console.log("In list of cases", cases.length);
            let caseList = new Array();
            for (let i = 0; i < cases.length; i++) {
                let acase = cases[i]
                console.log("About to call prepareList");
                let modifiedCase = await prepareList(acase)
                caseList.push(modifiedCase)
                if (modifiedCase.checks.length > 0) {
                    console.log("This case contains checks ", modifiedCase.caseId)
                }
            }
            console.log("returning the case list");
            res.json(caseList)
        } catch (error) {
            console.log("Error in getting the case list with details ", error);
            res.status(500).json({
                message: error.message
            })
        }
    }

}
exports.getAllReadyForReport = (req, res) => {
    console.log("About to get Cases ready for report");
    let findemploymentList = function (vendor) {
        console.log("In employment");
        return new Promise((resolve, reject) => {
            employment
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findeducationList = function (vendor) {
        console.log("In education");
        return new Promise((resolve, reject) => {
            education
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findaddressList = function (vendor) {
        console.log("In address checking for vendor ", vendor);
        return new Promise((resolve, reject) => {
            address
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcourtrecordList = function (vendor) {
        console.log("In court record");
        return new Promise((resolve, reject) => {
            courtrecord
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findcriminalrecordList = function (vendor) {
        console.log("In criminal record");
        return new Promise((resolve, reject) => {
            criminalrecord
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findidentityList = function (vendor) {
        return new Promise((resolve, reject) => {
            identity
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcreditcheckList = function (vendor) {
        return new Promise((resolve, reject) => {
            creditcheck
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findsocialmediaList = function (vendor) {
        return new Promise((resolve, reject) => {
            socialmedia
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findglobaldatabaseList = function (vendor) {
        return new Promise((resolve, reject) => {
            globaldatabase
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findreferenceList = function (vendor) {
        return new Promise((resolve, reject) => {
            reference
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestfiveList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestfive
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findcolorblindnessList = function (vendor) {
        return new Promise((resolve, reject) => {
            colorblindness
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findexitinterviewList = function (vendor) {
        return new Promise((resolve, reject) => {
            exitinterview
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtesttenList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestten
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findpassportList = function (vendor) {
        return new Promise((resolve, reject) => {
            passport
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let finduanList = function (vendor) {
        return new Promise((resolve, reject) => {
            uan
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findaddresstelephoneList = function (vendor) {
        return new Promise((resolve, reject) => {
            addresstelephone
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findaddresscomprehensiveList = function (vendor) {
        return new Promise((resolve, reject) => {
            addresscomprehensive
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findeducationcomprehensiveList = function (vendor) {
        return new Promise((resolve, reject) => {
            educationcomprehensive
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findeducationadvancedList = function (vendor) {
        return new Promise((resolve, reject) => {
            educationadvanced
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestsixList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestsix
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let finddrugtestsevenList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestseven
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtesteightList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtesteight
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddrugtestnineList = function (vendor) {
        return new Promise((resolve, reject) => {
            drugtestnine
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findfacisl3List = function (vendor) {
        return new Promise((resolve, reject) => {
            facisl3
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findcredittransList = function (vendor) {
        return new Promise((resolve, reject) => {
            credittrans
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findcreditequifaxList = function (vendor) {
        return new Promise((resolve, reject) => {
            creditequifax
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findempadvanceList = function (vendor) {
        return new Promise((resolve, reject) => {
            empadvance
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findempbasicList = function (vendor) {
        return new Promise((resolve, reject) => {
            empbasic
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let findvddadvanceList = function (vendor) {
        return new Promise((resolve, reject) => {
            vddadvance
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let finddlcheckList = function (vendor) {
        return new Promise((resolve, reject) => {
            dlcheck
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findvoteridList = function (vendor) {
        return new Promise((resolve, reject) => {
            voterid
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                                resolve(data)
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let findofacList = function (vendor) {
        return new Promise((resolve, reject) => {
            ofac
                .find({ allocatedToVendor: vendor, status: "ALLOCATED-TO-VENDOR" }, { _id: 1, case: 1, component: 1, status: 1 })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(data => {
                    data.forEach(item => {
                        PersonalDetailsData
                            .findOne({ case: item.case._id })
                            .then(personalDetailsData => {
                                data.forEach(item => {
                                    item["dateofbirth"] = personalDetailsData.dateofbirth
                                    item["fathername"] = personalDetailsData.fathername
                                    item["mobilenumber"] = personalDetailsData.mobilename
                                })
                                resolve(data)
                            })
                            .catch(err => {
                                reject()
                            })
                    })
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    /*    let getPersonalDetails  = new function(data){
            console.log("About to get personal details for  ",data);
            return new Promise((resolve,reject)=>{
                PersonalDetailsData
                .findOne({case:item.case._id})
                .then(personalDetailsData=>{   
                    data.forEach(item=>{                
                      item["dateofbirth"]=personalDetailsData.dateofbirth        
                      item["fathername"]=personalDetailsData.fathername                
                      item["mobilenumber"]=personalDetailsData.mobilename                        
                    })                                
                    resolve(data)
                })
                .catch(err=>{                
                  reject()                
                })                        
             })                                
        }    */
    prepareList();
    async function prepareList() {
        let vendor = await findVendorForUser()
        let employmentList = await findemploymentList(vendor)
        let educationList = await findeducationList(vendor)
        let addressList = await findaddressList(vendor)
        let courtrecordList = await findcourtrecordList(vendor)
        let criminalrecordList = await findcriminalrecordList(vendor)
        let identityList = await findidentityList(vendor)
        let creditcheckList = await findcreditcheckList(vendor)
        let socialmediaList = await findsocialmediaList(vendor)
        let globaldatabaseList = await findglobaldatabaseList(vendor)
        let referenceList = await findreferenceList(vendor)
        let drugtestfiveList = await finddrugtestfiveList(vendor)
        let drugtesttenList = await finddrugtesttenList(vendor)
        let passportList = await findpassportList(vendor)
        let uanList = await finduanList(vendor)
        let addresstelephoneList = await findaddresstelephoneList(vendor)
        let addresscomprehensiveList = await findaddresscomprehensiveList(vendor)
        let educationcomprehensiveList = await findeducationcomprehensiveList(vendor)
        let educationadvancedList = await findeducationadvancedList(vendor)
        let drugtestsixList = await finddrugtestsixList(vendor)
        let drugtestsevenList = await finddrugtestsevenList(vendor)
        let drugtesteightList = await finddrugtesteightList(vendor)
        let drugtestnineList = await finddrugtestnineList(vendor)
        let facisl3List = await findfacisl3List(vendor)
        let credittransList = await findcredittransList(vendor)
        let creditequifaxList = await findcreditequifaxList(vendor)
        let empadvanceList = await findempadvanceList(vendor)
        let empbasicList = await findempbasicList(vendor)
        let vddadvanceList = await findvddadvanceList(vendor)
        let dlcheckList = await finddlcheckList(vendor)
        let voteridList = await findvoteridList(vendor)
        let ofaList = await findofacList(vendor)
        let colorblindnessList = await findcolorblindnessList(vendor)
        let exitinterviewList = await findexitinterviewList(vendor)
        let combinedArray = [...employmentList, ...educationList, ...addressList, ...courtrecordList, ...criminalrecordList, ...identityList, ...creditcheckList, ...socialmediaList, ...globaldatabaseList, ...referenceList, ...drugtestfiveList, ...drugtesttenList, ...passportList, ...uanList, ...addresstelephoneList, ...addresscomprehensiveList, ...educationcomprehensiveList, ...educationadvancedList, ...drugtestsixList, ...drugtestsevenList, ...drugtesteightList, ...drugtestnineList, ...facisl3List, ...credittransList, ...creditequifaxList, ...empadvanceList, ...empbasicList, ...vddadvanceList, ...dlcheckList, ...voteridList, ...ofaList, ...colrblindnessList, ...exitinterviewList]
        res.json(combinedArray);
    }
}

exports.convertPdfsToImagesForAGivenCase = (req, res) => {
    // read case

    // read all the checks for the case
    let mergePdfs = function (filePath) {
        console.log("In mergePdfs, About to merge pdfs")
        return new Promise((resolve, reject) => {
            let mergedPdfFound = false
            fs.access(filePath + '/merged.pdf', fs.F_OK, (err) => {
                if (err) {
                    console.log("Merged file not found - go ahead and create")
                } else {
                    mergedPdfFound = true
                }
            })
            if (!mergedPdfFound) {
                if (fs.existsSync(filePath)) {
                    let filesArray = new Array()
                    fs.readdirSync(filePath).forEach(file => {
                        console.log("file name in mergePdfs is ", file)
                        if (file != 'merged.pdf') {
                            let input = filePath + '/' + file
                            let extn = path.extname(input)
                            console.log("Extension is ", extn)
                            if (extn != '.jpg' && extn != '.JPG') {
                                console.log("Added to array")
                                filesArray.push(input)
                            }
                        }
                    })
                    console.log("files array in merePdfs is ", filesArray);
                    if (filesArray.length > 1) {
                        merge(filesArray, filePath + '/merged.pdf', function (err) {
                            if (err) {
                                console.log("Error merging files", err)
                                reject()
                            }
                        })
                    } else if (filesArray.length == 1) {
                        fs.copyFile(filesArray[0], filePath + '/merged.pdf', (err) => {
                            if (err) {
                                console.log("error copying file", err)
                                reject()
                            }
                        })
                    }
                    resolve(true)
                } else {
                    resolve(true)
                }
            } else {
                resolve(true)
            }

        })
    }
    let writeJpg = function (filePath) {
        return new Promise((resolve, reject) => {
            console.log('File Path in Write JPG ', filePath)
            let powFound = false
            fs.access(filePath + '/pow_1.jpg', fs.F_OK, (err) => {
                if (err) {
                    console.log("Merged file not found - go ahead and create")
                } else {
                    powFound = true
                }
            })
            if (!powFound) {
                if (fs.existsSync(filePath)) {
                    let success = false;
                    fs.readdirSync(filePath).forEach(file => {
                        var input = filePath + '/' + file;
                        let extn = path.extname(input)
                        console.log('input is ', input)
                        console.log('in write jpg extension is ', extn)
                        if (file == 'merged.pdf' || file == 'merged.PDF') {
                            pdf2img.setOptions({
                                type: 'jpg',
                                size: 1024,
                                density: 600,
                                outputdir: filePath + "/",
                                outputname: 'pow',
                                page: null,
                                quality: 100
                            });
                            console.log("aout to convert ", input)
                            pdf2img.convert(input, function (err, info) {
                                if (err) {
                                    console.log('error converting', err)
                                    reject()
                                } else {
                                    console.log('converted successfully', info)
                                    success = true;
                                }
                            })
                        } else {
                            success = true;
                        }
                    })
                    resolve(success)
                } else {
                    console.log("File not found")
                    reslove(true)
                }
            } else {
                resolve(true)
            }

        })
    }


    let convertEmploymentPdfs = function (case_id) {
        console.log("In employment conversion");
        return new Promise((resolve, reject) => {
            employment
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    console.log('data of employment for conversion ', data)
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        console.log('file path looking for is ', filePath);
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertEducationPdfs = function (case_id) {
        console.log("In education");
        return new Promise((resolve, reject) => {
            education
                .find({ case: case_id })
                .populate({ path: 'case' })
                .populate({ path: 'component' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        console.log("In education file path is ", filePath);
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                                                console.log("Actual file in education is ",file)
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }

                    resolve(data)
                })
                .catch(err => {
                    console.log("err is ", err);
                    reject()
                })
        })
    }
    let convertAddressPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            console.log('In address conversion')
            address
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]

                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        console.log('File path for address conversion is ', filePath)
                        console.log("About to merge pdfs")
                        try {
                            await mergePdfs(filePath)
                            //                     console.log("Bout to write jpgs")
                            await writeJpg(filePath)
                        } catch (error) {
                            console.log("Error conveting Address PDFs", error)
                        }
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                                               console.log('address file being converted is ',input)
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }
                                    })
                                    resolve(data) */
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertCourtRecordPdfs = function (case_id) {
        console.log("In court record");
        return new Promise((resolve, reject) => {
            courtrecord
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        try {
                            await mergePdfs(filePath)
                            await writeJpg(filePath)
                        } catch (error) {
                            console.log("Error converging Court Records", error)
                        }
                        /*                if(fs.existsSync(filePath)){
                                           console.log('file path',filePath,' exists') 
                                            fs.readdirSync(filePath).forEach(file=>{
                                    var input = filePath + '/' + file    
                                                pdf2img.setOptions({
                                                type: 'jpg',                                // png or jpg, default jpg
                                                size: 1024,                                 // default 1024
                                                density: 600,                               // default 600
                                                outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                });
                                            })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    /*let convertCourtRecordPdfs = function(case_id){
        console.log("In court record");
        return new Promise((resolve,reject)=>{
            courtrecord
            .find({case:case_id})
            .populate({path:'component'})
        .populate({path:'case'})    
            .then(data=>{
                data.forEach(item=>{
                    let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
            console.log('file path in court record ',filePath)    
                    if(fs.existsSync(filePath))
               fs.readdirSync(filepath).forEach(file=>{
                        var input   = filePath + '/' + file;
    
                        pdf2img.setOptions({
                          type: 'jpg',                                // png or jpg, default jpg
                          size: 1024,                                 // default 1024
                          density: 600,                               // default 600
                          outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                          outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                          page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                          quality: 100                                // jpg compression quality, default: 100
                        });
                        pdf2img.convert(input, function(err, info) {
                            if (err) console.log(err)
                            else console.log(info);
                          });
                       })			   
             }    
                    })
                })
                resolve(data)
            })
            .catch(err=>{
                reject()
            })
        })
    }*/
    /*let writeJpg = function(filePath){
        return new Promise((resolve,reject)=>{
                console.log('File Path in Write JPG ',filePath)		
            if(fs.existsSync(filePath)){
               let success = false;	    
               fs.readdirSync(filePath).forEach(file=>{
              var input = filePath + '/' + file;
              let extn = path.extname(input)   
              console.log('input is ',input)     
              console.log('in write jpg extension is ',extn)     
              if(extn != 'jpg' && extn != 'JPG'){
                  pdf2img.setOptions({
                     type:'jpg',
                         size:1024,
                         density:600,
                     outputdir:filePath + "/",
                     outputname: 'pow',
                     page:null,
                     quality:100	  
                          });
                  pdf2img.convert(input,function(err,info){
                     if(err){
                    console.log('error converting',err)     
                    success = true;     
                     }else{
                    console.log('converted successfully',info)
                    success = true;     
                     }	     
                  })
              }else{
                    success = true;		  
              }	  
               })
              resolve(success)	    
            }else{
              reslove(true)	    
                }		    
        })	
    }*/
    let convertCriminalRecordPdfs = function (case_id) {
        console.log("In criminal record conversion new one");
        return new Promise((resolve, reject) => {
            criminalrecord
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        console.log("Got the item");
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        console.log('About to merge pdfs')
                        try {
                            await mergePdfs(filePath)
                            //                    console.log("About to write jpg")    
                            await writeJpg(filePath)
                        } catch (error) {
                            console.log("Error converting pdf in criminal records", error)
                        }

                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertIdentityPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            console.log("About to convert identity for caseId ", case_id)
            identity
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    console.log('identity data is ', data)
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        console.log('File path in identity ', filePath)
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertCreditCheckPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            creditcheck
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i];
                        //                item["imagePaths"] = []
                        console.log("In credit check trying to get image paths.....................");
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertSocialMediaPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            socialmedia
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertGlobalDatabasePdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            globaldatabase
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertReferencePdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            reference
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        //		await mergePdfs(filePath)
                        //                await writeJpg(filePath)    
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertDrugTestFivePdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestfive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertDrugTestTenPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestten
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertPassportPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            passport
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertAddressTelephonePdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            addresstelephone
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let iteme = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertAddressComprehensivePdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            addresscomprehensive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertEducationComprehensivePdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            educationcomprehensive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    /*let mergePdfs = function(filesArray,filePath){
        return new Promise((resolve,reject)=>{
           merge(filesArray,filePath,function(err){
              if(err){
                console.log("Error merging files",err)
                reject()		  
              }		  
           })
           console.log("Merged")	    
           resolve(true)	    
        }	    
    }*/
    let convertEducationAdvancedPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            educationadvanced
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        try {
                            await mergePdfs(filePath)
                            await writeJpg(filePath)
                        } catch (error) {
                            console.log("Error converging education advanced pdfs", error)
                        }
                        /*                if(fs.existsSync(filePath)){
                                    let filesArray = new Array();	
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                                                console.log("Actual file in education advanced is ",file)
                                    let ext = path.extname(input)
                                	
                                    if(ext == '.pdf' || ext == '.PDF'){
                                      filesArray.push(input) 
                                          console.log('added to file array',input)		
                                    }	
                                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                     console.log('files Array is ',filesArray)
                                     console.log("About to call pdf merge")
                                     merge(filesArray,filePath+'/merged.pdf',function(err){
                                         if(err){
                                                console.log("Error merging files",err)			 
                                         }		 
                                     }) 
                        //		     await mergePdfs(filesArray,filePath+'/merged.pdf')	
                                     console.log("Merger completed");	
                                     pdf2img.setOptions({
                                         type:'jpg',
                                         size:1024,
                                         density:600,
                                         outputdir:filePath + "/",
                                         outputname: 'pow',
                                         page:null,
                                         quality:100
                                     });
                                         console.log("Let us convert merged file to jpg",filePath+"/merged.pdf") 		
                                         let newInput = filePath + "/merged.pdf"	
                                     console.log("New Input contains ",newInput);	
                                         pdf2img.convert(newInput,function(err,info){
                                      if(err) console.log(err)
                                         else console.log(info)   
                                       })			     
                        
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    console.log("Eror is ", err)
                    reject()
                })
        })
    }

    let convertDrugTestSixPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestsix
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertDrugTestSevenPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestseven
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertDrugTestEightPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtesteight
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertDrugTestNinePdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            drugtestnine
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertFacis13Pdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            facisl3
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertCreditTransPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            credittrans
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertCreditEquifaxPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            creditequifax
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertEmpAdvancedPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            empadvance
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertEmpBasicPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            empbasic
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertVddAdvancedPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            vddadvance
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertDlPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            dlcheck
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let convertVoterIdPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            voterid
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + "/" + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve()
                })
                .catch(err => {
                    reject()
                })
        })
    }

    let convertOfacPdfs = function (case_id) {
        return new Promise((resolve, reject) => {
            ofac
                .find({ case: case_id })
                .populate({ path: 'component' })
                .populate({ path: 'case' })
                .then(async data => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        let filePath = '/REPO_STORAGE/case_uploads' + '/' + item.case.caseId + item.component.name + '/' + item._id + '/' + 'proofofwork'
                        await mergePdfs(filePath)
                        await writeJpg(filePath)
                        /*                if(fs.existsSync(filePath)){
                                            fs.readdirSync(filePath).forEach(file=>{
                                                var input   = filePath + '/' + file;
                        
                                                pdf2img.setOptions({
                                                  type: 'jpg',                                // png or jpg, default jpg
                                                  size: 1024,                                 // default 1024
                                                  density: 600,                               // default 600
                                                  outputdir: filePath + "/" , // output folder, default null (if null given, then it will create folder name same as file name)
                                                  outputname: 'pow',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                                                  page: null,                                 // convert selected page, default null (if null given, then it will convert all pages)
                                                  quality: 100                                // jpg compression quality, default: 100
                                                });
                                                pdf2img.convert(input, function(err, info) {
                                                    if (err) console.log(err)
                                                    else console.log(info);
                                                  });
                                             })
                                        }*/
                    }
                    resolve(data)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    startConversion();

    async function startConversion() {
        try {
            let case_id
            let data = ({
                caseDetails: null,
                personalDetails: null,
                checks: null
            })
            console.log("reading case", req.params.case_id);
            Case
                .findOne({ caseId: req.params.case_id })
                .then(caseDetailsData => {
                    data["caseDetails"] = caseDetailsData;
                    case_id = caseDetailsData._id;
                })
                .catch(err => {
                    console.log("Error occurred while reading case details for report ", err);
                    res.status(500).json({
                        message: err.message
                    })
                })
            console.log("employment conversion")
            await convertEmploymentPdfs(case_id)
            console.log("education conversion")
            await convertEducationPdfs(case_id)
            console.log("address conversion")
            await convertAddressPdfs(case_id)
            console.log("court record conversion")
            await convertCourtRecordPdfs(case_id)
            console.log("criminal conversison")
            await convertCriminalRecordPdfs(case_id)
            console.log("identity conversion")
            await convertIdentityPdfs(case_id)
            console.log("credit check conversion")
            await convertCreditCheckPdfs(case_id)
            console.log("social media conversion")
            await convertSocialMediaPdfs(case_id)
            console.log("global database conversion")
            await convertGlobalDatabasePdfs(case_id)
            console.log("refence conversion")
            await convertReferencePdfs(case_id)
            console.log("drug  test five conversion")
            await convertDrugTestFivePdfs(case_id)
            console.log("Drug test ten conversison")
            await convertDrugTestTenPdfs(case_id)
            console.log("Passport conversion")
            await convertPassportPdfs(case_id)
            console.log("Address telephone conversion")
            await convertAddressTelephonePdfs(case_id)
            console.log("Address comprehensive conversion")
            await convertAddressComprehensivePdfs(case_id)
            console.log("Education comprehensive conversion")
            await convertEducationComprehensivePdfs(case_id)
            console.log("Education advanced conversion")
            await convertEducationAdvancedPdfs(case_id)
            console.log("Drug test six converion")
            await convertDrugTestSixPdfs(case_id)
            console.log("Drug test seven conversion")
            await convertDrugTestSevenPdfs(case_id)
            console.log("Drug test eight conversion")
            await convertDrugTestEightPdfs(case_id)
            console.log("Drug test nine conversion")
            await convertDrugTestNinePdfs(case_id)
            console.log("FACS13 conversion")
            await convertFacis13Pdfs(case_id)
            console.log("Credit trans conversion")
            await convertCreditTransPdfs(case_id)
            console.log("Cridit equifax conversion")
            await convertCreditEquifaxPdfs(case_id)
            console.log("Emp advanced conversion")
            await convertEmpAdvancedPdfs(case_id)
            console.log("Emp basic conversion")
            await convertEmpBasicPdfs(case_id)
            console.log("Vdd Advanced conversion")
            await convertVddAdvancedPdfs(case_id)
            console.log("DL conversison")
            await convertDlPdfs(case_id)
            console.log("Voter Id conversion")
            await convertVoterIdPdfs(case_id)
            console.log("Ofac convrsion")
            await convertOfacPdfs(case_id)
            console.log("Completed the Writing Process");
            res.json({ message: "Completed Conversion" });
        } catch (error) {
            console.log("Error getting the list ", error);
            res.status(500).json({ message: error });
        }

    }

}

/*exports.updateStatusForAGivenCase = async (req, res) => {
  try {
    console.log("About to update status for the case ", req.params.case_id);
    console.log("Status to update is", req.body.status);
    const componentData = await Component.find({});
    const components = componentData.map((item) => item.name);
          let statusFound = false;

    for (let i = 0; i < components.length; i++) {
      const currComponent = components[i];
      const model = require(`../../models/data_entry/${currComponent}.model`);
      const modelData = await model.find({ case: req.params.case_id });
      for (let j = 0; j < modelData.length; j++) {
        let item = modelData[j];
        if (
          item.status != "MENTOR-REVIEW-ACCEPTED" &&
          item.status != "OUTPUTQC-ACCEPTED"
        ) {
          statusFound = true;
          break;
        }
      }
      if (statusFound) {
        break;
      }
    }
    if (!statusFound) {
      await Case.findOneAndUpdate({_id: req.params.case_id},{ status: req.body.status });
    }
    return res.json({ message: "case status updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};*/
exports.updateStatusForAGivenCase = async (req, res) => {
  try {
    const case_id = req.params.case_id;
    const status = req.body.status;
    console.log("About to update status for the case ");
    console.log("Status to update is", status);

    const allComponents = await Component.find({});
    let statusFound = true;

    for (let i = 0; i < allComponents.length; i++) {
      const currComponent = allComponents[i].name;

      const model = require(`../../models/data_entry/${currComponent}.model`);

      const modelData = await model.find({ case: case_id });
      console.log("Model Data for " + currComponent, modelData);

      for (let j = 0; j < modelData.length; j++) {
        const currData = modelData[j];
        if (status === "MENTOR-REVIEW-ACCEPTED") {
          if (
            currData.status != "MENTOR-REVIEW-ACCEPTED" &&
            currData.status != "OUTPUTQC-ACCEPTED" &&
            currData.status != "OUTPUTQC-REJECTED"
          ) {
            statusFound = false;
            break;
          }
        } else {
          if (currData.status !== status) {
            statusFound = false;
            break;
          }
        }
      }

      if (!statusFound) {
        break;
      }
    }

    if (statusFound) {
      await Case.findOneAndUpdate({ _id: case_id }, { status: status });
    }
    const caseData = await Case.findOne({ _id: case_id });
    return res.json(caseData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};


/*exports.updateStatusForAGivenCase = (req, res) => {
    console.log("About to update status for the case ", req.params.case_id);
    console.log("Status to update is", req.body.status);
    // read all the checks for the case
    let getEmploymentStatus = function (case_id, statusToCheck) {
        console.log("In employment");
        return new Promise((resolve, reject) => {
            employment
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }

                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getEducationStatus = function (case_id, statusToCheck) {
        console.log("In education");
        return new Promise((resolve, reject) => {
            education
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    console.log("err is ", err);
                    resolve(false)
                })
        })
    }
    let getAddressStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            console.log("In address");
            address
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getCourtRecordStatus = function (case_id, statusToCheck) {
        console.log("In court record");
        return new Promise((resolve, reject) => {
            courtrecord
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getCriminalStatus = function (case_id, statusToCheck) {
        console.log("In criminal record");
        return new Promise((resolve, reject) => {
            criminalrecord
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getIdentityStatus = function (case_id, statusToCheck) {
        console.log("In Identity");
        return new Promise((resolve, reject) => {
            identity
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    console.log("Error in identity during update status of a case ", err)
                    resolve(false)
                })
        })
    }
    let getCreditCheckStatus = function (case_id, statusToCheck) {
        console.log("In Credit Check");
        return new Promise((resolve, reject) => {
            creditcheck
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getSocialMediaStatus = function (case_id, statusToCheck) {
        console.log("In social media");
        return new Promise((resolve, reject) => {
            socialmedia
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getGlobalDatabaseStatus = function (case_id, statusToCheck) {
        console.log("In Global Database");
        return new Promise((resolve, reject) => {
            globaldatabase
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getReferenceStatus = function (case_id, statusToCheck) {
        console.log("In Reference");
        return new Promise((resolve, reject) => {
            reference
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getRefBasicStatus = function (case_id, statusToCheck) {
        console.log("In Reference Basic");
        return new Promise((resolve, reject) => {
            refbasic
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }



    let getDrugTestFiveStatus = function (case_id, statusToCheck) {
        console.log("In Drug Test Five");
        return new Promise((resolve, reject) => {
            drugtestfive
                .find({ case: case_id })
                //          .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getColorBlindnessStatus = function (case_id, statusToCheck) {
        console.log("In Drug Test Five");
        return new Promise((resolve, reject) => {
            colorblindness
                .find({ case: case_id })
                //          .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getExitInterviewStatus = function (case_id, statusToCheck) {
        console.log("In Drug Test Five");
        return new Promise((resolve, reject) => {
            exitinterview
                .find({ case: case_id })
                //          .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getDrugTestTenStatus = function (case_id, statusToCheck) {
        console.log("In Drug Test Ten");
        return new Promise((resolve, reject) => {
            drugtestten
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getPassportStatus = function (case_id, statusToCheck) {
        console.log("In Passport");
        return new Promise((resolve, reject) => {
            passport
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getUanStatus = function (case_id, statusToCheck) {
        console.log("In Passport");
        return new Promise((resolve, reject) => {
            uan
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getAddressTelephoneStatus = function (case_id, statusToCheck) {
        console.log("In Address Telephone");
        return new Promise((resolve, reject) => {
            addresstelephone
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getAddressComprehensiveStatus = function (case_id, statusToCheck) {
        console.log("In Address Comprehensive");
        return new Promise((resolve, reject) => {
            addresscomprehensive
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getEducationComprehensiveStatus = function (case_id, statusToCheck) {
        console.log("In Education Comprehensive");
        return new Promise((resolve, reject) => {
            educationcomprehensive
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getEducationAdvancedStatus = function (case_id, statusToCheck) {
        console.log("In Education Advanced");
        return new Promise((resolve, reject) => {
            educationadvanced
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getDrugTestSixStatus = function (case_id, statusToCheck) {
        console.log("In Drug Test Six");
        return new Promise((resolve, reject) => {
            drugtestsix
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getDrugTestSevenStatus = function (case_id, statusToCheck) {
        console.log("In Drug Test Seven");
        return new Promise((resolve, reject) => {
            drugtestseven
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getDrugTestEightStatus = function (case_id, statusToCheck) {
        console.log("In Drug Test Eight");
        return new Promise((resolve, reject) => {
            drugtesteight
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getDrugTestNineStatus = function (case_id, statusToCheck) {
        console.log("In Drug Test Nine");
        return new Promise((resolve, reject) => {
            drugtestnine
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getFacis13Status = function (case_id, statusToCheck) {
        console.log("In Facis L3");
        return new Promise((resolve, reject) => {
            facisl3
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getCreditTransStatus = function (case_id, statusToCheck) {
        console.log("In Credit Trans");
        return new Promise((resolve, reject) => {
            credittrans
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getCreditEquifaxStatus = function (case_id, statusToCheck) {
        console.log("In Credit Equifax");
        return new Promise((resolve, reject) => {
            creditequifax
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getEmpAdvancedStatus = function (case_id, statusToCheck) {
        console.log("In Emp Advance");
        return new Promise((resolve, reject) => {
            empadvance
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getEmpBasicStatus = function (case_id, statusToCheck) {
        console.log("In Emp Basic");
        return new Promise((resolve, reject) => {
            empbasic
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getVddAdvancedStatus = function (case_id, statusToCheck) {
        console.log("In Vdd Advance");
        return new Promise((resolve, reject) => {
            vddadvance
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getDlStatus = function (case_id, statusToCheck) {
        console.log("In DL Check");
        return new Promise((resolve, reject) => {
            dlcheck
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getVoterIdStatus = function (case_id, statusToCheck) {
        console.log("In Voter Id");
        return new Promise((resolve, reject) => {
            voterid
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getOfacStatus = function (case_id, statusToCheck) {
        console.log("In OFAC");
        return new Promise((resolve, reject) => {
            ofac
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getAddressOnlineStatus = function (case_id, statusToCheck) {
        console.log("In Address Online");
        return new Promise((resolve, reject) => {
            addressonline
                .find({ case: case_id })
                //          .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }

    let getDirectorshipCheckStatus = function (case_id, statusToCheck) {
        console.log("In Directorship Check");
        return new Promise((resolve, reject) => {
            directorshipcheck
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getSiteCheckStatus = function (case_id, statusToCheck) {
        console.log("In Site Check");
        return new Promise((resolve, reject) => {
            sitecheck
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getPsychometricCheckStatus = function (case_id, statusToCheck) {
        console.log("In Psychometric Standard");
        return new Promise((resolve, reject) => {
            physostan
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getBankStmtStatus = function (case_id, statusToCheck) {
        console.log("In Bank Statment");
        return new Promise((resolve, reject) => {
            bankstmt
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }
    let getGapVfnCheckStatus = function (case_id, statusToCheck) {
        console.log("In Gap Verification");
        return new Promise((resolve, reject) => {
            gapvfn
                .find({ case: case_id })
                //            .populate({path:'component'})
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    resolve(false)
                })
        })
    }


    startConversion();

    async function startConversion() {
        try {
            let addressStatus = await getAddressStatus(req.params.case_id, req.body.status)
            let addressOnlineStatus = await getAddressOnlineStatus(req.params.case_id, req.body.status)
            let addressTelephoneStatus = await getAddressTelephoneStatus(req.params.case_id, req.body.status)
            let addressComprehensiveStatus = await getAddressComprehensiveStatus(req.params.case_id, req.body.status)
            let bankStmtStatus = await getBankStmtStatus(req.params.case_id, req.body.status)
            let courtRecordStatus = await getCourtRecordStatus(req.params.case_id, req.body.status)
            let employmentStatus = await getEmploymentStatus(req.params.case_id, req.body.status)
            let educationStatus = await getEducationStatus(req.params.case_id, req.body.status)
            let criminalStatus = await getCriminalStatus(req.params.case_id, req.body.status)
            let identityStatus = await getIdentityStatus(req.params.case_id, req.body.status)
            let creditCheckStatus = await getCreditCheckStatus(req.params.case_id, req.body.status)
            let socialMediaStatus = await getSocialMediaStatus(req.params.case_id, req.body.status)
            let globalDatabaseStatus = await getGlobalDatabaseStatus(req.params.case_id, req.body.status)
            let referenceStatus = await getReferenceStatus(req.params.case_id, req.body.status)
            let refBasicStatus = await getRefBasicStatus(req.params.case_id, req.body.status)
            let drugTestFiveStatus = await getDrugTestFiveStatus(req.params.case_id, req.body.status)
            let drugTestTenStatus = await getDrugTestTenStatus(req.params.case_id, req.body.status)
            let passportStatus = await getPassportStatus(req.params.case_id, req.body.status)
            let uanStatus = await getUanStatus(req.params.case_id, req.body.status)
            let educationComprehensiveStatus = await getEducationComprehensiveStatus(req.params.case_id, req.body.status)
            let educationAdvancedStatus = await getEducationAdvancedStatus(req.params.case_id, req.body.status)
            let drugTestSixStatus = await getDrugTestSixStatus(req.params.case_id, req.body.status)
            let drugTestSevenStatus = await getDrugTestSevenStatus(req.params.case_id, req.body.status)
            let drugTestEightStatus = await getDrugTestEightStatus(req.params.case_id, req.body.status)
            let drugTestNineStatus = await getDrugTestNineStatus(req.params.case_id, req.body.status)
            let facis13Status = await getFacis13Status(req.params.case_id, req.body.status)
            let creditTransStatus = await getCreditTransStatus(req.params.case_id, req.body.status)
            let creditEquifaxStatus = await getCreditEquifaxStatus(req.params.case_id, req.body.status)
            let empAdvancedStatus = await getEmpAdvancedStatus(req.params.case_id, req.body.status)
            let empBasicStatus = await getEmpBasicStatus(req.params.case_id, req.body.status)
            let vddAdvancedStatus = await getVddAdvancedStatus(req.params.case_id, req.body.status)
            let dlStatus = await getDlStatus(req.params.case_id, req.body.status)
            let voterIdStatus = await getVoterIdStatus(req.params.case_id, req.body.status)
            let ofacStatus = await getOfacStatus(req.params.case_id, req.body.status)
            let directorshipCheckStatus = await getDirectorshipCheckStatus(req.params.case_id, req.body.status)
            let siteCheckStatus = await getSiteCheckStatus(req.params.case_id, req.body.status)
            let psychometricCheckStatus = await getPsychometricCheckStatus(req.params.case_id, req.body.status)
            let gapVfnCheckStatus = await getGapVfnCheckStatus(req.params.case_id, req.body.status)
            let colorBlindnessStatus = await getColorBlindnessStatus(req.params.case_id, req.body.status)
            let exitInterviewStatus = await getExitInterviewStatus(req.params.case_id, req.body.status)
            //	    let addressTelephoneStatus = await getAddressTelephone(req.params.case_id,req.body.status)	
            /*            console.log("Completed the gettin all statuses ",(employmentStatus && educationStatus && addressStatus && courtRecordStatus && criminalStatus && identityStatus &&
                            creditCheckStatus && socialMediaStatus && globalDatabaseStatus && referenceStatus && drugTestFiveStatus &&
                            drugTestTenStatus && passportStatus && addressTelephoneStatus && addressComprehensiveStatus && educationComprehensiveStatus &&
                            educationAdvancedStatus && drugTestSixStatus && drugTestSevenStatus && drugTestEightStatus && drugTestNineStatus && facis13Status &&
                            creditTransStatus && creditEquifaxStatus && empAdvancedStatus && empBasicStatus && vddAdvancedStatus && dlStatus && voterIdStatus &&
                            ofacStatus));
            console.log(addressStatus)
            console.log(addressOnlineStatus)
            console.log(addressComprehensiveStatus)
            console.log(addressTelephoneStatus)
            console.log(bankStmtStatus)
            console.log(courtRecordStatus)
            console.log(creditCheckStatus)
            console.log(creditEquifaxStatus)
            console.log(creditTransStatus)
            console.log(criminalStatus)
            console.log(directorshipCheckStatus)
            console.log(dlStatus)
            console.log(drugTestFiveStatus)
            console.log(drugTestSixStatus)
            console.log(drugTestSevenStatus)
            console.log(drugTestEightStatus)
            console.log(drugTestNineStatus)
            console.log(drugTestTenStatus)
            console.log(educationStatus)
            console.log(educationAdvancedStatus)
            console.log(educationComprehensiveStatus)
            console.log(empAdvancedStatus)
            console.log(empBasicStatus)
            console.log(employmentStatus)
            console.log(facis13Status)
            console.log(gapVfnCheckStatus)
            console.log(globalDatabaseStatus)
            console.log(identityStatus)
            console.log(ofacStatus)
            console.log(passportStatus)
            console.log(uanStatus)
            console.log(psychometricCheckStatus)
            console.log(refBasicStatus)
            console.log(referenceStatus)
            console.log(siteCheckStatus)
            console.log(socialMediaStatus)
            console.log(vddAdvancedStatus)
            console.log(voterIdStatus)
            if (employmentStatus && educationStatus && addressStatus && courtRecordStatus && criminalStatus && identityStatus &&
                creditCheckStatus && socialMediaStatus && globalDatabaseStatus && referenceStatus && refBasicStatus && drugTestFiveStatus &&
                drugTestTenStatus && passportStatus && uanStatus && addressTelephoneStatus && addressComprehensiveStatus && educationComprehensiveStatus &&
                educationAdvancedStatus && drugTestSixStatus && drugTestSevenStatus && drugTestEightStatus && drugTestNineStatus && facis13Status &&
                creditTransStatus && creditEquifaxStatus && empAdvancedStatus && empBasicStatus && vddAdvancedStatus && dlStatus && voterIdStatus &&
                ofacStatus && addressOnlineStatus && directorshipCheckStatus && siteCheckStatus && psychometricCheckStatus && gapVfnCheckStatus && bankStmtStatus && colorBlindnessStatus && exitInterviewStatus) {
                Case
                    .findOneAndUpdate({ _id: req.params.case_id }, { status: req.body.status })
                    .then(data => {
                        //                    console.log("data is ",data);
                        console.log("Updated Status of the Case ", req.params.case_id);
                        console.log("Updated Data is here", data)
                        if (data != null) {
                            res.json(data)
                        } else {
                            res.json({ message: " " })
                        }
                    })
                    .catch(err => {
                        console.log("Error updating status............................................................", err)
                        res.status(500).json({
                            message: "Some error occurred while updating the status of the case"
                        })
                    })

            } else {
                console.log("Not all are complete and hence case status remains the same");
            }
            res.json({ message: "Completed Conversion" });
        } catch (error) {
            console.log("Error getting the list ", error);
            res.status(500).json({ message: error });
        }

    }

}*/
exports.getCasesInOutputqc = (req, res) => {

    let getEmploymentStatus = function (case_id, statusToCheck) {
        console.log("In employment");
        return new Promise((resolve, reject) => {
            employment
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }

                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getEducationStatus = function (case_id, statusToCheck) {
        console.log("In education");
        return new Promise((resolve, reject) => {
            education
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    console.log("err is ", err);
                    reject(false)
                })
        })
    }
    let getAddressStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            address
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject()
                })
        })
    }
    let getCourtRecordStatus = function (case_id, statusToCheck) {
        console.log("In court record");
        return new Promise((resolve, reject) => {
            courtrecord
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getCriminalStatus = function (case_id, statusToCheck) {
        console.log("In criminal record");
        return new Promise((resolve, reject) => {
            criminalrecord
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getIdentityStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            identity
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getCreditCheckStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            creditcheck
                .find({ case: case_id })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getSocialMediaStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            socialmedia
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getGlobalDatabaseStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            globaldatabase
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getReferenceStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            reference
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getDrugTestFiveStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            drugtestfive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getColorBlindnessStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            colorblindness
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getExitInterviewStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            exitinterview
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getDrugTestTenStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            drugtestten
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getPassportStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            passport
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getUanStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            uan
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getAddressTelephoneStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            addresstelephone
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getAddressComprehensiveStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            addresscomprehensive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getEducationComprehensiveStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            educationcomprehensive
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getEducationAdvancedStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            educationadvanced
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getDrugTestSixStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            drugtestsix
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getDrugTestSevenStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            drugtestseven
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getDrugTestEightStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            drugtesteight
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getDrugTestNineStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            drugtestnine
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getFacis13Status = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            facisl3
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getCreditTransStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            credittrans
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    console.log("Error is ........", err)
                    reject(false)
                })
        })
    }

    let getCreditEquifaxStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            creditequifax
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getEmpAdvancedStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            empadvance
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getEmpBasicStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            empbasic
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(fase)
                })
        })
    }

    let getVddAdvancedStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            vddadvance
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break
                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getDlStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            dlcheck
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
    let getVoterIdStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            voterid
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    let getOfacStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            ofac
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }
  let getCurrentAddressStatus = function (case_id, statusToCheck) {
        return new Promise((resolve, reject) => {
            currentaddress
                .find({ case: case_id })
                .populate({ path: 'component' })
                .then(data => {
                    let statusFound = true
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i]
                        if (statusToCheck == 'MENTOR-REVIEW-ACCEPTED') {
                            if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {
                            } else {
                                statusFound = false;
                                break

                            }
                        } else {
                            if (item.status != statusToCheck) {
                                statusFound = false;
                                break
                            }
                        }
                    }
                    resolve(statusFound)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    Case
        .find({ status: "INPUTQC-ACCEPTED" })
        .skip(9000)
        .limit(1000)
        .populate({ path: 'client' })
        .populate({ path: 'subclient' })
        .then(async data => {
            let casesForOutputqc = new Array();
            for (let i = 0; i < data.length; i++) {
                let item = data[i]
                let employmentStatus = await getEmploymentStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("emp done");
                let educationStatus = await getEducationStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("education done");
                let addressStatus = await getAddressStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("address done");
                let courtRecordStatus = await getCourtRecordStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("court record done");
                let criminalStatus = await getCriminalStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("criminal record done");
                let identityStatus = await getIdentityStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("identity record done");
                let creditCheckStatus = await getCreditCheckStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("credit check record done");
                let socialMediaStatus = await getSocialMediaStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("social media check record done");
                let globalDatabaseStatus = await getGlobalDatabaseStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("global database done");
                let referenceStatus = await getReferenceStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("reference database done");
                let drugTestFiveStatus = await getDrugTestFiveStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("drugtest 5 done");
                let drugTestTenStatus = await getDrugTestTenStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("drugtest 10 done");
                let passportStatus = await getPassportStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log(" passport done");
                let uanStatus = await getUanStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("uan done");
                let addressTelephoneStatus = await getAddressTelephoneStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("address telephone done");
                let addressComprehensiveStatus = await getAddressComprehensiveStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("address comprehensive done");
                let educationComprehensiveStatus = await getEducationComprehensiveStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("education comprehensive done");
                let educationAdvancedStatus = await getEducationAdvancedStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("education advanced done");
                let drugTestSixStatus = await getDrugTestSixStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("drugtest 6 done");
                let drugTestSevenStatus = await getDrugTestSevenStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("drugtest 7 done");
                let drugTestEightStatus = await getDrugTestEightStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("drugtest 8 done");
                let drugTestNineStatus = await getDrugTestNineStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("drugtest 9 done");
                let facis13Status = await getFacis13Status(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("facis13 done");
                let creditTransStatus = await getCreditTransStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("credittrans done");
                let creditEquifaxStatus = await getCreditEquifaxStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("credit equifax done");
                let empAdvancedStatus = await getEmpAdvancedStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("emp advanced done");
                let empBasicStatus = await getEmpBasicStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("emp basic done");
                let vddAdvancedStatus = await getVddAdvancedStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("vdd advanced done");
                let dlStatus = await getDlStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("dl status done");
                let voterIdStatus = await getVoterIdStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("votr id done");
                let ofacStatus = await getOfacStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                let colorBlindnessStatus = await getColorBlindnessStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                let exitInterviewStatus = await getExitInterviewStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                let currentAddressStatus = await getCurrentAddressStatus(item._id, "MENTOR-REVIEW-ACCEPTED")
                console.log("ofac done");
                if (employmentStatus && educationStatus && addressStatus && courtRecordStatus && criminalStatus && identityStatus &&
                    creditCheckStatus && socialMediaStatus && globalDatabaseStatus && referenceStatus && drugTestFiveStatus &&
                    drugTestTenStatus && passportStatus && uanStatus && addressTelephoneStatus && addressComprehensiveStatus && educationComprehensiveStatus &&
                    educationAdvancedStatus && drugTestSixStatus && drugTestSevenStatus && drugTestEightStatus && drugTestNineStatus && facis13Status &&
                    creditTransStatus && creditEquifaxStatus && empAdvancedStatus && empBasicStatus && vddAdvancedStatus && dlStatus && voterIdStatus &&
                    ofacStatus && colorBlindnessStatus && exitInterviewStatus && currentAddressStatus) {
                    casesForOutputqc.push(item)
                }
            }
            res.json(casesForOutputqc)

        })
        .catch(err => {
            res.status(500).json({
                message: "Error getting cases for outputqc"
            })
        })
}
exports.createJpgs = (req, res) => {
    /*    let caseId = req.body.caseId
        let componentName = req.body.componentName
        let check_id = req.body.check_id;
        let filePath = '/REPO_STORAGE/case_uploads/'+ caseId + '/' + componentName + '/' + check_id + '/proofofwork'
        if(fs.existsSync(filePath)){
             let success = false;
             fs.readdirSync(filePath).forEach(file=>{
                var input = filePath + '/' + file;
                let extn = path.extname(input)
                console.log('input is ',input)
                console.log('in write jpg extension is ',extn)
                pdf2img.setOptions({
                   type:'jpg',
                   size:1024,
                   density:600,
                   outputdir:filePath + "/",
                   outputname: 'pow',
                   page:null,
                   quality:100
                });
                pdf2img.convert(input,function(err,info){
                   if(err){
                      console.log('error converting',err)
    
                   }else{
                      console.log('converted successfully',info)
                   }
                })
    
             })
        }else{
           console.log("File not found")
        }*/
    res.json({ message: "Converted to Jpgs" })

}



exports.stopComponentCheck = async (req, res) => {
    try {

        console.log("In stopComponentCheck....")
        const component = req.body.component
        const serialNumber = req.body.serialNumber
        const caseData = await Case.findOne({ _id: req.body._id })
        const case_id = caseData._id
        const userId = req.user.user_id
        const userSubclientAccessData = await user_subclient_accessModel.findOne({ user: userId, subclient: caseData.subclient })


        if (!userSubclientAccessData) {
            console.log("User Subclient Access not found, exiting......")
            return res.status(403).json({ message: "Forbidden." })
        }

        function stopCheck() {

            return new Promise(async (resolve, reject) => {

                console.log(`Attempting to stop ${component} check`)
                const model = require(`../../models/data_entry/${component}.model`)
                const item = await model.findOne({ case: case_id, serialNumber: serialNumber })
                if (!item) {

                    reject("No Entry found in Component for the Case ID provided.")

                } else if (item.status == 'MENTOR-REVIEW-ACCEPTED' || item.status == 'OUTPUTQC-ACCEPTED') {

                    reject("Cannot stop the check in the final stage of verification.")

                } else {
                    await model.findOneAndUpdate({ case: case_id, serialNumber: serialNumber }, { status: 'MENTOR-REVIEW-ACCEPTED' })
                    const subclientData = await subclient.findOne({ client: caseData.client, _id: caseData.subclient })
                    const emailBody = `<h3>Case ID <b>${caseData.caseId}</b> has been successfully stopped for further check.</h3>
                    <table style="border: 1px solid #333;  padding: 0 15px; border-collapse: collapse;" >
                    <thead style="font-size: 1.1em;border: 1px solid #333;">
                        <tr>
                        <th>Component Name</th>
                        <th>Case ID</th>
                        <th>Candidate Name</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><center>${component}</center></td>
                        <td>${caseData.caseId}</td>
                        <td><center>${caseData.candidateName}</center></td> 
                        <td>Stop Check</td>
                        </tr>
                    </tbody>
                    </table>
                    <p>Thank you,</p>  
                    <p>Team Explorer</p>`
                    sendMail.sendMail(subclientData.email, "Welcome to Explorer (Powered by Adamma)", emailBody)
                    resolve("Stopped the check successfully.")
                }
            })
        }

        const response = await stopCheck()
        return res.status(200).json({ message: response })


    } catch (err) {
        console.log(err)
        return res.status(500).json({ Error: err })
    }

}

exports.compareCDEfields = async (req, res) => { // Request: {caseId}
    try {  
        const modifiedFields = new Array()

        const caseData = await Case.findOne({ caseId: req.body.caseId })
        
        const subclientData = await subclient.findOne({ _id: caseData.subclient })
        console.log(caseData.candidateName)
        let emailBody = `<h3>The Following is the List for changed values by ${caseData.candidateName} for Case ID ${caseData.caseId}</h3>\n`

        if (!caseData) {
            return res.status(404).json({ message: "No case found for the given caseId" })
        }
        const compToCheck = caseData.componentsToCheck
        if (!compToCheck) {
            return res.status(400).json({ message: "No candidate data was provided at the time of case initiation." })
        }
        console.log("Components to check recieved ....")


        for (let i = 0; i < compToCheck.length; i++) {
            const component = compToCheck[i]
           

            // Require in component model
            if(component.componentName === "education"){
                component.componentName = "educationadvanced"
            }
            console.log(component.componentName, component.serialNumber )
            const model = require(`../../models/data_entry/${component.componentName}.model`)
            console.log("Component model recieved ....")
            const compData = await model.findOne({ case: caseData._id, serialNumber: component.serialNumber })
            
            console.log("Candidate data recieved ....", compData)

            const compToCheckKeys = Object.keys(component)



            //  if the field name is same, we check if the field provided during initiation and candidate provided details match.

            for (let j = 0; j < compToCheckKeys.length; j++) {
                const key = compToCheckKeys[j]
                // compToCheckKeys.forEach(key => {
                if (key == "serialNumber") {
                    continue
                }
                if (compData[key]) {
                    if (compData[key] != component[key]) {

                        modifiedFields.push([key, component[key], compData[key]])
                    }
                }
            }

            console.log("Modified Fields for " + component.componentName + " and serial number " + component.serialNumber + "  are .....:")
            emailBody += `<p>Modified Fields for  ${component.componentName} and serial number ${component.serialNumber}  are :</p><br><br>
                     <table style="border: 1px solid #333;  padding: 0 15px; border-collapse: collapse;" >
                     <thead style="font-size: 1.1em;border: 1px solid #333;">
                         <tr>
                         <th>Field Name</th>
                        <th>Original Value</th>
                        <th>Modified Value</th>
                        </tr>
                     </thead>`

            for (let j = 0; j < modifiedFields.length; j++) {

                const ele = modifiedFields[j]
                // modifiedFields.forEach(ele => {
                console.log(`${ele[0]} : ${ele[1]}  to  ${ele[2]}`)
                emailBody += `<tbody>
                        <tr>
                        <td><center>${ele[0]}</center></td>
                        <td><center>${ele[1]}</center></td>
                        <td><center>${ele[2]}</center></td> 
                        </tr>
                        </tbody>`

            }
            emailBody += ` </table>`
        }


        emailBody += `
        <p>Thank you,</p>  
        <p>Team Explorer</p>`
        console.log("Email Body : ", emailBody)
        sendMail.sendMail(subclientData.email, "Welcome Explorer (Powered by Adamma)", emailBody)
        return res.status(200).json({ message: "Modified Field List forwarded via email." })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Unknown error caused while fetching the details." })
    }

}

//new added 22-dec-22
exports.exportComponentData = async (req, res) => {
    try {
        console.log("In Export Component Data Function ................")
        // Store the query parameters in a variable
        const caseId = req.query.caseId
        const componentName = req.query.compName
        // Calling model dynamically


        const model = require(`../../models/data_entry/${componentName}.model`)
        console.log("Got the model")
        const responseData = await model.findOne({ case: caseId })
	const caseData = await PersonalDetailsData.findOne({case: caseId})    

        // If no component Data
        if (!responseData) {
            console.log("Could not find data for the component.")
            return res.status(404).json("Could not find data for the component.")
        }

        // If component data is found



        let componentData = Object.assign({}, responseData)
        componentData = componentData._doc
        console.log("Got the component data: ", componentData)

        const compDataKeys = Object.keys(componentData)

        console.log("Comp data keys are: ", compDataKeys)

        const detailsVerifiedKeys = compDataKeys.filter(key => {
            return key.includes("Rhs")
        })

        console.log("detailsVerifiedKeys: ", detailsVerifiedKeys)
        const detailsProvidedKeys = detailsVerifiedKeys.map(key => {
            return key.replace('Rhs', '')
        })


        console.log("detailsProvidedKeys: ", detailsProvidedKeys)

        const exportData = new Array()
        const candidateName = caseData.candidatename
	exportData.push({ field: "Candidate Name",["details-provided"]:candidateName})    
        for (let i = 0; i < detailsProvidedKeys.length; i++) {
	    const label = await component_fieldModel.findOne({ name: detailsProvidedKeys[i]})	
            if (detailsProvidedKeys[i] === "doj" || detailsProvidedKeys[i] === "dateofverification") {
                exportData.push({ field: label.label, ['details-provided']: moment(componentData[detailsProvidedKeys[i]]).format('MM/DD/YYYY') === "Invalid date" ? "" : moment(componentData[detailsProvidedKeys[i]]).format('MM/DD/YYYY'), ['details-verified']: moment(componentData[detailsVerifiedKeys[i]]).format('MM/DD/YYYY') })
                continue
            }
            exportData.push({ field: label.label, ['details-provided']: componentData[detailsProvidedKeys[i]], ['details-verified']: componentData[detailsVerifiedKeys[i]] })
        }

        console.log("data to export to xlsx: ", exportData)

        console.log("Writing to XLSX....")
        const newWB = xlsx.utils.book_new()
        const newWS = xlsx.utils.json_to_sheet(exportData)
        xlsx.utils.book_append_sheet(newWB, newWS, `${componentName} Data`)
        xlsx.writeFile(newWB, path.join('/REPO_STORAGE/tmp_tl_tracker', `component_data_${caseId}.xlsx`))
        res.download(path.join('/REPO_STORAGE/tmp_tl_tracker', `component_data_${caseId}.xlsx`))
        console.log("File Downloaded...")
        setTimeout(() => {
            var filePath = path.join('/REPO_STORAGE/tmp_tl_tracker', `component_data_${caseId}.xlsx`);
            fs.unlinkSync(filePath);
            console.log("file deleted")
        }, 4000)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Could not export to XLSX due to an error." })
    }

}
exports.allComponentDataforACase = async(req,res) =>{ 
    try{
        const resultData = new Array()
        const case_id = req.params.case_id

        const caseData = await Case.findOne({_id: case_id})

        let actualComponents = caseData.actualComponents
        // console.log(actualComponents)
        while(actualComponents.length){
            const currComponent = actualComponents[0]
            const model = require(`../../models/data_entry/${currComponent}.model`)
            const modelData = await model.find({case: case_id}).populate("component")
       
            // Adding fields to each entry
            
            for(let i=0; i<modelData.length; i++){
                const item = {}
                Object.assign(item, modelData[i]._doc)
                let componentFields = await component_fieldModel.find({component: item.component._id})
                item.componentFields = componentFields
                resultData.push(item)
                
            }
            console.log(actualComponents)
            actualComponents = actualComponents.filter(comp => comp != currComponent)
        }

        return res.json(resultData)

    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Could not get component data due to err: "+ err})
    }
}

exports.deleteCheck = async (req, res) => {
    try {
        const { component_id, check_id } = req.params
        const componentData = await Component.findOne({ _id: component_id })
        const model = require(`../../models/data_entry/${componentData.name}.model`)
        const modelData = await model.findOne({ _id: check_id })
	    console.log("deleting model:", modelData)
	if(modelData.status == "MENTOR-REVIEW-ACCEPTED" || modelData.status == "OUTPUTQC-ACCEPTED"){
		return res.status(400).json({error: "cannot delete check as component verification is complete"})
	}
	    await model.findOneAndUpdate({_id: modelData._id},{status: "DELETED-CHECK"})
        return res.json({ message: "deleted the check successfully" })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: "could not stop check" })
    }
}


exports.downloadProofOfWork=(req,res)=>{
        try{
        const downloadPath = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/proofofwork/'
	console.log(fs.readdirSync(downloadPath))
        const filename = fs.readdirSync(downloadPath).find(item => item.includes(req.query.fileName))
		console.log(filename)
		if(!filename){
                return res.status(400).json({error: "Could not find file"})
        }

        const file = downloadPath + filename;
	
	console.log(file)
        res.download(file);
        }catch(err){
                console.log(err)
                return res.status(500).json({error: err.message})
        }
};

exports.uploadProofOfWork=(req,res)=>{

  	let componentFile = req.files.componentFile;
	console.log(componentFile)
	const extention = path.extname(componentFile.name)


  	const uploadPath = '/REPO_STORAGE/case_uploads/'+req.body.caseId +'/' + req.body.componentName+ '/' + req.body.componentId + '/proofofwork/' + req.body.fileName
 	 	
	
   componentFile.mv(uploadPath   +  extention, function(err){
       if(err){
           res.status(500).send({message:"Error uploading the file"});
       }
       res.json({message: "File Uploaded"});
  });
};
exports.deleteProofOfWork = async (req, res) => {
	 console.log("@@@@@@@@@@@@@@@",req.params.caseId) 

  try {
    //:caseId/:componentName/:check_id/:fileName
    const { caseId, componentName, check_id, fileName } = req.params;
const filePath  = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.check_id + '/proofofwork/' + req.query.fileName + '.pdf'	  
    //const filePath = `/REPO_STORAGE/case_uploads/${caseId}/${componentName}/${check_id}/${fileName}`;
	  console.log("@@@@@@@@@@@@@@@",filePath)
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
      return res.json({ message: "File Deleted Successfully" });
    } else {
      return res.status(404).json({ error: "File not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////
exports.downloadCanDox=(req,res)=>{
        try{
        const downloadPath = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/candidatedocs/'
        console.log(fs.readdirSync(downloadPath))
        const filename = fs.readdirSync(downloadPath).find(item => item.includes(req.query.fileName))
                console.log(filename)
                if(!filename){
                return res.status(400).json({error: "Could not find file"})
        }

        const file = downloadPath + filename;

        console.log(file)
        res.download(file);
        }catch(err){
                console.log(err)
                return res.status(500).json({error: err.message})
        }
};
//////////
exports.downloadcdf=(req,res)=>{
    try{
    const downloadPath = '/REPO_STORAGE/case_uploads/' + '/' + req.params.caseId   

    console.log(fs.readdirSync(downloadPath))
    const filename = fs.readdirSync(downloadPath).find(item => item.includes(req.query.fileName))
            console.log(filename)
            if(!filename){
            return res.status(400).json({error: "Could not find file"})
    }

    const file = downloadPath +"/"+ filename;

    console.log(file)
    res.download(file);
    }catch(err){
            console.log(err)
            return res.status(500).json({error: err.message})
    }
};
//cdf Upload
exports.uploadCDF=(req,res)=>{

    let componentFile = req.files.componentFile;
  
    let fileNameWithoutExtension = req.body.fileName.split('.').slice(0, -1).join('.');
  
    let fileExtension = req.body.fileName.split('.').pop();
   
    let filePath = '/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.componentName + '/' + req.body.componentId + '/candidatedocs/' + fileNameWithoutExtension + '.' + fileExtension;


    componentFile.mv(filePath, function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        res.json({ message: "File uploaded" });
    });
};

 exports.insuffRaised = async (req, res) => {
    try {
        let mailAddress;
        let subclient_id;
        let singleCase = await Case.find({ _id: req.params.caseId })
        .populate('subclient')
        .populate({
            path: 'subclient',
            populate: {
              path: 'cam',
              model: 'User',
              select: 'userId'
            }
          });
        //   console.log('singleCase == ', singleCase);
          singleCase.forEach(caseItem => {
            mailAddress = caseItem.subclient.cam.userId;
        });
        subclient_id = singleCase[0].subclient._id;
        let notification = await subclient_notificationModel.find({triggerStatus:"ALL-INSUFF",subclient:subclient_id})

        if (notification.length > 0) {
            notification.forEach(async data =>{
                try {
                    let emailTemplate = await EmailTemplate.find({ _id: data.template })
                    let subject = emailTemplate[0].subject
                    let changedSubject = subject.replace('<<CASE-ID>>', singleCase[0].caseId)
                    let mailText = emailTemplate[0].content
                    let caseDetails = `<table border='1px'><tr><td>Case Id</td><td>Candidate Name</td><td>Component</td><td>Details</td></tr><tr><td>${singleCase[0].caseId}</td><td>${singleCase[0].candidateName}</td><td>${req.body.componentName}</td><td>${req.body.insufficiencyComments}</td></tr></table>`
                    let changedMailText = mailText.replace('&lt;&lt;INSUFFICIENCY-TABLE&gt;&gt;', caseDetails)
                    sendMail(mailAddress, changedSubject, changedMailText)
                    res.end();
                } catch (error) {
                    console.log('error == ',error);
                }
            })
        }

    } catch (error) {
        console.log("error === ", error);
    }
}

