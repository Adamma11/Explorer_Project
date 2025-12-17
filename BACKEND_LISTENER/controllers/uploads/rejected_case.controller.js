const RejectedCase = require('../../models/uploads/rejected_case.model')
const express = require('express');

exports.create = (req,res)=>{
    if(!req.body.batch){
        res.status(400).json({message:"Batch cannot be empty"})
    }
    if(!req.body.candidateName){
        res.status(400).json({message:"Candidate Name cannot be empty"})
    }
    if(!req.body.rejectionReason){
        res.status(400).json({message:"Rejection Reason cannot be empty"})
    }
    RejectedCase
    .find({batch:req.body.batch})
    .sort({serialNumber:-1})
    .limit(1)
    .then(rejectedCases=>{
        let srNumber = 0;
        for(let rejCase of rejectedCases){
            srNumber = rejCase.serialNumber;
            break;
        }
        srNumber = srNumber + 1;
        createRejectedCase(srNumber);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while creating Rejected Case"
        })
    })
    
    function createRejectedCase(srNumber){
        const rejectedCase = new RejectedCase({
            batch:req.body.batch,
            serialNumber:srNumber,
            candidateName:req.body.candidateName,
            rejectionReason:req.body.rejectionReason,
            rejectionDate: new Date(),
            modifiedBy:req.body.modifiedBy
        })
        rejectedCase
        .save(rejectedCase)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            message:{err.message || "Some Occurred while creating the Rejected Case"}
        })
    }

};

exports.findAllForABatch = (req,res)=>{
    RejectedCase
    .find({batch:req.params.batch})
    .then(rejectedCases=>{
        res.json(rejectedCases)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some Error Occurred while retrieving Rejected Cases"
        })
    })
} ;

