const express = require("express")
const app = express()
const port = 3000

const exphbs = require("express-handlebars")

const restaurantData = require("./restaurant.json")

// setting template engine
app.engine("hbs", exphbs({ extname: "hbs", defaultLayout: "main" }))
app.set("view engine", "hbs")

app.use(express.static("public"))

// setting the route and corresponding response
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantData.results })
})

app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantData.results.find((restaurant) => restaurant.id.toString() === req.params.id)
  res.render("show", { restaurant })
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantData.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render("search", { restaurants, keyword })
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
