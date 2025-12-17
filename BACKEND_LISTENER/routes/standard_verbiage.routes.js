const standardVerbiage = require('../controllers/masters/standard_verbiage.controller');
const express = require('express');
const router = express.Router();

router.post("/",standardVerbiage.create);
router.get("/searchallinsuffComments", standardVerbiage.searchAllInsuffComments);
router.get("/",standardVerbiage.findAll);
router.get("/:_id",standardVerbiage.findOne);
router.put("/:_id",standardVerbiage.update);
router.delete("/:_id",standardVerbiage.delete);
module.exports = router;
