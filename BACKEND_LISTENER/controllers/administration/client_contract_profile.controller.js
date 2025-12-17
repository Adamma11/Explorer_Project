const ClientContractProfile = require('../../models/administration/client_contract_profile.model');
const Component = require('../../models/administration/component.model');
const express = require('express');

exports.createMany = (req,res)=>{
    ClientContractProfile.insertMany(req.body.clientContractProfiles)
    .then(clientContractProfiles=>{
        res.json(clientContractProfiles);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error while saving Profiles"
        })
    })
};
exports.findAllForAClientContract = (req,res)=>{
    ClientContractProfile.find({clientContract:req.params.clientContract})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching Profiles"
        })
    })
}
exports.findAllWithoutFileUploadForAClientContract = (req,res)=>{
    console.log("client contract is  ",req.params.clientContract);
    ClientContractProfile.find({clientContract:req.params.clientContract})
    .then(clientContractProfiles=>{
        getListOfProfilesWithoutFileUpload(clientContractProfiles);
        console.log('here is the list');
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching Packages"
        })
    })    

    async function getListOfProfilesWithoutFileUpload(clientContractProfiles){
        let clientContractProfileArray = new Array();
        for(let clientContractProfile of clientContractProfiles){
            
            let result =false;
            for(let clientContractProfileComponent of clientContractProfile.clientContractProfileComponents){
                console.log('Checking the component ',clientContractProfileComponent.component);
                result = await componentHasFieldsWithFileUpload(clientContractProfileComponent.component)
                console.log('result is ',result);
                if(result){
                    console.log('not eligible to add to the list');
                    break;
                }else{
                    console.log('let us check further')
                }
            }
            if(!result){
                console.log('No component with File Upload and hence adding to array');
                clientContractProfileArray.push(clientContractProfile);
            }
        }
        res.json(clientContractProfileArray);
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
};


exports.deleteAllForAClientContract = (req,res)=>{
    ClientContractProfile.deleteMany({clientContract:req.params.clientContract})
    .then(data=>{
        res.json({message:"Profiles of Client Contract Deleted"});
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message ||"Some error occurred while deleting profiles for the contract"
        })
    })
}
exports.getProfileDetails = (req,res)=>{
     ClientContractProfile
     .findOne({_id:req.params._id})
     .then(data=>{
        res.json(data)
     })
     .catch(err=>{
        res.status(500).json({
              message:err.message | "Some error occurred while fetching the profile details"
        })
     })
}

exports.getProfileDetailsForCde = (req,res)=>{
   console.log("Access token in profile details for cde is ",req.caseId)
//   let returnedCaseId = authenticateCdeToken(req.query.access_token)
   let returnedCaseId = req.caseId
   console.log("Case Id being returned is ",returnedCaseId)
   if(returnedCaseId != null){
     ClientContractProfile
     .findOne({_id:req.params._id})
     .then(data=>{
        res.json(data)
     })
     .catch(err=>{
        res.status(500).json({
              message:err.message | "Some error occurred while fetching the profile details"
        })
     })
   }else{
     res.status(403).json({
             message : "Forbidden"
     })
   }
}

