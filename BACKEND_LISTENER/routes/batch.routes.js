const batch = require('../controllers/uploads/batch.controller');
const Batch = require('../models/uploads/batch.model');
const express = require('express');
const router = express.Router();


router.post("/",batch.create);
router.get("/client/:clientId/subclient/:subclientId",batch.findAllBatchesForAClientAndSubclient);
router.get("/clientssubclients",batch.findAllBatchesForAListOfClientsAndSubclients);
router.get("/:batch",batch.findABatch);
router.get("/downloadbatchfile/:batchId",batch.downloadBatchFile);
router.get("/readbatchfiles/:_id",batch.readBatchFiles);
router.delete("/deletecasefile/:_id/:fileName",batch.deleteCaseFile);
module.exports = router;
