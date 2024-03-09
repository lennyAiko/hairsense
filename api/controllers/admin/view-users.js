module.exports = {
  friendlyName: "View users",

  description: 'Display "Users" page.',

  inputs: {
    id: {
      type: "string",
    },
  },

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const user = await User.findOne({ id: inputs.id });
    if (!user) {
      throw { notFound: "User not found" };
    }
    // Respond with view.
    return exits.success({ data: user, message: "User fetched successfully" });
  },
};
