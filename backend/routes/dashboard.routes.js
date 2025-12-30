/**
 * @file dashboard.routes.js
 * @description
 * Routes des pages du tableau de bord (HTML)
 */

const express = require("express");
const router = express.Router();

const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");
const User = require("../models/User");

/**
 * Middleware de protection
 */
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/");
}

/**
 * @route GET /dashboard
 * @description Page principale dashboard
 */
router.get("/", isAuthenticated, async (req, res) => {
  const reservations = await Reservation.find({
    endDate: { $gte: new Date() },
  });

  res.render("dashboard", {
    user: req.session.user,
    reservations,
  });
});

/**
 * @route GET /dashboard/catways
 */
router.get("/catways", isAuthenticated, async (req, res) => {
  const catways = await Catway.find();
  res.render("catways", { catways });
});

/**
 * @route GET /dashboard/reservations
 */
router.get("/reservations", isAuthenticated, async (req, res) => {
  const reservations = await Reservation.find();
  res.render("reservations", { reservations });
});

/**
 * @route GET /dashboard/users
 */
router.get("/users", isAuthenticated, async (req, res) => {
  const users = await User.find();
  res.render("users", { users });
});

module.exports = router;

