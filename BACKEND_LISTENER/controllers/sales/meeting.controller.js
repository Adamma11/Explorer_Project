const Meeting = require('../../models/sales/meeting.model');
const Voucher = require('../../models/sales/voucher.model')
const express = require('express');

exports.create=(req,res)=>{
    console.log('in followup create ',req.body)
    if(!req.body.meetingDate){
        res.status(400).json({message:'Date cannot be empty'})
    }else if(!req.body.venue){
        res.status(400).json({message:'Venue cannot be empty'})
    }else if(!req.body.verifactsAttendees){
        res.status(400).json({message:'Verifacts Attendees cannot be empty'})
    }else if(!req.body.clientAttendees){
        res.status(400).json({message:'Client Attendees cannot be empty'})
    }else{
        const meeting = new Meeting({
            leadOrProspect:req.body.leadOrProspect,
            meetingDate:req.body.meetingDate,
            venue:req.body.venue,
            verifactsAttendees:req.body.verifactsAttendees,
            clientAttendees:req.body.clientAttendees,
            preparedBy:req.body.preparedBy,
            bde:req.user.user_id,
            discussionPoints:req.body.discussionPoints,
            modifiedBy:req.user.user_id
        })
        meeting
        .save(meeting)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message : err.message | 'Some error occurred while saving Meeting'
            })
        })
    }
};
exports.readAllForALeadOrProspect = (req,res)=>{
    Meeting
    .find({leadOrProspect:req.params.leadOrProspect})
    .then(data=>{
        res.json(data);
    })   
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading Meetings for a Lead / Prospect'
        })
    })
};
exports.update = (req,res)=>{
    Meeting
    .findOneAndUpdate({_id:req.params._id},{
        leadOrProspect:req.body.leadOrProspect,
        meetingDate:req.body.meetingDate,
        venue:req.body.venue,
        verifactsAttendees:req.body.verifactsAttendees,
        clientAttendees:req.body.clientAttendees,
        preparedBy:req.body.preparedBy,
        discussionPoints:req.body.discussionPoints,
        modifiedBy:req.user.user_id
    })
    .then(data=>{
        res.json(data);
    })   
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while Saving Meeting for a Lead / Prospect'
        })
    })
};
exports.delete = (req,res)=>{
    Meeting
    .findOneAndDelete({_id:req.params._id})
    .then(data=>{
        res.json(data);
    })   
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while deleting Meeting for a Lead / Prospect'
        })
    })
};
exports.read = (req,res)=>{
    Meeting
    .findOne({_id:req.params._id})
    .populate({path:'leadOrProspect'})
    .then(data=>{
        res.json(data);
    })   
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading Meeting for a Lead / Prospect'
        })
    })
};
exports.updateStatus = (req,res)=>{
    Meeting
    .findOneAndUpdate({_id:req.params._id},{status:req.body.status,rejectionComments:req.body.rejectionComments})
    .then(data=>{
        Voucher
        .findOneAndUpdate({meeting:req.params._id},{status:req.body.status,rejectionComments:req.body.rejectionComments})
        .then(voucherData=>{
            res.json(data)        
        })
        .catch(err=>{
            res.status(500).json({
                message : err.message | "Some error occurred while updating the Voucher Status"
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while updating the meeting Status'
        })
    })
}
exports.readPendingApprovalForBde = (req,res)=>{
    console.log("about to fetch meeting list for bde")
    Meeting
    .find({$or:[{bde:req.user.user_id,status:'PENDING-APPROVAL-FROM-MANAGER'},{bde:req.user.user_id,status:'PENDING-APPROVAL-FROM-ACCOUNTS'}]})
    .populate({path:'leadOrProspect'})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message:err.message | 'Some error occured while reading meetings for the bde'
        })
    })
}

exports.readPendingApprovalForApprover = (req,res)=>{
    console.log("about to fetch meeting list for bde")
    Meeting
    .find({status:'PENDING-APPROVAL-FROM-MANAGER'})
    .populate({path:'leadOrProspect'})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message:err.message | 'Some error occured while reading meetings for the bde'
        })
    })
}