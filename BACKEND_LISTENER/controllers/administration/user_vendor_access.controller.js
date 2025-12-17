const UserVendorAccess = require('../../models/administration/user_vendor_access.model');
const express = require('express');

exports.createMany = (req,res)=>{
    UserVendorAccess.insertMany(req.body.userVendors)
    .then(userVendorAccesses=>{
        res.json(userVendorAccesses);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error while saving User Vendor Access"
        })
    })
};
exports.findAllVendorsForAUser = (req,res)=>{
    UserVendorAccess.find({user:req.params.userId})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching User Vendor Access"
        })
    })
}
exports.deleteAllVendorsForAUser = (req,res)=>{
    UserVendorAccess.deleteMany({user:req.params.userId})
    .then(data=>{
        res.json({message:"Vendors Assigned to User Deleted"});
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message ||"Some error occurred while deleting Vendors assigned to User"
        })
    })
}