const pin = require('../controllers/masters/pin.controller');
const express = require('express');
const router = express.Router();

router.post("/",pin.create);
router.get("/",pin.findAll);
router.get("/id/:_id",pin.findOneWithId);
router.get("/:pinCode",pin.findOne);
router.get("/search/:searchString",pin.searchPin);
router.get("/searchfor/:searchString",pin.searchFor);
router.get("/pinforcity/:cityName",pin.getPinForCity);
router.put("/:_id",pin.update);
router.delete("/:_id",pin.delete);
module.exports = router;