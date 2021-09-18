const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

// route: 搜尋餐廳API
router.get("/search", (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({ $or: [{ name: { $regex: keyword, $options: "i" } }, { category: { $regex: keyword, $options: "i" } }] })
    .lean()
    .then((restaurants) => res.render("index", { restaurants, keyword }))
    .catch((error) => console.log(error))
})

// route: 新增餐廳頁面
router.get("/new", (req, res) => {
  return res.render("new")
})

// route: 餐廳詳細資料頁面
router.get("/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error))
})

// route: 編輯餐廳頁面
router.get("/:id/edit", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error))
})

// route: 新增餐廳API
router.post("/", (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

// route: 編輯餐廳API
router.put("/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => {
      for (const [key, value] of Object.entries(req.body)) {
        restaurant[key] = value
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// route: 刪除餐廳API
router.delete("/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

module.exports = router
