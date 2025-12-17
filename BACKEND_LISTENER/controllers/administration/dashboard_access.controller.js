const DashboardAccess = require('../../models/administration/dashboard_access.model')
const UserRole = require('../../models/administration/user_role.model')
const express = require('express');

exports.createMany = (req,res)=>{
    DashboardAccess
    .insertMany(req.body.dashboardAccesses)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json({
            message:err || 'Some error occurred while creating dashboard accesses'
        })
    })
}

exports.readAllForARole = (req,res)=>{
    DashboardAccess
    .find({role:req.params.role})
    .populate({path:'Dashboard'})	
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        message:err || 'Some error occurred while reading dashboard accesses'
    })
}

exports.deleteAllForARole = (req,res)=>{
    DashboardAccess
    .deleteMany({role:req.params.role})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        message:err || 'Some error occurred while reading dashboard accesses'
    })
}
exports.readAllForTheUser = (req,res)=>{
 
   let getRolesForTheUser = function(){
        return new Promise((resolve,reject)=>{
            UserRole
            .find({user:req.user.user_id},{_id:0,role:1})
            .then(data=>{
                console.log("roles are ",data);
                resolve(data);
            })
            .catch(err=>{
		console.log("Error in gettitng roles",err)    
                reject()
            })
        })
    }

    let getDashboardsForRoles = function(roles){
        return new Promise((resolve,reject)=>{
            console.log("About to get dashboards for roles",roles)		
            DashboardAccess
            .find({$or:roles})
            .populate({path:'dashboard'})
            .then(data=>{
                let uniqueDashboards = new Array()
                data.forEach(item=>{
                    let found = false;
                    for(let i = 0; i < uniqueDashboards.length;i++){
                        if(item.dashboard.toString() == uniqueDashboards[i].dashboard.toString()){
                            found = true
                            break
                        }
                    }
                    if(!found){
                        uniqueDashboards.push(item)
                    }
                })
                resolve(uniqueDashboards);
            })
            .catch(err=>{
		console.log("Error in getting dashboards for roles",err)    
                reject()
            })
        })
    }
    prepareData()
    async function prepareData(){
       try{	    
          let rolesForTheUser = await getRolesForTheUser()	   
	  console.log("got roles and now trying get all dashboards for these roles")     
          let dashboardsForRoles = await getDashboardsForRoles(rolesForTheUser)
	  res.json(dashboardsForRoles)     
       }catch(err){
	  console.log("Error ",err)     
          res.status(500).json({
             message:"Error Reading Dashboards for the user"		  
	  })
       }	       
      	    
    }	    

}
