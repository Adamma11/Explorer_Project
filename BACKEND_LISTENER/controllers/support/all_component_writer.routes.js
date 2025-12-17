const componentWriter = require('../controllers/support/component_writer_controller')
const express = require('express');
const router = express.Router();

router.post("/", componentWriter.writeComponent);
router.update("/:component_id", componentWriter.updateComponent)

module.exports = router;


