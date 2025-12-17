const RoleModuleAccess = require('../../models/administration/role_module_access.model');
const express = require('express');

//Create and Save Component
exports.createMany = (req,res)=>{

        RoleModuleAccess.insertMany(req.body.roleModules)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Role Module Access"
            });
        });

    };
    
    
    //Retrieve all Fields
    exports.findAll = (req,res)=>{
        RoleModuleAccess.find()
        .then(roleModuleAccesses=>{
            res.send(roleModuleAccesses);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Role Module Accesses"});
        })    
    };
    
    // find  all fields for a component
    exports.findModulesForARole = (req,res)=>{
        RoleModuleAccess.find({role:req.params.roleId})
        .then(roleModuleAccesses=>{
            res.send(roleModuleAccesses);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Role Module Accesses"});
        })    
    };
    //Find a single Field for the given component
    
    exports.findOne = (req,res)=>{
        RoleModuleAccess.findOne({_id:req.params._id})
        .then(roleModuleAccess=>{
            res.send(roleModuleAccess);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Role Module Access"});
        })
    };
    
    // Update a Field 
    
    exports.update = (req,res)=>{
        if(!req.body.role){
            console.log("Role is empty");
            res.status(400).json({message:"Role Cannot be empty"});        
            return;
        }     
        if(!req.body.applicationModule){
            console.log("Application Module cannot blank");
            res.status(400).json({message:"Application Module Cannot be empty"});        
            return;
        }     

        RoleModuleAccess.findOneAndUpdate({role:req.params.roleId,applicationModule:req.params.applicationModuleId},
        {
           create:req.body.create,
           read:req.body.read, 
           update:req.body.update,
           delete:req.body.delete, 
           modifiedBy:req.body.modifiedBy
            })
        .then(roleModuleAccess=>{
            res.send(roleModuleAccess);
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while updating Role Module Access"});
        })

    };
    exports.deleteForARole = (req,res)=>{
        RoleModuleAccess.deleteMany({role:req.params.roleId})
        .then(roleModuleAccess=>{
            res.send({message:`Fields deleted from Role Module Access Deleted Successfully`});
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting Role Module Access"});
        })
    };      
