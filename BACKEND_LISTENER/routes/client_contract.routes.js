const clientContract = require('../controllers/administration/client_contract.controller');
const express = require('express');
const router = express.Router();

router.post("/",clientContract.create);
router.post("/uploadfile",clientContract.uploadFile);
router.get("/client/:clientId",clientContract.findAllForAClient);
//router.get("/downloadfile/:_id/:fileName",clientContract.downloadFile);
router.get("/downloadfile/",clientContract.downloadFile);
router.get("/:_id",clientContract.findOne);
router.get("/readfilenames/:_id",clientContract.readFileNames);
router.put("/:_id",clientContract.update);
router.delete("/:_id",clientContract.delete);
router.get("/client/:client_id/relevantdate/:date",clientContract.getRelevantContractDetails);
router.get("/client/:client_id/scopeofwork/",clientContract.getscopeofworkDetails);

module.exports = router;
