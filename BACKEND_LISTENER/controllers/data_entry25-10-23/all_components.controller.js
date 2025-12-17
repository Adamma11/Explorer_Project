const address = require('../../models/data_entry/address.model');
const courtrecord = require('../../models/data_entry/courtrecord.model');
const criminal = require('../../models/data_entry/criminal.model');
const education = require('../../models/data_entry/education.model');
const employment = require('../../models/data_entry/employment.model');
const express = require('express');
const { resolveContent } = require('nodemailer/lib/shared');
const fs = require("fs")

exports.findAllInsufficiencesForScrutiny=(req,res)=>{
    async function getInsufficiencyList(){
        try{
            console.log("in getInsufficiencyList")
            let addressInsufficienciesList = await getAddressInsufficienciesList();
            let courtRecordInsufficienciesList = await getCourtRecordInsufficienciesList();
            let criminalInsufficienciesList = await getCriminalInsufficienciesList();
            let educationInsufficienciesList = await getEducationInsufficienciesList();
            let employmentInsufficienciesList = await getEmploymentInsufficienciesList();            
            res.json(addressInsufficienciesList.concat(courtRecordInsufficienciesList,criminalInsufficienciesList,educationInsufficienciesList,employmentInsufficienciesList));
        }catch(err){
            console.log(err);
            res.status(500).json({
                message: err.message | 'Error while reading insufficiencies'
            })
        }
    }
    let getAddressInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            address
            .find({$or:[{dataEntryStatus:"INSUF-1",scrutinyApprovalStatus:null},{verificationStatus:"INSUF-2",scrutinyApprovalStatus:null}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(async data=>{
                resolve(data);
            })        
            .catch(err=>{
                reject(err);
            })
        })
    }
    let getCourtRecordInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            courtrecord
            .find({$or:[{dataEntryStatus:"INSUF-1",scrutinyApprovalStatus:null},{verificationStatus:"INSUF-2",scrutinyApprovalStatus:null}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(async data=>{
                resolve(data);
            })   
            .catch(err=>{
                reject(err);
            })
        })
    }
    let getCriminalInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            criminal
            .find({$or:[{dataEntryStatus:"INSUF-1",scrutinyApprovalStatus:null},{verificationStatus:"INSUF-2",scrutinyApprovalStatus:null}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(data=>{
                resolve(data);
            })   
            .catch(err=>{
                reject(err);
            })
        })
    }        
    let getEducationInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            education
            .find({$or:[{dataEntryStatus:"INSUF-1",scrutinyApprovalStatus:null},{verificationStatus:"INSUF-2",scrutinyApprovalStatus:null}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(async data=>{
                resolve(data);
            })
            .catch(err=>{
                reject(err);
            })
        })
    }            
    let getEmploymentInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            employment
            .find({$or:[{dataEntryStatus:"INSUF-1",scrutinyApprovalStatus:null},{verificationStatus:"INSUF-2",scrutinyApprovalStatus:null}]})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(async data=>{
                resolve(data);
            })
            .catch(err=>{
                reject(err);
            })
        })
    }
    getInsufficiencyList();

};

exports.findAllInsufficiencesForClient=(req,res)=>{
    async function getInsufficiencyList(){
        try{
            console.log("in getInsufficiencyList")
            let addressInsufficienciesList = await getAddressInsufficienciesList();
            let courtRecordInsufficienciesList = await getCourtRecordInsufficienciesList();
            let criminalInsufficienciesList = await getCriminalInsufficienciesList();
            let educationInsufficienciesList = await getEducationInsufficienciesList();
            let employmentInsufficienciesList = await getEmploymentInsufficienciesList();            
            res.json(addressInsufficienciesList.concat(courtRecordInsufficienciesList,criminalInsufficienciesList,educationInsufficienciesList,employmentInsufficienciesList));
        }catch(err){
            console.log(err);
            res.status(500).json({
                message: err.message | 'Error while reading insufficiencies'
            })
        }
    }
    let getAddressInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            address
            .find({scrutinyApprovalStatus:'APPROVED',clientClearanceStatus:null})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(async data=>{
                resolve(data);
            })        
            .catch(err=>{
                reject(err);
            })
        })
    }
    let getCourtRecordInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            courtrecord
            .find({scrutinyApprovalStatus:'APPROVED',clientClearanceStatus:null})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(async data=>{
                resolve(data);
            })   
            .catch(err=>{
                reject(err);
            })
        })
    }
    let getCriminalInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            criminal
            .find({scrutinyApprovalStatus:'APPROVED',clientClearanceStatus:null})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(data=>{
                resolve(data);
            })   
            .catch(err=>{
                reject(err);
            })
        })
    }        
    let getEducationInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            education
            .find({scrutinyApprovalStatus:'APPROVED',clientClearanceStatus:null})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(async data=>{
                resolve(data);
            })
            .catch(err=>{
                reject(err);
            })
        })
    }            
    let getEmploymentInsufficienciesList = function(){
        return new Promise(function(resolve,reject){
            employment
            .find({scrutinyApprovalStatus:'APPROVED',clientClearanceStatus:null})
            .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
            .populate({path:'component'})
            .then(async data=>{
                resolve(data);
            })
            .catch(err=>{
                reject(err);
            })
        })
    }
    getInsufficiencyList();

};

exports.downloadProofOfWork=(req,res)=>{
	try{
   	const downloadPath = '/REPO_STORAGE/case_uploads/'+req.params.caseId +'/' + req.params.componentName+ '/' + req.params.componentId + '/proofofwork/'
   	const filename = fs.readdirSync(downloadPath).find(item => item.includes(req.query.fileName))
	if(!filename){
		return res.status(400).json({error: "Could not find file"})
	}

   	const file = path + filename;
   	res.download(file);
	}catch(err){
		console.log(err)
		return res.status(500).json({error: err.message})
	}
};

