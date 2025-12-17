const Vendor = require('../../models/administration/vendor.model.js');
const VendorContract =require('../../models/administration/vendor_contract.model');
const express = require('express');


//Create and Save Vendor
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
    if(!req.body.branch){ 
        res.status(400).json({message:"Branch Cannot be empty"});        
    }            
    if(!req.body.status){ 
        res.status(400).json({message:"Status Cannot be empty"});        
    }        


    const vendor = new Vendor({
        name:req.body.name,
        address:req.body.address,
        city:req.body.city,
        pinCode:req.body.pinCode,
        state:req.body.state,
        country:req.body.country,
        branch:req.body.branch,
        status:req.body.status,
        gstin:req.body.gstin,
        contactPerson:req.body.contactPerson,
        telephone:req.body.telephone,
        email:req.body.email,
        includedPinRanges:req.body.includedPinRanges,
        excludedPinRanges:req.body.excludedPinRanges,
        modifiedBy:req.body.modifiedBy 
    });

    vendor
    .save(vendor)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Vendor Details"
        });
    });
   
};


//Retrieve all Branches
exports.findAll = (req,res)=>{
    Vendor.find()
    .populate({path :'branch'})
    .then(vendors=>{
        res.send(vendors);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Vendors"});
    })    
};

//Find a single company

exports.findOne = (req,res)=>{
    Vendor.findOne({_id:req.params._id})
    .then(vendor=>{
        res.send(vendor);
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Vendor"});
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
    if(!req.body.branch){ 
        res.status(400).json({message:"Branch Cannot be empty"});        
    }        
    Vendor.findOneAndUpdate({_id:req.params._id},
        {
            name:req.body.name,
            address:req.body.address,
            pinCode:req.body.pinCode,   
            city:req.body.city,
            state:req.body.state,
            country:req.body.country,
            branch:req.body.branch,        
            status:req.body.status,
            gstin:req.body.gstin,
            contactPerson:req.body.contactPerson,
            telephone:req.body.telephone,
            email:req.body.email,
            includedPinRanges:req.body.includedPinRanges,
            excludedPinRanges:req.body.excludedPinRanges,
            modifiedBy:req.body.modifiedBy
    })
    .then(vendor=>{
        res.send(vendor);
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while updating Vendor"});
    })

}

exports.delete = (req,res)=>{
    Vendor.deleteOne({_id:req.params._id})
    .then(vendor=>{
        res.send({message:`Vendor deleted successfully`});
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting Vendor"});
    })
};
exports.findAllVendorsForAddressComponent = (req,res)=>{
    console.log("Trying to et vendor for address component");
    async function fillVendorsForAddressComponent(){
        VendorContract
        .find({effectiveDate:{$lte:Date.now()}})
        .populate({path:'vendor'})
        .then(async data=>{
          let vendorData = await addVendors(data)
          res.json(vendorData)
        })
        .catch(err=>{
            res.status(500).json({
                message:"Error reading vendor contracts"
            })
        })
    }
    let addVendors = function(data){
        return new Promise((resolve,reject)=>{
            let dataToReturn = new Array();
            for(let i= 0; i < data.length;i++){
                let addressPrices = data[i].addressPrices;
                if(addressPrices == null || addressPrices.length ==0){

                }else{
                    dataToReturn.push(data[i])
                }            
            }
            resolve(dataToReturn)
        })
    }
    fillVendorsForAddressComponent()

}
exports.findAllVendorsForEducationComponent = (req,res)=>{
    console.log("Trying to vendor for education component");
    async function fillVendorsForEducationComponent(){
        VendorContract
        .find({effectiveDate:{$lte:Date.now()}})
        .populate({path:'vendor'})
        .then(async data=>{
          let vendorData = await addVendors(data)
          res.json(vendorData);
        })
        .catch(err=>{
            res.status(500).json({
                message:"Error reading vendor contracts"
            })
        })
    }
    let addVendors = function(data){
        return new Promise((resolve,reject)=>{
            let dataToReturn = new Array();
            for(let i= 0; i < data.length;i++){
                let educationPrices = data[i].educationPrices;
                if(educationPrices == null || educationPrices.length ==0){

                }else{
                    dataToReturn.push(data[i])
                }            
            }
            resolve(dataToReturn)
        })
    }
    fillVendorsForEducationComponent()
}
exports.findAllVendorsForEmploymentComponent = (req,res)=>{
    console.log("Trying to vendor for employment component");
    async function fillVendorsForEmploymentComponent(){
        VendorContract
        .find({effectiveDate:{$lte:Date.now()}})
        .populate({path:'vendor'})
        .then(async data=>{
          let vendorData = await addVendors(data)
          res.json(vendorData);
        })
        .catch(err=>{
            res.status(500).json({
                message:"Error reading vendor contracts"
            })
        })
    }
    let addVendors = function(data){
        return new Promise((resolve,reject)=>{
            let dataToReturn = new Array();
            for(let i= 0; i < data.length;i++){
                let employmentPrices = data[i].employmentPrices;
                if(employmentPrices == null || employmentPrices.length ==0){

                }else{
                    dataToReturn.push(data[i])
                }            
            }
            resolve(dataToReturn)
        })
    }
    fillVendorsForEmploymentComponent()
}
exports.findAllVendorsForOtherComponent = (req,res)=>{
    console.log("Trying to et vendor for other component");
    async function fillVendorsForOtherComponent(){
        VendorContract
        .find({effectiveDate:{$lte:Date.now()}})
        .populate({path:'vendor'})
        .then(async data=>{
            let vendorData = await addVendors(data)
            res.json(vendorData);
        })
    }
    let addVendors = function(data){
        return new Promise((resolve,reject)=>{
            let dataToReturn = new Array();
            for(let i = data.length -1;i >= 0; i--){
                let otherComponentPrices = data[i].otherComponentPrices;
                let found = false;
                if(otherComponentPrices != null){
                    for(let j=0; j < otherComponentPrices.length;j++){
                        if(req.params.component_id == otherComponentPrices[j].component){
                            found = true;
                            break;
                        }
                    }
                    if(found){
                       dataToReturn.push(data[i]); 
                    }                
                }
                
            }
            resolve(dataToReturn)
        })
    }
    fillVendorsForOtherComponent()
}

