/**
 * @file server.js
 * @description
 * Point d'entrée du serveur HTTP Express
 */

require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

