/**
 * Favourite.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      model: "user",
      unique: true,
    },
    products: {
      collection: "product",
      via: "favourite",
    },
  },
};
