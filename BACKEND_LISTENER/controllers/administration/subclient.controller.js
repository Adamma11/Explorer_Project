const Subclient = require('../../models/administration/subclient.model')
const UserBranchAccess = require('../../models/administration/user_branch_access.model')
const express = require('express')

exports.create = (req,res)=>{
    if(!req.body.client){
        res.status(400).json({message:'Client Id cannot be empty'})
    }
    if(!req.body.name){
        res.status(400).json({message:'Name cannot be blank'})
    }
    if(!req.body.address){
        res.status(400).json({message:'Address cannot be blank'})
    }
    if(!req.body.pinCode){
        res.status(400).json({message:'Pin cannot be blank'})
    }
    if(!req.body.city){
        res.status(400).json({message:'City cannot be blank'})
    }
    if(!req.body.state){
        res.status(400).json({message:'State cannot be blank'})
    }
    if(!req.body.country){
        res.status(400).json({message:'Country cannot be blank'})
    }
    console.log('subclient ',req.body.client);
    const subclient = new Subclient({
        client:req.body.client,
        name:req.body.name,
        branch:req.body.branch,
	cam:req.body.cam,    
        status:req.body.status,
        contactPerson:req.body.contactPerson,
        telephone:req.body.telephone,
        email:req.body.email,
        address:req.body.address,
        pinCode:req.body.pinCode,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        modifiedBy:req.body.modifiedBy        
    })

    subclient.save(subclient)
    .then(subclient=>{
        res.json(subclient)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || 'Some error occurred while saving Subclient'
        })
    })
};

exports.findAllForAClient = (req,res)=>{
    Subclient.find({client:req.params.client})
    .then(subclients=>{
        res.json(subclients)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || 'Error occurred while fetching Subclients of a Client'
        })
    })
};

exports.findOne = (req,res)=>{
    Subclient.findOne({_id:req.params._id})
    .then(subclient=>{
        res.json(subclient)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || 'Error Occurred while fetching Subclient'
        })
    })
};

exports.findAll = (req,res)=>{
    Subclient.find()
    .populate({path:'client',select:'name'})
    .then(sublcients=>{
        res.json(sublcients)
    })
    .catch(err=>{
        res.status(500).json({
            messagae:err.message || "Error Occurred while feteching all Subclients"
        })
    })
}

exports.updateOne = (req,res)=>{

    if(!req.body.client){
        res.status(400).json({message:'Client Id cannot be empty'})
    }
    if(!req.body.name){
        res.status(400).json({message:'Name cannot be blank'})
    }
    if(!req.body.address){
        res.status(400).json({message:'Address cannot be blank'})
    }
    if(!req.body.pinCode){
        res.status(400).json({message:'Pin cannot be blank'})
    }
    if(!req.body.city){
        res.status(400).json({message:'City cannot be blank'})
    }
    if(!req.body.state){
        res.status(400).json({message:'State cannot be blank'})
    }
    if(!req.body.country){
        res.status(400).json({message:'Country cannot be blank'})
    }    


    Subclient.findOneAndUpdate({_id:req.params._id},
        {
            client:req.body.client,
            name:req.body.name,
            branch:req.body.branch,
	    cam:req.body.cam,	
            status:req.body.status,
            contactPerson:req.body.contactPerson,
            telephone:req.body.telephone,
            email:req.body.email,
            address:req.body.address,
            pinCode:req.body.pinCode,
            city:req.body.city,
            state:req.body.state,
            country:req.body.country,
            modifiedBy:req.body.modifiedBy                   
        }).populate('client')
        .then(subclient=>{
            res.json(subclient)
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message || 'Error Occurred while updating Subclient'
            })
        })
};

exports.delete = (req,res)=>{
    Subclient.findOneAndUpdate({_id:req.params._id})
    .then(data=>{
        res.json({message:'Subclient deleted successfully'})
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message || 'Error occurred while deleting Subclient'
        })
    })
};
exports.findAllForBranches = (req,res)=>{
    console.log("About to get subclient for branches")	
    	
    let branchArray = new Array();
    UserBranchAccess
    .find({user:req.user.user_id},{branch:1,_id:0})
    .then(data=>{
	console.log("branch data from user branch access ",data)    
	Subclient
	.find({$or:data})    
	.populate({path:'client'}) 
	.then(subclientData=>{
           res.json(subclientData)		
	})
	.catch(err=>{
	   res.status(500).json({
              message:'Error occurred while fetching subclients for branches'		   
	   })	
	})    
    })
    .catch(err=>{
       console.log("problem in user branch access ",err)	    
       res.status(500).json({
	      
	       message:'Error occurred while reading user branch access'     
       })	    
    })
/*    branchArray = req.params.branches.split(",");
    console.log("branch array is ",branchArray);
    let newBranchArray = new Array();
    branchArray.forEach(item=>{
        let branchObj = ({
            branch:item
        })
        newBranchArray.push(branchObj);
    })
    console.log("New Branch Array is ...........",newBranchArray);
    let query = {$or:newBranchArray}
    Subclient
    .find(query)
    .populate({path:'client'})
    .then(data=>{
        console.log("Data is........",data);
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message | "Some error occurred while finding subclients for branches"
        })
    })*/

}
