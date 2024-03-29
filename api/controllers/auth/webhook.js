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
    sails.log(inputs);
    let order = await Order.updateOne({
      customerEmail: inputs.customerEmail,
    }).set({
      payment: inputs.status,
      chargedAmount: inputs.chargedAmount,
      transactionRef: inputs.transactionRef,
    });

    await Transactions.create({
      orderNo: order.id,
      reference: inputs.transactionRef,
      amount: inputs.chargedAmount,
      name: order.firstName + " " + order.lastName,
      date: inputs.createdAt,
    });

    // All done.
    return "ok";
  },
};
