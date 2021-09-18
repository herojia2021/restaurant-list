const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const routes = require("./routes")

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

app.use(methodOverride("_method"))

app.use(routes)

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
