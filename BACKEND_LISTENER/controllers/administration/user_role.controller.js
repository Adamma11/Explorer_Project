const UserRole = require('../../models/administration/user_role.model');
const express = require('express');

//Create and Save Role
exports.create = (req,res)=>{
    // Validate Request
        if(!req.body.userId){
            res.status(400).json({message:"User Id Cannot be empty"});        
        } 
        if(!req.body.roleId){
            res.status(400).json({message:"Role Id Cannot be empty"});        
        }         
        const userRole = new UserRole({
            userId:req.body.userId,
            roleId:req.body.roleId,
            modifiedBy:req.body.modifiedBy 
        });
        userRole
        .save(role)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || "Some error occurred while saving Role Details"
            });
        });

    };
    
exports.createMany = (req,res)=>{
//    console.log('user roles ',req.body.userRoles);
    UserRole.insertMany(req.body.userRoles)
    .then(userRoles=>{
        res.json(userRoles)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || "Error occurred while inserting user roles"
        })
    })
    
};    
    //Retrieve all Roles
    exports.findAll = (req,res)=>{
        UserRole.find()
        .then(userRoles=>{
            res.send(userRoles);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving User Roles"});
        })    
    };
    
    //Find a single Role with branch name
    
    exports.findOne = (req,res)=>{
        UserRole.findOne({userId:req.params.userId,roleId:req.params.roleId})
        .then(userRole=>{
            res.send(userRole);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving Role"});
        })
    };

    exports.findAllForARole =(req,res)=>{
        UserRole.find({role:req.params.roleId})
        .then(userRoles=>{
            res.json(userRoles);
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving users for a role"});
        })
    }

    exports.findAllForAUser = (req,res)=>{
        UserRole.find({user:req.params.userId})
        .then(userRoles=>{
            res.json(userRoles);
        })
        .catch(err=>{
            res.status(500).send({message:err.message || 'Some error occurred while retrieving roles for a user'});
        })
    }
    
    // Update a branch by the branch name in the request
    
    exports.update = (req,res)=>{
        if(!req.body.userId){
            console.log("User Id is empty");
            res.status(400).json({message:"User Id Cannot be empty"});        
            return;
        }     
        if(!req.body.roleId){
            console.log("Role Id is empty");
            res.status(400).json({message:"Role Id Cannot be empty"});        
            return;
        }     



        UserRole.findOneAndUpdate({userId:req.params.userId,roleId:req.params.roleId},
        {
           modifiedBy:req.body.modifiedBy
            })
        .then(userRole=>{
            res.send(userRole);
        }).catch(err=>{
            res.status(500).send({message :err.message || "Some error occurred while updating User Role"});
        })

    };
    
exports.delete = (req,res)=>{
    UserRole.deleteOne({userId:req.params.userId,roleId:req.params.roleId})
    .then(userRole=>{
        res.send({message:`User Role ${req.params.userId} - ${req.params.roleId} deleted successfully`});
    }).catch(err=>{
        res.status(500).send({message :err.message || "Some error occurred while deleting User Role"});
    })
};

exports.deleteAllUsersForARole =(req,res)=>{
    UserRole.deleteMany({role:req.params.roleId})
    .then(userRole=>{
        res.json({message:"Users for the role deleted"})
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some Error Occurred while deleting users for a role"
        })
    })
};
exports.deleteAllRolesForAUser = (req,res)=>{
    console.log('about to delete roles for a user');
    UserRole.deleteMany({user:req.params.userId})
    .then(userRoles=>{
        console.log('Deleted the roles for the user  successfully');
        res.json({message:"Roles for the user deleted"});
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message ||"Some Error Occurred while deleting roles for a user"
        })
    })
};
exports.findAllUsersWithDetailsForARole =(req,res)=>{
        UserRole.find({role:req.params.role_id})
	.populate({path:'user'})
        .then(userRoles=>{
            res.json(userRoles);
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Some error occurred while retrieving users for a role"});
        })
}

exports.findAllRolesForCurrentUser = (req,res)=>{
     UserRole.find({user:req.user.user_id})
     .then(userRoles=>{
	res.json(userRoles)     
     })
     .catch(err=>{
	res.status(500).send({
           message:"Error while fetching roles for current user"		
	})     
     })	
}
exports.findAllRolesForAUserToDisplay = (req,res)=>{ 
        UserRole.find({user:req.params.userId})
        .populate('role')
        .then(userRoles=>{
            res.json(userRoles);
    
        })
        .catch(err=>{
            res.status(500).send({message:err.message || 'Some error occurred while retrieving roles for a user'});
        })
    }



