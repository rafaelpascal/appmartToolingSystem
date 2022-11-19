const express = require("express")
const routes = express.Router()
const {getAllUser, getUser, editUser, deactivateUser, activateUser} = require("../controllers/user")

routes.route("/getUsers").get(getAllUser)
routes.route("/User/:id").get(getUser).patch(editUser).delete(deactivateUser)
routes.route("/deactivateUser/:id").patch(deactivateUser)
routes.route("/activateUser/:id").patch(activateUser)

module.exports = routes