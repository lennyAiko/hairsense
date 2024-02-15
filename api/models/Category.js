/**
 * Category.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
      maxLength: 40,
      unique: true,
    },

    subcategories: {
      collection: "subcategory",
      via: "category",
    },

    products: {
      collection: "product",
      via: "category",
    },
  },
};
