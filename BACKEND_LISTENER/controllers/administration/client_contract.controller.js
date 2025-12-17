const ClientContract = require('../../models/administration/client_contract.model');
const express = require('express');
const fs = require('fs');

exports.create = (req,res)=>{

    console.log('client ',req.body.client)
    console.log('agreement date ',req.body.agreementDate)
    console.log('effective date ',req.body.effectiveDate)
    console.log('expirty date ',req.body.expiryDate)
    if(!req.body.client){
        res.status(400).json("messaage: Client cannot be empty")
    }
    if(!req.body.agreementDate){
        res.status(400).json("messaage: Ageement Date cannot be empty");
    }    
    if(!req.body.effectiveDate){
        res.status(400).json("messaage: Effective Date cannot be empty");
    }
    if(!req.body.expiryDate){
        res.status(400).json({messaage: "Expiry Date cannot be empty"});
    }
    const clientContract = new ClientContract({
        client :req.body.client,
        agreementDate : req.body.agreementDate,
        effectiveDate : req.body.effectiveDate,
        expiryDate : req.body.expiryDate,
        retentationDate : req.body.retentationDate,
        modifiedBy :req.body.modifiedBy        
    });

    clientContract
    .save(clientContract)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Client Contract Details"
        });        
    })
};

exports.findOne = (req,res)=>{
    console.log("Client Id is ",req.body.clientId);
    ClientContract.findOne({_id:req.params._id})
    .populate({path:'client'})
    .then(clientContract=>{
        res.send(clientContract);
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Client Contract"});        
    })

}
exports.findAllForAClient = (req,res)=>{
    console.log("Client Id is ",req.body.clientId);
    ClientContract.find({client:req.params.clientId})
    .then(clientContracts=>{
        res.json(clientContracts);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching the contract details for the client"
        })
    })
};
/*exports.update = (req,res)=>{
    console.log('Client to update is ' ,req.body.penaltySlabs);
   /* if(!req.body.client){
        res.status(400).json("messaage: Client cannot be empty")
    }
    if(!req.body.agreementDate){
        res.status(400).json("messaage: Agreement Date cannot be empty");
    }    
    if(!req.body.effectiveDate){
        res.status(400).json("messaage: Effective Date cannot be empty");
    }
    if(!req.body.expiryDate){
        res.status(400).json("messaage: Expiry Date cannot be empty");
    }

    ClientContract.findOneAndUpdate({_id:req.params._id},
        {
            client:req.body.client,
            agreementDate : req.body.agreementDate,
            effectiveDate : req.body.effectiveDate,
            penaltySlabs:req.body.penaltySlabs,
            incentiveSlabs:req.body.incentiveSlabs,
            expiryDate : req.body.expiryDate,
            retentationDate : req.body.retentationDate,
            modifiedBy : req.body.modifiedBy
        })
	        .then(clientContract=>{
            res.json(clientContract);
        })
      /*  .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Client Contract Details"
            })
        })
};*/
exports.update = (req,res)=>{
    console.log('Client to update is ' ,req.params._id);
    if(!req.body.client){
        res.status(400).json("messaage: Client cannot be empty")
    }
    if(!req.body.agreementDate){
        res.status(400).json("messaage: Agreement Date cannot be empty");
    }
    if(!req.body.effectiveDate){
        res.status(400).json("messaage: Effective Date cannot be empty");
    }
    if(!req.body.expiryDate){
        res.status(400).json("messaage: Expiry Date cannot be empty");
    }

    ClientContract.findOneAndUpdate({_id:req.params._id},
        {
            client:req.body.client,
            agreementDate : req.body.agreementDate,
            effectiveDate : req.body.effectiveDate,
            penaltySlabs:req.body.penaltySlabs,
            incentiveSlabs:req.body.incentiveSlabs,
            expiryDate : req.body.expiryDate,
            retentationDate : req.body.retentationDate,
            modifiedBy : req.body.modifiedBy
        })
        /*ClientContract
        .save(ClientContract)
         .then(data=>{
             res.json(data);
         })*/
            .then(data=>{
        res.json(data);
    })

        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Client Contract Details"
            })
        })
};

exports.delete = (req,res)=>{
    ClientContract.deleteOne({_id:req.params._id})
    .then(clientContract=>{
        res.send({message:`Client Contract deleted successfully`});
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message || `Error Deleting Client Contract`
        })
    })
    
};
exports.uploadFile = (req,res)=>{
    let contractFile = req.files.contractFile;
    contractFile.mv('/REPO_STORAGE/contract_files/'+req.body._id +'/' + req.body.fileName + '.pdf',function(err){
        if(err){
            res.status(500).send({message:"Error uploading the file"});
        }
        res.json({message:"File uploaded"});
    });    
}
exports.readFileNames=(req,res)=>{
    let files = new Array()
    let filePath='/REPO_STORAGE/contract_files/' + req.params._id 
    if(fs.existsSync(filePath)){
        fs.readdirSync(filePath).forEach(file=>{
             let indexOfDot = file.lastIndexOf(".")
             files.push(file.substring(0,indexOfDot))
         })
     }
     res.json(files)
  };

  exports.downloadFile = (req,res)=>{
//      const data = fs.readFileSync(`/REPO_STORAGE/contract_files/${req.params._id}/${req.params.fileName}.pdf`);
      res.download(`/REPO_STORAGE/contract_files/${req.query._id}/${req.query.fileName}.pdf`);
/*    fs.readdir(`/REPO_STORAGE/contract_files/${req.params._id}/${req.params.fileName}`,function(err,files){
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
            res.setHeader('Content-type',mimeType);*/

        /*    res.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = file.Name
            }; */
/*            res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
            console.log('header set about to download  file');
            res.download(`/REPO_STORAGE/case_uploads/${req.params.caseId}/${file}`,fileName);
        })
    })*/

}
exports.getRelevantContractDetails = (req,res)=>{
    let reqDate = req.params.date;
    ClientContract
    .findOne({client:req.params.client_id,effectiveDate:{$lte:reqDate},expiryDate:{$gte:reqDate},retentationDate:{$gte:reqDate}})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:"Some error occurred while fetching relevant contract"
        })
    })
}
//scopeofwork
exports.getscopeofworkDetails = async (req, res) => {
  try {
    const clientData = await ClientContract.findOne({
      client: req.params.client_id,
    });
    if (fs.existsSync(`/REPO_STORAGE/contract_files/${clientData._id}`)) {
      const contractFiles = fs.readdirSync(
        `/REPO_STORAGE/contract_files/${clientData._id}`
      );
	    console.log(`/REPO_STORAGE/contract_files/${clientData._id}/${contractFiles[0]}`)
      return res.sendFile(
        `/REPO_STORAGE/contract_files/${clientData._id}/${contractFiles[0]}`
      );
    } else {
      return res.status(404).json({ error: "Could not find file" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
//scopeofwork
