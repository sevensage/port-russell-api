/**
 * @file Catway.js
 * @description Schéma Mongoose pour les catways.
 */

const mongoose = require("mongoose");

const CatwaySchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true, unique: true },
  catwayType: { type: String, enum: ["long", "short"], required: true },
  catwayState: { type: String, required: true }
});

module.exports = mongoose.model("Catway", CatwaySchema);

