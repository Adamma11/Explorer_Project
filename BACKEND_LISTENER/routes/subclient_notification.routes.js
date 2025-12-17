const subclientNotification = require('../controllers/administration/subclient_notification.controller');
const express = require('express');
const router = express.Router();

router.post("/",subclientNotification.insertMany);
router.get("/:subclient",subclientNotification.findAllForASubclient);
router.delete("/:subclient",subclientNotification.deleteAllForASubclient);
module.exports = router;
