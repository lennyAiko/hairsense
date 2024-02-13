/**
 * Contacts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    fullName: {
      type: "string",
      required: true,
      maxLength: 120,
    },

    email: {
      type: "string",
      required: true,
      minLength: 3,
      isEmail: true,
      unique: true,
    },

    message: {
      type: "string",
      required: true,
      minLength: 3,
    },
  },
};
