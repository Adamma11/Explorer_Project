const ApplicationModule = require('../../models/administration/application_module.model');
const express = require('express');
//Create and Save Role
exports.create = (req,res)=>{
    // Validate Request
        if(!req.body.name){
            res.status(400).json({message:"Module Name Cannot be empty"});        
        } 
        const applicationModule = new ApplicationModule({
            name:req.body.name,
            modifiedBy:req.body.modifiedBy 
        });
        applicationModule
        .save(applicationModule)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Application Module Details"
            });
        });

    };
    
    
    //Retrieve all Roles
    exports.findAll = (req,res)=>{
        ApplicationModule.find()
        .then(applicationModules=>{
            res.send(applicationModules);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Modules"});
        })    
    };
    
    //Find a single Role with branch name
    
    exports.findOne = (req,res)=>{
        ApplicationModule.findOne({_id:req.params._id})
        .then(applicationModule=>{
            res.send(applicationModule);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Module"});
        })
    };
    
    // Update a branch by the branch name in the request
    
    exports.update = (req,res)=>{
        if(!req.body.name){
            console.log("Name is empty");
            res.status(400).json({message:"Name Cannot be empty"});        
            return;
        }     

        ApplicationModule.findOneAndUpdate({_id:req.params._id},
        {
            name:req.body.name,
            modifiedBy:req.body.modifiedBy
            })
        .then(applicationModule=>{
            res.send(applicationModule);
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while updating Module"});
        })

    };
    
    exports.delete = (req,res)=>{
        ApplicationModule.deleteOne({_id:req.params._id})
        .then(applicationModule=>{
            res.send({message:`Module deleted successfully`});
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting Module"});
        })
    };