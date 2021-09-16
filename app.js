const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const Restaurant = require("./models/restaurant")
const bodyParser = require("body-parser")

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

app.use(bodyParser.urlencoded({ extended: true }))

// route: 所有餐廳清單
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.error(error))
})

app.get("/restaurants/new", (req, res) => {
  return res.render("new")
})

app.post("/restaurants", (req, res) => {
  let newRestaurant = {}
  for (const [key, value] of Object.entries(req.body)) {
    newRestaurant[key] = value
  }
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

// route: 餐廳詳細資料頁面
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error))
})

// route: 搜尋餐廳類別、餐廳店名
app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({ $or: [{ name: { $regex: keyword, $options: "i" } }, { category: { $regex: keyword, $options: "i" } }] })
    .lean()
    .then((restaurants) => res.render("index", { restaurants, keyword }))
    .catch((error) => console.log(error))
})

app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error))
})

app.post("/restaurants/:id/edit", (req, res) => {
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

app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error))
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
