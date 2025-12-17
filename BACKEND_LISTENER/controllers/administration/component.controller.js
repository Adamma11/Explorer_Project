const Component = require('../../models/administration/component.model');
const ComponentField = require('../../models/administration/component_field.model');
const VendorComponent = require('../../models/administration/vendor_component.model');
const ClientContractComponent = require('../../models/administration/client_contract_component.model');
const fs = require('fs');
const express = require('express');
const modelWriter = require('../../shared/model_writer');
const allComponentsControllerWriter = require('../../shared/all_components_controller_writer');
//const mongoose = require('mongoose');
//const { stringify } = require('querystring');

// Create and Save User
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ message: "Name cannot be empty" });
    }
    const component = new Component({
        name: req.body.name,
        displayName: req.body.displayName,
        fileUploadRequired: req.body.fileUploadRequired,
        allowCopyingFrom: req.body.allowCopyingFrom == 'null' ? null : req.body.allowCopyingFrom,
        type: req.body.type,
        modifiedBy: req.body.modifiedBy
    });

    component
        .save(component)
        .then(data => {
            console.log("about to call createComponentFields");
            //        createComponentFields();
            modelWriter.writeModel(req, res, data._id);
            allComponentsControllerWriter.writeController(req, res);
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err.message || 'Some error occurred while saving Component details' });
        });

    function createComponentFields() {
        ComponentField
            .insertMany(req.body.componentFields)
            .then(data => {
                console.log("successfully inserted ", req.body.componentFields);
                res.json(data)
            })
            .catch(err => {
                console.log('error that you are seeing is ', err);
                res.status(500).json({ message: err.message || 'Some error occurred while saving component details' });
            })
    }

};

/*
// Create and Save User
exports.create = (req,res)=>{
    if(!req.body.name){
        res.status(400).json({message:"Name cannot be empty"});
    }
    const component = new Component({
        name:req.body.name,
        displayName:req.body.displayName,
        fileUploadRequired:req.body.fileUploadRequired,
        allowCopyingFrom:req.body.allowCopyingFrom == 'null'? null:req.body.allowCopyingFrom,
        type:req.body.type,
        modifiedBy:req.body.modifiedBy
    });

    component
       .save(component)
       .then(data=>{
        console.log("about to call createComponentFields");   
//        createComponentFields();
           modelWriter.writeModel(req,res,data._id); 
           allComponentsControllerWriter.writeController(req,res); 
           res.json(data);
       })
       .catch(err=>{
           console.log(err);
           res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});
       });

       function createComponentFields(){
        ComponentField
        .insertMany(req.body.componentFields)
        .then(data=>{
            console.log("successfully inserted ",req.body.componentFields);
             res.json(data)                
        })
        .catch(err=>{
            console.log('error that you are seeing is ',err);
             res.status(500).json({message:err.message || 'Some error occurred while saving component details'});
        })
    }       

};*/

// find all users

exports.findAll = (req,res)=>{
    Component.find()
    .then(components=>{
          res.json(components);
    })
    .catch(err=>{
        res.status(500).json({message:err.message || 'Some error while retrieving components'});
    });

     

};

// find a user
exports.findOne = (req,res)=>{
    console.log(req.params._id);
    Component.findOne({_id:req.params._id})
    .then(component=>{
        getFields(component);
//        res.json(component);
    })
    .catch(err=>{
        res.status(500).json({message:err.message || "Some error while retrieving Component"});
    });
    async function getFields(comp){
        let newArray = new Array();
        let component = comp.toJSON();
        let componentFieldList = await getFieldList(component._id);
        component["componentFields"] = componentFieldList;
        res.json(component);
    }
    let getFieldList = function (componentId){
        return new Promise(function(resolve,reject){
            ComponentField
            .find({component:componentId})
            //.sort({fieldNumber:1})
            .then(data=>{
                resolve(data);
            })
            .catch(err=>{
                reject();
            })

        })
    } 

};

// update user using the user id
exports.update = (req,res)=>{
    console.log(req.body.allowCopyingFrom);
    Component.findOneAndUpdate({_id:req.params._id},
        {
            name:req.body.name,
            displayName:req.body.displayName,
            fileUploadRequired:req.body.fileUploadRequired,
//            allowCopyingFrom:req.body.allowCopyingFrom,
            allowCopyingFrom:req.body.allowCopyingFrom == 'null'? null:req.body.allowCopyingFrom,
            type:req.body.type,
            modifiedBy:req.user.modifiedBy,
        })
       .then(component=>{
           console.log('component updated now trying to delete fields for this component');
//           res.json(component);
            console.log('component for which to delete ',req.params._id)
            ComponentField.deleteMany({component:req.params._id})
            .then(deletedData=>{
                let compFields = req.body.componentFields;
                compFields.forEach(item=>{
                    item.component = req.params._id;
                })
                ComponentField.insertMany(compFields)                
                .then(data=>{
                    modelWriter.writeModel(req,res); 
                    console.log('wrote the model');
                    console.log('about to write the all comonents controller');
                    allComponentsControllerWriter.writeController(req,res);
                    res.json(component);
                })
                .catch(err=>{
                    console.log('Error Inserting component fields ', err.message);
                    res.status(500).json({message:err.message || 'Some error while updating Component Details'});                                   
                }) 
            })
            .catch(err=>{
                console.log("error updating ",err.message);
                res.status(500).json({message:err.message || 'Some error while updating Component Details'});               
            })
       }) 
       .catch(err=>{
           res.status(500).json({message:err.message || 'Some error while updating Component'});
       });
};    
exports.delete = (req,res)=>{
    VendorComponent.findOne({component:req.params._id})
    .then(vendorComponent =>{
        if(vendorComponent != null){
            res.status(405).send({message:"A vendor is assigned this component"})
        }else{
            checkInClientContractComponent();
        }
    })
    .catch(err=>{
        res.status(500).send({message:err.message || 'Some error occurred while deleting Component'})
    })

    function checkInClientContractComponent(){
        ClientContractComponent.findOne({component:req.params._id})
        .then(clientContractComponent=>{
            if(clientContractComponent != null){
                res.status(405).send({message:"Component is present in a client contract"})
            }else{
                deleteComponent()
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || 'Some error occurred while deleting Component'})
        })
    }

    function deleteComponent(){
        Component.deleteOne({_id:req.params._id})
        .then(component=>{
            res.json({message:`Component deleted`});
        })
        .catch(err=>{
            res.status(500).json({message:"Some error while deleting the Component"});
        });
    }


};
exports.findComponentOfCdeType = (req,res)=>{
   Component
   .find({typeForCde:req.params.typeForCde})
   .then(data=>{
     res.json(data)
   })
   .catch(err=>{

   })
}
exports.findOneForCde = (req,res)=>{
//    console.log(req.params._id);
    console.log("In find one component for cde.........")
    let caseId = req.caseId
    if(caseId != null){
       Component.findOne({_id:req.params._id})
       .then(component=>{
           console.log("About to get fields for the component")
           getFields(component);
//           res.json(component);
       })
       .catch(err=>{
           res.status(500).json({message:err.message || "Some error while retrieving Component"});
       });
    }else{
       res.status(403).json({
               message : "Forbidden"
       })
    }
    async function getFields(comp){
        let newArray = new Array();
        let component = comp.toJSON();
        let componentFieldList = await getFieldList(component._id);
        component["componentFields"] = componentFieldList;
        console.log("Got fields and sending it back")
        console.log("Component with fields are .......",component)
        res.json(component);
    }
    let getFieldList = function (componentId){
        return new Promise(function(resolve,reject){
            ComponentField
            .find({component:componentId,$or:[{lhsRhs:'BOTH'},{lhsRhs:'LHS'}]})
            .sort({fieldNumber:1})
            .then(data=>{
                resolve(data);
            })
            .catch(err=>{
                reject();
            })

        })
    }

};



