const User= require('../../models/administration/user.model');
const UserPassword= require('../../models/administration/user_password.model');
const express = require('express');
const UserRole = require('../../models/administration/user_role.model');
const ComponentAccess = require('../../models/administration/component_access.model')
const user_passwordModel = require('../../models/administration/user_password.model');
const mongoose = require("mongoose");


// Create and Save User
exports.create = (req,res)=>{
    if(!req.body.userId){
        res.status(400).json("User Id cannot be empty");
    }
    if(!req.body.name){
        res.status(400).json("Name cannot be empty");
    }
    if(!req.body.status){
        res.status(400).json("Status cannot be empty");
    }
    if(!req.body.type){
        res.status(400).json("Type cannot be empty");
    }
    const user = new User({
        userId:req.body.userId,
        name:req.body.name,
        status:req.body.status,
        type:req.body.type,
        branch:req.body.branch,
        reportingManager:req.body.reportingManager,
        includedPinRanges:req.body.includedPinRanges,
        excludedPinRanges:req.body.excludedPinRanges,        
        modifiedBy:req.body.modifiedBy
    });

    user
       .save(user)
       .then(data=>{
           const userPassword = new UserPassword({
                user:data._id,
                password:req.body.password               
           })
           userPassword.save(userPassword)
           .then(passwordReturn=>{
            res.json(data);
           })
           .catch(err=>{
               res.status(500).json({
                   message:err.message | 'Error while creating the password'
               })
           })
       })
       .catch(err=>{
           res.status(500).json({message:err.message || 'Some error occurred while saving user details'});
       });
};

// find all users

exports.findAll = (req,res)=>{
    User.find()
    .then(users=>{
        res.json(users);
    })
    .catch(err=>{
        res.status(500).json({message:err.message || 'Some error while retrieving users'});
    });

};

// find a user
exports.findOne = (req,res)=>{
    console.log(req.params._id);
    User.findOne({_id:req.params._id})
    .then(user=>{
        res.json(user);

    })
    .catch(err=>{
        res.status(500).json({message:err.message || "Some error while retrieving user"});
    });
};

exports.findOneWithEmailId = (req,res)=>{
    User.findOne({userId:req.params.userId})
    .then(user=>{
        res.json(user);
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Some error while retrieving user"});
    })
}

// update user using the user id
exports.update = (req,res)=>{
    console.log(req.body.includedPinRanges);
    console.log(req.body.excludedPinRanges);
    User.findOneAndUpdate({_id:req.params._id},
        {
            name:req.body.userId,
            name:req.body.name,
            status:req.body.status,
            type:req.body.type,
            branch:req.body.branch,
            reportingManager:req.body.reportingManager,            
            includedPinRanges:req.body.includedPinRanges,
            excludedPinRanges:req.body.excludedPinRanges,
            modifiedBy:req.body.modifiedBy
        })
       .then(user=>{
           res.json(user);
       }) 
       .catch(err=>{
           res.status(500).json({message:err.message || 'Some error while updating User'});
       });
};    
exports.delete = (req,res)=>{
    User.deleteOne({_id:req.params._id})
        .then(user=>{
            res.json({message:`User ${req.params.userId} deleted`});
        })
        .catch(err=>{
            res.status(500).json({message:"Some error while deleting the user"});
        });
};
exports.findUserWithPinCode = (req,res)=>{
    User
    .find()
    .then(data=>{
        data.forEach(user=>{
            user.includedPinRanges.forEach(pinRange=>{
                if(req.params.pin >= pinRange.from && req.params.pin <= pinRange.to){
                    res.json(user)
                }
            })
        })
        res.json(null);
    })
    .catch(err=>{
        res.status(500).json({
            message : err.message | "Some error occurred while searching for pin for the user"
        })
    })
}

exports.findUsersForTheComponent = (req, res) => {
  ComponentAccess.find(
    { component: req.params.component_id },
    { _id: 0, role: 1 }
  )
    .then((roleData) => {
      console.log("Role data ", roleData);
      UserRole.find({ $or: roleData })
        .populate({ path: "user" })
        .then((userData) => {
          let newUserData = new Array();
          const names = [];
          userData.forEach((item) => {
            if (item.user != null && !names.includes(item.user.name)) {
              names.push(item.user.name);
              newUserData.push(item);
            }
          });
          console.log("New User Data ", newUserData);
          res.json(
            newUserData.sort((a, b) => {
              // Accessing the names from the user objects
              const nameA = a.user.name.toUpperCase(); // ignore upper and lowercase
              const nameB = b.user.name.toUpperCase(); // ignore upper and lowercase

              if (nameA < nameB) {
                return -1; // nameA comes before nameB
              }
              if (nameA > nameB) {
                return 1; // nameA comes after nameB
              }
              return 0; // names must be equal
            })
          );
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Some error occurred while fethcing user data for a component",
      });
    });
};

exports.getMyUserId = (req,res)=>{
    console.log("about to get my user details")
    console.log("Details required for ",req.user.user_id);	
    User
    .findOne({_id:req.user.user_id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:'Some Error Occurred while reading user details'
        })
    })
}
//new
exports.usersReportingToMe = (req,res)=>{
    console.log("Inside User Reporting")	
    User
    .find({reportingManager:req.user.user_id})
    .then(data=>{
    res.json(data)    
    })
    .catch(err=>{
   res.status(500).json({
      message : "Error reading users"	  
   })     
    })	     

}
////////////
exports.findUsersByRoles = async (req, res) => {
  try {
    // Step 1: Allowed role IDs
    const allowedRoleIds = [
      new mongoose.Types.ObjectId("602f8be643383ec9a7224999"),
      new mongoose.Types.ObjectId("602f8c0c43383ec9a722499b"),
    ];

    // Step 2: Find UserRoles with allowed roles and populate user
    const userRoles = await UserRole.find({ role: { $in: allowedRoleIds } }).populate("user");

    // Step 3: Filter unique users by name
    const seenNames = new Set();
    const filteredUsers = [];

    userRoles.forEach((ur) => {
      if (ur.user && !seenNames.has(ur.user.name)) {
        seenNames.add(ur.user.name);
        filteredUsers.push(ur);
      }
    });

    // Step 4: Sort by user name
    filteredUsers.sort((a, b) => a.user.name.localeCompare(b.user.name));

    res.json(filteredUsers);
  } catch (err) {
    console.error("Error in findUsersByRoles:", err);
    res.status(500).json({
      message: "An error occurred while fetching users by roles",
      error: err.message,
    });
  }
};
