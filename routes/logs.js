const express = require("express");
const routes = express.Router()
// CONTROLLERS
const {log, getLogs} = require("../controllers/logs")
// MIDDLEWARE
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")

// ROUTING
routes.route("/newlog/:id").post(verifyToken, log)
routes.route("/logs").get(verifyTokenAdmin, getLogs)

module.exports = routes