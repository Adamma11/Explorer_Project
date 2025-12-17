const RequestForPaymentEducation = require('../../models/data_entry/request_for_payment_education.model')
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
    if(!req.body.inFavourOf){
        res.json({message:"In favour of Cannot be Empty"})
    }        
    if(!req.body.modeOfPayment){
        res.json({message:"Mode of Payment Cannot be Empty"})
    }            
    if(!req.body.amount){
        res.json({message:"Amount Cannot be Empty"})
    }    
         
    const requestForPaymentEducation = new RequestForPaymentEducation({
        case:req.body.case,
        componentName:req.body.componentName,
        componentId:req.body.componentId,
        componentType:req.body.componentType,
        componentDisplayName:req.body.componentDisplayName,
        inFavourOf:req.body.inFavourOf,
        modeOfPayment:req.body.modeOfPayment,
        amount:req.body.amount,
        requestDate:Date.now(),
        status:'INITIATED',
        modifiedBy:req.user.user_id,
    })
    requestForPaymentEducation
    .save(requestForPaymentEducation)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "Some error occurred while saving Request for Payment for Education Record"
        })
    })
}
exports.readAllForAComponent=(req,res)=>{
    RequestForPaymentEducation
    .find({case:req.params.case,componentName:req.params.componentName,componentId:req.params.componentId})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occurred while reading Request for Payment for Education details"
        })
    })
};
exports.readAllWithStatus=(req,res)=>{
    RequestForPaymentEducation
    .find({status:req.params.status})
    .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occurred while reading Request for Payment for Education details"
        })
    })
}

exports.readASingleComponent=(req,res)=>{
    RequestForPaymentEducation
    .findOne({_id:req.params._id})
    .populate({path:'case',populate:{path:'subclient',populate:{path:'client'}}})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occurred while reading Request for Payment for Education details"
        })
    })
};

exports.updatePaymentReferenceNumber=(req,res)=>{
    RequestForPaymentEducation
    .findOneAndUpdate({_id:req.params._id},{
        paymentReferenceNumber:req.body.paymentReferenceNumber,
        requestCompletionDate:new Date(),
        status:"COMPLETED"
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occcurred while updating the Status"
        })
    })
};