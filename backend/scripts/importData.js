require("dotenv").config()
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")

const Catway = require("../models/Catway")
const Reservation = require("../models/Reservation")

async function importData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ MongoDB connecté")

    const catways = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/catways.json"))
    )

    const reservations = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/reservations.json"))
    )

    await Catway.deleteMany()
    await Reservation.deleteMany()

    await Catway.insertMany(catways)
    await Reservation.insertMany(reservations)

    console.log("🎉 Données importées avec succès")
    process.exit()
  } catch (err) {
    console.error("❌ Erreur import:", err)
    process.exit(1)
  }
}

importData()

