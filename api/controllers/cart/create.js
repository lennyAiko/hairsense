module.exports = {
  friendlyName: "Create",

  description: "Create cart.",

  inputs: {
    products: {
      type: "ref",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "ok",
    },
    badCombo: {
      responseType: "badRequest",
    },
  },

  fn: async function ({ products }, exits) {
    let item = await Cart.findOrCreate(
      { user: this.req.user.id },
      { user: this.req.user.id, products }
    ).exec(async (err, cart, wasCreated) => {
      if (err) {
        return exits.badCombo("Could not create cart");
      }
      if (wasCreated) {
        return cart;
      } else {
        await Cart.updateOne({ id: cart.id }).set({ products });
        return cart;
      }
    });
    // All done.
    return exits.success("Successfully added to cart");
  },
};
