module.exports = {
  friendlyName: "Trending",

  description: "Trending product.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const trendingProducts = await CSSMathProduct.find({}).sort("views ASC");

    // All done.
    return exits.success(trendingProducts);
  },
};
