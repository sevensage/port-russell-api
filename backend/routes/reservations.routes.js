const express = require("express")
const router = express.Router()
const Reservation = require("../models/Reservation")

/* =========================
   LISTE DES RÉSERVATIONS
   GET /catways/:id/reservations
   ========================= */
router.get("/catways/:id/reservations", async (req, res) => {
  const catwayNumber = Number(req.params.id)

  const reservations = await Reservation.find({ catwayNumber })
  res.json(reservations)
})

/* =========================
   DÉTAIL RÉSERVATION
   GET /catways/:id/reservations/:reservationId
   ========================= */
router.get("/catways/:id/reservations/:reservationId", async (req, res) => {
  const reservation = await Reservation.findById(req.params.reservationId)
  res.json(reservation)
})

/* =========================
   CRÉER RÉSERVATION
   POST /catways/:id/reservations
   ========================= */
router.post("/catways/:id/reservations", async (req, res) => {
  const reservation = new Reservation({
    catwayNumber: Number(req.params.id),
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  })

  await reservation.save()
  res.status(201).json(reservation)
})

/* =========================
   MODIFIER RÉSERVATION
   PUT /catways/:id/reservations/:reservationId
   ========================= */
router.put("/catways/:id/reservations/:reservationId", async (req, res) => {
  const updated = await Reservation.findByIdAndUpdate(
    req.params.reservationId,
    req.body,
    { new: true }
  )

  res.json(updated)
})

/* =========================
   SUPPRIMER RÉSERVATION
   DELETE /catways/:id/reservations/:reservationId
   ========================= */
router.delete("/catways/:id/reservations/:reservationId", async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.reservationId)
  res.json({ message: "Réservation supprimée" })
})

module.exports = router

