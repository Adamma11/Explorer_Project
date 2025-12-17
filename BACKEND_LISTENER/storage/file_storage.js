const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
//        cb(null,`./BACKEND-LISTENER/batchuploads/`)
        console.log('file to save',file);
    },
    filenname:(req,file,cb)=>{

    }
});
 const upload = multer({storage:storage})
 module.exports = upload;
 
 