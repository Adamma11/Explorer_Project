const clientContractPackage = require('../controllers/administration/client_contract_package.controller');
const express = require('express');
const router = express.Router();

router.post("/clientcontract/:clientContract",clientContractPackage.createMany);
router.get("/clientcontract/:clientContract",clientContractPackage.findAllForAClientContract);
router.get("/clientcontract/:clientContract/withoutfileupload",clientContractPackage.findAllWithoutFileUploadForAClientContract);
router.delete("/clientcontract/:clientContract",clientContractPackage.deleteAllForAClientContract);
router.get("/:_id",clientContractPackage.findOne);
module.exports = router;
