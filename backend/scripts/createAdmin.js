/**
 * @file scripts/createAdmin.js
 * Création / recréation propre de l'admin
 */

require("dotenv").config()
const mongoose = require("mongoose")
const User = require("../models/User")

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ MongoDB connecté")

    const adminData = {
      username: "admin",
      email: "admin@port-russell.fr",
      password: "admin123", // ⚠️ EN CLAIR
      role: "admin"
    }

    // Nettoyage complet
    await User.deleteOne({ email: adminData.email })

    // Création
    const admin = new User(adminData)
    await admin.save()

    console.log("✅ Admin créé avec succès")
    console.log("📧 Email :", adminData.email)
    console.log("👤 Username :", adminData.username)
    console.log("🔑 Mot de passe :", adminData.password)

    process.exit(0)
  } catch (err) {
    console.error("❌ Erreur :", err)
    process.exit(1)
  }
}

createAdmin()

