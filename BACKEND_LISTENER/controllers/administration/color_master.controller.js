const ColorMaster = require('../../models/administration/color_master.model');
const express = require('express');

exports.createMany=(req,res)=>{
    console.log('color masters ',req.body.colorMasters);
    ColorMaster
    .insertMany(req.body.colorMasters)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occured while saving Color Master'
        })
    })
};
exports.findAll=(req,res)=>{
    ColorMaster
    .find()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading color master for the role'
        })
    })
}
exports.updateColorMaster=(req,res)=>{
    ColorMaster
    .deleteMany({})
    .then(data=>{
        ColorMaster
        .insertMany(req.body.colorMasters)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            console.log("Error while inserting ",err);
            res.status(500).json({
                message:err.message | 'Some error occurred while updating color master for the role'
            })
        })

     })
     .catch(err=>{
         console.log("Error while deleting ",err);
        res.status(500).json({
            message:err.message | 'Some error occurred while updating color master for the role'
        })
    })

}
/////////kynode/////////////
exports.findOne=(req,res)=>{
    ColorMaster
    .findOne({_id: req.params.grade})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading color master for the role'
        })
    })
}


