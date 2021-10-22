const bcrypt = require("bcryptjs")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const Restaurant = require("../restaurant")
const User = require("../user")
const db = require("../../config/mongoose")

const userData = require("./users.json")
// create seed data
db.once("open", () => {
  Promise.all(
    userData.users.map((userObj) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(userObj.password, salt))
        .then((hash) =>
          User.create({
            name: userObj.name,
            email: userObj.email,
            password: hash,
          })
        )
        .then((user) => {
          const userId = user._id
          return Promise.all(
            userObj.restaurants.map((restaurantObj) => {
              return Restaurant.create({
                userId,
                name: restaurantObj.name,
                name_en: restaurantObj.name_en,
                category: restaurantObj.category,
                image: restaurantObj.image,
                location: restaurantObj.location,
                phone: restaurantObj.phone,
                google_map: restaurantObj.google_map,
                rating: restaurantObj.rating,
                description: restaurantObj.description,
              })
            })
          )
        })
    })
  ).then(() => {
    console.log("done.")
    process.exit()
  })
})
