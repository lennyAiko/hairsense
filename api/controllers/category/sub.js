module.exports = {
  friendlyName: "Fetch",

  description: "Fetch subcategory.",

  inputs: {
    id: {
      type: "string",
    },
  },

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const categories = await Category.find({ id: inputs.id }).populate(
      "subcategories"
    );

    // All done.
    return exits.success(categories);
  },
};
