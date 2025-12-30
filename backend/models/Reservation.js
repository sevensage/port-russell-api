/**
 * @file Reservation.js
 * @description Schéma Mongoose pour les réservations.
 */

const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  clientName: { type: String, required: true },
  boatName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model("Reservation", ReservationSchema);

