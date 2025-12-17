const ClientContractComponent = require('../../models/administration/client_contract_component.model');
const express = require('express');
const Component = require('../../models/administration/component.model');

exports.createMany = (req,res)=>{
    console.log('client contract components are ',req.body.clientContractComponents);
    ClientContractComponent.insertMany(req.body.clientContractComponents)
    .then(data=>{
        console.log(data);
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Components for a Contracts"
        })
    })
};
exports.findAllForAClientContract = (req,res)=>{
    ClientContractComponent.find({clientContract:req.params.clientContract})
    .populate({path:'component'})
    .then(clientContracts=>{
        res.json(clientContracts);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching Components for the Contract"
        })
    })
}
exports.findDetailsForAComponent = (req,res)=>{
    ClientContractComponent.find({clientContract:req.params.clientContract_id,component:req.params.component_id})
    .populate({path:'component'})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching Components for the Contract"
        })
    })
}

exports.findAllWithoutFileUploadForAClientContract = (req,res)=>{
    ClientContractComponent
    .find({clientContract:req.params.clientContract})
    .populate({path:'component'})
    .then(clientContractComponents=>{
        getListOfComponentsWithoutFileUpload(clientContractComponents);        
//        res.json(clientContractComponents);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching Components for the Contract"
        })
    })
    async function getListOfComponentsWithoutFileUpload(clientContractComponents){
        let clientContractComponentArray = new Array();
        for(let clientContractComponent of clientContractComponents){
            let result =false;
            result = await componentHasFieldsWithFileUpload(clientContractComponent.component)
            if(!result){
                clientContractComponentArray.push(clientContractComponent)
            }
        }
        res.json(clientContractComponentArray);
    }
    let componentHasFieldsWithFileUpload = function(comp){
        return new Promise(function(resolve,reject){
            Component
            .findOne({_id:comp,fileUploadRequired:true})
            .then(component=>{
                 console.log('in component ');
                 if(component==null){
                     resolve(false);
                 }else{
                     resolve(true)
                 }
            })
            .catch(err=>{
                reject(err);
            })
        })
    }    

}

exports.deleteAllForAClientContract = (req,res)=>{
    ClientContractComponent.deleteMany({clientContract:req.params.clientContract})
    .then(data=>{
        res.json("Components for the given Contract deleted");
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while deleting Components for the Contract"
        })
    })
}