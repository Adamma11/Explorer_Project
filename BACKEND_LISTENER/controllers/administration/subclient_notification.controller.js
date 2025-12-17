const SubclientNotification = require('../../models/administration/subclient_notification.model.js');
const express = require('express');


//Create and Save Company
exports.insertMany = (req,res)=>{
    SubclientNotification
    .insertMany(req.body.subclientNotifications)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while saving Subclient Notifications"
        });
    });
   
};


//Retrieve all Branches
exports.findAllForASubclient = (req,res)=>{
    SubclientNotification.find({subclient:req.params.subclient})
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred while retrieving Subclient Notifications"});
    })    
};

exports.deleteAllForASubclient = (req,res)=>{
    SubclientNotification.deleteMany({subclient:req.params.subclient})
    .then(data=>{
        res.send({message:`Subclient Notification deleted successfully`});
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting Subclient Notifications"});
    })
};

