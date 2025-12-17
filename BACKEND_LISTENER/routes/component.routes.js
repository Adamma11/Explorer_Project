const component = require('../controllers/administration/component.controller');
const express = require('express');
const router = express.Router();
const componentWriter = require('../controllers/support/component_writer_controller')
const updateComponentData = require("../controllers/support/update_component_writer.controller")


router.post("/", componentWriter.writeComponent);
router.put("/:_id", updateComponentData.updateComponentDetails)
//router.put("/:component_id", componentWriter.updateComponent);
//router.post("/",component.create);
router.get("/",component.findAll);
router.get("/:_id",component.findOne);
//router.put("/:_id",component.update);
router.delete("/:_id",component.delete);
module.exports = router;
