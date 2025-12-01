/**
 * @file Catway model
 * @module models/Catway
 */

/**
 * @typedef {Object} ICatway
 * @property {number} catwayNumber - Numéro unique du catway.
 * @property {string} catwayType - "long" ou "short".
 * @property {string} catwayState - Description de l'état.
 */

const mongoose = require("mongoose");

/**
 * Schéma Mongoose pour les catways.
 * @type {mongoose.Schema<ICatway>}
 */
const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: { type: Number, required: true, unique: true },
    catwayType: { type: String, enum: ["long", "short"], required: true },
    catwayState: { type: String, required: true }
  },
  { timestamps: true }
);

/**
 * Model Catway Mongoose.
 * @type {mongoose.Model<ICatway>}
 */
module.exports = mongoose.model("Catway", catwaySchema);

