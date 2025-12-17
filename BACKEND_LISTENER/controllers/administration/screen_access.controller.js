const ScreenAccess = require('../../models/administration/screen_access.model');
const express = require('express');

exports.createMany=(req,res)=>{
    ScreenAccess
    .insertMany(req.body.screenAccesses)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occured while saving the screen access for the role'
        })
    })
};
exports.findForARole=(req,res)=>{
    ScreenAccess
    .find({role:req.params.role})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading screen access for the role'
        })
    })
}

exports.deleteAllForARole=(req,res)=>{
    ScreenAccess
    .deleteMany({role:req.params.role})
    .then(data=>{
        res.status(200).json({
            message:'Delete Successful'
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while deleting screen access for the role'
        })
    })
}
exports.updateScreenAccessForARole=(req,res)=>{
    ScreenAccess
    .deleteMany({role:req.params.role})
    .then(data=>{
        ScreenAccess
        .insertMany(req.body.screenAccesses)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message | 'Some error occurred while updating screen access for the role'
            })
        })

     })
     .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while updating screen access for the role'
        })
    })

 

}