module.exports = {
  friendlyName: "View",

  description: "View orders.",

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
    const order = await Order.findOne({
      id: this.req.params.id,
    });

    if (!order) {
      return exits.notFound("Order not found");
    }

    // All done.
    return exits.success(order);
  },
};
