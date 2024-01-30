module.exports = {
  friendlyName: "Delete",

  description: "Delete product.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    await Product.destroyOne({ id: this.req.params.id });

    // All done.
    return exits.success("Successfully deleted product");
  },
};
