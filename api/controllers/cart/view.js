module.exports = {
  friendlyName: "View",

  description: "View cart.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs) {
    const cart = await Cart.findOne({ user: this.req.user.id });

    // All done.
    return exits.success(cart);
  },
};
