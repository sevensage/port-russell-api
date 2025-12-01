/**
 * @file reservationController.js
 * @description Gestion des réservations pour chaque catway
 */

const Reservation = require("../models/Reservation");

/**
 * @function createReservation
 * @description Crée une réservation pour un catway donné
 */
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      catwayNumber: req.params.id,
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function getReservations
 * @description Liste toutes les réservations d’un catway
 */
exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.id });
  res.json(reservations);
};

/**
 * @function getReservation
 * @description Récupère une réservation par son ID
 */
exports.getReservation = async (req, res) => {
  const reservation = await Reservation.findOne({
    _id: req.params.idReservation,
    catwayNumber: req.params.id,
  });

  if (!reservation)
    return res.status(404).json({ message: "Réservation introuvable" });

  res.json(reservation);
};

/**
 * @function updateReservation
 * @description Modifie une réservation
 */
exports.updateReservation = async (req, res) => {
  const reservation = await Reservation.findOneAndUpdate(
    { _id: req.params.idReservation, catwayNumber: req.params.id },
    req.body,
    { new: true }
  );

  res.json(reservation);
};

/**
 * @function deleteReservation
 * @description Supprime une réservation
 */
exports.deleteReservation = async (req, res) => {
  await Reservation.findOneAndDelete({
    _id: req.params.idReservation,
    catwayNumber: req.params.id,
  });

  res.json({ message: "Réservation supprimée" });
};
