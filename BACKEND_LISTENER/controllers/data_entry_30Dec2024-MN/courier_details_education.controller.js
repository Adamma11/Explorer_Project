const CourierDetailsEducation = require('../../models/data_entry/courier_details_education.model')
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
    const courierDetailsEducation = new CourierDetailsEducation({
        case:req.body.case,
        componentName:req.body.componentName,
        componentId:req.body.componentId,
        courierName:req.body.courierName,
        awbNumber:req.body.awbNumber,
        courierDate:req.body.courierDate,
        status:'SENT',
        modifiedBy:req.user.user_id,
    })
    courierDetailsEducation
    .save(courierDetailsEducation)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "Some error occurred while saving Courier Details for Education Record"
        })
    })
}
exports.readAllForAComponent=(req,res)=>{
    CourierDetailsEducation
    .find({case:req.params.case,componentName:req.params.componentName,componentId:req.params.componentId})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "An error occurred while reading Courier Details for Education details"
        })
    })
}