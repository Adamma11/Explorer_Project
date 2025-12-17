const Client = require('../../models/administration/client.model')
const ClientContract = require('../../models/administration/client_contract.model')
const ClientContractComponent = require('../../models/administration/client_contract_component.model')
const Component = require('../../models/administration/component.model)

exports.getClientContractComponentDetails = (req,res)=>{

   let readComponents=function(){
       return new Promise((resolve,reject)=>{
          Component
	  .find()
	  .then(data=>{
	     resolve(data)	
	  })     
	  .catch(err=>{
             resolve(null)		  
	  })     
       })	   

   }	
  let readClientcontractComponents = function(){
      return new Promise((resolve,reject)=>{
	ClientContractComponent
	.find()      
	.lean()      
	.populate({path:'component'})
	.populate({path:'clientContract',populate:{path:'client'}})      
	.then(data=>{
           resolve(data)		
	})      
	.catch(err=>{
           reslove(null)		
	})      
      })	  

  }	
  prepareReport()
  async function prepareReport(){
    let componentList = await readComponents()
    let clientContractCompopnetList = await readClientContractComponents()	  
  }	
}

