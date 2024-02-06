module.exports = {
  friendlyName: "Empty",

  description: "Empty cart.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    await Cart.destroy({ user: this.req.user.id });

    // All done.
    return exits.success("Cart emptied");
  },
};
