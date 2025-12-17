const subclient = require('../controllers/administration/subclient.controller');
const express = require('express');
const router = express.Router();

router.post("/",subclient.create);
router.get("/client/:client",subclient.findAllForAClient);
router.get("/",subclient.findAll);
router.get("/branches/",subclient.findAllForBranches);
router.get("/:_id",subclient.findOne);
router.put("/:_id",subclient.updateOne);
router.delete("/:_id",subclient.delete);
module.exports = router;
