const express = require("express")
const app = express()
const port = 3000

const exphbs = require("express-handlebars")

const restaurantData = require("./restaurant.json")

// setting template engine
app.engine("hbs", exphbs({ extname: "hbs", defaultLayout: "main" }))
app.set("view engine", "hbs")

app.use(express.static("public"))

// 所有餐廳清單
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantData.results })
})

// 餐廳詳細資料頁面
app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantData.results.find((restaurant) => restaurant.id.toString() === req.params.id)
  res.render("show", { restaurant })
})

// 搜尋餐廳類別、餐廳店名
app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const lowerCaseKeyword = keyword.toLowerCase()
  const restaurants = restaurantData.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(lowerCaseKeyword) || restaurant.category.toLowerCase().includes(lowerCaseKeyword)
  })
  res.render("search", { restaurants, keyword })
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
