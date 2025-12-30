/**
 * @file users.routes.js
 * @description Routes CRUD pour les utilisateurs.
 */

const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * Middleware pour vérifier si l'utilisateur est connecté
 */
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

/**
 * GET /users - Liste des utilisateurs
 */
router.get("/", isAuthenticated, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/**
 * GET /users/:email - Détails d'un utilisateur
 */
router.get("/:email", isAuthenticated, async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(user);
});

/**
 * POST /users - Créer un utilisateur
 */
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PUT /users/:email - Modifier un utilisateur
 */
router.put("/:email", isAuthenticated, async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  Object.assign(user, req.body);
  await user.save();
  res.json(user);
});

/**
 * DELETE /users/:email - Supprimer un utilisateur
 */
router.delete("/:email", isAuthenticated, async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json({ message: "Utilisateur supprimé" });
});

/**
 * @route GET /dashboard/users
 * @desc Page Dashboard - Gestion des utilisateurs (CRUD)
 */
router.get("/dashboard/users", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    res.render("users", {
      users,
      currentUser: req.session.user
    });
  } catch (error) {
    console.error(error);
    res.render("users", {
      users: [],
      error: "Erreur lors du chargement des utilisateurs"
    });
  }
});

module.exports = router;
