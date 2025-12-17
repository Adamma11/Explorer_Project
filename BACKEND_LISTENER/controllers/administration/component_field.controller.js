const ComponentField = require('../../models/administration/component_field.model');
const express = require('express');

//Create and Save Component
exports.createMany = (req,res)=>{
        ComponentField.insertMany(req.body.componentFields)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Component Fields"
            });
        });

};
    
    
    //Retrieve all Fields
    exports.findAll = (req,res)=>{
        ComponentField.find()
        .then(userRoles=>{
            res.send(userRoles);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Component Fields"});
        })    
    };
    
    // find  all fields for a component
    exports.findAllFieldsForAComponent = (req,res)=>{
        ComponentField.find({component:req.params.componentId})
        .then(componentFields=>{
            res.send(componentFields);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Component Fields"});
        })    
    };
    //Find a single Field for the given component
    
    exports.findOne = (req,res)=>{
        ComponentField.findOne({component:req.params.componentId,_id:req.params.fieldId})
        .then(componentField=>{
            res.send(componentField);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Component Field"});
        })
    };
    
    // Update a Field 
    
    exports.update = (req,res)=>{
        if(!req.body.component){
            console.log("Component Id is empty");
            res.status(400).json({message:"Component Id Cannot be empty"});        
            return;
        }     
        if(!req.body._id){
            console.log("Field Id is blank");
            res.status(400).json({message:"Field Id Cannot be empty"});        
            return;
        }     

        ComponentField.findOneAndUpdate({userId:req.params.componentId,_id:req.params.fieldId},
        {
           modifiedBy:req.body.modifiedBy
            })
        .then(componentField=>{
            res.send(componentField);
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while updating Component Field"});
        })

    };
    
    exports.deleteForAComponent = (req,res)=>{
        ComponentField.deleteMany({component:req.params.componentId})
        .then(componentFields=>{
            res.send({message:`Fields deleted from Component successfully`});
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting Fields for the Component"});
        })
    };      
