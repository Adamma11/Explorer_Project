const StandardVerbiage = require('../../models/masters/standard_verbiage.model.js');
const express = require('express');


//Create and Save Comments
exports.create = (req,res)=>{
// Validate Request
    // console.log('req body is ',req);
    // if(!req.body.comment){
        // res.status(400).json({message:"Comments Cannot be empty"});        
    // } 

  const standardVerbiage = new StandardVerbiage({
    comment:req.body.comment,
        modifiedBy:req.body.modifiedBy 
    });

    standardVerbiage
    .save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Standard Verbiage"
        });
    });

};


//Retrieve all Branches
exports.findAll = (req,res)=>{
 
    StandardVerbiage.find()
    .then(standardVerbiage=>{
        res.send(standardVerbiage);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Standard Verbiage"});
    })    
};

//Find a single comment with branch name

exports.findOne = (req,res)=>{
    StandardVerbiage.findOne({_id:req.params._id})
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Standard Verbiage"});
    })
};

// Update a comment by the branch name in the request

exports.update = (req,res)=>{
    if(!req.body.comment){
        console.log("Comment is empty");
        res.status(400).json({message:"Comment Cannot be empty"});        
        return;
    }     

    StandardVerbiage.findOneAndUpdate({_id:req.params._id},
    {
        comment:req.body.comment,
        modifiedBy:req.body.modifiedBy
        })
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        console.log(err.message);
        res.status(500).send({message :err.message || "Some error occurred while updating Standard Verbiage"});
    })

};
exports.delete = (req,res)=>{
    StandardVerbiage.findOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting Standard Verbiage"});
    })

};

exports.searchAllInsuffComments = async (req, res) => {

    try {

        const searchString = req.query.search

        const StandardVerbiageData = await StandardVerbiage.find({ comment: { $regex: new RegExp('^' + searchString, 'i') } });

        return res.json(StandardVerbiageData)

    } catch (error) {

        console.log(error)

        return res.status(500).json({ error: "Could not get education masters due to an internal server error." })

    }

} 