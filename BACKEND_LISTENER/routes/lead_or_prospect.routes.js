const leadOrProspect = require('../controllers/sales/lead_or_prospect.controller');
const express = require('express');
const router = express.Router();

router.post("/",leadOrProspect.create);
router.put("/:_id",leadOrProspect.update);
router.put("/droprequest/:_id",leadOrProspect.dropRequest);
router.put("/droprejection/:_id",leadOrProspect.rejectDropRequest);
router.put("/dropaccept/:_id",leadOrProspect.acceptDropRequest);
router.put("/convertrequest/:_id",leadOrProspect.convertRequest);
router.put("/convertrejection/:_id",leadOrProspect.rejectConvertRequest);
router.put("/convertaccept/:_id",leadOrProspect.acceptConvertRequest);
router.get("/search/:searchString",leadOrProspect.search);
router.get("/:_id",leadOrProspect.read);
router.get("/",leadOrProspect.readAllForMe);
router.put("/chagebde/:id",leadOrProspect.changeBde)
module.exports = router;
