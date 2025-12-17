const Ticket = require('../../models/support/ticket.model');
const moment = require('moment');
const express = require('express');

exports.create = (req,res)=>{
    console.log("Client is ",req.body.client)
    console.log("Subclient is ",req.body.subclient)
    console.log("subject is ",req.body.subject)
    console.log("message is ",req.body.message)
    if(!req.body.subject){
        res.status(400).json({messate:"Subject Required"})
    }
    if(!req.body.message){
        res.status(400).json({message:"Message Required"})
    }
    if(!req.body.client){
        res.status(400).json({message:"Client Required"})
    }
    if(!req.body.client){
        res.status(400).json({message:"Subclient Required"})
    }
    let getTicketNumber = function(){
        return new Promise((resolve,reject)=>{
            let currDate = moment();
            let findString =`${currDate.format('YY')}${currDate.format('MM')}${currDate.format('DD')}.*`; 
            Ticket
            .find({ticketNumber:{"$regex":findString,"$options":"i"}})
            .then(tickets=>{
                let ticketNumber = currDate.format('YY')+currDate.format('MM')+currDate.format('DD') + ("0001").slice(-4)
                console.log("tickets length is ",tickets.length)
                if(tickets.length == 0){
                    ticketNumber = currDate.format('YY')+currDate.format('MM')+currDate.format('DD') + ("0001").slice(-4)
                }else{
                    ticketNumber = currDate.format('YY')+currDate.format('MM')+currDate.format('DD') + ("0000"+ (tickets.length + 1)).slice(-4)
                }
                resolve(ticketNumber)
            })            
            .catch(err=>{
                reject()
            })

        })
    }
    createTicket()
    async function createTicket(){
        let ticketNumber = await getTicketNumber()
        let ticket = new Ticket({
            ticketNumber:ticketNumber,
            client:req.body.client,
            subclient:req.body.subclient,
            subject:req.body.subject,
            message:req.body.message,
            raisedOn:new Date(),
            raisedBy:req.user.user_id,
            status:"OPEN",
            modifiedBy:req.user.user_id,
        })        
        ticket
        .save(ticket)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message:err.mesage || "Some Error Occurred while creating the ticket"
            })
        })
    }

}
exports.update = (req,res)=>{
    if(!req.params._id){
        res.status(400).json({message:"Ticket Number Required"})
    }
    if(!req.body.subject){
        res.status(400).json({messate:"Subject Required"})
    }
    if(!req.body.mesage){
        res.status(400).json({message:"Message Required"})
    }
    if(!req.body.client){
        res.status(400).json({message:"Client Required"})
    }
    if(!req.body.client){
        res.status(400).json({message:"Subclient Required"})
    }          
    Ticket
    .findOneAndUpdate({_id:req.params._id},{
        message:req.body.mesage,
        subject:req.body.subject,
        modifiedBy:req.user.user_id,
        modifiedOn:new Date()
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some Error Occurred while updaging the ticket"
        })
    })
}
exports.delete = (req,res)=>{
    Ticket
    .fionOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some Error Occurred while deleting the ticket"
        })
    })
}
exports.read = (req,res)=>{
    Ticket
    .findOne({_id:req.params._id})
    .populate({path:'client'})
    .populate({path:'subclient'})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some Error Occurred while reading the ticket"
        })
    })
}

exports.readAllOfStatus = (req,res)=>{
    Ticket
    .find({status:req.params.status})
    .populate({path:'client'})
    .populate({path:'subclient'})
    .populate({path:'raisedBy'})
    .sort({raisedOn:-1})    
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.mesage ||"Some Error Occurred while reading the tickets"
        })
    })
}

exports.readAllTicketsRaisedByMe = (req,res)=>{
    Ticket
    .find({raisedBy:req.user.user_id})
    .populate({path:'client'})
    .populate({path:'subclient'})
    .populate({path:'raisedBy'})
    .sort({raisedOn:-1})
    .then(data=>{
        res.json(data)
    })   
    .catch(err=>{
        res.status(500).json({
            message:err.mesage ||"Some Error Occurred while reading the tickets"
        })
    })
}
