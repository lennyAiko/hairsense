module.exports = {
  friendlyName: "Fetch",

  description: "Fetch subcategory.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const subcategories = await Subcategory.find({}).populate("products");

    // All done.
    return exits.success(subcategories);
  },
};
