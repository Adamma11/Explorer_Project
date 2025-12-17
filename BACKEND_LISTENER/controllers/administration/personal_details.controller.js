const PersonalDetails = require('../../models/administration/personal_details.model');
const PersonalDetailsField = require('../../models/administration/personal_details_field.model');
const fs = require('fs');
const express = require('express');
const personalDetailsModelWriter = require('../../shared/personal_details_model_writer');
const mongoose = require('mongoose');



// Create and Save User
exports.create = (req,res)=>{
    if(!req.body.name){
        res.status(400).json({message:"Name cannot be empty"});
    }
    const personalDetails = new PersonalDetails({
        displayName:req.body.displayName,
        modifiedBy:req.body.modifiedBy
    });

    personalDetails
       .save(personalDetails)
       .then(data=>{
           createPersonalDetailsFields();
           personalDetailsModelWriter.writeModel(req,res); 
           res.json(data);
       })
       .catch(err=>{
           console.log(err);
           res.status(500).json({message:err.message || 'Some error occurred while saving Personal details'});
       });

       function createPersonalDetailsFields(){
           PersonalDetailsField
           .insertMany(req.body.personalDetailsFields)
           .then(data=>{
                res.json(data)                
           })
           .catch(err=>{
                res.status(500).json({message:err.message || 'Some error occurred while saving Personal details'});
           })
       }

};

// find all users

exports.findAll = (req,res)=>{
    PersonalDetails.find()
    .then(personalDetailsList=>{
        getFields(personalDetailsList)
    })
    .catch(err=>{
        res.status(500).json({message:err.message || 'Some error while retrieving components'});
    });
    async function getFields(personalDetailsList){
        let newArray = new Array();
        for (let i=0; i < personalDetailsList.length;i++){
            console.log("waiting to add field list")
            let personalDetails = personalDetailsList[i].toJSON();
            let personalDetailsFieldList = await getFieldList();
            personalDetails["personalDetailsFields"] = personalDetailsFieldList;
            newArray.push(personalDetails);
        }   
        res.json(newArray);
    }
    let getFieldList = function (){
        return new Promise(function(resolve,reject){
            PersonalDetailsField
            .find()
            .then(data=>{
                resolve(data);
            })
            .catch(err=>{
                reject();
            })

        })
    }

};

// find a user
exports.findOne = (req,res)=>{
    console.log(req.params._id);
    PersonalDetails.findOne({_id:req.params._id})
    .then(personalDetails=>{
        res.json(personalDetails);

    })
    .catch(err=>{
        res.status(500).json({message:err.message || "Some error while retrieving Component"});
    });
};

// update user using the user id
exports.update = (req,res)=>{
    PersonalDetails.findOneAndUpdate({_id:req.params._id},
        {
            displayName:req.body.displayName,
            modifiedBy:req.body.modifiedBy
        })
       .then(personalDetails=>{
           console.log(req.body.personalDetailsFields);
           PersonalDetailsField.deleteMany({})
           .then(deletedData=>{
                PersonalDetailsField.insertMany(req.body.personalDetailsFields)                
                .then(data=>{
                    personalDetailsModelWriter.writeModel(req,res); 
                    res.json(personalDetails);
                })
                .catch(err=>{
                    res.status(500).json({message:err.message || 'Some error while updating Personal Details'});                                   
                })
           })
           .catch(err=>{
               console.log("error updating ",err.message);
               res.status(500).json({message:err.message || 'Some error while updating Personal Details'});               
           })

       }) 
       .catch(err=>{
           res.status(500).json({message:err.message || 'Some error while updating Personal Details'});
       });
};    

exports.findAllForCde = (req,res)=>{
    console.log("In Find All For CDE of personal details")
    let caseId = req.caseId
    console.log("In Find  all for cde,case id is ",caseId)
    if(caseId != null){
       PersonalDetails.find()
       .then(personalDetailsList=>{
           console.log("Trying to get fields")
           getFields(personalDetailsList)
       })
       .catch(err=>{
           console.log("Error in personal details ",err)
           res.status(500).json({message:err.message || 'Some error while retrieving components'});
       });
       async function getFields(personalDetailsList){
           let newArray = new Array();
           for (let i=0; i < personalDetailsList.length;i++){
               console.log("waiting to add field list")
               let personalDetails = personalDetailsList[i].toJSON();
               let personalDetailsFieldList = await getFieldList();
               personalDetails["personalDetailsFields"] = personalDetailsFieldList;
               newArray.push(personalDetails);
           }
           res.json(newArray);
       }
    }else{
       res.status(403).json({
               message : "Could not authenticate the user"
       })
    }
    let getFieldList = function (){
        return new Promise(function(resolve,reject){
            PersonalDetailsField
            .find()
            .then(data=>{
                resolve(data);
            })
            .catch(err=>{
                reject();
            })

        })
    }

};

