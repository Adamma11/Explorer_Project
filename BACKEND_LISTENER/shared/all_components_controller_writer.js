const fs = require('fs');
const express = require('express');
const componentModel = require('../models/administration/component.model');

exports.writeController = (req,res)=>{
    console.log('in all components controller');
    async function writeControllerLines(){
        const requiredControllerLines = await getRequiredControllerLines();
        const readAllForACaseLines = await getReadAllForACaseLines();
        const insufficienciesForScrutinyLines = await getInsufficienciesForScrutinyLines();
        const allControllerLines = requiredControllerLines + readAllForACaseLines;
        console.log("all controller lines is ",allControllerLines);
        fs.writeFile(`/BACKEND-LISTENER/controllers/data_entry/all_components_new.controller.js`,allControllerLines,function(err){
            if(err){
                console.log('error is ',err);
                res.status(500).json({message:err.message || 'Some error occurred while saving Component details'});        
            }    
        })
    }
    
    let getRequiredControllerLines = function(){
        return new Promise(function(resolve,reject){
            let requiredLines = '';        
            componentModel
            .find()
            .then(data=>{
                data.forEach(item=>{
                    requiredLines = requiredLines + `const ${item.name} = require('../models/data_entry/${item.name}.model');\n`
                })
                console.log('required lines ',requiredLines);
                resolve(requiredLines);            
            })
            .catch(err=>{
                console.log("error in all_components_controller_writer ",err);
                reject();
            })            
        })
    }

    let getReadAllForACaseLines = function(){
        return new Promise(function(resolve,reject){
/*            let readAllForACaseLines = 'exports.readAllForACase = (req,res)=>{\n';
            componentModel
            .find()
            .then(data=>{
                data.forEach(item=>{
                    readAllForACaseLines = await writingReadAllForACaseLines(item.name)
                })
                readAllForACaseLines = readAllForACaseLines + `}\n`;
                resolve(readAllForACaseLines)
            })
            .catch(err=>{
                reject()
            })*/
        })
      
    }
    let writingReadAllForACaseLines = function(componentName){
        return new Promise(function(resolve,reject){
            let readAllForACaseLines = ''
            readAllForACaseLines = readAllForACaseLines + ` ${componentName}.find({case:req.params.case_id})\n`;
            readAllForACaseLines = readAllForACaseLines + `     .then(data=>{\n`;
            readAllForACaseLines = readAllForACaseLines + `         res.json(data)\n`;
            readAllForACaseLines = readAllForACaseLines + `     })\n`;              
            readAllForACaseLines = readAllForACaseLines + `     .catch(err=>{\n`;
            readAllForACaseLines = readAllForACaseLines + `         res.status(500).json({\n`;              
            readAllForACaseLines = readAllForACaseLines + `             message:err.message | "Some error occurred  while reading components for a case"`;
            readAllForACaseLines = readAllForACaseLines + `         })\n`;
            readAllForACaseLines = readAllForACaseLines + `     })\n`;                
            resolve(readAllForACaseLines)
        })
    }

    let getInsufficienciesForScrutinyLines = function(){
        return new Promise(function(resolve,reject){
            let insufficienciesForScrutinyLines = '';        
            componentModel
            .find()
            .then(data=>{
                insufficienciesForScrutinyLines = insufficienciesForScrutinyLines + `exports.findAllInsufficiencesForScrutiny=(req,res)=>{\n`;
                insufficienciesForScrutinyLines = insufficienciesForScrutinyLines + `exports.findAllInsufficiencesForScrutiny=(req,res)=>{\n`;
                insufficienciesForScrutinyLines = insufficienciesForScrutinyLines + `async function getInsufficiencyList(){\n`;
                insufficienciesForScrutinyLines = insufficienciesForScrutinyLines + `   try{\n`;
                data.forEach(item=>{
                    insufficienciesForScrutinyLines = insufficienciesForScrutinyLines + `       let ${item.name}InsufficienciesList = await get${item.name}InsufficienciesList();\n`;
                })
                console.log('required lines ',requiredLines);
                resolve(requiredLines);            
            })
            .catch(err=>{
                console.log("error in all_components_controller_writer ",err);
                reject();
            })            
        })
    }

    writeControllerLines();
    
}
