const personalDetailsData = require('../controllers/data_entry/personal_details_data.controller');
const express = require('express');
const router = express.Router();

router.post("/",personalDetailsData.createForCde);
router.get("/",personalDetailsData.findAllForACase);
router.get("/:case_id",personalDetailsData.findOneForCde);
router.put("/:_id",personalDetailsData.updateForCde);
router.put("/updatedataentrystatus/:case_id",personalDetailsData.updateDataEntryStatus);
router.put("/updateinputqcstatus/:case_id",personalDetailsData.updateInputqcStatus);
module.exports = router;
