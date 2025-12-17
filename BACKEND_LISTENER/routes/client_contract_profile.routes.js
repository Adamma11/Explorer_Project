const clientContractProfile = require('../controllers/administration/client_contract_profile.controller');
const express = require('express');
const router = express.Router();

router.post("/clientcontract/:clientContract",clientContractProfile.createMany);
router.get("/clientcontract/:clientContract",clientContractProfile.findAllForAClientContract);
router.get("/clientcontract/:clientContract/withoutfileupload",clientContractProfile.findAllWithoutFileUploadForAClientContract);
router.delete("/clientcontract/:clientContract",clientContractProfile.deleteAllForAClientContract);
router.get("/:_id",clientContractProfile.getProfileDetails)
module.exports = router;
