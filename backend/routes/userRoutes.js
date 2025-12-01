/**
 * @file userRoutes.js
 * @description Routes Express pour la gestion des utilisateurs (CRUD + Auth)
 */

const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
} = require("../controllers/userController");

const auth = require("../middleware/auth");

/**
 * @route POST /login
 * @description Connexion utilisateur
 * @access Public
 */
router.post("/login", login);

/**
 * @route GET /logout
 * @description Déconnexion utilisateur
 * @access Public
 */
router.get("/logout", logout);

/** ============================
 * ROUTES UTILISATEURS
 * ============================ */

/**
 * @route POST /users/
 * @description Création utilisateur
 * @access Private (Capitainerie)
 */
router.post("/users", auth, createUser);

/**
 * @route GET /users/
 * @description Liste utilisateurs
 * @access Private
 */
router.get("/users", auth, getUsers);

/**
 * @route GET /users/:email
 * @description Récupérer infos utilisateur
 * @access Private
 */
router.get("/users/:email", auth, getUser);

/**
 * @route PUT /users/:email
 * @description Modifier utilisateur
 * @access Private
 */
router.put("/users/:email", auth, updateUser);

/**
 * @route DELETE /users/:email
 * @description Supprimer utilisateur
 * @access Private
 */
router.delete("/users/:email", auth, deleteUser);

module.exports = router;

