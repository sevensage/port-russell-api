/**
 * @file app.js
 * @description
 * Configuration principale de l'application Express
 * du Port de plaisance de Russell.
 */

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

/* =======================
   MODELS
   ======================= */
const Reservation = require("./models/Reservation");

/* =======================
   Swagger
   ======================= */
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

/* ===========================================================
   CONNEXION À MONGODB
   =========================================================== */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

/* ===========================================================
   MIDDLEWARES GLOBAUX
   =========================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===========================================================
   CONFIGURATION EJS & FICHIERS STATIQUES
   =========================================================== */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

/* ===========================================================
   SESSIONS
   =========================================================== */

app.use(
  session({
    name: "port-russell-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true seulement en HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 heure
    },
  })
);

/* ===========================================================
   ROUTES PAGES
   =========================================================== */

/**
 * Page de connexion
 */
app.get("/", (req, res) => {
  res.render("login", { error: null });
});

/**
 * Dashboard — CHARGE LES VRAIES RÉSERVATIONS
 */
app.get("/dashboard", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  try {
    const reservations = await Reservation.find().sort({ startDate: 1 });

    res.render("dashboard", {
      user: req.session.user,
      reservations,
    });
  } catch (err) {
    console.error("❌ Erreur chargement reservations:", err);
    res.render("dashboard", {
      user: req.session.user,
      reservations: [],
      error: "Erreur lors du chargement des réservations",
    });
  }
});

/**
 * Déconnexion
 */
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

/* ===========================================================
   SWAGGER
   =========================================================== */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ===========================================================
   ROUTES API
   =========================================================== */

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const catwayRoutes = require("./routes/catways.routes");
const reservationRoutes = require("./routes/reservations.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/catways", catwayRoutes);
app.use("/reservations", reservationRoutes);
app.use("/dashboard", dashboardRoutes);

/* ===========================================================
   EXPORT
   =========================================================== */

module.exports = app;

