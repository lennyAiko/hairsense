module.exports = {
  friendlyName: "New",

  description: "New product.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const newProducts = await Product.find({}).sort("createdAt ASC");

    // All done.
    return exits.success(newProducts);
  },
};
