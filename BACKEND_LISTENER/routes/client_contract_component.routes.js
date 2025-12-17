const clientContractComponent = require('../controllers/administration/client_contract_component.controller');
const express = require('express');
const router = express.Router();

router.post("/clientcontract/:clientContract",clientContractComponent.createMany);
router.get("/clientcontract/:clientContract",clientContractComponent.findAllForAClientContract);
router.get("/clientcontract/:clientContract_id/component/:component_id",clientContractComponent.findDetailsForAComponent);
router.get("/clientcontract/:clientContract/withoutfileupload",clientContractComponent.findAllWithoutFileUploadForAClientContract);
router.delete("/clientcontract/:clientContract",clientContractComponent.deleteAllForAClientContract);
module.exports = router;