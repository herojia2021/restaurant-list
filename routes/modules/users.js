const express = require("express")
const router = express.Router()
const User = require("../../models/user")
const passport = require("passport")
const bcrypt = require("bcryptjs")

// login form
router.get("/login", (req, res) => {
  res.render("login")
})

// request login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
)

// register form
router.get("/register", (req, res) => {
  res.render("register")
})

// request register
router.post("/register", (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" })
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" })
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then((user) => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      errors.push({ message: "這個 Email 已經註冊過了。" })
      res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      // 如果還沒註冊：寫入資料庫
      return bcrypt
        .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
        .then((salt) => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err))
    }
  })
})

// request logout
router.get("/logout", (req, res) => {
  req.logout()
  req.flash("success_msg", "你已經成功登出。")
  res.redirect("/users/login")
})

module.exports = router
