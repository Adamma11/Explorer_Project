const Followup = require('../../models/sales/follow_up.model');
const express = require('express');

exports.create=(req,res)=>{
    console.log('in followup create ',req.body)
    if(!req.body.followupDate){
        res.status(400).json({message:'Date cannot be empty'})
    }else if(!req.body.contactPerson){
        res.status(400).json({message:'Contact Person cannot be empty'})
    }else{
        const followup = new Followup({
            leadOrProspect:req.body.leadOrProspect,
            followupDate:req.body.followupDate,
            contactPerson:req.body.contactPerson,
            designation:req.body.designation,
            notes:req.body.notes,
            modifiedBy:req.user.user_id
        })
        followup
        .save(followup)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message : err.message | 'Some error occurred while saving follow up'
            })
        })
    }
};
exports.readAllForALeadOrProspect = (req,res)=>{
    Followup
    .find({leadOrProspect:req.params.leadOrProspect})
    .then(data=>{
        res.json(data);
    })   
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading followups for a Lead / Prospect'
        })
    })
};
exports.update = (req,res)=>{
    Followup
    .findOneAndUpdate({_id:req.params._id},{
        leadOrProspect:req.body.leadOrProspect,
        followupDate:req.body.followupDate,
        contactPerson:req.body.contactPerson,
        designation:req.body.designation,
        notes:req.body.notes,
        modifiedBy:req.user.user_id
    })
    .then(data=>{
        res.json(data);
    })   
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while Saving followup for a Lead / Prospect'
        })
    })
};
exports.delete = (req,res)=>{
    Followup
    .findOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })   
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while Saving followup for a Lead / Prospect'
        })
    })
};