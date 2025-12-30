/**
 * @file swagger.js
 * @description Configuration Swagger OpenAPI 3.0
 */

const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Port de plaisance de Russell",
    version: "1.0.0",
    description:
      "Documentation de l'API privée de gestion des catways, réservations et utilisateurs"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Serveur local"
    }
  ],
  tags: [
    { name: "Auth", description: "Authentification" },
    { name: "Users", description: "Gestion des utilisateurs" },
    { name: "Catways", description: "Gestion des catways" },
    { name: "Reservations", description: "Gestion des réservations" }
  ]
};

const options = {
  swaggerDefinition,
  apis: [] // ❗ Swagger statique (simple et accepté pour l'examen)
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * ============================
 * AUTHENTIFICATION
 * ============================
 */
swaggerSpec.paths = {
  "/login": {
    post: {
      tags: ["Auth"],
      summary: "Connexion utilisateur",
      description: "Permet à un utilisateur de se connecter",
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "admin@mail.com" },
                password: { type: "string", example: "password123" }
              }
            }
          }
        }
      },
      responses: {
        302: {
          description: "Connexion réussie → redirection tableau de bord"
        },
        401: {
          description: "Identifiants incorrects"
        }
      }
    }
  },

  "/logout": {
    get: {
      tags: ["Auth"],
      summary: "Déconnexion",
      description: "Déconnecte l'utilisateur courant",
      responses: {
        302: {
          description: "Déconnexion réussie"
        }
      }
    }
  },

  /**
   * ============================
   * USERS
   * ============================
   */
  "/users": {
    get: {
      tags: ["Users"],
      summary: "Lister les utilisateurs",
      responses: {
        200: {
          description: "Liste des utilisateurs"
        }
      }
    },
    post: {
      tags: ["Users"],
      summary: "Créer un utilisateur",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        201: { description: "Utilisateur créé" }
      }
    }
  },

  /**
   * ============================
   * CATWAYS
   * ============================
   */
  "/catways": {
    get: {
      tags: ["Catways"],
      summary: "Lister les catways",
      responses: {
        200: {
          description: "Liste des catways"
        }
      }
    },
    post: {
      tags: ["Catways"],
      summary: "Créer un catway",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                catwayNumber: { type: "number" },
                catwayType: { type: "string" },
                catwayState: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        201: { description: "Catway créé" }
      }
    }
  },

  "/catways/{id}": {
    get: {
      tags: ["Catways"],
      summary: "Détails d’un catway",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Catway trouvé" }
      }
    },
    put: {
      tags: ["Catways"],
      summary: "Modifier un catway",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Catway modifié" }
      }
    },
    delete: {
      tags: ["Catways"],
      summary: "Supprimer un catway",
      responses: {
        204: { description: "Catway supprimé" }
      }
    }
  },

  /**
   * ============================
   * RESERVATIONS
   * ============================
   */
  "/catways/{id}/reservations": {
    get: {
      tags: ["Reservations"],
      summary: "Lister les réservations d’un catway",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Liste des réservations" }
      }
    },
    post: {
      tags: ["Reservations"],
      summary: "Créer une réservation",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        201: { description: "Réservation créée" }
      }
    }
  }
};

module.exports = swaggerSpec;

