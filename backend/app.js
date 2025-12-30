/**
 * @file app.js
 * @description
 * Configuration principale de l'application Express
 * du Port de plaisance de Russell.
 */

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

/* =======================
   Swagger
   ======================= */
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

/* ===========================================================
   CONNEXION À MONGODB (ENV)
   =========================================================== */

/**
 * Connexion à MongoDB Atlas (Render / production)
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err)
  );

/* ===========================================================
   MIDDLEWARES GLOBAUX
   =========================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Gestion des sessions utilisateurs
 */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 1 heure
    },
  })
);

/* ===========================================================
   CONFIGURATION EJS & FICHIERS STATIQUES
   =========================================================== */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));

app.use(
  "/public",
  express.static(path.join(__dirname, "../frontend/public"))
);

/* ===========================================================
   ROUTES PAGES
   =========================================================== */

/**
 * @route GET /
 * @description Page d'accueil (connexion)
 */
app.get("/", (req, res) => {
  res.render("login", { error: null });
});

/**
 * @route GET /dashboard
 * @description Tableau de bord
 */
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  res.render("dashboard", {
    user: req.session.user,
  });
});

/**
 * @route GET /logout
 * @description Déconnexion
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

