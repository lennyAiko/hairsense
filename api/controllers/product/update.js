const Product = require("../../models/Product");

module.exports = {
  friendlyName: "Update",

  description: "Update product.",

  inputs: {
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
  },

  exits: {
    success: {
      responseType: "ok",
    },
    badCombo: {
      responseType: "badRequest",
    },
  },

  fn: async function ({ name, actualPrice, desc }, exits) {
    let product = await Product.updateOne({ id: this.req.params.id }).set({
      name,
      actualPrice,
      desc,
    });

    if (!product) {
      return exits.badCombo("Could not update product");
    }

    // All done.
    return exits.success("Successfully updated product");
  },
};
