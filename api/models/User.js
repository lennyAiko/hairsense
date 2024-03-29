/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: {
      type: "string",
      required: true,
      minLength: 5,
      isEmail: true,
      unique: true,
    },
    firstName: {
      type: "string",
      columnName: "first_name",
      maxLength: 30,
    },
    lastName: {
      type: "string",
      columnName: "last_name",
      maxLength: 30,
    },
    role: {
      type: "string",
      isIn: ["admin", "client", "superadmin"],
      defaultsTo: "client",
      maxLength: 7,
    },
    status: {
      type: "boolean",
      defaultsTo: true,
    },
    phone: {
      type: "string",
      maxLength: 11,
    },
    password: {
      type: "string",
      minLength: 8,
      required: true,
      protect: true,
    },

    // associations
    favourite: {
      collection: "favourite",
      via: "user",
    },
    cart: {
      collection: "cart",
      via: "user",
    },
    order: {
      collection: "order",
      via: "user",
    },
  },

  customToJSON: function () {
    return _.omit(this, [
      "password",
      "createdAt",
      "updatedAt",
      "favourite",
      "cart",
      "order",
    ]);
  },
};
