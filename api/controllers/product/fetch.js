module.exports = {
  friendlyName: "Fetch",

  description: "Fetch product.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
    myBad: {
      responseType: "internalServerError",
    },
  },

  fn: async function (inputs, exits) {
    const products = await Product.find({});

    if (!products) {
      return exits.myBad("Could not fetch products");
    }

    // All done.
    return exits.success(products);
  },
};
