const EmailTemplate = require('../../models/masters/email_template.model.js');
const express = require('express');


//Create and Save Branch
exports.create = (req,res)=>{
// Validate Request
    console.log('req body is ',req);
    if(!req.body.name){
        res.status(400).json({message:"Branch Name Cannot be empty"});        
    } 

    const emailTemplate = new EmailTemplate({
        name:req.body.name,
        subject:req.body.subject,
        content:req.body.content,
        modifiedBy:req.body.modifiedBy 
    });
    emailTemplate
    .save(emailTemplate)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Email Template"
        });
    });

};


//Retrieve all Branches
exports.findAll = (req,res)=>{
    EmailTemplate.find()
    .then(emailTemplates=>{
        res.send(emailTemplates);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Emai Templates"});
    })    
};

//Find a single Branch with branch name

exports.findOne = (req,res)=>{
    EmailTemplate.findOne({_id:req.params._id})
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Email Template"});
    })
};

// Update a branch by the branch name in the request

exports.update = (req,res)=>{
    if(!req.body.name){
        console.log("Name is empty");
        res.status(400).json({message:"Address Covered Cannot be empty"});        
        return;
    }     

    EmailTemplate.findOneAndUpdate({_id:req.params._id},
    {
        name:req.body.name,
        subject:req.body.subject,
        content:req.body.content,
        modifiedBy:req.body.modifiedBy
        })
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        console.log(err.message);
        res.status(500).send({message :err.message || "Some error occurred while updating Email Template"});
    })

};
exports.delete = (req,res)=>{
    EmailTemplate.findOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting Email Template"});
    })

};

