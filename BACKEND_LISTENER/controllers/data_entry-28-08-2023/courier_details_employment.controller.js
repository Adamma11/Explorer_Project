const CourierDetailsEmployment = require('../../models/data_entry/courier_details_employment.model')
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
    if(!req.body.courierName){
        res.json({message:"Courier Name Cannot be Emplty"})
    }        
    if(!req.body.awbNumber){
        res.json({message:"AWB Number Cannot be Empty"})
    }            
    if(!req.body.courierDate){
        res.json({message:"Courier Date Cannot be Empty"})
    }            
    const courierDetailsEmployment = new CourierDetailsEmployment({
        case:req.body.case,
        componentName:req.body.componentName,
        componentId:req.body.componentId,
        courierName:req.body.courierName,
        awbNumber:req.body.awbNumber,
        courierDate:req.body.courierDate,
        status:'SENT',
        modifiedBy:req.user.user_id,
    })
    courierDetailsEmployment
    .save(courierDetailsEmployment)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "Some error occurred while saving Courier Details for Employment Record"
        })
    })
}
exports.readAllForAComponent=(req,res)=>{
    CourierDetailsEmployment
    .find({case:req.params.case,componentName:req.params.componentName,componentId:req.params.componentId})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occurred while reading Courier Details for Employment Details"
        })
    })
}