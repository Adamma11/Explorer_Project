const EducationMaster  = require('../../models/masters/education_master.model');
const express = require('express');
const University = require('../../models/masters/education_master.model');


exports.create = (req,res)=>{
    if(!req.body.name){  
        res.status(400).json({message:'Name cannot be empty'})
    }
    if(!req.body.address){
        res.status(400).json({message:'Address cannot be empty'})
    }
    const educationMaster = new EducationMaster({
        name:req.body.name,
        address:req.body.address,
        city:req.body.city,
        source:req.body.source,
        url:req.body.url,
        verificationFee:req.body.verificationFee,
        branch:req.body.branch,
        modifiedBy:req.user.user_id,
        concernperson:req.body.concernperson, 
        designation:req.body.designation, 
        modeofverification:req.body.modeofverification, 
        daysforverification:req.body.daysforverification, 
        email:req.body.email,
        phone:req.body.phone 
    })
    educationMaster
    .save(educationMaster)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occured while storing education master"
        })
    })
}
exports.read = (req,res)=>{
    EducationMaster
    .findOne({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while retrieving education master"
        })
    })
}
exports.readAll = (req,res)=>{
    EducationMaster
    .find()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        message:err.message || "Some error occurred  while retrieving edcuatioin masters"
    })
}

exports.update = (req,res)=>{
    EducationMaster
    .findOneAndUpdate({_id:req.params._id},{
        name:req.body.name,
        address:req.body.address,
        city:req.body.city,
        url:req.body.url,
        source:req.body.source,
        verificationFee:req.body.verificationFee,
        modifiedBy:req.user.user_id,
        concernperson:req.body.concernperson, 
        designation:req.body.designation, 
        modeofverification:req.body.modeofverification, 
        daysforverification:req.body.daysforverification, 
        email:req.body.email,
        phone:req.body.phone, 
    })
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        message:err.message || "Some error occurred  while updating edcuatioin master"
    })
}

exports.delete = (req,res)=>{
    EducationMaster
    .findOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        message:err.message || "Some error occurred  while delete edcuatioin master"
    })
}
exports.readAllThatContains = (req,res)=>{
    let searchString = req.params.searchString;
    console.log("Searching for ",searchString.substring(0,3));
    EducationMaster
    .find({name:{"$regex":searchString.substring(0,3),"$options":"i"}})
    .populate({path:'branch'})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
	console.log("Error in reading education master ............",err)    
        res.status(500).json({
            message: err.message | "Some error occurred while searching for a employer"
        })
    })

}
///////////////////
exports.findOne = (req,res)=>{
    University.findOne({_id:req.params._id})
    .then(university=>{
        res.send(university);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Branch"});
    })
};
