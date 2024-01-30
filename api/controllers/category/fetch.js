module.exports = {
  friendlyName: "Fetch",

  description: "Fetch category.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const categories = await Category.find({});

    // All done.
    return exits.success(categories);
  },
};
