module.exports = {
  friendlyName: "Fetch users",

  description: "",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const users = await User.find({ role: "client" });

    // All done.
    return exits.success({
      data: users,
      message: "Successfully fetched users",
    });
  },
};
