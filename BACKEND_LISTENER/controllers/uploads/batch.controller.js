const Batch = require('../../models/uploads/batch.model');
const UserSubclientAccess = require('../../models/administration/user_subclient_access.model')
const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');
const mime = require('mime');
const express = require('express');
const { findOneAndDelete } = require('../../models/uploads/batch.model');
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
    Batch
    .find()
    .sort({batchId:-1})
    .limit(1)
    .then(batches=>{
        console.log('found the batches');
        let batchId = 0;
        if(batches.length > 0){
          for(let batchDoc of batches){
            batchId = batchDoc.batchId;
          }
        }
        console.log('no batch found and hence the batch id is');
        batchId = batchId + 1;
        console.log(batchId)
        console.log('got the last batch id and now creating the batch');
        createBatch(batchId);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the batch"
        })
    })
    function createBatch(batchId){
        console.log('about to create the batch');
        batch = new Batch({
            batchId :batchId,
            client :req.body.client,
            subclient : req.body.subclient,
            batchDescription:req.body.batchDescription,
            numberOfCases : req.body.numberOfCases,
            uploadDate: new Date()
        })
        batch
        .save(batch)
        .then(data=>{
            let batchZipFile = req.files.batchZipFile;
            batchZipFile.mv(`/REPO_STORAGE/batch_uploads/${batchId}/uploaded/`+batchZipFile.name,function(err){
                if(err){
                    res.status(500).send(err)
                }
                const zipFileName = `/REPO_STORAGE/batch_uploads/`+ batchId + `/uploaded/` +batchZipFile.name
                const outPathName = `/REPO_STORAGE/batch_uploads/` +batchId + `/`
                console.log('zip file name ',zipFileName);
                console.log('outpath name is ',outPathName);
                fs.createReadStream(zipFileName)
                  .pipe(unzipper.Extract({path:outPathName}))

                res.json(data);

            })
        })
        .catch(err=>{
            console.log("error creating the batch ",err.message);
            res.status(500).send({
                message:err.message || "Some error occurred while creating the batch"
            })
        })
    }    

}
exports.findAllBatchesForAListOfClientsAndSubclients = (req,res)=>{
    let clientSubclientArray = JSON.parse(req.params.clientSubclientIds);
    let batchArray = new Array();
    let em = new events.EventEmitter();
    let em1 = new events.EventEmitter();

    em.on('LOOP-COMPLETE',function(data){
        console.log('loop completed and now  the function will be executed');
        res.json(batchArray);
    })

    for(let i=0; i < clientSubclientArray.length; i++){
        console.log('in the loop');
        let clientsubclient = clientSubclientArray[i];
        Batch
        .find({client:clientsubclient.client,subclient:clientsubclient.subclient})
        .populate({path:'client'})
        .populate({path:'subclient'})
        .then(batches=>{
            batches.forEach(data=>{
                batchArray.push(data);
            })
            if(i==clientSubclientArray.length -1){
                em.emit('LOOP-COMPLETE');
            }            
        })
        .catch(err=>{
            console.log('error in fetching');
            res.status(500).send({
                message:err.message || "Some error occurred while reading batches for the subclient"
            })            
        })              

    }
   
};
/*exports.findAllBatchesForAListOfClientsAndSubclientsNew = (req,res)=>{
    console.log(req.params.clientSubclientIds);
    let clientSubclientArray = JSON.parse(req.params.clientSubclientIds);
    async function getListOfBatches(){
        try{
            let batchList = new Array();
            batchList = await prepareListOfBatches();
            res.json(batchList);                
        }
        catch(err){
            res.status(500).json({
                message: err.message | 'Some error occurred while getting the batches'
            })
        }
    }
    let prepareListOfBatches = function(){
        return new Promise(function(resolve,reject){
            let batchArray = new Array();
            let query = {$or:clientSubclientArray}
            console.log(`query is `,query);
            Batch
            .find(query)
            .populate({path:'client'})
            .populate({path:'subclient'})
            .then(batches=>{
                batches.forEach(data=>{
//                    console.log("adding to batch array");
                    batchArray.push(data);
                })
                resolve(batchArray)
            })
            .catch(err=>{
                reject();
            })              
        })
    }
    getListOfBatches();
    
};*/
exports.findAllBatchesForAListOfClientsAndSubclients = (req,res)=>{
    UserSubclientAccess.find({user:req.user.user_id},{subclient:1,_id:0})
    .then(subclientData=>{
       console.log("Subclient data is ",subclientData)
       Batch
       .find({$or:subclientData})
       .populate({path:'client'})
       .populate({path:'subclient'})
       .then(batchData=>{
          res.json(batchData)
       })
       .catch(err=>{
          console.log("Error reading batches",err)
          res.status(500).json({
             message:"Error Reading batches"
          })
       })
    })
    .catch(err=>{
       res.status(500).json({
               message:"Error Readig User Subclient Access"
       })
    })

};



exports.findAllBatchesForAClientAndSubclient = (req,res)=>{
    Batch
    .find({client:req.params.clientId,subclient:req.params.subclientId})
    .sort({batchId:-1})
    .then(batches=>{
        res.json(batches);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while reading batches for the subclient"
        })            
    })
};

exports.findABatch = (req,res)=>{
    Batch
    .findOne({_id:req.params.batch})
    .then(batch=>{
        res.json(batch);
    })
    .catch(err=>{
        res.status(500).json({
            message : err.message || "Some error occurred while reading batch"
        })
    })
};

exports.downloadBatchFile = (req,res)=>{
    console.log('in downloadBatchFile');
    fs.readdir(`/REPO_STORAGE/batch_uploads/${req.params.batchId}`,function(err,files){
        if(err){
            res.status(500).json({
                message:"Error reading file"
            })
        }
        files.forEach(file=>{
            
            console.log('constructed file path ',file);
            let fileName = path.basename(file);
            console.log('got file name ',fileName);
            let  mimeType = mime.lookup(file);
            console.log('mime type is ',mimeType);
            res.setHeader('Content-disposition','attachment;filename='+fileName);
            res.setHeader('Content-type',mimeType);
        /*    res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = file.Name
            }; */
            res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
            console.log('header set about to download  file');
            res.download(`/REPO_STORAGE/batch_uploads/${req.params.batchId}/${file}`,fileName);
        })
    })

}
exports.readBatchFiles=(req,res)=>{
    Batch
    .findOne({_id:req.params._id})
    .then(data=>{
        let files =new Array();
        fs.readdirSync(`/REPO_STORAGE/batch_uploads/${data.batchId}`,{withFileTypes:true})
        .forEach(file=>{
            if(file.isFile()){
                files.push(file.name);
            }
        })
        res.json(files);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading files for the batch'
        })
    })

}
exports.deleteCaseFile = (req,res)=>{
    Batch
    .findOne({_id:req.params._id})
    .then(data=>{
        let path = `/REPO_STORAGE/batch_uploads/${data.batchId}/${req.params.fileName}`
        try{
            fs.unlinkSync(path);
            res.json({message:'Deletion Successful'});
        }
        catch(err){
            res.status(500).json({
                message:err.message | 'Some error occured while deleteing the file'
            })
        }
    })
}

