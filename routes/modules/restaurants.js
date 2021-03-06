const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

// route: 搜尋餐廳API
router.get("/search", (req, res) => {
  // 取得查詢關鍵字
  const keyword = req.query.keyword
  // 設定顯示按鈕
  const uiConfig = {
    showNew: false, //新增按鈕
    showSort: false, //排序選項
    showReturn: true, //返回按鈕
  }

  const userId = req.user._id

  // (屬於使用者) AND (名稱含關鍵字 OR 類別含關鍵字)
  return Restaurant.find({ $and: [{ userId }, { $or: [{ name: { $regex: keyword, $options: "i" } }, { category: { $regex: keyword, $options: "i" } }] }] })
    .lean()
    .then((restaurants) => res.render("index", { restaurants, keyword, uiConfig }))
    .catch((error) => console.log(error))
})

// route: 新增餐廳頁面
router.get("/new", (req, res) => {
  return res.render("new")
})

// route: 餐廳詳細資料頁面
router.get("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error))
})

// route: 編輯餐廳頁面
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error))
})

// route: 新增餐廳API
router.post("/", (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

// route: 編輯餐廳API
router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      for (const [key, value] of Object.entries(req.body)) {
        restaurant[key] = value
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error))
})

// route: 刪除餐廳API
router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

module.exports = router
