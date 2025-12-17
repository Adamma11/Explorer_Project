const personalDetails = require('../controllers/administration/personal_details.controller');
const express = require('express');
const router = express.Router();

router.post("/",personalDetails.create);
router.get("/",personalDetails.findAll);
router.get("/:_id",personalDetails.findOne);
router.put("/:_id",personalDetails.update);
//router.delete("/:_id",personalDetails.delete);
module.exports = router;