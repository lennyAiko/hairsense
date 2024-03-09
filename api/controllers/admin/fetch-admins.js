module.exports = {
  friendlyName: "Fetch admins",

  description: "",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const users = await User.find({ role: "admin" });

    // All done.
    return exits.success({
      data: users,
      message: "Successfully fetched admins",
    });
  },
};
