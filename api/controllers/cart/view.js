module.exports = {
  friendlyName: "View",

  description: "View cart.",

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
    const cart = await Cart.findOne({ user: this.req.user.id });

    if (!cart) {
      return exits.notFound("Could not find user cart");
    }

    // All done.
    return exits.success(cart);
  },
};
