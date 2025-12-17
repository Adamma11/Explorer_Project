const component = require('../controllers/administration/component.controller');
const express = require('express');
const router = express.Router();

//router.post("/",component.create);
//router.get("/",component.findAll);
router.get("/:_id",component.findOneForCde);
//router.put("/:_id",component.update);
//router.delete("/:_id",component.delete);
module.exports = router;
