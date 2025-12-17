const client = require('../controllers/administration/client.controller');
const express = require('express');
const router = express.Router();

console.log('in client router');
router.post("/",client.create);
router.get("/",client.findAll);
router.get("/:_id",client.findOne);
router.put("/:_id",client.update);
router.delete("/:_id",client.delete);
module.exports = router;