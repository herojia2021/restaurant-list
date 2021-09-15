const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const Restaurant = require("./models/restaurant")

// setup Application
const app = express()
const port = 3000

// setup DB connection
mongoose.connect("mongodb://localhost/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")
})

// setup template engine
app.engine("hbs", exphbs({ extname: "hbs", defaultLayout: "main" }))
app.set("view engine", "hbs")

// setup static-file path
app.use(express.static("public"))

// route: 所有餐廳清單
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.error(error))
})

// route: 餐廳詳細資料頁面
app.get("/restaurants/:id", (req, res) => {
  const id = Number(req.params.id)
  return Restaurant.find({ id })
    .lean()
    .then((restaurant) => {
      console.log(restaurant[0])
      return res.render("show", { restaurant: restaurant[0] })
    })
    .catch((error) => console.log(error))
})

// route: 搜尋餐廳類別、餐廳店名
app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({ $or: [{ name: { $regex: keyword, $options: "i" } }, { category: { $regex: keyword, $options: "i" } }] })
    .lean()
    .then((restaurants) => res.render("index", { restaurants: restaurants, keyword: keyword }))
    .catch((error) => console.log(error))
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
