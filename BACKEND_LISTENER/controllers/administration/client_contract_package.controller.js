const ClientContractPackage = require('../../models/administration/client_contract_package.model');
const ClientContractComponent = require('../../models/administration/client_contract_component.model');
const Component = require('../../models/administration/component.model')
const express = require('express');

exports.createMany = (req,res)=>{
    ClientContractPackage.insertMany(req.body.clientContractPackages)
    .then(clientContractPackages=>{
        res.json(clientContractPackages);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error while saving Packages"
        })
    })
};
exports.findAllForAClientContract = (req,res)=>{
    ClientContractPackage.find({clientContract:req.params.clientContract})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching Packages"
        })
    })
}
exports.findAllWithoutFileUploadForAClientContract = (req,res)=>{
    console.log("client contract is  ",req.params.clientContract);
    ClientContractPackage.find({clientContract:req.params.clientContract})
    .then(clientContractPackages=>{
        getListOfPackagesWithoutFileUpload(clientContractPackages);
        console.log('here is the list');
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching Packages"
        })
    })    

    async function getListOfPackagesWithoutFileUpload(clientContractPackages){
        let clientContractPackageArray = new Array();
        for(let clientContractPackage of clientContractPackages){
            console.log('package name ',clientContractPackage.name);
            let result =false;
            for(let clientContractPackageComponent of clientContractPackage.clientContractPackageComponents){
                console.log('Checking the component ',clientContractPackageComponent.component);
                result = await componentHasFieldsWithFileUpload(clientContractPackageComponent.component)
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
                clientContractPackageArray.push(clientContractPackage);
            }
        }
        res.json(clientContractPackageArray);
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
    ClientContractPackage.deleteMany({clientContract:req.params.clientContract})
    .then(data=>{
        res.json({message:"Packages of Client Contract Deleted"});
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message ||"Some error occurred while deleting packages for the contract"
        })
    })
}
exports.findOne = (req,res)=>{
    ClientContractPackage
    .findOne({_id:req.params._id})
    .then(data=>{
        res.json(data)	    
    })	
    .catch(err=>{
	message: 'Error Reading Client Contract Packae'
    })	

}
exports.getPackageDetailsForCde = (req,res)=>{
   console.log("Access token in profile details for cde is ",req.caseId)
//   let returnedCaseId = authenticateCdeToken(req.query.access_token)
   let returnedCaseId = req.caseId
   console.log("Case Id being returned is ",returnedCaseId)
   if(returnedCaseId != null){
     ClientContractPackage
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

