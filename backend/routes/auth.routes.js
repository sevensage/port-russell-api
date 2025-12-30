/**
 * @file auth.routes.js
 * @description Routes d'authentification
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/**
 * @route GET /login
 * @desc Affiche la page de connexion
 */
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

/**
 * @route POST /login
 * @desc Traitement du formulaire de connexion
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", {
        error: "Utilisateur introuvable"
      });
    }

    // Vérifie mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        error: "Mot de passe incorrect"
      });
    }

    // Stocke utilisateur en session
    req.session.user = user;

    // ✅ REDIRECTION VERS DASHBOARD
    res.redirect("/dashboard");

  } catch (error) {
    console.error(error);
    res.render("login", {
      error: "Erreur serveur"
    });
  }
});

/**
 * @route GET /logout
 * @desc Déconnexion utilisateur
 */
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;

