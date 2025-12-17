const UserBranchAccess = require('../../models/administration/user_branch_access.model');
const express = require('express')

exports.createMany = (req,res)=>{
    console.log("User Branh access to create ",req.body.userBranchAccesses);
    UserBranchAccess
    .insertMany(req.body.userBranchAccesses)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message | 'Some error occurred while crating user branch access'
        })
    })
}
exports.findAllForAUser = (req,res)=>{
    UserBranchAccess
    .find({user:req.params.userId})
     .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "Some error occurred  while reading branch accesses for a user"
        })
    })
}
exports.deleteForAUser = (req,res)=>{
    UserBranchAccess.deleteMany({user:req.params.userId})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "Some error occurred while deleting the branch accesses"
        })
    })
}
