module.exports = {
  friendlyName: "View",

  description: "View product.",

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
    let product = await Product.findOne({ id: this.req.params.id });

    if (!product) {
      return exits.notFound(`Product with id: ${this.req.params.id} not found`);
    }

    product = await Product.updateOne({ id: product.id }).set({
      views: product.views + 1,
    });

    // All done.
    return exits.success(product);
  },
};
