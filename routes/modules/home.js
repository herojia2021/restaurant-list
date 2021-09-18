const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/restaurant")

// route: 所有餐廳清單
router.get("/", (req, res) => {
  const sortValStr = req.query.sort //"a-z", "z-a", "category", "location", "rating"
  const queryObj = {
    "a-z": { name: "asc" },
    "z-a": { name: "desc" },
    category: { category: "asc" },
    location: { location: "asc" },
    rating: { rating: "desc" },
  }
  const sort = sortValStr ? { [sortValStr]: true } : { "a-z": true }
  Restaurant.find()
    .lean()
    .sort(queryObj[sortValStr]) // desc
    .then((restaurants) => res.render("index", { restaurants, sort }))
    .catch((error) => console.error(error))
})

module.exports = router
