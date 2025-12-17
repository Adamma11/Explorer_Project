const PhysicalVerificationEducation = require('../../models/data_entry/physical_verification_education.model')
const express = require('express');


exports.create=(req,res)=>{

    if(!req.body.case){
        res.json({message:"Case Id is Mandatory"})
    }
    if(!req.body.componentName){
        res.json({message:"Component Name Cannot be Empty"})
    }
    if(!req.body.componentId){
        res.json({message:"Component Id Cannot be Empty"})
    }    
    if(!req.body.universityOrInstitutionName){
        res.json({message:"University/Institution Name Cannot be Empty"})
    }        
    if(!req.body.address){
        res.json({message:"Address Name Cannot be Empty"})
    }            
    if(!req.body.pin){
        res.json({message:"PIN Cannot be Empty"})
    }  
              
    const physicalVerificationEducation = new PhysicalVerificationEducation({
        case:req.body.case,
        componentName:req.body.componentName,
        componentType:req.body.componentType,
        componentDisplayName:req.body.componentDisplayName,
        componentId:req.body.componentId,
        universityOrInstitutionName:req.body.universityOrInstitutionName,
        address:req.body.address,
        pin:req.body.pin,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        contactNumber:req.body.contactNumber,
        requestDate:Date.now(),
        status:'INITIATED',
        modifiedBy:req.user.user_id,
    })
    physicalVerificationEducation
    .save(physicalVerificationEducation)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "Some error occurred while saving Physical Verification for Education Record"
        })
    })
}

exports.readAllForAComponent=(req,res)=>{
    PhysicalVerificationEducation
    .find({case:req.params.case,componentName:req.params.componentName,componentId:req.params.componentId})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occurred while reading Physical Verifification details"
        })
    })
}

exports.readAllFor=(req,res)=>{
    let query;
    if(req.params.for == 'FE'){
        query = {$or:[{status:'INITIATED'},{status:'REJECTED'}]}
    }else if(req.params.for == 'ANALYST'){
        query = {status:'FE-COMPLETED'}
    }
    console.log("status required is ",req.params.status);
    PhysicalVerificationEducation
    .find(query)
    .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
    .populate({path:'allocatedToFe'})
    .populate({path:'allocatedToVendor'})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occurred while reading Physical Verifification details"
        })
    })
};
exports.read=(req,res)=>{
    PhysicalVerificationEducation
    .findOne({_id:req.params._id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occurred while reading Physical Verification Details"
        })
    })
}
exports.updateFeVerificationStatus=(req,res)=>{
    console.log("_id being updated is ",req.params._id);
    PhysicalVerificationEducation
    .findOneAndUpdate({_id:req.params._id},{
        universityOrInstitutionNameRhs:req.body.universityOrInstitutionNameRhs,
        addressRhs:req.body.addressRhs,
        pinRhs:req.body.pinRhs,
        cityRhs:req.body.cityRhs,
        stateRhs:req.body.stateRhs,
        countryRhs:req.body.countryRhs,
        contactNumberRhs:req.body.contactNumberRhs,
        feVerificationStatus:req.body.feVerificationStatus,
        feVerificationInsufficiencyComments:req.body.feVerificationInsufficiencyComments,
        personContacted:req.body.personContacted,
        contactNumberOfPersonContacted:req.body.contactNumberOfPersonContacted,
        status:'FE-COMPLETED'
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Error while updating Education PV record'
        })
    })
    
}

exports.updateAnalystVerificationStatus=(req,res)=>{
    console.log("_id being updated is ",req.params._id);
    PhysicalVerificationEducation
    .findOneAndUpdate({_id:req.params._id},{
        verifierReviewStatus:req.body.verifierReviewStatus,
        verifierReviewComments:req.body.verifierReviewComments,
        status: req.body.verifierReviewStatus,
        completionDate:req.body.verifierReviewStatus=='ACCEPTED' ? new Date():null        
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Error while updating Education PV record'
        })
    })
    
}