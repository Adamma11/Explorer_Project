const educationMaster = require('../controllers/masters/education_master.controller');
const express = require('express');
const router = express.Router();

router.post("/",educationMaster.create);
router.get("/",educationMaster.readAll);
router.get("/readallthatcontains/:searchString",educationMaster.readAllThatContains);
router.get("/:_id",educationMaster.read);
router.put("/:_id",educationMaster.update);
router.delete("/:_id",educationMaster.delete);
module.exports = router;