const Branch = require('../../models/masters/branch.model.js');
const User = require('../../models/administration/user.model')
const Vendor = require('../../models/administration/vendor.model');
const express = require('express');
const { find } = require('../../models/masters/branch.model.js');


//Create and Save Branch
exports.create = (req,res)=>{
// Validate Request
    console.log('req body is ',req);
    if(!req.body.name){
        res.status(400).json({message:"Branch Name Cannot be empty"});        
    } 
    if(!req.body.address){
        res.status(400).json({message:"Address Cannot be empty"});        
    }     
    if(!req.body.pinCode){
        res.status(400).json({message:"PIN Cannot be empty"});        
    }         
    if(!req.body.district){
        res.status(400).json({message:"District Cannot be empty"});        
    }
    if(!req.body.state){
        res.status(400).json({message:"State Cannot be empty"});        
    }
    if(!req.body.country){ 
        res.status(400).json({message:"Country Cannot be empty"});        
    }    

    const branch = new Branch({
        name:req.body.name,
        address:req.body.address,
        district:req.body.district,
        pinCode:req.body.pinCode,
        state:req.body.state,
        country:req.body.country,
        modifiedBy:req.body.modifiedBy 
    });
    branch
    .save(branch)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Branch Details"
        });
    });

};


//Retrieve all Branches
exports.findAll = (req,res)=>{
    Branch.find()
    .then(branches=>{
        res.send(branches);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Branches"});
    })    
};

//Find a single Branch with branch name

exports.findOne = (req,res)=>{
    Branch.findOne({_id:req.params._id})
    .then(branch=>{
        res.send(branch);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Branch"});
    })
};

// Update a branch by the branch name in the request

exports.update = (req,res)=>{
    if(!req.body.address){
        console.log("Address is empty");
        res.status(400).json({message:"Address Covered Cannot be empty"});        
        return;
    }     
    if(!req.body.pinCode){
        res.status(400).json({message:"PIN Cannot be empty"});     
        return;   
    }    
    if(!req.body.district){
        res.status(400).json({message:"District Cannot be empty"});     
        return;   
    }
    if(!req.body.state){
        res.status(400).json({message:"State Cannot be empty"});        
        return;
    }
    if(!req.body.country){ 
        res.status(400).json({message:"Country Cannot be empty"});        
        return;
    }    
    Branch.findOneAndUpdate({_id:req.params._id},
    {
        name:req.body.name,
        address:req.body.address,
        pinCode:req.body.pinCode,   
        district:req.body.district,
        state:req.body.state,
        country:req.body.country,
        includedPinRanges:req.body.includedPinRanges,
        excludedPinRanges:req.body.excludedPinRanges,
        modifiedBy:req.body.modifiedBy
        })
    .then(branch=>{
        res.send(branch);
    }).catch(err=>{
        console.log(err.message);
        res.status(500).send({message :err.message || "Some error occurred while updating Branch"});
    })

};

exports.delete = (req,res)=>{
    User.findOne({branch:req.params._id})
    .then(user=>{
        if(user != null){
            res.status(405).send({message:"Cannot be deleted because it is used in Branch"})            
        }else{
            checkInVendor()
        }
    })
    .catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting Branch"});
    })
  
    function checkInVendor(){
        Vendor.findOne({branch:req.params._id})
        .then(vendor=>{
            if(vendor != null){
                res.status(405).send({message:"Cannot be deleted because it is used in Vendor"})            
            }else{
                deleteBranch()
            }
        })
        .catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting Branch"});
        })
    }

    function deleteBranch(){
        Branch.deleteOne({_id:req.params._id})
        .then(branch=>{
            res.send({message:`Branch ${req.params.name} deleted successfully`});
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting Branch"});
        })
    }
};
exports.getABranchForPin = (req,res)=>{
//    console.log("pin to find is ",req.params.pin);
    Branch
    .find()
    .then(data=>{
        data.forEach(branch=>{
//            console.log(branch.includedPinRanges);
            branch.includedPinRanges.forEach(pinRange=>{
//                console.log("Hi pin range is ",pinRange);
                if(req.params.pin >= pinRange.from && req.params.pin <= pinRange.to){
                    console.log("Hey found the branch ",branch);
                    res.json(branch)
                }
            })
        })

    })
    .catch(err=>{
        res.status(500).json({
            message : err.message || "Some error occurred while fetching branch for the pin"
        })
    })
}