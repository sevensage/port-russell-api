k/**
 * @file catwayRoutes.js
 * @description Routes Express pour la gestion des catways et de leurs réservations
 */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  deleteCatway,
} = require("../controllers/catwayController");

const {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

/* ============================
   ROUTES CATWAYS
============================ */

/**
 * @route GET /catways
 * @description Liste tous les catways
 * @access Private
 */
router.get("/", auth, getCatways);

/**
 * @route GET /catways/:id
 * @description Récupère un catway par son numéro
 * @access Private
 */
router.get("/:id", auth, getCatwayById);

/**
 * @route POST /catways
 * @description Crée un nouveau catway
 * @access Private
 */
router.post("/", auth, createCatway);

/**
 * @route PUT /catways/:id
 * @description Modifie un catway (seulement catwayState)
 * @access Private
 */
router.put("/:id", auth, updateCatway);

/**
 * @route DELETE /catways/:id
 * @description Supprime un catway
 * @access Private
 */
router.delete("/:id", auth, deleteCatway);


/* ============================
   ROUTES RESERVATIONS
============================ */

/**
 * @route GET /catways/:id/reservations
 * @description Liste les réservations pour un catway donné
 * @access Private
 */
router.get("/:id/reservations", auth, getReservations);

/**
 * @route GET /catways/:id/reservations/:idReservation
 * @description Récupère une réservation spécifique
 * @access Private
 */
router.get("/:id/reservations/:idReservation", auth, getReservationById);

/**
 * @route POST /catways/:id/reservations
 * @description Crée une réservation pour un catway
 * @access Private
 */
router.post("/:id/reservations", auth, createReservation);

/**
 * @route PUT /catways/:id/reservations/:idReservation
 * @description Modifie une réservation
 * @access Private
 */
router.put("/:id/reservations/:idReservation", auth, updateReservation);

/**
 * @route DELETE /catways/:id/reservations/:idReservation
 * @description Supprime une réservation
 * @access Private
 */
router.delete("/:id/reservations/:idReservation", auth, deleteReservation);

module.exports = router;

