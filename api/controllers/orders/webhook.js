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
    createdAt: {
      type: "string",
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

    await Transactions.create({
      orderNo: order.id,
      reference: inputs.transactionRef,
      amount: inputs.chargedAmount,
      name: order.firstName + " " + order.lastName,
      date: inputs.createdAt,
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
