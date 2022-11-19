const express = require("express");
const routes = express.Router()
const {remarkreply, getaremark, getremarkreplys} = require("../controllers/replyremark")
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")


routes.route("/remarkreplies/:id").post(verifyToken, remarkreply)
routes.route("/remarkreply/:id").get(getaremark)
routes.route("/remarkreply").get(getremarkreplys)
module.exports = routes