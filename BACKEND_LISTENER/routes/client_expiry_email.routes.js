
const express = require("express")
const { sendExpiryEmail } = require("../controllers/administration/client_expiry_email.controller")
const router = express.Router()

router.get("/", sendExpiryEmail)

module.exports = router