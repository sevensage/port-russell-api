/**
 * @file User model definition using Mongoose.
 * @description Defines the User schema for the Port Russell API.
 * @module models/User
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * User schema definition.
 *
 * @typedef {Object} User
 * @property {String} username - Username chosen by the user.
 * @property {String} email - Unique email address.
 * @property {String} password - Hashed password stored in DB.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est obligatoire"],
      minlength: [3, "Le nom d'utilisateur doit contenir au moins 3 caractères"],
    },

    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Email invalide"],
    },

    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Before saving the user, hash the password if modified.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Compare a plain password with the hashed one.
 *
 * @method
 * @param {String} password - The password to compare.
 * @returns {Promise<Boolean>} True if passwords match.
 */
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

