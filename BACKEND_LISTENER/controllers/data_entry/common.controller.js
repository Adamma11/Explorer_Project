const fs = require('fs');
const { Types } = require('mongoose');
const path = require("path");
const User = require("../../models/administration/user.model");


exports.uploadEmailAttachments = (req, res) => {

    let componentFile = req.files.componentFile;
    componentFile.mv('/REPO_STORAGE/case_uploads/' + req.body.caseId + '/' + req.body.componentName + '/' + req.body.componentId + '/email_attachments/' + req.body.fileName + '.pdf', function (err) {
        if (err) {
            res.status(500).send({ message: "Error uploading the file" });
        }
        res.json({ message: "File uploaded" });
    });
};


exports.readProofOfWorks = (req, res) => {
    let files = new Array()
    let filePath = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + "/" + req.params.componentId + '/email_attachments'
    if (fs.existsSync(filePath)) {
        fs.readdirSync(filePath).forEach(file => {
            let indexOfDot = file.lastIndexOf(".")
            files.push(file.substring(0, indexOfDot))
        })
    }
    res.json(files)
};

exports.downloadEmailAttachments = (req, res) => {

    let file = '/REPO_STORAGE/case_uploads/' + req.params.caseId + '/' + req.params.componentName + '/' + req.params.componentId + '/email_attachments/' + req.query.fileName + '.pdf';
    res.download(file);
};
/////////////New  30Sep2024//
exports.getToAndCCMailAddresses = async (req,res)=>{
    try{
           const responseObj={to:""}
   
     
          const {componentName,componentId} = req.query;
          if(!["education","employment","currentaddress","idb"].includes(componentName)){
             return res.status(200).json(responseObj)
          }

          const checkField={"education":"institutename","employment":"organization","currentaddress":"currentaddress","idb":"name"};

          let checkModel , checkMasterModel;
          
          if(!fs.existsSync(path.join(__dirname,`../../models/data_entry/${String(componentName)?.trim()}.model.js`))){
             return res.status(404).json({message: componentName+ ' does not exist'}); 
          }
          checkModel=require(`../../models/data_entry/${String(componentName)?.trim()}.model`);
        //   checkMasterModel = require(`../../models/masters/${String(componentName)?.trim()}_master.model`);
        // checkMasterModel = require(`../../models/masters/${componentName.includes("emp")? "employment":String(componentName)?.trim()}_master.model`);
         checkMasterModel = require(`../../models/masters/${componentName.includes("emp")? "company":"university"}.model`);

           const checkModelRecord = await checkModel.findOne({_id:Types.ObjectId(componentId)},{_id:0,[checkField[componentName]]:1});
	    console.log("checkModelRecord",checkModelRecord);
           if(!checkModelRecord){
            return res.status(200).json(responseObj)
           }
           console.log("checkMasterModel",checkMasterModel);
            console.log(checkField[componentName],checkModelRecord[checkField[componentName]],{name: [checkModelRecord[checkField[componentName]]]  });
           const checkMasterData = await checkMasterModel.findOne({name: [checkModelRecord[checkField[componentName]]]  },{_id:0,email:1})
             console.log("data:",checkMasterData);
             console.log("Response:",responseObj);
           if(!checkMasterData){
            return res.status(200).json(responseObj)

           }
	    console.log("Master Check:",checkMasterData)
           responseObj.to=checkMasterData.email;

           return res.status(200).json(responseObj)

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Unexpected error occured. please, try again later."});
    }
}
