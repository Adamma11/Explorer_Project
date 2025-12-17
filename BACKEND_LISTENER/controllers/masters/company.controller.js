const Company = require('../../models/masters/company.model.js');
const express = require('express');
const User = require('../../models/administration/user.model.js');


//Create and Save Company
exports.create = (req,res)=>{
// Validate Request
    if(!req.body.name){
        res.status(400).json({message:"Company Name Cannot be empty"});        
    } 
    else if(!req.body.address){
        res.status(400).json({message:"Address Cannot be empty"});        
    }     
    else if(!req.body.pin){
        res.status(400).json({message:"PIN Cannot be empty"});        
    }         
    /*else if(!req.body.district){
        res.status(400).json({message:"District Cannot be empty"});        
    }*/
    if(!req.body.state){
        res.status(400).json({message:"State Cannot be empty"});        
    }
    else if(!req.body.country){ 
        res.status(400).json({message:"Country Cannot be empty"});        
    }    
    else if(!req.body.status){ 
        res.status(400).json({message:"Status Cannot be empty"});        
    }        
   /* if(req.body.onlineVerificationPossible===null){ 
        res.status(400).json({message:"Online Verification Possible Cannot be empty"});        
    }        
    else if(req.body.verificationFee===null){ 
        res.status(400).json({message:"Verification Fee Cannot be empty"});        
    }*/else{                
    // if(!req.body.modifiedBy){
    //     res.status(400).json({message:"Modified By Cannot be empty"});        
    // }    
    const company = new Company({
        name:req.body.name,
        address:req.body.address,
        district:req.body.district,
        pin:req.body.pin,
        state:req.body.state,
        country:req.body.country,
        status:req.body.status,
        concernperson:req.body.concernperson, 
        designation:req.body.designation, 
        modeofverification:req.body.modeofverification, 
        daysforverification:req.body.daysforverification, 
        email:req.body.email,
        phone:req.body.phone, 
        mandatoryDocuments:req.body.mandatoryDocuments,
        onlineVerificationPossible:req.body.onlineVerificationPossible,
        verificationFee:req.body.verificationFee,
        // modifiedBy:req.body.userId
    });

    company
    .save(company)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Company Details"
        });
    });
}
 
};


//Retrieve all Branches
exports.findAll = (req,res)=>{
    Company.find()
    .then(companies=>{
        res.send(companies);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Companies"});
    })    
};

//Find a single company

exports.findOne = (req,res)=>{
    Company.findOne({_id:req.params._id})
    .then(company=>{
        res.send(company);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Company"});
    })
};

// Update a company

exports.update = (req,res)=>{
    if(!req.body.name){
        res.status(400).json({message:"Name Cannot be empty"});        
        return;
    }         
    else if(!req.body.address){
        res.status(400).json({message:"Name Cannot be empty"});        
        return;
    }     
    else if(!req.body.pin){
        res.status(400).json({message:"PIN Cannot be empty"});     
        return;   
    }    
    /*else if(!req.body.district){
        res.status(400).json({message:"District Cannot be empty"});     
        return;   
    }*/
    else if(!req.body.state){
        res.status(400).json({message:"State Cannot be empty"});        
        return;
    }
    else if(!req.body.country){ 
        res.status(400).json({message:"Country Cannot be empty"});        
        return;
    }    
    else if(!req.body.status){ 
        res.status(400).json({message:"Status Company Cannot be empty"});        
    }                
    /*if(req.body.onlineVerificationPossible===null){ 
        res.status(400).json({message:"Online Verification Possible Cannot be empty"});        
    }        

    else if(req.body.verificationFee===null){ 
        res.status(400).json({message:"Verification Fee Cannot be empty"});        
    }*/else {                
    // if(!req.body.modifiedBy){
    //     res.status(400).json({message:"Modified By Cannot be empty"});        
    //     return;
    // }    

 
        Company
        .findOneAndUpdate({_id:req.params._id},{
            name:req.body.name,                
            address:req.body.address,
            pin:req.body.pin,   
            district:req.body.district,
            state:req.body.state,
            country:req.body.country,
            status:req.body.status,
            concernperson:req.body.concernperson, 
            designation:req.body.designation, 
            modeofverification:req.body.modeofverification, 
            daysforverification:req.body.daysforverification, 
            email:req.body.email,
            phone:req.body.phone, 
            mandatoryDocuments:req.body.mandatoryDocuments,
            onlineVerificationPossible:req.body.onlineVerificationPossible,
            verificationFee:req.body.verificationFee,
            // modifiedBy:req.body.userId
        })
        .then(data=>{
            res.send(data);
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while updating Company"});
        })
    }

};

exports.delete = (req,res)=>{
    Company.deleteOne({_id:req.params._id})
    .then(branch=>{
        res.send({message:`Company ${req.params.name} deleted successfully`});
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting Company"});
    })
};
exports.searchCompany = (req,res)=>{
    let searchString = '^' + req.params.searchString;
    Company.find({name:{"$regex":searchString,"$options":"i"}},{name:1,_id:0})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json({
            message:err.message || "Some error occurred while searching for company"
        })
    })
};

exports.searchFor = (req,res)=>{
    let searchString = req.params.searchString;
    Company.find({$or:[{pin:{"$regex":searchString,"$options":"i"}},{district:{"$regex":searchString,"$options":"i"}},{state:{"$regex":searchString,"$options":"i"}},{country:{"$regex":searchString,"$options":"i"}},{address:{"$regex":searchString,"$options":"i"}},{status:{"$regex":searchString,"$options":"i"}},{name:{"$regex":searchString,"$options":"i"}}]})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json({
            message:err.message || "Some error occurred while searching for Company"
        })
    })
};

exports.readAllForMe = (req,res)=>{
    Company
    .find({bde:req.user.user_id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
        message:"Some Error Occurred While reading the List"
        })
    })
}
