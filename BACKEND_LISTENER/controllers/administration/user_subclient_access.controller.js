const UserSubclientAccess = require('../../models/administration/user_subclient_access.model');
const User = require('../../models/administration/user.model');
const express = require('express');

exports.createMany = (req,res)=>{
    console.log('about to create user subclient access');
    UserSubclientAccess.insertMany(req.body.userSubclients)
    .then(userSubclientAccesses=>{
        res.json(userSubclientAccesses);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error while saving User Subclient Access"
        })
    })
};
exports.findAllSubclientsForAUser = (req,res)=>{
    console.log('subclients required for ',req.params.userId);
    UserSubclientAccess.find({user:req.params.userId})
    .populate({path:'client',select:'name'})
    .populate({path:'subclient',select:'name'})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log('error in user subclient access ',err);
        res.status(500).json({
            message:err.message || "Some error occurred while fetching User Subclient Access"
        })
    })
}
/*exports.findAllSubclientsForAUserUsingEmailId = (req,res)=>{
    console.log('subclients required for ',req.params.userEmailId);
    User.findOne({userId:req.params.userEmailId})
    .then(user=>{
        console.log(user);
        findAllSubclients(user._id);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching User Subclient Access"
        })
    })
    function findAllSubclients(_id){
        UserSubclientAccess.find({user:_id})
        .populate({path:'client'})
        .populate({path:'subclient',select:'name'})        
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            console.log('error in user subclient access ',err);
            res.status(500).json({
                message:err.message || "Some error occurred while fetching User Subclient Access"
            })
        })
    }
}*/
exports.findAllSubclientsForAUserUsingEmailId = (req,res)=>{
    console.log('subclients required for ',req.params.userEmailId);
    User.findOne({userId:req.params.userEmailId})
    .then(user=>{
        console.log(user);
        findAllSubclients(user._id);
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Some error occurred while fetching User Subclient Access"
        })
    })
    function findAllSubclients(_id){
        UserSubclientAccess.find({user:_id})
        .populate({path:'client'})
        .populate({path:'subclient',select:'name'})
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            console.log('error in user subclient access ',err);
            res.status(500).json({
                message:err.message || "Some error occurred while fetching User Subclient Access"
            })
        })
    }
}

exports.deleteAllSubclientsForAUser = (req,res)=>{
    UserSubclientAccess.deleteMany({user:req.params.userId})
    .then(data=>{
        res.json({message:"Subclients Assigned to User Deleted"});
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message ||"Some error occurred while deleting Subclients assigned to User"
        })
    })
}
exports.findAllSubclientsForMe = (req,res)=>{
    console.log("About to find subclients for me")	
    UserSubclientAccess
    .find({user:req.user.user_id})
    .populate({path:'subclient',populate:{path:'client'}})
    .then(data=>{
	console.log('found sublclients for me',data)    
        res.json(data)
    })
    .catch(err=>{
	console.log('Error finding subclients for me')    
        res.status(500).json({
            message:'An error occurred while fetching subclients for me'
        })
    })
}
