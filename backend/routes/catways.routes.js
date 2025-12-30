/**
 * @file catways.routes.js
 * @description Routes CRUD pour les catways.
 */

const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");

/**
 * Middleware pour vérifier l'authentification
 */
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

/**
 * GET /catways - Liste des catways
 */
router.get("/", isAuthenticated, async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
});

/**
 * GET /catways/:id - Détails d'un catway
 */
router.get("/:id", isAuthenticated, async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
  res.json(catway);
});

/**
 * POST /catways - Créer un catway
 */
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newCatway = new Catway(req.body);
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PUT /catways/:id - Modifier un catway (uniquement catwayState)
 */
router.put("/:id", isAuthenticated, async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

  catway.catwayState = req.body.catwayState || catway.catwayState;
  await catway.save();
  res.json(catway);
});

/**
 * DELETE /catways/:id - Supprimer un catway
 */
router.delete("/:id", isAuthenticated, async (req, res) => {
  const catway = await Catway.findByIdAndDelete(req.params.id);
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
  res.json({ message: "Catway supprimé" });
});

module.exports = router;

