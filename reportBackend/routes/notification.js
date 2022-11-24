const express = require("express");
const routes = express.Router();
const {createNotification} = require("../controllers/notification")
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")


routes.route("/notification").post(verifyTokenAdmin, createNotification)
// routes.route("/getAllmynotification/:id").get(verifyToken, getAllMyNotifation)

module.exports = routes