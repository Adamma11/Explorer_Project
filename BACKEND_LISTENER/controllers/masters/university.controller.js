const University = require('../../models/masters/university.model.js');
const express = require('express');
const User = require('../../models/administration/user.model.js');


//Create and Save Branch
exports.create = (req,res)=>{   
// Validate Request
    if(!req.body.name){
        res.status(400).json({message:"University Name Cannot be empty"});        
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
    if(req.body.onlineVerificationPossible===null){ 
        res.status(400).json({message:"Online Verification Possible Cannot be empty"});        
    }        
    if(req.body.fakeUniversity===null){ 
        res.status(400).json({message:"Fake University Cannot be empty"});        
    }            

    const university = new University({
        name:req.body.name,
        address:req.body.address,
        district:req.body.district,
        pinCode:req.body.pinCode,
        state:req.body.state,
        country:req.body.country,
        onlineVerificationPossible:req.body.onlineVerificationPossible,
        digitizedRecordDate:req.body.digitizedRecordDate,
        fakeUniversity:req.body.fakeUniversity,
        verificationFee:req.body.verificationFee,
        modifiedBy:req.user.user_id,
        concernperson:req.body.concernperson, 
        designation:req.body.designation, 
        modeofverification:req.body.modeofverification, 
	institutestatus: req.body.institutestatus,     
        daysforverification:req.body.daysforverification, 
        email:req.body.email,
        phone:req.body.phone, 
    });
    university
    .save(university)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving University Details"
        });
    });
   
};


//Retrieve all Branches
exports.findAll = (req,res)=>{
    University.find()
    .then(universities=>{
        res.send(universities);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Universities"});
    })    
};

//Find a single University

exports.findOne = (req,res)=>{
    University.findOne({_id:req.params._id})
    .then(university=>{
        res.send(university);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Branch"});
    })
};

// Update a university

exports.update = (req,res)=>{
    if(!req.body.address){
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
    if(req.body.onlineVerificationPossible===null){ 
        res.status(400).json({message:"Online Verification Possible Cannot be empty"});        
    }        
    if(req.body.fakeUniversity===null){ 
        res.status(400).json({message:"Fake University Cannot be empty"});        
    }            

    University.findOneAndUpdate({_id:req.params._id},
        {
        address:req.body.address,
        pinCode:req.body.pinCode,   
        district:req.body.district,
        state:req.body.state,
        country:req.body.country,
        onlineVerificationPossible:req.body.onlineVerificationPossible,
        digitizedRecordDate:req.body.digitizedRecordDate,
        fakeUniversity:req.body.fakeUniversity,
        verificationFee:req.body.verificationFee,
        modifiedBy:req.user.user_id,
        concernperson:req.body.concernperson, 
        designation:req.body.designation, 
        modeofverification:req.body.modeofverification, 
	institutestatus: req.body.institutestatus, 	
        daysforverification:req.body.daysforverification, 
        email:req.body.email,
        phone:req.body.phone, 
    })
    .then(university=>{
        res.send(university);
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while updating University"});
    })

};

exports.delete = (req,res)=>{
    University.deleteOne({_id:req.params._id})
    .then(branch=>{
        res.send({message:`University ${req.params.name} deleted successfully`});
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting University"});
    })
};

exports.searchUniversity = (req,res)=>{
    let searchString = req.params.searchString;
    University.find({name:{"$regex":searchString,"$options":"i"}},{name:1,_id:0})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json({
            message:err.message || "Some error occurred while searching for university"
        })
    })
};

exports.searchFor = (req,res)=>{
    let searchString = req.params.searchString;
    University.find({$or:[{pinCode:{"$regex":searchString,"$options":"i"}},{district:{"$regex":searchString,"$options":"i"}},{state:{"$regex":searchString,"$options":"i"}},{country:{"$regex":searchString,"$options":"i"}},{address:{"$regex":searchString,"$options":"i"}},{status:{"$regex":searchString,"$options":"i"}},{name:{"$regex":searchString,"$options":"i"}}]})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json({
            message:err.message || "Some error occurred while searching for University"
        })
    })
};
