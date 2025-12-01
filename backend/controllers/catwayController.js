/**
 * @file catwayController.js
 * @description Gestion CRUD des catways
 */

const Catway = require("../models/Catway");

/**
 * @function createCatway
 * @description Création d’un catway
 */
exports.createCatway = async (req, res) => {
  try {
    const catway = await Catway.create(req.body);
    res.status(201).json(catway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function getCatways
 * @description Liste tous les catways
 */
exports.getCatways = async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
};

/**
 * @function getCatway
 * @description Récupère un catway par son numéro
 */
exports.getCatway = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });

  if (!catway)
    return res.status(404).json({ message: "Catway introuvable" });

  res.json(catway);
};

/**
 * @function updateCatway
 * @description Modifie uniquement l’état du catway
 */
exports.updateCatway = async (req, res) => {
  const { catwayState } = req.body;

  const catway = await Catway.findOneAndUpdate(
    { catwayNumber: req.params.id },
    { catwayState },
    { new: true }
  );

  res.json(catway);
};

/**
 * @function deleteCatway
 * @description Supprime un catway
 */
exports.deleteCatway = async (req, res) => {
  await Catway.findOneAndDelete({ catwayNumber: req.params.id });
  res.json({ message: "Catway supprimé" });
};

