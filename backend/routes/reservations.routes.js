/**
 * @file reservations.routes.js
 * @description Routes CRUD pour les réservations.
 */

const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

/**
 * Middleware pour vérifier l'authentification
 */
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

/**
 * GET /catways/:id/reservations - Liste réservations pour un catway
 */
router.get("/:id/reservations", isAuthenticated, async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.id });
  res.json(reservations);
});

/**
 * GET /catways/:id/reservations/:resId - Détails d'une réservation
 */
router.get("/:id/reservations/:resId", isAuthenticated, async (req, res) => {
  const reservation = await Reservation.findById(req.params.resId);
  if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });
  res.json(reservation);
});

/**
 * POST /catways/:id/reservations - Créer une réservation
 */
router.post("/:id/reservations", isAuthenticated, async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

  const newReservation = new Reservation({
    catwayNumber: catway.catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  await newReservation.save();
  res.status(201).json(newReservation);
});

/**
 * PUT /catways/:id/reservations/:resId - Modifier une réservation
 */
router.put("/:id/reservations/:resId", isAuthenticated, async (req, res) => {
  const reservation = await Reservation.findById(req.params.resId);
  if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });

  Object.assign(reservation, req.body);
  await reservation.save();
  res.json(reservation);
});

/**
 * DELETE /catways/:id/reservations/:resId - Supprimer une réservation
 */
router.delete("/:id/reservations/:resId", isAuthenticated, async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.resId);
  if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });
  res.json({ message: "Réservation supprimée" });
});

/**
 * @route GET /dashboard/reservations
 * @desc Page Dashboard - Gestion des réservations
 */
router.get("/dashboard/reservations", isAuthenticated, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ startDate: 1 });

    res.render("reservations", {
      reservations,
      user: req.session.user
    });

  } catch (error) {
    console.error(error);
    res.render("reservations", {
      reservations: [],
      error: "Erreur lors du chargement des réservations"
    });
  }
});

module.exports = router;

