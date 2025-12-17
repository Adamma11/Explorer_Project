const PersonalDetailsField = require('../../models/administration/personal_details_field.model');
const express = require('express');

    
//Retrieve all Fields
exports.findAll = (req,res)=>{
    PersonalDetailsField.find()
    .then(userRoles=>{
        res.send(userRoles);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Personal Details Fields"});
    })    
};
    

exports.findOne = (req,res)=>{
    PersonalDetailsField.findOne({_id:req.params.fieldId})
    .then(personalDetailsField=>{
        res.send(personalDetailsField);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Personal Details Field"});
    })
};

// Update a Field 
    
exports.update = (req,res)=>{
    if(!req.body._id){
        console.log("Field Id is blank");
        res.status(400).json({message:"Field Id Cannot be empty"});        
        return;
    }     

    PersonalDetailsField.findOneAndUpdate({_id:req.params.fieldId},
    {
        modifiedBy:req.body.modifiedBy
        })
    .then(componentField=>{
        res.send(componentField);
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while updating Component Field"});
    })

};
    
 