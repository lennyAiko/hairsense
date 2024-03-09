module.exports = {
  friendlyName: "Delete users",

  description: "",

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
    let userRecord = await User.destroyOne({ id: inputs.id });

    // All done.
    return exits.success({ message: "User deleted successfully" });
  },
};
