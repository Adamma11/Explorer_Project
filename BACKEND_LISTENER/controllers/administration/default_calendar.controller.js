const DefaultCalendar = require('../../models/administration/default_calendar.model');
const express = require('express');
const moment = require("moment")
exports.create = (req,res)=>{
    if(!req.body.date){
        res.status(400).json({message:"Date Cannot be empty"});        
    } 
    if(!req.body.description){
        res.status(400).json({message:"Description Cannot be empty"});        
    }     
    const defaultCalendar = new DefaultCalendar({
        date:req.body.date,
        description:req.body.description,
        modifiedBy:req.user.user_id,
    })
    defaultCalendar
    .save(defaultCalendar)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occured while creating the calendar"
        })
    })

}

exports.update = (req,res)=>{
    if(!req.params.date){
        res.status(400).json({message:"Date Cannot be empty"});        
    } 
    if(!req.body.description){
        res.status(400).json({message:"Description Cannot be empty"});        
    }     
    DefaultCalendar
    .findOneAndUpdate({_id:req.params._id},{description:req.body.description,modifiedBy:req.user.user_id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occured while updating the calendar"
        })
    })

}
exports.update = (req,res)=>{
    if(!req.body.date){
        res.status(400).json({message:"Date Cannot be empty"});        
    } 
    if(!req.body.description){
        res.status(400).json({message:"Description Cannot be empty"});        
    }     
    DefaultCalendar
    .findOneAndUpdate({_id:req.params._id},{description:req.body.description,modifiedBy:req.user.user_id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occured while updating the calendar"
        })
    })

}
exports.readAllForYear = (req,res)=>{
    if(!req.params.year){
        res.status(400).json({message:"Year Cannot be empty"});        
    } 
    DefaultCalendar
    .find({date:{$gte:new Date(req.params.year + "-01-01"),$lte:new Date(req.params.year+"-12-31")}})
    .sort({date:1})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occured while reading the calendar for an year"
        })
    })

}
exports.delete = (req,res)=>{
  
    DefaultCalendar
    .findOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occured while deleting the calendar"
        })
    })

}
exports.readUpcomingHoliday = (req, res) => {
    try {
        const currentDate = new Date(); // Get the current date
        const currentYear = currentDate.getFullYear(); // Get the current year
        const providedId = req.body._id;
	const currDateString = moment(currentDate).format("YYYY/MM/DD")
        console.log('Current Year:', currentYear);
        console.log('Current Date:', currentDate);
        console.log('Provided ID:', providedId);

        DefaultCalendar
            .find({
                date: { $gte: currDateString }
            }).sort({date: 1}).limit(1)

            .then(data => {
                console.log('Found Holiday:', data[0]);
                res.json(data[0]);
            })
            .catch(err => {
                console.error('Error:', err);
                res.status(500).json({
                    message: err.message || "Some error occurred while finding the upcoming holiday."
                });
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: "Internal server error."
        });
    }
};
	

exports.getUpcomingHoliday= async(req,res)=>{
    try {
       const startOfToday = new Date();
	    console.log("Start Date:",startOfToday)
       let data= await DefaultCalendar.find({date:{$gte: startOfToday}}).sort({date:1})
       res.json(data)
    } catch (error) {
     console.log(`Error in getting holid list ${error}`) 
     res.json({message:error})  
    }
}
