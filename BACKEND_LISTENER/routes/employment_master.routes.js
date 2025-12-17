const employmentMaster = require('../controllers/masters/employment_master.controller');
const express = require('express');
const router = express.Router();

router.post("/",employmentMaster.create);
router.get("/",employmentMaster.readAll);
router.get("/readallthatcontains/:searchString",employmentMaster.readAllThatContains);
router.get("/:_id",employmentMaster.read);
router.put("/:_id",employmentMaster.update);
router.delete("/:_id",employmentMaster.delete);
module.exports = router;