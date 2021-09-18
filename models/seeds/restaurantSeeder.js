const Restaurant = require("../restaurant")
const db = require("../../config/mongoose")

const restaurantData = require("./restaurant.json")

db.once("open", () => {
  restaurantData.results.forEach((element) => {
    Restaurant.create({
      name: element.name,
      name_en: element.name_en,
      category: element.category,
      image: element.image,
      location: element.location,
      phone: element.phone,
      google_map: element.google_map,
      rating: element.rating,
      description: element.description,
    })
  })

  console.log("Seed data created. Ctrl+C to Exit.")
})
