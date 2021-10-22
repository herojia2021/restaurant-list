const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

// route: 所有餐廳清單
router.get("/", (req, res) => {
  // 取得排序選項
  const sortValStr = req.query.sort //"a-z", "z-a", "category", "location", "rating"
  // 排序選項對應查詢
  const queryObj = {
    "a-z": { name: "asc" },
    "z-a": { name: "desc" },
    category: { category: "asc" },
    location: { location: "asc" },
    rating: { rating: "desc" },
  }
  // 設定顯示按鈕
  const uiConfig = {
    showNew: true, //新增按鈕
    showSort: true, //排序選項
    showReturn: false, //返回按鈕
  }
  // 提供boolean資訊給handlebars helper, 設定sort選項
  const sort = sortValStr ? { [sortValStr]: true } : { "a-z": true }

  // 只顯示登入者的資料
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .sort(queryObj[sortValStr]) // desc
    .then((restaurants) => res.render("index", { restaurants, sort, uiConfig }))
    .catch((error) => console.error(error))
})

module.exports = router
