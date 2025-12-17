const Screen = require('../../models/administration/screen.model')
const express = require('express');

exports.create=(req,res)=>{
    const screen = new Screen({
        name:req.body.name,
        modifiedBy:req.user.user_id
    })
    screen
    .save(screen)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while saving the Screen'
        })
    })

}
exports.update=(req,res)=>{
    Screen
    .findOneAndUpdate({_id:req.params._id},{
        name:req.body.name,
        modifiedBy:req.user.user_id
    })
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while updataing Screen'
        })
    })
};

exports.readAll=(req,res)=>{
    Screen
    .find()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading Screens'
        })
    })

}