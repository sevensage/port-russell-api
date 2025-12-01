/**
 * @file Reservation model
 * @module models/Reservation
 */

/**
 * @typedef {Object} IReservation
 * @property {number} catwayNumber - Numéro du catway réservé.
 * @property {string} clientName - Nom du client.
 * @property {string} boatName - Nom du bateau.
 * @property {Date} startDate - Date de début.
 * @property {Date} endDate - Date de fin.
 */

const mongoose = require("mongoose");

/**
 * Schéma Mongoose pour les réservations.
 * @type {mongoose.Schema<IReservation>}
 */
const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: { type: Number, required: true, index: true },
    clientName: { type: String, required: true },
    boatName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { timestamps: true }
);

/**
 * Model Reservation Mongoose.
 * @type {mongoose.Model<IReservation>}
 */
module.exports = mongoose.model("Reservation", reservationSchema);

