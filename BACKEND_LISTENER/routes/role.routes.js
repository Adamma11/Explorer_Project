const role = require('../controllers/administration/role.controller');
const express = require('express');
const router = express.Router();

router.post("/",role.create);
router.get("/",role.findAll);
router.get("/:_id",role.findOne);
router.put("/:_id",role.update);
router.delete("/:_id",role.delete);
module.exports = router;