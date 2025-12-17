const ClientHoliday = require('../../models/administration/client_holiday.model');
const express = require('express');

//Create and Save Component
exports.createMany = (req,res)=>{
        ClientHoliday.insertMany(req.body.clientHolidays)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Component Fields"
            });
        });

    };
   
    //Retrieve all Fields
    exports.findAll = (req,res)=>{
        ClientHoliday.find()
        .then(clientHolidays=>{
            res.send(clientHolidays);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Client Holidays"});
        })    
    };
    
    // find  all fields for a component
    exports.findAllHolidaysForAnYear = (req,res)=>{
        let year = req.params.year;
        let startMonth = '01';
        let startDate ='01';
    
        let endMonth = '12';
        let endDate ='31';
    
        
        ClientHoliday.find({date:{$gte: year + '-' + startMonth + '-' +startDate,$lte:year + '-' + endMonth + '-' + endDate}})
        .then(clientHolidays=>{
            res.send(clientHolidays);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Client Holidays"});
        })    
    };
    
    exports.deleteForAnYear = (req,res)=>{
        let year = req.params.year;
        let startMonth = '01';
        let startDate ='01';
    
        let endMonth = '12';
        let endDate ='31';        
        ClientHoliday.deleteMany({date:{$gte: year + '-' + startMonth + '-' +startDate,$lte:year + '-' + endMonth + '-' + endDate}})
        .then(clientHolidays=>{
            res.send({message:`Client Holidays deleted from Component successfully`});
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while deleting Client Holidays"});
        })
    };