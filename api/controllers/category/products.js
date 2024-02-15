module.exports = {
  friendlyName: "Products",

  description: "Products category.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
    notFound: {
      responseType: "notFound",
    },
  },

  fn: async function (inputs, exits) {
    const products = await Category.findOne({
      id: this.req.params.id,
    }).populate("products");

    if (!products) {
      throw exits.notFound("Category not found");
    }

    // All done.
    return exits.success(products);
  },
};
