//const ComponentAccess = require('../../models/administration/component_access.model');
//const UserRole = require('../../models/administration/user_role.model')
const express = require('express');
////
const ComponentAccess = require('../../models/administration/component_access.model');
const UserSubclientAccess = require("../../models/administration/user_subclient_access.model")
const ClientContractComponent = require("../../models/administration/client_contract_component.model")
const ClientContract = require("../../models/administration/client_contract.model")
const UserRole = require('../../models/administration/user_role.model')

exports.updateComponentAccessForARole = (req,res)=>{
    console.log('in component access , roleId is ',req.params.role)
    console.log('component Accesses is  ',req.body.componentAccesses)
    ComponentAccess
    .deleteMany({role:req.params.role})
    .then(data=>{
        console.log('delete successful');
        ComponentAccess
        .insertMany(req.body.componentAccesses)
        .then(data=>{
            console.log('insert successful');
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message: err.message | 'Some error occurred while updaging Component Access for a role'
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message | 'Some error occurred while updaging Component Access for a role'
        })
    })    

}
exports.readAllForARole = (req,res)=>{
    console.log("In read all for a role");
    ComponentAccess
    .find({role:req.params.role})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err.message | 'Some error occurred while reading component access for a role'
        })
    })
}

/*exports.readAllForAUser = (req,res)=>{
    console.log("In read all for a user");
    let componentsArray = new Array()
    UserRole
    .find({user:req.user.user_id},{role:1,_id:0})
    .then(data=>{
        console.log("data is ",data);
        ComponentAccess
        .find({$or:data})
//	.distinct("component",{$or:data})
        .populate({path:'component'})
        .then(componentData=>{
            componentData.forEach(item=>{
		let found = false
		for(let i=0; i < componentsArray.length;i++){
		   let 	componentItem = componentsArray[i]
		   if(item.component == componentItem.component){
		       found = true;
		       break;
		   }
		}
		if(!found){
	           componentsArray.push(item)
		}
	    })
            console.log("component data is ",componentData);
            res.json(componentsArray)
        })
        .catch(err=>{
		console.log(err)
            res.status(500).json({
                message: err.message | 'Some error occured while retrieving components for the user'
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message | 'Some error occured while retrieving components for the user'
        })
    })

}
exports.readAllForAUser = (req,res)=>{
    console.log("In read all for a user");
    let componentsArray = new Array()	
    UserRole
    .find({user:req.user.user_id},{role:1,_id:0})
    .then(data=>{
        console.log("data is ",data);
        ComponentAccess
        .find({$or:data})
//	.distinct("component",{$or:data}) 
        .populate({path:'component'})
        .then(componentData=>{
            componentData.forEach(item=>{
		let found = false    
		for(let i=0; i < componentsArray.length;i++){
		   let 	componentItem = componentsArray[i]
		   if(item.component.toString() == componentItem.component.toString()){
		       found = true;
		       break;	   
		   }	
		}
		if(!found){
	           componentsArray.push(item)		
		}    
	    })		
            console.log("component data is ",componentData);
            res.json(componentsArray)
        })
        .catch(err=>{
            res.status(500).json({
                message: err.message | 'Some error occured while retrieving components for the user'
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err.message | 'Some error occured while retrieving components for the user'
        })        
    })
/*   let getUniqueComponents = function(){
     return new Promise((resolve,reject)=>{
        resolve(true)	     
     })	   
   }	*/
    	
//}
//12July2025/////
/*exports.readAllForAUser = async (req, res) => {
  try {
    console.log("In read all for a user");

    // Fetch user roles for the current user
    const roles = await UserRole.find({ user: req.user.user_id }, { role: 1, _id: 0 });
    console.log("Roles found:", roles);

    // If no roles are found, return an appropriate message
    if (roles.length === 0) {
      return res.status(404).json({ message: "No roles found for this user" });
    }

    // Create role conditions for querying ComponentAccess
    const roleConditions = roles.map(roleData => ({ role: roleData.role }));
    console.log("Role conditions for component access:", roleConditions);

    // Fetch component access based on user roles and populate component data
    const componentAccessData = await ComponentAccess.find({ $or: roleConditions })
      .populate({ path: 'component' });
    console.log("Component access data found:", componentAccessData);

    // If no component access data is found, return an empty array
    if (componentAccessData.length === 0) {
      return res.json([]);
    }

    // Create an array to store unique components
    let componentsArray = [];

    // Filter unique components
    componentAccessData.forEach(item => {
      // Check if the component exists and has an _id
      if (item.component && item.component._id) {
        // Check if the component is already in the array
        const found = componentsArray.some(componentItem => 
          componentItem.component && componentItem.component._id &&
          item.component._id.toString() === componentItem.component._id.toString()
        );

        // If the component is not found, add it to the array
        if (!found) {
          componentsArray.push(item);
        }
      }
    });

    console.log("Unique component data is:", componentsArray);
    // Return the unique components as a response
    res.json(componentsArray);
    
  } catch (err) {
    // Log the full error for debugging
    console.error("Error occurred while retrieving components for the user:", err);

    // Return the error message, with better fallback handling
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving components for the user'
    });
  }
};*/
//////////////////New13Aug2025///////////////
// controllers/componentAccessController.js

exports.readAllForAUser = async (req, res) => {
  try {
    console.log("In read all for a user");

    // 1. Get role IDs for the user
    const roleIds = await UserRole.find(
      { user: req.user.user_id },
      { role: 1, _id: 0 }
    ).lean();

    if (!roleIds.length) {
      return res.status(404).json({ message: "No roles found for this user" });
    }

    const roleIdList = roleIds.map(r => r.role);

    // 2. Aggregate to get unique component access with component object
    const componentAccessData = await ComponentAccess.aggregate([
      { $match: { role: { $in: roleIdList } } },
      {
        $lookup: {
          from: "components",
          localField: "component",
          foreignField: "_id",
          as: "component"
        }
      },
      { $unwind: "$component" }, // flatten the component array
      {
        $group: {
          _id: "$component._id",
          component: { $first: "$component" } // keep same structure as populate
        }
      }
    ]);

    res.json(componentAccessData);

  } catch (err) {
    console.error("Error occurred while retrieving components for the user:", err);
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving components for the user'
    });
  }
};

/////////12Dec2024///////
exports.readAllClientComponentsForAUser = async (req, res) => {
   try {
       const subclientData = await UserSubclientAccess.find({ user: req.user.user_id })
       const clients = subclientData.map(item => item.client)
       const clientContractData = await ClientContract.find({ client: { $in: clients } })
       const clientContracts = clientContractData.map(item => item._id)
       const contractComponentData = await ClientContractComponent.find({ clientcontract: { $in: clientContracts } })
       const components = contractComponentData.map(item => contractComponentData.component)

	   console.log("subclientData",subclientData)
	   console.log("clientContractData",clientContractData)
	   console.log("components",components)
       const componentsArray = []

       components.forEach(item => {
           if (!componentsArray.includes(item)) {
               componentsArray.push(item)
           }
       })

       return res.json(componentsArray)

   } catch (err) {
       console.log(err)
       return res.status(500).json({ error: err.message })
   }
}
