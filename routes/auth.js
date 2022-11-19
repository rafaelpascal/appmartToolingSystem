const express = require("express");
const routes = express.Router()
const {createAccount, loginUser, verifyOTP, changePass, logOut} = require("../controllers/auth")
const {verifyToken, verifyTokenAdmin} = require("../middleware/verifyToken")


routes.route("/admincreate").post(createAccount)
routes.route("/verifyOtp/:id").post(verifyOTP)
routes.route("/login").post(loginUser)
routes.route("/logout").post(verifyToken, logOut)
routes.route("/changePass/:id").patch(changePass)


module.exports = routes