module.exports = {
  friendlyName: "Webhook",

  description: "Webhook orders.",

  inputs: {
    customerEmail: {
      type: "string",
    },
    status: {
      type: "string",
    },
    transactionRef: {
      type: "string",
    },
    chargedAmount: {
      type: "number",
    },
  },

  exits: {},

  fn: async function (inputs) {
    let order = await Order.updateOne({
      transactionRef: inputs.transactionRef,
    }).set({
      payment: inputs.status,
      chargedAmount: inputs.chargedAmount,
      customerEmail: inputs.customerEmail,
    });

    if (order) {
      sails.log("successful webhook");
    } else {
      sails.log("unsuccessful webhook");
    }
    // All done.
    return "ok";
  },
};
