const express = require("express")
const routes = express.Router()
const {viewallReview, viewaReview, remark} = require("../controllers/selfReview")
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")

routes.route("/allReport").get(verifyTokenAdmin, viewallReview)
routes.route("/report/:id").get(verifyTokenAdmin,verifyToken, viewaReview)
routes.route("/remark/:id").patch(verifyTokenAdmin, remark)

module.exports = routes