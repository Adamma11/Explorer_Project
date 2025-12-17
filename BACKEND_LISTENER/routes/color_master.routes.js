const colorMaster = require('../controllers/administration/color_master.controller');
const express = require('express');
const router = express.Router();

router.post("/",colorMaster.createMany);
router.get("/",colorMaster.findAll);
router.put("/",colorMaster.updateColorMaster);
router.get("/:grade",colorMaster.findOne);
module.exports = router;
