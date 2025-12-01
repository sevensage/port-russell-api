const express = require("express");
const router = express.Router({ mergeParams: true }); // obligatoire pour récupérer :catwayNumber depuis catwayRoutes

const auth = require("../middleware/auth");
const reservationCtrl = require("../controllers/reservationController");

// Toutes les routes sont protégées
router.use(auth);

// Routes CRUD avec catwayNumber dans l’URL
router.post("/", reservationCtrl.createReservation);
router.get("/", reservationCtrl.getReservations);
router.get("/:reservationId", reservationCtrl.getReservationById);
router.put("/:reservationId", reservationCtrl.updateReservation);
router.delete("/:reservationId", reservationCtrl.deleteReservation);

module.exports = router;

