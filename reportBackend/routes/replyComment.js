const express = require("express");
const routes = express.Router()
const {commentreply, getcommentreplys, getacommentremark} = require("../controllers/replyComment")
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")


routes.route("/replycomment/:id").post(verifyTokenAdmin, commentreply)
routes.route("/commentreply/:id").get(getacommentremark)
routes.route("/commentreply").get(getcommentreplys)
module.exports = routes