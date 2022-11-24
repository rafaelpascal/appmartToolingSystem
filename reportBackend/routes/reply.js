const express = require("express");
const routes = express.Router()
const {reply,  getreplys, deletearemark} = require("../controllers/reply")
const {verifyTokenAdmin, verifyToken} = require("../middleware/verifyToken")


routes.route("/replies/:id").post(verifyToken, reply)
routes.route("/deletereplies/:id").delete(verifyToken, deletearemark)
routes.route("/reply").get(verifyToken, getreplys)
module.exports = routes