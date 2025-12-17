const ExcelUpload = require('../../models/uploads/excel_upload.model');
const express = require('express');
const events = require('events');

exports.create=(req,res)=>{
    if(!req.body.client){
        res.status(400).json({message:"Client Cannot be empty"});
    }
    if(!req.body.subclient){
        res.status(400).json({message:"Subclient Cannot be empty"});
    }
    if(req.body.numberOfCases ===0){
        res.status(400).json({message:"Number of cases cannot be 0"});
    }
    ExcelUpload
    .find()
    .sort({referenceNumber:-1})
    .limit(1)
    .then(excelUploads=>{
        console.log('found the batches');
        let referenceNumber = 0;
        if(excelUploads.length > 0){
          for(let excelUploadDoc of excelUploads){
            referenceNumber = excelUploadDoc.referenceNumber;
          }
        }
        referenceNumber = referenceNumber + 1;
        createExcelUpload(referenceNumber);
    })
    .catch(err=>{
        console.log('found error ',err);
        res.status(500).send({
            message:err.message || "Some error occurred while creating the batch"
        })
    })
    function createExcelUpload(referenceNumber){
        console.log('components to check ',req.body.componentsToCheck);
        excelUpload = new ExcelUpload({
            referenceNumber :referenceNumber,
            client :req.body.client,
            subclient : req.body.subclient,
            package:req.body.package,
            profile:req.body.profile,
            componentsToCheck:(req.body.componentsToCheck ? req.body.componentsToCheck:null),
            uploadDate: new Date()
        })
        excelUpload
        .save(excelUpload)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occurred while creating the batch"
            })            
        })    
    }
};

exports.findAllExcelUploadsForAListOfClientsAndSubclients = (req,res)=>{
    let clientSubclientArray = JSON.parse(req.params.clientSubclientIds);
    let excelUploadArray = new Array();
    let em = new events.EventEmitter();
    let em1 = new events.EventEmitter();

    em.on('LOOP-COMPLETE',function(data){
        console.log('loop completed and now  the function will be executed');
        res.json(excelUploadArray);
    })

    for(let i=0; i < clientSubclientArray.length; i++){
        console.log('in the loop');
        let clientsubclient = clientSubclientArray[i];
        ExcelUpload
        .find({client:clientsubclient.client,subclient:clientsubclient.subclient})
        .populate({path:'client'})
        .populate({path:'subclient'})
        .then(excelUploads=>{
            excelUploads.forEach(data=>{
                excelUploadArray.push(data);
            })
            if(i==clientSubclientArray.length -1){
                em.emit('LOOP-COMPLETE');
            }            
        })
        .catch(err=>{
            console.log('error in fetching');
            res.status(500).send({
                message:err.message || "Some error occurred while reading exceluploads for the subclient"
            })            
        })              

    }
    
};
exports.findForOneReferenceNumber = (req,res)=>{
    ExcelUpload.findOne({referenceNumber:req.params.referenceNumber})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while reading the excel upload data"
        })
    })
}
exports.findAllReferenceNumbersWhereStatusIsOpen = (req,res)=>{
    ExcelUpload.find({status:"OPEN"})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while reading the excel upload data"
        })
    })
}