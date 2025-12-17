const Client = require('../../models/administration/client.model.js');
const express = require('express');


//Create and Save Company
exports.create = (req,res)=>{
// Validate Request
    if(!req.body.name){
        res.status(400).json({message:"Vendor Name Cannot be empty"});        
    } 
    if(!req.body.address){
        res.status(400).json({message:"Address Cannot be empty"});        
    }     
    if(!req.body.pinCode){
        res.status(400).json({message:"PIN Cannot be empty"});        
    }         
    if(!req.body.city){
        res.status(400).json({message:"City / District Cannot be empty"});        
    }
    if(!req.body.state){
        res.status(400).json({message:"State Cannot be empty"});        
    }
    if(!req.body.country){ 
        res.status(400).json({message:"Country Cannot be empty"});        
    }    
    if(!req.body.status){ 
        res.status(400).json({message:"Status Cannot be empty"});        
    }        
    const client = new Client({
        name:req.body.name,
	clientCode:req.body.clientCode,    
        status:req.body.status,
        contactPerson:req.body.contactPerson,
        telephone:req.body.telephone,        
        email:req.body.email,        
        address:req.body.address,
        city:req.body.city,
        pinCode:req.body.pinCode,
        state:req.body.state,
        country:req.body.country,
	///////
	secondarycontactPerson:req.body.secondarycontactPerson,
        secondarytelephone:req.body.secondarytelephone,
        secondaryemail:req.body.secondaryemail,
        secondaryaddress:req.body.secondaryaddress,
        secondarycity:req.body.secondarycity,
        secondarypinCode:req.body.secondarypinCode,
        secondarystate:req.body.secondarystate,
        secondarycountry:req.body.secondarycountry,
	//////
        cin:req.body.cin,
        gstIn:req.body.gstIn,
        pan:req.body.pan,
        pfNumber:req.body.pfNumber,
        priority:req.body.priority,
        archiveAfter:req.body.archiveAfter,
        colorCodes:req.body.colorCodes,
        reportTypes:req.body.reportTypes,
        uploadTypes:req.body.uploadTypes,
        closureTypesAllowed:req.body.closureTypesAllowed,
        closureModesAllowed:req.body.closureModesAllowed,
        domainName:req.body.domainName,
        modifiedBy:req.body.modifiedBy 
    });

    client
    .save(client)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Client Details"
        });
    });
   
};


//Retrieve all Branches
exports.findAll = (req,res)=>{
    Client.find()
    .then(clients=>{
        res.send(clients);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Clients"});
    })    
};

//Find a single company 

exports.findOne = (req,res)=>{
    Client.findOne({_id:req.params._id})
    .then(client=>{
        res.send(client);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Client"});
    })
};

// Update a company

exports.update = (req,res)=>{
    if(!req.body.name){
        res.status(400).json({message:"Name Cannot be empty"});        
        return;
    }         
    if(!req.body.address){
        res.status(400).json({message:"AddressCannot be empty"});        
        return;
    }     
    if(!req.body.pinCode){
        res.status(400).json({message:"PIN Cannot be empty"});     
        return;   
    }    
    if(!req.body.city){
        res.status(400).json({message:"City / District Cannot be empty"});     
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
    if(!req.body.status){ 
        res.status(400).json({message:"Status Vendor Cannot be empty"});        
    }                
    Client.findOneAndUpdate({_id:req.params._id},
        {
            name:req.body.name,
	    clientCode:req.body.clientCode,	
            status:req.body.status,
            contactPerson:req.body.contactPerson,
            telephone:req.body.telephone,        
            email:req.body.email,        
            address:req.body.address,
            city:req.body.city,
            pinCode:req.body.pinCode,
            state:req.body.state,
            country:req.body.country,
            secondarycontactPerson:req.body.secondarycontactPerson,
            secondarytelephone:req.body.secondarytelephone,
            secondaryemail:req.body.secondaryemail,
            secondaryaddress:req.body.secondaryaddress,
            secondarycity:req.body.secondarycity,
            secondarypinCode:req.body.secondarypinCode,
            secondarystate:req.body.secondarystate,
            secondarycountry:req.body.secondarycountry,		
            cin:req.body.cin,
            gstIn:req.body.gstIn,
            pan:req.body.pan,
            pfNumber:req.body.pfNumber,
            priority:req.body.priority,
            archiveAfter:req.body.archiveAfter,
            colorCodes:req.body.colorCodes,
            reportTypes:req.body.reportTypes,            
            uploadTypes:req.body.uploadTypes,
            closureTypesAllowed:req.body.closureTypesAllowed,
            closureModesAllowed:req.body.closureModesAllowed,
            domainName:req.body.domainName,
            modifiedBy:req.body.modifiedBy 
    })
    .then(client=>{
        res.send(client);
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while updating Client"});
    })

}

exports.delete = (req,res)=>{
    Client.deleteOne({_id:req.params._id})
    .then(client=>{
        res.send({message:`Client deleted successfully`});
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting Client"});
    })
};
