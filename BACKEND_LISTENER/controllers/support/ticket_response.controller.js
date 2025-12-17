const TicketResponse = require('../../models/support/ticket_response.model');
const Ticket = require('../../models/support/ticket.model')
const moment = require('moment');
const express = require('express');

exports.create = (req,res)=>{
    let ticketResponse = new TicketResponse({
        ticket:req.body.ticketId,
        response:req.body.response,
        responseDate:new Date(),
        responseBy:req.user.user_id
    })
    ticketResponse
    .save(ticketResponse)
    .then(data=>{
        console.log("Status is ",req.body.status)
        if(req.body.status == 'CLOSED'){
            Ticket
            .findOneAndUpdate({_id:req.body.ticketId},{status:"CLOSED",closureDate:new Date(),closureBy:req.user.user_id})
            .then(ticketResponse=>{
                res.json(data)
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Error closing ticket"
                })
            })
        }else{
            res.json(data)
        }
    })
    .catch(err=>{
        res.status(500).json({
            message:err.mesage || "Some Error Occurred while creating the response"
        })
    })

}
exports.read = (req,res)=>{
    TicketResponse
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

exports.readAllForATicket = (req,res)=>{
    TicketResponse
    .find({ticket:req.params.ticketId})
    .populate({path:'responseBy'})
    .sort({raisedOn:1})    
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.mesage ||"Some Error Occurred while reading the responses"
        })
    })
}


