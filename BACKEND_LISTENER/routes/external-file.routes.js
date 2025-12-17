const express = require('express');
const router = express.Router();
const externalFile = require('../controllers/support/external-api.controller')

 
 router.post('/downloadApiReport',externalFile.downloadApiReport)
 router.post('/generateOtp',externalFile.telecomGenerateOtp)
 router.get("/download/:data",externalFile.download);

module.exports = router;
