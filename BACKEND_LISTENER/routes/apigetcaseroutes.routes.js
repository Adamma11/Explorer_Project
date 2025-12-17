const getcaseController = require('../controllers/uploads/getcase.controller');
const getCaseStatusController = require("../controllers/uploads/getcase_merc.controller")

const express = require('express');
const router = express.Router();
const fs = require('fs');



router.get("/GetCase",getcaseController.get);
router.get("/GetCaseData",getcaseController.getData);
router.get("/GetCaseStatus", getCaseStatusController.getCase);

module.exports = router;
