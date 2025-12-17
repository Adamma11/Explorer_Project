const EmploymentMaster  = require('../../models/masters/employment_master.model');
const express = require('express');

exports.create = (req,res)=>{
    if(!req.body.name){
        res.status(400).json({message:'Name cannot be empty'})
    }
    const employmentMaster = new EmploymentMaster({
        name:req.body.name,
        address:req.body.address,
        city:req.body.city,
        source:req.body.source,
        url:req.body.url,
        verificationFee:req.body.verificationFee,
        branch:req.body.branch,
        modifiedBy:req.user.user_id,
        concernperson:req.body.concernperson, 
        designation:req.body.designation, 
        modeofverification:req.body.modeofverification, 
        daysforverification:req.body.daysforverification, 
        email:req.body.email,
        phone:req.body.phone 
    })
    
    employmentMaster
    .save(employmentMaster)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occured while storing employment master"
        })
    })
}
exports.read = (req,res)=>{
    EmploymentMaster
    .findOne({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while retrieving employment master"
        })
    })
}
exports.readAll = (req,res)=>{
    EmploymentMaster
    .find()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        message:err.message || "Some error occurred  while retrieving employment masters"
    })
}

exports.update = (req,res)=>{
    EmploymentMaster
    .findOneAndUpdate({_id:req.params._id},{
        name:req.body.name,
        address:req.body.address,
        city:req.body.city,
        url:req.body.url,
        source:req.body.source,
        verificationFee:req.body.verificationFee,
        modifiedBy:req.user.user_id,
        concernperson:req.body.concernperson, 
        designation:req.body.designation, 
        modeofverification:req.body.modeofverification, 
        daysforverification:req.body.daysforverification, 
        email:req.body.email,
        phone:req.body.phone 
    })
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        message:err.message || "Some error occurred  while updating employment master"
    })
}

exports.delete = (req,res)=>{
    EmploymentMaster
    .findOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        message:err.message || "Some error occurred  while delete employment master"
    })
}
exports.readAllThatContains = (req,res)=>{
    let searchString = req.params.searchString;
    console.log("Searching for ",searchString.substring(0,3));
    EmploymentMaster
    .find({name:{"$regex":searchString.substring(0,3),"$options":"i"}})
    .populate({path:'branch'})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message | "Some error occurred while searching for a employer"
        })
    })

}