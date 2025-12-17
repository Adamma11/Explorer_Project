const company = require('../controllers/masters/company.controller');
const express = require('express');
const router = express.Router();

router.post("/",company.create);
router.get("/",company.findAll);
router.get("/searchfor/:searchString",company.searchFor);
router.get("/search/:searchString",company.searchCompany);
router.get("/:_id",company.findOne);
router.put("/:_id",company.update);
router.delete("/:_id",company.delete);
router.get("/",company.readAllForMe);
module.exports = router;