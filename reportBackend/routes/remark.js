const express = require("express");
const routes = express.Router()
const {remark, getremark, responseremark, getaremark, deletearemark} = require("../controllers/remark")
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")


routes.route("/remarks/:id").post(verifyToken, remark)
routes.route("/remark/:id").patch(verifyToken, responseremark).delete(verifyToken, deletearemark)
routes.route("/remark/get/:id").get(verifyToken, getaremark)
routes.route("/remark/:id").get(verifyToken, getremark)
module.exports = routes