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
    },
    productImg: {
      type: "string",
      columnName: "product_img",
    },

    subcategory: {
      model: "subcategory",
    },
  },
};
