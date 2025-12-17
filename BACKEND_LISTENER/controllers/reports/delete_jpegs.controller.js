const fs =require('fs');
const path = require('path')
const axios = require('axios')

exports.deleteAllJpegs = (req,res)=>{
//let allJpegs = req.body.jpegsToDelete
/* allJpegs.forEach(item=>{
    console.log("Directory being searched for ",item)
    fs.readdirSync(item).forEach(file => {
       if(path.extname(file) == ".jpg"){
          console.log("About to delete JPEG file ",item + "/" + file)
          fs.unlinkSync(item+"/"+file);
       }
   });
 })
 res.json({message:"DELETE-SUCCESS"})	*/
 axios.get('http://localhost:6000/deletejpgs?caseId='+req.params.caseId+"&token=8f51ywtmahia7tgtzvfvj6blbfjles")
     .then(response=>{
//        console.log("Response from converter is ",response)
       if(response.status == '200'){
          console.log("Converted sucessfully")
          res.json({message:'SUCCESS'})
        }else{
          console.log("Error from converter")
          res.status(500).json({message:'FAILURE'})
        }
     })
     .catch(err=>{
        console.log("Error is ",err)
        res.status(500).json({message:'Error Converting'})
     })
	
	
}

