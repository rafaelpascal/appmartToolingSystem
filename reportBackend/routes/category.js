const express = require("express");
const routes = express.Router()
// CONTROLLERS
const {Createcategory, getcategory} = require("../controllers/category")
// MIDDLEWARE
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")

// ROUTING
routes.route("/newcategory").post(verifyTokenAdmin, Createcategory).get(verifyTokenAdmin, getcategory)

module.exports = routes