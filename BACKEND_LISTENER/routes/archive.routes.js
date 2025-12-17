const archiveController = require("../controllers/reports/archive.controller")

const express = require('express')
const Router = express.Router()

Router.post("/compress", archiveController.compress)
Router.post("/decompress", archiveController.decompress)

module.exports = Router