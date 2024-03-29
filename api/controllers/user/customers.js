module.exports = {
  friendlyName: "Customers",

  description: "Customers user.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const customers = await User.find({ role: "client" });

    // All done.
    return exits.success(customers);
  },
};
