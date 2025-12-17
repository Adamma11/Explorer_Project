const Role = require('../../models/administration/role.model');
const UserRole = require('../../models/administration/user_role.model');
const express = require('express');

//Create and Save Role
exports.create = (req,res)=>{
    // Validate Request
        if(!req.body.name){
            res.status(400).json({message:"Role Name Cannot be empty"});        
        } 
        const role = new Role({
            name:req.body.name,
            dashboardsInRole:req.body.dashboardsInRole,
            modifiedBy:req.body.modifiedBy 
        });
        role
        .save(role)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Role Details"
            });
        });

    };
    
    
    //Retrieve all Roles
    exports.findAll = (req,res)=>{
        Role.find()
        .then(roles=>{
            res.send(roles);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Roles"});
        })    
    };
    
    //Find a single Role with branch name
    
    exports.findOne = (req,res)=>{
        Role.findOne({_id:req.params._id})
        .then(role=>{
            res.send(role);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Role"});
        })
    };
    
    // Update a branch by the branch name in the request
    
    exports.update = (req,res)=>{
        if(!req.body.name){
            console.log("Name is empty");
            res.status(400).json({message:"Name Cannot be empty"});        
            return;
        }     


        Role.findOneAndUpdate({_id:req.params._id},
        {
            name:req.body.name,
            dashboardsInRole:req.body.dashboardsInRole,
            modifiedBy:req.body.modifiedBy
            })
        .then(role=>{
            res.send(role);
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while updating Role"});
        })

    };
    
    exports.delete = (req,res)=>{
        UserRole.findOne({role:req.params._id})
        .then(userRoles=>{
            console.log(userRoles);
            if(userRoles != null){
                res.status(405).send({message:"Role is assigned to a user"})
            }else{
                deleteRole()
            } 
        })
        .catch(err=>{
            res.status(500).send({message:err.message ||"Some error occurred while deleting Role"})
        })

        function deleteRole(){
            Role.deleteOne({_id:req.params._id})
            .then(role=>{
                res.send({message:`Role ${req.params.name} deleted successfully`});
            }).catch(err=>{
                res.status(500).send({message :err.message || "Some error occurred while deleting Role"});
            })
        }
    };



