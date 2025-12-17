const VendorComponent = require('../../models/administration/vendor_component.model');
const express = require('express');
const { response } = require('express');

//Create and Save Role
exports.createMany = (req,res)=>{
    /* // Validate Request
        if(!req.body.vendor){
            res.status(400).json({message:"Vendor cannot be empty"});        
        } 
        if(!req.body.component){
            res.status(400).json({message:"Component Cannot be empty"});        
        }         
        const vendorComponent = new VendorComponent({
            vendor:req.body.vendor,
            roleId:req.body.component,
            price:req.body.price,
            modifiedBy:req.body.modifiedBy 
        });
        vendorComponent
        .save(role)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Vendor Component"
            });
        }); */
        VendorComponent.insertMany(req.body.vendorComponents)
        .then(data=>{
            res.json(data);
        })
        .catch(error=>{
            res.status(500).json({
                message:error.message || "Some error occurred while saving Vendor Components"
            });            
        })

    };
    
    
    //Retrieve all Vendor Components
    exports.findAll = (req,res)=>{
        VenorComponent.find()
        .then(vendorComponents=>{
            res.send(vendorComponents);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Vendor Components"});
        })    
    };

//Retrieve all Components for a given Vendor
    exports.findAllForAVendor = (req,res)=>{
        VendorComponent.find({vendor:req.params.vendorId})
        .then(vendorComponents=>{
            res.send(vendorComponents);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Vendor Components"});
        })    
    };    
    
    //Find a single Vendor Component 
    
    exports.findOne = (req,res)=>{
        VendorComponent.findOne({vendor:req.params.vendorId,component:req.params.componentId})
        .then(vendorComponent=>{
            res.send(vendorComponent);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Role"});
        })
    };
    
    // Update a branch by the branch name in the request
    
    exports.update = (req,res)=>{
        if(!req.body.vendorId){
            console.log("Vendor Id is empty");
            res.status(400).json({message:"Vendor Id Cannot be empty"});        
            return;
        }     
        if(!req.body.componentId){
            console.log("Component Id is empty");
            res.status(400).json({message:"Component Id Cannot be empty"});        
            return;
        }     



        VendorComponent.findOneAndUpdate({vendor:req.params.vendorId,component:req.params.componentId},
        {
           price:req.body.price, 
           modifiedBy:req.body.modifiedBy
        })
        .then(vendorComponent=>{
            res.send(vendorComponent);
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while updating Vendor Component"});
        })

    };
    
    exports.delete = (req,res)=>{
        VendorComponent.deleteOne({vendor:req.params.vendorId,componentId:req.params.componentId})
        .then(vendorComponent=>{
            res.send({message:`Vendor ${req.params.vendorId} - ${req.params.componentId} deleted successfully`});
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting Vendor Component"});
        })
    };

// delete all for a vendor
    exports.deleteAllForAVendor = (req,res)=>{
        console.log('To delete with vendor id ',req.params.vendorId);
        VendorComponent.deleteMany({vendor:req.params.vendorId})
        .then(vendorComponent=>{
            res.send({message:`Deletion successfull`});
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting Vendor Component"});
        })
    };    




