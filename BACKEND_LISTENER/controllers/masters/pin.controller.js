const Pin = require('../../models/masters/pin.model.js');
const User = require('../../models/administration/user.model.js');
const express = require('express');
const University = require('../../models/masters/university.model.js');
const Company = require('../../models/masters/company.model.js');
const Branch = require('../../models/masters/branch.model.js');
const Client = require('../../models/administration/client.model.js');
const Subclient = require('../../models/administration/subclient.model.js');
const Vendor = require('../../models/administration/vendor.model.js');
const { modelName } = require('../../models/masters/pin.model.js');
const { MongooseDocument } = require('mongoose');

//const pin = db.pins;

//Create and Save Pin
exports.create = (req,res)=>{
// Validate Request
    if(!req.body.pinCode){
        res.status(400).json({message:"Pin Code Cannot be empty"});        
    } 
    if(!req.body.areasCovered){
        res.status(400).json({message:"Area Covered Cannot be empty"});        
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

    const pin = new Pin({
        pinCode:req.body.pinCode,
        areasCovered:req.body.areasCovered,
        district:req.body.district,
        state:req.body.state,
        country:req.body.country,
    });

    pin
    .save(pin)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving PIN"
        });
    });

     
};


//Retrieve all Pins
exports.findAll = (req,res)=>{

    Pin.find()
    .then(pins=>{
        res.send(pins);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Pins"});
    })    
};

//Find a single Pin with pin_code

exports.findOne = (req,res)=>{
    console.log('Validating the pin',req.params.pinCode);
    Pin.findOne({pinCode:req.params.pinCode})
    .then(pin=>{
        res.send(pin);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving PIN"});
    })
};

exports.findOneWithId = (req,res)=>{
    Pin.findOne({_id:req.params._id})
    .then(pin=>{
        res.send(pin);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving PIN"});
    })
};

// Update a pin by the pin_code in the request

exports.update = (req,res)=>{
    console.log("About to update pin "+ req.body.areasCovered + " " + req.body.district);
    if(!req.body.pinCode){
        console.log("PIN is empty");
        res.status(400).json({message:"Areas Covered Cannot be empty"});        
        return;
    }    
    if(!req.body.areasCovered){
        console.log("Areas covered is empty");
        res.status(400).json({message:"Areas Covered Cannot be empty"});        
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

    Pin.findOneAndUpdate({_id:req.params._id},{
        pinCode:req.body.pinCode,
        areasCovered:req.body.areasCovered,
        district:req.body.district,
        state:req.body.state,
        country:req.body.country,
    })
    .then(pin=>{
        res.send(pin);
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while updating PIN"});
    })

};

exports.delete = (req,res)=>{
    console.log("about to find the pin code using the _id")
    Pin.findOne({_id:req.params._id})
    .then(pin=>{
        console.log('check in universiy')
        checkInUniversity(pin.pinCode)
    })
    .catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting PIN"});
    })

    function checkInUniversity(pinCode)
    {
        University.findOne({pinCode:pinCode})
        .then(university=>{
            if(university != null){
                res.status(405).send({message:"Cannot be deleted because it is used in University"})
            }else{
                console.log('check in company')
                checkInCompany(pinCode);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occurred while reading pin code in university"})
        })
    }
    function checkInCompany(pinCode)
    {
        Company.findOne({pinCode:pinCode})
        .then(company=>{
            if(company !=null){
                res.status(405).send({message:"Cannot be deleted because it is used in Company"})
            }else{
                console.log('check in branch')
                checkInBranch(pinCode);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occurred while reading pin code in company"})
        })    
    }

    function checkInBranch(pinCode)
    {
        Branch.findOne({pinCode:pinCode})
        .then(branch=>{
            if(branch !=null){
                res.status(405).send({message:"Cannot be deleted because it is used in Branch"})
            }else{
                console.log('check in client')
                checkInClient(pinCode);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occurred while reading pin code in branch"})
        })    
    }    
    function checkInClient(pinCode)
    {
        Client.findOne({pinCode:pinCode})
        .then(client=>{
            if(client !=null){
                res.status(405).send({message:"Cannot be deleted because it is used in Client"})
            }else{
                console.log('check in subclient')
                checkInSubclient(pinCode);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occurred while reading pin code in client"})
        })    
    }        
    function checkInSubclient(pinCode)
    {
        Subclient.findOne({pinCode:pinCode})
        .then(subclient=>{
            if(subclient !=null){
                res.status(405).send({message:"Cannot be deleted because it is used in Subclient"})
            }else{
                console.log('check in vendor')
                checkInVendor(pinCode);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occurred while reading pin code in Subclient"})
        })    
    }            

    function checkInVendor(pinCode)
    {
        Vendor.findOne({pinCode:pinCode})
        .then(vendor=>{
            if(vendor !=null){
                res.status(405).send({message:"Cannot be deleted because it is used in Vendor"})
            }else{
                console.log("finally delete pin")
                deletePin();
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occurred while reading pin code in Vendor"})
        })    
    }                
    function deletePin()
    {
        Pin.deleteOne({_id:req.params._id})
        .then(pin=>{
            res.send({message:`PIN deleted successfully`});
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting PIN"});
        })
    }

};
exports.searchPin = (req,res)=>{
    let searchString = req.params.searchString;
    Pin.find({pinCode:{"$regex":searchString,"$options":"i"}},{pinCode:1,_id:0})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json({
            message:err.message || "Some error occurred while searching for PIN"
        })
    })
};
exports.searchFor = (req,res)=>{
    console.log('search string is ',req.params.searchString);
    let searchString = req.params.searchString;
    Pin.find({$or:[{pinCode:{"$regex":searchString,"$options":"i"}},{district:{"$regex":searchString,"$options":"i"}},{state:{"$regex":searchString,"$options":"i"}},{country:{"$regex":searchString,"$options":"i"}},{areasCovered:{"$regex":searchString,"$options":"i"}}]})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json({
            message:err.message || "Some error occurred while searching for PIN"
        })
    })
};
exports.getPinForCity = (req,res)=>{
    console.log("About to get pin for the city mentioned",req.params.cityName);
    Pin
    .findOne({district:req.params.cityName})
    .then(data=>{
        console.log("found the data ",data);
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | "Some error occured while fetching pin for a city"
        })
    })
}
