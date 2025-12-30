/**
 * @file User.js
 * @description Schéma Mongoose pour les utilisateurs.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * Schéma User
 */
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

/**
 * Hash du mot de passe avant sauvegarde
 */
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Vérifie le mot de passe
 * @param {string} passwordMotPasse
 * @returns {Promise<boolean>}
 */
UserSchema.methods.comparePassword = function(passwordMotPasse) {
  return bcrypt.compare(passwordMotPasse, this.password);
};

module.exports = mongoose.model("User", UserSchema);

