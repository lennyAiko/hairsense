/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  "category/create": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "isAdmin",
  ],
  "category/update": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "isAdmin",
  ],
  "category/delete": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "isAdmin",
  ],
  "*": "pathLogger",
  "user/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
  "favourite/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
  "cart/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
  "orders/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
};
