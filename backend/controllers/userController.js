/**
 * @file userController.js
 * @description Controller gérant les opérations CRUD des utilisateurs.
 */

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @function createUser
 * @description Crée un nouvel utilisateur
 */
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @function getUsers
 * @description Liste tous les utilisateurs
 */
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/**
 * @function getUser
 * @description Retourne un utilisateur par email
 */
exports.getUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select("-password");
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

  res.json(user);
};

/**
 * @function updateUser
 * @description Modifie un utilisateur
 */
exports.updateUser = async (req, res) => {
  const updates = req.body;

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    updates,
    { new: true }
  );

  res.json(user);
};

/**
 * @function deleteUser
 * @description Supprime un utilisateur
 */
exports.deleteUser = async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email });
  res.json({ message: "Utilisateur supprimé" });
};

/**
 * @function login
 * @description Authentifie un utilisateur
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Email incorrect" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};

/**
 * @function logout
 * @description Déconnexion simple
 */
exports.logout = async (req, res) => {
  res.json({ message: "Déconnecté" });
};

