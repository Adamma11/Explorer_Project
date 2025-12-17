const componentField = require('../controllers/administration/component_field.controller');
const express = require('express');
const router = express.Router();

router.post("/component/:componentId",componentField.createMany);
router.get("/",componentField.findAll);
router.get("/:componentId/fieldId",componentField.findOne);
router.get("/component/:componentId",componentField.findAllFieldsForAComponent);
router.put("/:_id",componentField.update);
router.delete("/component/:componentId",componentField.deleteForAComponent);
module.exports = router;