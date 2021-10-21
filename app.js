const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const routes = require("./routes")
require("./config/mongoose")

const usePassport = require("./config/passport")

// setup Application
const app = express()
const port = 3000

// setup template engine
app.engine("hbs", exphbs({ extname: "hbs", defaultLayout: "main" }))
app.set("view engine", "hbs")

app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
)

// setup static-file path
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride("_method"))

// 呼叫 Passport 函式並傳入 app，要在路由之前
usePassport(app)

app.use(routes)

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
