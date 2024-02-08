module.exports = {
  friendlyName: "Fetch",

  description: "Fetch orders.",

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
    if (this.req.user.role === "client") {
      const orders = await Order.find({ user: this.req.user.id });

      if (!orders) {
        return exits.notFound("Could not fetch orders");
      }

      return exits.success(orders);
    }

    const orders = await Order.find({});

    if (!orders) {
      return exits.notFound("Could not fetch orders");
    }

    // All done.
    return exits.success(orders);
  },
};
