const express = require("express")
const router = express.Router()

// login form
router.get("/login", (req, res) => {
  res.render("login")
})

// request login
router.post("/login", (req, res) => {})

// register form
router.get("/register", (req, res) => {
  res.render("register")
})

module.exports = router
