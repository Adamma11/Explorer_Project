const componentAccess = require('../controllers/administration/component_access.controller');
const express = require('express');
const router = express.Router();

router.put("/:role",componentAccess.updateComponentAccessForARole);
router.get("/readallforarole/:role",componentAccess.readAllForARole);
router.get("/readallforauser",componentAccess.readAllForAUser);
router.get("/readallclientcomponentsforauser",componentAccess.readAllClientComponentsForAUser );

module.exports = router;
