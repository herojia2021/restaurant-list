const express = require("express")
const router = express.Router()
const { authenticator } = require("../middleware/auth") // 掛載 middleware

const restaurants = require("./modules/restaurants")
const users = require("./modules/users")
const auth = require("./modules/auth")
const home = require("./modules/home")
const error = require("./modules/error")

router.use("/restaurants", authenticator, restaurants)
router.use("/users", users) // login, register, logout 不需驗証
router.use("/auth", auth)
router.use("/", authenticator, home)
router.use("*", error)

module.exports = router
