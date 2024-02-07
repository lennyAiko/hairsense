module.exports = {
  friendlyName: "Delete",

  description: "Delete orders.",

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
    let orderRecord = await Order.destroyOne({ id: this.req.params.id });

    if (!order) {
      return exits.notFound("Order not found");
    }
    // All done.
    return exits.success("Successfully deleted order"););
  },
};
