/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true,
    },
    actualPrice: {
      columnName: "actual_price",
      type: "number",
      required: true,
    },
    desc: {
      type: "string",
    },
    views: {
      type: "number",
      defaultsTo: 0,
    },
    productImg: {
      type: "string",
      columnName: "product_img",
    },

    // associations
    subcategory: {
      model: "subcategory",
    },
    favourite: {
      model: "favourite",
    },
    category: {
      model: "category",
    },
  },
  customsToJSON: function () {
    return _.omit(this, ["subcategory", "favourite"]);
  },
};
