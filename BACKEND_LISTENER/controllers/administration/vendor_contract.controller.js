const VendorContract = require('../../models/administration/vendor_contract.model');
const express = require('express');
const fs = require('fs');

exports.create = (req,res)=>{

    if(!req.body.vendor){
        res.status(400).json("messaage: Vendor cannot be empty")
    }
    if(!req.body.agreementDate){
        res.status(400).json("messaage: Ageement Date cannot be empty");
    }    
    if(!req.body.effectiveDate){
        res.status(400).json("messaage: Effective Date cannot be empty");
    }
    if(!req.body.expiryDate){
        res.status(400).json({messaage: "Expiry Date cannot be empty"});
    }
    let vendorContract = new VendorContract({
        vendor:req.body.vendor,
        agreementDate:req.body.agreementDate,
        effectiveDate:req.body.effectiveDate,
        expiryDate:req.body.expiryDate,
        addressPrices:req.body.addressPrices,
        educationPrices:req.body.educationPrices,
        employmentPrices:req.body.employmentPrices,
        otherComponentPrices:req.body.otherComponentPrices,
        modifiedBy:req.user.user_id
    })
    vendorContract.save(vendorContract)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while saving the vendor contract'
        })
    })
} 
exports.findOne = (req,res)=>{
    console.log("Trying to read contract ",req.params._id);
    VendorContract
    .findOne({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            messaage:err.message | 'Some error occurred while reading contracts for a vendor'
        })
    })
}   


exports.readAllForVendor = (req,res)=>{
    console.log("Reading for the vendor ",req.params.vendorId);
    VendorContract
    .find({vendor:req.params.vendorId})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            messaage:err.message | 'Some error occurred while reading contracts for a vendor'
        })
    })
}   
exports.delete = (req,res)=>{
    VendorContract
    .findOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json({message:"Vendor Contract Deleted"})
    })
    .catch(err=>{
        res.status(500).json({
            messaage:err.message | 'Some error occurred while deleting the vendor contract'
        })
    })
}
exports.update= (req,res)=>{
    VendorContract
    .findOneAndUpdate({_id:req.params._id},{
        vendor:req.body.vendor,
        effectiveDate:req.body.effectiveDate,
        expiryDate:req.body.expiryDate,
        addressPrices:req.body.addressPrices,
        educationPrices:req.body.educationPrices,
        employmentPrices:req.body.employmentPrices,
        otherComponentPrices:req.body.otherComponentPrices,
        modifiedBy:req.user.user_id       
    })
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            messaage:err.messaage | 'Some error occurred while updating vendor contract'
        })
    })
}