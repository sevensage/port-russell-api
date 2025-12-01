require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ROUTES
app.use("/users", require("./routes/userRoutes"));
app.use("/catways", require("./routes/catwayRoutes"));

// Connexion
connectDB();

// Test
app.get("/", (req, res) => {
  res.send("API Port Russell OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

