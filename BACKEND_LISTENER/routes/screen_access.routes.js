const screenAccess = require('../controllers/administration/screen_access.controller');
const express = require('express');
const router = express.Router();

router.post("/",screenAccess.createMany);
router.get("/:role",screenAccess.findForARole);
router.put("/:role",screenAccess.updateScreenAccessForARole);
router.delete("/:role",screenAccess.deleteAllForARole);
module.exports = router;