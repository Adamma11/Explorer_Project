const Voucher = require('../../models/sales/voucher.model');
const express = require('express');

exports.create=(req,res)=>{
    let lastVoucherNumber = 0;
    Voucher
    .find()
    .sort({voucherNumber:-1})        
    .limit(1)
    .then(data=>{
        data.forEach(item=>{
            lastVoucherNumber = item.voucherNumber
        })
        lastVoucherNumber = lastVoucherNumber + 1;
        let voucher = new Voucher({
            meeting:req.body.meeting,
            voucherNumber:lastVoucherNumber,
            voucherAmount:req.body.voucherAmount,
            status:'SAVED',
            travelExpenses:req.body.travelExpenses,
            hotelExpenses:req.body.hotelExpenses,
            localConveyanceExpenses:req.body.localConveyanceExpenses,
            entertainmentExpenses:req.body.entertainmentExpenses,
            otherExpenses:req.body.otherExpenses,
            bde:req.user.user_id,
            modifiedBy:req.user.user_id
        })
        voucher
        .save(voucher)
        .then(savedData=>{
            res.json(savedData)
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message | 'Some error occurred while saving the voucher'
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading the voucher'
        })
    })
};

exports.update=(req,res)=>{
    Voucher
    .findOneAndUpdate({_id:req.params._id},{
        meeting:req.body.meeting,
        voucherAmount:req.body.voucherAmount,
        travelExpenses:req.body.travelExpenses,
        hotelExpenses:req.body.hotelExpenses,
        localConveyanceExpenses:req.body.localConveyanceExpenses,
        entertainmentExpenses:req.body.entertainmentExpenses,
        otherExpenses:req.body.otherExpenses,
        modifiedBy:req.user.user_id        
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while updating the voucher'
        })
    })
}
exports.readForMeeting = (req,res)=>{
    Voucher
    .findOne({meeting:req.params.meeting_id})
    .populate({path:'meeting'})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading the voucher'
        })
    })
}