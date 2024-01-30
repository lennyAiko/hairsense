module.exports = {
  friendlyName: "Create",

  description: "Create product.",

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
    subcategory: {
      type: "string",
      required: true,
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

  fn: async function ({ name, actualPrice, desc, subcategory }, exits) {
    try {
      await Product.create({ name, actualPrice, desc, subcategory });
    } catch (err) {
      throw exits.badCombo("Could not create product");
    }
    // All done.
    return exits.success("Successfully created product");
  },
};
