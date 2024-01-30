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
  "POST /accounts/register": {
    action: "auth/register",
    swagger: {
      tag: ["accounts"],
      summary: "Register user",
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  },
};
