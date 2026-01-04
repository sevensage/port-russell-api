const express = require("express")
const router = express.Router()

const Reservation = require("../models/Reservation")
const Catway = require("../models/Catway")
const User = require("../models/User")

/* =========================
   Middleware sécurité
   ========================= */
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/")
  }
  next()
}

/* =========================
   DASHBOARD HOME
   ========================= */
router.get("/", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.user })
})

/* =========================
   RESERVATIONS
   ========================= */

// LISTE + FORMULAIRE
router.get("/reservations", isAuthenticated, async (req, res) => {
  const reservations = await Reservation.find().sort({ startDate: 1 })
  const catways = await Catway.find().sort({ catwayNumber: 1 })

  res.render("reservations", {
    reservations,
    catways,
    editReservation: null,
    error: null
  })
})

// EDIT FORM
router.get("/reservations/edit/:id", isAuthenticated, async (req, res) => {
  const reservations = await Reservation.find()
  const catways = await Catway.find()
  const editReservation = await Reservation.findById(req.params.id)

  res.render("reservations", {
    reservations,
    catways,
    editReservation,
    error: null
  })
})

// CREATE
router.post("/reservations", isAuthenticated, async (req, res) => {
  try {
    await Reservation.create(req.body)
    res.redirect("/dashboard/reservations")
  } catch (err) {
    res.render("reservations", {
      reservations: await Reservation.find(),
      catways: await Catway.find(),
      editReservation: null,
      error: err.message
    })
  }
})

// UPDATE
router.post("/reservations/edit/:id", isAuthenticated, async (req, res) => {
  await Reservation.findByIdAndUpdate(req.params.id, req.body)
  res.redirect("/dashboard/reservations")
})

// DELETE
router.post("/reservations/delete/:id", isAuthenticated, async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.id)
  res.redirect("/dashboard/reservations")
})

/* =========================
   CATWAYS
   ========================= */

router.get("/catways", isAuthenticated, async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 })

  res.render("catways", {
    catways,
    editCatway: null,
    error: null   // ✅ IMPORTANT
  })
})

/* =========================
   USERS
   ========================= */

// USERS – LISTE ✅ (le bloc demandé)
router.get("/users", isAuthenticated, async (req, res) => {
  const users = await User.find()
  res.render("users", { users, editUser: null, error: null })
})

// FORM EDIT USER
router.get("/users/edit/:email", isAuthenticated, async (req, res) => {
  const users = await User.find()
  const editUser = await User.findOne({ email: req.params.email })

  res.render("users", { users, editUser, error: null })
})

// CREATE USER
router.post("/users", isAuthenticated, async (req, res) => {
  try {
    await User.create(req.body)
    res.redirect("/dashboard/users")
  } catch (err) {
    res.render("users", {
      users: await User.find(),
      editUser: null,
      error: err.message
    })
  }
})

// UPDATE USER
router.post("/users/edit/:email", isAuthenticated, async (req, res) => {
  const data = { username: req.body.username }

  if (req.body.password) {
    data.password = req.body.password
  }

  await User.findOneAndUpdate({ email: req.params.email }, data)
  res.redirect("/dashboard/users")
})

// DELETE USER
router.post("/users/delete/:email", isAuthenticated, async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email })
  res.redirect("/dashboard/users")
})

/* ========================= */

module.exports = router

