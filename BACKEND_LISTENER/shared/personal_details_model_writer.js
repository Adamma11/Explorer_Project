const fs = require('fs');
const express = require('express');
const personalDetails = require('../models/administration/personal_details.model');


exports.writeModel = (req,res)=>{
    const requiredModelLines = getRequiredModelLines();
    const schemaLines = getSchemaLines();
    const allModelLines = requiredModelLines + schemaLines;
    fs.writeFile(`/BACKEND-LISTENER/models/data_entry/personal_details_data.model.js`,allModelLines,function(err){
        if(err){
            console.log('error is ',err);
            res.status(500).json({message:err.message || 'Some error occurred while saving Personal Details Data'});        
        }
        const requiredControllerLines = getRequiredControllerLines();
        const createLines = getCreateLines();
        const findAllForACaseLines = getFindAllForACaseLines();
        const updateLines  = getUpdateLines();
        const readLines = getReadLines();
        const updateDataEntryStatusLines = getUpdateDataEntryStatusLines();
        const updateInputqcStatusLines = getUpdateInputqcStatusLines();
        const allControllerLines = requiredControllerLines + createLines + findAllForACaseLines + updateLines + readLines + updateDataEntryStatusLines + updateInputqcStatusLines;
        fs.writeFile(`/BACKEND-LISTENER/controllers/data_entry/personal_details_data.controller.js`,allControllerLines,function(err){
            if(err){
                console.log('error is',err);
                res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});        
            }
        })
        const requiredRouterLines = getRequiredRouterLines();
        console.log('required lines  for router got about to get router lines');
        const routeLines  = getRouteLines();
        const allRouterLines = requiredRouterLines + routeLines;
        fs.writeFile(`/BACKEND-LISTENER/routes/personal_details_data.routes.js`,allRouterLines,function(err){
            if(err){
                console.log('error is',err);
                res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});                        
            }
        })
        fs.readFile(`/BACKEND-LISTENER/routes/all_app_routes.routes.js`,'utf8',function(err,data){
            if(err){
                console.log('error is',err);
                res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});                                        
            }
            if(data.search(`api/personal_details_data`)==-1){
                var result = data.replace('}',`    app.use('/api/personaldetailsdata',authenticateToken,require('../routes/personal_details_data.routes'));\n`+'}')
                fs.writeFile(`/BACKEND-LISTENER/routes/all_app_routes.routes.js`,result,function(err){
                    if(err){
                        console.log('error is',err);
                        res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});                                            
                    }
                })
            }
        })
    })    
    
    function getRequiredModelLines(){
        let reqLine = "const mongoose = require('mongoose')\n";
        return reqLine;
    }
    function getSchemaLines(){
        let personalDetailsFields = req.body.personalDetailsFields;
        let schemaLines = `const PersonalDetailsDataSchema = mongoose.Schema({\n`;
        schemaLines = schemaLines + `case:{type:mongoose.Schema.Types.ObjectId,ref:'Case',required:true},\n`;
        for(let personalDetailsField of personalDetailsFields){
            schemaLines = schemaLines + `${personalDetailsField.name}:`;
            schemaLines = schemaLines + getFieldType(personalDetailsField.type)

        }
        schemaLines = schemaLines + `status:{type:String},\n`;
        schemaLines = schemaLines + `dataEntryComments:{type:String},\n`;
        schemaLines = schemaLines + `dataEntryCompletionDate:{type:Date},\n`;
        schemaLines = schemaLines + `inputqcComments:{type:String},\n`;     
        schemaLines = schemaLines + `inputqcCompletionDate:{type:Date},\n`;           
        schemaLines = schemaLines + `modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},\n`;
        schemaLines = schemaLines + `modifiedOn:{type:Date,default:Date.now}\n`
        schemaLines = schemaLines + `})\n`;
        schemaLines = schemaLines + `module.exports = mongoose.model('PersonalDetailsData',PersonalDetailsDataSchema);`
        return schemaLines;
    }

    function getFieldType(fieldType){
        if(fieldType.toLowerCase() == 'text' ||
        fieldType.toLowerCase() == 'textarea' ||
        fieldType.toLowerCase() == 'select' ||
        fieldType.toLowerCase() == 'email' ||
        fieldType.toLowerCase() == 'telephone' ||
        fieldType.toLowerCase() == 'url' ||
        fieldType.toLowerCase() == 'ac-uni' ||
        fieldType.toLowerCase() == 'ac-com' ||
        fieldType.toLowerCase() == 'ac-pin' 
        ){
         return `{type:String},\n`;
         }
        if(fieldType.toLowerCase() == 'number'){
            return `{type:Number},\n`;
        }
        if(fieldType.toLowerCase() == 'checkbox'){
            return `{type:Boolean},\n`;
        }      
        if(fieldType.toLowerCase() == 'date' ||
        fieldType.toLowerCase() == 'time' ){
            return `{type:Date},\n`;
        }                 

    }
    function getRequiredControllerLines(){
        let reqLine = `const PersonalDetailsData = require('../../models/data_entry/personal_details_data.model')\n`;       
        reqLine = reqLine + `const express = require('express');\n\n`;
        return reqLine;
    }
    function getCreateLines(){
        let personalDetailsFields = req.body.personalDetailsFields;

        let createLines = `exports.create=(req,res)=>{\n`;
        createLines = createLines + `   if(!req.body.case){\n`;
        createLines = createLines + `       res.status(400).json({message:"Case required"})\n`;
        createLines = createLines + `   }\n`;

        for(let personalDetailsField of personalDetailsFields){
            if(personalDetailsField.mandatory){
                createLines = createLines + `   if(!req.body.${personalDetailsField.name}){\n`;
                createLines = createLines + `       res.status(400).json({message:"${personalDetailsField.label} required"})\n`;
                createLines = createLines + `   }\n`;
            }
            
        }        
        createLines = createLines + `   if(!req.body.status){\n`;
        createLines = createLines + `       res.status(400).json({message:'Status required'})\n`;
        createLines = createLines + `   }\n`;
        createLines = createLines + `   const personalDetailsData = new PersonalDetailsData({\n`
        createLines = createLines + `   case:req.body.case,\n`
        for(let  personalDetailsField of personalDetailsFields){
            createLines = createLines + `       ${personalDetailsField.name}:req.body.${personalDetailsField.name},\n`
        }
        createLines = createLines + `       modifiedBy:req.user.user_id,\n`
        createLines = createLines + `       status:req.body.dataEntryStatus,\n`
        createLines = createLines + `   });\n`;
        createLines = createLines + `       if(req.body.status == 'DE-COMPLETED'){\n`;
        createLines = createLines + `           personalDetailsData.dataEntryCompletionDate = new Date()\n`
        createLines = createLines + `       }else{\n`;
        createLines = createLines + `           personalDetailsData.insufficiencyComments = req.body.insufficiencyComments\n`;
        createLines = createLines + `       }\n`

        createLines = createLines + `   personalDetailsData\n`;
        createLines = createLines + `   .save(personalDetailsData)\n`;
        createLines = createLines + `   .then(data=>{\n`;
        createLines = createLines + `       res.json(data)\n`;
        createLines = createLines + `   })\n`
        createLines = createLines + `   .catch(err=>{\n`;
        createLines = createLines + `       res.status(500).json({\n`;
        createLines = createLines + `          message:err.message || 'Some error while saving Personal Details Data'\n`;
        createLines = createLines + `       })\n`;
        createLines = createLines + `   })\n`;
        createLines = createLines +`};\n`;
        return createLines;

//        createLines = createLines + `       const obj = new ${req.body.name}({`;
        
    }
    function getFindAllForACaseLines(){
        let findAllForACaseLines = `exports.findAllForACase=(req,res)=>{\n\n`;       
        findAllForACaseLines = findAllForACaseLines + ` PersonalDetailsData\n`;
        findAllForACaseLines = findAllForACaseLines + ` .find({case:req.params.case})\n`;
        findAllForACaseLines = findAllForACaseLines + ` .then(data=>{\n`;
        findAllForACaseLines = findAllForACaseLines + `     res.json(data)\n`;
        findAllForACaseLines = findAllForACaseLines + ` })\n`;
        findAllForACaseLines = findAllForACaseLines + ` .catch(err=>{\n`;
        findAllForACaseLines = findAllForACaseLines + `       res.status(500).json({\n`;
        findAllForACaseLines = findAllForACaseLines + `          message:err.message || 'Some error while retrieving Personal Details Data for cases'\n`;
        findAllForACaseLines = findAllForACaseLines + `       })\n`;        
        findAllForACaseLines = findAllForACaseLines + `   })\n`;
        findAllForACaseLines = findAllForACaseLines +`};\n`;        

        return findAllForACaseLines;
    }
    function getUpdateLines(){
        let personalDetailsFields = req.body.personalDetailsFields;

        let updateLines = `exports.update=(req,res)=>{\n`;
        updateLines = updateLines + `   if(!req.body.case){\n`;
        updateLines = updateLines + `       res.status(400).json({message:"Case required"})\n`;
        updateLines = updateLines + `   }\n`;

        for(let personalDetailsField of personalDetailsFields){
            if(personalDetailsField.mandatory){
                updateLines = updateLines + `   if(!req.body.${personalDetailsField.name}){\n`;
                updateLines = updateLines + `       res.status(400).json({message:"${personalDetailsField.label} required"})\n`;
                updateLines = updateLines + `   }\n`;
            }
            
        }    
        updateLines = updateLines + `   if(!req.body.status){\n`;
        updateLines = updateLines + `       res.status(400).json({message:'Status required'})\n`;
        updateLines = updateLines + `   }\n`;            
        updateLines = updateLines + `   PersonalDetailsData.findOneAndUpdate({_id:req.params._id},{\n`
        updateLines = updateLines + `   case:req.body.case,\n`
        for(let  personalDetailsField of personalDetailsFields){
            updateLines = updateLines + `       ${personalDetailsField.name}:req.body.${personalDetailsField.name},\n`
        }    
        updateLines = updateLines + `       status:req.body.status,\n`;        
        updateLines = updateLines + `       insufficiencyComments:req.body.insufficiencyComments,\n`;        
        updateLines = updateLines + `       dataEntryCompletionDate:req.body.status == 'DE-COMPLETED' ? new Date() : null,\n`;        
        updateLines = updateLines + `       modifiedBy:req.user.user_id,\n`; 
        updateLines = updateLines + `   })\n`;
        updateLines = updateLines + `   .then(data=>{\n`;
        updateLines = updateLines + `       res.json(data)\n`;
        updateLines = updateLines + `   })\n`
        updateLines = updateLines + `   .catch(err=>{\n`;
        updateLines = updateLines + `       res.status(500).json({\n`;
        updateLines = updateLines + `          message:err.message || 'Some error while saving Personal Details Data'\n`;
        updateLines = updateLines + `       })\n`;
        updateLines = updateLines + `   })\n`;
        updateLines = updateLines +`};\n`;
        return updateLines;

//        createLines = createLines + `       const obj = new ${req.body.name}({`;
        
    }
    function getReadLines(){
        let readLines = `exports.findOne=(req,res)=>{\n`;
        readLines = readLines + `   PersonalDetailsData.findOne({case:req.params.case_id})\n`;
        readLines = readLines + `   .then(data=>{\n`;
        readLines = readLines + `       res.json(data)\n`;
        readLines = readLines + `   })\n`;
        readLines = readLines + `   .catch(err=>{\n`;
        readLines = readLines + `       res.status(500).json({\n`;
        readLines = readLines + `           message: err.message || 'Error occurred while reading personal details'\n`;
        readLines = readLines + `       })\n`;
        readLines = readLines + `   })\n`;
        readLines = readLines + `};\n`;

        return readLines;
    }
    function getUpdateDataEntryStatusLines(){
        let updateDataEntryStatusLines = `exports.updateDataEntryStatus=(req,res)=>{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + ` if(req.body.status=='DE-COMPLETED'){\n`;        
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   PersonalDetailsData.findOneAndUpdate({_id:req.params.case_id},{\n`
        updateDataEntryStatusLines = updateDataEntryStatusLines + `       status:req.body.status,\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `       dataEntryCompletionDate:new Date(),\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `       modifiedBy:req.user.user_id,\n` 
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   .then(data=>{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `       res.json(data)\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   })\n`
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   .catch(err=>{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `       res.status(500).json({\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `          message:err.message || 'Some error while saving Personal Details Data'\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `       })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + ` }else{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   PersonalDetailsData.findOneAndUpdate({_id:req.params.case_id},{\n`                
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   status:req.body.status,\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   insfficiencyComments:req.body.insufficiencyComments\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `   .then(data=>{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `        res.json(data)\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `    })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `    .catch(err=>{\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         res.status(500).json({\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `             message:err.message | "Error occurred while updating status during data entry"\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `         })\n`;
        updateDataEntryStatusLines = updateDataEntryStatusLines + `    })\n`;   
        updateDataEntryStatusLines = updateDataEntryStatusLines + ` }\n`                   
        updateDataEntryStatusLines = updateDataEntryStatusLines +`};\n`;
        return updateDataEntryStatusLines;
        
    }
    
    function getUpdateInputqcStatusLines(){
        let updateInputqcStatusLines = `exports.updateInputqcStatus=(req,res)=>{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + ` if(req.body.status=='INPUTQC-ACCEPTED'){\n`;        
        updateInputqcStatusLines = updateInputqcStatusLines + `   PersonalDetailsData.findOneAndUpdate({case:req.params.case_id},{\n`
        updateInputqcStatusLines = updateInputqcStatusLines + `       status:req.body.status,\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `       inputqcCompletionDate:new Date(),\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `       modifiedBy:req.user.user_id,\n` 
        updateInputqcStatusLines = updateInputqcStatusLines + `   })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `   .then(data=>{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `       res.json(data)\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `   })\n`
        updateInputqcStatusLines = updateInputqcStatusLines + `   .catch(err=>{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `       res.status(500).json({\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `          message:err.message || 'Some error while saving Personal Details Data'\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `       })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `   })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + ` }else{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `   PersonalDetailsData.findOneAndUpdate({case:req.params.case_id},{\n`                
        updateInputqcStatusLines = updateInputqcStatusLines + `       status:req.body.status,\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `       inputqcComments:req.body.inputqcComments,\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `       modifiedBy:req.user.user_id\n`         
        updateInputqcStatusLines = updateInputqcStatusLines + `   })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `   .then(data=>{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `        res.json(data)\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `    })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `    .catch(err=>{\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         res.status(500).json({\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `             message:err.message | "Error occurred while updating status during data entry"\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `         })\n`;
        updateInputqcStatusLines = updateInputqcStatusLines + `    })\n`;   
        updateInputqcStatusLines = updateInputqcStatusLines + ` }\n`                   
        updateInputqcStatusLines = updateInputqcStatusLines +`};\n`;
        return updateInputqcStatusLines;
    }    
    function getRequiredRouterLines(){
        let requiredRouterLines = `const personalDetailsData = require('../controllers/data_entry/personal_details_data.controller');\n`
        requiredRouterLines = requiredRouterLines + `const express = require('express');\n`;
        requiredRouterLines = requiredRouterLines + `const router = express.Router();\n\n`;
        return requiredRouterLines;
    }
    function getRouteLines(){
        let routeLines = `router.post("/",personalDetailsData.create);\n`;
        routeLines = routeLines + `router.get("/",personalDetailsData.findAllForACase);\n`;
        routeLines = routeLines + `router.get("/:case_id",personalDetailsData.findOne);\n`;
        routeLines = routeLines + `router.put("/:_id",personalDetailsData.update);\n`;
        routeLines = routeLines + `router.put("/updatedataentrystatus/:case_id",personalDetailsData.updateDataEntryStatus);\n`;
        routeLines = routeLines + `router.put("/updateinputqcstatus/:case_id",personalDetailsData.updateInputqcStatus);\n`;        
        routeLines = routeLines + `module.exports = router;\n`;
        return routeLines;
    }

}
