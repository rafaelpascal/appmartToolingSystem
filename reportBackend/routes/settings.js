const express = require("express");
const routes = express.Router()
// CONTROLLERS
const {saveSettings, getsettingss, updatesettings, deletesettings} = require("../controllers/settings")
// MIDDLEWARE
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")

// ROUTING
routes.route("/newsetting/:id").post(verifyTokenAdmin, saveSettings).patch(verifyTokenAdmin, updatesettings)
routes.route("/settings").get(verifyToken, getsettingss)
routes.route("/delete/settings/:id").delete(verifyTokenAdmin, deletesettings)

module.exports = routes