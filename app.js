const express = require("express")
const app = express()
const port = 3000

const exphbs = require("express-handlebars")

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main.hbs" }))
app.set("view engine", "handlebars")

app.use(express.static("public"))

// setting the route and corresponding response
app.get("/", (req, res) => {
  res.render("index")
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
