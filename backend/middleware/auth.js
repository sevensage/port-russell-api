/**
 * @file auth.js
 * @description Middleware d’authentification JWT
 */

const jwt = require("jsonwebtoken");

/**
 * @function auth
 * @description Vérifie la présence et validité du token JWT
 */
module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "Token manquant" });

  try {
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};

