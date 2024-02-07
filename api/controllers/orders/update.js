module.exports = {
  friendlyName: "Update",

  description: "Update orders.",

  inputs: {
    status: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "ok",
    },
    notFound: {
      responseType: "notFound",
    },
  },

  fn: async function (inputs, exits) {
    let order = await Order.updateOne({ id: this.req.params.id }).set({
      status: inputs.status,
    });

    if (!order) {
      return exits.notFound("Order not found");
    }

    // All done.
    return exits.success("Successfully updated order");
  },
};
