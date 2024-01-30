/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // ACCOUNTS
  "POST /accounts/register": {
    action: "auth/register",
    swagger: {
      tag: ["accounts"],
      summary: "Register user",
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  },

  "POST /accounts/sign_in": {
    action: "auth/login",
    swagger: {
      tag: ["accounts"],
      summary: "Log in user",
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  },

  "POST /accounts/token_refresh": {
    action: "auth/refresh-token",
    swagger: {
      tag: ["accounts"],
      summary: "Refresh user token",
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  },

  // USER
  "GET /accounts/user": {
    action: "user/profile",
    swagger: {
      tag: ["user"],
      summary: "User profile",
      consumes: ["application/json"],
      produces: ["application/json"],
      security: [{ BearerAuth: [] }],
    },
  },

  "PATCH /accounts/user": "user/update",
};
