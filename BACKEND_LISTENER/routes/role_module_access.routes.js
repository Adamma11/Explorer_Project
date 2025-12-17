const roleModuleAccess = require('../controllers/administration/role_module_access.controller');
const express = require('express');
const router = express.Router();

router.post("/",roleModuleAccess.createMany);
router.get("/",roleModuleAccess.findAll);
router.get("/:roleId/applicatioModuleId",roleModuleAccess.findOne);
router.get("/role/:roleId",roleModuleAccess.findModulesForARole);
router.put("/:_id",roleModuleAccess.update);
router.delete("/role/:roleId",roleModuleAccess.deleteForARole);
module.exports = router;