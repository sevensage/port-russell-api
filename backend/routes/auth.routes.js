/**
 * @file auth.routes.js
 * @description Routes d'authentification (login / logout)
 */

const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()

const User = require("../models/User")

/**
 * @route GET /
 * @description Page de login
 */
router.get("/", (req, res) => {
  res.render("login", { error: null })
})

/**
 * @route POST /login
 * @description Authentification utilisateur
 */
router.post("/login", async (req, res) => {
  try {
    console.log("📩 BODY REÇU :", req.body)

    const { email, password } = req.body
    console.log("📧 email:", email)
    console.log("🔑 password:", password)

    const user = await User.findOne({ email })
    console.log("👤 user trouvé:", !!user)

    if (!user) {
      console.log("❌ Utilisateur introuvable")
      return res.render("login", {
        error: "Utilisateur introuvable"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log("🧪 bcrypt match:", isMatch)

    if (!isMatch) {
      return res.render("login", {
        error: "Mot de passe incorrect"
      })
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role
    }

    console.log("✅ Connexion réussie")
    res.redirect("/dashboard")
  } catch (err) {
    console.error("🔥 Erreur login :", err)
    res.render("login", {
      error: "Erreur serveur"
    })
  }
})

/**
 * @route GET /logout
 * @description Déconnexion
 */
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  })
})

module.exports = router

