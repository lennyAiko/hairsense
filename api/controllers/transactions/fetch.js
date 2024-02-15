module.exports = {
  friendlyName: "Fetch",

  description: "Fetch transactions.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    let transactions = await Transactions.find({});
    // All done.
    return exits.success(transactions);
  },
};
