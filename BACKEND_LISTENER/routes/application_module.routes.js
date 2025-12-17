const applicationModule = require('../controllers/administration/application_module.controller');
const express = require('express');
const router = express.Router();

router.post("/",applicationModule.create);
router.get("/",applicationModule.findAll);
router.get("/:_id",applicationModule.findOne);
router.put("/:_id",applicationModule.update);
router.delete("/:_id",applicationModule.delete);
module.exports = router;