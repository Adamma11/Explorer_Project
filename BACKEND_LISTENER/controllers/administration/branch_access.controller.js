const BranchAccess = require('../../models/administration/branch_access.model');
const express = require('express');

exports.updateBranchAccessForARole = (req,res)=>{
    BranchAccess
    .deleteMany({role:req.params.role})
    .then(data=>{
        BranchAccess
        .insertMany(req.body.branchAccesses)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message: err.message | 'Some error occurred while updating Branch Access for a role'
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message | 'Some error occurred while updating Branch Access for a role'
        })
    })    

}
exports.readAllForARole = (req,res)=>{
    BranchAccess
    .find({role:req.params.role})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading branch access for a role'
        })
    })
}